import { Editor, Range } from '@tiptap/core';

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

declare const button: BlockItem;
declare const linkCard: BlockItem;

declare const htmlCodeBlock: BlockItem;

declare const image: BlockItem;
declare const logo: BlockItem;
declare const inlineImage: BlockItem;

declare const columns: BlockItem;
declare const section: BlockItem;
declare const repeat: BlockItem;
declare const spacer: BlockItem;
declare const divider: BlockItem;

declare const bulletList: BlockItem;
declare const orderedList: BlockItem;

declare const text: BlockItem;
declare const heading1: BlockItem;
declare const heading2: BlockItem;
declare const heading3: BlockItem;
declare const hardBreak: BlockItem;
declare const blockquote: BlockItem;
declare const footer: BlockItem;
declare const clearLine: BlockItem;

export { type BlockGroupItem, type BlockItem, blockquote, bulletList, button, clearLine, columns, divider, footer, hardBreak, heading1, heading2, heading3, htmlCodeBlock, image, inlineImage, linkCard, logo, orderedList, repeat, section, spacer, text };
