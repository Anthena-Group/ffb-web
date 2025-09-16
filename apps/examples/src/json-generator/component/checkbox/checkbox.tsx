import { Card, CardContent, Typography, Stack, Box, Button } from "@mui/joy";
import { InputTypes, type FieldCheckboxType } from "formik-form-builder";

import {
  ConditionBuilder,
  ConfigFields,
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
  } = useConfigBuilder<FieldCheckboxType>({
    field: "",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    options: [{ label: "", value: "" }],
    groupLabel: "",
    helperText: "",
  });

  return (
    <Stack direction="column" spacing={4} sx={{ p: 4, maxWidth: 850 }}>
      {/* field Panel */}
      <Card variant="outlined" sx={{ flex: 1 }}>
        <CardContent>
          <Typography level="h2" sx={{ mb: 3 }}>
            Checkbox Field Builder
          </Typography>

          <ConfigFields
            config={config as FieldCheckboxType}
            initialInput={initialInput}
            onChange={handleChange}
            setInitialInput={setInitialInput}
          />

          <OptionBuilder
            onConfirm={(props) => handleChange("options", props)}
            type={config.type}
          />
          <GridPropsBuilder
            onConfirm={(props) => handleChange("gridProps", props)}
          />
          <ValidationBuilder
            onConfirm={(rules) => handleChange("validation", rules)}
          />
          <ConditionBuilder
            onConfirm={(rules) => handleChange("conditions", rules)}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <Button color="success" onClick={handleAddConfig}>
              Generate Config
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Stack direction="row" spacing={3}>
        <ConfigPreview finalConfig={finalConfig} />
        <LivePreview finalConfig={finalConfig as FieldCheckboxType} />
      </Stack>
    </Stack>
  );
}
