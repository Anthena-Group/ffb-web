// FormBuilder.tsx
import * as React from "react";
import { useMemo, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Card,
  Divider,
  Input,
  Select,
  Option,
  Stack,
  Typography,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Textarea,
  Button,
  IconButton,
  Sheet,
  Chip,
  Tooltip,
  Alert,
  Switch,
} from "@mui/joy";
import {
  ChevronLeft,
  ChevronRight,
  DragIndicator,
  DeleteOutline,
  AddCircleOutline,
  Visibility,
  Code as CodeIcon,
  Widgets,
  Tune,
} from "@mui/icons-material";

/**
 * IMPORTANT:
 * Update these import paths to match your monorepo.
 * I’m using "formik-form-builder" because that’s what you used in other files.
 */
import {
  InputTypes,
  CHECK_BOX_VALUE_TYPE,
  type ValidationRule,
  type ConditionType,
  type FieldType,
  type OptionType,
} from "formik-form-builder";

/**
 * Your existing premium builders (the ones you uploaded).
 * Update paths based on where your ffb-engine builders live.
 */
import {
  GridPropsBuilder,
  ValidationBuilder,
  ConditionBuilder,
  FieldOptionBuilder,
} from "ffb-engine";

import type { GridProps } from "@mui/joy";

/* -------------------- DnD Types -------------------- */

const DND_TYPES = {
  PALETTE_ITEM: "PALETTE_ITEM",
  CANVAS_FIELD: "CANVAS_FIELD",
} as const;

/* -------------------- Runtime field model -------------------- */
/**
 * Your FieldType union does not guarantee `id` exists, but DnD/select needs it.
 * We enforce `id` at runtime.
 *
 * Also: your enum has DATE + DROPDOWN, but union types you shared don’t include DATE.
 * We still allow them using a safe “UnknownField” shape, so palette can include all InputTypes.
 */

type UnknownField = {
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
  gridProps?: GridProps;
  validation?: ValidationRule;
  conditions?: ConditionType;
  muiProps?: any;
};

type CanvasField = (FieldType | UnknownField) & { id: string };

type PaletteItem = { type: InputTypes; label: string };

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

function ensureId(f: any): CanvasField {
  return { ...f, id: f?.id ?? uid() } as CanvasField;
}

function makeField(type: InputTypes, label: string): CanvasField {
  const id = uid();

  const common: UnknownField = {
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
      return {
        ...common,
        placeholder: "Enter value",
      };

    case InputTypes.MULTI_TEXT:
      return {
        ...common,
        placeholder: "Enter value",
      };

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
      return {
        ...common,
        initialValue: "",
        placeholder: "YYYY-MM-DD",
      };

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

/* -------------------- Theme tokens (GREEN) -------------------- */

const GREEN = {
  accent: "rgba(16,185,129,1)", // emerald-500
  glow: "rgba(16,185,129,0.18)",
  glow2: "rgba(34,197,94,0.10)",
};

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

/* -------------------- Palette Card -------------------- */

function PaletteCard({ item }: { item: PaletteItem }) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_TYPES.PALETTE_ITEM,
      item,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [item],
  );

  const meta = typeMeta(item.type);

  return (
    <Card
      ref={dragRef as any}
      variant="outlined"
      size="sm"
      sx={{
        cursor: "grab",
        userSelect: "none",
        borderRadius: "xl",
        transition: "transform .12s ease, box-shadow .12s ease, border-color .12s ease",
        opacity: isDragging ? 0.55 : 1,
        borderColor: "neutral.outlinedBorder",
        "&:hover": {
          transform: "translateY(-1px)",
          borderColor: GREEN.accent,
          boxShadow: "sm",
          bgcolor: "background.level1",
        },
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "lg",
            display: "grid",
            placeItems: "center",
            bgcolor: GREEN.glow,
            color: GREEN.accent,
          }}
        >
          <AddCircleOutline sx={{ fontSize: "1.1rem" }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography level="title-sm" noWrap>
              {item.label}
            </Typography>
            <Chip size="sm" variant="soft" sx={{ bgcolor: GREEN.glow, color: GREEN.accent }}>
              {meta.chip}
            </Chip>
          </Stack>
          <Typography level="body-xs" sx={{ opacity: 0.72, mt: 0.25 }} noWrap>
            {meta.hint} · Drag to canvas
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

/* -------------------- Canvas Row (compact) -------------------- */

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
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_TYPES.CANVAS_FIELD,
      item: { id: field.id, index },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
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
  const placeholder = (field as any).placeholder ?? "Enter value";
  const options = ((field as any).options ?? []) as { label: string; value: string }[];

  const t = field.type;

  return (
    <Box
      ref={(node: any) => dragRef(dropRef(node))}
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

        <Box sx={{ minWidth: 0 }}>
          {t === InputTypes.SELECT || t === InputTypes.DROPDOWN || t === InputTypes.AUTO_COMPLETE ? (
            <Select
              disabled
              placeholder="Select..."
              size="sm"
              sx={{ borderRadius: "lg", "--Select-minHeight": "32px", fontSize: 13 }}
            >
              {options.slice(0, 1).map((o) => (
                <Option key={o.value} value={o.value}>
                  {o.label}
                </Option>
              ))}
            </Select>
          ) : t === InputTypes.CHECKBOX ? (
            <Input
              disabled
              size="sm"
              value="(checkbox group)"
              sx={{ borderRadius: "lg", "--Input-minHeight": "32px", fontSize: 13 }}
            />
          ) : t === InputTypes.RADIO ? (
            <Input
              disabled
              size="sm"
              value="(radio group)"
              sx={{ borderRadius: "lg", "--Input-minHeight": "32px", fontSize: 13 }}
            />
          ) : t === InputTypes.DATE ? (
            <Input
              disabled
              size="sm"
              value="(date)"
              sx={{ borderRadius: "lg", "--Input-minHeight": "32px", fontSize: 13 }}
            />
          ) : t === InputTypes.MULTI_TEXT ? (
            <Input
              disabled
              size="sm"
              value="(multi text)"
              sx={{ borderRadius: "lg", "--Input-minHeight": "32px", fontSize: 13 }}
            />
          ) : (
            <Input
              disabled
              size="sm"
              placeholder={placeholder}
              sx={{ borderRadius: "lg", "--Input-minHeight": "32px", fontSize: 13 }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* -------------------- Right panel (NEW: uses your builders + all types) -------------------- */

function FieldSettingsPanel({
  selected,
  onPatch,
  onDelete,
}: {
  selected: CanvasField | null;
  onPatch: (patch: Partial<UnknownField>) => void;
  onDelete: () => void;
}) {
  if (!selected) {
    return (
      <Card variant="soft" sx={{ borderRadius: "2xl", p: 3, textAlign: "center", bgcolor: "background.level1" }}>
        <Typography level="title-sm" sx={{ opacity: 0.85 }}>
          Select a field
        </Typography>
        <Typography level="body-sm" sx={{ opacity: 0.65, mt: 0.75 }}>
          Click any item in the canvas to edit it here.
        </Typography>
      </Card>
    );
  }

  const t = selected.type;

  const label = (selected as any).label ?? "";
  const fieldKey = (selected as any).field ?? "";
  const groupLabel = (selected as any).groupLabel ?? "";
  const helperText = (selected as any).helperText ?? "";
  const placeholder = (selected as any).placeholder ?? "";
  const required = Boolean((selected as any).required ?? false);

  const direction = ((selected as any).direction ?? "column") as "row" | "column";
  const outputType = ((selected as any).outputType ?? "string") as "string" | "number" | "boolean";
  const valueType = ((selected as any).valueType ?? CHECK_BOX_VALUE_TYPE.ARRAY) as CHECK_BOX_VALUE_TYPE;
  const variant = ((selected as any).variant ?? "DEFAULT") as "DEFAULT" | "ICON";

  const showPlaceholder = t === InputTypes.TEXT || t === InputTypes.MULTI_TEXT || t === InputTypes.AUTO_COMPLETE || t === InputTypes.DATE;
  const showOptions = t === InputTypes.SELECT || t === InputTypes.DROPDOWN || t === InputTypes.AUTO_COMPLETE || t === InputTypes.RADIO || t === InputTypes.CHECKBOX;

  const showDirection = t === InputTypes.CHECKBOX || t === InputTypes.RADIO;
  const showOutputType = t === InputTypes.RADIO; // per your type file
  const showVariant = t === InputTypes.RADIO; // per your type file
  const showValueType = t === InputTypes.CHECKBOX;

  return (
    <Stack spacing={2}>
      {/* Selected summary */}
      <Card variant="soft" sx={{ borderRadius: "2xl", p: 2, bgcolor: "background.level1" }}>
        <Typography level="body-xs" sx={{ opacity: 0.7 }}>
          Selected
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.75 }}>
          <Chip size="sm" variant="soft" sx={{ bgcolor: GREEN.glow, color: GREEN.accent }}>
            {typeMeta(t).chip}
          </Chip>
          <Typography level="title-sm" noWrap>
            {label || "(no label)"}
          </Typography>
        </Stack>
      </Card>

      {/* Tabs: Core / Options / Grid / Validation / Conditions */}
      <Card variant="outlined" sx={{ borderRadius: "2xl", p: 0, overflow: "hidden", boxShadow: "sm" }}>
        <Tabs defaultValue={0}>
          <TabList
            sx={{
              px: 1,
              py: 0.75,
              bgcolor: "background.level1",
              borderBottom: "1px solid",
              borderColor: "divider",
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            <Tab>Core</Tab>
            <Tab disabled={!showOptions}>Options</Tab>
            <Tab>Grid</Tab>
            <Tab>Validation</Tab>
            <Tab>Conditions</Tab>
          </TabList>

          {/* Core */}
          <TabPanel value={0} sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              <Box>
                <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                  Label
                </Typography>
                <Input
                  value={label}
                  onChange={(e) => onPatch({ label: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </Box>

              <Box>
                <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                  Field Key
                </Typography>
                <Input
                  value={fieldKey}
                  onChange={(e) => onPatch({ field: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </Box>

              <Box>
                <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                  Group Label
                </Typography>
                <Input
                  value={groupLabel}
                  onChange={(e) => onPatch({ groupLabel: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </Box>

              {showPlaceholder && (
                <Box>
                  <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                    Placeholder
                  </Typography>
                  <Input
                    value={placeholder}
                    onChange={(e) => onPatch({ placeholder: e.target.value })}
                    sx={{ borderRadius: "lg" }}
                  />
                </Box>
              )}

              <Box>
                <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                  Helper Text
                </Typography>
                <Input
                  value={helperText}
                  onChange={(e) => onPatch({ helperText: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography level="body-xs" fontWeight="lg" sx={{ opacity: 0.8 }}>
                  Required
                </Typography>
                <Switch
                  checked={required}
                  onChange={(e) => onPatch({ required: e.target.checked })}
                  sx={{
                    "--Switch-trackBackground": required ? GREEN.accent : undefined,
                  }}
                />
              </Box>

              {showDirection && (
                <Box>
                  <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                    Direction
                  </Typography>
                  <Select
                    value={direction}
                    onChange={(_, v) => onPatch({ direction: (v ?? "column") as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value="row">Row</Option>
                    <Option value="column">Column</Option>
                  </Select>
                </Box>
              )}

              {showOutputType && (
                <Box>
                  <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                    Output Type
                  </Typography>
                  <Select
                    value={outputType}
                    onChange={(_, v) => onPatch({ outputType: (v ?? "string") as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                  </Select>
                </Box>
              )}

              {showValueType && (
                <Box>
                  <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                    Checkbox Value Type
                  </Typography>
                  <Select
                    value={valueType}
                    onChange={(_, v) => onPatch({ valueType: (v ?? CHECK_BOX_VALUE_TYPE.ARRAY) as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value={CHECK_BOX_VALUE_TYPE.ARRAY}>Array</Option>
                    <Option value={CHECK_BOX_VALUE_TYPE.STRING}>String</Option>
                    <Option value={CHECK_BOX_VALUE_TYPE.BOOLEAN}>Boolean</Option>
                  </Select>
                </Box>
              )}

              {showVariant && (
                <Box>
                  <Typography level="body-xs" fontWeight="lg" sx={{ mb: 0.75, opacity: 0.8 }}>
                    Radio Variant
                  </Typography>
                  <Select
                    value={variant}
                    onChange={(_, v) => onPatch({ variant: (v ?? "DEFAULT") as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value="DEFAULT">DEFAULT</Option>
                    <Option value="ICON">ICON</Option>
                  </Select>
                </Box>
              )}

              <Divider />

              <Button
                color="danger"
                variant="soft"
                startDecorator={<DeleteOutline />}
                onClick={onDelete}
                sx={{ borderRadius: "xl" }}
              >
                Delete Field
              </Button>
            </Stack>
          </TabPanel>

          {/* Options */}
          <TabPanel value={1} sx={{ p: 0 }}>
            {showOptions ? (
              <Box sx={{ p: 2 }}>
                <FieldOptionBuilder
                  type={t}
                  variant={t === InputTypes.RADIO ? variant : undefined}
                  onChange={(opts: any) => onPatch({ options: opts ?? [] })}
                />
              </Box>
            ) : (
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm" sx={{ opacity: 0.75 }}>
                  This field type does not use options.
                </Typography>
              </Box>
            )}
          </TabPanel>

          {/* Grid */}
          <TabPanel value={2} sx={{ p: 2 }}>
            <GridPropsBuilder
              value={((selected as any).gridProps ?? {}) as Partial<GridProps>}
              onChange={(gp) => onPatch({ gridProps: gp as any })}
            />
          </TabPanel>

          {/* Validation */}
          <TabPanel value={3} sx={{ p: 2 }}>
            <ValidationBuilder
              onChange={(rules: ValidationRule) => onPatch({ validation: (rules ?? {}) as any })}
            />
          </TabPanel>

          {/* Conditions */}
          <TabPanel value={5} sx={{ p: 2 }}>
            <ConditionBuilder onChange={(c: ConditionType) => onPatch({ conditions: c as any })} />
          </TabPanel>
        </Tabs>
      </Card>
    </Stack>
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
    setFields((prev) =>
      prev.map((f) => (f.id === selectedId ? ensureId({ ...(f as any), ...(patch as any) }) : f)),
    );
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

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: DND_TYPES.PALETTE_ITEM,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item: PaletteItem) => {
        const newField = ensureId(makeField(item.type, item.label));
        setFields((prev) => [...prev, newField]);
        setSelectedId(newField.id);
      },
    }),
    [],
  );

  const canvasGlow = isOver && canDrop;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "background.level1",
        display: "flex",
        flexDirection: "column",
        background:
          `radial-gradient(1000px 600px at 15% 0%, ${GREEN.glow}, transparent 60%),` +
          `radial-gradient(900px 500px at 95% 10%, ${GREEN.glow2}, transparent 55%),` +
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.0))",
      }}
    >
      {/* Top App Bar */}
      <Sheet
        variant="plain"
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "xl",
            display: "grid",
            placeItems: "center",
            bgcolor: GREEN.glow,
            color: GREEN.accent,
          }}
        >
          <Typography level="title-sm">FB</Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography level="title-md">Green Form Builder</Typography>
          <Typography level="body-xs" sx={{ opacity: 0.75 }} noWrap>
            Drag elements · Drop on canvas · Select to configure · Preview or export JSON
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Tooltip title={leftOpen ? "Hide elements" : "Show elements"}>
            <IconButton variant="outlined" onClick={() => setLeftOpen((v) => !v)}>
              <Widgets />
            </IconButton>
          </Tooltip>
          <Tooltip title={rightOpen ? "Hide settings" : "Show settings"}>
            <IconButton variant="outlined" onClick={() => setRightOpen((v) => !v)}>
              <Tune />
            </IconButton>
          </Tooltip>
        </Stack>
      </Sheet>

      {/* 3-column body */}
      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* LEFT */}
        <Sheet
          variant="plain"
          sx={{
            width: leftOpen ? 300 : 0,
            flexBasis: leftOpen ? 300 : 0,
            transition: "width .18s ease, flex-basis .18s ease",
            borderRight: leftOpen ? "1px solid" : "none",
            borderColor: "divider",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography level="title-md">Elements</Typography>
              <Typography level="body-xs" sx={{ opacity: 0.7 }}>
                Drag to canvas
              </Typography>
            </Box>
            <IconButton size="sm" variant="outlined" onClick={() => setLeftOpen(false)}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <Divider />
          <Stack spacing={1.25} sx={{ p: 2, overflowY: "auto" }}>
            {PALETTE.map((p) => (
              <PaletteCard key={p.type} item={p} />
            ))}
          </Stack>
        </Sheet>

        {/* CENTER */}
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

            <Chip size="sm" variant="soft" sx={{ bgcolor: GREEN.glow, color: GREEN.accent }}>
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
                  borderColor: canvasGlow ? GREEN.accent : "neutral.outlinedBorder",
                  bgcolor: canvasGlow ? GREEN.glow2 : "background.surface",
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
                  <Chip variant="outlined" size="sm" sx={{ borderColor: GREEN.accent, color: GREEN.accent }}>
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
                        borderColor: canvasGlow ? GREEN.accent : "neutral.outlinedBorder",
                        textAlign: "center",
                        bgcolor: canvasGlow ? GREEN.glow2 : "background.level1",
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
                        onSelect={setSelectedId}
                        onMove={move}
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
                          const lbl = (f as any).label ?? "";
                          const ph = (f as any).placeholder ?? "Enter value";
                          const opts = ((f as any).options ?? []) as { label: string; value: string }[];

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

        {/* RIGHT (UPDATED) */}
        <Sheet
          variant="plain"
          sx={{
            width: rightOpen ? 380 : 0,
            flexBasis: rightOpen ? 380 : 0,
            transition: "width .18s ease, flex-basis .18s ease",
            borderLeft: rightOpen ? "1px solid" : "none",
            borderColor: "divider",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                  bgcolor: GREEN.glow,
                  color: GREEN.accent,
                }}
              >
                <Tune sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography level="title-md">Settings</Typography>
                <Typography level="body-xs" sx={{ opacity: 0.7 }}>
                  Configure selected field
                </Typography>
              </Box>
            </Stack>

            <IconButton size="sm" variant="outlined" onClick={() => setRightOpen(false)}>
              <ChevronRight />
            </IconButton>
          </Box>

          <Divider />

          <Box sx={{ p: 2, overflowY: "auto" }}>
            <FieldSettingsPanel selected={selected} onPatch={patchSelected} onDelete={deleteSelected} />
          </Box>
        </Sheet>
      </Box>
    </Box>
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