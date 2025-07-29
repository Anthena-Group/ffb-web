import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { useField } from 'formik';
import React from 'react';
import { FieldRadioProps } from '../../types';
import { HelperText } from '../common';
import Typography from '@mui/joy/Typography';


export const FieldRadio: React.FC<FieldRadioProps> = ({ name, groupLabel, outputType,
    helperText, direction = "row", required, options, actions, ...props }) => {
    const [field, meta, helpers] = useField(name);

    if (actions.hide) return null;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (outputType && outputType === "boolean") {
            const val = event.target.value;
            helpers.setValue(val === "true");
        } else {
            field.onChange(event);
        }
    }

    return (
        <FormControl error={Boolean(meta.touched && meta.error)}
            data-test={`form-control-group-${name}`}>
            <FormLabel component="legend" data-test={`form-label-${name}`}>{groupLabel}
                {(groupLabel && required) && <Typography color='danger'>*</Typography>}
            </FormLabel>
            <RadioGroup
                data-test={`radio-group-${name}`}
                name={name}
                value={field.value}
                onChange={handleChange}
                sx={{ gap: 1 }}
            >
                <Grid container xs={12} spacing={2} direction={direction}
                    data-test={`radio-group-grid-box`}>
                    {options.map((option, index) => (
                        <Grid data-test={`radio-group-grid-${index + 1}`}
                            key={`${option.label}-${index}`} xs={12} sm={"auto"} md={"auto"}>
                            <Radio data-test={`radio-${index + 1}`} label={option.label}
                                value={option.value}
                                disabled={actions.disable || props.disabled}
                                variant="soft" {...props} />
                            {option.description &&
                                (<HelperText error={false}
                                    helperText={option.description} errorText={""}
                                    name={`no-${index + 1}`} />)}
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
            <HelperText error={meta.touched && meta.error}
                helperText={helperText} errorText={meta.error} name={name} />
        </FormControl>
    );
};