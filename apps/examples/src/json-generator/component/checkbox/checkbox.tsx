import { useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
  type GridProps,
} from "@mui/joy";
import {
  InputTypes,
  type ConditionType,
  type FieldCheckboxType,
  type ValidationRule,
} from "formik-form-builder";

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
import type { ExtendedOptionType } from "../../types";

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
  const onOptionsChange = useCallback(
    (props: ExtendedOptionType[]) => handleChange("options", props),
    [handleChange]
  );
  const onGridPropsChange = useCallback(
    (props: GridProps) => handleChange("gridProps", props),
    [handleChange]
  );
  const onValidationChange = useCallback(
    (rules: ValidationRule) => handleChange("validation", rules),
    [handleChange]
  );
  const onConditionsChange = useCallback(
    (rules: ConditionType) => handleChange("conditions", rules),
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

          <OptionBuilder onChange={onOptionsChange} type={config.type} />
          <GridPropsBuilder onChange={onGridPropsChange} />
          <ValidationBuilder onChange={onValidationChange} />
          <ConditionBuilder onChange={onConditionsChange} />

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
