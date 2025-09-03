import type { ValidationRule } from "formik-form-builder";
import type { ValidationRuleType } from "../../../types";


export const handleAddRule = (
    selectedRule: ValidationRuleType | null,
    draftRules: ValidationRule,
    setDraftRules: React.Dispatch<React.SetStateAction<ValidationRule>>,
    setSelectedRule: (val: ValidationRuleType | null) => void
) => {
    if (!selectedRule) return;
    if (draftRules.hasOwnProperty(selectedRule)) return;

    if (selectedRule === "required") {
        setDraftRules((prev) => ({ ...prev, required: true, message: "" }));
    } else if (selectedRule === "isPositive") {
        setDraftRules((prev) => ({
            ...prev,
            isPositive: true,
            isPositiveRuleMsg: "",
        }));
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
