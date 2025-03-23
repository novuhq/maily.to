import * as react_jsx_runtime from 'react/jsx-runtime';
import { Editor as Editor$1, Range, AnyExtension, FocusPosition } from '@tiptap/core';
import { JSONContent } from '@tiptap/react';

interface CommandProps {
    editor: Editor$1;
    range: Range;
}
type BlockItem = {
    title: string;
    description?: string;
    searchTerms: string[];
    icon?: JSX.Element;
    render?: (editor: Editor$1) => JSX.Element | null | true;
    preview?: string | ((editor: Editor$1) => JSX.Element | null);
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

type MailyContextType = {
    placeholderUrl?: string;
    blocks?: BlockGroupItem[];
};

type ParitialMailContextType = Partial<MailyContextType>;
type EditorProps = {
    contentHtml?: string;
    contentJson?: JSONContent;
    onUpdate?: (editor: Editor$1) => void;
    onCreate?: (editor: Editor$1) => void;
    extensions?: AnyExtension[];
    config?: {
        hasMenuBar?: boolean;
        spellCheck?: boolean;
        wrapClassName?: string;
        toolbarClassName?: string;
        contentClassName?: string;
        bodyClassName?: string;
        autofocus?: FocusPosition;
        immediatelyRender?: boolean;
    };
    editable?: boolean;
} & ParitialMailContextType;
declare function Editor(props: EditorProps): react_jsx_runtime.JSX.Element | null;

export { Editor, type EditorProps };
