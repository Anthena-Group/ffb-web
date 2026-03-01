// FormBuilder.tsx
import * as React from "react";
import { useMemo, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Box, Tooltip, Chip, Stack, Typography, Input, Select, Option, Alert } from "@mui/joy";
import { DragIndicator } from "@mui/icons-material";

import {
  InputTypes,
  CHECK_BOX_VALUE_TYPE,
  type FieldType,
  type OptionType,
} from "formik-form-builder";

import { FormBuilderLayout } from "./FormBuilderLayout";
import { FormBuilderLeftPanel, type PaletteItem } from "./FormBuilderLeftPanel";
import { FormBuilderRightPanel, type UnknownField, type CanvasField as RightCanvasField } from "./FormBuilderRightPanel";
import { FormBuilderCenterPanel, type CanvasField as CenterCanvasField } from "./FormBuilderCenterPanel";

/* -------------------- DnD Types -------------------- */
const DND_TYPES = {
  PALETTE_ITEM: "PALETTE_ITEM",
  CANVAS_FIELD: "CANVAS_FIELD",
} as const;

/* -------------------- Theme tokens (GREEN) -------------------- */
export const GREEN = {
  accent: "rgba(16,185,129,1)",
  glow: "rgba(16,185,129,0.18)",
  glow2: "rgba(34,197,94,0.10)",
};

/* -------------------- Helpers -------------------- */
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function typeMeta(type: InputTypes) {
  switch (type) {
    case InputTypes.TEXT:
      return { chip: "Text", hint: "Single line input" };
    case InputTypes.MULTI_TEXT:
      return { chip: "Multi", hint: "Textarea / multiline" };
    case InputTypes.CHECKBOX:
      return { chip: "Checkbox", hint: "Multiple selection" };
    case InputTypes.RADIO:
      return { chip: "Radio", hint: "Single choice" };
    case InputTypes.SELECT:
      return { chip: "Select", hint: "Dropdown options" };
    case InputTypes.AUTO_COMPLETE:
      return { chip: "Auto", hint: "Searchable options" };
    case InputTypes.DROPDOWN:
      return { chip: "Dropdown", hint: "Dropdown (alt)" };
    case InputTypes.DATE:
      return { chip: "Date", hint: "Date picker" };
    default:
      return { chip: "Field", hint: "Form field" };
  }
}

type UnknownFieldLocal = {
  id: string;
  type: InputTypes;
  field: string;
  label?: string;
  groupLabel?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  initialValue?: any;
  options?: OptionType[];
  direction?: "row" | "column";
  valueType?: CHECK_BOX_VALUE_TYPE;
  outputType?: "string" | "number" | "boolean";
  variant?: "DEFAULT" | "ICON";
  gridProps?: any;
  validation?: any;
  conditions?: any;
  muiProps?: any;
};

type CanvasField = (FieldType | UnknownFieldLocal) & { id: string };

function ensureId(f: any): CanvasField {
  return { ...f, id: f?.id ?? uid() } as CanvasField;
}

function makeField(type: InputTypes, label: string): CanvasField {
  const id = uid();

  const common: UnknownFieldLocal = {
    id,
    type,
    field: `${type}_${id}`,
    label,
    groupLabel: "",
    helperText: "",
    placeholder: "",
    required: false,
    initialValue: "",
    gridProps: {},
    validation: {},
    conditions: undefined,
  };

  switch (type) {
    case InputTypes.TEXT:
    case InputTypes.MULTI_TEXT:
      return { ...common, placeholder: "Enter value" };

    case InputTypes.CHECKBOX:
      return {
        ...common,
        initialValue: [],
        direction: "column",
        valueType: CHECK_BOX_VALUE_TYPE.ARRAY,
        options: [{ label: "Option 1", value: "opt1" }],
      };

    case InputTypes.RADIO:
      return {
        ...common,
        initialValue: "",
        direction: "column",
        outputType: "string",
        variant: "DEFAULT",
        options: [
          { label: "Option 1", value: "opt1" },
          { label: "Option 2", value: "opt2" },
        ],
      };

    case InputTypes.SELECT:
    case InputTypes.AUTO_COMPLETE:
    case InputTypes.DROPDOWN:
      return {
        ...common,
        initialValue: "",
        options: [
          { label: "Option 1", value: "opt1" },
          { label: "Option 2", value: "opt2" },
        ],
      };

    case InputTypes.DATE:
      return { ...common, initialValue: "", placeholder: "YYYY-MM-DD" };

    default:
      return common;
  }
}

/* -------------------- Error Boundary -------------------- */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  state = { hasError: false, message: undefined as string | undefined };

  static getDerivedStateFromError(err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown UI error";
    return { hasError: true, message };
  }

  componentDidCatch(err: unknown) {
    // eslint-disable-next-line no-console
    console.error("FormBuilder UI crashed:", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert color="danger" variant="soft">
            <Typography level="title-md">UI crashed</Typography>
            <Typography level="body-sm" sx={{ mt: 0.5 }}>
              {this.state.message}
            </Typography>
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}

/* -------------------- Palette -------------------- */
const PALETTE: PaletteItem[] = [
  { type: InputTypes.TEXT, label: "Text" },
  { type: InputTypes.MULTI_TEXT, label: "Multi Text" },
  { type: InputTypes.CHECKBOX, label: "Checkbox" },
  { type: InputTypes.RADIO, label: "Radio" },
  { type: InputTypes.SELECT, label: "Select" },
  { type: InputTypes.AUTO_COMPLETE, label: "Autocomplete" },
  { type: InputTypes.DROPDOWN, label: "Dropdown" },
  { type: InputTypes.DATE, label: "Date" },
];

/* -------------------- Canvas Row -------------------- */
function CanvasFieldRow({
  field,
  selected,
  onSelect,
  onMove,
  index,
}: {
  field: CanvasField;
  selected: boolean;
  onSelect: (id: string) => void;
  onMove: (from: number, to: number) => void;
  index: number;
}) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_TYPES.CANVAS_FIELD,
      item: { id: field.id, index },
      collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
    }),
    [field.id, index],
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: DND_TYPES.CANVAS_FIELD,
      hover: (item: { id: string; index: number }) => {
        if (item.index === index) return;
        onMove(item.index, index);
        item.index = index;
      },
    }),
    [index, onMove],
  );

  const meta = typeMeta(field.type);
  const fieldKey = (field as any).field ?? field.id;

  return (
    <Box
      ref={(node: any) => {
        dragRef(dropRef(node));
      }}
      onClick={() => onSelect(field.id)}
      sx={{
        position: "relative",
        borderRadius: "xl",
        border: "1px solid",
        borderColor: selected ? GREEN.accent : "neutral.outlinedBorder",
        bgcolor: selected ? GREEN.glow2 : "background.surface",
        boxShadow: selected ? "sm" : "none",
        transition: "box-shadow .12s ease, transform .12s ease, border-color .12s ease",
        cursor: "pointer",
        opacity: isDragging ? 0.65 : 1,
        "&:hover": { boxShadow: "sm", transform: "translateY(-1px)" },
        "&::before": {
          content: '""',
          position: "absolute",
          left: 10,
          top: 10,
          bottom: 10,
          width: 3,
          borderRadius: "xl",
          bgcolor: selected ? GREEN.accent : "neutral.softBg",
          opacity: selected ? 1 : 0.7,
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "24px minmax(160px, 220px) 1fr",
          gap: 10,
          alignItems: "center",
          p: 1.1,
        }}
      >
        <Tooltip title="Drag to reorder">
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <DragIndicator sx={{ color: "neutral.tertiary", fontSize: 18 }} />
          </Box>
        </Tooltip>

        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Chip
              size="sm"
              variant="soft"
              sx={{
                bgcolor: GREEN.glow,
                color: GREEN.accent,
                "--Chip-minHeight": "18px",
                fontSize: 11,
                px: 0.75,
              }}
            >
              {meta.chip}
            </Chip>

            <Typography level="body-xs" sx={{ opacity: 0.7 }} noWrap>
              {fieldKey}
            </Typography>
          </Stack>

          <Typography level="title-sm" sx={{ mt: 0.2, lineHeight: 1.15 }} noWrap>
            {(field as any).label ?? "Untitled"}
          </Typography>
        </Box>

        {/* lightweight preview chip */}
        <Input disabled size="sm" value="(preview)" sx={{ borderRadius: "lg", "--Input-minHeight": "32px" }} />
      </Box>
    </Box>
  );
}

/* -------------------- Main Builder -------------------- */
const BuilderContent = () => {
  const [fields, setFields] = useState<CanvasField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const selected = useMemo(() => fields.find((f) => f.id === selectedId) ?? null, [fields, selectedId]);

  const patchSelected = (patch: Partial<UnknownField>) => {
    if (!selectedId) return;
    setFields((prev) => prev.map((f) => (f.id === selectedId ? ensureId({ ...(f as any), ...(patch as any) }) : f)));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setFields((prev) => prev.filter((f) => f.id !== selectedId));
    setSelectedId(null);
  };

  const move = (from: number, to: number) => {
    setFields((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const onDropPaletteItem = (item: PaletteItem) => {
    const newField = ensureId(makeField(item.type, item.label));
    setFields((prev) => [...prev, newField]);
    setSelectedId(newField.id);
  };

  return (
    <FormBuilderLayout
      green={GREEN}
      leftOpen={leftOpen}
      rightOpen={rightOpen}
      onToggleLeft={() => setLeftOpen((v) => !v)}
      onToggleRight={() => setRightOpen((v) => !v)}
      left={
        <FormBuilderLeftPanel
          leftOpen={leftOpen}
          setLeftOpen={setLeftOpen}
          palette={PALETTE}
          dndPaletteType={DND_TYPES.PALETTE_ITEM}
          green={{ accent: GREEN.accent, glow: GREEN.glow }}
          typeMeta={typeMeta}
        />
      }
      center={
        <FormBuilderCenterPanel
          green={GREEN}
          dndPaletteType={DND_TYPES.PALETTE_ITEM}
          fields={fields as unknown as CenterCanvasField[]}
          selectedId={selectedId}
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          setLeftOpen={setLeftOpen}
          setRightOpen={setRightOpen}
          onSelect={setSelectedId}
          onMove={move}
          onDropPaletteItem={onDropPaletteItem}
          CanvasFieldRow={CanvasFieldRow as any}
        />
      }
      right={
        <FormBuilderRightPanel
          rightOpen={rightOpen}
          setRightOpen={setRightOpen}
          selected={selected as unknown as RightCanvasField | null}
          onPatch={patchSelected}
          onDelete={deleteSelected}
          green={GREEN}
          typeMeta={typeMeta}
        />
      }
    />
  );
};

/* -------------------- Exported Wrapper -------------------- */
export const FormBuilder = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ErrorBoundary>
        <BuilderContent />
      </ErrorBoundary>
    </DndProvider>
  );
};