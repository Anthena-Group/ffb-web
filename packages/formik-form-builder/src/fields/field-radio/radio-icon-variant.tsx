import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { useField } from 'formik';
import React from 'react';
import { FieldRadioProps } from '../../types';
import { HelperText } from '../common';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Avatar from '@mui/joy/Avatar';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';


export const FieldRadioIconVariant: React.FC<FieldRadioProps> = ({ name, groupLabel, outputType,
  helperText, direction = "row", required, options, actions, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (outputType && outputType === "boolean") {
      const val = event.target.value;
      helpers.setValue(val === "true");
    } else {
      field.onChange(event);
    }
  }

  if (actions.hide) return null;

  return (
    <FormControl error={Boolean(meta.touched && meta.error)}
      data-test={`form-control-group-${name}`}>
      <FormLabel component="legend" data-test={`form-label-${name}`}>{groupLabel}
        {(groupLabel && required) && <Typography color='danger'>*</Typography>}
      </FormLabel>
      <RadioGroup
        data-test={`radio-group-${name}`}
        name={name}
        overlay
        value={field.value}
        onChange={handleChange}
        sx={{
          flexDirection: 'row',
          gap: 2,
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: '3px solid',
              borderColor: 'primary.500',
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: 'contents',
            '& > svg': {
              zIndex: 2,
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              bgcolor: 'background.surface',
              borderRadius: '50%',
            },
          },
        }}
      >
        <Grid container xs={12} spacing={2} direction={direction}
          data-test={`radio-group-grid-box`}>
          {options.map((option, index) => (
            <Grid data-test={`radio-group-grid-${index + 1}`}
              key={`${option.label}-${index}`} xs={12} sm={"auto"} md={"auto"}>
              <Sheet
                data-test={`radio-sheet`}
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  display: "flex",
                  boxShadow: 'sm',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 2,
                  minWidth: 120,
                }}
              >
                {option?.icon || <Avatar variant="soft" size="sm" />}
                <Radio
                  data-test={`radio-${index + 1}`}
                  label={option.label}
                  value={option.value}
                  checkedIcon={<CheckCircleRoundedIcon />}
                  disabled={actions.disable || props.disabled}
                  variant="soft" {...props} />
                {option.description &&
                  (<HelperText error={false}
                    helperText={option.description} errorText={""}
                    name={`no-${index + 1}`} />)}
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      <HelperText error={meta.touched && meta.error}
        helperText={helperText} errorText={meta.error} name={name} />
    </FormControl>
  );
};