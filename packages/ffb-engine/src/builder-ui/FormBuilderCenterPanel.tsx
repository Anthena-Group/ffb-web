// FormBuilderCenterPanel.tsx
import * as React from "react";
import { useDrop } from "react-dnd";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  Typography,
} from "@mui/joy";
import { ChevronLeft, ChevronRight, Code as CodeIcon, Visibility } from "@mui/icons-material";
import { InputTypes } from "formik-form-builder";

export type PaletteItem = { type: InputTypes; label: string };

export type GreenTheme = {
  accent: string;
  glow: string;
  glow2: string;
};

export type CanvasField = {
  id: string;
  type: InputTypes;
  [k: string]: any;
};

export function FormBuilderCenterPanel({
  green,
  dndPaletteType,
  fields,
  selectedId,
  leftOpen,
  rightOpen,
  setLeftOpen,
  setRightOpen,
  onSelect,
  onMove,
  onDropPaletteItem,
  CanvasFieldRow,
}: {
  green: GreenTheme;
  dndPaletteType: string;
  fields: CanvasField[];
  selectedId: string | null;

  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: (v: boolean) => void;
  setRightOpen: (v: boolean) => void;

  onSelect: (id: string) => void;
  onMove: (from: number, to: number) => void;

  onDropPaletteItem: (item: PaletteItem) => void;

  CanvasFieldRow: React.ComponentType<{
    field: CanvasField;
    selected: boolean;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    index: number;
  }>;
}) {
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: dndPaletteType,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item: PaletteItem) => onDropPaletteItem(item),
    }),
    [dndPaletteType, onDropPaletteItem],
  );

  const canvasGlow = isOver && canDrop;

  return (
    <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <Sheet
        variant="plain"
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {!leftOpen && (
          <Button
            variant="outlined"
            size="sm"
            startDecorator={<ChevronRight />}
            onClick={() => setLeftOpen(true)}
          >
            Elements
          </Button>
        )}

        <Box sx={{ flex: 1 }} />

        <Chip size="sm" variant="soft" sx={{ bgcolor: green.glow, color: green.accent }}>
          Fields: {fields.length}
        </Chip>

        {!rightOpen && (
          <Button
            variant="outlined"
            size="sm"
            endDecorator={<ChevronLeft />}
            onClick={() => setRightOpen(true)}
          >
            Settings
          </Button>
        )}
      </Sheet>

      <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
        <Stack spacing={2.5} sx={{ maxWidth: 980, mx: "auto" }}>
          {/* Drop zone */}
          <Box
            ref={dropRef as any}
            sx={{
              borderRadius: "2xl",
              border: "1px solid",
              borderColor: canvasGlow ? green.accent : "neutral.outlinedBorder",
              bgcolor: canvasGlow ? green.glow2 : "background.surface",
              boxShadow: "sm",
              p: { xs: 2, md: 3 },
              transition: "border-color .12s ease, background-color .12s ease",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={{ minWidth: 0 }}>
                <Typography level="h3">Canvas</Typography>
                <Typography level="body-sm" sx={{ opacity: 0.75, mt: 0.5 }}>
                  Drop items here. Drag handle to reorder.
                </Typography>
              </Box>
              <Chip variant="outlined" size="sm" sx={{ borderColor: green.accent, color: green.accent }}>
                Drag & Drop
              </Chip>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.1}>
              {fields.length === 0 ? (
                <Card
                  variant="soft"
                  sx={{
                    p: 6,
                    borderRadius: "2xl",
                    border: "2px dashed",
                    borderColor: canvasGlow ? green.accent : "neutral.outlinedBorder",
                    textAlign: "center",
                    bgcolor: canvasGlow ? green.glow2 : "background.level1",
                  }}
                >
                  <Typography level="title-lg" sx={{ opacity: 0.8 }}>
                    Drop fields here
                  </Typography>
                  <Typography level="body-sm" sx={{ opacity: 0.65, mt: 1 }}>
                    Tip: click a field to edit it in Settings.
                  </Typography>
                </Card>
              ) : (
                fields.map((f, i) => (
                  <CanvasFieldRow
                    key={f.id}
                    field={f}
                    index={i}
                    selected={selectedId === f.id}
                    onSelect={onSelect}
                    onMove={onMove}
                  />
                ))
              )}
            </Stack>
          </Box>

          {/* Preview + JSON */}
          <Card variant="outlined" sx={{ borderRadius: "2xl", overflow: "hidden", boxShadow: "sm" }}>
            <Tabs defaultValue={0}>
              <TabList
                sx={{
                  px: 1,
                  py: 0.75,
                  bgcolor: "background.level1",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  gap: 0.5,
                }}
              >
                <Tab sx={{ gap: 1, alignItems: "center" }}>
                  <Visibility sx={{ fontSize: 18 }} /> Preview
                </Tab>
                <Tab sx={{ gap: 1, alignItems: "center" }}>
                  <CodeIcon sx={{ fontSize: 18 }} /> JSON
                </Tab>
              </TabList>

              <TabPanel value={0} sx={{ p: 3 }}>
                <Stack spacing={2}>
                  {fields.length === 0 ? (
                    <Typography sx={{ opacity: 0.75 }}>Add fields to see preview.</Typography>
                  ) : (
                    fields.map((f) => {
                      const t = f.type;
                      const lbl = f.label ?? "";
                      const ph = f.placeholder ?? "Enter value";
                      const opts = (f.options ?? []) as { label: string; value: string }[];

                      return (
                        <Box key={f.id}>
                          <Typography level="body-sm" sx={{ mb: 0.5 }}>
                            {lbl}
                          </Typography>

                          {t === InputTypes.SELECT || t === InputTypes.DROPDOWN || t === InputTypes.AUTO_COMPLETE ? (
                            <Select size="sm" sx={{ borderRadius: "lg" }} placeholder="Select...">
                              {opts.map((o) => (
                                <Option key={o.value} value={o.value}>
                                  {o.label}
                                </Option>
                              ))}
                            </Select>
                          ) : t === InputTypes.CHECKBOX ? (
                            <Input size="sm" sx={{ borderRadius: "lg" }} value="(checkbox group)" />
                          ) : t === InputTypes.RADIO ? (
                            <Input size="sm" sx={{ borderRadius: "lg" }} value="(radio group)" />
                          ) : t === InputTypes.DATE ? (
                            <Input size="sm" sx={{ borderRadius: "lg" }} value="(date)" />
                          ) : t === InputTypes.MULTI_TEXT ? (
                            <Textarea minRows={3} placeholder={ph} />
                          ) : (
                            <Input size="sm" sx={{ borderRadius: "lg" }} placeholder={ph} />
                          )}
                        </Box>
                      );
                    })
                  )}
                </Stack>
              </TabPanel>

              <TabPanel value={1} sx={{ p: 0 }}>
                <Textarea
                  minRows={12}
                  readOnly
                  value={JSON.stringify({ group: "MyGroup", fields }, null, 2)}
                  sx={{
                    border: "none",
                    borderRadius: 0,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontSize: 13,
                    bgcolor: "background.level1",
                  }}
                />
              </TabPanel>
            </Tabs>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}