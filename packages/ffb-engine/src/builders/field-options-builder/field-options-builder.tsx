import React, { useState } from "react";
import {
  Button, Input, Stack, Typography, IconButton, Autocomplete,
  Box, Divider, Tooltip, AutocompleteOption, ListItemDecorator, ListItemContent, Sheet
} from "@mui/joy";
import { 
  ListTree, Plus, Trash2, RefreshCcw, Type, Fingerprint, 
  AlignLeft, Smile, Info, ChevronDown, MoreHorizontal
} from "lucide-react";
import * as MuiIcons from "@mui/icons-material";
import type { ExtendedOptionType, OptionBuilderProps } from "./types";
import { useOptionBuilder } from "./hooks";

export const FieldOptionBuilder = React.memo(({ onChange, type, variant, value }: OptionBuilderProps) => {
  const { options, handleOptionChange, addOption, removeOption, getIconSuggestions } = useOptionBuilder(onChange, value);
  const showIconField = type === "radio" && variant === "ICON";
  const [isLabel, setIsLabel] = useState<boolean>(true);
  const [iconInputs, setIconInputs] = useState<string[]>([]);

  const handleIconInputChange = (index: number, val: string) => {
    setIconInputs(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      {/* --- PREMIUM HEADER --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, px: 0.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ 
            display: 'flex', p: 0.75, borderRadius: '10px', 
            bgcolor: 'primary.softBg', color: 'primary.solidBg',
            boxShadow: '0 2px 10px -2px var(--joy-palette-primary-main)'
          }}>
            <ListTree size={16} />
          </Box>
          <Box>
            <Typography level="title-sm" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>Data Options</Typography>
            <Typography level="body-xs" sx={{ opacity: 0.6 }}>Manage list items</Typography>
          </Box>
        </Stack>
        <Button
          size="sm"
          variant="soft"
          color="primary"
          startDecorator={<Plus size={14} />}
          onClick={addOption}
          sx={{ 
            borderRadius: 'xl', fontSize: 'xs', fontWeight: 700,
            transition: '0.2s', '&:hover': { transform: 'translateY(-1px)' }
          }}
        >
          Add Item
        </Button>
      </Stack>

      {/* --- OPTIONS LIST --- */}
      <Stack spacing={2} sx={{ position: 'relative' }}>
        {options.map((opt, index) => (
          <Sheet
            key={index}
            variant="outlined"
            sx={{
              p: 1.5,
              borderRadius: "xl",
              bgcolor: "background.surface",
              border: '1px solid',
              borderColor: 'neutral.outlineBorder',
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": { 
                borderColor: "primary.softBg", 
                boxShadow: "0 8px 20px -12px rgba(0,0,0,0.15)",
                "& .delete-action": { opacity: 1 }
              }
            }}
          >
            {/* Index Badge */}
            <Typography 
              level="body-xs" 
              sx={{ 
                position: 'absolute', top: -8, left: 12, px: 0.5, 
                bgcolor: 'background.surface', fontWeight: 800, fontSize: '10px', 
                color: 'neutral.400', letterSpacing: '0.05em' 
              }}
            >
              ITEM {index + 1}
            </Typography>

            <Stack spacing={1.5}>
              {/* PRIMARY ROW: Identity */}
              <Stack direction="row" spacing={1}>
                <Input
                  size="sm"
                  variant="plain"
                  placeholder={isLabel ? "User-facing Label" : "Internal Title"}
                  value={isLabel ? (opt.label || "") : (opt.title || "")}
                  onChange={(e) => handleOptionChange(index, isLabel ? "label" : "title", e.target.value)}
                  startDecorator={isLabel ? <Type size={14} color="gray" /> : <AlignLeft size={14} color="gray" />}
                  sx={{ 
                    flex: 1, fontWeight: 600, bgcolor: 'background.level1',
                    borderRadius: 'lg', border: '1px solid transparent',
                    '&:focus-within': { borderColor: 'primary.softBg', bgcolor: 'background.surface' }
                  }}
                  endDecorator={
                    <Tooltip title="Toggle Label/Title" variant="soft" size="sm">
                      <IconButton size="sm" variant="plain" onClick={() => setIsLabel(!isLabel)}>
                        <RefreshCcw size={12} />
                      </IconButton>
                    </Tooltip>
                  }
                />
                
                <Input
                  size="sm"
                  variant="soft"
                  color="neutral"
                  placeholder="ID"
                  value={String(opt.value)}
                  onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                  startDecorator={<Fingerprint size={12} />}
                  sx={{ 
                    width: 75, fontFamily: 'monospace', fontSize: '10px',
                    fontWeight: 700, borderRadius: 'lg'
                  }}
                />
              </Stack>

              {/* SECONDARY ROW: Metadata */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Input
                  size="sm"
                  variant="plain"
                  placeholder="Description (Optional context)"
                  value={opt.description || ""}
                  onChange={(e) => handleOptionChange(index, "description", e.target.value)}
                  startDecorator={<Info size={14} />}
                  sx={{ 
                    flex: 1, fontSize: 'xs', opacity: 0.7,
                    '&:focus-within': { opacity: 1 }
                  }}
                />

                {showIconField && (
                  <Autocomplete
                    size="sm"
                    placeholder="Icon"
                    options={getIconSuggestions(iconInputs[index] || "")}
                    value={iconInputs[index] || ""}
                    onInputChange={(_, val) => handleIconInputChange(index, val)}
                    onChange={(_, val) => {
                       if (val && typeof val === "string" && val in MuiIcons) {
                        const IconComp = (MuiIcons as any)[val];
                        handleOptionChange(index, "icon", <IconComp sx={{ fontSize: 16 }} />);
                        handleIconInputChange(index, val);
                      }
                    }}
                    renderOption={(props, option) => {
                      const IconPreview = (MuiIcons as any)[option];
                      return (
                        <AutocompleteOption {...props} sx={{ fontSize: 'xs', py: 0.5 }}>
                          <ListItemDecorator>{IconPreview && <IconPreview sx={{ fontSize: 16 }} />}</ListItemDecorator>
                          <ListItemContent>{option}</ListItemContent>
                        </AutocompleteOption>
                      );
                    }}
                    sx={{ width: 90, borderRadius: 'lg', '--Input-radius': '8px' }}
                  />
                )}

                <IconButton 
                  className="delete-action"
                  size="sm" 
                  variant="soft" 
                  color="danger" 
                  onClick={() => removeOption(index)}
                  disabled={options.length === 1}
                  sx={{ 
                    opacity: 0, transition: '0.2s', borderRadius: 'lg',
                    '--IconButton-size': '28px'
                  }}
                >
                  <Trash2 size={14} />
                </IconButton>
              </Stack>
            </Stack>
          </Sheet>
        ))}
      </Stack>

      {/* --- EMPTY STATE --- */}
      {options.length === 0 && (
        <Sheet 
          variant="outlined" 
          sx={{ 
            p: 4, textAlign: 'center', borderRadius: 'xl', 
            bgcolor: 'transparent', borderColor: 'neutral.outlineBorder' 
          }}
        >
          <Typography level="body-xs" sx={{ color: 'neutral.400' }}>
            No options defined. Add one to start.
          </Typography>
        </Sheet>
      )}
    </Box>
  );
});