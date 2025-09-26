import {
  Button,
  Input,
  Stack,
  Typography,
  IconButton,
  Autocomplete,
  Box,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import * as MuiIcons from "@mui/icons-material";
import type { ExtendedOptionType, OptionBuilderProps } from "../../../types";
import { useOptionBuilder } from "../../../hooks";
import React, { useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function OptionBuilder({ onChange, type, variant }: OptionBuilderProps) {
  const {
    options,
    handleOptionChange,
    addOption,
    removeOption,
    getIconSuggestions,
  } = useOptionBuilder(onChange);

  const showIconField = type === "radio" && variant === "ICON";
  const [isLabel, setIsLabel] = useState<boolean>(true);

  const [iconInputs, setIconInputs] = useState<string[]>([]);

  const handleIsLabel = (option: ExtendedOptionType) => {
    isLabel ? (option.label = "") : (option.title = "");
    setIsLabel((prev) => !prev);
  };

  const handleIconInputChange = (index: number, val: string) => {
    setIconInputs((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  return (
    <Stack spacing={2} mt={2}>
      <Box display={"flex"} gap={3}>
        <Typography level="h4">Options</Typography>
        <Button
          onClick={addOption}
          disabled={
            !(
              options[options.length - 1].label ||
              options[options.length - 1].title
            )?.trim() || !String(options[options.length - 1].value ?? "").trim()
          }
        >
          Add option
        </Button>
      </Box>

      {options.map((opt, index) => (
        <Stack key={index} direction="row" spacing={1} alignItems="center">
          {/* Label OR Title */}
          {isLabel ? (
            <Input
              placeholder="Label"
              value={opt.label || ""}
              endDecorator={
                <IconButton onClick={() => handleIsLabel(opt)}>
                  <AutorenewIcon fontSize="small" />
                </IconButton>
              }
              onChange={(e) =>
                handleOptionChange(index, "label", e.target.value)
              }
            />
          ) : (
            <Input
              placeholder="Title (alternative)"
              value={opt.title || ""}
              endDecorator={
                <IconButton onClick={() => handleIsLabel(opt)}>
                  <AutorenewIcon fontSize="small" />
                </IconButton>
              }
              onChange={(e) =>
                handleOptionChange(index, "title", e.target.value)
              }
            />
          )}

          {/* Value */}
          <Input
            placeholder="Value"
            value={String(opt.value)}
            onChange={(e) => handleOptionChange(index, "value", e.target.value)}
          />

          {/* Description */}
          <Input
            placeholder="Description (optional)"
            value={opt.description || ""}
            onChange={(e) =>
              handleOptionChange(index, "description", e.target.value)
            }
          />

          {/* Icon Search */}
          {showIconField && (
            <Autocomplete
              freeSolo
              placeholder="Search icons..."
              options={getIconSuggestions(iconInputs[index] || "")}
              value={iconInputs[index] || ""}
              onInputChange={(_, val) => {
                handleIconInputChange(index, val);
              }}
              onChange={(_, val) => {
                if (val && typeof val === "string" && val in MuiIcons) {
                  const IconComp = (MuiIcons as any)[val];
                  handleOptionChange(index, "icon", <IconComp />);
                  handleIconInputChange(index, val);
                } else {
                  handleOptionChange(index, "icon", null);
                  handleIconInputChange(index, "");
                }
              }}
              isOptionEqualToValue={(option, value) => option === value}
              sx={{ minWidth: 150 }}
            />
          )}

          {/* Remove option */}
          {options.length > 1 && (
            <IconButton size="sm" onClick={() => removeOption(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

export default React.memo(OptionBuilder);
