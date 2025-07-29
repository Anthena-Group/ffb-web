import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import Input from '@mui/joy/Input';
import { useField } from "formik";
import { FieldTextProps } from "../../types";
import { HelperText } from '../common';
import Typography from '@mui/joy/Typography';

export const FieldText: React.FC<FieldTextProps> = ({ name, required, label, placeholder, actions,
    helperText, ...props }) => {
    const [field, meta] = useField(name);

    if(actions.hide) return null;

    return (
        <FormControl error={Boolean(meta.touched && meta.error)}
            data-test={`form-control-${name}`} >
            <FormLabel data-test={`form-label-${name}`} >{label}
                {required && <Typography color='danger'>*</Typography>}

                {/* <Tooltip title={label} variant="solid">
                    <InfoOutlined sx={{ width: "16px", marginRight: "7px" }} />
                </Tooltip> */}
            </FormLabel>
                <Input
                    data-test={`input-${name}`}
                    variant="soft"
                    placeholder={placeholder}
                    disabled={actions.disable || props.disabled}
                    {...props}
                    {...field}
                />
            <HelperText error={meta.touched && meta.error} helperText={helperText}
                errorText={meta.error} name={name} />
        </FormControl>
    )
}