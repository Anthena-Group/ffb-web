import { Button, Stack, Typography, Select, Option } from "@mui/joy";
import type {
  ValidationBuilderProps,
  ValidationRuleType,
} from "../../../types";

import {
  IsPositiveRule,
  NumericRule,
  PatternRule,
  RequiredRule,
} from "./validation-rule";
import { useValidationBuilder } from "../../../hooks";
import React from "react";
import type { ValidationRule } from "formik-form-builder";

function ValidationBuilder({ onChange }: ValidationBuilderProps) {
  const {
    draftRules,
    selectedRule,
    setSelectedRule,
    availableRules,
    addRule,
    updateRule,
    deleteRule,
  } = useValidationBuilder(onChange);

  return (
    <Stack spacing={2} mt={2}>
      <Typography level="h4">Validation:</Typography>

      {/* Add Rule */}
      <Stack direction="row" spacing={2}>
        <Select
          placeholder="Select Rule"
          value={selectedRule}
          onChange={(_, value) => setSelectedRule(value as ValidationRuleType)}
        >
          {availableRules.map((rule) => (
            <Option
              key={rule}
              value={rule}
              disabled={draftRules.hasOwnProperty(rule)}
            >
              {rule}
            </Option>
          ))}
        </Select>
        <Button onClick={addRule} disabled={!selectedRule}>
          Add
        </Button>
      </Stack>

      {/* Draft Rules */}
      {Object.keys(draftRules).map((key) => {
        if (key === "required") {
          return (
            <RequiredRule
              key={key}
              message={draftRules.message}
              onChange={(val) => updateRule("message", val)}
              onDelete={() => deleteRule("required")}
            />
          );
        }

        if (key === "isPositive") {
          return (
            <IsPositiveRule
              key={key}
              message={draftRules.isPositiveRuleMsg}
              onChange={(val) => updateRule("isPositiveRuleMsg", val)}
              onDelete={() => deleteRule("isPositive")}
            />
          );
        }

        if (key === "pattern") {
          return (
            <PatternRule
              key={key}
              message={draftRules.patternRuleMsg}
              onMessageChange={(val) => updateRule("patternRuleMsg", val)}
              onPatternChange={(regex) => updateRule("pattern", regex)}
              onDelete={() => deleteRule("pattern")}
            />
          );
        }

        if (
          [
            "minLength",
            "maxLength",
            "minValue",
            "maxValue",
            "moreThan",
            "lessThan",
          ].includes(key)
        ) {
          return (
            <NumericRule
              key={key}
              label={key}
              value={draftRules[key as keyof ValidationRule] as number}
              message={
                draftRules[`${key}RuleMsg` as keyof ValidationRule] as string
              }
              onValueChange={(val) =>
                updateRule(key as ValidationRuleType, val)
              }
              onMessageChange={(val) =>
                updateRule(`${key}RuleMsg` as ValidationRuleType, val)
              }
              onDelete={() => deleteRule(key as ValidationRuleType)}
            />
          );
        }

        return null;
      })}
    </Stack>
  );
}

export default React.memo(ValidationBuilder);
