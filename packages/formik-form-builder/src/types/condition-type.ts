export enum ConditionName {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  IS_EMPTY = 'IS_EMPTY',
  IS_NOT_EMPTY = 'IS_NOT_EMPTY',
  INCLUDES = 'INCLUDES',
  NOT_INCLUDES = 'NOT_INCLUDES',
  ARRAY_EQUALS = 'ARRAY_EQUALS',
}

export enum PostCondition {
  AND = 'AND',
  OR = 'OR',
}

export type ConditionValue = string | boolean | number | undefined | null | any[];

export interface ConditionLogic {
  field: string; // The field to evaluate
  value: ConditionValue | ConditionValue[]; // The value to compare against
  condition: ConditionName; // The condition to apply
  postCondition: PostCondition; // Logical operator for combining conditions
}

export interface ConditionGroup {
  group: string;
  logic: ConditionLogic[];
  groupPostCondition: PostCondition;
}

export enum ConditionAction {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE',
}

export interface ConditionType {
  groups: ConditionGroup[];
  action: ConditionAction;
}
