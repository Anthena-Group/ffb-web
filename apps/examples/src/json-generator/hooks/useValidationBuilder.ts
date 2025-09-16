import { useState } from "react";
import type { ValidationRule } from "formik-form-builder";
import type { ValidationRuleType } from "../types";


export function useValidationBuilder() {
  const [draftRules, setDraftRules] = useState<ValidationRule>({});
  const [selectedRule, setSelectedRule] = useState<ValidationRuleType | null>(null);

  const availableRules: ValidationRuleType[] = [
    "required",
    "minLength",
    "maxLength",
    "minValue",
    "maxValue",
    "pattern",
    "isPositive",
    "moreThan",
    "lessThan",
  ];

  const addRule = () => {
    if (!selectedRule) return;
    if (draftRules.hasOwnProperty(selectedRule)) return;

    if (selectedRule === "required") {
      setDraftRules((prev) => ({ ...prev, required: true, message: "" }));
    } else if (selectedRule === "isPositive") {
      setDraftRules((prev) => ({ ...prev, isPositive: true, isPositiveRuleMsg: "" }));
    } else if (selectedRule === "pattern") {
      setDraftRules((prev) => ({ ...prev, pattern: /.+/, patternRuleMsg: "" }));
    } else {
      setDraftRules((prev) => ({
        ...prev,
        [selectedRule]: undefined,
        [`${selectedRule}RuleMsg`]: "",
      }));
    }

    setSelectedRule(null);
  };

  const updateRule = (key: keyof ValidationRule, value: any) => {
    setDraftRules((prev) => ({ ...prev, [key]: value }));
  };

  const deleteRule = (key: ValidationRuleType) => {
    const newDraft = { ...draftRules };
    delete newDraft[key];
    delete (newDraft as any)[`${key}RuleMsg`];
    setDraftRules(newDraft);
  };

  const confirmRules = () => {
    return Object.fromEntries(
      Object.entries(draftRules).filter(([_, v]) => v !== undefined && v !== "")
    ) as ValidationRule;
  };

  return {
    draftRules,
    selectedRule,
    setSelectedRule,
    availableRules,
    addRule,
    updateRule,
    deleteRule,
    confirmRules,
  };
}
