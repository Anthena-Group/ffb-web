import { FieldConditionAction } from './common-types';
import { FieldType } from './field-type';

export interface DynamicFieldrendererProps {
  name: string;
  field: FieldType;
  index: number;
  fieldConditionActions: FieldConditionAction;
}
