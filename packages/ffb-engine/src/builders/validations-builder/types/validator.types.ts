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
  value?: ValidationRule;
  onChange: (rules: ValidationRule) => void;
}

export interface PatternRuleProps {
  message?: string;
  onMessageChange: (val: string) => void;
  onPatternChange: (regex: RegExp) => void;
  onDelete: () => void;
}

export interface PositiveRuleProps {
  message?: string;
  onChange: (val: string) => void;
  onDelete: () => void;
}

export interface RequiredRuleProps {
  message?: string;
  onChange: (val: string) => void;
  onDelete: () => void;
}

export interface NumericRuleProps {
  label: string;
  value?: number;
  message?: string;
  onValueChange: (val: number) => void;
  onMessageChange: (val: string) => void;
  onDelete: () => void;
}
