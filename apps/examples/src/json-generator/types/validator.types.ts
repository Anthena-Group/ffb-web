import type { ValidationRule } from "formik-form-builder";

export type ValidationRuleType =
    | "required"
    | "minLength"
    | "maxLength"
    | "minValue"
    | "maxValue"
    | "pattern"
    | "isPositive"
    | "moreThan"
    | "lessThan";

export interface ValidationBuilderProps {
    onConfirm: (rules: ValidationRule) => void;
}

export interface PatternFieldProps {
    draftRules: ValidationRule;
    onUpdate: OnUpdate;
    onDelete: () => void;
}

export interface PositiveFieldProps {
    draftRules: ValidationRule;
    onUpdate: OnUpdate;
    onDelete: () => void;
}

export interface RequiredFieldProps {
    draftRules: ValidationRule;
    onUpdate: OnUpdate;
    onDelete: () => void;
}

export interface RuleFieldProps {
    ruleKey: ValidationRuleType;
    draftRules: ValidationRule;
    onUpdate: OnUpdate;
    onDelete: () => void;
}

export interface RuleSelectProps {
    selectedRule: ValidationRuleType | null;
    setSelectedRule: (val: ValidationRuleType | null) => void;
    draftRules: ValidationRule;
    availableRules: ValidationRuleType[];
    onAdd: () => void;
}

export type OnUpdate = <K extends keyof ValidationRule>(field: K, value: ValidationRule[K]) => void;