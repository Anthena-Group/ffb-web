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

type GridPropKey = "xs" | "sm" | "md" | "lg" | "xl";

interface GridPropsBuilderProps {
  onConfirm: (props: Partial<Record<GridPropKey, number | "auto">>) => void;
}

export default function GridPropsBuilder({ onConfirm }: GridPropsBuilderProps) {
  const [draftProps, setDraftProps] = useState<
    Partial<Record<GridPropKey, number | "auto" | "">>
  >({});
  const [selectedKey, setSelectedKey] = useState<GridPropKey | "">("");

  const availableKeys: GridPropKey[] = ["xs", "sm", "md", "lg", "xl"];
  const remainingKeys = availableKeys.filter((k) => !(k in draftProps));

  const handleAddProp = () => {
    if (!selectedKey || draftProps[selectedKey]) return;
    setDraftProps((prev) => ({ ...prev, [selectedKey]: "" }));
    setSelectedKey("");
  };

  const handleUpdate = (key: GridPropKey, value: string) => {
    setDraftProps((prev) => ({
      ...prev,
      [key]: value === "auto" ? "auto" : Number(value),
    }));
  };

  const handleDelete = (key: GridPropKey) => {
    const newProps = { ...draftProps };
    delete newProps[key];
    setDraftProps(newProps);
  };

  const handleConfirm = () => {
    const finalProps: Partial<Record<GridPropKey, number | "auto">> = {};
    Object.entries(draftProps).forEach(([k, v]) => {
      if (v !== "") finalProps[k as GridPropKey] = v as number | "auto";
    });
    onConfirm(finalProps);
  };
  return (
    <Stack spacing={2}>
      <Typography level="h4">Grid Props:</Typography>

      {/* Add prop */}
      <Stack direction="row" spacing={2}>
        <Select
          placeholder="Select Grid Prop"
          value={selectedKey}
          onChange={(_, val) => setSelectedKey(val as GridPropKey)}
        >
          {remainingKeys.map((k) => (
            <Option key={k} value={k}>
              {k}
            </Option>
          ))}
        </Select>
        <Button onClick={handleAddProp} disabled={!selectedKey}>
          Add
        </Button>
      </Stack>

      {/* Draft props */}
      {Object.keys(draftProps).map((key) => {
        const k = key as GridPropKey;
        const value = draftProps[k];
        return (
          <Stack
            key={k}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent={"start"}
          >
            <Typography flex={0.3}>{k}</Typography>
            <Input 
              placeholder="number or 'auto'"
              value={value}
              onChange={(e) => handleUpdate(k, e.target.value)}
            />
            <IconButton onClick={() => handleDelete(k)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      })}
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button color="success" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}
