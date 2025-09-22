import { useCallback } from "react";
import { Card, CardContent, Typography, Stack, Box, Button } from "@mui/joy";
import { InputTypes, type FieldCheckboxType } from "formik-form-builder";

import {
  CheckboxConfigField,
  ConditionBuilder,
  ConfigPreview,
  GridPropsBuilder,
  LivePreview,
  OptionBuilder,
  ValidationBuilder,
} from "..";
import { useConfigBuilder } from "../../hooks";

export default function CheckboxBuilder() {
  const {
    config,
    finalConfig,
    initialInput,
    setInitialInput,
    handleChange,
    handleAddConfig,
    handleReset,
  } = useConfigBuilder<FieldCheckboxType>({
    field: "",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    label: "",
    options: [{ label: "", value: "" }],
    groupLabel: "",
    helperText: "",
    gridProps: {},
    validation: {},
    conditions: undefined,
  });

  //  callbacks
  const onOptionsConfirm = useCallback(
    (props: unknown) => handleChange("options", props),
    [handleChange]
  );
  const onGridPropsConfirm = useCallback(
    (props: unknown) => handleChange("gridProps", props),
    [handleChange]
  );
  const onValidationConfirm = useCallback(
    (rules: unknown) => handleChange("validation", rules),
    [handleChange]
  );
  const onConditionsConfirm = useCallback(
    (rules: unknown) => handleChange("conditions", rules),
    [handleChange]
  );

  return (
    <Stack direction="column" spacing={4} sx={{ p: 4, maxWidth: 850 }}>
      <Card variant="outlined" sx={{ flex: 1 }}>
        <CardContent>
          <Typography level="h2" sx={{ mb: 3 }}>
            Checkbox Field Builder
          </Typography>

          <CheckboxConfigField
            config={config as FieldCheckboxType}
            initialInput={initialInput}
            onChange={handleChange}
            setInitialInput={setInitialInput}
          />

          <OptionBuilder onConfirm={onOptionsConfirm} type={config.type} />
          <GridPropsBuilder onConfirm={onGridPropsConfirm} />
          <ValidationBuilder onConfirm={onValidationConfirm} />
          <ConditionBuilder onConfirm={onConditionsConfirm} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            mt={2}
          >
            <Button color="success" onClick={handleAddConfig}>
              Generate Config
            </Button>
            <Button color="danger" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={3}>
        <ConfigPreview finalConfig={finalConfig as FieldCheckboxType} />
        <LivePreview finalConfig={finalConfig as FieldCheckboxType} />
      </Stack>
    </Stack>
  );
}
