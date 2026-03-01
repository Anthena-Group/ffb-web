// FormBuilderCenterPanel.tsx
import * as React from "react";
import { useDrop } from "react-dnd";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Modal,
  ModalDialog,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { ChevronLeft, ChevronRight, Code as CodeIcon, Visibility, X } from "@mui/icons-material";
import { InputTypes, type FieldType } from "@mjfy/core";
import { FormBuilderPreview } from "./FormBuilderPreview";
import { FormCodeBuilder } from "./FormCodeBuilder";

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

type PopupMode = "NONE" | "PREVIEW" | "CODE";

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

  const [popup, setPopup] = React.useState<PopupMode>("NONE");
  const closePopup = () => setPopup("NONE");

  const hasFields = fields.length > 0;

  return (
    <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      {/* Top row inside center */}
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
          <Button variant="outlined" size="sm" startDecorator={<ChevronRight />} onClick={() => setLeftOpen(true)}>
            Elements
          </Button>
        )}

        <Box sx={{ flex: 1 }} />

        <Chip size="sm" variant="soft" sx={{ bgcolor: green.glow, color: green.accent }}>
          Fields: {fields.length}
        </Chip>

        {/* ✅ NEW: Buttons instead of inline preview/code */}
        <Button
          size="sm"
          variant="outlined"
          startDecorator={<Visibility />}
          onClick={() => setPopup("PREVIEW")}
          disabled={!hasFields}
          sx={{ ml: 1 }}
        >
          Preview
        </Button>

        <Button
          size="sm"
          variant="outlined"
          startDecorator={<CodeIcon />}
          onClick={() => setPopup("CODE")}
          disabled={!hasFields}
        >
          Code
        </Button>

        {!rightOpen && (
          <Button variant="outlined" size="sm" endDecorator={<ChevronLeft />} onClick={() => setRightOpen(true)}>
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
        </Stack>
      </Box>

      {/* ✅ Modal Popup */}
      <Modal open={popup !== "NONE"} onClose={closePopup}>
        <ModalDialog
          layout="center"
          sx={{
            width: { xs: "95vw", md: "78vw" },
            maxWidth: 980,
            maxHeight: "90vh",
            overflow: "auto",
            p: 0,
            borderRadius: "2xl",
            boxShadow: "lg",
          }}
        >
          {/* Modal Header */}
          <Sheet
            variant="plain"
            sx={{
              px: 2,
              py: 1.25,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              bgcolor: "background.surface",
              zIndex: 1,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "lg",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: green.glow,
                  color: green.accent,
                }}
              >
                {popup === "CODE" ? <CodeIcon /> : <Visibility />}
              </Box>

              <Box>
                <Typography level="title-md" sx={{ fontWeight: 800 }}>
                  {popup === "CODE" ? "Code" : "Preview"}
                </Typography>
                <Typography level="body-xs" sx={{ opacity: 0.7 }}>
                  {popup === "CODE" ? "Copy-paste ready output" : "Live form rendering"}
                </Typography>
              </Box>
            </Stack>

            <Button
              size="sm"
              variant="outlined"
              startDecorator={<X fontSize="small" />}
              onClick={closePopup}
              sx={{ borderRadius: "xl" }}
            >
              Close
            </Button>
          </Sheet>

          {/* Modal Body */}
          <Box sx={{ p: 2 }}>
            {popup === "PREVIEW" ? (
              <FormBuilderPreview fields={fields as unknown as FieldType[]} group="form" />
            ) : popup === "CODE" ? (
              <FormCodeBuilder fields={fields as unknown as FieldType[]} group="MyGroup" />
            ) : null}
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}