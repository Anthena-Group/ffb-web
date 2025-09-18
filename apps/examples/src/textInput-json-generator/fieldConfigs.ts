export const sizeOptions = ["small", "medium"];
export const variantOptions = ["outlined", "filled", "standard"];
export const colorOptions = ["primary", "secondary", "success", "error", "info", "warning"];

export const colorMap: Record<string, string> = {
  primary: "#1976d2",
  secondary: "#9c27b0",
  success: "#2e7d32",
  error: "#d32f2f",
  info: "#0288d1",
  warning: "#ed6c02",
};

export const fieldConfigs: Record<
  string,
  { label: string; props?: Record<string, any> }
> = {
  text: { label: "Text Field" },
  multiline: { label: "Multiline Input" },
  checkbox: { label: "Checkbox" },
  radio: { label: "Radio Button", props: { options: ["Option A", "Option B"] } },
  select: { label: "Select", props: { options: ["Option 1", "Option 2"] } },
  autocomplete: { label: "Autocomplete", props: { options: ["Option 1", "Option 2"] } },
};
