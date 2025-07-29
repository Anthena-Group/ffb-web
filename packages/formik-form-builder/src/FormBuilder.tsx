import React from "react";
import Grid from "@mui/joy/Grid";
import { DynamicFieldRenderer } from "./fields";
import { FormBuilderProps } from "./types";
import { FORM_DATA_TEST_PREFIX } from "./constants";
import { useFieldConditions } from "./hooks";

const FormBuilder: React.FC<FormBuilderProps> = ({
  group,
  fields,
  "data-test": dataTestId,
  gridProps,
  values,
}) => {
  const { fieldConditions, fieldActions, fieldDefaults } = useFieldConditions(
    fields,
    values
  );
  const defaultActions = {
    hide: false,
    disable: false,
  };

  const getActionByField = (field: string) => {
    return fieldConditions[field]
      ? fieldActions[field]
      : fieldDefaults[field] || defaultActions;
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ flexGrow: 1 }}
      {...gridProps}
      data-test={dataTestId}
    >
      {fields.map((field, index) => (
        <Grid
          data-test={`${FORM_DATA_TEST_PREFIX}${field.field}`}
          xs={12}
          key={field.field}
          {...field.gridProps}
        >
          <DynamicFieldRenderer
            field={field}
            index={index}
            name={group}
            fieldConditionActions={getActionByField(field.field)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { FormBuilder };
