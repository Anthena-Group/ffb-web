import { useState } from "react";
import { Stack, Typography, Box, Button } from "@mui/joy";
import type { ValidationRule } from "formik-form-builder";
import type {
  OnUpdate,
  ValidationBuilderProps,
  ValidationRuleType,
} from "../../types";
import { availableRules } from "./config";
import { RuleSelect } from "./components";
import { handleAddRule, handleDeleteRule, handleUpdate } from "./utills";
import { ruleMap } from "./config/ruleMap";

export default function ValidationBuilder({
  onConfirm,
}: ValidationBuilderProps) {
  const [draftRules, setDraftRules] = useState<ValidationRule>({});
  const [selectedRule, setSelectedRule] = useState<ValidationRuleType | null>(
    null
  );

  const confirmHandler = () => {
    const filtered: ValidationRule = Object.fromEntries(
      Object.entries(draftRules).filter(([_, v]) => v !== undefined && v !== "")
    ) as ValidationRule;
    onConfirm(filtered);
  };

  const onUpdate: OnUpdate = (field, value) =>
    handleUpdate(field, value, setDraftRules);

  return (
    <Stack spacing={2}>
      <Typography level="h4">Validation:</Typography>

      <RuleSelect
        selectedRule={selectedRule}
        setSelectedRule={setSelectedRule}
        draftRules={draftRules}
        availableRules={availableRules}
        onAdd={() =>
          handleAddRule(
            selectedRule,
            draftRules,
            setDraftRules,
            setSelectedRule
          )
        }
      />

      {Object.keys(draftRules).map((key) => {
        const Component = ruleMap[key as ValidationRuleType];
        if (!Component) return null;

        return (
          <Component
            key={key}
            ruleKey={key as ValidationRuleType}
            draftRules={draftRules}
            onUpdate={onUpdate}
            onDelete={() =>
              handleDeleteRule(
                key as ValidationRuleType,
                draftRules,
                setDraftRules
              )
            }
          />
        );
      })}

      <Box display="flex" justifyContent="center">
        <Button color="success" onClick={confirmHandler}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}
