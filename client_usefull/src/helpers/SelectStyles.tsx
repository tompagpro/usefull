import { GroupBase, StylesConfig } from "react-select";

// react-select ships its own (white) styles: we plug it on the DaisyUI theme
// variables (--b1 = base-100, --bc = base-content, --p = primary, --pc = primary-content)
// so it looks like the other inputs and follows usefull / usefull-dark
export const getSelectStyles = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> => ({
  control: (base, state) => ({
    ...base,
    minHeight: "3rem",
    backgroundColor: "oklch(var(--b1))",
    borderRadius: "var(--rounded-btn)",
    borderColor: state.isFocused ? "oklch(var(--p))" : "oklch(var(--bc) / 0.2)",
    boxShadow: state.isFocused ? "0 0 0 1px oklch(var(--p))" : "none",
    "&:hover": {
      borderColor: state.isFocused
        ? "oklch(var(--p))"
        : "oklch(var(--bc) / 0.4)",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
    overflow: "hidden",
    backgroundColor: "oklch(var(--b1))",
    border: "1px solid oklch(var(--b3))",
    borderRadius: "var(--rounded-box)",
  }),
  option: (base, state) => ({
    ...base,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "oklch(var(--p))"
      : state.isFocused
      ? "oklch(var(--p) / 0.1)"
      : "transparent",
    color: state.isSelected ? "oklch(var(--pc))" : "inherit",
  }),
  singleValue: (base) => ({ ...base, color: "oklch(var(--bc))" }),
  input: (base) => ({ ...base, color: "oklch(var(--bc))" }),
  placeholder: (base) => ({ ...base, color: "oklch(var(--bc) / 0.5)" }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "oklch(var(--p) / 0.1)",
    borderRadius: "var(--rounded-badge)",
  }),
  multiValueLabel: (base) => ({ ...base, color: "oklch(var(--p))" }),
  multiValueRemove: (base) => ({
    ...base,
    color: "oklch(var(--p))",
    ":hover": { backgroundColor: "oklch(var(--p) / 0.2)" },
  }),
});
