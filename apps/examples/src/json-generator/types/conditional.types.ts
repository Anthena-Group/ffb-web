import type { ConditionType } from "formik-form-builder";

export interface ConditionBuilderProps {
    onConfirm: (conditions: ConditionType) => void;
}