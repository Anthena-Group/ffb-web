import Checkbox from '@mui/joy/Checkbox';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import { useField } from 'formik';
import React from 'react';
import { FieldCheckBoxProps } from '../../types';
import { HelperText } from '../common';

export const FieldCheckBox: React.FC<FieldCheckBoxProps> = ({ name, groupLabel, helperText,
    options, required, direction = "row", actions, ...props }) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        let newValue: string | string[];
    
        if (checked) {
            if(options.length === 1) { 
                newValue = value;
            } else {
                newValue = [...(field.value || []), value];
            }
        } else {
            if(options.length === 1) {
                newValue = '';
            } else {
                newValue = (field.value || []).filter((v: string) => v !== value);
            }
        }
    
        helpers.setValue(newValue); // Set the new value
    };

    if (actions.hide) return null;

    return (
        <Grid data-test={`check-box-group-${name}`}>
            <FormLabel component="legend" data-test={`form-control-label-${name}`}>{groupLabel}
                {(groupLabel && required) && <span style={{ color: 'red' }}>*</span>}
            </FormLabel>
            <Grid container data-test={`check-box-grid-box`}
                xs={12} spacing={2} direction={direction} sx={{ flexGrow: 1 }}>
                {options?.map((option, index) => (
                    <Grid data-test={`check-box-grid-${index}`}
                        key={`${option.label}-${index}`} xs={12} sm={"auto"} md={"auto"}>
                        <Checkbox
                            data-test={`check-box-${name}`}
                            label={option.label}
                            value={option.value}
                            checked={Array.isArray(field.value) ?
                                field.value?.includes(option.value) : field.value === option.value}
                            disabled={actions.disable || props.disabled}
                            onChange={handleChange}
                            variant='soft'
                            {...props}
                        />
                        {option.description &&
                            (<HelperText error={false}
                                helperText={option.description} errorText={""} name={`no-${index + 1}`} />)}
                    </Grid>
                ))}
            </Grid>
            <HelperText error={meta.touched && meta.error}
                helperText={helperText} errorText={meta.error} name={name} />
        </Grid>
    );
};