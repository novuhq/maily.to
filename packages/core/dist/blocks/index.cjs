"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/blocks.ts
var blocks_exports = {};
__export(blocks_exports, {
  blockquote: () => blockquote,
  bulletList: () => bulletList,
  button: () => button,
  clearLine: () => clearLine,
  columns: () => columns,
  divider: () => divider,
  footer: () => footer,
  hardBreak: () => hardBreak,
  heading1: () => heading1,
  heading2: () => heading2,
  heading3: () => heading3,
  htmlCodeBlock: () => htmlCodeBlock,
  image: () => image,
  inlineImage: () => inlineImage,
  linkCard: () => linkCard,
  logo: () => logo,
  orderedList: () => orderedList,
  repeat: () => repeat,
  section: () => section,
  spacer: () => spacer,
  text: () => text
});
module.exports = __toCommonJS(blocks_exports);

// src/blocks/button.tsx
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var button = {
  title: "Button",
  description: "Add a call to action button to email.",
  searchTerms: ["link", "button", "cta"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MousePointer, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setButton().run();
  }
};
var linkCard = {
  title: "Link Card",
  description: "Add a link card to email.",
  searchTerms: ["link", "button", "image"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRightSquare, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setLinkCard().run();
  },
  render: (editor) => {
    return editor.extensionManager.extensions.findIndex(
      (ext) => ext.name === "linkCard"
    ) === -1 ? null : true;
  }
};

// src/blocks/code.tsx
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var htmlCodeBlock = {
  title: "Custom HTML",
  description: "Insert a custom HTML block",
  searchTerms: ["html", "code", "custom"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.CodeXmlIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHtmlCodeBlock({ language: "html" }).run();
  }
};

// src/blocks/image.tsx
var import_state = require("@tiptap/pm/state");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var image = {
  title: "Image",
  description: "Full width image",
  searchTerms: ["image"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react3.ImageIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setImage({ src: "" }).run();
  }
};
var logo = {
  title: "Logo",
  description: "Add your brand logo",
  searchTerms: ["image", "logo"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react3.ImageIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setLogoImage({ src: "" }).run();
  }
};
var inlineImage = {
  title: "Inline Image",
  description: "Inline image",
  searchTerms: ["image", "inline"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react3.ImageIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setInlineImage({
      src: "https://maily.to/brand/logo.png"
    }).command((props) => {
      const { tr, state, view, editor: editor2 } = props;
      const { from } = range;
      const node = state.doc.nodeAt(from);
      if (!node) {
        return false;
      }
      const selection = import_state.TextSelection.create(
        tr.doc,
        from,
        from + node.nodeSize
      );
      tr.setSelection(selection);
      return true;
    }).run();
  }
};

// src/blocks/layout.tsx
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var columns = {
  title: "Columns",
  description: "Add columns to email.",
  searchTerms: ["layout", "columns"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react4.ColumnsIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setColumns().focus(editor.state.selection.head - 2).run();
  }
};
var section = {
  title: "Section",
  description: "Add a section to email.",
  searchTerms: ["layout", "section"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react4.RectangleHorizontal, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setSection().run();
  }
};
var repeat = {
  title: "Repeat",
  description: "Loop over an array of items.",
  searchTerms: ["repeat", "for", "loop"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react4.Repeat2, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setRepeat().run();
  }
};
var spacer = {
  title: "Spacer",
  description: "Add space between blocks.",
  searchTerms: ["space", "gap", "divider"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react4.MoveVertical, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setSpacer({ height: "sm" }).run();
  }
};
var divider = {
  title: "Divider",
  description: "Add a horizontal divider.",
  searchTerms: ["divider", "line"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react4.Minus, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run();
  }
};

// src/blocks/list.tsx
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var bulletList = {
  title: "Bullet List",
  description: "Create a simple bullet list.",
  searchTerms: ["unordered", "point"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react5.List, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleBulletList().run();
  }
};
var orderedList = {
  title: "Numbered List",
  description: "Create a list with numbering.",
  searchTerms: ["ordered"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react5.ListOrdered, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleOrderedList().run();
  }
};

// src/blocks/typography.tsx
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var text = {
  title: "Text",
  description: "Just start typing with plain text.",
  searchTerms: ["p", "paragraph"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.Text, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
  }
};
var heading1 = {
  title: "Heading 1",
  description: "Big heading.",
  searchTerms: ["h1", "title", "big", "large"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.Heading1, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
  }
};
var heading2 = {
  title: "Heading 2",
  description: "Medium heading.",
  searchTerms: ["h2", "subtitle", "medium"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.Heading2, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
  }
};
var heading3 = {
  title: "Heading 3",
  description: "Small heading.",
  searchTerms: ["h3", "subtitle", "small"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.Heading3, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
  }
};
var hardBreak = {
  title: "Hard Break",
  description: "Add a break between lines.",
  searchTerms: ["break", "line"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.DivideIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHardBreak().run();
  }
};
var blockquote = {
  title: "Blockquote",
  description: "Add blockquote.",
  searchTerms: ["quote", "blockquote"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.TextQuote, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleBlockquote().run();
  }
};
var footer = {
  title: "Footer",
  description: "Add a footer text to email.",
  searchTerms: ["footer", "text"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.FootprintsIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setFooter().run();
  }
};
var clearLine = {
  title: "Clear Line",
  description: "Clear the current line.",
  searchTerms: ["clear", "line"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react6.EraserIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().selectParentNode().deleteSelection().run();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blockquote,
  bulletList,
  button,
  clearLine,
  columns,
  divider,
  footer,
  hardBreak,
  heading1,
  heading2,
  heading3,
  htmlCodeBlock,
  image,
  inlineImage,
  linkCard,
  logo,
  orderedList,
  repeat,
  section,
  spacer,
  text
});
//# sourceMappingURL=index.cjs.map