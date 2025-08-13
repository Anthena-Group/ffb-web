import React from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel, Textarea, Typography } from '@mui/joy';
import { FieldMultiTextProps } from '../../types';
import { HelperText } from '../common';

export const FieldMultiText: React.FC<FieldMultiTextProps> = ({ name, label, placeholder,
    actions, helperText, required, ...props }) => {
    const [field, meta] = useField(name);

    if (actions.hide) return null;

    return (
        <FormControl error={Boolean(meta.touched && meta.error)} data-test={`form-control-group-${name}`}>
            <FormLabel data-test={`form-label-${name}`}>{label}
                {required && <Typography color='danger'>*</Typography>}
            </FormLabel>
            <Textarea data-test={`text-area-${name}`}
                disabled={actions.disable || props.disabled}
                variant="soft" placeholder={placeholder} minRows={4}
                {...props} {...field} />
            <HelperText error={meta.touched && meta.error}
                helperText={helperText} errorText={meta.error} name={name} />
        </FormControl>

    )
}