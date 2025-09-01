import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ValidationRule } from "formik-form-builder";
import type { RuleFieldProps } from "../../../types";

export default function RuleField({
  ruleKey,
  draftRules,
  onUpdate,
  onDelete,
}: RuleFieldProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={1}>{ruleKey}</Typography>
      <Input
        type="number"
        placeholder="Value"
        value={(draftRules as any)[ruleKey] ?? ""}
        onChange={(e) =>
          onUpdate(ruleKey as keyof ValidationRule, Number(e.target.value))
        }
      />
      <Input
        placeholder={`enter ${ruleKey} rule message`}
        value={(draftRules as any)[`${ruleKey}RuleMsg`] ?? ""}
        onChange={(e) =>
          onUpdate(`${ruleKey}RuleMsg` as keyof ValidationRule, e.target.value)
        }
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
