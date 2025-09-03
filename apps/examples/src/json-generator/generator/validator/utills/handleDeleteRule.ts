import type { ValidationRule } from "formik-form-builder";
import type { ValidationRuleType } from "../../../types";


export const handleDeleteRule = (
  key: ValidationRuleType,
  draftRules: ValidationRule,
  setDraftRules: React.Dispatch<React.SetStateAction<ValidationRule>>
) => {
  const newDraft = { ...draftRules };
  delete newDraft[key];
  const msgKey = `${key}RuleMsg` as keyof ValidationRule;
  delete (newDraft as any)[msgKey];
  setDraftRules(newDraft);
};
