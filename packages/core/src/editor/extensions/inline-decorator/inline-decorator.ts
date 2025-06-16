import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Plugin } from '@tiptap/pm/state';
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import React from 'react';
import { DefaultInlineDecoratorComponent } from './default-decorator-component';
import { registerSuggestionProvider } from '../../bubble-suggestions';
import { createInlineDecoratorProvider } from '../../bubble-suggestions/providers/inline-decorator-provider';
import { Editor } from '@tiptap/core';

// Register the provider at module level so it's available immediately
registerSuggestionProvider('inlineDecorator', createInlineDecoratorProvider);

export type InlineDecoratorItem = {
  name: string;
};

export type InlineDecoratorComponentProps = {
  decoratorKey: string; // "t.common.submit"
  onUpdate?: (key: string) => void;
  onDelete?: () => void;
};

export type InlineDecoratorOptions = {
  /** The trigger pattern to match in text (e.g., "{{t.") */
  triggerPattern: string;
  /** The closing pattern (e.g., "}}") */
  closingPattern: string;
  /** The opening pattern for the full decorator (e.g., "{{") */
  openingPattern: string;
  /** Function to extract the key from the matched text */
  extractKey: (text: string) => string | null;
  /** Function to format a key into the full pattern */
  formatPattern: (key: string) => string;
  /** Function to check if a value matches the decorator pattern */
  isPatternMatch: (value: string) => boolean;
  /** React component to render as the decorator */
  decoratorComponent: React.ComponentType<InlineDecoratorComponentProps>;
  /** Suggestion configuration */
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

const InlineDecoratorPluginKey = new PluginKey('inlineDecorator');
const InlineDecoratorSuggestionPluginKey = new PluginKey(
  'inlineDecoratorSuggestion'
);

/** Escapes special regex characters in a string */
function escapeRegexChars(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Creates a regex pattern for matching decorators in text */
function createDecoratorRegex(
  triggerPattern: string,
  closingPattern: string
): RegExp {
  const escapedTrigger = escapeRegexChars(triggerPattern);
  const escapedClosing = escapeRegexChars(closingPattern);
  return new RegExp(`${escapedTrigger}(.*?)${escapedClosing}`, 'g');
}

/** Updates decorator text at a specific position in the editor */
function updateDecoratorText(
  editor: Editor,
  from: number,
  to: number,
  newKey: string,
  options: InlineDecoratorOptions
) {
  const { state, dispatch } = editor.view;
  const { tr } = state;
  const newPattern = options.formatPattern(newKey);
  tr.replaceWith(from, to, state.schema.text(newPattern));
  if (dispatch) dispatch(tr);
}

/** Deletes decorator text at a specific position in the editor */
function deleteDecoratorText(editor: Editor, from: number, to: number) {
  const { state, dispatch } = editor.view;
  const { tr } = state;
  tr.delete(from, to);
  if (dispatch) dispatch(tr);
}

/** Gets the inline decorator extension options from the editor */
function getExtensionOptions(editor: Editor): InlineDecoratorOptions {
  return editor.extensionManager.extensions.find(
    (ext: any) => ext.name === 'inlineDecorator'
  )?.options as InlineDecoratorOptions;
}

/** Handles suggestion command when user selects an item */
function createSuggestionCommand() {
  return ({ editor, range, props }: any) => {
    const options = getExtensionOptions(editor);
    const text = `${options.formatPattern(props.name)} `;
    editor.chain().focus().insertContentAt(range, text).run();
  };
}

/** Determines if suggestions are allowed at the current position */
function createSuggestionAllowHandler() {
  return ({ state, range }: any) => {
    const $from = state.doc.resolve(range.from);
    const type = state.schema.nodes.text;
    return !!$from.parent.type.contentMatch.matchType(type);
  };
}

/** Creates a React decorator widget */
function createDecoratorWidget(
  editor: Editor,
  from: number,
  to: number,
  key: string,
  options: InlineDecoratorOptions
) {
  const renderer = new ReactRenderer(options.decoratorComponent, {
    props: {
      decoratorKey: key,
      onUpdate: (newKey: string) =>
        updateDecoratorText(editor, from, to, newKey, options),
      onDelete: () => deleteDecoratorText(editor, from, to),
    },
    editor,
    as: 'span',
  });

  // Just add a class for easy selection
  (renderer.element as HTMLElement).classList.add('inline-decorator');

  return renderer.element;
}

export const InlineDecoratorExtension =
  Extension.create<InlineDecoratorOptions>({
    name: 'inlineDecorator',

    addOptions(): InlineDecoratorOptions {
      return {
        // These must be provided by the user
        triggerPattern: '',
        closingPattern: '',
        openingPattern: '',
        extractKey: () => null,
        formatPattern: () => '',
        isPatternMatch: () => false,

        // Default component and suggestion config
        decoratorComponent: DefaultInlineDecoratorComponent,
        suggestion: {
          char: '',
          pluginKey: InlineDecoratorSuggestionPluginKey,
          command: createSuggestionCommand(),
          allow: createSuggestionAllowHandler(),
        },
      };
    },

    addProseMirrorPlugins() {
      return [
        // Suggestion plugin
        Suggestion({
          editor: this.editor,
          ...this.options.suggestion,
          pluginKey: InlineDecoratorSuggestionPluginKey,
        }),

        // Decoration plugin
        new Plugin({
          key: InlineDecoratorPluginKey,
          state: {
            init: () => DecorationSet.empty,
            apply: (tr) => {
              const decorations: Decoration[] = [];
              const pattern = createDecoratorRegex(
                this.options.triggerPattern,
                this.options.closingPattern
              );

              tr.doc.descendants((node, pos) => {
                if (node.isText && node.text) {
                  let match: RegExpExecArray | null;

                  while ((match = pattern.exec(node.text)) !== null) {
                    const key = this.options.extractKey(match[0]);

                    if (key) {
                      const from = pos + match.index;
                      const to = pos + match.index + match[0].length;

                      // Create widget decoration
                      const decoration = Decoration.widget(from, () =>
                        createDecoratorWidget(
                          this.editor,
                          from,
                          to,
                          key,
                          this.options
                        )
                      );

                      // Create inline decoration to hide original text
                      const hideDecoration = Decoration.inline(from, to, {
                        style: 'display: none;',
                      });

                      decorations.push(decoration, hideDecoration);
                    }
                  }

                  // Reset regex lastIndex to avoid issues with global regex
                  pattern.lastIndex = 0;
                }
              });

              return DecorationSet.create(tr.doc, decorations);
            },
          },
          props: {
            decorations(state) {
              return this.getState(state);
            },
          },
        }),
      ];
    },
  });
