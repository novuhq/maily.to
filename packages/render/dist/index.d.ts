import * as react_jsx_runtime from 'react/jsx-runtime';
import { HtmlProps } from '@react-email/components';
import { JSONContent } from '@tiptap/core';
export { JSONContent } from '@tiptap/core';

type MetaDescriptor = {
    charSet: 'utf-8';
} | {
    title: string;
} | {
    name: string;
    content: string;
} | {
    property: string;
    content: string;
} | {
    httpEquiv: string;
    content: string;
} | {
    tagName: 'meta' | 'link';
    [attribute: string]: string;
} | {
    [name: string]: string;
};
type MetaDescriptors = MetaDescriptor[];

interface NodeOptions {
    parent?: JSONContent;
    prev?: JSONContent;
    next?: JSONContent;
    payloadValue?: PayloadValue;
}
interface MarkType {
    [key: string]: any;
    type: string;
    attrs?: Record<string, any> | undefined;
}
interface ThemeOptions {
    colors?: Partial<{
        heading: string;
        paragraph: string;
        horizontal: string;
        footer: string;
        blockquoteBorder: string;
        codeBackground: string;
        codeText: string;
        linkCardTitle: string;
        linkCardDescription: string;
        linkCardBadgeText: string;
        linkCardBadgeBackground: string;
        linkCardSubTitle: string;
    }>;
    fontSize?: Partial<{
        paragraph: Partial<{
            size: string;
            lineHeight: string;
        }>;
        footer: Partial<{
            size: string;
            lineHeight: string;
        }>;
    }>;
}
interface MailyConfig {
    /**
     * The preview text is the snippet of text that is pulled into the inbox
     * preview of an email client, usually right after the subject line.
     *
     * Default: `undefined`
     */
    preview?: string;
    /**
     * The theme object allows you to customize the colors and font sizes of the
     * rendered email.
     *
     * Default:
     * ```js
     * {
     *   colors: {
     *     heading: '#111827',
     *     paragraph: '#374151',
     *     horizontal: '#EAEAEA',
     *     footer: '#64748B',
     *   },
     *   fontSize: {
     *     paragraph: '15px',
     *     footer: {
     *       size: '14px',
     *       lineHeight: '24px',
     *     },
     *   },
     * }
     * ```
     *
     * @example
     * ```js
     * const maily = new Maily(content, {
     *   theme: {
     *     colors: {
     *       heading: '#111827',
     *     },
     *     fontSize: {
     *       footer: {
     *         size: '14px',
     *         lineHeight: '24px',
     *       },
     *     },
     *   },
     * });
     * ```
     */
    theme?: Partial<ThemeOptions>;
}
declare const DEFAULT_SECTION_BACKGROUND_COLOR = "#ffffff";
declare const DEFAULT_SECTION_ALIGN = "left";
declare const DEFAULT_SECTION_BORDER_WIDTH = 1;
declare const DEFAULT_SECTION_BORDER_COLOR = "#000000";
declare const DEFAULT_SECTION_MARGIN_TOP = 0;
declare const DEFAULT_SECTION_MARGIN_RIGHT = 0;
declare const DEFAULT_SECTION_MARGIN_BOTTOM = 0;
declare const DEFAULT_SECTION_MARGIN_LEFT = 0;
declare const DEFAULT_SECTION_PADDING_TOP = 5;
declare const DEFAULT_SECTION_PADDING_RIGHT = 5;
declare const DEFAULT_SECTION_PADDING_BOTTOM = 5;
declare const DEFAULT_SECTION_PADDING_LEFT = 5;
declare const DEFAULT_COLUMNS_WIDTH = "100%";
declare const DEFAULT_COLUMNS_GAP = 8;
declare const DEFAULT_COLUMN_BACKGROUND_COLOR = "transparent";
declare const DEFAULT_COLUMN_BORDER_RADIUS = 0;
declare const DEFAULT_COLUMN_BORDER_WIDTH = 0;
declare const DEFAULT_COLUMN_BORDER_COLOR = "transparent";
declare const DEFAULT_COLUMN_PADDING_TOP = 0;
declare const DEFAULT_COLUMN_PADDING_RIGHT = 0;
declare const DEFAULT_COLUMN_PADDING_BOTTOM = 0;
declare const DEFAULT_COLUMN_PADDING_LEFT = 0;
declare const DEFAULT_INLINE_IMAGE_HEIGHT = 20;
declare const DEFAULT_INLINE_IMAGE_WIDTH = 20;
declare const LINK_PROTOCOL_REGEX: RegExp;
declare const DEFAULT_META_TAGS: MetaDescriptors;
declare const DEFAULT_HTML_PROPS: HtmlProps;
declare const DEFAULT_BUTTON_PADDING_TOP = 10;
declare const DEFAULT_BUTTON_PADDING_RIGHT = 32;
declare const DEFAULT_BUTTON_PADDING_BOTTOM = 10;
declare const DEFAULT_BUTTON_PADDING_LEFT = 32;
interface RenderOptions {
    /**
     * The options object allows you to customize the output of the rendered
     * email.
     * - `pretty` - If `true`, the output will be formatted with indentation and
     *  line breaks.
     * - `plainText` - If `true`, the output will be plain text instead of HTML.
     * This is useful for testing purposes.
     *
     * Default: `pretty` - `false`, `plainText` - `false`
     */
    pretty?: boolean;
    plainText?: boolean;
}
type VariableFormatter = (options: {
    variable: string;
    fallback?: string;
}) => string;
type VariableValues = Map<string, string>;
type LinkValues = Map<string, string>;
type PayloadValue = Record<string, any> | boolean;
type PayloadValues = Map<string, PayloadValue>;
declare class Maily {
    private readonly content;
    private config;
    private variableFormatter;
    private shouldReplaceVariableValues;
    private variableValues;
    private linkValues;
    private openTrackingPixel;
    private payloadValues;
    private marksOrder;
    private meta;
    private htmlProps;
    constructor(content?: JSONContent);
    setPreviewText(preview?: string): void;
    setTheme(theme: Partial<ThemeOptions>): void;
    setVariableFormatter(formatter: VariableFormatter): void;
    /**
     * `setVariableValue` will set the variable value.
     * It will also set `shouldReplaceVariableValues` to `true`.
     *
     * @param variable - The variable name
     * @param value - The variable value
     */
    setVariableValue(variable: string, value: string): void;
    /**
     * `setVariableValues` will set the variable values.
     * It will also set `shouldReplaceVariableValues` to `true`.
     *
     * @param values - The variable values
     *
     * @example
     * ```js
     * const maily = new Maily(content);
     * maily.setVariableValues({
     *  name: 'John Doe',
     *  email: 'john@doe.com',
     * });
     * ```
     */
    setVariableValues(values: Record<string, string>): void;
    setLinkValue(link: string, value: string): void;
    setLinkValues(values: Record<string, string>): void;
    setPayloadValue(key: string, value: PayloadValue): void;
    setPayloadValues(values: Record<string, PayloadValue>): void;
    /**
     * `setOpenTrackingPixel` will set the open tracking pixel.
     *
     * @param pixel - The open tracking pixel
     */
    setOpenTrackingPixel(pixel?: string): void;
    /**
     * `setShouldReplaceVariableValues` will determine whether to replace the
     * variable values or not. Otherwise, it will just return the formatted variable.
     *
     * Default: `false`
     */
    setShouldReplaceVariableValues(shouldReplace: boolean): void;
    /**
     * `setMetaTags` will add the meta tags.
     *
     * @param meta - The meta tags
     */
    setMetaTags(meta: MetaDescriptors): void;
    /**
     * `setHtmlProps` will set the HTML props.
     *
     * @param props - The HTML props
     */
    setHtmlProps(props: HtmlProps): void;
    getAllLinks(): Set<string>;
    private isValidUrl;
    render(options?: RenderOptions): Promise<string>;
    /**
     * `markup` will render the JSON content into React Email markup.
     * and return the raw React Tree.
     */
    markup(): react_jsx_runtime.JSX.Element;
    private getMarginOverrideConditions;
    private getMappedContent;
    private renderNode;
    private renderMark;
    private paragraph;
    private text;
    private bold;
    private italic;
    private underline;
    private strike;
    private textStyle;
    private link;
    private removeLinkProtocol;
    private variableUrlValue;
    private heading;
    private variable;
    private getVariableValue;
    private horizontalRule;
    private orderedList;
    private bulletList;
    private listItem;
    private button;
    private spacer;
    private hardBreak;
    private logo;
    private image;
    private footer;
    private blockquote;
    private code;
    private linkCard;
    private section;
    private columns;
    private adjustColumnsContent;
    private column;
    private repeat;
    /**
     * @deprecated
     * This for node is an alias for the repeat node
     * we will remove this in the future
     * @param node
     * @param options
     * @returns JSX.Element
     */
    private for;
    private shouldShow;
    htmlCodeBlock(node: JSONContent, options?: NodeOptions): JSX.Element;
    private inlineImage;
}

declare function render(content: JSONContent, config?: MailyConfig & RenderOptions): Promise<string>;

export { DEFAULT_BUTTON_PADDING_BOTTOM, DEFAULT_BUTTON_PADDING_LEFT, DEFAULT_BUTTON_PADDING_RIGHT, DEFAULT_BUTTON_PADDING_TOP, DEFAULT_COLUMNS_GAP, DEFAULT_COLUMNS_WIDTH, DEFAULT_COLUMN_BACKGROUND_COLOR, DEFAULT_COLUMN_BORDER_COLOR, DEFAULT_COLUMN_BORDER_RADIUS, DEFAULT_COLUMN_BORDER_WIDTH, DEFAULT_COLUMN_PADDING_BOTTOM, DEFAULT_COLUMN_PADDING_LEFT, DEFAULT_COLUMN_PADDING_RIGHT, DEFAULT_COLUMN_PADDING_TOP, DEFAULT_HTML_PROPS, DEFAULT_INLINE_IMAGE_HEIGHT, DEFAULT_INLINE_IMAGE_WIDTH, DEFAULT_META_TAGS, DEFAULT_SECTION_ALIGN, DEFAULT_SECTION_BACKGROUND_COLOR, DEFAULT_SECTION_BORDER_COLOR, DEFAULT_SECTION_BORDER_WIDTH, DEFAULT_SECTION_MARGIN_BOTTOM, DEFAULT_SECTION_MARGIN_LEFT, DEFAULT_SECTION_MARGIN_RIGHT, DEFAULT_SECTION_MARGIN_TOP, DEFAULT_SECTION_PADDING_BOTTOM, DEFAULT_SECTION_PADDING_LEFT, DEFAULT_SECTION_PADDING_RIGHT, DEFAULT_SECTION_PADDING_TOP, LINK_PROTOCOL_REGEX, type LinkValues, Maily, type MailyConfig, type MarkType, type PayloadValue, type PayloadValues, type RenderOptions, type ThemeOptions, type VariableFormatter, type VariableValues, render };
