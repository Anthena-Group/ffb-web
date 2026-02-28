import type { ConditionGroup, ConditionLogic, ConditionType } from "formik-form-builder";

export type GroupCardProps = {
  group: ConditionGroup;
  groupIndex: number;
  groupsLength: number;
  updateGroup: (index: number, key: keyof ConditionGroup, value: ConditionGroup[keyof ConditionGroup]) => void;
  deleteGroup: (index: number) => void;
  updateLogic: (
    groupIndex: number,
    logicIndex: number,
    key: keyof ConditionLogic,
    value: ConditionLogic[keyof ConditionLogic]
  ) => void;
  addLogic: (groupIndex: number) => void;
  deleteLogic: (groupIndex: number, logicIndex: number) => void;
};

export type LogicRowProps = {
  logic: ConditionLogic;
  groupIndex: number;
  logicIndex: number;
  updateLogic: (
    groupIndex: number,
    logicIndex: number,
    key: keyof ConditionLogic,
    value: ConditionLogic[keyof ConditionLogic]
  ) => void;
  deleteLogic: (groupIndex: number, logicIndex: number) => void;
  disableDelete: boolean;
};

export interface ConditionBuilderProps {
  onChange: (conditions: ConditionType) => void;
  value?: ConditionType;
}