import { Box, Button, Stack, Typography, Select, Option } from "@mui/joy";
import type { GridPropKey, GridPropsBuilderProps } from "../../../types";
import { useGridPropsBuilder } from "../../../hooks";
import { GRID_PROP_KEYS } from "../../../constants";
import { GridPropRow } from "./props";
import React from "react";

function GridPropsBuilder({ onConfirm }: GridPropsBuilderProps) {
  const {
    draftProps,
    selectedKey,
    setSelectedKey,
    addProp,
    updateProps,
    deleteProps,
    confirmProps,
  } = useGridPropsBuilder();

  const remainingKeys = GRID_PROP_KEYS.filter((k) => !(k in draftProps));

  return (
    <Stack spacing={2}>
      <Typography level="h4">Grid Props:</Typography>

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
        <Button onClick={addProp} disabled={!selectedKey}>
          Add
        </Button>
      </Stack>

      {/* Draft props */}
      {(Object.keys(draftProps) as GridPropKey[]).map((key) => (
        <GridPropRow
          key={key}
          propKey={key as GridPropKey}
          value={draftProps[key] ?? "auto"}
          onChange={updateProps}
          onDelete={deleteProps}
        />
      ))}

      {/* Confirm */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button color="success" onClick={() => onConfirm(confirmProps())}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}

export default React.memo(GridPropsBuilder);
