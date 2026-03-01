import { useState, useCallback, useEffect } from "react";
import type { ValidationRule } from "@mjfy/core";
import type { ValidationRuleType } from "../types";

export function useValidationBuilder(onChange: (rule: ValidationRule) => void) {
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

  useEffect(() => {
    onChange(confirmRules())
  }, [draftRules, selectedRule])

  const addRule = useCallback(() => {
    if (!selectedRule) return;
    if (draftRules.hasOwnProperty(selectedRule)) return;

    setDraftRules((prev) => {
      if (selectedRule === "required") {
        return { ...prev, required: true, message: "" };
      } else if (selectedRule === "isPositive") {
        return { ...prev, isPositive: true, isPositiveRuleMsg: "" };
      } else if (selectedRule === "pattern") {
        return { ...prev, pattern: /.+/, patternRuleMsg: "" };
      } else {
        return {
          ...prev,
          [selectedRule]: undefined,
          [`${selectedRule}RuleMsg`]: "",
        };
      }
    });

    setSelectedRule(null);
  }, [selectedRule, draftRules]);

  const updateRule = useCallback(
    (key: keyof ValidationRule, value: boolean | string | number | RegExp | undefined) => {
      setDraftRules((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const deleteRule = useCallback(
    (key: ValidationRuleType) => {
      setDraftRules((prev) => {
        const newDraft = { ...prev };
        delete newDraft[key];
        if (key === "required") delete newDraft["message"];
        delete (newDraft as ValidationRule)[`${key}RuleMsg` as keyof ValidationRule];
        return newDraft;
      });
    },
    []
  );

  const confirmRules = useCallback(() => {
    return Object.fromEntries(
      Object.entries(draftRules).filter(([_, v]) => v !== undefined && v !== "")
    ) as ValidationRule;
  }, [draftRules]);

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
