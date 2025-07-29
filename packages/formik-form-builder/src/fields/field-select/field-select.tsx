import React from 'react';
import FormControl from '@mui/joy/FormControl';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/joy/Typography';
import { useField } from 'formik';
import { FieldSelectProps } from '../../types';
import FormLabel from '@mui/joy/FormLabel';
import { HelperText } from '../common';

export const FieldSelect: React.FC<FieldSelectProps> = ({ name, required, label, placeholder, helperText,
    options, actions, ...props }) => {
    const [field, meta, helpers] = useField(name);

    if (actions.hide) return null;

    return (
        <FormControl error={Boolean(meta.touched && meta.error)} data-test={`form-control-group-${name}`}>
            <FormLabel component="legend" data-test={`form-label-${name}`}>{label}
                {required && <Typography color='danger'>*</Typography>}
            </FormLabel>
            <Select
                data-test={`select-${name}`}
                id={name}
                placeholder={placeholder}
                indicator={<KeyboardArrowDown />}
                multiple={false}
                disabled={actions.disable || props.disabled}
                variant='soft'
                slotProps={{
                    button: {
                        onBlur: () => {
                            helpers.setTouched(true)
                        }
                    }
                }}
                sx={{
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                }}
                onChange={(event, newValue) => {
                    helpers.setValue(newValue);
                }}
                value={field.value}
                {...props}
            >
                {options.map((option, index) => (
                    <Option data-test={`select-option-${index + 1}`} key={`${option.label}-${index}`} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
            <HelperText error={meta.touched && meta.error}
                helperText={helperText} errorText={meta.error} name={name} />
        </FormControl>
    );
};