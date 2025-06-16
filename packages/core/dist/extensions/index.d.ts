import * as _tiptap_core from '@tiptap/core';
import { Editor, Extension, Range, Node } from '@tiptap/core';
import { ColorOptions } from '@tiptap/extension-color';
import * as _tiptap_extension_horizontal_rule from '@tiptap/extension-horizontal-rule';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { SuggestionOptions } from '@tiptap/suggestion';
import * as react from 'react';
import react__default from 'react';
import * as _tiptap_extension_link from '@tiptap/extension-link';
import { LinkOptions } from '@tiptap/extension-link';
import * as _tiptap_extension_placeholder from '@tiptap/extension-placeholder';
import * as _tiptap_react from '@tiptap/react';
import * as _tiptap_extension_image from '@tiptap/extension-image';
import { Node as Node$1 } from '@tiptap/pm/model';
import * as _tiptap_extension_code_block_lowlight from '@tiptap/extension-code-block-lowlight';

type ColorStorage = {
    /**
     * Last 5 used colors
     */
    colors: Set<string>;
};
declare const Color: _tiptap_core.Extension<ColorOptions, ColorStorage>;

declare const HorizontalRule: _tiptap_core.Node<_tiptap_extension_horizontal_rule.HorizontalRuleOptions, any>;

type ImageUploadPluginOptions = {
    editor: Editor;
    /**
     * Allows you to define a list of allowed mime types for dropped or pasted images.
     * @default ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
     */
    allowedMimeTypes?: string[];
    /**
     * The onImageUpload callback that is called when an image is dropped or pasted.
     * @param file the image file
     * @returns Returns the image URL as a string.
     */
    onImageUpload?: (file: Blob) => Promise<string>;
};
declare function ImageUploadPlugin(options: ImageUploadPluginOptions): Plugin<any>;

type ImageUploadOptions = Omit<ImageUploadPluginOptions, 'editor'> & {};
type ImageUploadStorage = {
    placeholderImages: Set<string>;
};
declare const ImageUploadExtension: Extension<Omit<ImageUploadPluginOptions, "editor">, any>;
declare function useImageUploadOptions(editor: Editor): ImageUploadOptions;

type InlineDecoratorItem = {
    name: string;
};
type InlineDecoratorComponentProps = {
    decoratorKey: string;
    onUpdate?: (key: string) => void;
    onDelete?: () => void;
};
type InlineDecoratorOptions = {
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
    decoratorComponent: react__default.ComponentType<InlineDecoratorComponentProps>;
    /** Suggestion configuration */
    suggestion: Omit<SuggestionOptions, 'editor'>;
};
declare const InlineDecoratorExtension: Extension<InlineDecoratorOptions, any>;

/**
 * Creates a complete suggestion configuration for inline decorators
 *
 * @param char - The trigger character (e.g., '{{t.')
 * @param items - Static array or dynamic function that returns decorator items
 * @param pluginKey - Optional plugin key for the suggestion
 * @returns Complete suggestion options configuration
 */
declare function getInlineDecoratorSuggestionsReact(char?: string, items?: InlineDecoratorItem[] | ((query: string) => InlineDecoratorItem[]), pluginKey?: any): Omit<SuggestionOptions, 'editor'>;

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linkCard: {
            setLinkCard: () => ReturnType;
        };
    }
}
type LinkCardOptions = {};

type MailyKitOptions = {
    linkCard?: Partial<LinkCardOptions> | false;
    repeat?: Partial<{}> | false;
    section?: Partial<{}> | false;
    columns?: Partial<{}> | false;
    column?: Partial<{}> | false;
    button?: Partial<{}> | false;
    spacer?: Partial<{}> | false;
    logo?: Partial<{}> | false;
    image?: Partial<{}> | false;
    link?: Partial<LinkOptions> | false;
};
declare const MailyKit: Extension<MailyKitOptions, any>;

declare const PlaceholderExtension: _tiptap_core.Extension<_tiptap_extension_placeholder.PlaceholderOptions, any>;

type SlashCommandOptions = {
    suggestion: Omit<SuggestionOptions, 'editor'>;
};
declare const SlashCommandExtension: Extension<SlashCommandOptions, any>;

interface CommandProps {
    editor: Editor;
    range: Range;
}
type BlockItem = {
    title: string;
    description?: string;
    searchTerms: string[];
    icon?: JSX.Element;
    render?: (editor: Editor) => JSX.Element | null | true;
    preview?: string | ((editor: Editor) => JSX.Element | null);
} & ({
    command: (options: CommandProps) => void;
    id?: never;
    commands?: never;
} | {
    /**
     * id to be used for the slash command query
     * `headers.` will go inside the header subcommand
     */
    id: string;
    command?: never;
    commands: BlockItem[];
});
type BlockGroupItem = {
    title: string;
    commands: BlockItem[];
};

declare function getSlashCommandSuggestions(groups?: BlockGroupItem[]): Omit<SuggestionOptions, 'editor'>;

declare const searchSlashCommands: (query: string, editor: Editor, groups: BlockGroupItem[]) => BlockGroupItem[];

declare const allowedLogoSize: readonly ["sm", "md", "lg"];
type AllowedLogoSize = (typeof allowedLogoSize)[number];
declare const allowedLogoAlignment: readonly ["left", "center", "right"];
type AllowedLogoAlignment = (typeof allowedLogoAlignment)[number];
interface LogoOptions {
    src: string;
    alt?: string;
    title?: string;
    size?: AllowedLogoSize;
    alignment?: AllowedLogoAlignment;
}
interface LogoAttributes {
    src?: string;
    size?: AllowedLogoSize;
    alignment?: AllowedLogoAlignment;
    showIfKey: string;
    isSrcVariable?: boolean;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        logo: {
            setLogoImage: (options: LogoOptions) => ReturnType;
            updateLogoAttributes: (attributes: Partial<LogoAttributes>) => ReturnType;
        };
    }
}
declare const DEFAULT_LOGO_SIZE: AllowedLogoSize;
declare const logoSizes: Record<AllowedLogoSize, string>;
declare const LogoExtension: _tiptap_react.Node<_tiptap_extension_image.ImageOptions, any>;

declare const DEFAULT_BUTTON_ALIGNMENT: AllowedLogoAlignment;
declare const DEFAULT_BUTTON_VARIANT: AllowedButtonVariant;
declare const DEFAULT_BUTTON_BORDER_RADIUS: AllowedButtonBorderRadius;
declare const DEFAULT_BUTTON_BACKGROUND_COLOR = "#000000";
declare const DEFAULT_BUTTON_TEXT_COLOR = "#ffffff";
declare const DEFAULT_BUTTON_PADDING_TOP = 10;
declare const DEFAULT_BUTTON_PADDING_RIGHT = 32;
declare const DEFAULT_BUTTON_PADDING_BOTTOM = 10;
declare const DEFAULT_BUTTON_PADDING_LEFT = 32;
declare const allowedButtonVariant: readonly ["filled", "outline"];
type AllowedButtonVariant = (typeof allowedButtonVariant)[number];
declare const allowedButtonBorderRadius: readonly ["sharp", "smooth", "round"];
type AllowedButtonBorderRadius = (typeof allowedButtonBorderRadius)[number];
type ButtonAttributes = {
    text: string;
    isTextVariable: boolean;
    url: string;
    isUrlVariable: boolean;
    alignment: AllowedLogoAlignment;
    variant: AllowedButtonVariant;
    borderRadius: AllowedButtonBorderRadius;
    buttonColor: string;
    textColor: string;
    showIfKey: string;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    width: number | string;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        button: {
            setButton: () => ReturnType;
            updateButtonAttributes: (attrs: Partial<ButtonAttributes>) => ReturnType;
        };
    }
}
declare const ButtonExtension: Node<any, any>;

declare const DEFAULT_COLUMN_WIDTH = "auto";
type AllowedColumnVerticalAlign = 'top' | 'middle' | 'bottom';
declare const DEFAULT_COLUMN_VERTICAL_ALIGN: AllowedColumnVerticalAlign;
interface ColumnAttributes {
    verticalAlign: AllowedColumnVerticalAlign;
    backgroundColor: string;
    borderRadius: number;
    align: string;
    borderWidth: number;
    borderColor: string;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    showIfKey: string;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        column: {
            updateColumn: (attrs: Partial<ColumnAttributes>) => ReturnType;
        };
    }
}
declare const ColumnExtension: Node<any, any>;

declare const DEFAULT_COLUMNS_GAP = 8;
interface ColumnsAttributes {
    showIfKey: string;
    gap: number;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        columns: {
            setColumns: () => ReturnType;
            updateColumns: (attrs: Partial<ColumnsAttributes>) => ReturnType;
        };
    }
}
declare const ColumnsExtension: Node<any, any>;

interface FooterOptions {
    HTMLAttributes: Record<string, any>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        footer: {
            setFooter: () => ReturnType;
        };
    }
}
declare const Footer: Node<FooterOptions, any>;

type ImageAttributes = {
    src: string;
    isSrcVariable?: boolean;
    alt?: string;
    title?: string;
    externalLink?: string;
    isExternalLinkVariable?: boolean;
    alignment?: 'left' | 'center' | 'right';
    borderRadius?: number;
    width?: string | number;
    height?: string | number;
    aspectRatio?: number;
    lockAspectRatio?: boolean;
    showIfKey?: string;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageOverride: {
            updateImageAttributes: (attrs: Partial<ImageAttributes>) => ReturnType;
        };
    }
}
declare const ImageExtension: _tiptap_react.Node<_tiptap_extension_image.ImageOptions, any>;

interface InlineImageOptions {
    /**
     * HTML attributes to add to the image element.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;
}
interface InlineImageAttributes {
    src: string;
    isSrcVariable?: boolean;
    alt?: string;
    title?: string;
    externalLink?: string;
    isExternalLinkVariable?: boolean;
    height?: string | number;
    width?: string | number;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        inlineImage: {
            setInlineImage: (options: InlineImageAttributes) => ReturnType;
            updateInlineImageAttributes: (attrs: Partial<InlineImageAttributes>) => ReturnType;
        };
    }
}
declare const DEFAULT_INLINE_IMAGE_HEIGHT = 20;
declare const DEFAULT_INLINE_IMAGE_WIDTH = 20;
declare const InlineImageExtension: Node<InlineImageOptions, any>;

type LinkAttributes = {
    href: string;
    target?: string | null;
    rel?: string | null;
    class?: string | null;
    isUrlVariable?: boolean;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customLink: {
            updateLinkAttributes: (attributes: LinkAttributes) => ReturnType;
        };
    }
}
declare const LinkExtension: _tiptap_core.Mark<_tiptap_extension_link.LinkOptions, any>;

type RepeatAttributes = {
    each: string;
    isUpdatingKey: boolean;
    showIfKey: string;
    iterations: number;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        repeat: {
            setRepeat: () => ReturnType;
            updateRepeatAttributes: (attrs: Partial<RepeatAttributes>) => ReturnType;
        };
    }
}
declare const RepeatExtension: Node<any, any>;

declare const DEFAULT_SECTION_BACKGROUND_COLOR = "#f7f7f7";
declare const DEFAULT_SECTION_ALIGN = "left";
declare const DEFAULT_SECTION_BORDER_WIDTH = 2;
declare const DEFAULT_SECTION_BORDER_COLOR = "#e2e2e2";
declare const DEFAULT_SECTION_BORDER_RADIUS = 0;
declare const DEFAULT_SECTION_MARGIN_TOP = 0;
declare const DEFAULT_SECTION_MARGIN_RIGHT = 0;
declare const DEFAULT_SECTION_MARGIN_BOTTOM = 0;
declare const DEFAULT_SECTION_MARGIN_LEFT = 0;
declare const DEFAULT_SECTION_PADDING_TOP = 0;
declare const DEFAULT_SECTION_PADDING_RIGHT = 0;
declare const DEFAULT_SECTION_PADDING_BOTTOM = 0;
declare const DEFAULT_SECTION_PADDING_LEFT = 0;
declare const DEFAULT_SECTION_SHOW_IF_KEY: null;
type SectionAttributes = {
    borderRadius: number;
    backgroundColor: string;
    align: string;
    borderWidth: number;
    borderColor: string;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    showIfKey: string | null;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        section: {
            setSection: () => ReturnType;
            updateSection: (attrs: Partial<SectionAttributes>) => ReturnType;
        };
    }
}
declare const SectionExtension: Node<any, any>;

interface SpacerOptions {
    height: number;
    showIfKey: string;
    HTMLAttributes: Record<string, any>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        spacer: {
            setSpacer: (options: {
                height: number;
            }) => ReturnType;
            setSpacerSize: (height: number) => ReturnType;
            setSpacerShowIfKey: (showIfKey: string) => ReturnType;
            unsetSpacer: () => ReturnType;
        };
    }
}
declare const DEFAULT_SPACER_HEIGHT = 8;
declare const Spacer: Node<SpacerOptions, any>;

type VariableSuggestionsPopoverProps = {
    items: Variable[];
    onSelectItem: (item: Variable) => void;
};
type VariableSuggestionsPopoverRef = {
    moveUp: () => void;
    moveDown: () => void;
    select: () => void;
};
type VariableSuggestionsPopoverType = React.ForwardRefExoticComponent<VariableSuggestionsPopoverProps & React.RefAttributes<VariableSuggestionsPopoverRef>>;

type Variable = {
    name: string;
    required?: boolean;
    valid?: boolean;
};
type VariableFunctionOptions = {
    query: string;
    from: 'content-variable' | 'bubble-variable' | 'repeat-variable';
    editor: Editor;
};
type VariablesFunction = (opts: VariableFunctionOptions) => Array<Variable>;
type Variables = Array<Variable> | VariablesFunction;
declare const DEFAULT_VARIABLE_TRIGGER_CHAR = "@";
declare const DEFAULT_VARIABLES: Variables;
declare const DEFAULT_RENDER_VARIABLE_FUNCTION: RenderVariableFunction;
declare const DEFAULT_VARIABLE_SUGGESTION_POPOVER: VariableSuggestionsPopoverType;
type RenderVariableOptions = {
    variable: Variable;
    fallback?: string;
    editor: Editor;
    from: 'content-variable' | 'bubble-variable' | 'button-variable';
};
type RenderVariableFunction = (opts: RenderVariableOptions) => JSX.Element | null;
type VariableOptions = {
    renderLabel: (props: {
        options: VariableOptions;
        node: Node$1;
    }) => string;
    suggestion: Omit<SuggestionOptions, 'editor'>;
    /**
     * Variables is the array of variables that will be used to render the variable pill.
     */
    variables: Variables;
    /**
     * Render variable is the function that will be used to render the variable pill.
     * @default DefaultRenderVariable
     */
    renderVariable: RenderVariableFunction;
    /**
     * Variable suggestion popover is the component that will be used to render
     * the variable suggestions for the content, bubble menu variables
     * @default VariableSuggestionPopover
     */
    variableSuggestionsPopover: VariableSuggestionsPopoverType;
};
type VariableStorage = {
    popover: boolean;
};
declare const VariablePluginKey: PluginKey<any>;
declare const VariableExtension: Node<VariableOptions, VariableStorage>;

type VariableListProps = {
    command: (params: {
        id: string;
        required: boolean;
    }) => void;
    items: Variable[];
} & SuggestionOptions;
declare const VariableList: react.ForwardRefExoticComponent<{
    command: (params: {
        id: string;
        required: boolean;
    }) => void;
    items: Variable[];
} & SuggestionOptions<any, any> & react.RefAttributes<unknown>>;
declare function getVariableSuggestions(char?: string): Omit<SuggestionOptions, 'editor'>;

type HtmlCodeBlockAttributes = {
    activeTab: string;
    showIfKey: string;
    language: string;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        htmlCodeBlock: {
            /**
             * Set a code block
             * @param attributes Code block attributes
             * @example editor.commands.setCodeBlock({ language: 'javascript' })
             */
            setHtmlCodeBlock: (attributes?: {
                language: string;
            }) => ReturnType;
            /**
             * Toggle a code block
             * @param attributes Code block attributes
             * @example editor.commands.toggleCodeBlock({ language: 'javascript' })
             */
            toggleHtmlCodeBlock: (attributes?: {
                language: string;
            }) => ReturnType;
            updateHtmlCodeBlock: (attrs: Partial<HtmlCodeBlockAttributes>) => ReturnType;
        };
    }
}
declare const HTMLCodeBlockExtension: _tiptap_react.Node<_tiptap_extension_code_block_lowlight.CodeBlockLowlightOptions, any>;

export { type AllowedButtonBorderRadius, type AllowedButtonVariant, type AllowedColumnVerticalAlign, type AllowedLogoAlignment, type AllowedLogoSize, type ButtonAttributes, ButtonExtension, Color, ColumnExtension, ColumnsExtension, DEFAULT_BUTTON_ALIGNMENT, DEFAULT_BUTTON_BACKGROUND_COLOR, DEFAULT_BUTTON_BORDER_RADIUS, DEFAULT_BUTTON_PADDING_BOTTOM, DEFAULT_BUTTON_PADDING_LEFT, DEFAULT_BUTTON_PADDING_RIGHT, DEFAULT_BUTTON_PADDING_TOP, DEFAULT_BUTTON_TEXT_COLOR, DEFAULT_BUTTON_VARIANT, DEFAULT_COLUMNS_GAP, DEFAULT_COLUMN_VERTICAL_ALIGN, DEFAULT_COLUMN_WIDTH, DEFAULT_INLINE_IMAGE_HEIGHT, DEFAULT_INLINE_IMAGE_WIDTH, DEFAULT_LOGO_SIZE, DEFAULT_RENDER_VARIABLE_FUNCTION, DEFAULT_SECTION_ALIGN, DEFAULT_SECTION_BACKGROUND_COLOR, DEFAULT_SECTION_BORDER_COLOR, DEFAULT_SECTION_BORDER_RADIUS, DEFAULT_SECTION_BORDER_WIDTH, DEFAULT_SECTION_MARGIN_BOTTOM, DEFAULT_SECTION_MARGIN_LEFT, DEFAULT_SECTION_MARGIN_RIGHT, DEFAULT_SECTION_MARGIN_TOP, DEFAULT_SECTION_PADDING_BOTTOM, DEFAULT_SECTION_PADDING_LEFT, DEFAULT_SECTION_PADDING_RIGHT, DEFAULT_SECTION_PADDING_TOP, DEFAULT_SECTION_SHOW_IF_KEY, DEFAULT_SPACER_HEIGHT, DEFAULT_VARIABLES, DEFAULT_VARIABLE_SUGGESTION_POPOVER, DEFAULT_VARIABLE_TRIGGER_CHAR, Footer, type FooterOptions, HTMLCodeBlockExtension, HorizontalRule, type HtmlCodeBlockAttributes, type ImageAttributes, ImageExtension, ImageUploadExtension, type ImageUploadOptions, ImageUploadPlugin, type ImageUploadPluginOptions, type ImageUploadStorage, InlineDecoratorExtension, type InlineImageAttributes, InlineImageExtension, type InlineImageOptions, type LinkAttributes, LinkExtension, type LogoAttributes, LogoExtension, MailyKit, type MailyKitOptions, PlaceholderExtension, type RenderVariableFunction, type RenderVariableOptions, RepeatExtension, SectionExtension, SlashCommandExtension, type SlashCommandOptions, Spacer, type SpacerOptions, type Variable, VariableExtension, type VariableFunctionOptions, VariableList, type VariableListProps, type VariableOptions, VariablePluginKey, type VariableStorage, type Variables, type VariablesFunction, allowedButtonBorderRadius, allowedButtonVariant, allowedLogoAlignment, allowedLogoSize, getInlineDecoratorSuggestionsReact, getSlashCommandSuggestions, getVariableSuggestions, logoSizes, searchSlashCommands, useImageUploadOptions };
