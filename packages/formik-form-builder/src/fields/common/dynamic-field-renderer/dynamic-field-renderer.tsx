import React from "react";
import { DynamicFieldrendererProps, InputTypes } from "../../../types";
import { FieldText } from "../../field-text";
import { FieldCheckBox } from "../../field-checkbox";
import { FieldAutoComplete } from "../../field-autocomplete";
import { FieldRadio, FieldRadioIconVariant } from "../../field-radio";
import { FieldSelect } from "../../field-select";
import { FieldMultiText } from "../../field-multitext";

export const DynamicFieldRenderer: React.FC<DynamicFieldrendererProps> =
    ({ name, field, index, fieldConditionActions }) => {
        const fieldName = `${field.field}`;
        const fieldKey = `${name}-${field.field}-${index}`;

        switch (field.type) {
            case InputTypes.TEXT:
                return <FieldText key={fieldKey} name={fieldName} label={field.label}
                    required={field?.validation?.required || false} actions={fieldConditionActions}
                    placeholder={field.placeholder} helperText={field.helperText} {...field.muiProps} />;
            case InputTypes.CHECKBOX:
                return <FieldCheckBox key={fieldKey} name={fieldName}
                    options={field.options} direction={field.direction}
                    required={field?.validation?.required || false}
                    helperText={field.helperText} groupLabel={field.groupLabel}
                    {...field.muiProps} actions={fieldConditionActions} />;
            case InputTypes.AUTO_COMPLETE:
                return <FieldAutoComplete key={fieldKey} name={fieldName}
                    options={field.options} required={field?.validation?.required || false}
                    helperText={field.helperText}
                    label={field.label} {...field.muiProps} actions={fieldConditionActions} />;
            case InputTypes.RADIO:
                switch (field?.variant) {
                    case "ICON":
                        return <FieldRadioIconVariant key={fieldKey} name={fieldName}
                            groupLabel={field.groupLabel} {...field.muiProps}
                            options={field.options}
                            required={field?.validation?.required || false}
                            helperText={field.helperText}
                            outputType={field.outputType}
                            direction={field.direction} actions={fieldConditionActions} />
                    default:
                        return <FieldRadio key={fieldKey} name={fieldName}
                            groupLabel={field.groupLabel} {...field.muiProps}
                            options={field.options}
                            required={field?.validation?.required || false}
                            helperText={field.helperText}
                            outputType={field.outputType}
                            direction={field.direction} actions={fieldConditionActions} />
                }
            case InputTypes.SELECT:
                return <FieldSelect key={fieldKey} name={fieldName}
                    label={field.label} helperText={field.helperText}
                    options={field.options} {...field.muiProps} actions={fieldConditionActions}
                    required={field?.validation?.required || false} />;
            case InputTypes.MULTI_TEXT:
                return <FieldMultiText key={fieldKey} name={fieldName}
                    required={field?.validation?.required || false} actions={fieldConditionActions}
                    placeholder={field.placeholder} helperText={field.helperText}
                    label={field.label} {...field.muiProps} />;
            default:
                return <></>;
        }
    }