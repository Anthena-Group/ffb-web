import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Typography,
  Select,
  Option,
  Stack,
  Box,
} from "@mui/joy";
import {
  CHECK_BOX_VALUE_TYPE,
  InputTypes,
  type FieldCheckboxType,
} from "formik-form-builder";
import ValidationBuilder from "./validator";
import ConditionBuilder from "./conditional";
import GridPropsBuilder from "./gridProps";

export default function CheckboxBuilder() {
  const [configObj, setConfigObj] = useState<
    Omit<FieldCheckboxType, "initialValue"> & {
      initialValue: string[]; // force string array only
    }
  >({
    field: "",
    type: InputTypes.CHECKBOX as InputTypes.CHECKBOX,
    initialValue: [],
    options: [{ label: "", value: "" }],
    muiProps: {},
  });

  const [finalConfig, setFinalConfig] = useState<Partial<FieldCheckboxType>>(
    {}
  );

  const [initialInput, setInitialInput] = useState("");

  // generic field update
  const handleChange = (key: keyof FieldCheckboxType, value: any) => {
    setConfigObj((prev) => ({ ...prev, [key]: value }));
  };

  // option change
  const handleOptionChange = (
    index: number,
    key: "label" | "value" | "description",
    value: string
  ) => {
    const updated = [...configObj.options];
    updated[index] = { ...updated[index], [key]: value };
    setConfigObj((prev) => ({ ...prev, options: updated }));
  };

  // add option only if last one is valid
  const addOption = () => {
    const last = configObj.options[configObj.options.length - 1];
    if (!last.label?.trim() || !String(last.value ?? "").trim()) return;
    setConfigObj((prev) => ({
      ...prev,
      options: [...prev.options, { label: "", value: "" }],
    }));
  };

  // remove option
  const removeOption = (index: number) => {
    setConfigObj((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const hasField = !!configObj.field?.trim();
  const hasAtLeastOneValidOption = (configObj.options ?? []).some(
    (o) => o.label?.trim() && String(o.value ?? "").trim()
  );
  const isAddDisabled = !hasField || !hasAtLeastOneValidOption;

  const handleAddConfig = () => {
    const combinedInitialValues = initialInput.trim()
      ? Array.from(new Set([...configObj.initialValue, initialInput.trim()]))
      : configObj.initialValue;

    const updatedConfig = { ...configObj, initialValue: combinedInitialValues };

    setConfigObj(updatedConfig);
    setFinalConfig(updatedConfig);

    console.log(updatedConfig);
  };

  return (
    <Stack direction={"column"} spacing={4} sx={{ p: 4, maxWidth:650}}>
      {/* Left Panel: Config */}
      <Card variant="outlined" sx={{ flex: 1 }}>
        <CardContent>
          <Typography level="h2" sx={{ mb: 3 }}>
            Checkbox Field Builder
          </Typography>

          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                "& > *": { flex: "1 1 45%" },
              }}
            >
              <Input
                placeholder="Field name"
                value={configObj.field}
                onChange={(e) => handleChange("field", e.target.value)}
              />
              <Input
                placeholder="Group Label"
                value={configObj.groupLabel}
                onChange={(e) => handleChange("groupLabel", e.target.value)}
              />
              <Input
                placeholder="Label"
                value={configObj.label}
                onChange={(e) => handleChange("label", e.target.value)}
              />
              <Input
                placeholder="Helper Text"
                value={configObj.helperText}
                onChange={(e) => handleChange("helperText", e.target.value)}
              />
              <Input
                placeholder="Enter initial value"
                value={initialInput}
                onChange={(e) => setInitialInput(e.target.value)}
                sx={{ flex: "1 1 100%" }} // full width
              />
            </Box>

            {/* Direction, Output Type, Value Type */}
            <Stack direction="row" spacing={2}>
              <Select
                onChange={(_, val) => handleChange("direction", val)}
                placeholder="Direction"
                sx={{ flex: 1 }}
              >
                <Option value="row">Row</Option>
                <Option value="column">Column</Option>
              </Select>

              <Select
                onChange={(_, val) => handleChange("outputType", val)}
                placeholder="Output Type"
                sx={{ flex: 1 }}
              >
                <Option value="string">String</Option>
                <Option value="number">Number</Option>
                <Option value="boolean">Boolean</Option>
              </Select>

              <Select
                onChange={(_, val) => handleChange("valueType", val)}
                placeholder="Value Type"
                sx={{ flex: 1 }}
              >
                <Option value={CHECK_BOX_VALUE_TYPE.ARRAY}>Array</Option>
                <Option value={CHECK_BOX_VALUE_TYPE.STRING}>String</Option>
                <Option value={CHECK_BOX_VALUE_TYPE.BOOLEAN}>Boolean</Option>
              </Select>
            </Stack>

            {/* Options */}
            <Typography level="h4" sx={{ mt: 3 }}>
              Options
            </Typography>

            {configObj.options.map((opt, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Input
                  placeholder="Label"
                  value={opt.label}
                  onChange={(e) =>
                    handleOptionChange(index, "label", e.target.value)
                  }
                />
                <Input
                  placeholder="Value"
                  value={opt.value}
                  onChange={(e) =>
                    handleOptionChange(index, "value", e.target.value)
                  }
                />
                <Input
                  placeholder="Description (optional)"
                  value={opt.description || ""}
                  onChange={(e) =>
                    handleOptionChange(index, "description", e.target.value)
                  }
                />
                {configObj.options.length > 1 && (
                  <Button
                    size="sm"
                    variant="soft"
                    color="danger"
                    onClick={() => removeOption(index)}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            ))}

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                onClick={addOption}
                disabled={
                  !configObj.options[
                    configObj.options.length - 1
                  ].label?.trim() ||
                  !String(
                    configObj.options[configObj.options.length - 1].value ?? ""
                  ).trim()
                }
              >
                Add more option
              </Button>
            </Box>

            {/* Other builders */}
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
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              gap={5}
            >
              <Button
                fullWidth
                color="success"
                disabled={isAddDisabled}
                onClick={handleAddConfig}
              >
                Generate Config
              </Button>
              <Button type="reset" color="danger" fullWidth>
                Reset
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Right Panel: Preview */}
      <Card variant="outlined" sx={{ flex: 1 }}>
        <CardContent>
          <Typography level="h4">Preview Config</Typography>
          <pre
            style={{
              marginTop: 16,
              fontSize: "0.875rem",
              backgroundColor: "#f9f9f9",
              padding: 12,
              borderRadius: 6,
            }}
          >
            {JSON.stringify(finalConfig, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </Stack>
  );
}
