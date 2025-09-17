export type PropKind = "boolean" | "text" | "select" | "object" | "array";
export type PropConfig = {
  name: string;
  type: PropKind;
  options?: string[];
  label?: string;
};

// ✅ Shared option arrays
export const sizeOptions = ["small", "medium"] as const;
export const variantOptions = ["outlined", "filled", "standard"] as const;
export const colorOptions = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
] as const;

export const colorMap: Record<string, string> = {
  primary: "#1976d2",
  secondary: "#9c27b0",
  success: "#2e7d32",
  error: "#d32f2f",
  warning: "#ed6c02",
  info: "#0288d1",
};

// ✅ Field Configs
export const fieldConfigs: Record<
  string,
  { component: string; props: PropConfig[] }
> = {
  text: {
    component: "TextField",
    props: [
      { name: "helperText", type: "text" },
      { name: "placeholder", type: "text" },
      { name: "required", type: "boolean" },
      { name: "multiline", type: "boolean" },
      { name: "size", type: "select", options: [...sizeOptions] },
      { name: "variant", type: "select", options: [...variantOptions] },
      { name: "color", type: "select", options: [...colorOptions] },
      { name: "inputProps", type: "object" },
    ],
  },
  multiline: {
    component: "TextField",
    props: [
      { name: "helperText", type: "text" },
      { name: "id", type: "text" },
      { name: "placeholder", type: "text" },
      { name: "required", type: "boolean" },
      { name: "disabled", type: "boolean" },
      { name: "error", type: "boolean" },
      { name: "fullWidth", type: "boolean" },
      { name: "autoFocus", type: "boolean" },
      { name: "size", type: "select", options: [...sizeOptions] },
      { name: "variant", type: "select", options: [...variantOptions] },
      { name: "color", type: "select", options: [...colorOptions] },
      { name: "inputProps", type: "object" },
    ],
  },
  checkbox: {
    component: "Checkbox",
    props: [
      { name: "required", type: "boolean" },
      { name: "helperText", type: "text" },
      { name: "disabled", type: "boolean" },
      { name: "color", type: "select", options: [...colorOptions] },
      { name: "size", type: "select", options: [...sizeOptions] },
    ],
  },
  radio: {
    component: "Radio",
    props: [
      { name: "disabled", type: "boolean" },
      { name: "autoFocus", type: "boolean" },
      { name: "required", type: "boolean" },
      { name: "id", type: "text" },
      { name: "name", type: "text" },
      { name: "value", type: "text" },
      { name: "size", type: "select", options: [...sizeOptions] },
      { name: "color", type: "select", options: [...colorOptions] },
    ],
  },
  select: {
    component: "Select",
    props: [
      { name: "id", type: "text" },
      { name: "name", type: "text" },
      { name: "value", type: "text" },
      { name: "options", type: "array" },
      { name: "disabled", type: "boolean" },
      { name: "required", type: "boolean" },
      { name: "error", type: "boolean" },
      { name: "helperText", type: "text" },
      { name: "fullWidth", type: "boolean" },
      { name: "autoFocus", type: "boolean" },
      { name: "variant", type: "select", options: [...variantOptions] },
      { name: "size", type: "select", options: [...sizeOptions] },
    
    ],
  },
  autocomplete: {
    component: "Autocomplete",
    props: [
      { name: "id", type: "text" },
      { name: "name", type: "text" },
      { name: "value", type: "text" },
      { name: "options", type: "array" },
      { name: "placeholder", type: "text" },
      { name: "helperText", type: "text" },
      { name: "disabled", type: "boolean" },
      { name: "required", type: "boolean" },
      { name: "error", type: "boolean" },
      { name: "fullWidth", type: "boolean" },
      { name: "autoFocus", type: "boolean" },
      { name: "variant", type: "select", options: [...variantOptions] },
      { name: "size", type: "select", options: [...sizeOptions] },
      { name: "color", type: "select", options: [...colorOptions] },
    ],
  },
};
