'use client'
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Editor: () => Editor13
});
module.exports = __toCommonJS(src_exports);

// src/editor/index.tsx
var import_react66 = require("@tiptap/react");
var import_react67 = require("react");

// src/editor/components/column-menu/columns-bubble-menu.tsx
var import_react8 = require("@tiptap/react");
var import_react9 = require("react");

// src/editor/utils/get-render-container.ts
function getRenderContainer(editor, nodeType) {
  const {
    view,
    state: {
      selection: { from }
    }
  } = editor;
  const elements = document.querySelectorAll(".has-focus");
  const elementCount = elements.length;
  const innermostNode = elements[elementCount - 1];
  const element = innermostNode;
  if (element && element.getAttribute("data-type") && element.getAttribute("data-type") === nodeType || element && element.classList && (element.classList.contains(nodeType) || element.classList.contains(`node-${nodeType}`))) {
    return element;
  }
  const node = view.domAtPos(from).node;
  let container = node;
  if (!container.tagName) {
    container = node.parentElement;
  }
  while (container && !(container.getAttribute("data-type") && container.getAttribute("data-type") === nodeType) && !container.classList.contains(nodeType)) {
    container = container.parentElement;
  }
  return container;
}

// src/editor/components/column-menu/columns-bubble-menu.tsx
var import_tippy = require("tippy.js");

// src/editor/utils/is-text-selected.ts
var import_core = require("@tiptap/core");
function isTextSelected(editor) {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to }
    }
  } = editor;
  const isEmptyTextBlock = !doc.textBetween(from, to).length && (0, import_core.isTextSelection)(selection);
  if (empty || isEmptyTextBlock || !editor.isEditable) {
    return false;
  }
  return true;
}

// src/editor/utils/columns.ts
var import_model = require("@tiptap/pm/model");
var import_state = require("@tiptap/pm/state");
var import_uuid2 = require("uuid");
var import_core3 = require("@tiptap/core");

// src/editor/utils/update-attribute.ts
function updateAttributes(type, attrs) {
  return ({ commands }) => commands.command(({ tr, state, dispatch }) => {
    if (dispatch) {
      let lastPos = null;
      tr.selection.ranges.forEach((range) => {
        state.doc.nodesBetween(
          range.$from.pos,
          range.$to.pos,
          (node, pos) => {
            if (node.type.name === type) {
              lastPos = pos;
            }
          }
        );
      });
      if (lastPos !== null) {
        const node = state.doc.nodeAt(lastPos);
        if (node) {
          tr.setNodeMarkup(lastPos, null, __spreadValues(__spreadValues({}, node.attrs), attrs));
        } else {
          for (const [key, value] of Object.entries(attrs)) {
            tr.setNodeAttribute(lastPos, key, value);
          }
        }
      }
      if (type === "button") {
        tr.setSelection(tr.selection);
      }
    }
    return true;
  });
}

// src/editor/nodes/columns/column.ts
var import_core2 = require("@tiptap/core");
var import_uuid = require("uuid");
var DEFAULT_COLUMN_WIDTH = "auto";
var DEFAULT_COLUMN_VERTICAL_ALIGN = "top";
var ColumnExtension = import_core2.Node.create({
  name: "column",
  content: "block+",
  isolating: true,
  addAttributes() {
    return {
      columnId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-column-id") || (0, import_uuid.v4)(),
        renderHTML: (attributes) => {
          if (!attributes.columnId) {
            return {
              "data-column-id": (0, import_uuid.v4)()
            };
          }
          return {
            "data-column-id": attributes.columnId
          };
        }
      },
      width: {
        default: DEFAULT_COLUMN_WIDTH,
        parseHTML: (element) => element.style.width.replace(/['"]+/g, "") || DEFAULT_COLUMN_WIDTH,
        renderHTML: (attributes) => {
          if (!attributes.width || attributes.width === DEFAULT_COLUMN_WIDTH) {
            return {};
          }
          return {
            style: `width: ${attributes.width}%;max-width:${attributes.width}%`
          };
        }
      },
      verticalAlign: {
        default: DEFAULT_COLUMN_VERTICAL_ALIGN,
        parseHTML: (element) => {
          var _a;
          return ((_a = element == null ? void 0 : element.style) == null ? void 0 : _a.verticalAlign) || "top";
        },
        renderHTML: (attributes) => {
          const { verticalAlign } = attributes;
          if (!verticalAlign || verticalAlign === DEFAULT_COLUMN_VERTICAL_ALIGN) {
            return {};
          }
          if (verticalAlign === "middle") {
            return {
              style: `display: flex;flex-direction: column;justify-content: center;`
            };
          } else if (verticalAlign === "bottom") {
            return {
              style: `display: flex;flex-direction: column;justify-content: flex-end;`
            };
          }
        }
      }
    };
  },
  addCommands() {
    return {
      updateColumn: (attrs) => updateAttributes(this.name, attrs)
    };
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    return [
      "div",
      (0, import_core2.mergeAttributes)(HTMLAttributes2, {
        "data-type": "column",
        class: "hide-scrollbars"
      }),
      0
    ];
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]'
      }
    ];
  }
});

// src/editor/utils/columns.ts
function getColumnCount(editor) {
  var _a, _b;
  return ((_b = (_a = getClosestNodeByName(editor, "columns")) == null ? void 0 : _a.node) == null ? void 0 : _b.childCount) || 0;
}
function getClosestNodeByName(editor, name) {
  const { state } = editor.view;
  return (0, import_core3.findParentNode)((node) => node.type.name === name)(state.selection);
}
function goToColumn(editor, type) {
  const columnsNode = getClosestNodeByName(editor, "columns");
  const columnNode = getClosestNodeByName(editor, "column");
  if (!columnsNode || !columnNode) {
    return false;
  }
  const { state, dispatch } = editor.view;
  const cols = columnsNode.node;
  let currColumnIndex = 0;
  cols.content.forEach((child, _, index) => {
    var _a, _b, _c;
    if (child.eq(columnNode.node) && ((_a = child == null ? void 0 : child.attrs) == null ? void 0 : _a.columnId) === ((_c = (_b = columnNode.node) == null ? void 0 : _b.attrs) == null ? void 0 : _c.columnId)) {
      currColumnIndex = index;
    }
  });
  const nextColumnIndex = type === "next" ? currColumnIndex + 1 : currColumnIndex - 1;
  if (nextColumnIndex < 0 || nextColumnIndex >= cols.childCount) {
    return false;
  }
  let nextColumnPos = columnsNode.pos;
  cols.content.forEach((child, _, index) => {
    if (index < nextColumnIndex) {
      nextColumnPos += child.nodeSize;
    }
  });
  const tr = state.tr.setTime(Date.now());
  const textSelection = import_state.TextSelection.near(tr.doc.resolve(nextColumnPos));
  tr.setSelection(textSelection);
  dispatch(tr);
  return true;
}
function updateColumnWidth(editor, index, width = "auto") {
  const { node: columnsNode, pos: columnsNodePos = 0 } = getClosestNodeByName(editor, "columns") || {};
  if (!columnsNode) {
    return false;
  }
  const { state, dispatch } = editor.view;
  const { tr } = state;
  const { selection } = state;
  const beforeNodeEnd = columnsNodePos + columnsNode.nodeSize;
  const selectionRelative = {
    from: selection.from - columnsNodePos,
    to: selection.to - columnsNodePos
  };
  const updatedContent = [];
  columnsNode.content.forEach((child, _, i) => {
    var _a;
    updatedContent.push(
      child.type.create(
        __spreadProps(__spreadValues({}, child == null ? void 0 : child.attrs), {
          width: i === index ? width : (_a = child == null ? void 0 : child.attrs) == null ? void 0 : _a.width
        }),
        child.content
      )
    );
  });
  const updatedColumnsNode = columnsNode.copy(import_model.Fragment.from(updatedContent));
  const transaction = tr.replaceWith(
    columnsNodePos,
    beforeNodeEnd,
    updatedColumnsNode
  );
  const newSelection = import_state.TextSelection.create(
    transaction.doc,
    columnsNodePos + selectionRelative.from,
    columnsNodePos + selectionRelative.to
  );
  dispatch(transaction.setSelection(newSelection));
  return true;
}
function addColumnByIndex(editor, index = -1) {
  const { node: columnsNode, pos: columnsNodePos = 0 } = getClosestNodeByName(editor, "columns") || {};
  if (!columnsNode) {
    return false;
  }
  const columnIndex = index < 0 ? columnsNode.childCount : index;
  const { state } = editor.view;
  const newColumn = state.schema.nodes.column.create(
    {
      width: DEFAULT_COLUMN_WIDTH,
      columnId: (0, import_uuid2.v4)()
    },
    state.schema.nodes.paragraph.create(null)
  );
  const updatedContent = [];
  columnsNode.content.forEach((child, _, i) => {
    updatedContent.push(child);
    if (i === columnIndex) {
      updatedContent.push(newColumn);
    }
  });
  if (index === -1) {
    updatedContent.push(newColumn);
  }
  const updatedColumnsNode = columnsNode.copy(import_model.Fragment.from(updatedContent));
  const transaction = state.tr.replaceWith(
    columnsNodePos,
    columnsNodePos + columnsNode.nodeSize,
    updatedColumnsNode
  );
  const newColumnPos = columnsNodePos + updatedContent.slice(0, columnIndex).reduce((acc, node) => acc + node.nodeSize, 0);
  const textSelection = import_state.TextSelection.near(
    transaction.doc.resolve(newColumnPos)
  );
  transaction.setSelection(textSelection);
  editor.view.dispatch(transaction);
  return true;
}
function removeColumnByIndex(editor, index = -1) {
  const { node: columnsNode, pos: columnsNodePos = 0 } = getClosestNodeByName(editor, "columns") || {};
  if (!columnsNode) {
    return false;
  }
  const { state, dispatch } = editor.view;
  const { tr } = state;
  const updatedContent = [];
  columnsNode.content.forEach((child, _, i) => {
    if (i !== index) {
      updatedContent.push(child);
    }
  });
  if (index === -1) {
    updatedContent.pop();
  }
  const updatedColumnsNode = columnsNode.copy(import_model.Fragment.from(updatedContent));
  const transaction = tr.replaceWith(
    columnsNodePos,
    columnsNodePos + columnsNode.nodeSize,
    updatedColumnsNode
  );
  const nextColumnIndex = index === columnsNode.childCount - 1 ? index - 1 : index;
  const nextColumnPos = columnsNodePos + updatedContent.slice(0, nextColumnIndex).reduce((acc, node) => acc + node.nodeSize, 0);
  const textSelection = import_state.TextSelection.near(
    transaction.doc.resolve(nextColumnPos)
  );
  transaction.setSelection(textSelection);
  dispatch(transaction);
  return true;
}
function getColumnWidths(editor) {
  const { node: columnsNode, pos: columnsNodePos = 0 } = getClosestNodeByName(editor, "columns") || {};
  if (!columnsNode) {
    return [];
  }
  const columnsWidth = [];
  columnsNode.content.forEach((child) => {
    const { columnId, width } = child.attrs;
    columnsWidth.push({ id: columnId, width });
  });
  return columnsWidth;
}

// src/editor/components/column-menu/use-columns-state.tsx
var import_react = require("@tiptap/react");
var import_fast_deep_equal = __toESM(require("fast-deep-equal"), 1);
var useColumnsState = (editor) => {
  const states = (0, import_react.useEditorState)({
    editor,
    selector: (ctx) => {
      var _a, _b, _c;
      return {
        isSectionActive: ctx.editor.isActive("section"),
        isColumnActive: ctx.editor.isActive("column"),
        currentVerticalAlignment: ((_a = ctx.editor.getAttributes("column")) == null ? void 0 : _a.verticalAlign) || "top",
        currentShowIfKey: ((_b = ctx.editor.getAttributes("columns")) == null ? void 0 : _b.showIfKey) || "",
        columnsCount: getColumnCount(ctx.editor),
        columnWidths: getColumnWidths(ctx.editor).map((c) => c.width),
        currentColumnsGap: ((_c = ctx.editor.getAttributes("columns")) == null ? void 0 : _c.gap) || 0
      };
    },
    equalityFn: import_fast_deep_equal.default
  });
  return states;
};

// src/editor/utils/classname.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
var twMerge = (0, import_tailwind_merge.extendTailwindMerge)({
  prefix: "mly-"
});
function cn(...inputs) {
  return twMerge((0, import_clsx.clsx)(inputs));
}

// src/editor/components/ui/divider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Divider(props) {
  const { type = "vertical", className } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: cn(
        "mly-shrink-0 mly-bg-gray-200",
        type === "vertical" ? "mly-mx-0.5 mly-w-px" : "mly-my-0.5 mly-h-px",
        className
      )
    }
  );
}

// src/editor/components/ui/tooltip.tsx
var React = __toESM(require("react"), 1);
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React.forwardRef((_a, ref) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    TooltipPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: cn(
        "mly-z-50 mly-overflow-hidden mly-rounded-md mly-border mly-border-gray-200 mly-bg-white mly-px-2 mly-py-1 mly-text-xs mly-animate-in mly-fade-in-0 mly-zoom-in-95",
        className
      )
    }, props)
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// src/editor/components/vertical-alignment-switch.tsx
var import_lucide_react = require("lucide-react");

// src/editor/components/base-button.tsx
var React2 = __toESM(require("react"), 1);
var import_react_slot = require("@radix-ui/react-slot");
var import_jsx_runtime3 = require("react/jsx-runtime");
var BaseButton = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant = "default",
      size = "default",
      asChild = false
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "size",
      "asChild"
    ]);
    const Comp = asChild ? import_react_slot.Slot : "button";
    const baseClass = "mly-inline-flex mly-items-center mly-justify-center mly-rounded-md mly-text-sm mly-font-medium mly-ring-offset-white mly-transition-colors focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2 focus-visible:mly-relative focus-visible:mly-z-10 disabled:mly-opacity-50 ";
    const variantClasses = {
      default: "mly-bg-gray-900 mly-text-gray-50 hover:mly-bg-soft-gray",
      destructive: "mly-bg-red-500 mly-text-gray-50 hover:mly-bg-red-500/90",
      outline: "mly-border mly-border-gray-200 mly-bg-white hover:mly-bg-gray-100 hover:mly-text-gray-900",
      secondary: "mly-bg-gray-100 mly-text-gray-900 hover:mly-bg-gray-100/80",
      ghost: "hover:mly-bg-soft-gray bg-transparent hover:mly-text-gray-900 data-[state=true]:mly-bg-soft-gray data-[state=true]:mly-text-gray-900",
      link: "mly-text-gray-900 mly-underline-offset-4 hover:mly-underline"
    };
    const sizeClasses = {
      default: "mly-h-10 mly-px-4 mly-py-2",
      sm: "mly-h-9 mly-rounded-md mly-px-3",
      lg: "mly-h-11 mly-rounded-md mly-px-8",
      icon: "mly-h-10 mly-w-10"
    };
    const classes = cn(
      "mly-editor",
      baseClass,
      variantClasses[variant],
      sizeClasses[size],
      className
    );
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Comp, __spreadValues({ className: classes, ref }, props));
  }
);
BaseButton.displayName = "BaseButton";

// src/editor/components/bubble-menu-button.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function BubbleMenuButton(item) {
  var _a;
  const { tooltip } = item;
  const content = /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    BaseButton,
    __spreadProps(__spreadValues({
      variant: "ghost",
      size: "sm"
    }, item.command ? { onClick: item.command } : {}), {
      "data-state": (_a = item == null ? void 0 : item.isActive) == null ? void 0 : _a.call(item),
      className: cn(
        "!mly-size-7 mly-px-2.5 disabled:mly-cursor-not-allowed",
        item == null ? void 0 : item.className
      ),
      type: "button",
      disabled: item.disbabled,
      children: item.icon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        item.icon,
        {
          className: cn(
            "mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5]",
            item == null ? void 0 : item.iconClassName
          )
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "span",
        {
          className: cn(
            "mly-text-sm mly-font-medium mly-text-slate-600",
            item == null ? void 0 : item.nameClassName
          ),
          children: item.name
        }
      )
    })
  );
  if (tooltip) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Tooltip, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TooltipTrigger, { asChild: true, children: content }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TooltipContent, { sideOffset: 8, children: tooltip })
    ] });
  }
  return content;
}

// src/editor/components/vertical-alignment-switch.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function VerticalAlignmentSwitch(props) {
  const { alignment = "top", onAlignmentChange } = props;
  const activeAlignment = {
    top: {
      icon: import_lucide_react.AlignVerticalDistributeStart,
      tooltip: "Align Top",
      onClick: () => {
        onAlignmentChange("middle");
      }
    },
    middle: {
      icon: import_lucide_react.AlignVerticalDistributeCenter,
      tooltip: "Align Center",
      onClick: () => {
        onAlignmentChange("bottom");
      }
    },
    bottom: {
      icon: import_lucide_react.AlignVerticalDistributeEnd,
      tooltip: "Align Bottom",
      onClick: () => {
        onAlignmentChange("top");
      }
    }
  }[alignment];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    BubbleMenuButton,
    {
      icon: activeAlignment.icon,
      tooltip: activeAlignment.tooltip,
      command: activeAlignment.onClick
    }
  );
}

// src/editor/components/show-popover.tsx
var import_lucide_react3 = require("lucide-react");
var import_react6 = require("react");

// src/editor/utils/node-options.ts
var import_react2 = require("react");
function getNodeOptions(editor, name) {
  const node = editor.extensionManager.extensions.find(
    (extension) => extension.name === name
  );
  if (!node) {
    throw new Error(`Node ${name} not found`);
  }
  return node.options;
}
function getVariableOptions(editor) {
  return getNodeOptions(editor, "variable");
}
function useVariableOptions(editor) {
  return (0, import_react2.useMemo)(() => {
    return getVariableOptions(editor);
  }, [editor]);
}

// src/editor/utils/variable.ts
function processVariables(variables, options) {
  const { query } = options;
  const queryLower = query.toLowerCase();
  let filteredVariables = [];
  if (Array.isArray(variables)) {
    filteredVariables = variables.filter(
      (variable) => variable.name.toLowerCase().startsWith(queryLower)
    );
    if (query.length > 0 && !filteredVariables.some((variable) => variable.name === query)) {
      filteredVariables.push({ name: query, required: true });
    }
    return filteredVariables;
  } else if (typeof variables === "function") {
    return variables(options);
  } else {
    throw new Error(`Invalid variables type. Expected 'Array' or 'Function', but received '${typeof variables}'.

You can check out the documentation for more information: https://github.com/arikchakma/maily.to/blob/main/packages/core/readme.md`);
  }
}

// src/editor/components/popover.tsx
var React3 = __toESM(require("react"), 1);
var PopoverPrimitive = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, align = "center", sideOffset = 4 } = _b, props = __objRest(_b, ["className", "align", "sideOffset"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(PopoverPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    PopoverPrimitive.Content,
    __spreadValues({
      ref,
      align,
      sideOffset,
      className: cn(
        "mly-z-[9999] mly-w-72 mly-rounded-md mly-border mly-border-gray-200 mly-bg-white mly-p-4 mly-text-gray-950 mly-shadow-md mly-outline-none",
        "mly-editor",
        className
      )
    }, props)
  ) });
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// src/editor/utils/constants.ts
var AUTOCOMPLETE_PASSWORD_MANAGERS_OFF = Object.freeze({
  autoComplete: "off",
  "data-1p-ignore": true,
  "data-form-type": "other"
});

// src/editor/utils/use-outside-click.ts
var import_react3 = require("react");
var import_react4 = require("react");
function useOutsideClick(ref, callback) {
  const handleClick = (0, import_react3.useCallback)(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    },
    [ref, callback]
  );
  (0, import_react4.useEffect)(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handleClick]);
}

// src/editor/components/ui/input-autocomplete.tsx
var import_lucide_react2 = require("lucide-react");
var import_react5 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var InputAutocomplete = (0, import_react5.forwardRef)((props, ref) => {
  var _b;
  const _a = props, {
    value = "",
    onValueChange,
    className,
    onOutsideClick,
    onSelectOption,
    autoCompleteOptions = [],
    triggerChar = "",
    editor
  } = _a, inputProps = __objRest(_a, [
    "value",
    "onValueChange",
    "className",
    "onOutsideClick",
    "onSelectOption",
    "autoCompleteOptions",
    "triggerChar",
    "editor"
  ]);
  const containerRef = (0, import_react5.useRef)(null);
  const popoverRef = (0, import_react5.useRef)(null);
  const VariableSuggestionPopoverComponent = (_b = useVariableOptions(editor)) == null ? void 0 : _b.variableSuggestionsPopover;
  useOutsideClick(containerRef, () => {
    onOutsideClick == null ? void 0 : onOutsideClick();
  });
  const isTriggeringVariable = value.startsWith(triggerChar);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: cn("mly-relative"), ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "mly-relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "input",
        __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, AUTOCOMPLETE_PASSWORD_MANAGERS_OFF), {
          placeholder: "e.g. items",
          type: "text"
        }), inputProps), {
          ref,
          value,
          onChange: (e) => {
            onValueChange(e.target.value);
          },
          className: cn(
            "mly-h-7 mly-w-40 mly-rounded-md mly-bg-white mly-px-2 mly-pr-6 mly-text-sm mly-text-midnight-gray hover:mly-bg-soft-gray focus:mly-bg-soft-gray focus:mly-outline-none",
            className
          ),
          onKeyDown: (e) => {
            if (!popoverRef.current || !isTriggeringVariable) {
              return;
            }
            const { moveUp, moveDown, select } = popoverRef.current;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              moveDown();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              moveUp();
            } else if (e.key === "Enter") {
              e.preventDefault();
              select();
            }
          },
          spellCheck: false
        })
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mly-absolute mly-inset-y-0 mly-right-1 mly-flex mly-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react2.CornerDownLeft, { className: "mly-h-3 mly-w-3 mly-stroke-[2.5] mly-text-midnight-gray" }) })
    ] }),
    isTriggeringVariable && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mly-absolute mly-left-0 mly-top-8", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      VariableSuggestionPopoverComponent,
      {
        items: autoCompleteOptions.map((option) => {
          return {
            name: option
          };
        }),
        onSelectItem: (item) => {
          onSelectOption == null ? void 0 : onSelectOption(item.name);
        },
        ref: popoverRef
      }
    ) })
  ] });
});
InputAutocomplete.displayName = "InputAutocomplete";

// src/editor/components/show-popover.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function _ShowPopover(props) {
  const { showIfKey = "", onShowIfKeyValueChange, editor } = props;
  const opts = useVariableOptions(editor);
  const variables = opts == null ? void 0 : opts.variables;
  const renderVariable = opts == null ? void 0 : opts.renderVariable;
  const [isUpdatingKey, setIsUpdatingKey] = (0, import_react6.useState)(false);
  const inputRef = (0, import_react6.useRef)(null);
  const autoCompleteOptions = (0, import_react6.useMemo)(() => {
    return processVariables(variables, {
      query: showIfKey || "",
      from: "bubble-variable",
      editor
    }).map((variable) => variable.name);
  }, [variables, showIfKey, editor]);
  const isValidWhenKey = showIfKey || autoCompleteOptions.includes(showIfKey);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    Popover,
    {
      onOpenChange: (open) => {
        if (open) {
          return;
        }
        setIsUpdatingKey(false);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            PopoverTrigger,
            {
              className: cn(
                "mly-flex mly-size-7 mly-items-center mly-justify-center mly-gap-1 mly-rounded-md mly-px-1.5 mly-text-sm data-[state=open]:mly-bg-soft-gray hover:mly-bg-soft-gray focus-visible:mly-relative focus-visible:mly-z-10 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2",
                showIfKey && "mly-bg-rose-100 mly-text-rose-800 data-[state=open]:mly-bg-rose-100 hover:mly-bg-rose-100"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react3.Eye, { className: "mly-h-3 mly-w-3 mly-stroke-[2.5]" })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TooltipContent, { sideOffset: 8, children: "Show block conditionally" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          PopoverContent,
          {
            className: "mly-flex mly-w-max mly-rounded-lg !mly-p-0.5",
            side: "top",
            sideOffset: 8,
            align: "end",
            onOpenAutoFocus: (e) => {
              e.preventDefault();
            },
            onCloseAutoFocus: (e) => {
              e.preventDefault();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mly-flex mly-items-center mly-gap-1.5 mly-px-1.5 mly-text-sm mly-leading-none", children: [
                "Show if",
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Tooltip, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TooltipTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    import_lucide_react3.InfoIcon,
                    {
                      className: cn("mly-size-3 mly-stroke-[2.5] mly-text-gray-500")
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    TooltipContent,
                    {
                      sideOffset: 14,
                      className: "mly-max-w-[285px]",
                      align: "start",
                      children: "Show the block if the selected variable is true."
                    }
                  )
                ] })
              ] }),
              !isUpdatingKey && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "button",
                {
                  onClick: () => {
                    setIsUpdatingKey(true);
                    setTimeout(() => {
                      var _a;
                      (_a = inputRef.current) == null ? void 0 : _a.focus();
                    }, 0);
                  },
                  children: renderVariable({
                    variable: {
                      name: showIfKey,
                      valid: !!isValidWhenKey
                    },
                    fallback: "",
                    from: "bubble-variable",
                    editor
                  })
                }
              ),
              isUpdatingKey && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    setIsUpdatingKey(false);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Escape") {
                      setIsUpdatingKey(false);
                    }
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    InputAutocomplete,
                    {
                      editor,
                      value: showIfKey || "",
                      onValueChange: (value) => {
                        onShowIfKeyValueChange == null ? void 0 : onShowIfKeyValueChange(value);
                      },
                      onOutsideClick: () => {
                        setIsUpdatingKey(false);
                      },
                      onSelectOption: (value) => {
                        onShowIfKeyValueChange == null ? void 0 : onShowIfKeyValueChange(value);
                        setIsUpdatingKey(false);
                      },
                      autoCompleteOptions,
                      ref: inputRef
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
var ShowPopover = (0, import_react6.memo)(_ShowPopover);

// src/editor/components/column-menu/columns-width-config.tsx
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function ColumnsWidthConfig(props) {
  const {
    columnsCount = 2,
    onColumnsCountChange,
    columnWidths,
    onColumnWidthChange
  } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PopoverTrigger, { className: "mly-flex mly-size-7 mly-items-center mly-justify-center mly-gap-1 mly-rounded-md mly-text-sm data-[state=open]:mly-bg-soft-gray hover:mly-bg-soft-gray", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react4.SlidersVertical, { className: "mly-h-3 mly-w-3 mly-stroke-[2.5]" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      PopoverContent,
      {
        className: "mly-w-[300px] mly-rounded-lg !mly-p-0.5",
        side: "top",
        sideOffset: 8,
        align: "center",
        onOpenAutoFocus: (e) => {
          e.preventDefault();
        },
        onCloseAutoFocus: (e) => {
          e.preventDefault();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mly-grid mly-grid-cols-2 mly-gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              SwitchButton,
              {
                onClick: () => onColumnsCountChange(2),
                isActive: columnsCount === 2,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react4.Columns2, { className: "mly-h-4 mly-w-4 mly-stroke-[2.5]" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "2 Columns" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              SwitchButton,
              {
                onClick: () => onColumnsCountChange(3),
                isActive: columnsCount === 3,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react4.Columns3, { className: "mly-h-4 mly-w-4 mly-stroke-[2.5]" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "3 Columns" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("hr", { className: "mly-my-0.5 mly-border-gray-200" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "div",
            {
              className: "mly-grid mly-gap-1 mly-p-1",
              style: { gridTemplateColumns: `repeat(${columnsCount}, 1fr)` },
              children: Array.from({ length: columnsCount }).map((_, index) => {
                const value = columnWidths[index] === "auto" ? "" : columnWidths[index];
                const label = columnsCount === 2 ? index === 0 ? "Left" : "Right" : index === 0 ? "Left" : index === 1 ? "Middle" : "Right";
                return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mly-flex mly-flex-col mly-gap-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mly-text-xs mly-text-gray-400", children: label }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: "mly-relative", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                      "input",
                      __spreadProps(__spreadValues({}, AUTOCOMPLETE_PASSWORD_MANAGERS_OFF), {
                        placeholder: "auto",
                        min: 1,
                        max: 90,
                        type: "number",
                        className: "hide-number-controls mly-w-full mly-appearance-none mly-rounded-md mly-bg-soft-gray mly-px-1.5 mly-py-1 mly-pr-6 mly-text-sm mly-tabular-nums mly-outline-none focus:mly-bg-soft-gray focus:mly-outline-none focus:mly-ring-1 focus:mly-ring-midnight-gray/50",
                        value,
                        onChange: (e) => {
                          const value2 = e.target.value;
                          onColumnWidthChange == null ? void 0 : onColumnWidthChange(index, value2);
                        }
                      })
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mly-absolute mly-inset-y-0 mly-right-0 mly-flex mly-aspect-square mly-items-center mly-justify-center mly-text-xs mly-tabular-nums mly-text-gray-500", children: "%" })
                  ] })
                ] }, index);
              })
            }
          )
        ]
      }
    )
  ] });
}
function SwitchButton(props) {
  const { onClick, isActive = false, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "button",
    {
      className: cn(
        "mly-flex mly-h-7 mly-items-center mly-gap-1 mly-rounded-md mly-px-2 mly-text-sm mly-text-gray-500 hover:mly-bg-soft-gray hover:mly-text-midnight-gray",
        isActive && "mly-bg-soft-gray mly-text-midnight-gray"
      ),
      onClick,
      children
    }
  );
}

// src/editor/components/ui/select.tsx
var import_react7 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function Select(props) {
  const {
    label,
    options,
    value,
    onValueChange,
    tooltip,
    className,
    icon: Icon,
    iconClassName
  } = props;
  const selectId = `mly${(0, import_react7.useId)()}`;
  const content = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mly-relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("label", { htmlFor: selectId, className: "mly-sr-only", children: label }),
    Icon && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "mly-pointer-events-none mly-absolute mly-inset-y-0 mly-left-2 mly-z-20 mly-flex mly-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { className: cn("mly-size-3", iconClassName) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "select",
      {
        id: selectId,
        className: cn(
          "mly-flex mly-min-h-7 mly-max-w-max mly-appearance-none mly-items-center mly-rounded-md mly-bg-white mly-px-1.5 mly-py-0.5 mly-pr-7 mly-text-sm mly-text-midnight-gray mly-ring-offset-white mly-transition-colors hover:mly-bg-soft-gray focus-visible:mly-relative focus-visible:mly-z-10 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2 active:mly-bg-soft-gray",
          !!Icon && "mly-pl-7",
          className
        ),
        value,
        onChange: (event) => onValueChange(event.target.value),
        children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("option", { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "mly-pointer-events-none mly-absolute mly-inset-y-0 mly-right-0 mly-z-10 mly-flex mly-h-full mly-w-7 mly-items-center mly-justify-center mly-text-gray-600 peer-disabled:mly-opacity-50", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_lucide_react5.ChevronDownIcon,
      {
        size: 16,
        strokeWidth: 2,
        "aria-hidden": "true",
        role: "img"
      }
    ) })
  ] });
  if (!tooltip) {
    return content;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Tooltip, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TooltipTrigger, { asChild: true, children: content }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TooltipContent, { sideOffset: 8, children: tooltip })
  ] });
}

// src/editor/components/column-menu/columns-bubble-menu-content.tsx
var import_lucide_react6 = require("lucide-react");

// src/editor/utils/delete-node.ts
var import_core4 = require("@tiptap/core");
function deleteNode(editor, nodeType) {
  const { state } = editor.view;
  const associatedNode = (0, import_core4.findParentNode)((node) => node.type.name === nodeType)(
    state.selection
  );
  if (!associatedNode) {
    return;
  }
  const from = associatedNode.pos;
  const to = from + associatedNode.node.nodeSize;
  const { tr } = state;
  const transaction = tr.delete(from, to);
  editor.view.dispatch(transaction);
}

// src/editor/utils/spacing.ts
var spacing = [
  {
    name: "Extra Small",
    short: "xs",
    value: 4
  },
  {
    name: "Small",
    short: "sm",
    value: 8
  },
  {
    name: "Medium",
    short: "md",
    value: 16
  },
  {
    name: "Large",
    short: "lg",
    value: 32
  },
  {
    name: "Extra Large",
    short: "xl",
    value: 64
  }
];

// src/editor/components/column-menu/columns-bubble-menu-content.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function ColumnsBubbleMenuContent(props) {
  const { editor } = props;
  if (!editor) {
    return null;
  }
  const state = useColumnsState(editor);
  const currentColumnCount = state.columnsCount;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mly-flex mly-items-stretch", children: [
    state.isColumnActive && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        ColumnsWidthConfig,
        {
          columnsCount: currentColumnCount,
          columnWidths: state.columnWidths,
          onColumnsCountChange: (count) => {
            if (count > currentColumnCount) {
              addColumnByIndex(editor);
            } else {
              removeColumnByIndex(editor);
            }
          },
          onColumnWidthChange: (index, width) => {
            updateColumnWidth(editor, index, width);
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Divider, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      VerticalAlignmentSwitch,
      {
        alignment: state.currentVerticalAlignment,
        onAlignmentChange: (value) => {
          editor.commands.updateColumn({
            verticalAlign: value
          });
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Divider, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      Select,
      {
        icon: import_lucide_react6.Space,
        label: "Columns Gap",
        value: state.currentColumnsGap,
        options: [
          { value: "0", label: "None" },
          ...spacing.map((space) => ({
            label: space.name,
            value: String(space.value)
          }))
        ],
        onValueChange: (value) => {
          editor.commands.updateColumns({
            gap: +value
          });
        },
        tooltip: "Columns Gap"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Divider, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      BubbleMenuButton,
      {
        icon: import_lucide_react6.Trash,
        tooltip: "Delete Columns",
        command: () => {
          deleteNode(editor, "columns");
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Divider, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      ShowPopover,
      {
        showIfKey: state.currentShowIfKey,
        onShowIfKeyValueChange: (value) => {
          editor.commands.updateColumns({
            showIfKey: value
          });
        },
        editor
      }
    )
  ] }) });
}

// src/editor/components/column-menu/columns-bubble-menu.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function ColumnsBubbleMenu(props) {
  const { appendTo, editor } = props;
  if (!editor) {
    return null;
  }
  const getReferenceClientRect = (0, import_react9.useCallback)(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect = (renderContainer == null ? void 0 : renderContainer.getBoundingClientRect()) || new DOMRect(-1e3, -1e3, 0, 0);
    return rect;
  }, [editor]);
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      if (isTextSelected(editor2) || editor2.isActive("section") || editor2.isActive("repeat") || !editor2.isEditable) {
        return false;
      }
      return editor2.isActive("columns");
    },
    tippyOptions: {
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      getReferenceClientRect,
      appendTo: () => appendTo == null ? void 0 : appendTo.current,
      plugins: [import_tippy.sticky],
      sticky: "popper",
      maxWidth: "auto"
    },
    pluginKey: "columnsBubbleMenu"
  });
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_react8.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ColumnsBubbleMenuContent, { editor })
    })
  );
}

// src/editor/components/content-menu.tsx
var import_react11 = require("react");
var import_lucide_react7 = require("lucide-react");

// src/editor/plugins/drag-handle/drag-handle.tsx
var import_react10 = require("react");

// src/editor/plugins/drag-handle/drag-handle-plugin.ts
var import_state2 = require("@tiptap/pm/state");
var import_tippy2 = __toESM(require("tippy.js"), 1);
var import_y_prosemirror = require("y-prosemirror");
var import_model2 = require("@tiptap/pm/model");
function getSelectionRanges(state, range, depth) {
  const ranges = [];
  const root = state.node(0);
  depth = typeof depth === "number" && depth >= 0 ? depth : state.sameParent(range) ? Math.max(0, state.sharedDepth(range.pos) - 1) : state.sharedDepth(range.pos);
  const nodeRange = new import_model2.NodeRange(state, range, depth);
  const startIndex = nodeRange.depth === 0 ? 0 : root.resolve(nodeRange.start).posAtIndex(0);
  nodeRange.parent.forEach((size, offset) => {
    const from = startIndex + offset;
    const to = from + size.nodeSize;
    if (from < nodeRange.start || from >= nodeRange.end) return;
    const selectionRange = new import_state2.SelectionRange(
      root.resolve(from),
      root.resolve(to)
    );
    ranges.push(selectionRange);
  });
  return ranges;
}
var NodeRangeBookmark = class _NodeRangeBookmark {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new _NodeRangeBookmark(
      mapping.map(this.anchor),
      mapping.map(this.head)
    );
  }
  resolve(doc) {
    const e = doc.resolve(this.anchor);
    const o = doc.resolve(this.head);
    return new NodeRangeSelection(e, o);
  }
};
var NodeRangeSelection = class _NodeRangeSelection extends import_state2.Selection {
  constructor(t, e, o, s = 1) {
    const { doc: r } = t;
    const n = t === e;
    const i = t.pos === r.content.size && e.pos === r.content.size;
    const a = n && !i ? r.resolve(e.pos + (s > 0 ? 1 : -1)) : e;
    const c = n && i ? r.resolve(t.pos - (s > 0 ? 1 : -1)) : t;
    const d = getSelectionRanges(c.min(a), c.max(a), o);
    super(
      a.pos >= t.pos ? d[0].$from : d[d.length - 1].$to,
      a.pos >= t.pos ? d[d.length - 1].$to : d[0].$from,
      d
    );
    this.depth = o;
  }
  get $to() {
    return this.ranges[this.ranges.length - 1].$to;
  }
  eq(other) {
    return other instanceof _NodeRangeSelection && other.$from.pos === this.$from.pos && other.$to.pos === this.$to.pos;
  }
  // @ts-ignore
  map(doc, mapping) {
    const o = doc.resolve(mapping.map(this.anchor));
    const s = doc.resolve(mapping.map(this.head));
    return new _NodeRangeSelection(o, s);
  }
  toJSON() {
    return { type: "nodeRange", anchor: this.anchor, head: this.head };
  }
  get isForwards() {
    return this.head >= this.anchor;
  }
  get isBackwards() {
    return !this.isForwards;
  }
  extendBackwards() {
    const { doc: t } = this.$from;
    if (this.isForwards && this.ranges.length > 1) {
      const t2 = this.ranges.slice(0, -1);
      const e2 = t2[0].$from;
      const o2 = t2[t2.length - 1].$to;
      return new _NodeRangeSelection(e2, o2, this.depth);
    }
    const e = this.ranges[0];
    const o = t.resolve(Math.max(0, e.$from.pos - 1));
    return new _NodeRangeSelection(this.$anchor, o, this.depth);
  }
  extendForwards() {
    const { doc: t } = this.$from;
    if (this.isBackwards && this.ranges.length > 1) {
      const t2 = this.ranges.slice(1);
      const e2 = t2[0].$from;
      const o2 = t2[t2.length - 1].$to;
      return new _NodeRangeSelection(o2, e2, this.depth);
    }
    const e = this.ranges[this.ranges.length - 1];
    const o = t.resolve(Math.min(t.content.size, e.$to.pos + 1));
    return new _NodeRangeSelection(this.$anchor, o, this.depth);
  }
  static fromJSON(doc, json) {
    return new _NodeRangeSelection(
      doc.resolve(json.anchor),
      doc.resolve(json.head)
    );
  }
  static create(doc, anchor, head, depth, bias = 1) {
    return new this(doc.resolve(anchor), doc.resolve(head), depth, bias);
  }
  // @ts-ignore
  getBookmark() {
    return new NodeRangeBookmark(this.anchor, this.head);
  }
};
function cloneElement(node) {
  const clonedNode = node.cloneNode(true);
  const originalElements = [
    node,
    ...Array.from(node.getElementsByTagName("*"))
  ];
  const clonedElements = [
    clonedNode,
    ...Array.from(clonedNode.getElementsByTagName("*"))
  ];
  originalElements.forEach((element, index) => {
    const clonedElement = clonedElements[index];
    if (clonedElement instanceof HTMLElement && element instanceof HTMLElement) {
      clonedElement.style.cssText = function(element2) {
        let styles = "";
        const computedStyles = getComputedStyle(element2);
        for (let i = 0; i < computedStyles.length; i += 1) {
          styles += `${computedStyles[i]}:${computedStyles.getPropertyValue(computedStyles[i])};`;
        }
        return styles;
      }(element);
    }
  });
  return clonedNode;
}
function getComputedStyles(node, property) {
  return window.getComputedStyle(node)[property];
}
function minMax(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(value, min), max);
}
function removeNode(node) {
  if (node.parentNode !== null && node.parentNode !== void 0) {
    node.parentNode.removeChild(node);
  }
}
var findElementNextToCoords = (options) => {
  const { x, y, direction, editor } = options;
  let resultElement = null;
  let resultNode = null;
  let d = null;
  let l = x;
  for (; null === resultNode && l < window.innerWidth && l > 0; ) {
    const elements = document.elementsFromPoint(l, y);
    const index = elements.findIndex(
      (el) => el.classList.contains("ProseMirror")
    );
    const filteredElements = elements.slice(0, index);
    if (filteredElements.length > 0) {
      const element = filteredElements[0];
      resultElement = element;
      d = editor.view.posAtDOM(element, 0);
      if (d >= 0) {
        resultNode = editor.state.doc.nodeAt(Math.max(d - 1, 0));
        if (resultNode === null || resultNode.isText) {
          resultNode = editor.state.doc.nodeAt(Math.max(d - 1, 0));
        }
        if (!resultNode) {
          resultNode = editor.state.doc.nodeAt(Math.max(d, 0));
        }
        break;
      }
    }
    if (direction === "left") {
      l -= 1;
    } else {
      l += 1;
    }
  }
  return { resultElement, resultNode, pos: d !== null ? d : null };
};
function getSelectionRangesNearCursor(e, t) {
  const { doc: n } = t.view.state, o = findElementNextToCoords({
    editor: t,
    x: e.clientX,
    y: e.clientY,
    direction: "right"
  });
  if (!o.resultNode || null === o.pos) return [];
  const r = e.clientX, i = function(e2, t2, n2) {
    const o2 = parseInt(getComputedStyles(e2.dom, "paddingLeft"), 10), r2 = parseInt(getComputedStyles(e2.dom, "paddingRight"), 10), i2 = parseInt(getComputedStyles(e2.dom, "borderLeftWidth"), 10), s2 = parseInt(getComputedStyles(e2.dom, "borderLeftWidth"), 10), d2 = e2.dom.getBoundingClientRect();
    return { left: minMax(t2, d2.left + o2 + i2, d2.right - r2 - s2), top: n2 };
  }(t.view, r, e.clientY), s = t.view.posAtCoords(i);
  if (!s) return [];
  const { pos: d } = s;
  if (!n.resolve(d).parent) return [];
  const a = n.resolve(o.pos), p = n.resolve(o.pos + 1);
  return getSelectionRanges(a, p, 0);
}
var getPreviousNodeStartPosition = (e, t) => {
  const n = e.resolve(t), { depth: o } = n;
  if (0 === o) return t;
  return n.pos - n.parentOffset - 1;
};
var getAncestorNodeAtDepth = (e, t) => {
  const n = e.nodeAt(t), o = e.resolve(t);
  let { depth: r } = o, i = n;
  for (; r > 0; ) {
    const e2 = o.node(r);
    r -= 1, 0 === r && (i = e2);
  }
  return i;
};
var getOuterNode = (doc, pos) => {
  const n = import_y_prosemirror.ySyncPluginKey.getState(doc);
  return n ? (0, import_y_prosemirror.absolutePositionToRelativePosition)(pos, n.type, n.binding.mapping) : null;
};
var getOuterNodePos = (e, t) => {
  let n = t;
  for (; n && n.parentNode && n.parentNode !== e.dom; ) n = n.parentNode;
  return n;
};
var dragHandlePluginDefaultKey = new import_state2.PluginKey("dragHandle");
function DragHandlePlugin(options) {
  const {
    pluginKey: e = dragHandlePluginDefaultKey,
    element,
    editor,
    tippyOptions,
    onNodeChange
  } = options;
  const container = document.createElement("div");
  let tippyInstance = null;
  let x = false;
  let currentNode = null;
  let lastNodePos = -1;
  element.addEventListener("dragstart", (e2) => {
    const { view } = editor;
    if (!e2.dataTransfer) return;
    const { empty, $from, $to } = view.state.selection;
    const s = getSelectionRangesNearCursor(e2, editor);
    const d = getSelectionRanges($from, $to, 0);
    const c = d.some(
      (e3) => s.find((t) => t.$from === e3.$from && t.$to === e3.$to)
    );
    const u = empty || !c ? s : d;
    if (!u.length) return;
    const { tr: g } = view.state;
    const h = document.createElement("div");
    const y = u[0].$from.pos;
    const v = u[u.length - 1].$to.pos;
    const C = NodeRangeSelection.create(view.state.doc, y, v);
    const E = C.content();
    u.forEach((e3) => {
      const t = cloneElement(view == null ? void 0 : view.nodeDOM(e3.$from.pos));
      h.append(t);
    });
    h.style.position = "absolute";
    h.style.top = "-10000px";
    document.body.append(h);
    e2.dataTransfer.clearData();
    e2.dataTransfer.setDragImage(h, 0, 0);
    view.dragging = { slice: E, move: true };
    g.setSelection(C);
    view.dispatch(g);
    document.addEventListener("drop", () => removeNode(h), { once: true });
    setTimeout(() => {
      element && (element.style.pointerEvents = "none");
    }, 0);
  });
  element.addEventListener("dragend", () => {
    element && (element.style.pointerEvents = "auto");
  });
  return new import_state2.Plugin({
    key: typeof e === "string" ? new import_state2.PluginKey(e) : e,
    state: {
      init: () => ({ locked: false }),
      apply(e2, t, n, o) {
        const l = e2.getMeta("lockDragHandle");
        const a = e2.getMeta("hideDragHandle");
        if (void 0 !== l && (x = l), a && tippyInstance) {
          return tippyInstance == null ? void 0 : tippyInstance.hide(), x = false, currentNode = null, lastNodePos = -1, null == onNodeChange || onNodeChange({ editor, node: null, pos: -1 }), t;
        }
        if (e2.docChanged && -1 !== lastNodePos && element && tippyInstance) {
          const t2 = e2.mapping.map(lastNodePos);
          t2 !== lastNodePos && (lastNodePos = t2, getOuterNode(o, lastNodePos));
        }
        return t;
      }
    },
    view: (e2) => {
      var t;
      return element.draggable = true, element.style.pointerEvents = "auto", null === (t = editor.view.dom.parentElement) || void 0 === t || t.appendChild(container), container.appendChild(element), container.style.pointerEvents = "none", container.style.position = "absolute", container.style.top = "0", container.style.left = "0", tippyInstance = (0, import_tippy2.default)(e2.dom, __spreadProps(__spreadValues({
        getReferenceClientRect: null,
        interactive: true,
        trigger: "manual",
        placement: "left-start",
        hideOnClick: false,
        duration: 100,
        zIndex: 10,
        popperOptions: {
          modifiers: [
            { name: "flip", enabled: false },
            {
              name: "preventOverflow",
              options: { rootBoundary: "document", mainAxis: false }
            }
          ]
        }
      }, tippyOptions), {
        appendTo: container,
        content: element
      })), {
        update(t2, n) {
          if (!element || !tippyInstance) return;
          if (element.draggable = !x, e2.state.doc.eq(n.doc) || -1 === lastNodePos)
            return;
          let o = e2.nodeDOM(lastNodePos);
          if (o = getOuterNodePos(e2, o), o === e2.dom) return;
          if (1 !== (null == o ? void 0 : o.nodeType)) return;
          const r = e2.posAtDOM(o, 0), s = getAncestorNodeAtDepth(editor.state.doc, r);
          if (s !== currentNode) {
            const t3 = getPreviousNodeStartPosition(editor.state.doc, r);
            currentNode = s, lastNodePos = t3, getOuterNode(e2.state, lastNodePos), null == onNodeChange || onNodeChange({
              editor,
              node: currentNode,
              pos: lastNodePos
            }), tippyInstance.setProps({
              getReferenceClientRect: () => o == null ? void 0 : o.getBoundingClientRect()
            }), tippyInstance.show();
          }
        },
        destroy() {
          null == tippyInstance || tippyInstance.destroy(), element && removeNode(container);
        }
      };
    },
    props: {
      handleDOMEvents: {
        mouseleave: (e2, event) => (x || event.target && !container.contains(event == null ? void 0 : event.relatedTarget) && (null == tippyInstance || tippyInstance.hide(), currentNode = null, lastNodePos = -1, null == onNodeChange || onNodeChange({ editor, node: null, pos: -1 })), false),
        mousemove(e2, t) {
          if (!element || !tippyInstance || x) return false;
          const n = findElementNextToCoords({
            x: t.clientX,
            y: t.clientY,
            direction: "right",
            editor
          });
          if (!n.resultElement) return false;
          let o = n.resultElement;
          if (o = getOuterNodePos(e2, o), o === e2.dom) return false;
          if (1 !== (null == o ? void 0 : o.nodeType)) return false;
          const r = e2.posAtDOM(o, 0), s = getAncestorNodeAtDepth(editor.state.doc, r);
          if (s !== currentNode) {
            const t2 = getPreviousNodeStartPosition(editor.state.doc, r);
            currentNode = s, lastNodePos = t2, getOuterNode(e2.state, lastNodePos), null == onNodeChange || onNodeChange({
              editor,
              node: currentNode,
              pos: lastNodePos
            }), tippyInstance.setProps({
              getReferenceClientRect: () => o.getBoundingClientRect()
            }), tippyInstance.show();
          }
          return false;
        }
      }
    }
  });
}

// src/editor/plugins/drag-handle/drag-handle.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function DragHandle(props) {
  const {
    className = "drag-handle",
    children,
    editor,
    pluginKey = dragHandlePluginDefaultKey,
    onNodeChange,
    tippyOptions = {}
  } = props;
  const [element, setElement] = (0, import_react10.useState)(null);
  const pluginRef = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    if (!element) {
      return () => {
        pluginRef.current = null;
      };
    }
    if (editor.isDestroyed) {
      return () => {
        pluginRef.current = null;
      };
    }
    if (!pluginRef.current) {
      pluginRef.current = DragHandlePlugin({
        editor,
        element,
        pluginKey,
        tippyOptions,
        onNodeChange
      });
      editor.registerPlugin(pluginRef.current);
    }
    return () => {
      editor.unregisterPlugin(pluginKey);
      pluginRef.current = null;
    };
  }, [element, editor, onNodeChange, pluginKey]);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className, ref: setElement, children });
}

// src/editor/components/content-menu.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function ContentMenu(props) {
  const { editor } = props;
  const [menuOpen, setMenuOpen] = (0, import_react11.useState)(false);
  const [currentNode, setCurrentNode] = (0, import_react11.useState)(null);
  const [currentNodePos, setCurrentNodePos] = (0, import_react11.useState)(-1);
  const handleNodeChange = (0, import_react11.useCallback)(
    (data) => {
      if (data.node) {
        setCurrentNode(data.node);
      }
      setCurrentNodePos(data.pos);
    },
    [setCurrentNodePos, setCurrentNode]
  );
  function duplicateNode() {
    editor.commands.setNodeSelection(currentNodePos);
    const { $anchor } = editor.state.selection;
    const selectedNode = $anchor.node(1) || editor.state.selection.node;
    editor.chain().setMeta("hideDragHandle", true).insertContentAt(
      currentNodePos + ((currentNode == null ? void 0 : currentNode.nodeSize) || 0),
      selectedNode.toJSON()
    ).run();
    setMenuOpen(false);
  }
  function deleteCurrentNode() {
    editor.chain().setMeta("hideDragHandle", true).setNodeSelection(currentNodePos).deleteSelection().run();
    setMenuOpen(false);
  }
  function handleAddNewNode() {
    var _a;
    if (currentNodePos !== -1) {
      const currentNodeSize = (currentNode == null ? void 0 : currentNode.nodeSize) || 0;
      const insertPos = currentNodePos + currentNodeSize;
      const currentNodeIsEmptyParagraph = (currentNode == null ? void 0 : currentNode.type.name) === "paragraph" && ((_a = currentNode == null ? void 0 : currentNode.content) == null ? void 0 : _a.size) === 0;
      const focusPos = currentNodeIsEmptyParagraph ? currentNodePos + 2 : insertPos + 2;
      editor.chain().command(({ dispatch, tr, state }) => {
        if (dispatch) {
          if (currentNodeIsEmptyParagraph) {
            tr.insertText("/", currentNodePos, currentNodePos + 1);
          } else {
            tr.insert(
              insertPos,
              state.schema.nodes.paragraph.create(null, [
                state.schema.text("/")
              ])
            );
          }
          return dispatch(tr);
        }
        return true;
      }).focus(focusPos).run();
    }
  }
  (0, import_react11.useEffect)(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
    return () => {
      editor.commands.setMeta("lockDragHandle", false);
    };
  }, [editor, menuOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    DragHandle,
    {
      pluginKey: "ContentMenu",
      editor,
      tippyOptions: {
        offset: [2, 0],
        zIndex: 99
      },
      onNodeChange: handleNodeChange,
      className: cn(editor.isEditable ? "mly-visible" : "mly-hidden"),
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mly-flex mly-items-center mly-pr-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            BaseButton,
            {
              variant: "ghost",
              size: "icon",
              className: "!mly-size-5 mly-cursor-grab mly-text-gray-500 hover:mly-text-black",
              onClick: handleAddNewNode,
              type: "button",
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Plus, { className: "mly-size-3.5 mly-shrink-0" })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TooltipContent, { sideOffset: 8, children: "Add new node" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Popover, { open: menuOpen, onOpenChange: setMenuOpen, children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mly-relative mly-flex mly-flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Tooltip, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                BaseButton,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "mly-relative mly-z-[1] !mly-size-5 mly-cursor-grab mly-text-gray-500 hover:mly-text-black",
                  onClick: (e) => {
                    e.preventDefault();
                    setMenuOpen(true);
                    editor.commands.setNodeSelection(currentNodePos);
                  },
                  type: "button",
                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.GripVertical, { className: "mly-size-3.5 mly-shrink-0" })
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TooltipContent, { sideOffset: 8, children: "Node actions" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PopoverTrigger, { className: "mly-absolute mly-left-0 mly-top-0 mly-z-0 mly-h-5 mly-w-5" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            PopoverContent,
            {
              align: "start",
              side: "bottom",
              sideOffset: 8,
              className: "mly-flex mly-w-max mly-flex-col mly-rounded-md mly-p-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                  BaseButton,
                  {
                    variant: "ghost",
                    onClick: duplicateNode,
                    className: "mly-h-auto mly-justify-start mly-gap-2 !mly-rounded mly-px-2 mly-py-1 mly-text-sm mly-font-normal",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Copy, { className: "mly-size-[15px] mly-shrink-0" }),
                      "Duplicate"
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Divider, { type: "horizontal" }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                  BaseButton,
                  {
                    onClick: deleteCurrentNode,
                    className: "mly-h-auto mly-justify-start mly-gap-2 !mly-rounded mly-bg-red-100 mly-px-2 mly-py-1 mly-text-sm mly-font-normal mly-text-red-600 hover:mly-bg-red-200 focus:mly-bg-red-200",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Trash2, { className: "mly-size-[15px] mly-shrink-0" }),
                      "Delete"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ] }) })
    }
  );
}

// src/editor/components/editor-menu-bar.tsx
var import_react12 = require("react");
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var EditorMenuBar = (props) => {
  const { editor, config } = props;
  const items = (0, import_react12.useMemo)(
    () => [
      {
        name: "bold",
        command: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
        group: "mark",
        icon: import_lucide_react8.BoldIcon
      },
      {
        name: "italic",
        command: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
        group: "mark",
        icon: import_lucide_react8.ItalicIcon
      },
      {
        name: "underline",
        command: () => editor.chain().focus().toggleUnderline().run(),
        isActive: () => editor.isActive("underline"),
        group: "mark",
        icon: import_lucide_react8.UnderlineIcon
      },
      {
        name: "strike",
        command: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
        group: "mark",
        icon: import_lucide_react8.StrikethroughIcon
      },
      {
        name: "delete-line",
        command: () => editor.chain().focus().selectParentNode().deleteSelection().run(),
        isActive: () => false,
        group: "mark",
        icon: import_lucide_react8.EraserIcon
      },
      {
        name: "divider",
        command: () => editor.chain().focus().setHorizontalRule().run(),
        isActive: () => editor.isActive("horizontalRule"),
        group: "custom",
        icon: import_lucide_react8.SeparatorHorizontal
      },
      {
        name: "link",
        command: () => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        },
        isActive: () => editor.isActive("link"),
        group: "custom",
        icon: import_lucide_react8.LinkIcon
      },
      {
        name: "left",
        command: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: () => editor.isActive({ textAlign: "left" }),
        group: "alignment",
        icon: import_lucide_react8.AlignLeft
      },
      {
        name: "center",
        command: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: () => editor.isActive({ textAlign: "center" }),
        group: "alignment",
        icon: import_lucide_react8.AlignCenter
      },
      {
        name: "right",
        command: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: () => editor.isActive({ textAlign: "right" }),
        group: "alignment",
        icon: import_lucide_react8.AlignRight
      }
    ],
    [editor]
  );
  const groups = (0, import_react12.useMemo)(
    () => items.reduce((acc, item) => {
      if (!acc.includes(item.group)) {
        acc.push(item.group);
      }
      return acc;
    }, []),
    [items]
  );
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    {
      className: `mly-flex mly-items-center mly-gap-3 ${config == null ? void 0 : config.toolbarClassName}`,
      children: groups.map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        "div",
        {
          className: "mly-flex mly-items-center mly-gap-1 mly-rounded-md mly-border mly-border-gray-200 mly-bg-white mly-p-1",
          children: items.filter((item) => item.group === group).map((item, index2) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(BubbleMenuButton, __spreadValues({}, item), index2))
        },
        index
      ))
    }
  );
};

// src/editor/components/html-menu/html-menu.tsx
var import_react14 = require("@tiptap/react");
var import_lucide_react9 = require("lucide-react");
var import_react15 = require("react");
var import_tippy3 = require("tippy.js");

// src/editor/components/html-menu/use-html-state.ts
var import_react13 = require("@tiptap/react");
var import_fast_deep_equal2 = __toESM(require("fast-deep-equal"), 1);
var useHtmlState = (editor) => {
  const states = (0, import_react13.useEditorState)({
    editor,
    selector: (ctx) => {
      var _a, _b;
      return {
        activeTab: ((_a = ctx.editor.getAttributes("htmlCodeBlock")) == null ? void 0 : _a.activeTab) || "code",
        currentShowIfKey: ((_b = ctx.editor.getAttributes("htmlCodeBlock")) == null ? void 0 : _b.showIfKey) || ""
      };
    },
    equalityFn: import_fast_deep_equal2.default
  });
  return states;
};

// src/editor/components/html-menu/html-menu.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function HTMLBubbleMenu(props) {
  const { appendTo, editor } = props;
  if (!editor) {
    return null;
  }
  const state = useHtmlState(editor);
  const getReferenceClientRect = (0, import_react15.useCallback)(() => {
    const renderContainer = getRenderContainer(editor, "htmlCodeBlock");
    const rect = (renderContainer == null ? void 0 : renderContainer.getBoundingClientRect()) || new DOMRect(-1e3, -1e3, 0, 0);
    return rect;
  }, [editor]);
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      return editor2.isActive("htmlCodeBlock");
    },
    tippyOptions: {
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      getReferenceClientRect,
      appendTo: () => appendTo == null ? void 0 : appendTo.current,
      plugins: [import_tippy3.sticky],
      sticky: "popper",
      maxWidth: "auto"
    },
    pluginKey: "htmlCodeBlockBubbleMenu"
  });
  const { activeTab = "code" } = state;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_react14.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-items-stretch mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(TooltipProvider, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center mly-h-7 mly-rounded-md mly-bg-soft-gray mly-px-0.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Tooltip, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              "button",
              {
                className: cn(
                  "mly-flex mly-size-6 mly-shrink-0 mly-items-center mly-justify-center mly-rounded focus-visible:mly-relative focus-visible:mly-z-10 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2",
                  activeTab === "code" && "mly-bg-white"
                ),
                disabled: activeTab === "code",
                onClick: () => {
                  var _a;
                  (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateHtmlCodeBlock({
                    activeTab: "code"
                  });
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react9.CodeXmlIcon, { className: "mly-size-3 mly-shrink-0 mly-stroke-[2.5]" })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TooltipContent, { sideOffset: 8, children: "HTML Code" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Tooltip, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              "button",
              {
                className: cn(
                  "mly-flex mly-size-6 mly-shrink-0 mly-items-center mly-justify-center mly-rounded focus-visible:mly-relative focus-visible:mly-z-10 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2",
                  activeTab === "preview" && "mly-bg-white"
                ),
                disabled: activeTab === "preview",
                onClick: () => {
                  var _a;
                  (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateHtmlCodeBlock({
                    activeTab: "preview"
                  });
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react9.ViewIcon, { className: "mly-size-3 mly-shrink-0 mly-stroke-[2.5]" })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TooltipContent, { sideOffset: 8, children: "Preview" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          ShowPopover,
          {
            showIfKey: state.currentShowIfKey,
            onShowIfKeyValueChange: (value) => {
              editor.commands.updateHtmlCodeBlock({
                showIfKey: value
              });
            },
            editor
          }
        )
      ] })
    })
  );
}

// src/editor/nodes/logo/logo.ts
var import_extension_image = __toESM(require("@tiptap/extension-image"), 1);
var import_react23 = require("@tiptap/react");

// src/editor/nodes/section/section.ts
var import_core5 = require("@tiptap/core");
var DEFAULT_SECTION_BACKGROUND_COLOR = "#f7f7f7";
var DEFAULT_SECTION_ALIGN = "left";
var DEFAULT_SECTION_BORDER_WIDTH = 2;
var DEFAULT_SECTION_BORDER_COLOR = "#e2e2e2";
var DEFAULT_SECTION_MARGIN_TOP = 0;
var DEFAULT_SECTION_MARGIN_RIGHT = 0;
var DEFAULT_SECTION_MARGIN_BOTTOM = 0;
var DEFAULT_SECTION_MARGIN_LEFT = 0;
var DEFAULT_SECTION_PADDING_TOP = 5;
var DEFAULT_SECTION_PADDING_RIGHT = 5;
var DEFAULT_SECTION_PADDING_BOTTOM = 5;
var DEFAULT_SECTION_PADDING_LEFT = 5;
var DEFAULT_SECTION_SHOW_IF_KEY = null;
var SectionExtension = import_core5.Node.create({
  name: "section",
  group: "block",
  content: "(block|columns)+",
  defining: true,
  isolating: true,
  addAttributes() {
    return {
      borderRadius: {
        default: 0,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.borderRadius) == null ? void 0 : _b.replace(/['"]+/g, ""));
        },
        renderHTML: (attributes) => {
          if (!attributes.borderRadius) {
            return {};
          }
          return {
            style: `border-radius: ${attributes.borderRadius}px`
          };
        }
      },
      backgroundColor: {
        default: DEFAULT_SECTION_BACKGROUND_COLOR,
        parseHTML: (element) => {
          return element.style.backgroundColor;
        },
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            style: `background-color: ${attributes.backgroundColor};--bg-color: ${attributes.backgroundColor}`
          };
        }
      },
      align: {
        default: DEFAULT_SECTION_ALIGN,
        parseHTML: (element) => {
          return element.getAttribute("align") || DEFAULT_SECTION_ALIGN;
        },
        renderHTML(attributes) {
          if (!attributes.align) {
            return {};
          }
          return {
            align: attributes.align
          };
        }
      },
      borderWidth: {
        default: DEFAULT_SECTION_BORDER_WIDTH,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.borderWidth) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.borderWidth) {
            return {};
          }
          return {
            style: `border-width: ${attributes.borderWidth}px`
          };
        }
      },
      borderColor: {
        default: DEFAULT_SECTION_BORDER_COLOR,
        parseHTML: (element) => {
          return element.style.borderColor;
        },
        renderHTML: (attributes) => {
          if (!attributes.borderColor) {
            return {};
          }
          return {
            style: `border-color: ${attributes.borderColor}`
          };
        }
      },
      paddingTop: {
        default: DEFAULT_SECTION_PADDING_TOP,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.paddingTop) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.paddingTop) {
            return {};
          }
          return {
            style: `padding-top: ${attributes.paddingTop}px`
          };
        }
      },
      paddingRight: {
        default: DEFAULT_SECTION_PADDING_RIGHT,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.paddingRight) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.paddingRight) {
            return {};
          }
          return {
            style: `padding-right: ${attributes.paddingRight}px`
          };
        }
      },
      paddingBottom: {
        default: DEFAULT_SECTION_PADDING_BOTTOM,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.paddingBottom) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.paddingBottom) {
            return {};
          }
          return {
            style: `padding-bottom: ${attributes.paddingBottom}px`
          };
        }
      },
      paddingLeft: {
        default: DEFAULT_SECTION_PADDING_LEFT,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.paddingLeft) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.paddingLeft) {
            return {};
          }
          return {
            style: `padding-left: ${attributes.paddingLeft}px`
          };
        }
      },
      marginTop: {
        default: DEFAULT_SECTION_MARGIN_TOP,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.marginTop) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.marginTop) {
            return {};
          }
          return {
            marginTop: attributes.marginTop
          };
        }
      },
      marginRight: {
        default: DEFAULT_SECTION_MARGIN_RIGHT,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.marginRight) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.marginRight) {
            return {};
          }
          return {
            marginRight: attributes.marginRight
          };
        }
      },
      marginBottom: {
        default: DEFAULT_SECTION_MARGIN_BOTTOM,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.marginBottom) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.marginBottom) {
            return {};
          }
          return {
            marginBottom: attributes.marginBottom
          };
        }
      },
      marginLeft: {
        default: DEFAULT_SECTION_MARGIN_LEFT,
        parseHTML: (element) => {
          var _a, _b;
          return Number((_b = (_a = element == null ? void 0 : element.style) == null ? void 0 : _a.marginLeft) == null ? void 0 : _b.replace(/['"]+/g, "")) || 0;
        },
        renderHTML: (attributes) => {
          if (!attributes.marginLeft) {
            return {};
          }
          return {
            marginLeft: attributes.marginLeft
          };
        }
      },
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    };
  },
  addCommands() {
    return {
      setSection: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {
            type: this.name
          },
          content: [
            {
              type: "paragraph"
            }
          ]
        });
      },
      updateSection: (attrs) => updateAttributes(this.name, attrs)
    };
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    const {
      marginTop = 0,
      marginRight = 0,
      marginBottom = 0,
      marginLeft = 0
    } = HTMLAttributes2;
    return [
      "table",
      {
        "data-type": this.name,
        border: 0,
        cellpadding: 0,
        cellspacing: 0,
        class: "mly-w-full mly-border-separate mly-relative mly-table-fixed",
        style: `margin-top: ${marginTop}px; margin-right: ${marginRight}px; margin-bottom: ${marginBottom}px; margin-left: ${marginLeft}px;`
      },
      [
        "tbody",
        {
          class: "mly-w-full"
        },
        [
          "tr",
          {
            class: "mly-w-full"
          },
          [
            "td",
            (0, import_core5.mergeAttributes)(HTMLAttributes2, {
              "data-type": "section-cell",
              style: "border-style: solid",
              class: "mly-w-full [text-align:revert-layer]"
            }),
            0
          ]
        ]
      ]
    ];
  },
  parseHTML() {
    return [
      {
        tag: 'table[data-type="section"]'
      }
    ];
  }
});

// src/editor/nodes/logo/logo-view.tsx
var import_react20 = require("@tiptap/react");
var import_react21 = require("react");
var import_react22 = require("react");

// src/editor/nodes/image/image-view.tsx
var import_react18 = require("react");
var import_react19 = require("@tiptap/react");
var import_lucide_react10 = require("lucide-react");

// src/editor/plugins/image-upload/image-upload-plugin.ts
var import_state3 = require("@tiptap/pm/state");
function ImageUploadPlugin(options) {
  const { editor, onImageUpload, allowedMimeTypes } = options;
  function handleImageUpload(view, file, pos) {
    var _a, _b, _c;
    const placeholderSrc = URL.createObjectURL(file);
    const { tr, schema } = view.state;
    const imageNode = schema.nodes.image.create({
      src: placeholderSrc,
      isSrcVariable: false,
      alt: file.name,
      externalLink: "",
      isExternalLinkVariable: false
    });
    (_c = (_b = (_a = editor == null ? void 0 : editor.extensionStorage) == null ? void 0 : _a.imageUpload) == null ? void 0 : _b.placeholderImages) == null ? void 0 : _c.add(
      placeholderSrc
    );
    const resolvedPos = pos !== void 0 ? view.state.doc.resolve(pos) : view.state.selection.$head;
    const transaction = tr.insert(resolvedPos.pos, imageNode);
    view.dispatch(transaction);
    onImageUpload == null ? void 0 : onImageUpload(file).then((uploadedSrc) => {
      const updateTr = view.state.tr;
      const predicate = (node) => node.type.name === "image" && node.attrs.src === placeholderSrc;
      view.state.doc.descendants((node, pos2) => {
        if (predicate(node)) {
          updateTr.setNodeMarkup(pos2, void 0, __spreadProps(__spreadValues({}, node.attrs), {
            src: uploadedSrc
          }));
          return false;
        }
      });
      view.dispatch(updateTr);
    }).catch((error) => {
      console.error("Image upload failed", error);
    }).finally(() => {
      editor.extensionStorage.imageUpload.placeholderImages.delete(
        placeholderSrc
      );
      URL.revokeObjectURL(placeholderSrc);
    });
  }
  return new import_state3.Plugin({
    key: new import_state3.PluginKey("imageUpload"),
    props: {
      handleDrop: (view, event) => {
        var _a, _b;
        if (!onImageUpload || // we'll handle drops in the ImageView component
        // this is just for dropping images in empty areas
        !((_b = (_a = event.dataTransfer) == null ? void 0 : _a.files) == null ? void 0 : _b.length)) {
          return false;
        }
        const images = Array.from(event.dataTransfer.files).filter(
          (file) => allowedMimeTypes == null ? void 0 : allowedMimeTypes.includes(file.type)
        );
        if (images.length === 0) {
          return false;
        }
        const pos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY
        });
        if (!pos) {
          return false;
        }
        event.preventDefault();
        event.stopPropagation();
        images.forEach((file) => handleImageUpload(view, file, pos.pos));
        return true;
      },
      handlePaste: (view, event) => {
        var _a, _b;
        if (!onImageUpload || !((_b = (_a = event.clipboardData) == null ? void 0 : _a.files) == null ? void 0 : _b.length)) {
          return false;
        }
        const images = Array.from(event.clipboardData.files).filter(
          (file) => allowedMimeTypes == null ? void 0 : allowedMimeTypes.includes(file.type)
        );
        if (images.length === 0) {
          return false;
        }
        event.preventDefault();
        event.stopPropagation();
        images.forEach((file) => handleImageUpload(view, file));
        return true;
      }
    }
  });
}

// src/editor/extensions/image-upload/image-upload.ts
var import_core6 = require("@tiptap/core");
var import_react16 = require("react");
var ImageUploadExtension = import_core6.Extension.create({
  name: "imageUpload",
  addOptions() {
    return {
      allowedMimeTypes: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml"
      ],
      onImageUpload: void 0
    };
  },
  addStorage() {
    return {
      placeholderImages: /* @__PURE__ */ new Set()
    };
  },
  addProseMirrorPlugins() {
    const { onImageUpload } = this.options;
    if (!onImageUpload) {
      return [];
    }
    return [
      ImageUploadPlugin({
        editor: this.editor,
        allowedMimeTypes: this.options.allowedMimeTypes,
        onImageUpload: this.options.onImageUpload
      })
    ];
  }
});
function useImageUploadOptions(editor) {
  return (0, import_react16.useMemo)(() => {
    const node = editor.extensionManager.extensions.find(
      (extension) => extension.name === "imageUpload"
    );
    return (node == null ? void 0 : node.options) || {};
  }, [editor]);
}

// src/editor/utils/use-event.ts
var import_react17 = require("react");
var useEvent = (handler) => {
  const handlerRef = (0, import_react17.useRef)(null);
  (0, import_react17.useLayoutEffect)(() => {
    handlerRef.current = handler;
  }, [handler]);
  return (0, import_react17.useCallback)((...args) => {
    if (handlerRef.current === null) {
      throw new Error("Handler is not assigned");
    }
    return handlerRef.current(...args);
  }, []);
};

// src/editor/utils/aspect-ratio.ts
function getAspectRatio(width, height) {
  return width / height;
}
function getNewHeight(width, aspectRatio) {
  if (width <= 0 || aspectRatio <= 0) {
    return 0;
  }
  return width / aspectRatio;
}
function getNewWidth(height, aspectRatio) {
  return height * aspectRatio;
}

// src/editor/nodes/image/image-view.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var MIN_WIDTH = 20;
var IMAGE_MAX_WIDTH = 600;
var IMAGE_MAX_HEIGHT = 400;
function ImageView(props) {
  const { node, updateAttributes: updateAttributes2, selected, editor } = props;
  const [status, setStatus] = (0, import_react18.useState)("idle");
  const [isPlaceholderImage, setIsPlaceholderImage] = (0, import_react18.useState)(false);
  const { onImageUpload, allowedMimeTypes = [] } = useImageUploadOptions(editor);
  const wrapperRef = (0, import_react18.useRef)(null);
  const imgRef = (0, import_react18.useRef)(null);
  const [resizingStyle, setResizingStyle] = (0, import_react18.useState)();
  const [isDraggingOver, setIsDraggingOver] = (0, import_react18.useState)(false);
  const handleMouseDown = useEvent(
    (event) => {
      const imageParent = document.querySelector(
        ".ProseMirror-selectednode"
      );
      if (!imgRef.current || !imageParent || !selected) {
        return;
      }
      const imageParentWidth = Math.max(
        imageParent.offsetWidth,
        IMAGE_MAX_WIDTH
      );
      event.preventDefault();
      const direction = event.currentTarget.dataset.direction || "--";
      const initialXPosition = event.clientX;
      const initialYPosition = event.clientY;
      const currentWidth = imgRef.current.width;
      const currentHeight = imgRef.current.height;
      let newWidth = currentWidth;
      let newHeight = currentHeight;
      const transformX = direction[1] === "w" ? -1 : 1;
      const transformY = direction[0] === "n" ? -1 : 1;
      const removeListeners = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", removeListeners);
        const aspectRatio = getAspectRatio(newWidth, newHeight);
        updateAttributes2({ width: newWidth, height: newHeight, aspectRatio });
        setResizingStyle(void 0);
      };
      const mouseMoveHandler = (event2) => {
        newWidth = Math.max(
          currentWidth + transformX * (event2.clientX - initialXPosition),
          MIN_WIDTH
        );
        newHeight = Math.max(
          currentHeight + transformY * (event2.clientY - initialYPosition),
          MIN_WIDTH
        );
        if (newWidth > imageParentWidth) {
          newWidth = imageParentWidth;
        }
        if (newHeight > IMAGE_MAX_HEIGHT) {
          newHeight = IMAGE_MAX_HEIGHT;
        }
        if (node.attrs.lockAspectRatio) {
          newHeight = getNewHeight(newWidth, node.attrs.aspectRatio);
        }
        setResizingStyle({ width: newWidth, height: newHeight });
        if (!event2.buttons) {
          return removeListeners();
        }
      };
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", removeListeners);
    }
  );
  const dragCornerButton = (0, import_react18.useCallback)(
    (direction) => {
      if (isPlaceholderImage) {
        return null;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        "div",
        {
          role: "button",
          tabIndex: 0,
          onMouseDown: handleMouseDown,
          "data-direction": direction,
          className: "mly-bg-rose-500",
          style: __spreadProps(__spreadValues(__spreadValues({
            position: "absolute",
            height: "10px",
            width: "10px"
          }, { n: { top: 0 }, s: { bottom: 0 } }[direction[0]]), { w: { left: 0 }, e: { right: 0 } }[direction[1]]), {
            cursor: `${direction}-resize`
          })
        }
      );
    },
    [handleMouseDown, isPlaceholderImage]
  );
  let {
    alignment = "center",
    width,
    height,
    src,
    borderRadius: borderRadius2
  } = node.attrs || {};
  const _a = node.attrs || {}, {
    externalLink,
    isExternalLinkVariable,
    isSrcVariable,
    showIfKey,
    aspectRatio: defaultAspectRatio,
    borderRadius: _,
    lockAspectRatio
  } = _a, attrs = __objRest(_a, [
    "externalLink",
    "isExternalLinkVariable",
    "isSrcVariable",
    "showIfKey",
    "aspectRatio",
    "borderRadius",
    "lockAspectRatio"
  ]);
  const hasImageSrc = !!attrs.src;
  const isDroppable = !!onImageUpload && editor.isEditable && !hasImageSrc && !isSrcVariable && status === "idle";
  const handleFileChange = (e) => __async(this, null, function* () {
    if (!isDroppable || !e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    yield handleImageUpload(file);
  });
  const handleImageUpload = (0, import_react18.useCallback)(
    (file) => __async(this, null, function* () {
      if (!isDroppable) {
        return;
      }
      try {
        setStatus("loading");
        const imageUrl = yield onImageUpload(file);
        updateAttributes2({ src: imageUrl });
        setIsPlaceholderImage(false);
        setStatus("loaded");
      } catch (error) {
        console.error("Error uploading image:", error);
        setStatus("error");
      }
    }),
    [onImageUpload, updateAttributes2]
  );
  (0, import_react18.useEffect)(() => {
    var _a2, _b, _c, _d;
    if (!src || isSrcVariable) {
      return;
    }
    setStatus("loading");
    const isPlaceHolder = (_d = (_c = (_b = (_a2 = editor == null ? void 0 : editor.extensionStorage) == null ? void 0 : _a2.imageUpload) == null ? void 0 : _b.placeholderImages) == null ? void 0 : _c.has(src)) != null ? _d : false;
    setIsPlaceholderImage(isPlaceHolder);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setStatus("loaded");
      const { naturalWidth, naturalHeight } = img;
      const wrapper = wrapperRef == null ? void 0 : wrapperRef.current;
      if (!wrapper || width !== "auto" || !naturalWidth) {
        return;
      }
      const wrapperWidth = wrapper.offsetWidth;
      const aspectRatio = getAspectRatio(naturalWidth, naturalHeight);
      const calculatedHeight = Math.min(
        getNewHeight(wrapperWidth, aspectRatio),
        naturalHeight
      );
      updateAttributes2({
        width: Math.min(wrapperWidth, naturalWidth),
        height: Math.min(calculatedHeight, naturalHeight),
        aspectRatio
      });
    };
    img.onerror = () => {
      setStatus("error");
    };
    return () => {
      img.src = "";
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  const handleDragOver = (0, import_react18.useCallback)(
    (e) => {
      if (!isDroppable) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(true);
    },
    [onImageUpload]
  );
  const handleDragLeave = (0, import_react18.useCallback)(
    (e) => {
      if (!isDroppable) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
    },
    [onImageUpload]
  );
  const handleDrop = (0, import_react18.useCallback)(
    (e) => __async(this, null, function* () {
      var _a2;
      if (!isDroppable) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
      const files = (_a2 = e.dataTransfer) == null ? void 0 : _a2.files;
      if (!files || (files == null ? void 0 : files.length) === 0) {
        return;
      }
      const firstFile = files[0];
      if (!allowedMimeTypes.includes(firstFile.type)) {
        return;
      }
      yield handleImageUpload(firstFile);
    }),
    [handleImageUpload]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    import_react19.NodeViewWrapper,
    __spreadProps(__spreadValues({
      as: "div",
      draggable: editor.isEditable,
      "data-drag-handle": editor.isEditable,
      className: cn("mly-image-drop-zone", isDraggingOver && "mly-drag-over"),
      style: __spreadValues(__spreadProps(__spreadValues({}, hasImageSrc && status === "loaded" ? __spreadValues({
        width: width ? `${width}px` : void 0,
        height: height ? `${height}px` : void 0
      }, resizingStyle) : {}), {
        overflow: "hidden",
        position: "relative",
        // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
        lineHeight: "0px",
        display: "block",
        maxWidth: "100%"
      }), {
        center: { marginLeft: "auto", marginRight: "auto" },
        left: { marginRight: "auto" },
        right: { marginLeft: "auto" }
      }[alignment] || {}),
      ref: wrapperRef
    }, isDroppable ? {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    } : {}), {
      children: [
        !hasImageSrc && status === "idle" && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          ImageStatusLabel,
          {
            status: "idle",
            minHeight: height,
            isDropZone: isDroppable
          }
        ),
        !hasImageSrc && status === "loading" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ImageStatusLabel, { status: "loading", minHeight: height }),
        hasImageSrc && isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ImageStatusLabel, { status: "variable", minHeight: height }),
        hasImageSrc && status === "loading" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ImageStatusLabel, { status: "loading", minHeight: height }),
        hasImageSrc && status === "error" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ImageStatusLabel, { status: "error", minHeight: height }),
        isDroppable && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: handleFileChange,
            className: "mly-absolute mly-inset-0 mly-opacity-0",
            multiple: false
          }
        ),
        hasImageSrc && status === "loaded" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            "img",
            __spreadProps(__spreadValues({}, attrs), {
              ref: imgRef,
              style: __spreadProps(__spreadValues({}, resizingStyle), {
                cursor: "default",
                marginBottom: 0,
                borderRadius: borderRadius2
              }),
              draggable: editor.isEditable,
              className: cn(
                isPlaceholderImage && "mly-animate-pulse mly-opacity-40"
              )
            })
          ),
          selected && editor.isEditable && !isPlaceholderImage && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
            [
              { left: 0, top: 0, height: "100%", width: "1px" },
              { right: 0, top: 0, height: "100%", width: "1px" },
              { top: 0, left: 0, width: "100%", height: "1px" },
              { bottom: 0, left: 0, width: "100%", height: "1px" }
            ].map((style, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              "div",
              {
                className: "mly-bg-rose-500",
                style: __spreadValues({
                  position: "absolute"
                }, style)
              },
              i
            )),
            dragCornerButton("nw"),
            dragCornerButton("ne"),
            dragCornerButton("sw"),
            dragCornerButton("se")
          ] })
        ] })
      ]
    })
  );
}
function ImageStatusLabel(props) {
  const _a = props, { status, minHeight, className, style, isDropZone } = _a, rest = __objRest(_a, ["status", "minHeight", "className", "style", "isDropZone"]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "div",
    __spreadProps(__spreadValues({}, rest), {
      className: cn(
        "mly-flex mly-items-center mly-justify-center mly-gap-2 mly-rounded-lg mly-bg-soft-gray mly-px-4 mly-py-2 mly-text-sm mly-font-medium",
        {
          "mly-text-gray-500 hover:mly-bg-soft-gray/60": status === "loading",
          "mly-text-red-500 hover:mly-bg-soft-gray/60": status === "error"
        },
        className
      ),
      style: __spreadValues(__spreadValues({}, minHeight ? {
        minHeight
      } : {}), style),
      children: [
        status === "idle" && !isDropZone && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react10.ImageOffIcon, { className: "mly-size-4 mly-stroke-[2.5]" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: "No image selected" })
        ] }),
        status === "idle" && isDropZone && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react10.GrabIcon, { className: "mly-size-4 mly-stroke-[2.5]" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: "Click or Drop image here" })
        ] }),
        status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react10.Loader2, { className: "mly-size-4 mly-animate-spin mly-stroke-[2.5]" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: "Loading image..." })
        ] }),
        status === "error" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react10.Ban, { className: "mly-size-4 mly-stroke-[2.5]" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: "Error loading image" })
        ] }),
        status === "variable" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react10.BracesIcon, { className: "mly-size-4 mly-stroke-[2.5]" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: "Variable Image URL" })
        ] })
      ]
    })
  );
}

// src/editor/nodes/logo/logo-view.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function LogoView(props) {
  const { node, editor, updateAttributes: updateAttributes2 } = props;
  const [status, setStatus] = (0, import_react22.useState)("idle");
  const [isPlaceholderImage, setIsPlaceholderImage] = (0, import_react22.useState)(false);
  const [isDraggingOver, setIsDraggingOver] = (0, import_react22.useState)(false);
  const { onImageUpload, allowedMimeTypes = [] } = useImageUploadOptions(editor);
  let {
    alignment = "center",
    src: logoSrc,
    isSrcVariable,
    size = "sm"
  } = node.attrs || {};
  const hasImageSrc = !!logoSrc;
  const isDroppable = !!onImageUpload && editor.isEditable && !isSrcVariable && status === "idle";
  const handleFileChange = (e) => __async(this, null, function* () {
    if (!isDroppable || !e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    yield handleImageUpload(file);
  });
  const handleImageUpload = (0, import_react21.useCallback)(
    (file) => __async(this, null, function* () {
      if (!isDroppable) {
        return;
      }
      try {
        setStatus("loading");
        const imageUrl = yield onImageUpload(file);
        updateAttributes2({ src: imageUrl });
        setIsPlaceholderImage(false);
        setStatus("loaded");
      } catch (error) {
        console.error("Error uploading image:", error);
        setStatus("error");
      }
    }),
    [onImageUpload, updateAttributes2]
  );
  const handleDragOver = (0, import_react21.useCallback)(
    (e) => {
      if (!isDroppable) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(true);
    },
    [onImageUpload]
  );
  const handleDragLeave = (0, import_react21.useCallback)(
    (e) => {
      if (!isDroppable) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
    },
    [onImageUpload]
  );
  const handleDrop = (0, import_react21.useCallback)(
    (e) => __async(this, null, function* () {
      var _a;
      if (!isDroppable) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
      const files = (_a = e.dataTransfer) == null ? void 0 : _a.files;
      if (!files || (files == null ? void 0 : files.length) === 0) {
        return;
      }
      const firstFile = files[0];
      if (!allowedMimeTypes.includes(firstFile.type)) {
        return;
      }
      yield handleImageUpload(firstFile);
    }),
    [handleImageUpload]
  );
  (0, import_react21.useEffect)(() => {
    var _a, _b, _c, _d;
    if (!logoSrc) {
      return;
    }
    setStatus("loading");
    const isPlaceHolder = (_d = (_c = (_b = (_a = editor == null ? void 0 : editor.extensionStorage) == null ? void 0 : _a.imageUpload) == null ? void 0 : _b.placeholderImages) == null ? void 0 : _c.has(logoSrc)) != null ? _d : false;
    setIsPlaceholderImage(isPlaceHolder);
    const img = new Image();
    img.src = logoSrc;
    img.onload = () => {
      setStatus("loaded");
    };
    img.onerror = () => {
      setStatus("error");
    };
    return () => {
      img.src = "";
      img.onload = null;
      img.onerror = null;
    };
  }, [logoSrc]);
  const logoSize = logoSizes[size];
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    import_react20.NodeViewWrapper,
    __spreadProps(__spreadValues({
      as: "div",
      draggable: editor.isEditable,
      "data-drag-handle": editor.isEditable,
      style: {
        overflow: "hidden",
        position: "relative",
        // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
        lineHeight: "0px",
        display: "block"
      },
      className: cn("mly-image-drop-zone", isDraggingOver && "mly-drag-over")
    }, isDroppable ? {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    } : {}), {
      children: [
        !hasImageSrc && status === "idle" && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          ImageStatusLabel,
          {
            status: "idle",
            minHeight: logoSize,
            isDropZone: isDroppable
          }
        ),
        !hasImageSrc && status === "loading" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ImageStatusLabel, { status: "loading", minHeight: logoSize }),
        hasImageSrc && isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ImageStatusLabel, { status: "variable", minHeight: logoSize }),
        hasImageSrc && status === "loading" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ImageStatusLabel, { status: "loading", minHeight: logoSize }),
        hasImageSrc && status === "error" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ImageStatusLabel, { status: "error", minHeight: logoSize }),
        isDroppable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: handleFileChange,
            className: "mly-absolute mly-inset-0 mly-opacity-0",
            multiple: false
          }
        ),
        hasImageSrc && status === "loaded" && !isSrcVariable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          "img",
          {
            src: logoSrc,
            alt: "Logo",
            style: __spreadValues({
              height: logoSize,
              width: logoSize,
              cursor: "default",
              marginBottom: 0
            }, {
              center: { marginLeft: "auto", marginRight: "auto" },
              left: { marginRight: "auto" },
              right: { marginLeft: "auto" }
            }[alignment] || {}),
            draggable: editor.isEditable
          }
        )
      ]
    })
  );
}

// src/editor/nodes/logo/logo.ts
var allowedLogoSize = ["sm", "md", "lg"];
var DEFAULT_ALIGNMENT = "left";
var DEFAULT_LOGO_SIZE = "sm";
var logoSizes = {
  sm: "40px",
  md: "48px",
  lg: "64px"
};
var LogoExtension = import_extension_image.default.extend({
  name: "logo",
  priority: 1e3,
  addAttributes() {
    var _a;
    return __spreadProps(__spreadValues({}, (_a = this.parent) == null ? void 0 : _a.call(this)), {
      "maily-component": {
        default: "logo",
        renderHTML: (attributes) => {
          return {
            "data-maily-component": attributes["maily-component"]
          };
        },
        parseHTML: (element) => element.getAttribute("data-maily-component")
      },
      size: {
        default: DEFAULT_LOGO_SIZE,
        parseHTML: (element) => element.getAttribute("data-size"),
        renderHTML: (attributes) => {
          return {
            "data-size": attributes.size
          };
        }
      },
      alignment: {
        default: DEFAULT_ALIGNMENT,
        parseHTML: (element) => element.getAttribute("data-alignment"),
        renderHTML: (attributes) => {
          return {
            "data-alignment": attributes.alignment
          };
        }
      },
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      },
      // Later we will remove this attribute
      // and use the `src` attribute instead when implement
      // the URL variable feature
      isSrcVariable: {
        default: false,
        parseHTML: (element) => {
          return element.getAttribute("data-is-src-variable") === "true";
        },
        renderHTML: (attributes) => {
          if (!attributes.isSrcVariable) {
            return {};
          }
          return {
            "data-is-src-variable": "true"
          };
        }
      }
    });
  },
  addCommands() {
    return {
      setLogoImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      },
      setLogoAttributes: (attributes) => ({ commands }) => {
        return commands.updateAttributes("logo", attributes);
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `img[data-maily-component="${this.name}"]`
      }
    ];
  },
  addNodeView() {
    return (0, import_react23.ReactNodeViewRenderer)(LogoView, {
      className: "mly-relative"
    });
  }
});

// src/editor/utils/border-radius.ts
var borderRadius = [
  {
    name: "Sharp",
    value: 0
  },
  {
    name: "Smooth",
    value: 8
  },
  {
    name: "Smoother",
    value: 16
  },
  {
    name: "Rounded",
    value: 24
  },
  {
    name: "Circle",
    value: 9999
  }
];

// src/editor/components/image-menu/image-bubble-menu.tsx
var import_react32 = require("@tiptap/react");
var import_lucide_react23 = require("lucide-react");
var import_tippy4 = require("tippy.js");

// src/editor/components/alignment-switch.tsx
var import_lucide_react11 = require("lucide-react");
var import_jsx_runtime19 = require("react/jsx-runtime");
function AlignmentSwitch(props) {
  const { alignment = "left", onAlignmentChange } = props;
  const alignments = {
    left: {
      icon: import_lucide_react11.AlignLeft,
      tooltip: "Align Left",
      onClick: () => {
        onAlignmentChange("left");
      }
    },
    center: {
      icon: import_lucide_react11.AlignCenter,
      tooltip: "Align Center",
      onClick: () => {
        onAlignmentChange("center");
      }
    },
    right: {
      icon: import_lucide_react11.AlignRight,
      tooltip: "Align Right",
      onClick: () => {
        onAlignmentChange("right");
      }
    }
  };
  const activeAlignment = alignments[alignment];
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Tooltip, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        PopoverTrigger,
        {
          className: cn(
            "mly-flex mly-size-7 mly-items-center mly-justify-center mly-gap-1 mly-rounded-md mly-px-1.5 mly-text-sm data-[state=open]:mly-bg-soft-gray hover:mly-bg-soft-gray focus-visible:mly-relative focus-visible:mly-z-10 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2"
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(activeAlignment.icon, { className: "mly-h-3 mly-w-3 mly-stroke-[2.5]" })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(TooltipContent, { sideOffset: 8, children: "Alignment" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      PopoverContent,
      {
        className: "mly-flex mly-w-max mly-gap-0.5 mly-rounded-lg !mly-p-0.5",
        side: "top",
        sideOffset: 8,
        align: "center",
        onOpenAutoFocus: (e) => {
          e.preventDefault();
        },
        onCloseAutoFocus: (e) => {
          e.preventDefault();
        },
        children: Object.entries(alignments).map(([key, value]) => {
          return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            BubbleMenuButton,
            {
              icon: value.icon,
              tooltip: value.tooltip,
              command: value.onClick,
              isActive: () => key === alignment
            },
            key
          );
        })
      }
    )
  ] });
}

// src/editor/components/ui/link-input-popover.tsx
var import_lucide_react22 = require("lucide-react");
var import_react29 = require("react");

// src/editor/provider.tsx
var import_react24 = require("react");

// src/editor/extensions/slash-command/default-slash-commands.tsx
var import_lucide_react19 = require("lucide-react");

// src/blocks/button.tsx
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var button = {
  title: "Button",
  description: "Add a call to action button to email.",
  searchTerms: ["link", "button", "cta"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react12.MousePointer, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setButton().run();
  }
};
var linkCard = {
  title: "Link Card",
  description: "Add a link card to email.",
  searchTerms: ["link", "button", "image"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react12.ArrowUpRightSquare, { className: "mly-h-4 mly-w-4" }),
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
var import_lucide_react13 = require("lucide-react");
var import_jsx_runtime21 = require("react/jsx-runtime");
var htmlCodeBlock = {
  title: "Custom HTML",
  description: "Insert a custom HTML block",
  searchTerms: ["html", "code", "custom"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react13.CodeXmlIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHtmlCodeBlock({ language: "html" }).run();
  }
};

// src/blocks/image.tsx
var import_state4 = require("@tiptap/pm/state");
var import_lucide_react14 = require("lucide-react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var image = {
  title: "Image",
  description: "Full width image",
  searchTerms: ["image"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react14.ImageIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setImage({ src: "" }).run();
  }
};
var logo = {
  title: "Logo",
  description: "Add your brand logo",
  searchTerms: ["image", "logo"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react14.ImageIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setLogoImage({ src: "" }).run();
  }
};
var inlineImage = {
  title: "Inline Image",
  description: "Inline image",
  searchTerms: ["image", "inline"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react14.ImageIcon, { className: "mly-h-4 mly-w-4" }),
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
      const selection = import_state4.TextSelection.create(
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
var import_lucide_react15 = require("lucide-react");
var import_jsx_runtime23 = require("react/jsx-runtime");
var columns = {
  title: "Columns",
  description: "Add columns to email.",
  searchTerms: ["layout", "columns"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react15.ColumnsIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setColumns().focus(editor.state.selection.head - 2).run();
  }
};
var section = {
  title: "Section",
  description: "Add a section to email.",
  searchTerms: ["layout", "section"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react15.RectangleHorizontal, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setSection().run();
  }
};
var repeat = {
  title: "Repeat",
  description: "Loop over an array of items.",
  searchTerms: ["repeat", "for", "loop"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react15.Repeat2, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setRepeat().run();
  }
};
var spacer = {
  title: "Spacer",
  description: "Add space between blocks.",
  searchTerms: ["space", "gap", "divider"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react15.MoveVertical, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setSpacer({ height: "sm" }).run();
  }
};
var divider = {
  title: "Divider",
  description: "Add a horizontal divider.",
  searchTerms: ["divider", "line"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react15.Minus, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run();
  }
};

// src/blocks/list.tsx
var import_lucide_react16 = require("lucide-react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var bulletList = {
  title: "Bullet List",
  description: "Create a simple bullet list.",
  searchTerms: ["unordered", "point"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react16.List, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleBulletList().run();
  }
};
var orderedList = {
  title: "Numbered List",
  description: "Create a list with numbering.",
  searchTerms: ["ordered"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react16.ListOrdered, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleOrderedList().run();
  }
};

// src/blocks/typography.tsx
var import_lucide_react17 = require("lucide-react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var text = {
  title: "Text",
  description: "Just start typing with plain text.",
  searchTerms: ["p", "paragraph"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.Text, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
  }
};
var heading1 = {
  title: "Heading 1",
  description: "Big heading.",
  searchTerms: ["h1", "title", "big", "large"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.Heading1, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
  }
};
var heading2 = {
  title: "Heading 2",
  description: "Medium heading.",
  searchTerms: ["h2", "subtitle", "medium"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.Heading2, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
  }
};
var heading3 = {
  title: "Heading 3",
  description: "Small heading.",
  searchTerms: ["h3", "subtitle", "small"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.Heading3, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
  }
};
var hardBreak = {
  title: "Hard Break",
  description: "Add a break between lines.",
  searchTerms: ["break", "line"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.DivideIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHardBreak().run();
  }
};
var blockquote = {
  title: "Blockquote",
  description: "Add blockquote.",
  searchTerms: ["quote", "blockquote"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.TextQuote, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleBlockquote().run();
  }
};
var footer = {
  title: "Footer",
  description: "Add a footer text to email.",
  searchTerms: ["footer", "text"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.FootprintsIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setFooter().run();
  }
};
var clearLine = {
  title: "Clear Line",
  description: "Clear the current line.",
  searchTerms: ["clear", "line"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react17.EraserIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().selectParentNode().deleteSelection().run();
  }
};

// src/editor/components/icons/logo-with-cover-image.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function LogoWithCoverImageIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
    "svg",
    __spreadProps(__spreadValues({
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.97634 1.4502H9.02405C9.70389 1.4502 10.2476 1.45019 10.687 1.48609C11.1379 1.52293 11.527 1.6003 11.8849 1.78263C12.4588 2.07504 12.9254 2.54164 13.2178 3.11553C13.4001 3.47338 13.4775 3.86253 13.5143 4.31342C13.5502 4.75277 13.5502 5.29652 13.5502 5.97637V8.02403C13.5502 8.70388 13.5502 9.24763 13.5143 9.68698C13.4775 10.1379 13.4001 10.527 13.2178 10.8849C12.9254 11.4588 12.4588 11.9254 11.8849 12.2178C11.527 12.4001 11.1379 12.4775 10.687 12.5143C10.2476 12.5502 9.70387 12.5502 9.02402 12.5502H4.97636C4.29651 12.5502 3.75276 12.5502 3.31341 12.5143C2.86252 12.4775 2.47337 12.4001 2.11552 12.2178C1.54163 11.9254 1.07504 11.4588 0.782626 10.8849C0.600293 10.527 0.522922 10.1379 0.486083 9.68698C0.450187 9.24764 0.45019 8.70389 0.450195 8.02405V5.97635C0.45019 5.29651 0.450187 4.75276 0.486083 4.31342C0.522922 3.86253 0.600293 3.47338 0.782626 3.11553C1.07504 2.54164 1.54163 2.07504 2.11552 1.78263C2.47337 1.6003 2.86252 1.52293 3.31341 1.48609C3.75276 1.45019 4.2965 1.4502 4.97634 1.4502ZM3.40298 2.58243C3.02012 2.61372 2.79184 2.67259 2.61491 2.76274C2.248 2.94969 1.94968 3.248 1.76273 3.61492C1.67258 3.79185 1.61371 4.02013 1.58243 4.40299C1.55062 4.79228 1.55019 5.29106 1.55019 6.0002V8.0002C1.55019 8.70934 1.55062 9.20812 1.58243 9.59741C1.61371 9.98028 1.67258 10.2086 1.76273 10.3855C1.94968 10.7524 2.248 11.0507 2.61491 11.2377C2.79184 11.3278 3.02012 11.3867 3.40298 11.418C3.79227 11.4498 4.29105 11.4502 5.00019 11.4502H9.00019C9.70933 11.4502 10.2081 11.4498 10.5974 11.418C10.9803 11.3867 11.2086 11.3278 11.3855 11.2377C11.7524 11.0507 12.0507 10.7524 12.2377 10.3855C12.3278 10.2086 12.3867 9.98028 12.418 9.59741C12.4498 9.20812 12.4502 8.70934 12.4502 8.0002V6.0002C12.4502 5.29106 12.4498 4.79228 12.418 4.40299C12.3867 4.02013 12.3278 3.79185 12.2377 3.61492C12.0507 3.248 11.7524 2.94969 11.3855 2.76274C11.2086 2.67259 10.9803 2.61372 10.5974 2.58243C10.2081 2.55063 9.70933 2.5502 9.00019 2.5502H5.00019C4.29105 2.5502 3.79227 2.55063 3.40298 2.58243Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.1999 0.450195C4.50366 0.450195 4.7499 0.696438 4.7499 1.00019V2.75019C4.7499 3.05395 4.50366 3.30019 4.1999 3.30019C3.89614 3.30019 3.6499 3.05395 3.6499 2.75019V1.00019C3.6499 0.696438 3.89614 0.450195 4.1999 0.450195Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9.8 0.450195C10.1037 0.450195 10.35 0.696438 10.35 1.00019V2.75019C10.35 3.05395 10.1037 3.30019 9.8 3.30019C9.49625 3.30019 9.25 3.05395 9.25 2.75019V1.00019C9.25 0.696438 9.49625 0.450195 9.8 0.450195Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("mask", { id: "path-4-inside-1_1046_19527", fill: "white", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("rect", { x: "3", y: "4", width: "8", height: "3", rx: "0.5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "rect",
          {
            x: "3",
            y: "4",
            width: "8",
            height: "3",
            rx: "0.5",
            stroke: "black",
            strokeWidth: "2",
            mask: "url(#path-4-inside-1_1046_19527)"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "rect",
          {
            x: "6.25",
            y: "8.25",
            width: "4.5",
            height: "0.5",
            rx: "0.25",
            stroke: "black",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("rect", { x: "3", y: "8", width: "2", height: "1", rx: "0.5", fill: "currentColor" })
      ]
    })
  );
}

// src/editor/components/icons/logo-with-text-horizon.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
function LogoWithTextHorizonIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "svg",
    __spreadProps(__spreadValues({
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.97634 1.4502H9.02405C9.70389 1.4502 10.2476 1.45019 10.687 1.48609C11.1379 1.52293 11.527 1.6003 11.8849 1.78263C12.4588 2.07504 12.9254 2.54164 13.2178 3.11553C13.4001 3.47338 13.4775 3.86253 13.5143 4.31342C13.5502 4.75277 13.5502 5.29652 13.5502 5.97637V8.02403C13.5502 8.70388 13.5502 9.24763 13.5143 9.68698C13.4775 10.1379 13.4001 10.527 13.2178 10.8849C12.9254 11.4588 12.4588 11.9254 11.8849 12.2178C11.527 12.4001 11.1379 12.4775 10.687 12.5143C10.2476 12.5502 9.70387 12.5502 9.02402 12.5502H4.97636C4.29651 12.5502 3.75276 12.5502 3.31341 12.5143C2.86252 12.4775 2.47337 12.4001 2.11552 12.2178C1.54163 11.9254 1.07504 11.4588 0.782626 10.8849C0.600293 10.527 0.522922 10.1379 0.486083 9.68698C0.450187 9.24764 0.45019 8.70389 0.450195 8.02405V5.97635C0.45019 5.29651 0.450187 4.75276 0.486083 4.31342C0.522922 3.86253 0.600293 3.47338 0.782626 3.11553C1.07504 2.54164 1.54163 2.07504 2.11552 1.78263C2.47337 1.6003 2.86252 1.52293 3.31341 1.48609C3.75276 1.45019 4.2965 1.4502 4.97634 1.4502ZM3.40298 2.58243C3.02012 2.61372 2.79184 2.67259 2.61491 2.76274C2.248 2.94969 1.94968 3.248 1.76273 3.61492C1.67258 3.79185 1.61371 4.02013 1.58243 4.40299C1.55062 4.79228 1.55019 5.29106 1.55019 6.0002V8.0002C1.55019 8.70934 1.55062 9.20812 1.58243 9.59741C1.61371 9.98028 1.67258 10.2086 1.76273 10.3855C1.94968 10.7524 2.248 11.0507 2.61491 11.2377C2.79184 11.3278 3.02012 11.3867 3.40298 11.418C3.79227 11.4498 4.29105 11.4502 5.00019 11.4502H9.00019C9.70933 11.4502 10.2081 11.4498 10.5974 11.418C10.9803 11.3867 11.2086 11.3278 11.3855 11.2377C11.7524 11.0507 12.0507 10.7524 12.2377 10.3855C12.3278 10.2086 12.3867 9.98028 12.418 9.59741C12.4498 9.20812 12.4502 8.70934 12.4502 8.0002V6.0002C12.4502 5.29106 12.4498 4.79228 12.418 4.40299C12.3867 4.02013 12.3278 3.79185 12.2377 3.61492C12.0507 3.248 11.7524 2.94969 11.3855 2.76274C11.2086 2.67259 10.9803 2.61372 10.5974 2.58243C10.2081 2.55063 9.70933 2.5502 9.00019 2.5502H5.00019C4.29105 2.5502 3.79227 2.55063 3.40298 2.58243Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "rect",
          {
            x: "6.25",
            y: "6.75",
            width: "4.5",
            height: "0.5",
            rx: "0.25",
            stroke: "black",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("rect", { x: "3", y: "6.5", width: "2", height: "1", rx: "0.5", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.1999 0.450195C4.50366 0.450195 4.7499 0.696438 4.7499 1.00019V2.75019C4.7499 3.05395 4.50366 3.30019 4.1999 3.30019C3.89614 3.30019 3.6499 3.05395 3.6499 2.75019V1.00019C3.6499 0.696438 3.89614 0.450195 4.1999 0.450195Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9.8 0.450195C10.1037 0.450195 10.35 0.696438 10.35 1.00019V2.75019C10.35 3.05395 10.1037 3.30019 9.8 3.30019C9.49625 3.30019 9.25 3.05395 9.25 2.75019V1.00019C9.25 0.696438 9.49625 0.450195 9.8 0.450195Z",
            fill: "currentColor"
          }
        )
      ]
    })
  );
}

// src/editor/components/icons/logo-with-text-vertical.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function LogoWithTextVerticalIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    "svg",
    __spreadProps(__spreadValues({
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.97634 1.4502H9.02405C9.70389 1.4502 10.2476 1.45019 10.687 1.48609C11.1379 1.52293 11.527 1.6003 11.8849 1.78263C12.4588 2.07504 12.9254 2.54164 13.2178 3.11553C13.4001 3.47338 13.4775 3.86253 13.5143 4.31342C13.5502 4.75277 13.5502 5.29652 13.5502 5.97637V8.02403C13.5502 8.70388 13.5502 9.24763 13.5143 9.68698C13.4775 10.1379 13.4001 10.527 13.2178 10.8849C12.9254 11.4588 12.4588 11.9254 11.8849 12.2178C11.527 12.4001 11.1379 12.4775 10.687 12.5143C10.2476 12.5502 9.70387 12.5502 9.02402 12.5502H4.97636C4.29651 12.5502 3.75276 12.5502 3.31341 12.5143C2.86252 12.4775 2.47337 12.4001 2.11552 12.2178C1.54163 11.9254 1.07504 11.4588 0.782626 10.8849C0.600293 10.527 0.522922 10.1379 0.486083 9.68698C0.450187 9.24764 0.45019 8.70389 0.450195 8.02405V5.97635C0.45019 5.29651 0.450187 4.75276 0.486083 4.31342C0.522922 3.86253 0.600293 3.47338 0.782626 3.11553C1.07504 2.54164 1.54163 2.07504 2.11552 1.78263C2.47337 1.6003 2.86252 1.52293 3.31341 1.48609C3.75276 1.45019 4.2965 1.4502 4.97634 1.4502ZM3.40298 2.58243C3.02012 2.61372 2.79184 2.67259 2.61491 2.76274C2.248 2.94969 1.94968 3.248 1.76273 3.61492C1.67258 3.79185 1.61371 4.02013 1.58243 4.40299C1.55062 4.79228 1.55019 5.29106 1.55019 6.0002V8.0002C1.55019 8.70934 1.55062 9.20812 1.58243 9.59741C1.61371 9.98028 1.67258 10.2086 1.76273 10.3855C1.94968 10.7524 2.248 11.0507 2.61491 11.2377C2.79184 11.3278 3.02012 11.3867 3.40298 11.418C3.79227 11.4498 4.29105 11.4502 5.00019 11.4502H9.00019C9.70933 11.4502 10.2081 11.4498 10.5974 11.418C10.9803 11.3867 11.2086 11.3278 11.3855 11.2377C11.7524 11.0507 12.0507 10.7524 12.2377 10.3855C12.3278 10.2086 12.3867 9.98028 12.418 9.59741C12.4498 9.20812 12.4502 8.70934 12.4502 8.0002V6.0002C12.4502 5.29106 12.4498 4.79228 12.418 4.40299C12.3867 4.02013 12.3278 3.79185 12.2377 3.61492C12.0507 3.248 11.7524 2.94969 11.3855 2.76274C11.2086 2.67259 10.9803 2.61372 10.5974 2.58243C10.2081 2.55063 9.70933 2.5502 9.00019 2.5502H5.00019C4.29105 2.5502 3.79227 2.55063 3.40298 2.58243Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "rect",
          {
            x: "4.25",
            y: "8.25",
            width: "5.5",
            height: "0.5",
            rx: "0.25",
            stroke: "black",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("rect", { x: "6", y: "6", width: "2", height: "1", rx: "0.5", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.1999 0.450195C4.50366 0.450195 4.7499 0.696438 4.7499 1.00019V2.75019C4.7499 3.05395 4.50366 3.30019 4.1999 3.30019C3.89614 3.30019 3.6499 3.05395 3.6499 2.75019V1.00019C3.6499 0.696438 3.89614 0.450195 4.1999 0.450195Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9.8 0.450195C10.1037 0.450195 10.35 0.696438 10.35 1.00019V2.75019C10.35 3.05395 10.1037 3.30019 9.8 3.30019C9.49625 3.30019 9.25 3.05395 9.25 2.75019V1.00019C9.25 0.696438 9.49625 0.450195 9.8 0.450195Z",
            fill: "currentColor"
          }
        )
      ]
    })
  );
}

// src/blocks/headers.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var headerLogoWithTextHorizontal = {
  title: "Logo with Text (Horizontal)",
  description: "Logo and a text horizontally",
  searchTerms: ["logo", "text"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(LogoWithTextHorizonIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().deleteRange(range).insertContent({
      type: "columns",
      attrs: { showIfKey: null, gap: 8 },
      content: [
        {
          type: "column",
          attrs: {
            columnId: "36de3eda-0677-47c3-a8b7-e071dec9ce30",
            width: "auto",
            verticalAlign: "middle"
          },
          content: [
            {
              type: "image",
              attrs: {
                src: "https://maily.to/brand/logo.png",
                alt: null,
                title: null,
                width: "32",
                height: "32",
                alignment: "left",
                externalLink: null,
                isExternalLinkVariable: false,
                isSrcVariable: false,
                showIfKey: null
              }
            }
          ]
        },
        {
          type: "column",
          attrs: {
            columnId: "6feb593e-374a-4479-a1c7-872c60c2f4e0",
            width: "auto",
            verticalAlign: "bottom"
          },
          content: [
            {
              type: "heading",
              attrs: {
                textAlign: "right",
                level: 3,
                showIfKey: null
              },
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Weekly Newsletter"
                }
              ]
            }
          ]
        }
      ]
    }).run();
  }
};
var headerLogoWithTextVertical = {
  title: "Logo with Text (Vertical)",
  description: "Logo and a text vertically",
  searchTerms: ["logo", "text"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(LogoWithTextVerticalIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().deleteRange(range).insertContent([
      {
        type: "image",
        attrs: {
          src: "https://maily.to/brand/logo.png",
          alt: null,
          title: null,
          width: "48",
          height: "48",
          alignment: "center",
          externalLink: null,
          isExternalLinkVariable: false,
          isSrcVariable: false,
          showIfKey: null
        }
      },
      { type: "spacer", attrs: { height: 8, showIfKey: null } },
      {
        type: "heading",
        attrs: { textAlign: "center", level: 2, showIfKey: null },
        content: [{ type: "text", text: "Maily" }]
      }
    ]).run();
  }
};
var headerLogoWithCoverImage = {
  title: "Logo with Cover Image",
  description: "Logo and a cover image",
  searchTerms: ["logo", "cover", "image"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(LogoWithCoverImageIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    const todayFormatted = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    editor.chain().deleteRange(range).insertContent([
      {
        type: "image",
        attrs: {
          src: "https://maily.to/og-image.png",
          alt: null,
          title: null,
          width: 600,
          height: 314,
          alignment: "center",
          externalLink: null,
          isExternalLinkVariable: false,
          isSrcVariable: false,
          showIfKey: null
        }
      },
      {
        type: "columns",
        attrs: { showIfKey: null, gap: 8 },
        content: [
          {
            type: "column",
            attrs: {
              columnId: "36de3eda-0677-47c3-a8b7-e071dec9ce30",
              width: "auto",
              verticalAlign: "middle"
            },
            content: [
              {
                type: "image",
                attrs: {
                  src: "https://maily.to/brand/logo.png",
                  alt: null,
                  title: null,
                  width: "48",
                  height: "48",
                  alignment: "left",
                  externalLink: null,
                  isExternalLinkVariable: false,
                  isSrcVariable: false,
                  showIfKey: null
                }
              }
            ]
          },
          {
            type: "column",
            attrs: {
              columnId: "6feb593e-374a-4479-a1c7-872c60c2f4e0",
              width: "auto",
              verticalAlign: "middle"
            },
            content: [
              {
                type: "paragraph",
                attrs: { textAlign: "right", showIfKey: null },
                content: [
                  {
                    type: "text",
                    marks: [{ type: "bold" }],
                    text: "Weekly Newsletter"
                  },
                  { type: "hardBreak" },
                  {
                    type: "text",
                    marks: [
                      { type: "textStyle", attrs: { color: "#929292" } }
                    ],
                    text: todayFormatted
                  }
                ]
              }
            ]
          }
        ]
      }
    ]).run();
  }
};

// src/blocks/footers.tsx
var import_lucide_react18 = require("lucide-react");
var import_jsx_runtime30 = require("react/jsx-runtime");
var footerCopyrightText = {
  title: "Footer Copyright",
  description: "Copyright text for the footer.",
  searchTerms: ["footer", "copyright"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react18.CopyrightIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    editor.chain().focus().deleteRange(range).insertContent({
      type: "paragraph",
      attrs: { textAlign: "center", showIfKey: null },
      content: [
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#AAAAAA" } }],
          text: `Maily \xA9 ${currentYear}. All rights reserved.`
        }
      ]
    }).run();
  }
};
var footerCommunityFeedbackCta = {
  title: "Footer Community Feedback CTA",
  description: "Community feedback CTA for the footer.",
  searchTerms: ["footer", "community", "feedback", "cta"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react18.RectangleHorizontalIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).insertContent([
      {
        type: "image",
        attrs: {
          src: "https://maily.to/brand/logo.png",
          alt: null,
          title: null,
          width: "42",
          height: "42",
          alignment: "left",
          externalLink: null,
          isExternalLinkVariable: false,
          isSrcVariable: false,
          showIfKey: null
        }
      },
      { type: "spacer", attrs: { height: 16, showIfKey: null } },
      {
        type: "footer",
        attrs: { textAlign: null, "maily-component": "footer" },
        content: [
          {
            type: "text",
            marks: [{ type: "textStyle", attrs: { color: "" } }],
            text: "Enjoyed this month\u2019s update?"
          },
          { type: "hardBreak" },
          {
            type: "text",
            marks: [{ type: "textStyle", attrs: { color: "" } }],
            text: "And, as always, we'd love your feedback \u2013 simply reply to the email or reach out via the Discord community!"
          }
        ]
      }
    ]).run();
  }
};
var footerCompanySignature = {
  title: "Footer Company Signature",
  description: "Company signature for the footer.",
  searchTerms: ["footer", "company", "signature"],
  icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react18.LayoutTemplateIcon, { className: "mly-h-4 mly-w-4" }),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).insertContent([
      { type: "horizontalRule" },
      {
        type: "image",
        attrs: {
          src: "https://maily.to/brand/logo.png",
          alt: null,
          title: null,
          width: "48",
          height: "48",
          alignment: "center",
          externalLink: null,
          isExternalLinkVariable: false,
          isSrcVariable: false,
          showIfKey: null
        }
      },
      { type: "spacer", attrs: { height: 16, showIfKey: null } },
      {
        type: "heading",
        attrs: { textAlign: "center", level: 3, showIfKey: null },
        content: [{ type: "text", text: "Maily" }]
      },
      { type: "spacer", attrs: { height: 4, showIfKey: null } },
      {
        type: "footer",
        attrs: { textAlign: "center", "maily-component": "footer" },
        content: [
          {
            type: "text",
            marks: [{ type: "textStyle", attrs: { color: "" } }],
            text: "1234 Example Street, Example, DE 19801, United States"
          },
          { type: "hardBreak" },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://maily.to",
                  target: "_blank",
                  rel: "noopener noreferrer nofollow",
                  class: "mly-no-underline",
                  isUrlVariable: false
                }
              },
              { type: "textStyle", attrs: { color: "#64748b" } },
              { type: "underline" }
            ],
            text: "VISIT COMPANY"
          },
          {
            type: "text",
            marks: [{ type: "textStyle", attrs: { color: "#64748b" } }],
            text: "  |  "
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://maily.to",
                  target: "_blank",
                  rel: "noopener noreferrer nofollow",
                  class: "mly-no-underline",
                  isUrlVariable: false
                }
              },
              { type: "textStyle", attrs: { color: "#64748b" } },
              { type: "underline" }
            ],
            text: "VISIT OUR BLOG"
          },
          {
            type: "text",
            marks: [{ type: "textStyle", attrs: { color: "#64748b" } }],
            text: "  |  "
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://maily.to",
                  target: "_blank",
                  rel: "noopener noreferrer nofollow",
                  class: "mly-no-underline",
                  isUrlVariable: false
                }
              },
              { type: "textStyle", attrs: { color: "#64748b" } },
              { type: "underline" }
            ],
            text: "UNSUBSCRIBE"
          }
        ]
      },
      {
        type: "paragraph",
        attrs: { textAlign: "center", showIfKey: null },
        content: [
          {
            type: "inlineImage",
            attrs: {
              height: 20,
              width: 20,
              src: "https://cdn.usemaily.com/images/icons/linkedin.png",
              isSrcVariable: false,
              alt: null,
              title: null,
              externalLink: "https://www.linkedin.com/in/arikchakma/",
              isExternalLinkVariable: false
            }
          },
          { type: "text", text: "  " },
          {
            type: "inlineImage",
            attrs: {
              height: 20,
              width: 20,
              src: "https://cdn.usemaily.com/images/icons/youtube.png",
              isSrcVariable: false,
              alt: null,
              title: null,
              externalLink: "https://www.youtube.com/arikchakma",
              isExternalLinkVariable: false
            }
          },
          { type: "text", text: "  " },
          {
            type: "inlineImage",
            attrs: {
              height: 20,
              width: 20,
              src: "https://cdn.usemaily.com/images/icons/twitter.png",
              isSrcVariable: false,
              alt: null,
              title: null,
              externalLink: "https://x.com/imarikchakma",
              isExternalLinkVariable: false
            }
          }
        ]
      }
    ]).run();
  }
};

// src/editor/extensions/slash-command/default-slash-commands.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var DEFAULT_SLASH_COMMANDS = [
  {
    title: "Blocks",
    commands: [
      text,
      heading1,
      heading2,
      heading3,
      bulletList,
      orderedList,
      image,
      logo,
      inlineImage,
      columns,
      section,
      repeat,
      divider,
      spacer,
      button,
      linkCard,
      hardBreak,
      blockquote,
      footer,
      clearLine
    ]
  },
  {
    title: "Components",
    commands: [
      {
        id: "headers",
        title: "Headers",
        description: "Add pre-designed headers block",
        searchTerms: ["header", "headers"],
        icon: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react19.Heading1, { className: "mly-h-4 mly-w-4" }),
        preview: "https://cdn.usemaily.com/previews/header-preview-xyz.png",
        commands: [
          headerLogoWithTextVertical,
          headerLogoWithTextHorizontal,
          headerLogoWithCoverImage
        ]
      },
      {
        id: "footers",
        title: "Footers",
        description: "Add pre-designed footers block",
        searchTerms: ["footers"],
        icon: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react19.FootprintsIcon, { className: "mly-h-4 mly-w-4" }),
        commands: [
          footerCopyrightText,
          footerCommunityFeedbackCta,
          footerCompanySignature
        ]
      },
      htmlCodeBlock
    ]
  }
];

// src/editor/provider.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var DEFAULT_PLACEHOLDER_URL = "https://maily.to/";
var MailyContext = (0, import_react24.createContext)({
  placeholderUrl: DEFAULT_PLACEHOLDER_URL,
  blocks: DEFAULT_SLASH_COMMANDS
});
function MailyProvider(props) {
  const _a = props, { children } = _a, defaultValues = __objRest(_a, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(MailyContext.Provider, { value: defaultValues, children });
}
function useMailyContext() {
  const values = (0, import_react24.useContext)(MailyContext);
  if (!values) {
    throw new Error("Missing MailyContext.Provider in the component tree");
  }
  return values;
}

// src/editor/components/ui/link-input-popover.tsx
var import_react30 = require("react");

// src/editor/nodes/variable/variable.ts
var import_core7 = require("@tiptap/core");
var import_state5 = require("@tiptap/pm/state");
var import_react28 = require("@tiptap/react");
var import_suggestion = __toESM(require("@tiptap/suggestion"), 1);

// src/editor/nodes/variable/variable-suggestions-popover.tsx
var import_lucide_react20 = require("lucide-react");
var import_react25 = require("react");
var import_jsx_runtime33 = require("react/jsx-runtime");
var VariableSuggestionsPopover = (0, import_react25.forwardRef)((props, ref) => {
  const { items, onSelectItem } = props;
  const [selectedIndex, setSelectedIndex] = (0, import_react25.useState)(0);
  const scrollContainerRef = (0, import_react25.useRef)(null);
  const itemRefs = (0, import_react25.useRef)([]);
  const scrollSelectedIntoView = (index) => {
    const container = scrollContainerRef.current;
    const selectedItem = itemRefs.current[index];
    if (!container || !selectedItem) {
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();
    const padding = 4;
    if (itemRect.bottom > containerRect.bottom) {
      container.scrollTop += itemRect.bottom - containerRect.bottom + padding;
    } else if (itemRect.top < containerRect.top) {
      container.scrollTop += itemRect.top - containerRect.top - padding;
    }
  };
  (0, import_react25.useEffect)(() => {
    setSelectedIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    itemRefs.current = items.map(() => null);
  }, [items]);
  (0, import_react25.useEffect)(() => {
    scrollSelectedIntoView(selectedIndex);
  }, [selectedIndex]);
  (0, import_react25.useImperativeHandle)(ref, () => ({
    moveUp: () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    },
    moveDown: () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    },
    select: () => {
      const item = items[selectedIndex];
      if (!item) {
        return;
      }
      onSelectItem(item);
    }
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "mly-z-50 mly-w-64 mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-shadow-md mly-transition-all", children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "mly-flex mly-items-center mly-justify-between mly-gap-2 mly-border-b mly-border-gray-200 mly-bg-soft-gray/40 mly-px-1 mly-py-1.5 mly-text-gray-500", children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "mly-text-xs mly-uppercase", children: "Variables" }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(VariableIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react20.Braces, { className: "mly-size-3 mly-stroke-[2.5]" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      "div",
      {
        ref: scrollContainerRef,
        className: "mly-max-h-52 mly-overflow-y-auto mly-scrollbar-thin mly-scrollbar-track-transparent mly-scrollbar-thumb-gray-200",
        children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "mly-flex mly-w-fit mly-min-w-full mly-flex-col mly-gap-0.5 mly-p-1", children: (items == null ? void 0 : items.length) ? items == null ? void 0 : items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
          "button",
          {
            ref: (el) => itemRefs.current[index] = el,
            onClick: () => onSelectItem(item),
            className: cn(
              "mly-flex mly-w-fit mly-min-w-full mly-items-center mly-gap-2 mly-rounded-md mly-px-2 mly-py-1 mly-text-left mly-font-mono mly-text-sm mly-text-gray-900 hover:mly-bg-soft-gray",
              index === selectedIndex ? "mly-bg-soft-gray" : "mly-bg-white"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react20.Braces, { className: "mly-size-3 mly-stroke-[2.5] mly-text-rose-600" }),
              item.name
            ]
          },
          index
        )) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "mly-flex mly-h-7 mly-w-full mly-items-center mly-gap-2 mly-rounded-md mly-px-2 mly-py-1 mly-text-left mly-font-mono mly-text-[13px] mly-text-gray-900 hover:mly-bg-soft-gray", children: "No result" }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "mly-flex mly-items-center mly-justify-between mly-gap-2 mly-border-t mly-border-gray-200 mly-px-1 mly-py-1.5 mly-text-gray-500", children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "mly-flex mly-items-center mly-gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(VariableIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react20.ArrowDownIcon, { className: "mly-size-3 mly-stroke-[2.5]" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(VariableIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react20.ArrowUpIcon, { className: "mly-size-3 mly-stroke-[2.5]" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "mly-text-xs mly-text-gray-500", children: "Navigate" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(VariableIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react20.CornerDownLeftIcon, { className: "mly-size-3 mly-stroke-[2.5]" }) })
    ] })
  ] });
});
function VariableIcon(props) {
  const { className, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    "div",
    {
      className: cn(
        "mly-flex mly-size-5 mly-items-center mly-justify-center mly-rounded-md mly-border",
        className
      ),
      children
    }
  );
}

// src/editor/nodes/variable/variable-view.tsx
var import_react26 = require("@tiptap/react");
var import_lucide_react21 = require("lucide-react");
var import_react27 = require("react");
var import_jsx_runtime34 = require("react/jsx-runtime");
function VariableView(props) {
  const { node, updateAttributes: updateAttributes2, editor } = props;
  const { id, fallback, required } = node.attrs;
  const renderVariable = (0, import_react27.useMemo)(() => {
    var _a, _b;
    const variableRender = (_b = (_a = getNodeOptions(editor, "variable")) == null ? void 0 : _a.renderVariable) != null ? _b : DEFAULT_RENDER_VARIABLE_FUNCTION;
    return variableRender;
  }, [editor]);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    import_react26.NodeViewWrapper,
    {
      className: "react-component mly-inline-block mly-leading-none",
      draggable: "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
        Popover,
        {
          onOpenChange: (open) => {
            editor.storage.variable.popover = open;
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(PopoverTrigger, { children: renderVariable({
              variable: { name: id, required, valid: true },
              fallback,
              editor,
              from: "content-variable"
            }) }),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
              PopoverContent,
              {
                align: "start",
                side: "bottom",
                className: "mly-w-max mly-rounded-lg !mly-p-0.5",
                sideOffset: 8,
                onOpenAutoFocus: (e) => e.preventDefault(),
                onCloseAutoFocus: (e) => e.preventDefault(),
                children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "mly-flex mly-items-stretch mly-text-midnight-gray", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("label", { className: "mly-relative", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "mly-inline-block mly-px-2 mly-text-xs mly-text-midnight-gray", children: "Variable" }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                      "input",
                      __spreadProps(__spreadValues({}, AUTOCOMPLETE_PASSWORD_MANAGERS_OFF), {
                        value: id != null ? id : "",
                        onChange: (e) => {
                          updateAttributes2({
                            id: e.target.value
                          });
                        },
                        placeholder: "ie. name...",
                        className: "mly-h-7 mly-w-36 mly-rounded-md mly-bg-soft-gray mly-px-2 mly-text-sm mly-text-midnight-gray focus:mly-bg-soft-gray focus:mly-outline-none"
                      })
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Divider, { className: "mly-mx-1.5" }),
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("label", { className: "mly-relative", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "mly-inline-block mly-px-2 mly-pl-1 mly-text-xs mly-text-midnight-gray", children: "Default" }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                      "input",
                      __spreadProps(__spreadValues({}, AUTOCOMPLETE_PASSWORD_MANAGERS_OFF), {
                        value: fallback != null ? fallback : "",
                        onChange: (e) => {
                          updateAttributes2({
                            fallback: e.target.value
                          });
                        },
                        placeholder: "ie. John Doe...",
                        className: "mly-h-7 mly-w-32 mly-rounded-md mly-bg-soft-gray mly-px-2 mly-pr-6 mly-text-sm mly-text-midnight-gray focus:mly-bg-soft-gray focus:mly-outline-none"
                      })
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "mly-absolute mly-inset-y-0 mly-right-1 mly-flex mly-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react21.Pencil, { className: "mly-h-3 mly-w-3 mly-stroke-[2.5] mly-text-midnight-gray" }) })
                  ] })
                ] }) })
              }
            )
          ]
        }
      )
    }
  );
}
var DefaultRenderVariable = (props) => {
  const { variable, fallback, from } = props;
  const { name, required, valid } = variable;
  if (from === "button-variable") {
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "mly-inline-grid mly-h-7 mly-max-w-xs mly-grid-cols-[12px_1fr] mly-items-center mly-gap-1.5 mly-rounded-md mly-border mly-border-[var(--button-var-border-color)] mly-px-2 mly-font-mono mly-text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react21.Braces, { className: "mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5]" }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "mly-min-w-0 mly-truncate mly-text-left", children: name })
    ] });
  }
  if (from === "bubble-variable") {
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
      "div",
      {
        className: cn(
          "mly-inline-grid mly-h-7 mly-min-w-28 mly-max-w-xs mly-grid-cols-[12px_1fr] mly-items-center mly-gap-1.5 mly-rounded-md mly-border mly-px-2 mly-font-mono mly-text-sm hover:mly-bg-soft-gray",
          !valid && "mly-border-rose-400 mly-bg-rose-50 mly-text-rose-600 hover:mly-bg-rose-100"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react21.Braces, { className: "mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5] mly-text-rose-600" }),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "mly-min-w-0 mly-truncate mly-text-left", children: name })
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
    "span",
    {
      tabIndex: -1,
      className: "mly-inline-flex mly-items-center mly-gap-[var(--variable-icon-gap)] mly-rounded-full mly-border mly-border-gray-200 mly-px-1.5 mly-py-0.5 mly-leading-none",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react21.Braces, { className: "mly-size-[var(--variable-icon-size)] mly-shrink-0 mly-stroke-[2.5] mly-text-rose-600" }),
        name,
        required && !fallback && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react21.AlertTriangle, { className: "mly-size-[var(--variable-icon-size)] mly-shrink-0 mly-stroke-[2.5]" })
      ]
    }
  );
};

// src/editor/nodes/variable/variable.ts
var DEFAULT_VARIABLE_TRIGGER_CHAR = "@";
var DEFAULT_VARIABLES = [];
var DEFAULT_RENDER_VARIABLE_FUNCTION = DefaultRenderVariable;
var DEFAULT_VARIABLE_SUGGESTION_POPOVER = VariableSuggestionsPopover;
var VariablePluginKey = new import_state5.PluginKey("variable");
var VariableExtension = import_core7.Node.create({
  name: "variable",
  group: "inline",
  inline: true,
  selectable: true,
  atom: true,
  addStorage() {
    return {
      popover: false
    };
  },
  addOptions() {
    return {
      variables: DEFAULT_VARIABLES,
      variableSuggestionsPopover: DEFAULT_VARIABLE_SUGGESTION_POPOVER,
      renderVariable: DEFAULT_RENDER_VARIABLE_FUNCTION,
      renderLabel(props) {
        var _a;
        const { node } = props;
        return `${(_a = node.attrs.label) != null ? _a : node.attrs.id}`;
      },
      suggestion: {
        char: "@",
        pluginKey: VariablePluginKey,
        command: ({ editor, range, props }) => {
          var _a, _b;
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = (_a = nodeAfter == null ? void 0 : nodeAfter.text) == null ? void 0 : _a.startsWith(" ");
          if (overrideSpace) {
            range.to += 1;
          }
          editor.chain().focus().insertContentAt(range, [
            {
              type: this.name,
              attrs: props
            },
            {
              type: "text",
              text: " "
            }
          ]).run();
          (_b = window.getSelection()) == null ? void 0 : _b.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);
          return allow;
        }
      }
    };
  },
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            "data-id": attributes.id
          };
        }
      },
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }
          return {
            "data-label": attributes.label
          };
        }
      },
      fallback: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-fallback"),
        renderHTML: (attributes) => {
          if (!attributes.fallback) {
            return {};
          }
          return {
            "data-fallback": attributes.fallback
          };
        }
      },
      required: {
        default: true,
        parseHTML: (element) => element.hasAttribute("data-required"),
        renderHTML: (attributes) => {
          var _a;
          return {
            "data-required": (_a = attributes == null ? void 0 : attributes.required) != null ? _a : true
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ node, HTMLAttributes: HTMLAttributes2 }) {
    return [
      "div",
      (0, import_core7.mergeAttributes)({ "data-type": this.name }, HTMLAttributes2),
      this.options.renderLabel({
        options: this.options,
        node
      })
    ];
  },
  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node
    });
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isMention = false;
        const { selection } = state;
        const { empty, anchor } = selection;
        if (!empty) {
          return false;
        }
        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isMention = true;
            tr.insertText(
              this.options.suggestion.char || "",
              pos,
              pos + node.nodeSize
            );
            return false;
          }
        });
        return isMention;
      })
    };
  },
  addProseMirrorPlugins() {
    return [
      (0, import_suggestion.default)(__spreadValues({
        editor: this.editor
      }, this.options.suggestion))
    ];
  },
  addNodeView() {
    return (0, import_react28.ReactNodeViewRenderer)(VariableView, {
      className: "mly-relative mly-inline-block",
      as: "div"
    });
  }
});

// src/editor/components/ui/link-input-popover.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
function LinkInputPopover(props) {
  var _a, _b;
  const {
    defaultValue = "",
    onValueChange,
    tooltip,
    icon: Icon = import_lucide_react22.Link,
    editor,
    isVariable
  } = props;
  const [isOpen, setIsOpen] = (0, import_react29.useState)(false);
  const [isEditing, setIsEditing] = (0, import_react29.useState)(!isVariable);
  const linkInputRef = (0, import_react29.useRef)(null);
  const { placeholderUrl = DEFAULT_PLACEHOLDER_URL } = useMailyContext();
  const options = useVariableOptions(editor);
  const renderVariable = options == null ? void 0 : options.renderVariable;
  const variables = options == null ? void 0 : options.variables;
  const variableTriggerCharacter = (_b = (_a = options == null ? void 0 : options.suggestion) == null ? void 0 : _a.char) != null ? _b : DEFAULT_VARIABLE_TRIGGER_CHAR;
  const autoCompleteOptions = (0, import_react30.useMemo)(() => {
    const withoutTrigger = defaultValue.replace(
      new RegExp(variableTriggerCharacter, "g"),
      ""
    );
    return processVariables(variables, {
      query: withoutTrigger || "",
      from: "bubble-variable",
      editor
    }).map((variable) => variable.name);
  }, [variables, variableTriggerCharacter, defaultValue, editor]);
  const popoverButton = /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    BaseButton,
    {
      variant: "ghost",
      size: "sm",
      type: "button",
      className: "mly-size-7",
      "data-state": !!defaultValue,
      children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Icon, { className: "mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5] mly-text-midnight-gray" })
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
    Popover,
    {
      open: isOpen,
      onOpenChange: (open) => {
        setIsOpen(open);
        if (open) {
          setTimeout(() => {
            var _a2;
            (_a2 = linkInputRef.current) == null ? void 0 : _a2.focus();
          }, 0);
        }
      },
      children: [
        tooltip ? /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(TooltipTrigger, { asChild: true, children: popoverButton }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(TooltipContent, { sideOffset: 8, children: tooltip })
        ] }) : popoverButton,
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          PopoverContent,
          {
            align: "end",
            side: "top",
            className: "mly-w-max mly-rounded-none mly-border-none mly-bg-transparent !mly-p-0 mly-shadow-none",
            sideOffset: 8,
            onCloseAutoFocus: (e) => e.preventDefault(),
            children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  const input = linkInputRef.current;
                  if (!input) {
                    return;
                  }
                  onValueChange == null ? void 0 : onValueChange(input.value);
                  setIsOpen(false);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "mly-isolate mly-flex mly-rounded-lg", children: [
                  !isEditing && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "mly-flex mly-h-8 mly-items-center mly-rounded-lg mly-border mly-border-gray-300 mly-bg-white mly-px-0.5", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                    "button",
                    {
                      onClick: () => {
                        setIsEditing(true);
                        setTimeout(() => {
                          var _a2;
                          (_a2 = linkInputRef.current) == null ? void 0 : _a2.focus();
                        }, 0);
                      },
                      children: renderVariable({
                        variable: {
                          name: defaultValue,
                          valid: true
                        },
                        fallback: "",
                        from: "bubble-variable",
                        editor
                      })
                    }
                  ) }),
                  isEditing && /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "mly-relative", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "mly-absolute mly-inset-y-0 mly-left-1.5 mly-z-10 mly-flex mly-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_lucide_react22.LinkIcon, { className: "mly-h-3 mly-w-3 mly-stroke-[2.5] mly-text-midnight-gray" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                      InputAutocomplete,
                      {
                        editor,
                        value: defaultValue,
                        onValueChange: (value) => {
                          onValueChange == null ? void 0 : onValueChange(value);
                        },
                        autoCompleteOptions,
                        ref: linkInputRef,
                        placeholder: placeholderUrl,
                        className: "-mly-ms-px mly-block mly-h-8 mly-w-56 mly-rounded-lg mly-border mly-border-gray-300 mly-px-2 mly-py-1.5 mly-pl-6 mly-pr-6 mly-text-sm mly-shadow-sm mly-outline-none placeholder:mly-text-gray-400",
                        triggerChar: variableTriggerCharacter,
                        onSelectOption: (value) => {
                          var _a2;
                          const isVariable2 = (_a2 = autoCompleteOptions.includes(value)) != null ? _a2 : false;
                          if (isVariable2) {
                            setIsEditing(false);
                          }
                          onValueChange == null ? void 0 : onValueChange(value, isVariable2);
                          setIsOpen(false);
                        }
                      }
                    )
                  ] })
                ] })
              }
            )
          }
        )
      ]
    }
  );
}

// src/editor/components/image-menu/image-size.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
function ImageSize(props) {
  const { value, onValueChange, dimension } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("label", { className: "mly-relative mly-flex mly-items-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "mly-absolute mly-inset-y-0 mly-left-2 mly-flex mly-items-center mly-text-xs mly-leading-none mly-text-gray-400", children: dimension === "width" ? "W" : "H" }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      "input",
      __spreadProps(__spreadValues({}, AUTOCOMPLETE_PASSWORD_MANAGERS_OFF), {
        className: "hide-number-controls mly-h-auto mly-max-w-20 mly-appearance-none mly-border-0 mly-border-none mly-p-1 mly-px-[26px] mly-text-sm mly-uppercase mly-tabular-nums mly-outline-none focus-visible:mly-outline-none",
        type: "number",
        value,
        onChange: (e) => onValueChange(e.target.value)
      })
    ),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "mly-absolute mly-inset-y-0 mly-right-1 mly-flex mly-items-center mly-text-xs mly-leading-none mly-text-gray-400", children: "PX" })
  ] });
}

// src/editor/components/image-menu/use-image-state.tsx
var import_react31 = require("@tiptap/react");
var import_fast_deep_equal3 = __toESM(require("fast-deep-equal"), 1);
var useImageState = (editor) => {
  const states = (0, import_react31.useEditorState)({
    editor,
    selector: ({ editor: editor2 }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      return {
        width: String(editor2.getAttributes("image").width),
        height: String(editor2.getAttributes("image").height),
        isImageActive: editor2.isActive("image"),
        isLogoActive: editor2.isActive("logo"),
        alignment: ((_a = editor2.getAttributes("image")) == null ? void 0 : _a.alignment) || ((_b = editor2.getAttributes("logo")) == null ? void 0 : _b.alignment),
        borderRadius: (_c = editor2.getAttributes("image")) == null ? void 0 : _c.borderRadius,
        logoSize: ((_d = editor2.getAttributes("logo")) == null ? void 0 : _d.size) || DEFAULT_LOGO_SIZE,
        imageSrc: ((_e = editor2.getAttributes("image")) == null ? void 0 : _e.src) || ((_f = editor2.getAttributes("logo")) == null ? void 0 : _f.src) || "",
        isSrcVariable: (_j = (_i = (_g = editor2.getAttributes("image")) == null ? void 0 : _g.isSrcVariable) != null ? _i : (_h = editor2.getAttributes("logo")) == null ? void 0 : _h.isSrcVariable) != null ? _j : false,
        imageExternalLink: ((_k = editor2.getAttributes("image")) == null ? void 0 : _k.externalLink) || "",
        isExternalLinkVariable: (_l = editor2.getAttributes("image")) == null ? void 0 : _l.isExternalLinkVariable,
        lockAspectRatio: (_m = editor2.getAttributes("image")) == null ? void 0 : _m.lockAspectRatio,
        aspectRatio: (_n = editor2.getAttributes("image")) == null ? void 0 : _n.aspectRatio,
        currentShowIfKey: ((_o = editor2.getAttributes("image")) == null ? void 0 : _o.showIfKey) || ((_p = editor2.getAttributes("logo")) == null ? void 0 : _p.showIfKey) || ""
      };
    },
    equalityFn: import_fast_deep_equal3.default
  });
  return states;
};

// src/editor/components/image-menu/image-bubble-menu.tsx
var import_jsx_runtime37 = require("react/jsx-runtime");
function ImageBubbleMenu(props) {
  var _a, _b, _c, _d;
  const { editor, appendTo } = props;
  if (!editor) {
    return null;
  }
  const state = useImageState(editor);
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      if (!editor2.isEditable) {
        return false;
      }
      return editor2.isActive("logo") || editor2.isActive("image");
    },
    tippyOptions: {
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      plugins: [import_tippy4.sticky],
      sticky: "popper",
      maxWidth: "100%"
    }
  });
  const { lockAspectRatio } = state;
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_react32.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(TooltipProvider, { children: [
        state.isLogoActive && state.imageSrc && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_jsx_runtime37.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            Select,
            {
              label: "Size",
              tooltip: "Size",
              value: state.logoSize,
              options: allowedLogoSize.map((size) => ({
                value: size,
                label: size
              })),
              onValueChange: (value) => {
                editor == null ? void 0 : editor.chain().focus().setLogoAttributes({ size: value }).run();
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Divider, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            AlignmentSwitch,
            {
              alignment: state.alignment,
              onAlignmentChange: (alignment) => {
                const isCurrentNodeImage = state.isImageActive;
                if (!isCurrentNodeImage) {
                  editor == null ? void 0 : editor.chain().focus().setLogoAttributes({ alignment }).run();
                } else {
                  editor == null ? void 0 : editor.chain().focus().updateAttributes("image", { alignment }).run();
                }
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            LinkInputPopover,
            {
              defaultValue: (_a = state == null ? void 0 : state.imageSrc) != null ? _a : "",
              onValueChange: (value, isVariable) => {
                if (state.isLogoActive) {
                  editor == null ? void 0 : editor.chain().setLogoAttributes({
                    src: value,
                    isSrcVariable: isVariable != null ? isVariable : false
                  }).run();
                } else {
                  editor == null ? void 0 : editor.chain().updateAttributes("image", {
                    src: value,
                    isSrcVariable: isVariable != null ? isVariable : false
                  }).run();
                }
              },
              tooltip: "Source URL",
              icon: import_lucide_react23.ImageDown,
              editor,
              isVariable: state.isSrcVariable
            }
          ),
          state.isImageActive && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            LinkInputPopover,
            {
              defaultValue: (_b = state == null ? void 0 : state.imageExternalLink) != null ? _b : "",
              onValueChange: (value, isVariable) => {
                editor == null ? void 0 : editor.chain().updateAttributes("image", {
                  externalLink: value,
                  isExternalLinkVariable: isVariable != null ? isVariable : false
                }).run();
              },
              tooltip: "External URL",
              editor,
              isVariable: state.isExternalLinkVariable
            }
          )
        ] }),
        state.isImageActive && state.imageSrc && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_jsx_runtime37.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            Select,
            {
              label: "Border Radius",
              value: state == null ? void 0 : state.borderRadius,
              options: borderRadius.map((value) => ({
                value: String(value.value),
                label: value.name
              })),
              onValueChange: (value) => {
                editor == null ? void 0 : editor.chain().updateAttributes("image", {
                  borderRadius: Number(value)
                }).run();
              },
              tooltip: "Border Radius",
              className: "mly-capitalize"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              ImageSize,
              {
                dimension: "width",
                value: (_c = state == null ? void 0 : state.width) != null ? _c : "",
                onValueChange: (value) => {
                  const width = Math.min(Number(value) || 0, IMAGE_MAX_WIDTH);
                  const currentHeight = Number(state.height) || 0;
                  const currentWidth = Number(state.width) || 0;
                  const currentAspectRatio = state.aspectRatio || currentWidth / currentHeight || 1;
                  editor == null ? void 0 : editor.chain().updateAttributes("image", __spreadValues({
                    width: String(width)
                  }, lockAspectRatio && value ? {
                    height: String(
                      getNewHeight(width, currentAspectRatio)
                    )
                  } : {})).run();
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              ImageSize,
              {
                dimension: "height",
                value: (_d = state == null ? void 0 : state.height) != null ? _d : "",
                onValueChange: (value) => {
                  const height = Number(value) || 0;
                  const currentHeight = Number(state.height) || 0;
                  const currentWidth = Number(state.width) || 0;
                  const currentAspectRatio = state.aspectRatio || currentWidth / currentHeight || 1;
                  editor == null ? void 0 : editor.chain().updateAttributes("image", __spreadValues({
                    height: String(height)
                  }, lockAspectRatio && value ? {
                    width: String(
                      getNewWidth(height, currentAspectRatio)
                    )
                  } : {})).run();
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              BubbleMenuButton,
              {
                isActive: () => lockAspectRatio,
                command: () => {
                  const width = Number(state.width) || 0;
                  const height = Number(state.height) || 0;
                  const aspectRatio = width / height;
                  editor == null ? void 0 : editor.chain().updateAttributes("image", {
                    lockAspectRatio: !lockAspectRatio,
                    aspectRatio
                  }).run();
                },
                icon: lockAspectRatio ? import_lucide_react23.LockIcon : import_lucide_react23.LockOpenIcon,
                tooltip: "Lock Aspect Ratio"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
          ShowPopover,
          {
            showIfKey: state.currentShowIfKey,
            onShowIfKeyValueChange: (value) => {
              editor == null ? void 0 : editor.chain().updateAttributes(state.isLogoActive ? "logo" : "image", {
                showIfKey: value
              }).run();
            },
            editor
          }
        )
      ] })
    })
  );
}

// src/editor/components/inline-image-menu/inline-image-bubble-menu.tsx
var import_react34 = require("@tiptap/react");
var import_tippy5 = require("tippy.js");

// src/editor/nodes/inline-image/inline-image.tsx
var import_core8 = require("@tiptap/core");
var import_state6 = require("@tiptap/pm/state");
var DEFAULT_INLINE_IMAGE_HEIGHT = 20;
var DEFAULT_INLINE_IMAGE_WIDTH = 20;
var InlineImageExtension = import_core8.Node.create({
  name: "inlineImage",
  inline: true,
  group: "inline",
  selectable: false,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      height: {
        default: DEFAULT_INLINE_IMAGE_HEIGHT
      },
      width: {
        default: DEFAULT_INLINE_IMAGE_WIDTH
      },
      src: {
        default: null
      },
      isSrcVariable: {
        default: false,
        renderHTML(attributes) {
          if (!attributes.isSrcVariable) {
            return {};
          }
          return {
            "data-is-src-variable": "true"
          };
        }
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      externalLink: {
        default: null,
        renderHTML(attributes) {
          if (!attributes.externalLink) {
            return {};
          }
          return {
            "data-external-link": attributes.externalLink
          };
        }
      },
      isExternalLinkVariable: {
        default: false,
        renderHTML(attributes) {
          if (!attributes.isExternalLinkVariable) {
            return {};
          }
          return {
            "data-is-external-link-variable": "true"
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `img[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    const attrs = (0, import_core8.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes2, {
      "data-type": this.name,
      class: "mly-inline mly-relative",
      style: `--mly-inline-image-height: ${HTMLAttributes2.height}px; --mly-inline-image-width: ${HTMLAttributes2.width}px; margin:0; vertical-align: middle;`,
      draggable: "false",
      loading: "lazy"
    });
    return ["img", attrs];
  },
  addCommands() {
    return {
      setInlineImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      new import_state6.Plugin({
        key: new import_state6.PluginKey("inlineImage"),
        props: {
          handleClickOn: (_, pos, node) => {
            if (node.type !== this.type) {
              return false;
            }
            const from = pos;
            const to = pos + node.nodeSize;
            this.editor.commands.setTextSelection({ from, to });
            return true;
          }
        }
      })
    ];
  }
});

// src/editor/components/inline-image-menu/use-inline-image-state.tsx
var import_react33 = require("@tiptap/react");
var import_fast_deep_equal4 = __toESM(require("fast-deep-equal"), 1);
var useInlineImageState = (editor) => {
  const states = (0, import_react33.useEditorState)({
    editor,
    selector: ({ editor: editor2 }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return {
        height: ((_a = editor2.getAttributes("inlineImage")) == null ? void 0 : _a.height) || DEFAULT_INLINE_IMAGE_HEIGHT,
        width: ((_b = editor2.getAttributes("inlineImage")) == null ? void 0 : _b.width) || DEFAULT_INLINE_IMAGE_WIDTH,
        src: ((_c = editor2.getAttributes("inlineImage")) == null ? void 0 : _c.src) || "",
        isSrcVariable: (_e = (_d = editor2.getAttributes("inlineImage")) == null ? void 0 : _d.isSrcVariable) != null ? _e : false,
        imageExternalLink: ((_f = editor2.getAttributes("inlineImage")) == null ? void 0 : _f.externalLink) || "",
        isExternalLinkVariable: (_h = (_g = editor2.getAttributes("inlineImage")) == null ? void 0 : _g.isExternalLinkVariable) != null ? _h : false
      };
    },
    equalityFn: import_fast_deep_equal4.default
  });
  return states;
};

// src/editor/components/inline-image-menu/inline-image-bubble-menu.tsx
var import_lucide_react24 = require("lucide-react");
var import_jsx_runtime38 = require("react/jsx-runtime");
function InlineImageBubbleMenu(props) {
  var _a, _b;
  const { editor, appendTo } = props;
  if (!editor) {
    return null;
  }
  const state = useInlineImageState(editor);
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      if (!editor2.isEditable) {
        return false;
      }
      return editor2.isActive("inlineImage");
    },
    tippyOptions: {
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      plugins: [import_tippy5.sticky],
      sticky: "popper",
      maxWidth: "100%"
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    import_react34.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          LinkInputPopover,
          {
            defaultValue: (_a = state == null ? void 0 : state.src) != null ? _a : "",
            onValueChange: (value, isVariable) => {
              editor == null ? void 0 : editor.chain().updateAttributes("inlineImage", {
                src: value,
                isSrcVariable: isVariable != null ? isVariable : false
              }).run();
            },
            tooltip: "Source URL",
            icon: import_lucide_react24.ImageDownIcon,
            editor,
            isVariable: state.isSrcVariable
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          LinkInputPopover,
          {
            defaultValue: (_b = state == null ? void 0 : state.imageExternalLink) != null ? _b : "",
            onValueChange: (value, isVariable) => {
              editor == null ? void 0 : editor.chain().updateAttributes("inlineImage", {
                externalLink: value,
                isExternalLinkVariable: isVariable != null ? isVariable : false
              }).run();
            },
            tooltip: "External URL",
            editor,
            isVariable: state.isExternalLinkVariable
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          ImageSize,
          {
            dimension: "height",
            value: state == null ? void 0 : state.height,
            onValueChange: (value) => {
              editor == null ? void 0 : editor.chain().updateAttributes("inlineImage", {
                width: value || DEFAULT_INLINE_IMAGE_WIDTH,
                height: value || DEFAULT_INLINE_IMAGE_HEIGHT
              }).run();
            }
          }
        )
      ] }) })
    })
  );
}

// src/editor/components/repeat-menu/repeat-bubble-menu.tsx
var import_react36 = require("@tiptap/react");
var import_lucide_react25 = require("lucide-react");
var import_react37 = require("react");
var import_tippy6 = require("tippy.js");

// src/editor/components/repeat-menu/use-repeat-state.ts
var import_react35 = require("@tiptap/react");
var import_fast_deep_equal5 = __toESM(require("fast-deep-equal"), 1);
var useRepeatState = (editor) => {
  const states = (0, import_react35.useEditorState)({
    editor,
    selector: (ctx) => {
      var _a, _b;
      return {
        each: (_a = ctx.editor.getAttributes("repeat")) == null ? void 0 : _a.each,
        currentShowIfKey: ((_b = ctx.editor.getAttributes("repeat")) == null ? void 0 : _b.showIfKey) || "",
        isSectionActive: ctx.editor.isActive("section")
      };
    },
    equalityFn: import_fast_deep_equal5.default
  });
  return states;
};

// src/editor/components/repeat-menu/repeat-bubble-menu.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
function RepeatBubbleMenu(props) {
  const { appendTo, editor } = props;
  if (!editor) {
    return null;
  }
  const state = useRepeatState(editor);
  const getReferenceClientRect = (0, import_react37.useCallback)(() => {
    const renderContainer = getRenderContainer(editor, "repeat");
    const rect = (renderContainer == null ? void 0 : renderContainer.getBoundingClientRect()) || new DOMRect(-1e3, -1e3, 0, 0);
    return rect;
  }, [editor]);
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      var _a;
      const activeForNode = getClosestNodeByName(editor2, "repeat");
      const sectionNodeChildren = activeForNode ? (_a = (0, import_react36.findChildren)(activeForNode == null ? void 0 : activeForNode.node, (node) => {
        return node.type.name === "section";
      })) == null ? void 0 : _a[0] : null;
      const hasActiveSectionNodeChildren = sectionNodeChildren && editor2.isActive("section");
      if (isTextSelected(editor2) || hasActiveSectionNodeChildren || !editor2.isEditable) {
        return false;
      }
      return editor2.isActive("repeat");
    },
    tippyOptions: {
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      getReferenceClientRect,
      appendTo: () => appendTo == null ? void 0 : appendTo.current,
      plugins: [import_tippy6.sticky],
      sticky: "popper",
      maxWidth: "auto"
    },
    pluginKey: "repeatBubbleMenu"
  });
  const opts = useVariableOptions(editor);
  const variables = opts == null ? void 0 : opts.variables;
  const renderVariable = opts == null ? void 0 : opts.renderVariable;
  const inputRef = (0, import_react37.useRef)(null);
  const [isUpdatingKey, setIsUpdatingKey] = (0, import_react37.useState)(false);
  const eachKey = (state == null ? void 0 : state.each) || "";
  const autoCompleteOptions = (0, import_react37.useMemo)(() => {
    return processVariables(variables, {
      query: eachKey || "",
      editor,
      from: "repeat-variable"
    }).map((variable) => variable.name);
  }, [variables, eachKey, editor]);
  const isValidEachKey = eachKey;
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    import_react36.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-items-stretch mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(TooltipProvider, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "mly-flex mly-items-center mly-gap-1.5 mly-px-1.5 mly-text-sm mly-leading-none", children: [
          "Repeat",
          /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(Tooltip, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(TooltipTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              import_lucide_react25.InfoIcon,
              {
                className: cn("mly-size-3 mly-stroke-[2.5] mly-text-gray-500")
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              TooltipContent,
              {
                sideOffset: 14,
                className: "mly-max-w-[260px]",
                align: "start",
                children: "Ensure the selected variable is iterable, such as an array of objects."
              }
            )
          ] })
        ] }),
        !isUpdatingKey && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "button",
          {
            onClick: () => {
              setIsUpdatingKey(true);
              setTimeout(() => {
                var _a;
                (_a = inputRef.current) == null ? void 0 : _a.focus();
              }, 0);
            },
            children: renderVariable({
              variable: {
                name: state == null ? void 0 : state.each,
                valid: isValidEachKey
              },
              fallback: "",
              from: "bubble-variable",
              editor
            })
          }
        ),
        isUpdatingKey && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              setIsUpdatingKey(false);
            },
            onKeyDown: (e) => {
              if (e.key === "Escape") {
                setIsUpdatingKey(false);
              }
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              InputAutocomplete,
              {
                editor,
                placeholder: "ie. payload.items",
                value: (state == null ? void 0 : state.each) || "",
                onValueChange: (value) => {
                  editor.commands.updateRepeat({
                    each: value
                  });
                },
                onOutsideClick: () => {
                  setIsUpdatingKey(false);
                },
                onSelectOption: (value) => {
                  editor.commands.updateRepeat({
                    each: value
                  });
                  setIsUpdatingKey(false);
                },
                autoCompleteOptions,
                ref: inputRef
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          ShowPopover,
          {
            showIfKey: state.currentShowIfKey,
            onShowIfKeyValueChange: (value) => {
              editor.commands.updateRepeat({
                showIfKey: value
              });
            },
            editor
          }
        )
      ] })
    })
  );
}

// src/editor/components/section-menu/section-bubble-menu.tsx
var import_react39 = require("@tiptap/react");
var import_lucide_react26 = require("lucide-react");
var import_react40 = require("react");
var import_tippy7 = require("tippy.js");

// src/editor/components/icons/border-color.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
function BorderColor(props) {
  const _a = props, { topBarClassName } = _a, rest = __objRest(_a, ["topBarClassName"]);
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    "svg",
    __spreadProps(__spreadValues({
      width: 11,
      height: 12,
      viewBox: "0 0 11 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, rest), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("path", { d: "M0 11H10.6667", stroke: "currentColor", strokeWidth: "1.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          "path",
          {
            d: "M0.666504 9V6.33333C0.666504 3.38781 3.05432 1 5.99984 1H10.6665",
            strokeWidth: "1.5",
            className: topBarClassName
          }
        )
      ]
    })
  );
}

// src/editor/components/icons/margin-icon.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
function MarginIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
    "svg",
    __spreadProps(__spreadValues({
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        "path",
        {
          d: "M10.5 10.499V1.49902M1.5 10.499V1.49902M4.5 5.99902C4.5 5.53308 4.5 5.30011 4.57612 5.11634C4.67761 4.87131 4.87229 4.67664 5.11732 4.57514C5.30109 4.49902 5.53406 4.49902 6 4.49902C6.46594 4.49902 6.69891 4.49902 6.88268 4.57514C7.12771 4.67664 7.32239 4.87131 7.42388 5.11634C7.5 5.30011 7.5 5.53308 7.5 5.99902C7.5 6.46496 7.5 6.69794 7.42388 6.88171C7.32239 7.12673 7.12771 7.32141 6.88268 7.4229C6.69891 7.49902 6.46594 7.49902 6 7.49902C5.53406 7.49902 5.30109 7.49902 5.11732 7.4229C4.87229 7.32141 4.67761 7.12673 4.57612 6.88171C4.5 6.69794 4.5 6.46496 4.5 5.99902Z",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    })
  );
}

// src/editor/components/icons/padding-icon.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
function PaddingIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    "svg",
    __spreadProps(__spreadValues({
      width: 10,
      height: 10,
      viewBox: "0 0 10 10",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
        "path",
        {
          d: "M9.50244 0.501526L9.10244 0.501526C8.54239 0.501526 8.26236 0.501526 8.04845 0.610519C7.86029 0.706392 7.70731 0.859373 7.61144 1.04754C7.50244 1.26145 7.50244 1.54147 7.50244 2.10153V7.90153C7.50244 8.46158 7.50244 8.74161 7.61144 8.95552C7.70731 9.14368 7.86029 9.29666 8.04845 9.39253C8.26236 9.50153 8.54239 9.50153 9.10244 9.50153H9.50244M0.502441 0.501527L0.902441 0.501527C1.46249 0.501527 1.74252 0.501527 1.95643 0.61052C2.14459 0.706393 2.29757 0.859374 2.39345 1.04754C2.50244 1.26145 2.50244 1.54147 2.50244 2.10153L2.50244 7.90153C2.50244 8.46158 2.50244 8.74161 2.39345 8.95552C2.29757 9.14368 2.14459 9.29666 1.95643 9.39253C1.74252 9.50153 1.46249 9.50153 0.902442 9.50153H0.502442M4.99994 7.99903V1.99903",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    })
  );
}

// src/editor/components/ui/color-picker.tsx
var import_react_colorful = require("react-colorful");
var import_jsx_runtime43 = require("react/jsx-runtime");
function ColorPicker(props) {
  const {
    color,
    onColorChange,
    borderColor,
    backgroundColor,
    tooltip,
    className,
    children,
    onClose,
    suggestedColors = []
  } = props;
  const handleColorChange = (color2) => {
    queueMicrotask(() => {
      onColorChange(color2);
    });
  };
  const popoverButton = /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(PopoverTrigger, { asChild: true, children: children || /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
    BaseButton,
    {
      variant: "ghost",
      className: "!mly-size-7 mly-shrink-0",
      size: "sm",
      type: "button",
      children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
        "div",
        {
          className: cn(
            "mly-h-4 mly-w-4 mly-shrink-0 mly-rounded mly-border-2 mly-border-gray-700",
            className
          ),
          style: __spreadProps(__spreadValues({}, borderColor ? { borderColor } : {}), {
            backgroundColor: backgroundColor || "transparent"
          })
        }
      )
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
    Popover,
    {
      onOpenChange: (open) => {
        if (!open) {
          onClose == null ? void 0 : onClose(color);
        }
      },
      children: [
        tooltip ? /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(TooltipTrigger, { asChild: true, children: popoverButton }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(TooltipContent, { sideOffset: 8, children: tooltip })
        ] }) : popoverButton,
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          PopoverContent,
          {
            className: "mly-w-full mly-rounded-none mly-border-0 !mly-bg-transparent !mly-p-0 mly-shadow-none mly-drop-shadow-md",
            sideOffset: 8,
            children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "mly-min-w-[260px] mly-rounded-xl mly-border mly-border-gray-200 mly-bg-white mly-p-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                import_react_colorful.HexColorPicker,
                {
                  color,
                  onChange: handleColorChange,
                  className: "mly-flex !mly-w-full mly-flex-col mly-gap-4"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                import_react_colorful.HexColorInput,
                {
                  alpha: true,
                  color,
                  onChange: handleColorChange,
                  className: "mly-mt-4 mly-w-full mly-min-w-0 mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-px-2 mly-py-1.5 mly-text-sm mly-uppercase focus-visible:mly-border-gray-400 focus-visible:mly-outline-none",
                  prefixed: true
                }
              ),
              suggestedColors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "-mly-mx-4 mly-my-4 mly-h-px mly-bg-gray-200" }),
                /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("h2", { className: "mly-text-xs mly-text-gray-500", children: "Recently used" }),
                /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "mly-mt-2 mly-flex mly-flex-wrap mly-gap-0.5", children: suggestedColors.map((suggestedColor) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                  BaseButton,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "!mly-size-7 mly-shrink-0",
                    type: "button",
                    onClick: () => handleColorChange(suggestedColor),
                    children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                      "div",
                      {
                        className: "mly-h-4 mly-w-4 mly-shrink-0 mly-rounded",
                        style: {
                          backgroundColor: suggestedColor
                        }
                      }
                    )
                  },
                  suggestedColor
                )) })
              ] })
            ] })
          }
        )
      ]
    }
  );
}

// src/editor/components/section-menu/use-section-state.tsx
var import_react38 = require("@tiptap/react");
var import_fast_deep_equal6 = __toESM(require("fast-deep-equal"), 1);
var useSectionState = (editor) => {
  const states = (0, import_react38.useEditorState)({
    editor,
    selector: (ctx) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      return {
        currentAlignment: ((_a = ctx.editor.getAttributes("section")) == null ? void 0 : _a.align) || "left",
        currentBorderRadius: Number((_b = ctx.editor.getAttributes("section")) == null ? void 0 : _b.borderRadius) || 0,
        currentBackgroundColor: ((_c = ctx.editor.getAttributes("section")) == null ? void 0 : _c.backgroundColor) || DEFAULT_SECTION_BACKGROUND_COLOR,
        currentBorderColor: ((_d = ctx.editor.getAttributes("section")) == null ? void 0 : _d.borderColor) || DEFAULT_SECTION_BORDER_COLOR,
        currentBorderWidth: Number((_e = ctx.editor.getAttributes("section")) == null ? void 0 : _e.borderWidth) || 0,
        currentMarginTop: Number((_f = ctx.editor.getAttributes("section")) == null ? void 0 : _f.marginTop) || 0,
        currentMarginRight: Number((_g = ctx.editor.getAttributes("section")) == null ? void 0 : _g.marginRight) || 0,
        currentMarginBottom: Number((_h = ctx.editor.getAttributes("section")) == null ? void 0 : _h.marginBottom) || 0,
        currentMarginLeft: Number((_i = ctx.editor.getAttributes("section")) == null ? void 0 : _i.marginLeft) || 0,
        currentPaddingTop: Number((_j = ctx.editor.getAttributes("section")) == null ? void 0 : _j.paddingTop) || 0,
        currentPaddingRight: Number((_k = ctx.editor.getAttributes("section")) == null ? void 0 : _k.paddingRight) || 0,
        currentPaddingBottom: Number((_l = ctx.editor.getAttributes("section")) == null ? void 0 : _l.paddingBottom) || 0,
        currentPaddingLeft: Number((_m = ctx.editor.getAttributes("section")) == null ? void 0 : _m.paddingLeft) || 0,
        isColumnsActive: ctx.editor.isActive("columns"),
        currentShowIfKey: ((_n = ctx.editor.getAttributes("section")) == null ? void 0 : _n.showIfKey) || ""
      };
    },
    equalityFn: import_fast_deep_equal6.default
  });
  return states;
};

// src/editor/components/section-menu/section-bubble-menu.tsx
var import_jsx_runtime44 = require("react/jsx-runtime");
function SectionBubbleMenu(props) {
  const { appendTo, editor } = props;
  if (!editor) {
    return null;
  }
  const getReferenceClientRect = (0, import_react40.useCallback)(() => {
    const renderContainer = getRenderContainer(editor, "section");
    const rect = (renderContainer == null ? void 0 : renderContainer.getBoundingClientRect()) || new DOMRect(-1e3, -1e3, 0, 0);
    return rect;
  }, [editor]);
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      var _a, _b;
      const activeSectionNode = getClosestNodeByName(editor2, "section");
      const repeatNodeChildren = activeSectionNode ? (_a = (0, import_react39.findChildren)(activeSectionNode == null ? void 0 : activeSectionNode.node, (node) => {
        return node.type.name === "repeat";
      })) == null ? void 0 : _a[0] : null;
      const inlineImageNodeChildren = activeSectionNode ? (_b = (0, import_react39.findChildren)(activeSectionNode == null ? void 0 : activeSectionNode.node, (node) => {
        return node.type.name === "inlineImage";
      })) == null ? void 0 : _b[0] : null;
      const hasActiveRepeatNodeChildren = repeatNodeChildren && editor2.isActive("repeat");
      const hasActiveInlineImageNodeChildren = inlineImageNodeChildren && editor2.isActive("inlineImage");
      if (isTextSelected(editor2) || hasActiveRepeatNodeChildren || hasActiveInlineImageNodeChildren || !editor2.isEditable) {
        return false;
      }
      return editor2.isActive("section");
    },
    tippyOptions: {
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      getReferenceClientRect,
      appendTo: () => appendTo == null ? void 0 : appendTo.current,
      plugins: [import_tippy7.sticky],
      sticky: "popper",
      maxWidth: "auto"
    },
    pluginKey: "sectionBubbleMenu"
  });
  const state = useSectionState(editor);
  const borderRadiusOptions = [
    { value: "0", label: "Sharp" },
    { value: "6", label: "Smooth" },
    { value: "9999", label: "Round" }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
    import_react39.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-items-stretch mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(TooltipProvider, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
          AlignmentSwitch,
          {
            alignment: state.currentAlignment,
            onAlignmentChange: (alignment) => {
              var _a;
              (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                align: alignment
              });
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            Select,
            {
              label: "Border Radius",
              value: String(state.currentBorderRadius),
              options: borderRadiusOptions,
              onValueChange: (value) => {
                var _a;
                (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                  borderRadius: Number(value)
                });
              },
              tooltip: "Border Radius",
              className: "mly-capitalize"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            Select,
            {
              label: "Border Width",
              value: String(state.currentBorderWidth),
              options: [
                { value: "0", label: "None" },
                { value: "1", label: "Thin" },
                { value: "2", label: "Medium" },
                { value: "3", label: "Thick" }
              ],
              onValueChange: (value) => {
                var _a;
                (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                  borderWidth: Number(value)
                });
              },
              tooltip: "Border Width",
              className: "mly-capitalize"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
          Select,
          {
            icon: MarginIcon,
            iconClassName: "mly-stroke-[1.2] mly-size-3.5",
            label: "Margin",
            value: String(state.currentMarginTop),
            options: [
              { value: "0", label: "None" },
              ...spacing.map((space) => ({
                label: space.name,
                value: String(space.value)
              }))
            ],
            onValueChange: (_value) => {
              var _a;
              const value = Number(_value);
              (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                marginTop: value,
                marginRight: value,
                marginBottom: value,
                marginLeft: value
              });
            },
            tooltip: "Margin",
            className: "mly-capitalize"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
          Select,
          {
            icon: PaddingIcon,
            iconClassName: "mly-stroke-[1]",
            label: "Padding",
            value: String(state.currentPaddingTop),
            options: [
              { value: "0", label: "None" },
              ...spacing.map((space) => ({
                label: space.name,
                value: String(space.value)
              }))
            ],
            onValueChange: (_value) => {
              var _a;
              const value = Number(_value);
              (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                paddingTop: value,
                paddingRight: value,
                paddingBottom: value,
                paddingLeft: value
              });
            },
            tooltip: "Padding",
            className: "mly-capitalize"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            ColorPicker,
            {
              color: state.currentBorderColor,
              onColorChange: (color) => {
                var _a;
                (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                  borderColor: color
                });
              },
              tooltip: "Border Color",
              children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
                BaseButton,
                {
                  variant: "ghost",
                  className: "!mly-size-7 mly-shrink-0",
                  size: "sm",
                  type: "button",
                  children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
                    BorderColor,
                    {
                      className: "mly-size-3 mly-shrink-0",
                      topBarClassName: "mly-stroke-midnight-gray",
                      style: {
                        color: state.currentBorderColor
                      }
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            ColorPicker,
            {
              color: state.currentBackgroundColor,
              onColorChange: (color) => {
                var _a;
                (_a = editor == null ? void 0 : editor.commands) == null ? void 0 : _a.updateSection({
                  backgroundColor: color
                });
              },
              backgroundColor: state.currentBackgroundColor,
              tooltip: "Background Color",
              className: "mly-rounded-full mly-border-[1.5px] mly-border-white mly-shadow"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
          BubbleMenuButton,
          {
            icon: import_lucide_react26.Trash,
            tooltip: "Delete Section",
            command: () => {
              deleteNode(editor, "section");
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
          ShowPopover,
          {
            showIfKey: state.currentShowIfKey,
            onShowIfKeyValueChange: (value) => {
              editor.commands.updateSection({
                showIfKey: value
              });
            },
            editor
          }
        ),
        state.isColumnsActive && /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_jsx_runtime44.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Popover, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(PopoverTrigger, { className: "mly-flex mly-items-center mly-gap-1 mly-rounded-md mly-px-1.5 mly-text-sm data-[state=open]:mly-bg-soft-gray hover:mly-bg-soft-gray", children: [
              "Column",
              /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_lucide_react26.ChevronUp, { className: "mly-h-3 mly-w-3" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
              PopoverContent,
              {
                className: "mly-w-max mly-rounded-lg !mly-p-0.5",
                side: "top",
                sideOffset: 8,
                align: "end",
                onOpenAutoFocus: (e) => {
                  e.preventDefault();
                },
                onCloseAutoFocus: (e) => {
                  e.preventDefault();
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(ColumnsBubbleMenuContent, { editor })
              }
            )
          ] })
        ] })
      ] })
    })
  );
}

// src/editor/components/spacer-menu/spacer-bubble-menu.tsx
var import_react42 = require("@tiptap/react");

// src/editor/components/spacer-menu/use-spacer-state.ts
var import_react41 = require("@tiptap/react");
var import_fast_deep_equal7 = __toESM(require("fast-deep-equal"), 1);
var useSpacerState = (editor) => {
  const states = (0, import_react41.useEditorState)({
    editor,
    selector: (ctx) => {
      var _a;
      return {
        currentShowIfKey: ((_a = ctx.editor.getAttributes("spacer")) == null ? void 0 : _a.showIfKey) || ""
      };
    },
    equalityFn: import_fast_deep_equal7.default
  });
  return states;
};

// src/editor/components/spacer-menu/spacer-bubble-menu.tsx
var import_react43 = require("react");
var import_jsx_runtime45 = require("react/jsx-runtime");
function SpacerBubbleMenu(props) {
  const { editor, appendTo } = props;
  if (!editor) {
    return null;
  }
  const items = (0, import_react43.useMemo)(
    () => spacing.map((space) => {
      const { value: height, short: name } = space;
      return {
        name,
        isActive: () => editor == null ? void 0 : editor.isActive("spacer", { height }),
        command: () => {
          editor == null ? void 0 : editor.chain().focus().setSpacer({ height }).run();
        }
      };
    }),
    [editor]
  );
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    shouldShow: ({ editor: editor2 }) => {
      if (!editor2.isEditable) {
        return false;
      }
      return editor2.isActive("spacer");
    },
    tippyOptions: {
      maxWidth: "100%",
      moveTransition: "mly-transform 0.15s mly-ease-out"
    }
  });
  const state = useSpacerState(editor);
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
    import_react42.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-gap-0.5 mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(TooltipProvider, { children: [
        items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          BubbleMenuButton,
          __spreadValues({
            className: "!mly-h-7 mly-w-7 mly-shrink-0 mly-p-0",
            iconClassName: "mly-w-3 mly-h-3",
            nameClassName: "mly-text-xs"
          }, item),
          index
        )),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          ShowPopover,
          {
            showIfKey: state.currentShowIfKey,
            onShowIfKeyValueChange: (value) => {
              editor.commands.setSpacerShowIfKey(value);
            },
            editor
          }
        )
      ] })
    })
  );
}

// src/editor/nodes/columns/columns.ts
var import_core9 = require("@tiptap/core");
var import_core10 = require("@tiptap/core");
var import_uuid3 = require("uuid");
var DEFAULT_COLUMNS_GAP = 8;
var ColumnsExtension = import_core10.Node.create({
  name: "columns",
  group: "columns",
  content: "column+",
  defining: true,
  isolating: true,
  addAttributes() {
    return {
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      },
      gap: {
        default: DEFAULT_COLUMNS_GAP,
        parseHTML: (element) => {
          return Number(element.style.gap) || DEFAULT_COLUMNS_GAP;
        },
        renderHTML(attributes) {
          if (!attributes.gap) {
            return {};
          }
          return {
            style: `gap: ${attributes.gap}px`
          };
        }
      }
    };
  },
  addCommands() {
    return {
      setColumns: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {},
          content: [
            {
              type: "column",
              attrs: {
                columnId: (0, import_uuid3.v4)()
              },
              content: [
                {
                  type: "paragraph"
                }
              ]
            },
            {
              type: "column",
              attrs: {
                columnId: (0, import_uuid3.v4)()
              },
              content: [
                {
                  type: "paragraph"
                }
              ]
            }
          ]
        });
      },
      updateColumns: (attrs) => updateAttributes(this.name, attrs)
    };
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    return [
      "div",
      (0, import_core9.mergeAttributes)(HTMLAttributes2, {
        "data-type": "columns",
        class: "mly-relative"
      }),
      0
    ];
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]'
      }
    ];
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return goToColumn(this.editor, "next");
      },
      "Shift-Tab": () => {
        return goToColumn(this.editor, "previous");
      }
    };
  }
});

// src/editor/extensions/horizontal-rule.tsx
var import_core11 = require("@tiptap/core");
var import_extension_horizontal_rule = require("@tiptap/extension-horizontal-rule");
var HorizontalRule = import_extension_horizontal_rule.HorizontalRule.extend({
  addInputRules() {
    return [
      new import_core11.InputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        handler: ({ state, range }) => {
          const attributes = {};
          const { tr } = state;
          const start = range.from;
          const end = range.to;
          tr.insert(start - 1, this.type.create(attributes)).delete(
            tr.mapping.map(start),
            tr.mapping.map(end)
          );
        }
      })
    ];
  },
  addOptions() {
    return {
      HTMLAttributes: {
        class: "mly-relative"
      }
    };
  }
});

// src/editor/utils/is-custom-node-selected.ts
var import_extension_image3 = __toESM(require("@tiptap/extension-image"), 1);

// src/editor/nodes/spacer.ts
var import_core12 = require("@tiptap/core");
var DEFAULT_SPACER_HEIGHT = 8;
var Spacer = import_core12.Node.create({
  name: "spacer",
  priority: 1e3,
  group: "block",
  draggable: true,
  addAttributes() {
    return {
      height: {
        default: DEFAULT_SPACER_HEIGHT,
        parseHTML: (element) => Number(element.getAttribute("data-height")),
        renderHTML: (attributes) => {
          return {
            "data-height": attributes.height
          };
        }
      },
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    };
  },
  addCommands() {
    return {
      setSpacer: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {
            height: options.height
          }
        });
      },
      setSpacerSize: (height) => ({ commands }) => {
        return commands.updateAttributes("spacer", { height });
      },
      setSpacerShowIfKey: (showIfKey) => ({ commands }) => {
        return commands.updateAttributes("spacer", { showIfKey });
      },
      unsetSpacer: () => ({ commands }) => {
        return commands.deleteNode("spacer");
      }
    };
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2, node }) {
    const { height } = node.attrs;
    return [
      "div",
      (0, import_core12.mergeAttributes)(
        {
          "data-maily-component": this.name
        },
        this.options.HTMLAttributes,
        HTMLAttributes2,
        {
          class: "spacer mly-relative mly-full mly-z-50",
          contenteditable: false,
          style: `height: ${height}px;--spacer-height: ${height}px;`
        }
      )
    ];
  },
  parseHTML() {
    return [{ tag: `div[data-maily-component="${this.name}"]` }];
  }
});

// src/editor/extensions/link-card.ts
var import_core13 = require("@tiptap/core");
var import_react45 = require("@tiptap/react");

// src/editor/nodes/link-card.tsx
var import_react44 = require("@tiptap/react");

// src/editor/components/input.tsx
var React5 = __toESM(require("react"), 1);
var import_jsx_runtime46 = require("react/jsx-runtime");
var Input = React5.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
      "input",
      __spreadValues(__spreadProps(__spreadValues({}, AUTOCOMPLETE_PASSWORD_MANAGERS_OFF), {
        type,
        className: cn(
          "mly-flex mly-h-10 mly-w-full mly-rounded-md mly-border mly-border-gray-200 mly-bg-white mly-px-3 mly-py-2 mly-text-sm mly-ring-offset-white file:mly-border-0 file:mly-bg-transparent file:mly-text-sm file:mly-font-medium placeholder:mly-text-gray-500 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2 disabled:mly-cursor-not-allowed disabled:mly-opacity-50",
          "mly-editor",
          className
        ),
        ref
      }), props)
    );
  }
);
Input.displayName = "Input";

// src/editor/components/textarea.tsx
var React6 = __toESM(require("react"), 1);
var import_jsx_runtime47 = require("react/jsx-runtime");
var Textarea = React6.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
      "textarea",
      __spreadValues({
        className: cn(
          "mly-flex mly-min-h-24 mly-w-full mly-rounded-md mly-border mly-border-gray-200 mly-bg-white mly-px-3 mly-py-2 mly-text-sm mly-ring-offset-white file:mly-border-0 file:mly-bg-transparent file:mly-text-sm file:mly-font-medium placeholder:mly-text-gray-500 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2 disabled:mly-cursor-not-allowed disabled:mly-opacity-50",
          "mly-editor",
          className
        ),
        ref
      }, props)
    );
  }
);
Textarea.displayName = "Textarea";

// src/editor/nodes/link-card.tsx
var import_jsx_runtime48 = require("react/jsx-runtime");
function LinkCardComponent(props) {
  const { title, description, link, linkTitle, image: image2, badgeText, subTitle } = props.node.attrs;
  const { getPos, editor } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
    import_react44.NodeViewWrapper,
    {
      className: `react-component ${props.selected && "ProseMirror-selectednode"}`,
      draggable: editor.isEditable,
      "data-drag-handle": editor.isEditable,
      children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(Popover, { open: props.selected, children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
          "div",
          {
            tabIndex: -1,
            onClick: (e) => {
              e.preventDefault();
              const pos = getPos();
              editor.commands.setNodeSelection(pos);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "mly-no-prose mly-flex mly-flex-col mly-rounded-lg mly-border mly-border-gray-300", children: [
              image2 && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "mly-relative mly-mb-1.5 mly-w-full mly-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                "img",
                {
                  src: image2,
                  alt: "link-card",
                  className: "mly-no-prose !mly-mb-0 mly-h-full mly-w-full mly-rounded-t-lg",
                  draggable: editor.isEditable
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "mly-flex mly-items-stretch mly-p-3", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: cn("mly-flex mly-flex-col"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "!mly-mb-1.5 mly-flex mly-items-center mly-gap-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("h2", { className: "!mly-mb-0 !mly-text-lg mly-font-semibold", children: title }),
                  badgeText && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "!mly-font-base text-xs mly-rounded-md mly-bg-yellow-200 mly-px-2 mly-py-1 mly-font-semibold mly-leading-none", children: badgeText }),
                  " ",
                  subTitle && !badgeText && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "!mly-font-base text-xs mly-font-regular mly-rounded-md mly-leading-none mly-text-gray-400", children: subTitle })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { className: "!mly-my-0 !mly-text-base mly-text-gray-500", children: [
                  description,
                  " ",
                  linkTitle ? /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("a", { href: link, className: "mly-font-semibold", children: linkTitle }) : null
                ] })
              ] }) })
            ] })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
          PopoverContent,
          {
            align: "end",
            className: "mly-flex mly-w-96 mly-flex-col mly-gap-2",
            sideOffset: 10,
            onOpenAutoFocus: (e) => e.preventDefault(),
            onCloseAutoFocus: (e) => e.preventDefault(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Image" }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                  Input,
                  {
                    placeholder: "Add Image",
                    type: "url",
                    value: image2,
                    onChange: (e) => {
                      props.updateAttributes({
                        image: e.target.value
                      });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Title" }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                  Input,
                  {
                    placeholder: "Add title",
                    value: title,
                    onChange: (e) => {
                      props.updateAttributes({
                        title: e.target.value
                      });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Description" }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                  Textarea,
                  {
                    placeholder: "Add description here",
                    value: description,
                    onChange: (e) => {
                      props.updateAttributes({
                        description: e.target.value
                      });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "mly-grid mly-grid-cols-2 mly-gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Link Title" }),
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                    Input,
                    {
                      placeholder: "Add link title here",
                      value: linkTitle,
                      onChange: (e) => {
                        props.updateAttributes({
                          linkTitle: e.target.value
                        });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Link" }),
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                    Input,
                    {
                      placeholder: "Add link here",
                      value: link,
                      onChange: (e) => {
                        props.updateAttributes({
                          link: e.target.value
                        });
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "mly-grid mly-grid-cols-2 mly-gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Badge Text" }),
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                    Input,
                    {
                      placeholder: "Add badge text here",
                      value: badgeText,
                      onChange: (e) => {
                        props.updateAttributes({
                          badgeText: e.target.value
                        });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("label", { className: "mly-w-full mly-space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "mly-text-xs mly-font-normal mly-text-slate-400", children: "Sub Title" }),
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                    Input,
                    {
                      placeholder: "Add sub title here",
                      value: subTitle,
                      onChange: (e) => {
                        props.updateAttributes({
                          subTitle: e.target.value
                        });
                      }
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    }
  );
}

// src/editor/extensions/link-card.ts
var LinkCardExtension = import_core13.Node.create({
  name: "linkCard",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      mailyComponent: {
        default: "linkCard"
      },
      title: {
        default: ""
      },
      description: {
        default: ""
      },
      link: {
        default: ""
      },
      linkTitle: {
        default: ""
      },
      image: {
        default: ""
      },
      subTitle: {
        default: ""
      },
      badgeText: {
        default: ""
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `a[data-maily-component="${this.name}"]`
      }
    ];
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    return [
      "div",
      (0, import_core13.mergeAttributes)(
        {
          "data-maily-component": this.name
        },
        HTMLAttributes2
      )
    ];
  },
  addCommands() {
    return {
      setLinkCard: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {
            mailyComponent: this.name
          }
        });
      }
    };
  },
  addNodeView() {
    return (0, import_react45.ReactNodeViewRenderer)(LinkCardComponent, {
      className: "mly-relative"
    });
  }
});

// src/editor/nodes/button/button.tsx
var import_core14 = require("@tiptap/core");
var import_react49 = require("@tiptap/react");

// src/editor/nodes/button/button-view.tsx
var import_react47 = require("@tiptap/react");
var import_react48 = require("react");

// src/editor/nodes/button/button-label-input.tsx
var import_react46 = require("react");
var import_jsx_runtime49 = require("react/jsx-runtime");
function ButtonLabelInput(props) {
  var _a, _b;
  const { value, onValueChange, isVariable, editor } = props;
  const linkInputRef = (0, import_react46.useRef)(null);
  const [isEditing, setIsEditing] = (0, import_react46.useState)(!isVariable);
  const { placeholderUrl = DEFAULT_PLACEHOLDER_URL } = useMailyContext();
  const otps = useVariableOptions(editor);
  const variables = otps == null ? void 0 : otps.variables;
  const variableTriggerCharacter = (_b = (_a = otps == null ? void 0 : otps.suggestion) == null ? void 0 : _a.char) != null ? _b : DEFAULT_VARIABLE_TRIGGER_CHAR;
  const renderVariable = otps == null ? void 0 : otps.renderVariable;
  const autoCompleteOptions = (0, import_react46.useMemo)(() => {
    const withoutTrigger = value.replace(
      new RegExp(variableTriggerCharacter, "g"),
      ""
    );
    return processVariables(variables, {
      query: withoutTrigger || "",
      from: "bubble-variable",
      editor
    }).map((variable) => variable.name);
  }, [variables, value, editor]);
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "mly-isolate mly-flex mly-rounded-lg", children: [
    !isEditing && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
      "button",
      {
        onClick: () => {
          setIsEditing(true);
          setTimeout(() => {
            var _a2;
            (_a2 = linkInputRef.current) == null ? void 0 : _a2.focus();
          }, 0);
        },
        children: renderVariable({
          variable: {
            name: value,
            valid: true
          },
          fallback: "",
          from: "bubble-variable",
          editor
        })
      }
    ),
    isEditing && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
      InputAutocomplete,
      {
        editor,
        value,
        onValueChange: (value2) => {
          onValueChange == null ? void 0 : onValueChange(value2);
        },
        autoCompleteOptions,
        ref: linkInputRef,
        placeholder: placeholderUrl,
        className: "mly-h-7 mly-w-40 mly-rounded-md mly-px-2 mly-pr-6 mly-text-sm mly-text-midnight-gray hover:mly-bg-soft-gray focus:mly-bg-soft-gray focus:mly-outline-none",
        triggerChar: variableTriggerCharacter,
        onSelectOption: (value2) => {
          var _a2;
          const isVariable2 = (_a2 = autoCompleteOptions.includes(value2)) != null ? _a2 : false;
          if (isVariable2) {
            setIsEditing(false);
          }
          onValueChange == null ? void 0 : onValueChange(value2, isVariable2);
        }
      }
    )
  ] });
}

// src/editor/nodes/button/button-view.tsx
var import_jsx_runtime50 = require("react/jsx-runtime");
function ButtonView(props) {
  const { node, editor, getPos, updateAttributes: updateAttributes2 } = props;
  const {
    text: text2,
    isTextVariable,
    alignment,
    variant,
    borderRadius: _radius,
    buttonColor,
    textColor,
    url: externalLink,
    showIfKey = "",
    isUrlVariable,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft
  } = node.attrs;
  const opts = useVariableOptions(editor);
  const renderVariable = opts == null ? void 0 : opts.renderVariable;
  const sizes = (0, import_react48.useMemo)(
    () => ({
      small: {
        paddingX: 24,
        paddingY: 6
      },
      medium: {
        paddingX: 32,
        paddingY: 10
      },
      large: {
        paddingX: 40,
        paddingY: 14
      }
    }),
    []
  );
  const size = (0, import_react48.useMemo)(() => {
    var _a;
    return (_a = Object.entries(sizes).find(
      ([, { paddingX, paddingY }]) => paddingRight === paddingX && paddingTop === paddingY
    )) == null ? void 0 : _a[0];
  }, [paddingRight, paddingTop, sizes]);
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    import_react47.NodeViewWrapper,
    {
      draggable: editor.isEditable,
      "data-drag-handle": editor.isEditable,
      "data-type": "button",
      style: {
        textAlign: alignment
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(Popover, { open: props.selected && editor.isEditable, children: [
        /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
          "button",
          {
            className: cn(
              "mly-inline-flex mly-items-center mly-justify-center mly-rounded-md mly-text-sm mly-font-medium mly-ring-offset-white mly-transition-colors disabled:mly-pointer-events-none disabled:mly-opacity-50",
              "mly-font-semibold mly-no-underline",
              {
                "!mly-rounded-full": _radius === "round",
                "!mly-rounded-md": _radius === "smooth",
                "!mly-rounded-none": _radius === "sharp"
              }
            ),
            tabIndex: -1,
            style: {
              backgroundColor: variant === "filled" ? buttonColor : "transparent",
              color: textColor,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: buttonColor,
              // decrease the border color opacity to 80%
              // so that it's not too prominent
              "--button-var-border-color": `${textColor}80`,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft
            },
            onClick: (e) => {
              e.preventDefault();
              if (!editor.isEditable) {
                return;
              }
              const pos = getPos();
              editor.commands.setNodeSelection(pos);
            },
            children: isTextVariable ? renderVariable({
              variable: { name: text2, valid: true },
              fallback: text2,
              from: "button-variable",
              editor
            }) : text2
          }
        ) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
          PopoverContent,
          {
            align: "end",
            side: "top",
            className: "mly-w-max mly-rounded-lg !mly-p-0.5",
            sideOffset: 8,
            onOpenAutoFocus: (e) => e.preventDefault(),
            onCloseAutoFocus: (e) => e.preventDefault(),
            children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "mly-flex mly-items-stretch mly-text-midnight-gray", children: [
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                ButtonLabelInput,
                {
                  value: text2,
                  onValueChange: (value, isVariable) => {
                    updateAttributes2({
                      text: value,
                      isTextVariable: isVariable != null ? isVariable : false
                    });
                  },
                  isVariable: isTextVariable,
                  editor
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  Select,
                  {
                    label: "Border Radius",
                    value: _radius,
                    options: allowedButtonBorderRadius.map((value) => ({
                      value,
                      label: value
                    })),
                    onValueChange: (value) => {
                      updateAttributes2({
                        borderRadius: value
                      });
                    },
                    tooltip: "Border Radius",
                    className: "mly-capitalize"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  Select,
                  {
                    label: "Style",
                    value: variant,
                    options: allowedButtonVariant.map((value) => ({
                      value,
                      label: value
                    })),
                    onValueChange: (value) => {
                      updateAttributes2({
                        variant: value
                      });
                    },
                    tooltip: "Style",
                    className: "mly-capitalize"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  Select,
                  {
                    label: "Size",
                    value: size,
                    options: [
                      { value: "small", label: "Small" },
                      { value: "medium", label: "Medium" },
                      { value: "large", label: "Large" }
                    ],
                    onValueChange: (value) => {
                      const { paddingX, paddingY } = sizes[value];
                      updateAttributes2({
                        paddingTop: paddingY,
                        paddingRight: paddingX,
                        paddingBottom: paddingY,
                        paddingLeft: paddingX
                      });
                    },
                    tooltip: "Size"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  AlignmentSwitch,
                  {
                    alignment,
                    onAlignmentChange: (alignment2) => {
                      updateAttributes2({
                        alignment: alignment2
                      });
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  LinkInputPopover,
                  {
                    defaultValue: externalLink || "",
                    onValueChange: (value, isVariable) => {
                      updateAttributes2({
                        url: value,
                        isUrlVariable: isVariable != null ? isVariable : false
                      });
                    },
                    tooltip: "Update External Link",
                    editor,
                    isVariable: isUrlVariable
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "mly-flex mly-space-x-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  BackgroundColorPickerPopup,
                  {
                    variant,
                    color: buttonColor,
                    onChange: (color) => {
                      updateAttributes2({
                        buttonColor: color
                      });
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                  TextColorPickerPopup,
                  {
                    color: textColor,
                    onChange: (color) => {
                      updateAttributes2({
                        textColor: color
                      });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
                ShowPopover,
                {
                  showIfKey,
                  onShowIfKeyValueChange: (value) => {
                    updateAttributes2({
                      showIfKey: value
                    });
                  },
                  editor
                }
              )
            ] }) })
          }
        )
      ] })
    }
  );
}
function BackgroundColorPickerPopup(props) {
  const { color, onChange, variant } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    ColorPicker,
    {
      color,
      onColorChange: onChange,
      tooltip: "Background Color",
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
        BaseButton,
        {
          variant: "ghost",
          size: "sm",
          type: "button",
          className: "mly-size-7",
          children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
            "div",
            {
              className: "mly-h-4 mly-w-4 mly-shrink-0 mly-rounded-full mly-shadow",
              style: {
                backgroundColor: variant === "filled" ? color : "transparent",
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: variant === "filled" ? "white" : color
              }
            }
          )
        }
      )
    }
  );
}
function TextColorPickerPopup(props) {
  const { color, onChange } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(ColorPicker, { color, onColorChange: onChange, tooltip: "Text Color", children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    BaseButton,
    {
      variant: "ghost",
      size: "sm",
      type: "button",
      className: "mly-size-7",
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "mly-flex mly-flex-col mly-items-center mly-justify-center mly-gap-[1px]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "mly-font-bolder mly-font-mono mly-text-xs mly-text-midnight-gray", children: "A" }),
        /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
          "div",
          {
            className: "mly-h-[2px] mly-w-3 mly-shrink-0 mly-rounded-md mly-shadow",
            style: { backgroundColor: color }
          }
        )
      ] })
    }
  ) });
}

// src/editor/nodes/button/button.tsx
var DEFAULT_BUTTON_ALIGNMENT = "left";
var DEFAULT_BUTTON_VARIANT = "filled";
var DEFAULT_BUTTON_BORDER_RADIUS = "smooth";
var DEFAULT_BUTTON_BACKGROUND_COLOR = "#000000";
var DEFAULT_BUTTON_TEXT_COLOR = "#ffffff";
var DEFAULT_BUTTON_PADDING_TOP = 10;
var DEFAULT_BUTTON_PADDING_RIGHT = 32;
var DEFAULT_BUTTON_PADDING_BOTTOM = 10;
var DEFAULT_BUTTON_PADDING_LEFT = 32;
var allowedButtonVariant = ["filled", "outline"];
var allowedButtonBorderRadius = ["sharp", "smooth", "round"];
var ButtonExtension = import_core14.Node.create({
  name: "button",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      text: {
        default: "Button",
        parseHTML: (element) => {
          return element.getAttribute("data-text") || "";
        },
        renderHTML: (attributes) => {
          return {
            "data-text": attributes.text
          };
        }
      },
      isTextVariable: {
        default: false,
        parseHTML: (element) => {
          return element.getAttribute("data-is-text-variable") === "true";
        },
        renderHTML: (attributes) => {
          if (!attributes.isTextVariable) {
            return {};
          }
          return {
            "data-is-text-variable": "true"
          };
        }
      },
      url: {
        default: "",
        parseHTML: (element) => {
          return element.getAttribute("data-url") || "";
        },
        renderHTML: (attributes) => {
          return {
            "data-url": attributes.url
          };
        }
      },
      // Later we will remove this attribute
      // and use the `url` attribute instead when implement
      // the URL variable feature
      isUrlVariable: {
        default: false,
        parseHTML: (element) => {
          return element.getAttribute("data-is-url-variable") === "true";
        },
        renderHTML: (attributes) => {
          if (!attributes.isUrlVariable) {
            return {};
          }
          return {
            "data-is-url-variable": "true"
          };
        }
      },
      alignment: {
        default: DEFAULT_BUTTON_ALIGNMENT,
        parseHTML: (element) => {
          return element.getAttribute("data-alignment") || DEFAULT_BUTTON_ALIGNMENT;
        },
        renderHTML: (attributes) => {
          return {
            "data-alignment": attributes.alignment
          };
        }
      },
      variant: {
        default: DEFAULT_BUTTON_VARIANT,
        parseHTML: (element) => {
          return element.getAttribute("data-variant") || DEFAULT_BUTTON_VARIANT;
        },
        renderHTML: (attributes) => {
          return {
            "data-variant": attributes.variant
          };
        }
      },
      borderRadius: {
        default: DEFAULT_BUTTON_BORDER_RADIUS,
        parseHTML: (element) => {
          return element.getAttribute("data-border-radius") || DEFAULT_BUTTON_BORDER_RADIUS;
        },
        renderHTML: (attributes) => {
          return {
            "data-border-radius": attributes.borderRadius
          };
        }
      },
      buttonColor: {
        default: DEFAULT_BUTTON_BACKGROUND_COLOR,
        parseHTML: (element) => {
          return element.getAttribute("data-button-color") || DEFAULT_BUTTON_BACKGROUND_COLOR;
        },
        renderHTML: (attributes) => {
          return {
            "data-button-color": attributes.buttonColor
          };
        }
      },
      textColor: {
        default: DEFAULT_BUTTON_TEXT_COLOR,
        parseHTML: (element) => {
          return element.getAttribute("data-text-color") || DEFAULT_BUTTON_TEXT_COLOR;
        },
        renderHTML: (attributes) => {
          return {
            "data-text-color": attributes.textColor
          };
        }
      },
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      },
      paddingTop: {
        default: DEFAULT_BUTTON_PADDING_TOP,
        parseHTML: (element) => {
          return parseInt(
            element.getAttribute("data-padding-top") || DEFAULT_BUTTON_PADDING_TOP.toString(),
            10
          );
        },
        renderHTML: (attributes) => {
          return {
            "data-padding-top": attributes.paddingTop
          };
        }
      },
      paddingRight: {
        default: DEFAULT_BUTTON_PADDING_RIGHT,
        parseHTML: (element) => {
          return parseInt(
            element.getAttribute("data-padding-right") || DEFAULT_BUTTON_PADDING_RIGHT.toString(),
            10
          );
        },
        renderHTML: (attributes) => {
          return {
            "data-padding-right": attributes.paddingRight
          };
        }
      },
      paddingBottom: {
        default: DEFAULT_BUTTON_PADDING_BOTTOM,
        parseHTML: (element) => {
          return parseInt(
            element.getAttribute("data-padding-bottom") || DEFAULT_BUTTON_PADDING_BOTTOM.toString(),
            10
          );
        },
        renderHTML: (attributes) => {
          return {
            "data-padding-bottom": attributes.paddingBottom
          };
        }
      },
      paddingLeft: {
        default: DEFAULT_BUTTON_PADDING_LEFT,
        parseHTML: (element) => {
          return parseInt(
            element.getAttribute("data-padding-left") || DEFAULT_BUTTON_PADDING_LEFT.toString(),
            10
          );
        },
        renderHTML: (attributes) => {
          return {
            "data-padding-left": attributes.paddingLeft
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    return [
      "div",
      (0, import_core14.mergeAttributes)(HTMLAttributes2, {
        "data-type": this.name
      })
    ];
  },
  addCommands() {
    return {
      setButton: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {},
          content: []
        });
      },
      updateButton: (attrs) => updateAttributes(this.name, attrs)
    };
  },
  addNodeView() {
    return (0, import_react49.ReactNodeViewRenderer)(ButtonView, {
      contentDOMElementTag: "div",
      className: "mly-relative"
    });
  }
});

// src/editor/nodes/image/image.ts
var import_extension_image2 = __toESM(require("@tiptap/extension-image"), 1);
var import_react50 = require("@tiptap/react");
var DEFAULT_IMAGE_BORDER_RADIUS = 0;
var ImageExtension = import_extension_image2.default.extend({
  addAttributes() {
    var _a;
    return __spreadProps(__spreadValues({}, (_a = this.parent) == null ? void 0 : _a.call(this)), {
      width: {
        default: "auto",
        parseHTML: (element) => {
          var _a2, _b, _c;
          return element.getAttribute("width") || ((_c = ((_a2 = element.style) == null ? void 0 : _a2.width) || ((_b = element.style) == null ? void 0 : _b.inlineSize)) == null ? void 0 : _c.replace(
            "px",
            ""
          )) || null;
        },
        renderHTML: ({ width }) => ({ width })
      },
      height: {
        default: "auto",
        parseHTML: (element) => {
          var _a2, _b, _c;
          return element.getAttribute("height") || ((_c = ((_a2 = element.style) == null ? void 0 : _a2.height) || ((_b = element.style) == null ? void 0 : _b.blockSize)) == null ? void 0 : _c.replace(
            "px",
            ""
          )) || null;
        },
        renderHTML: ({ height }) => ({ height })
      },
      alignment: {
        default: "center",
        renderHTML: ({ alignment }) => ({ "data-alignment": alignment }),
        parseHTML: (element) => element.getAttribute("data-alignment") || "center"
      },
      externalLink: {
        default: null,
        renderHTML: ({ externalLink }) => {
          if (!externalLink) {
            return {};
          }
          return {
            "data-external-link": externalLink
          };
        },
        parseHTML: (element) => {
          const externalLink = element.getAttribute("data-external-link");
          return externalLink ? { externalLink } : null;
        }
      },
      // Later we will remove this attribute
      // and use the `externalLink` attribute instead
      // when implement the URL variable feature
      isExternalLinkVariable: {
        default: false,
        parseHTML: (element) => {
          return element.getAttribute("data-is-external-link-variable") === "true";
        },
        renderHTML: (attributes) => {
          if (!attributes.isExternalLinkVariable) {
            return {};
          }
          return {
            "data-is-external-link-variable": "true"
          };
        }
      },
      borderRadius: {
        default: DEFAULT_IMAGE_BORDER_RADIUS,
        parseHTML: (element) => {
          return Number(element.getAttribute("data-border-radius"));
        },
        renderHTML: (attributes) => {
          return {
            "data-border-radius": attributes.borderRadius
          };
        }
      },
      // Later we will remove this attribute
      // and use the `src` attribute instead when implement
      // the URL variable feature
      isSrcVariable: {
        default: false,
        parseHTML: (element) => {
          return element.getAttribute("data-is-src-variable") === "true";
        },
        renderHTML: (attributes) => {
          if (!attributes.isSrcVariable) {
            return {};
          }
          return {
            "data-is-src-variable": "true"
          };
        }
      },
      aspectRatio: {
        default: null,
        parseHTML: (element) => {
          return element.getAttribute("data-aspect-ratio") || null;
        },
        renderHTML: (attributes) => {
          if (!(attributes == null ? void 0 : attributes.aspectRatio)) {
            return {};
          }
          return {
            "data-aspect-ratio": attributes == null ? void 0 : attributes.aspectRatio
          };
        }
      },
      lockAspectRatio: {
        default: true,
        parseHTML: (element) => {
          return element.getAttribute("data-lock-aspect-ratio") === "true";
        },
        renderHTML: (attributes) => {
          if (!attributes.lockAspectRatio) {
            return {};
          }
          return {
            "data-lock-aspect-ratio": "true"
          };
        }
      },
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    });
  },
  addNodeView() {
    return (0, import_react50.ReactNodeViewRenderer)(ImageView, {
      className: "mly-relative"
    });
  }
});

// src/editor/nodes/html/html.tsx
var import_extension_code_block_lowlight = __toESM(require("@tiptap/extension-code-block-lowlight"), 1);
var import_state7 = require("@tiptap/pm/state");
var import_react60 = require("@tiptap/react");
var import_xml = __toESM(require("highlight.js/lib/languages/xml"), 1);
var import_lowlight = require("lowlight");

// src/editor/nodes/html/html-view.tsx
var import_react51 = require("@tiptap/react");
var import_react52 = require("react");
var import_jsx_runtime51 = require("react/jsx-runtime");
function HTMLCodeBlockView(props) {
  const { node, updateAttributes: updateAttributes2 } = props;
  let { language, activeTab = "code" } = node.attrs;
  activeTab || (activeTab = "code");
  const languageClass = language ? `language-${language}` : "";
  const html2 = (0, import_react52.useMemo)(() => {
    const text2 = node.content.content.reduce((acc, cur) => {
      if (cur.type.name === "text") {
        return acc + cur.text;
      } else if (cur.type.name === "variable") {
        const { id: variable, fallback } = (cur == null ? void 0 : cur.attrs) || {};
        const formattedVariable = fallback ? `{{${variable},fallback=${fallback}}}` : `{{${variable}}}`;
        return acc + formattedVariable;
      }
      return acc;
    }, "");
    const htmlParser = new DOMParser();
    const htmlDoc = htmlParser.parseFromString(text2, "text/html");
    const style = htmlDoc.querySelectorAll("style");
    const body = htmlDoc.body;
    const combinedStyle = Array.from(style).map((s) => s.innerHTML).join("\n");
    return `<style>${combinedStyle}</style>${body.innerHTML}`;
  }, [activeTab]);
  const isEmpty = html2 === "";
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(
    import_react51.NodeViewWrapper,
    {
      draggable: false,
      "data-drag-handle": false,
      "data-type": "htmlCodeBlock",
      children: [
        activeTab === "code" && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("pre", { className: "mly-my-0 mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-2 mly-text-black", children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
          import_react51.NodeViewContent,
          {
            as: "code",
            className: cn("is-editable", languageClass)
          }
        ) }),
        activeTab === "preview" && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
          "div",
          {
            className: cn(
              "mly-not-prose mly-rounded-lg mly-border mly-border-gray-200 mly-p-2",
              isEmpty && "mly-min-h-[42px]"
            ),
            ref: (node2) => {
              if (!node2 || (node2 == null ? void 0 : node2.shadowRoot)) {
                return;
              }
              const shadow = node2.attachShadow({ mode: "open" });
              const sheet = new CSSStyleSheet();
              sheet.replaceSync(`
              * { font-family: 'Inter', sans-serif; }
              blockquote, h1, h2, h3, img, li, ol, p, ul {
                margin-top: 0;
                margin-bottom: 0;
              }
            `);
              shadow.adoptedStyleSheets = [sheet];
              const container = document.createElement("div");
              container.innerHTML = html2;
              shadow.appendChild(container);
            },
            contentEditable: false,
            onClick: () => {
              if (!isEmpty) {
                return;
              }
              updateAttributes2({
                activeTab: "code"
              });
            }
          }
        )
      ]
    }
  );
}

// src/editor/extensions/color.ts
var import_extension_color = __toESM(require("@tiptap/extension-color"), 1);
var Color = import_extension_color.default.extend({
  addStorage() {
    return {
      colors: /* @__PURE__ */ new Set()
    };
  }
});

// src/editor/extensions/maily-kit.tsx
var import_core17 = require("@tiptap/core");
var import_starter_kit = __toESM(require("@tiptap/starter-kit"), 1);
var import_extension_list_item = __toESM(require("@tiptap/extension-list-item"), 1);
var import_extension_paragraph2 = __toESM(require("@tiptap/extension-paragraph"), 1);
var import_extension_text_align = __toESM(require("@tiptap/extension-text-align"), 1);
var import_extension_text_style = __toESM(require("@tiptap/extension-text-style"), 1);
var import_extension_heading2 = __toESM(require("@tiptap/extension-heading"), 1);
var import_extension_underline = __toESM(require("@tiptap/extension-underline"), 1);
var import_extension_document = __toESM(require("@tiptap/extension-document"), 1);
var import_extension_focus = __toESM(require("@tiptap/extension-focus"), 1);
var import_extension_dropcursor = __toESM(require("@tiptap/extension-dropcursor"), 1);

// src/editor/nodes/footer.ts
var import_core15 = require("@tiptap/core");
var Footer = import_core15.Node.create({
  name: "footer",
  group: "block",
  content: "inline*",
  addAttributes() {
    return {
      "maily-component": {
        default: "footer",
        renderHTML: (attributes) => {
          return {
            "data-maily-component": attributes["maily-component"]
          };
        },
        parseHTML: (element) => element == null ? void 0 : element.getAttribute("data-maily-component")
      }
    };
  },
  addCommands() {
    return {
      setFooter: () => ({ commands }) => {
        return commands.setNode(this.name);
      }
    };
  },
  parseHTML() {
    return [{ tag: 'small[data-maily-component="footer"]' }];
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    return [
      "small",
      (0, import_core15.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes2, {
        class: "footer mly-block mly-text-[13px] mly-text-slate-500 mly-relative"
      }),
      0
    ];
  }
});

// src/editor/nodes/link.ts
var import_extension_link = __toESM(require("@tiptap/extension-link"), 1);
var LinkExtension = import_extension_link.default.extend({
  addAttributes() {
    var _a;
    return __spreadProps(__spreadValues({}, (_a = this.parent) == null ? void 0 : _a.call(this)), {
      isUrlVariable: {
        default: false
      }
    });
  },
  addCommands() {
    var _a;
    return __spreadProps(__spreadValues({}, (_a = this.parent) == null ? void 0 : _a.call(this)), {
      setIsUrlVariable: (isUrlVariable) => ({ chain }) => {
        return chain().setMark("link", { isUrlVariable }).run();
      }
    });
  }
});

// src/editor/nodes/heading/heading.ts
var import_extension_heading = __toESM(require("@tiptap/extension-heading"), 1);
var HeadingExtension = import_extension_heading.default.extend({
  addAttributes() {
    var _a;
    return __spreadProps(__spreadValues({}, ((_a = this == null ? void 0 : this.parent) == null ? void 0 : _a.call(this)) || {}), {
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    });
  }
});

// src/editor/nodes/paragraph/paragraph.ts
var import_extension_paragraph = __toESM(require("@tiptap/extension-paragraph"), 1);
var ParagraphExtension = import_extension_paragraph.default.extend({
  addAttributes() {
    var _a;
    return __spreadProps(__spreadValues({}, ((_a = this == null ? void 0 : this.parent) == null ? void 0 : _a.call(this)) || {}), {
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    });
  }
});

// src/editor/nodes/repeat/repeat.ts
var import_core16 = require("@tiptap/core");
var import_react54 = require("@tiptap/react");

// src/editor/nodes/repeat/repeat-view.tsx
var import_react53 = require("@tiptap/react");
var import_lucide_react27 = require("lucide-react");
var import_jsx_runtime52 = require("react/jsx-runtime");
function RepeatView(props) {
  const { editor, getPos } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(
    import_react53.NodeViewWrapper,
    {
      "data-type": "repeat",
      draggable: editor.isEditable,
      "data-drag-handle": editor.isEditable,
      className: "mly-relative",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react53.NodeViewContent, { className: "is-editable" }),
        /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(
          "div",
          {
            role: "button",
            "data-repeat-indicator": "",
            className: "mly-absolute mly-inset-y-0 mly-right-0 mly-flex mly-translate-x-full mly-cursor-pointer mly-flex-col mly-items-center mly-gap-1 mly-opacity-60",
            contentEditable: false,
            onClick: () => {
              editor.commands.setNodeSelection(getPos());
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_lucide_react27.Repeat2, { className: "mly-size-3 mly-stroke-[2.5] mly-text-midnight-gray" }),
              /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("div", { className: "mly-w-[1.5px] mly-grow mly-rounded-full mly-bg-rose-300" })
            ]
          }
        )
      ]
    }
  );
}

// src/editor/nodes/repeat/repeat.ts
var RepeatExtension = import_core16.Node.create({
  name: "repeat",
  group: "block",
  content: "(block|columns)+",
  draggable: true,
  isolating: true,
  addAttributes() {
    return {
      each: {
        default: "items",
        parseHTML: (element) => {
          return element.getAttribute("each") || "";
        },
        renderHTML: (attributes) => {
          if (!attributes.each) {
            return {};
          }
          return {
            each: attributes.each
          };
        }
      },
      isUpdatingKey: {
        default: false
      },
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ HTMLAttributes: HTMLAttributes2 }) {
    return [
      "div",
      (0, import_core16.mergeAttributes)(HTMLAttributes2, {
        "data-type": this.name
      }),
      0
    ];
  },
  addCommands() {
    return {
      setRepeat: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {},
          content: [
            {
              type: "paragraph"
            }
          ]
        });
      },
      updateRepeat: (attrs) => updateAttributes(this.name, attrs)
    };
  },
  addNodeView() {
    return (0, import_react54.ReactNodeViewRenderer)(RepeatView, {
      contentDOMElementTag: "div",
      className: "mly-relative"
    });
  }
});

// src/editor/extensions/maily-kit.tsx
var MailyKit = import_core17.Extension.create({
  name: "maily-kit",
  addOptions() {
    return {
      link: {
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
          class: "mly-no-underline"
        },
        openOnClick: false
      }
    };
  },
  addExtensions() {
    const extensions2 = [
      import_extension_document.default.extend({
        content: "(block|columns)+"
      }),
      import_starter_kit.default.configure({
        code: {
          HTMLAttributes: {
            class: "mly-px-1 mly-relative mly-py-0.5 mly-bg-[#efefef] mly-text-sm mly-rounded-md mly-tracking-normal mly-font-normal"
          }
        },
        blockquote: {
          HTMLAttributes: {
            class: "mly-not-prose mly-border-l-4 mly-border-gray-300 mly-pl-4 mly-mt-4 mly-mb-4 mly-relative"
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: "mly-relative"
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: "mly-relative"
          }
        },
        heading: false,
        paragraph: false,
        horizontalRule: false,
        dropcursor: false,
        document: false
      }),
      import_extension_underline.default,
      Color.configure({ types: [import_extension_text_style.default.name, import_extension_list_item.default.name] }),
      import_extension_text_style.default.configure(),
      import_extension_text_align.default.configure({
        types: [import_extension_paragraph2.default.name, import_extension_heading2.default.name, Footer.name]
      }),
      HorizontalRule,
      Footer,
      import_extension_focus.default,
      import_extension_dropcursor.default.configure({
        color: "#555",
        width: 3,
        class: "ProseMirror-dropcursor"
      }),
      HeadingExtension.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "mly-relative"
        }
      }),
      ParagraphExtension.configure({
        HTMLAttributes: {
          class: "mly-relative"
        }
      })
    ];
    if (this.options.linkCard !== false) {
      extensions2.push(LinkCardExtension.configure(this.options.linkCard));
    }
    if (this.options.repeat !== false) {
      extensions2.push(RepeatExtension);
    }
    if (this.options.section !== false) {
      extensions2.push(SectionExtension);
    }
    if (this.options.columns !== false) {
      extensions2.push(ColumnsExtension);
    }
    if (this.options.column !== false) {
      extensions2.push(ColumnExtension);
    }
    if (this.options.button !== false) {
      extensions2.push(ButtonExtension);
    }
    if (this.options.spacer !== false) {
      extensions2.push(Spacer);
    }
    if (this.options.logo !== false) {
      extensions2.push(LogoExtension);
    }
    if (this.options.image !== false) {
      extensions2.push(ImageExtension);
    }
    if (this.options.link !== false) {
      extensions2.push(LinkExtension.configure(this.options.link));
    }
    return extensions2;
  }
});

// src/editor/extensions/placeholder.ts
var import_extension_placeholder = __toESM(require("@tiptap/extension-placeholder"), 1);
var PlaceholderExtension = import_extension_placeholder.default.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return `Heading ${node.attrs.level}`;
    } else if (node.type.name === "htmlCodeBlock") {
      return "Type your HTML code...";
    } else if (["columns", "column", "section", "repeat", "show", "blockquote"].includes(
      node.type.name
    )) {
      return "";
    }
    return "Write something or / to see commands";
  },
  includeChildren: true
});

// src/editor/extensions/slash-command/slash-command.ts
var import_core18 = require("@tiptap/core");
var import_suggestion2 = __toESM(require("@tiptap/suggestion"), 1);
var SlashCommandExtension = import_core18.Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        }
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      (0, import_suggestion2.default)(__spreadValues({
        editor: this.editor
      }, this.options.suggestion))
    ];
  }
});

// src/editor/extensions/slash-command/slash-command-view.tsx
var import_react56 = require("@tiptap/react");
var import_react57 = require("react");
var import_tippy8 = __toESM(require("tippy.js"), 1);

// src/editor/extensions/slash-command/slash-command-item.tsx
var import_lucide_react28 = require("lucide-react");
var import_react55 = require("react");
var import_jsx_runtime53 = require("react/jsx-runtime");
function SlashCommandItem(props) {
  var _a;
  const {
    item,
    groupIndex,
    commandIndex,
    selectedGroupIndex,
    selectedCommandIndex,
    editor,
    activeCommandRef,
    selectItem,
    hoveredItemKey,
    onHover
  } = props;
  const [open, setOpen] = (0, import_react55.useState)(false);
  const isActive = groupIndex === selectedGroupIndex && commandIndex === selectedCommandIndex;
  const itemKey = `${groupIndex}-${commandIndex}`;
  const isHovered = hoveredItemKey === itemKey;
  const isSubCommand = item && "commands" in item;
  const shouldOpenTooltip = !!(item == null ? void 0 : item.preview) && (isHovered || isActive && !hoveredItemKey);
  const hasRenderFunction = typeof item.render === "function";
  const renderFunctionValue = hasRenderFunction ? (_a = item.render) == null ? void 0 : _a.call(item, editor) : null;
  let value = /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(import_jsx_runtime53.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { className: "mly-flex mly-h-6 mly-w-6 mly-shrink-0 mly-items-center mly-justify-center", children: item.icon }),
    /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { className: "mly-grow", children: [
      /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("p", { className: "mly-font-medium", children: item.title }),
      /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("p", { className: "mly-text-xs mly-text-gray-400", children: item.description })
    ] }),
    isSubCommand && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { className: "mly-block mly-px-1 mly-text-gray-400", children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_lucide_react28.ChevronRightIcon, { className: "mly-size-3.5 mly-stroke-[2.5]" }) })
  ] });
  if (renderFunctionValue !== null && renderFunctionValue !== true) {
    value = renderFunctionValue;
  }
  const openTimerRef = (0, import_react55.useRef)(0);
  const handleDelayedOpen = (0, import_react55.useCallback)(() => {
    window.clearTimeout(openTimerRef.current);
    const delay = 200;
    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
      openTimerRef.current = 0;
    }, delay);
  }, [setOpen]);
  (0, import_react55.useEffect)(() => {
    if (shouldOpenTooltip) {
      handleDelayedOpen();
    } else {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = 0;
      setOpen(false);
    }
  }, [shouldOpenTooltip]);
  (0, import_react55.useEffect)(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(Tooltip, { open, children: [
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
      "button",
      {
        className: cn(
          "mly-flex mly-w-full mly-items-center mly-gap-2 mly-rounded-md mly-px-2 mly-py-1 mly-text-left mly-text-sm mly-text-gray-900 hover:mly-bg-gray-100 hover:mly-text-gray-900",
          isActive ? "mly-bg-gray-100 mly-text-gray-900" : "mly-bg-transparent"
        ),
        onClick: () => selectItem(groupIndex, commandIndex),
        onMouseEnter: () => onHover(true),
        onMouseLeave: () => onHover(false),
        type: "button",
        ref: isActive ? activeCommandRef : null,
        children: value
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
      TooltipContent,
      {
        side: "right",
        sideOffset: 10,
        className: "mly-w-52 mly-rounded-lg mly-border-none mly-p-1 mly-shadow",
        children: typeof item.preview === "function" ? item == null ? void 0 : item.preview(editor) : /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(import_jsx_runtime53.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("figure", { className: "mly-relative mly-aspect-[2.5] mly-w-full mly-overflow-hidden mly-rounded-md mly-border mly-border-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
            "img",
            {
              src: item == null ? void 0 : item.preview,
              alt: item == null ? void 0 : item.title,
              className: "mly-absolute mly-inset-0 mly-h-full mly-w-full mly-object-cover"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("p", { className: "mly-mt-2 mly-px-0.5 mly-text-gray-500", children: item.description })
        ] })
      }
    )
  ] }, `${groupIndex}-${commandIndex}`);
}

// src/editor/extensions/slash-command/slash-command-view.tsx
var import_jsx_runtime54 = require("react/jsx-runtime");
var CommandList = (0, import_react57.forwardRef)(function CommandList2(props, ref) {
  const { items: groups, command, editor, range, query } = props;
  const [selectedGroupIndex, setSelectedGroupIndex] = (0, import_react57.useState)(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = (0, import_react57.useState)(0);
  const [hoveredItemKey, setHoveredItemKey] = (0, import_react57.useState)(null);
  const prevQuery = (0, import_react57.useRef)("");
  const prevSelectedGroupIndex = (0, import_react57.useRef)(0);
  const prevSelectedCommandIndex = (0, import_react57.useRef)(0);
  const selectItem = (0, import_react57.useCallback)(
    (groupIndex, commandIndex) => {
      const item = groups[groupIndex].commands[commandIndex];
      if (!item) {
        return;
      }
      command(item);
    },
    [command]
  );
  (0, import_react57.useImperativeHandle)(ref, () => ({
    onKeyDown: ({ event }) => {
      var _a, _b, _c, _d;
      const navigationKeys = [
        "ArrowUp",
        "ArrowDown",
        "Enter",
        "ArrowLeft",
        "ArrowRight"
      ];
      if (navigationKeys.includes(event.key)) {
        let newCommandIndex = selectedCommandIndex;
        let newGroupIndex = selectedGroupIndex;
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            const group = groups == null ? void 0 : groups[selectedGroupIndex];
            const isInsideSubCommand = group && "id" in group;
            if (!isInsideSubCommand) {
              return false;
            }
            editor.chain().focus().insertContentAt(range, `/${prevQuery.current}`).run();
            setTimeout(() => {
              setSelectedGroupIndex(prevSelectedGroupIndex.current);
              setSelectedCommandIndex(prevSelectedCommandIndex.current);
            }, 0);
            return true;
          case "ArrowRight":
            event.preventDefault();
            const command2 = (_b = (_a = groups == null ? void 0 : groups[selectedGroupIndex]) == null ? void 0 : _a.commands) == null ? void 0 : _b[selectedCommandIndex];
            const isSelectingSubCommand = command2 && "commands" in command2;
            if (!isSelectingSubCommand) {
              return false;
            }
            selectItem(selectedGroupIndex, selectedCommandIndex);
            prevQuery.current = query;
            prevSelectedGroupIndex.current = selectedGroupIndex;
            prevSelectedCommandIndex.current = selectedCommandIndex;
            return true;
          case "Enter":
            if (!groups.length) {
              return false;
            }
            selectItem(selectedGroupIndex, selectedCommandIndex);
            prevQuery.current = query;
            prevSelectedGroupIndex.current = selectedGroupIndex;
            prevSelectedCommandIndex.current = selectedCommandIndex;
            return true;
          case "ArrowUp":
            if (!groups.length) {
              return false;
            }
            newCommandIndex = selectedCommandIndex - 1;
            newGroupIndex = selectedGroupIndex;
            if (newCommandIndex < 0) {
              newGroupIndex = selectedGroupIndex - 1;
              newCommandIndex = ((_c = groups[newGroupIndex]) == null ? void 0 : _c.commands.length) - 1 || 0;
            }
            if (newGroupIndex < 0) {
              newGroupIndex = groups.length - 1;
              newCommandIndex = ((_d = groups[newGroupIndex]) == null ? void 0 : _d.commands.length) - 1 || 0;
            }
            setSelectedGroupIndex(newGroupIndex);
            setSelectedCommandIndex(newCommandIndex);
            return true;
          case "ArrowDown":
            if (!groups.length) {
              return false;
            }
            const commands = groups[selectedGroupIndex].commands;
            newCommandIndex = selectedCommandIndex + 1;
            newGroupIndex = selectedGroupIndex;
            if (commands.length - 1 < newCommandIndex) {
              newCommandIndex = 0;
              newGroupIndex = selectedGroupIndex + 1;
            }
            if (groups.length - 1 < newGroupIndex) {
              newGroupIndex = 0;
            }
            setSelectedGroupIndex(newGroupIndex);
            setSelectedCommandIndex(newCommandIndex);
            return true;
          default:
            return false;
        }
      }
    }
  }));
  const commandListContainer = (0, import_react57.useRef)(null);
  const activeCommandRef = (0, import_react57.useRef)(null);
  (0, import_react57.useLayoutEffect)(() => {
    const container = commandListContainer == null ? void 0 : commandListContainer.current;
    const activeCommandContainer = activeCommandRef == null ? void 0 : activeCommandRef.current;
    if (!container || !activeCommandContainer) {
      return;
    }
    const { offsetTop, offsetHeight } = activeCommandContainer;
    container.style.transition = "none";
    container.scrollTop = offsetTop - offsetHeight;
  }, [
    selectedGroupIndex,
    selectedCommandIndex,
    commandListContainer,
    activeCommandRef
  ]);
  (0, import_react57.useEffect)(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [groups]);
  (0, import_react57.useEffect)(() => {
    return () => {
      prevQuery.current = "";
      prevSelectedGroupIndex.current = 0;
      prevSelectedCommandIndex.current = 0;
    };
  }, []);
  return groups.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "mly-z-50 mly-w-72 mly-overflow-hidden mly-rounded-md mly-border mly-border-gray-200 mly-bg-white mly-shadow-md mly-transition-all", children: [
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
      "div",
      {
        id: "slash-command",
        ref: commandListContainer,
        className: "mly-no-scrollbar mly-h-auto mly-max-h-[330px] mly-overflow-y-auto",
        children: groups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_react57.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
            "span",
            {
              className: cn(
                "mly-block mly-border-b mly-border-gray-200 mly-bg-soft-gray mly-p-2 mly-text-xs mly-uppercase mly-text-gray-400",
                groupIndex > 0 ? "mly-border-t" : ""
              ),
              children: group.title
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "mly-space-y-0.5 mly-p-1", children: group.commands.map((item, commandIndex) => {
            const itemKey = `${groupIndex}-${commandIndex}`;
            return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
              SlashCommandItem,
              {
                item,
                groupIndex,
                commandIndex,
                selectedGroupIndex,
                selectedCommandIndex,
                selectItem: () => selectItem(groupIndex, commandIndex),
                editor,
                activeCommandRef,
                hoveredItemKey,
                onHover: (isHovered) => setHoveredItemKey(isHovered ? itemKey : null)
              },
              itemKey
            );
          }) })
        ] }, groupIndex))
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "mly-border-t mly-border-gray-200 mly-px-1 mly-py-3 mly-pl-4", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "mly-flex mly-items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("p", { className: "mly-text-center mly-text-xs mly-text-gray-400", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("kbd", { className: "mly-rounded mly-border mly-border-gray-200 mly-p-1 mly-px-2 mly-font-medium", children: "\u2191" }),
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("kbd", { className: "mly-ml-1 mly-rounded mly-border mly-border-gray-200 mly-p-1 mly-px-2 mly-font-medium", children: "\u2193" }),
        " ",
        "to navigate"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { "aria-hidden": "true", className: "mly-select-none mly-px-1", children: "\xB7" }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("p", { className: "mly-text-center mly-text-xs mly-text-gray-400", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("kbd", { className: "mly-rounded mly-border mly-border-gray-200 mly-p-1 mly-px-1.5 mly-font-medium", children: "Enter" }),
        " ",
        "to select"
      ] })
    ] }) })
  ] }) }) : null;
});
function getSlashCommandSuggestions(groups = DEFAULT_SLASH_COMMANDS) {
  return {
    items: ({ query, editor }) => {
      var _a;
      let newGroups = groups;
      let search = query.toLowerCase();
      const subCommandIds = newGroups.map((group) => {
        return group.commands.filter((item) => "commands" in item).map((item) => item == null ? void 0 : item.id.toLowerCase());
      }).flat().map((id) => `${id}.`);
      const shouldEnterSubCommand = subCommandIds.some(
        (id) => search.startsWith(id)
      );
      if (shouldEnterSubCommand) {
        const subCommandId = subCommandIds.find((id) => search.startsWith(id));
        const sanitizedSubCommandId = subCommandId == null ? void 0 : subCommandId.slice(0, -1);
        const group = (_a = newGroups.find((group2) => {
          return group2.commands.some(
            // @ts-ignore
            (item) => {
              var _a2;
              return ((_a2 = item == null ? void 0 : item.id) == null ? void 0 : _a2.toLowerCase()) === sanitizedSubCommandId;
            }
          );
        })) == null ? void 0 : _a.commands.find(
          // @ts-ignore
          (item) => {
            var _a2;
            return ((_a2 = item == null ? void 0 : item.id) == null ? void 0 : _a2.toLowerCase()) === sanitizedSubCommandId;
          }
        );
        if (!group) {
          return groups;
        }
        search = search.replace(subCommandId || "", "");
        newGroups = [
          __spreadProps(__spreadValues({}, group), {
            commands: (group == null ? void 0 : group.commands) || []
          })
        ];
      }
      const filteredGroups = newGroups.map((group) => {
        return __spreadProps(__spreadValues({}, group), {
          commands: group.commands.filter((item) => {
            var _a2;
            if (typeof query === "string" && query.length > 0) {
              const show = (_a2 = item == null ? void 0 : item.render) == null ? void 0 : _a2.call(item, editor);
              if (show === null) {
                return false;
              }
              return item.title.toLowerCase().includes(search) || (item == null ? void 0 : item.description) && (item == null ? void 0 : item.description.toLowerCase().includes(search)) || item.searchTerms && item.searchTerms.some(
                (term) => term.includes(search)
              );
            }
            return true;
          }).map((item) => {
            const isSubCommandItem = "commands" in item;
            if (isSubCommandItem) {
              item = __spreadProps(__spreadValues({}, item), {
                command: (options) => {
                  const { editor: editor2, range } = options;
                  editor2.chain().focus().insertContentAt(range, `/${item.id}.`).run();
                }
              });
            }
            return item;
          })
        });
      }).filter((group) => group.commands.length > 0);
      return filteredGroups;
    },
    allow: ({ editor }) => {
      const isInsideHTMLCodeBlock = editor.isActive("htmlCodeBlock");
      if (isInsideHTMLCodeBlock) {
        return false;
      }
      return true;
    },
    render: () => {
      let component;
      let popup = null;
      return {
        onStart: (props) => {
          component = new import_react56.ReactRenderer(CommandList, {
            props,
            editor: props.editor
          });
          popup = (0, import_tippy8.default)("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "top-start"
          });
        },
        onUpdate: (props) => {
          var _a;
          const currentPopup = popup == null ? void 0 : popup[0];
          if (!currentPopup || ((_a = currentPopup == null ? void 0 : currentPopup.state) == null ? void 0 : _a.isDestroyed)) {
            return;
          }
          component == null ? void 0 : component.updateProps(props);
          currentPopup.setProps({
            getReferenceClientRect: props.clientRect
          });
        },
        onKeyDown: (props) => {
          var _a, _b;
          if (props.event.key === "Escape") {
            const currentPopup = popup == null ? void 0 : popup[0];
            if (!((_a = currentPopup == null ? void 0 : currentPopup.state) == null ? void 0 : _a.isDestroyed)) {
              currentPopup == null ? void 0 : currentPopup.destroy();
            }
            component == null ? void 0 : component.destroy();
            return true;
          }
          return (_b = component == null ? void 0 : component.ref) == null ? void 0 : _b.onKeyDown(props);
        },
        onExit: () => {
          if (!popup || !(popup == null ? void 0 : popup[0]) || !component) {
            return;
          }
          const currentPopup = popup == null ? void 0 : popup[0];
          if (!currentPopup.state.isDestroyed) {
            currentPopup.destroy();
          }
          component == null ? void 0 : component.destroy();
        }
      };
    }
  };
}

// src/editor/nodes/variable/variable-suggestions.tsx
var import_react58 = require("@tiptap/react");
var import_react59 = require("react");
var import_tippy9 = __toESM(require("tippy.js"), 1);
var import_jsx_runtime55 = require("react/jsx-runtime");
var VariableList = (0, import_react59.forwardRef)((props, ref) => {
  var _a;
  const { items = [], editor } = props;
  const popoverRef = (0, import_react59.useRef)(null);
  const VariableSuggestionPopoverComponent = (_a = useVariableOptions(editor)) == null ? void 0 : _a.variableSuggestionsPopover;
  (0, import_react59.useImperativeHandle)(ref, () => ({
    onKeyDown: ({ event }) => {
      if (!popoverRef.current) {
        return false;
      }
      const { moveUp, moveDown, select } = popoverRef.current || {};
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
        return true;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
        return true;
      }
      if (event.key === "Enter") {
        select();
        return true;
      }
      return false;
    }
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
    VariableSuggestionPopoverComponent,
    {
      items,
      onSelectItem: (value) => {
        var _a2;
        props.command({
          id: value.name,
          required: (_a2 = value.required) != null ? _a2 : true
        });
      },
      ref: popoverRef
    }
  );
});
VariableList.displayName = "VariableList";
function getVariableSuggestions(char = DEFAULT_VARIABLE_TRIGGER_CHAR) {
  return {
    char,
    items: ({ query, editor }) => {
      var _a;
      const variables = (_a = getVariableOptions(editor)) == null ? void 0 : _a.variables;
      return processVariables(variables, {
        query,
        editor,
        from: "content-variable"
      });
    },
    render: () => {
      let component;
      let popup = null;
      return {
        onStart: (props) => {
          component = new import_react58.ReactRenderer(VariableList, {
            props,
            editor: props.editor
          });
          if (!props.clientRect) {
            return;
          }
          popup = (0, import_tippy9.default)("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start"
          });
        },
        onUpdate(props) {
          var _a;
          component.updateProps(props);
          if (!props.clientRect) {
            return;
          }
          (_a = popup == null ? void 0 : popup[0]) == null ? void 0 : _a.setProps({
            getReferenceClientRect: props.clientRect
          });
        },
        onKeyDown(props) {
          var _a;
          if (props.event.key === "Escape") {
            popup == null ? void 0 : popup[0].hide();
            return true;
          }
          return (_a = component.ref) == null ? void 0 : _a.onKeyDown(props);
        },
        onExit() {
          if (!popup || !(popup == null ? void 0 : popup[0]) || !component) {
            return;
          }
          popup == null ? void 0 : popup[0].destroy();
          component.destroy();
        }
      };
    }
  };
}

// src/editor/nodes/html/html.tsx
var lowlight = (0, import_lowlight.createLowlight)(import_lowlight.common);
lowlight.register("html", import_xml.default);
var HTMLCodeBlockExtension = import_extension_code_block_lowlight.default.extend({
  name: "htmlCodeBlock",
  content: "(text|variable)*",
  addAttributes() {
    var _a;
    return __spreadProps(__spreadValues({}, (_a = this.parent) == null ? void 0 : _a.call(this)), {
      activeTab: "code",
      showIfKey: {
        default: DEFAULT_SECTION_SHOW_IF_KEY,
        parseHTML: (element) => {
          return element.getAttribute("data-show-if-key") || DEFAULT_SECTION_SHOW_IF_KEY;
        },
        renderHTML(attributes) {
          if (!attributes.showIfKey) {
            return {};
          }
          return {
            "data-show-if-key": attributes.showIfKey
          };
        }
      }
    });
  },
  addNodeView() {
    return (0, import_react60.ReactNodeViewRenderer)(HTMLCodeBlockView, {
      className: "mly-relative",
      attrs: ({ node }) => {
        var _a;
        return {
          "data-active-tab": ((_a = node == null ? void 0 : node.attrs) == null ? void 0 : _a.activeTab) || "code"
        };
      }
    });
  },
  addCommands() {
    return {
      setHtmlCodeBlock: (attributes) => ({ commands }) => {
        return commands.setNode(this.name, attributes);
      },
      toggleHtmlCodeBlock: (attributes) => ({ commands }) => {
        return commands.toggleNode(this.name, "paragraph", attributes);
      },
      updateHtmlCodeBlock: (attrs) => updateAttributes(this.name, attrs)
    };
  },
  addKeyboardShortcuts() {
    var _a;
    return __spreadProps(__spreadValues({}, (_a = this.parent) == null ? void 0 : _a.call(this)), {
      "Mod-a": ({ editor }) => {
        const { selection } = editor.state;
        const $pos = selection.$anchor;
        const node = $pos.node($pos.depth);
        if (node.type.name !== this.name) {
          return false;
        }
        let depth = $pos.depth;
        for (let d = depth; d > 0; d--) {
          if ($pos.node(d).type.name === this.name) {
            depth = d;
            break;
          }
        }
        const start = $pos.before(depth) + 1;
        const end = $pos.after(depth) - 1;
        const from = editor.state.doc.resolve(start);
        const to = editor.state.doc.resolve(end);
        if (from && to) {
          const transaction = editor.state.tr.setSelection(
            import_state7.TextSelection.between(from, to)
          );
          editor.view.dispatch(transaction);
          return true;
        }
        return false;
      }
    });
  }
}).configure({
  lowlight
});

// src/editor/utils/is-custom-node-selected.ts
var isCustomNodeSelected = (editor, node) => {
  const customNodes = [
    HorizontalRule.name,
    import_extension_image3.default.name,
    Spacer.name,
    ImageExtension.name,
    VariableExtension.name,
    LinkCardExtension.name,
    LogoExtension.name,
    ButtonExtension.name,
    HTMLCodeBlockExtension.name,
    InlineImageExtension.name
  ];
  return customNodes.some((type) => editor.isActive(type));
};

// src/editor/components/text-menu/text-bubble-menu.tsx
var import_react64 = require("@tiptap/react");

// src/editor/components/text-menu/text-bubble-content.tsx
var import_lucide_react29 = require("lucide-react");

// src/editor/components/text-menu/use-text-menu-state.tsx
var import_react61 = require("@tiptap/react");
var import_fast_deep_equal8 = __toESM(require("fast-deep-equal"), 1);
var DEFAULT_TEXT_COLOR = "#374151";
var useTextMenuState = (editor) => {
  const states = (0, import_react61.useEditorState)({
    editor,
    selector: (ctx) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return {
        currentTextColor: ctx.editor.getAttributes("textStyle").color || DEFAULT_TEXT_COLOR,
        linkUrl: (_a = ctx.editor) == null ? void 0 : _a.getAttributes("link").href,
        textAlign: ((_b = ctx.editor) == null ? void 0 : _b.isActive({ textAlign: "left" })) ? "left" : ((_c = ctx.editor) == null ? void 0 : _c.isActive({ textAlign: "center" })) ? "center" : ((_d = ctx.editor) == null ? void 0 : _d.isActive({ textAlign: "right" })) ? "right" : ((_e = ctx.editor) == null ? void 0 : _e.isActive({ textAlign: "justify" })) ? "justify" : "left",
        isListActive: ctx.editor.isActive("bulletList") || ctx.editor.isActive("orderedList"),
        isUrlVariable: (_f = ctx.editor.getAttributes("link").isUrlVariable) != null ? _f : false,
        isHeadingActive: ctx.editor.isActive("heading"),
        headingShowIfKey: ((_g = ctx.editor.getAttributes("heading")) == null ? void 0 : _g.showIfKey) || "",
        isParagraphActive: ctx.editor.isActive("paragraph"),
        paragraphShowIfKey: ((_h = ctx.editor.getAttributes("paragraph")) == null ? void 0 : _h.showIfKey) || ""
      };
    },
    equalityFn: import_fast_deep_equal8.default
  });
  return states;
};

// src/editor/components/text-menu/text-bubble-content.tsx
var import_jsx_runtime56 = require("react/jsx-runtime");
function TextBubbleContent(props) {
  var _a, _b, _c, _d;
  const { editor, showListMenu = true } = props;
  const state = useTextMenuState(editor);
  const colors = editor == null ? void 0 : editor.storage.color.colors;
  const suggestedColors = (_c = (_b = (_a = Array == null ? void 0 : Array.from(colors)) == null ? void 0 : _a.reverse()) == null ? void 0 : _b.slice(0, 6)) != null ? _c : [];
  const items = [
    {
      name: "bold",
      isActive: () => editor == null ? void 0 : editor.isActive("bold"),
      command: () => editor == null ? void 0 : editor.chain().focus().toggleBold().run(),
      icon: import_lucide_react29.BoldIcon,
      tooltip: "Bold"
    },
    {
      name: "italic",
      isActive: () => editor == null ? void 0 : editor.isActive("italic"),
      command: () => editor == null ? void 0 : editor.chain().focus().toggleItalic().run(),
      icon: import_lucide_react29.ItalicIcon,
      tooltip: "Italic"
    },
    {
      name: "underline",
      isActive: () => editor == null ? void 0 : editor.isActive("underline"),
      command: () => editor == null ? void 0 : editor.chain().focus().toggleUnderline().run(),
      icon: import_lucide_react29.UnderlineIcon,
      tooltip: "Underline"
    },
    {
      name: "strike",
      isActive: () => editor == null ? void 0 : editor.isActive("strike"),
      command: () => editor == null ? void 0 : editor.chain().focus().toggleStrike().run(),
      icon: import_lucide_react29.StrikethroughIcon,
      tooltip: "Strikethrough"
    },
    {
      name: "code",
      isActive: () => editor == null ? void 0 : editor.isActive("code"),
      command: () => editor == null ? void 0 : editor.chain().focus().toggleCode().run(),
      icon: import_lucide_react29.CodeIcon,
      tooltip: "Code"
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_jsx_runtime56.Fragment, { children: [
    items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(BubbleMenuButton, __spreadValues({}, item), index)),
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
      AlignmentSwitch,
      {
        alignment: state.textAlign,
        onAlignmentChange: (alignment) => {
          editor == null ? void 0 : editor.chain().focus().setTextAlign(alignment).run();
        }
      }
    ),
    !state.isListActive && showListMenu && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_jsx_runtime56.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
        BubbleMenuButton,
        {
          icon: import_lucide_react29.List,
          command: () => {
            editor.chain().focus().toggleBulletList().run();
          },
          tooltip: "Bullet List"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
        BubbleMenuButton,
        {
          icon: import_lucide_react29.ListOrdered,
          command: () => {
            editor.chain().focus().toggleOrderedList().run();
          },
          tooltip: "Ordered List"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
      LinkInputPopover,
      {
        defaultValue: (_d = state == null ? void 0 : state.linkUrl) != null ? _d : "",
        onValueChange: (value, isVariable) => {
          if (!value) {
            editor == null ? void 0 : editor.chain().focus().extendMarkRange("link").unsetLink().unsetUnderline().run();
            return;
          }
          editor == null ? void 0 : editor.chain().extendMarkRange("link").setLink({ href: value }).setIsUrlVariable(isVariable != null ? isVariable : false).setUnderline().run();
        },
        tooltip: "External URL",
        editor,
        isVariable: state.isUrlVariable
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Divider, {}),
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
      ColorPicker,
      {
        color: state.currentTextColor,
        onColorChange: (color) => {
          editor == null ? void 0 : editor.chain().setColor(color).run();
        },
        tooltip: "Text Color",
        suggestedColors,
        children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          BaseButton,
          {
            variant: "ghost",
            size: "sm",
            type: "button",
            className: "!mly-h-7 mly-w-7 mly-shrink-0 mly-p-0",
            children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "mly-flex mly-flex-col mly-items-center mly-justify-center mly-gap-[1px]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "mly-font-bolder mly-font-mono mly-text-xs mly-text-slate-700", children: "A" }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                "div",
                {
                  className: "mly-h-[2px] mly-w-3",
                  style: { backgroundColor: state.currentTextColor }
                }
              )
            ] })
          }
        )
      }
    )
  ] });
}

// src/editor/components/text-menu/turn-into-block.tsx
var import_lucide_react30 = require("lucide-react");
var import_react62 = require("react");
var import_jsx_runtime57 = require("react/jsx-runtime");
var isOption = (option) => option.type === "option";
var isCategory = (option) => option.type === "category";
function TurnIntoBlock(props) {
  const { options } = props;
  const activeItem = (0, import_react62.useMemo)(
    () => options.find((option) => option.type === "option" && option.isActive()),
    [options]
  );
  const { icon: ActiveIcon = import_lucide_react30.PilcrowIcon } = activeItem || {};
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(Tooltip, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
        PopoverTrigger,
        {
          className: cn(
            "mly-flex mly-aspect-square mly-h-7 mly-items-center mly-justify-center mly-gap-1 mly-rounded-md mly-px-1.5 mly-text-sm data-[state=open]:mly-bg-soft-gray hover:mly-bg-soft-gray focus-visible:mly-relative focus-visible:mly-z-10 focus-visible:mly-outline-none focus-visible:mly-ring-2 focus-visible:mly-ring-gray-400 focus-visible:mly-ring-offset-2"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ActiveIcon, { className: "mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5]" }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_lucide_react30.ChevronDownIcon, { className: "mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5]" })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(TooltipContent, { sideOffset: 8, children: "Turn into" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
      PopoverContent,
      {
        align: "start",
        side: "bottom",
        sideOffset: 8,
        className: "mly-flex mly-w-[160px] mly-flex-col mly-rounded-md mly-p-1",
        children: options.map((option, index) => {
          if (isOption(option)) {
            return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
              BaseButton,
              {
                onClick: option.onClick,
                variant: "ghost",
                className: "mly-h-auto mly-justify-start mly-gap-2 !mly-rounded mly-px-2 mly-py-1 mly-text-sm mly-font-normal mly-text-midnight-gray",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(option.icon, { className: "mly-size-[15px] mly-shrink-0" }),
                  option.label
                ]
              },
              option.id
            );
          } else if (isCategory(option)) {
            return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
              "label",
              {
                className: cn(
                  "mly-px-2 mly-text-xs mly-font-medium mly-text-midnight-gray/60",
                  index === 0 ? "mly-mb-2 mly-mt-1" : "mly-my-2"
                ),
                children: option.label
              },
              option.id
            );
          }
        })
      }
    )
  ] });
}

// src/editor/components/text-menu/use-turn-into-block-options.tsx
var import_react63 = require("@tiptap/react");
var import_lucide_react31 = require("lucide-react");
function useTurnIntoBlockOptions(editor) {
  return (0, import_react63.useEditorState)({
    editor,
    selector: ({ editor: editor2 }) => [
      {
        type: "category",
        label: "Hierarchy",
        id: "hierarchy"
      },
      {
        icon: import_lucide_react31.PilcrowIcon,
        onClick: () => editor2.chain().focus().liftListItem("listItem").setParagraph().run(),
        id: "paragraph",
        disabled: () => !editor2.can().setParagraph(),
        isActive: () => editor2.isActive("paragraph") && !editor2.isActive("orderedList") && !editor2.isActive("bulletList") && !editor2.isActive("taskList"),
        label: "Paragraph",
        type: "option"
      },
      {
        icon: import_lucide_react31.Heading1Icon,
        onClick: () => editor2.chain().focus().liftListItem("listItem").setHeading({ level: 1 }).run(),
        id: "heading1",
        disabled: () => !editor2.can().setHeading({ level: 1 }),
        isActive: () => editor2.isActive("heading", { level: 1 }),
        label: "Heading 1",
        type: "option"
      },
      {
        icon: import_lucide_react31.Heading2Icon,
        onClick: () => editor2.chain().focus().liftListItem("listItem").setHeading({ level: 2 }).run(),
        id: "heading2",
        disabled: () => !editor2.can().setHeading({ level: 2 }),
        isActive: () => editor2.isActive("heading", { level: 2 }),
        label: "Heading 2",
        type: "option"
      },
      {
        icon: import_lucide_react31.Heading3Icon,
        onClick: () => editor2.chain().focus().liftListItem("listItem").setHeading({ level: 3 }).run(),
        id: "heading3",
        disabled: () => !editor2.can().setHeading({ level: 3 }),
        isActive: () => editor2.isActive("heading", { level: 3 }),
        label: "Heading 3",
        type: "option"
      },
      {
        id: "footer",
        type: "option",
        label: "Footer",
        icon: import_lucide_react31.FootprintsIcon,
        onClick: () => {
          editor2.chain().focus().liftListItem("listItem").setFooter().run();
        },
        disabled: () => !editor2.can().setFooter(),
        isActive: () => editor2.isActive("footer")
      },
      {
        type: "category",
        label: "Lists",
        id: "lists"
      },
      {
        icon: import_lucide_react31.ListIcon,
        onClick: () => editor2.chain().focus().toggleBulletList().run(),
        id: "bulletList",
        disabled: () => !editor2.can().toggleBulletList(),
        isActive: () => editor2.isActive("bulletList"),
        label: "Bullet list",
        type: "option"
      },
      {
        icon: import_lucide_react31.ListOrderedIcon,
        onClick: () => editor2.chain().focus().toggleOrderedList().run(),
        id: "orderedList",
        disabled: () => !editor2.can().toggleOrderedList(),
        isActive: () => editor2.isActive("orderedList"),
        label: "Numbered list",
        type: "option"
      }
    ]
  });
}

// src/editor/components/text-menu/text-bubble-menu.tsx
var import_jsx_runtime58 = require("react/jsx-runtime");
function TextBubbleMenu(props) {
  const { editor, appendTo } = props;
  if (!editor) {
    return null;
  }
  const bubbleMenuProps = __spreadProps(__spreadValues(__spreadValues({}, props), appendTo ? { appendTo: appendTo.current } : {}), {
    pluginKey: "text-menu",
    shouldShow: ({ editor: editor2, from, view }) => {
      var _a;
      if (!view || editor2.view.dragging) {
        return false;
      }
      const domAtPos = view.domAtPos(from || 0).node;
      const nodeDOM = view.nodeDOM(from || 0);
      const node = nodeDOM || domAtPos;
      if (isCustomNodeSelected(editor2, node) || !editor2.isEditable) {
        return false;
      }
      const nestedNodes = [
        RepeatExtension.name,
        SectionExtension.name,
        ColumnsExtension.name,
        ColumnExtension.name
      ];
      const isNestedNodeSelected = nestedNodes.some((name) => editor2.isActive(name)) && ((_a = node == null ? void 0 : node.classList) == null ? void 0 : _a.contains("ProseMirror-selectednode"));
      return isTextSelected(editor2) && !isNestedNodeSelected;
    },
    tippyOptions: {
      popperOptions: {
        placement: "top-start",
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8
            }
          },
          {
            name: "flip",
            options: {
              fallbackPlacements: ["bottom-start", "top-end", "bottom-end"]
            }
          }
        ]
      },
      maxWidth: "100%"
    }
  });
  const turnIntoBlockOptions = useTurnIntoBlockOptions(editor);
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
    import_react64.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-gap-0.5 mly-rounded-lg mly-border mly-border-gray-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(TooltipProvider, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(TurnIntoBlock, { options: turnIntoBlockOptions }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Divider, { className: "mly-mx-0" }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(TextBubbleContent, { editor })
      ] })
    })
  );
}

// src/editor/components/variable-menu/variable-bubble-menu.tsx
var import_react65 = require("@tiptap/react");
var import_tippy10 = require("tippy.js");
var import_jsx_runtime59 = require("react/jsx-runtime");
function VariableBubbleMenu(props) {
  const { editor, appendTo } = props;
  if (!editor) {
    return null;
  }
  const bubbleMenuProps = __spreadProps(__spreadValues({}, props), {
    pluginKey: "variable-menu",
    shouldShow: ({ editor: editor2 }) => {
      var _a;
      return editor2.isActive("variable") && !((_a = editor2.storage.variable) == null ? void 0 : _a.popover);
    },
    tippyOptions: {
      popperOptions: {
        modifiers: [{ name: "flip", enabled: false }]
      },
      plugins: [import_tippy10.sticky],
      sticky: "popper",
      maxWidth: "100%",
      appendTo: () => (appendTo == null ? void 0 : appendTo.current) || "parent",
      placement: "top-start"
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
    import_react65.BubbleMenu,
    __spreadProps(__spreadValues({}, bubbleMenuProps), {
      className: "mly-flex mly-gap-0.5 mly-rounded-lg mly-border mly-border-slate-200 mly-bg-white mly-p-0.5 mly-shadow-md",
      children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(TextBubbleContent, { showListMenu: false, editor }) })
    })
  );
}

// src/editor/extensions/index.tsx
function extensions(props) {
  const { blocks, extensions: extensions2 = [] } = props;
  const defaultExtensions = [
    MailyKit,
    SlashCommandExtension.configure({
      suggestion: getSlashCommandSuggestions(blocks)
    }),
    VariableExtension.configure({
      suggestion: getVariableSuggestions()
    }),
    HTMLCodeBlockExtension,
    InlineImageExtension,
    PlaceholderExtension
  ].filter((ext) => {
    return !extensions2.some((e) => e.name === ext.name);
  });
  return [...defaultExtensions, ...extensions2];
}

// src/editor/utils/replace-deprecated.ts
function replaceDeprecatedNode(json) {
  var _a, _b;
  const stack = [json];
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      continue;
    }
    if (node.type === "for") {
      node.type = "repeat";
    }
    if (node.type === "spacer") {
      let height = (_a = node.attrs) == null ? void 0 : _a.height;
      if (typeof height === "string" && ["sm", "md", "lg", "xl"].includes(height)) {
        height = ((_b = spacing.find((s) => s.short === height)) == null ? void 0 : _b.value) || DEFAULT_SPACER_HEIGHT;
      }
      node.attrs = __spreadProps(__spreadValues({}, node.attrs), {
        height
      });
    }
    if (node.content) {
      stack.push(...node.content);
    }
  }
  return json;
}

// src/editor/index.tsx
var import_jsx_runtime60 = require("react/jsx-runtime");
function Editor13(props) {
  const {
    config: {
      wrapClassName = "",
      contentClassName = "",
      bodyClassName = "",
      hasMenuBar = true,
      spellCheck = false,
      autofocus = "end",
      immediatelyRender = false
    } = {},
    onCreate,
    onUpdate,
    extensions: extensions2,
    contentHtml,
    contentJson,
    blocks = DEFAULT_SLASH_COMMANDS,
    editable = true,
    placeholderUrl = DEFAULT_PLACEHOLDER_URL
  } = props;
  const formattedContent = (0, import_react67.useMemo)(() => {
    if (contentJson) {
      const json = (contentJson == null ? void 0 : contentJson.type) === "doc" ? contentJson : {
        type: "doc",
        content: contentJson
      };
      return replaceDeprecatedNode(json);
    } else if (contentHtml) {
      return contentHtml;
    } else {
      return {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: []
          }
        ]
      };
    }
  }, [contentHtml, contentJson, replaceDeprecatedNode]);
  const menuContainerRef = (0, import_react67.useRef)(null);
  const editor = (0, import_react66.useEditor)({
    editorProps: {
      attributes: {
        class: cn(`mly-prose mly-w-full`, contentClassName),
        spellCheck: spellCheck ? "true" : "false"
      }
    },
    immediatelyRender,
    onCreate: ({ editor: editor2 }) => {
      onCreate == null ? void 0 : onCreate(editor2);
    },
    onUpdate: ({ editor: editor2 }) => {
      onUpdate == null ? void 0 : onUpdate(editor2);
    },
    extensions: extensions({
      extensions: extensions2,
      blocks
    }),
    content: formattedContent,
    autofocus,
    editable
  });
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(MailyProvider, { placeholderUrl, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(
    "div",
    {
      className: cn(
        "mly-editor mly-antialiased",
        editor.isEditable ? "mly-editable" : "mly-not-editable",
        wrapClassName
      ),
      ref: menuContainerRef,
      children: [
        hasMenuBar && /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(EditorMenuBar, { config: props.config, editor }),
        /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(
          "div",
          {
            className: cn(
              "mly-mt-4 mly-rounded mly-border mly-border-gray-200 mly-bg-white mly-p-4",
              bodyClassName
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(TextBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ImageBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(SpacerBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react66.EditorContent, { editor }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(SectionBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ColumnsBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ContentMenu, { editor }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(VariableBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(RepeatBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(HTMLBubbleMenu, { editor, appendTo: menuContainerRef }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(InlineImageBubbleMenu, { editor, appendTo: menuContainerRef })
            ]
          }
        )
      ]
    }
  ) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Editor
});
//# sourceMappingURL=index.cjs.map