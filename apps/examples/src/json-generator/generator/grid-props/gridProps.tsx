import { useState } from "react";
import type { GridPropKey, GridPropsBuilderProps } from "../../types";
import { availableProps } from "./config";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { PropSelect } from "./component";
import { handleAddProp, handleDeleteProp, handleUpdateProp } from "./utils";
import PropField from "./component/PropField";

export default function GridPropsBuilder({ onConfirm }: GridPropsBuilderProps) {
  const [draftProps, setDraftProps] = useState<
    Partial<Record<GridPropKey, number | "auto" | "">>
  >({});
  const [selectedKey, setSelectedKey] = useState<GridPropKey | "">("");
  const remainingKeys = availableProps.filter((key) => !(key in draftProps));

  const handleConfirm = () => {
    const finalProps: Partial<Record<GridPropKey, number | "auto">> = {};
    Object.entries(draftProps).forEach(([key, v]) => {
      if (v !== "") finalProps[key as GridPropKey] = v as number | "auto";
    });
    onConfirm(finalProps);
  };

  return (
    <Stack spacing={2}>
      <Typography level="h4">Grid Props:</Typography>
      <PropSelect
        selectedKey={selectedKey}
        remainingKeys={remainingKeys}
        onChange={setSelectedKey}
        onAdd={() =>
          handleAddProp(selectedKey, draftProps, setDraftProps, setSelectedKey)
        }
      />
      {Object.entries(draftProps).map(([Key, value]) => (
        <PropField
          key={Key}
          propKey={Key as GridPropKey}
          value={value}
          onUpdate={(k, val) => handleUpdateProp(k, val, setDraftProps)}
          onDelete={(k) => handleDeleteProp(k, draftProps, setDraftProps)}
        />
      ))}
      <Box display="flex" justifyContent="center">
        <Button color="success" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}
