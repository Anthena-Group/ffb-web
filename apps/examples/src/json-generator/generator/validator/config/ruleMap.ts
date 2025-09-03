import type { ValidationRuleType } from "../../../types";
import {
    RequiredField,
    PositiveField,
    PatternField,
    RuleField,
} from "../components";

export const ruleMap: Record<ValidationRuleType, any> = {
    required: RequiredField,
    isPositive: PositiveField,
    pattern: PatternField,
    minLength: RuleField,
    maxLength: RuleField,
    minValue: RuleField,
    maxValue: RuleField,
    moreThan: RuleField,
    lessThan: RuleField,
};
