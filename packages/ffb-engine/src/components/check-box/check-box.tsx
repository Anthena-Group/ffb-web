import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
  type GridProps,
  Alert,
} from "@mui/joy";

import {
  InputTypes,
  OptionType,
  type ConditionType,
  type FieldCheckboxType,
  type ValidationRule,
} from "formik-form-builder";

import {
  ConditionBuilder,
  GridPropsBuilder,
  FieldOptionBuilder,
  ValidationBuilder,
} from "../../builders";

import { useConfigBuilder } from "../../hooks";
import { CheckboxConfigField } from "./check-box-fields";

type ExtendedOptionType = OptionType & {
  title?: string;
};

/** Prevent blank screen on render errors */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  state = { hasError: false, message: undefined as string | undefined };

  static getDerivedStateFromError(err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown render error";
    return { hasError: true, message: msg };
  }

  componentDidCatch(err: unknown) {
    // still logs, but UI won't go blank
    // eslint-disable-next-line no-console
    console.error("CheckboxBuilder render error:", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert color="danger" variant="soft">
            <Typography level="title-md">UI crashed while rendering</Typography>
            <Typography level="body-sm" sx={{ mt: 0.5 }}>
              {this.state.message}
            </Typography>
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}

export const CheckBoxComponent = () => {
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

  // Strong safety defaults (prevents many undefined crashes in child components)
  const safeConfig: FieldCheckboxType = {
    ...config,
    field: config.field ?? "",
    label: config.label ?? "",
    groupLabel: config.groupLabel ?? "",
    helperText: config.helperText ?? "",
    options:
      Array.isArray(config.options) && config.options.length > 0
        ? config.options
        : [{ label: "", value: "" }],
    gridProps: (config.gridProps ?? {}) as GridProps,
    validation: (config.validation ?? {}) as ValidationRule,
    conditions: config.conditions,
  };

  // callbacks
  const onOptionsChange = useCallback(
    (props: ExtendedOptionType[]) => handleChange("options", props ?? []),
    [handleChange],
  );

  // IMPORTANT: GridPropsBuilder should output Partial<GridProps>
  const onGridPropsChange = useCallback(
    (props: Partial<GridProps>) => handleChange("gridProps", props ?? {}),
    [handleChange],
  );

  const onValidationChange = useCallback(
    (rules: ValidationRule) => handleChange("validation", rules ?? {}),
    [handleChange],
  );

  const onConditionsChange = useCallback(
    (rules: ConditionType) => handleChange("conditions", rules),
    [handleChange],
  );

  return (
    <ErrorBoundary>
      <Stack direction="column" spacing={4} sx={{ p: 4, maxWidth: 850 }}>
        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography level="h2" sx={{ mb: 3 }}>
              Checkbox Field Builder
            </Typography>

            <CheckboxConfigField
              config={safeConfig}
              initialInput={initialInput ?? ""}
              onChange={handleChange}
              setInitialInput={setInitialInput}
            />

            <FieldOptionBuilder
              onChange={onOptionsChange}
              type={safeConfig.type}
            />

            {/* PASS current value so builder knows used keys and renders correctly */}
            <GridPropsBuilder
              value={safeConfig.gridProps as Partial<GridProps>}
              onChange={onGridPropsChange}
            />

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
      </Stack>
    </ErrorBoundary>
  );
}
