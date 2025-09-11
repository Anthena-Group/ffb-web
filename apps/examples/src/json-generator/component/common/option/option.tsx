import {
  Box,
  Button,
  Input,
  Stack,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import * as MuiIcons from "@mui/icons-material";
import type { ExtendedOptionType, OptionBuilderProps } from "../../../types";
import { useOptionBuilder } from "../../../hooks";
import { DynamicIcon } from "./dynamic-icon";
import { useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function OptionBuilder({
  onConfirm,
  type,
  variant,
}: OptionBuilderProps) {
  const {
    options,
    handleOptionChange,
    addOption,
    removeOption,
    getValidOptions,
    getIconSuggestions,
  } = useOptionBuilder();

  const showIconField = type === "radio" && variant === "ICON";

  const [isLabel, setIsLabel] = useState<boolean>(true);

  const handleIsLabel = (option: ExtendedOptionType) => {
    isLabel ? (option.label = "") : (option.title = "");
    setIsLabel((prev) => !prev);
  };

  return (
    <Stack spacing={2}>
      <Typography level="h4">Options</Typography>

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

          {/* Search icons */}
          {showIconField && (
            <Autocomplete
              freeSolo
              placeholder="Search icons..."
              options={getIconSuggestions((opt.icon as string) || "")}
              value={opt.icon || null}
              onChange={(_, val) =>
                handleOptionChange(index, "icon", (val as string) || "")
              }
              onInputChange={(_, val) =>
                handleOptionChange(index, "icon", val || "")
              }
              isOptionEqualToValue={(option, value) => option === value}
              sx={{ minWidth: 150 }}
            />
          )}

          {/* Render Icon */}
          {opt.icon && (opt.icon as string) in MuiIcons && (
            <DynamicIcon name={opt.icon as string} />
          )}

          {/* Remove option */}
          {options.length > 1 && (
            <IconButton size="sm" onClick={() => removeOption(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      ))}

      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <Button
          onClick={addOption}
          disabled={
            !(
              options[options.length - 1].label ||
              options[options.length - 1].title
            )?.trim() || !String(options[options.length - 1].value ?? "").trim()
          }
        >
          Add more option
        </Button>

        <Button color="success" onClick={() => onConfirm(getValidOptions())}>
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}
