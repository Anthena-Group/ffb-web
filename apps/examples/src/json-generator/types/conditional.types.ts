import type { ConditionGroup, ConditionLogic, ConditionType } from "formik-form-builder";

export type GroupCardProps = {
  group: ConditionGroup;
  groupIndex: number;
  groupsLength: number;
  updateGroup: (index: number, key: keyof ConditionGroup, value: any) => void;
  deleteGroup: (index: number) => void;
  updateLogic: (
    groupIndex: number,
    logicIndex: number,
    key: keyof ConditionLogic,
    value: any
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
    value: any
  ) => void;
  deleteLogic: (groupIndex: number, logicIndex: number) => void;
  disableDelete: boolean;
};

export interface ConditionBuilderProps {
  onConfirm: (conditions: ConditionType) => void;
}