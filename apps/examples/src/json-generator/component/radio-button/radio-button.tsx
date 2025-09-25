import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  type GridProps,
} from "@mui/joy";
import { useConfigBuilder } from "../../hooks";
import {
  InputTypes,
  type ConditionType,
  type FieldRadioType,
  type ValidationRule,
} from "formik-form-builder";
import RadioConfigFields from "./radio-config-fields";
import {
  ConditionBuilder,
  ConfigPreview,
  GridPropsBuilder,
  LivePreview,
  OptionBuilder,
  ValidationBuilder,
} from "../common";
import { useCallback } from "react";
import type { ExtendedOptionType } from "../../types";

function RadioButtonBuilder() {
  const {
    config,
    finalConfig,
    initialInput,
    setInitialInput,
    handleChange,
    handleAddConfig,
    handleReset,
  } = useConfigBuilder<FieldRadioType>({
    field: "",
    type: InputTypes.RADIO,
    initialValue: [],
    variant: "DEFAULT",
    label: "",
    options: [{ label: "", value: "" }],
    groupLabel: "",
    helperText: "",
    gridProps: {},
    validation: {},
    conditions: undefined,
  });

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
    <Stack direction={"column"} spacing={4} sx={{ p: 4, maxWidth: 850 }}>
      <Card variant="outlined" sx={{ flex: 1 }}>
        <CardContent>
          <Typography level="h2" sx={{ mb: 3 }}>
            Radio Field Builder
          </Typography>
          <RadioConfigFields
            config={config as FieldRadioType}
            initialInput={initialInput}
            onChange={handleChange}
            setInitialInput={setInitialInput}
          />
          <OptionBuilder
            onChange={onOptionsChange}
            type={config.type}
            variant={config.variant}
          />
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
        <ConfigPreview finalConfig={finalConfig as FieldRadioType} />
        <LivePreview finalConfig={finalConfig as FieldRadioType} />
      </Stack>
    </Stack>
  );
}

export default RadioButtonBuilder;
