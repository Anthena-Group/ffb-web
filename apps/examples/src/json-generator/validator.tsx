import { useState } from "react";
import {
  Button,
  Select,
  Option,
  Input,
  Stack,
  Typography,
  IconButton,
  Box,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ValidationRule } from "formik-form-builder";

type ValidationRuleType =
  | "required"
  | "minLength"
  | "maxLength"
  | "minValue"
  | "maxValue"
  | "pattern"
  | "isPositive"
  | "moreThan"
  | "lessThan";

interface ValidationBuilderProps {
  onConfirm: (rules: ValidationRule) => void;
}

export default function ValidationBuilder({
  onConfirm,
}: ValidationBuilderProps) {
  const [draftRules, setDraftRules] = useState<ValidationRule>({});
  const [selectedRule, setSelectedRule] = useState<ValidationRuleType | null>(
    null
  );

  const availableRules: ValidationRuleType[] = [
    "required",
    "minLength",
    "maxLength",
    "minValue",
    "maxValue",
    "pattern",
    "isPositive",
    "moreThan",
    "lessThan",
  ];

  const handleAddRule = () => {
    if (!selectedRule) return;
    if (draftRules.hasOwnProperty(selectedRule)) return;

    if (selectedRule === "required") {
      setDraftRules((prev) => ({ ...prev, required: true, message: "" }));
    } else if (selectedRule === "isPositive") {
      setDraftRules((prev) => ({
        ...prev,
        isPositive: true,
        isPositiveRuleMsg: "",
      }));
    } else if (selectedRule === "pattern") {
      setDraftRules((prev) => ({ ...prev, pattern: /.+/, patternRuleMsg: "" }));
    } else {
      setDraftRules((prev) => ({
        ...prev,
        [selectedRule]: undefined,
        [`${selectedRule}RuleMsg`]: "",
      }));
    }

    setSelectedRule(null);
  };

  const handleUpdate = (key: keyof ValidationRule, value: any) => {
    setDraftRules((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeleteRule = (key: ValidationRuleType) => {
    const newDraft = { ...draftRules };
    delete newDraft[key];
    // delete related message key
    const msgKey = `${key}RuleMsg` as keyof ValidationRule;
    delete (newDraft as any)[msgKey];
    setDraftRules(newDraft);
  };

  const handleConfirm = () => {
    const filtered: ValidationRule = Object.fromEntries(
      Object.entries(draftRules).filter(([_, v]) => v !== undefined && v !== "")
    ) as ValidationRule;
    onConfirm(filtered);
  };

  return (
    <Stack spacing={2}>
      <Typography level="h4">Validation:</Typography>

      {/* Add Rule */}
      <Stack direction="row" spacing={2}>
        <Select
          placeholder="Select Rule"
          value={selectedRule ?? ""}
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
        <Button onClick={handleAddRule} disabled={!selectedRule}>
          Add
        </Button>
      </Stack>

      {/* Draft Rules */}
      {Object.keys(draftRules).map((key) => {
        if (key === "required") {
          return (
            <Stack key={key} spacing={1} direction="row" alignItems="center">
              <Typography flex={0.4}>Required</Typography>
              <Input
                placeholder="Message"
                value={draftRules.message ?? ""}
                onChange={(e) => handleUpdate("message", e.target.value)}
              />
              <IconButton onClick={() => handleDeleteRule("required")}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        }

        if (key === "isPositive") {
          return (
            <Stack key={key} spacing={1} direction="row" alignItems="center">
              <Typography flex={0.4}>Must be Positive</Typography>
              <Input
                placeholder="Message"
                value={draftRules.isPositiveRuleMsg ?? ""}
                onChange={(e) =>
                  handleUpdate("isPositiveRuleMsg", e.target.value)
                }
              />
              <IconButton onClick={() => handleDeleteRule("isPositive")}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        }

        if (key === "pattern") {
          return (
            <Stack key={key} spacing={1} direction="row" alignItems="center">
              <Typography flex={0.4}>Pattern</Typography>
              <Input
                placeholder="Regex"
                onChange={(e) =>
                  handleUpdate("pattern", new RegExp(e.target.value))
                }
              />
              <Input
                placeholder="Message"
                value={draftRules.patternRuleMsg ?? ""}
                onChange={(e) => handleUpdate("patternRuleMsg", e.target.value)}
              />
              <IconButton
                onClick={() => handleDeleteRule("pattern")}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
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
            <Stack key={key} spacing={1} direction="row" alignItems="center">
              <Typography flex={1}>{key}</Typography>
              <Input
                type="number"
                placeholder="Value"
                value={(draftRules as any)[key] ?? ""}
                onChange={(e) =>
                  handleUpdate(
                    key as keyof ValidationRule,
                    Number(e.target.value)
                  )
                }
              />
              <Input
                placeholder={`enter ${key} rule message`}
                value={(draftRules as any)[`${key}RuleMsg`] ?? ""}
                onChange={(e) =>
                  handleUpdate(
                    `${key}RuleMsg` as keyof ValidationRule,
                    e.target.value
                  )
                }
              />
              <IconButton
                onClick={() => handleDeleteRule(key as ValidationRuleType)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        }
        return null;
      })}

      {/* Confirm */}
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button color="success" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}
