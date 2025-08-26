import { useState } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  Stack,
  Typography,
  Box,
} from "@mui/joy";

import {
  ConditionAction,
  ConditionName,
  PostCondition,
} from "formik-form-builder";
import type {
  ConditionType,
  ConditionGroup,
  ConditionLogic,
  ConditionValue,
} from "formik-form-builder";

type ConditionValueOrArray = ConditionValue | ConditionValue[];

// Helpers to convert value to string for Input, and back
const valueToString = (val: ConditionValueOrArray) => {
  if (val === undefined || val === null) return "";
  if (Array.isArray(val)) return val.join(",");
  return String(val);
};

const stringToValue = (val: string): ConditionValueOrArray => {
  if (val.includes(",")) return val.split(",").map((v) => v.trim());
  return val;
};

interface ConditionBuilderProps {
  onConfirm: (conditions: ConditionType) => void;
}

export default function ConditionBuilder({ onConfirm }: ConditionBuilderProps) {
  const [action, setAction] = useState<ConditionAction | "">("");

  // Only one group with one logic
  const [group, setGroup] = useState<ConditionGroup>({
    group: "",
    groupPostCondition: PostCondition.AND,
    logic: [
      {
        field: "",
        value: undefined,
        condition: ConditionName.EQUALS,
        postCondition: PostCondition.AND,
      } as ConditionLogic,
    ],
  });

  const updateLogic = <K extends keyof ConditionLogic>(
    key: K,
    value: ConditionLogic[K]
  ) => {
    setGroup((prev) => ({
      ...prev,
      logic: [{ ...prev.logic[0], [key]: value }],
    }));
  };

  const handleConfirm = () => {
    onConfirm({ action: action as ConditionAction, groups: [group] });
  };

  return (
    <Stack spacing={3}>
      <Typography level="h4">Conditions:</Typography>

      {/* Action */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography> Action: </Typography>
        <Select
          value={action || ""}
          onChange={(_, val) =>
            setAction(val === "" ? "" : (val as ConditionAction))
          }
          placeholder="Select action"
        >
          {Object.values(ConditionAction).map((a) => (
            <Option key={a} value={a}>
              {a}
            </Option>
          ))}
        </Select>
      </Stack>

      {/* Group name */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Group Name:</Typography>
        <Input
          value={group.group}
          onChange={(e) =>
            setGroup((prev) => ({ ...prev, group: e.target.value }))
          }
          placeholder="Enter group name"
        />
      </Stack>

      {/* Group post condition */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Group Post Condition:</Typography>
        <Select
          placeholder="Select post condition"
          onChange={(_, val) =>
            setGroup((prev) => ({
              ...prev,
              groupPostCondition: val as PostCondition,
            }))
          }
        >
          {Object.values(PostCondition).map((p) => (
            <Option key={p} value={p}>
              {p}
            </Option>
          ))}
        </Select>
      </Stack>

      {/* Single Logic */}
      <Typography level="body-md">Logic: </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Input
          placeholder="Field to reference"
          onChange={(e) => updateLogic("field", e.target.value)}
        />
        <Input
          placeholder="Value"
          value={valueToString(group.logic[0].value)}
          onChange={(e) => updateLogic("value", stringToValue(e.target.value))}
        />
        <Select
          placeholder="Select conditon"
          onChange={(_, val) => updateLogic("condition", val as ConditionName)}
        >
          {Object.values(ConditionName).map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Select post Condition"
          onChange={(_, val) =>
            updateLogic("postCondition", val as PostCondition)
          }
        >
          {Object.values(PostCondition).map((p) => (
            <Option key={p} value={p}>
              {p}
            </Option>
          ))}
        </Select>
      </Stack>

      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Button color="success" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}
