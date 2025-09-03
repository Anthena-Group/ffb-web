import type { ValidationRuleType } from "../../../types";


export const availableRules: ValidationRuleType[] = [
  "required",
  "isPositive",
  "pattern",
  "minLength",
  "maxLength",
  "minValue",
  "maxValue",
  "moreThan",
  "lessThan",
];
