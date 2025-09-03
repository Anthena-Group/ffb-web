import type { ValidationRule } from "formik-form-builder";


export const handleUpdate = (
  key: keyof ValidationRule,
  value: any,
  setDraftRules: React.Dispatch<React.SetStateAction<ValidationRule>>
) => {
  setDraftRules((prev) => ({ ...prev, [key]: value }));
};
