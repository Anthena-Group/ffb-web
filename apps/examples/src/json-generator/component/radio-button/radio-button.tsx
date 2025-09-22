import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/joy";
import { useConfigBuilder } from "../../hooks";
import { InputTypes, type FieldRadioType } from "formik-form-builder";
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
            onConfirm={onOptionsConfirm}
            type={config.type}
            variant={config.variant}
          />
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
        <ConfigPreview finalConfig={finalConfig as FieldRadioType} />
        <LivePreview finalConfig={finalConfig as FieldRadioType} />
      </Stack>
    </Stack>
  );
}

export default RadioButtonBuilder;
