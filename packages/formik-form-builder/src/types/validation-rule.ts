import * as Yup from 'yup';


export type ValidationRule = {
  required?: boolean;
  message?: string;

  minLength?: number;
  minLengthRuleMsg?: string;

  maxLength?: number;
  maxLengthRuleMsg?: string;

  minValue?: number;
  minValueRuleMsg?: string;

  maxValue?: number;
  maxValueRuleMsg?: string;

  pattern?: RegExp;
  patternRuleMsg?: string;

  isPositive?: boolean;
  isPositiveRuleMsg?: string;

  moreThan?: number;
  moreThanRuleMsg?: string;

  lessThan?: number;
  lessThanRuleMsg?: string;

  yupCustomValidation?: Yup.TestConfig<
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | undefined
  | null,
  Yup.StringSchema | Yup.NumberSchema | Yup.BooleanSchema | Yup.BooleanSchema | any
>;
};
