// text-input specific configs 
export const fieldConfigs: Record<string, { label: string; props?: Record<string, any> }> = {
  text: { label: "Text Field" },
  multiline: { label: "Multiline Input" },
  checkbox: { label: "Checkbox" },
  radio: { label: "Radio Button", props: { options: ["Option A", "Option B"] } },
  select: { label: "Select", props: { options: ["Option 1", "Option 2"] } },
  autocomplete: { label: "Autocomplete", props: { options: ["Option 1", "Option 2"] } },
};

export const inputTypeDefaults: Record<string, any> = {
  text: { type: "text", label: "Text Field" },
  email: { type: "email", label: "Email" },
  password: { type: "password", label: "Password" },
  tel: { type: "tel", label: "Telephone" },
  color: { type: "color", label: "Pick a Color" },
  date: { type: "date", label: "Date" },
  time: { type: "time", label: "Time" },
};
