import { Button, Select, Option, Stack } from "@mui/joy";
import type { RuleSelectProps, ValidationRuleType } from "../../../types";

export default function RuleSelect({
  selectedRule,
  setSelectedRule,
  draftRules,
  availableRules,
  onAdd,
}: RuleSelectProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Select
        placeholder="Select Rule"
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
      <Button onClick={onAdd} disabled={!selectedRule}>
        Add
      </Button>
    </Stack>
  );
}
