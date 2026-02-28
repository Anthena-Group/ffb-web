import * as React from "react";
import type { GridProps } from "@mui/joy";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Typography,
  Chip,
  Divider,
  Card,
  Tooltip,
} from "@mui/joy";
// Icons make a UI feel "Premium" - assuming standard Lucide-style naming or similar
import { Plus, Check, Trash2, LayoutGrid, Zap } from "lucide-react";

export const GRID_PROP_KEYS = ["xs", "sm", "md", "lg", "xl"] as const;
type GridPropKey = (typeof GRID_PROP_KEYS)[number];

type DraftRow = {
  key: GridPropKey;
  draftValue: string;
};

type GridPropsBuilderProps = {
  value?: Partial<GridProps>;
  onChange: (next: Partial<GridProps>) => void;
  disabled?: boolean;
  extraKeys?: readonly string[];
};

export function GridPropsBuilder({
  value,
  onChange,
  disabled,
}: GridPropsBuilderProps) {
  const applied = React.useMemo(
    () => ({ ...(value ?? {}) } as Record<string, unknown>),
    [value]
  );

  const [drafts, setDrafts] = React.useState<DraftRow[]>([]);
  const [selectedKey, setSelectedKey] = React.useState<GridPropKey | null>(null);

  const usedKeys = React.useMemo(() => {
    const s = new Set<string>(Object.keys(applied));
    drafts.forEach((d) => s.add(d.key));
    return s;
  }, [applied, drafts]);

  const availableKeys = React.useMemo(
    () => GRID_PROP_KEYS.filter((k) => !usedKeys.has(k)),
    [usedKeys]
  );

  const addDraft = () => {
    if (!selectedKey) return;
    setDrafts((prev) => [...prev, { key: selectedKey, draftValue: "" }]);
    setSelectedKey(null);
  };

  const deleteDraft = (k: GridPropKey) => {
    setDrafts((prev) => prev.filter((d) => d.key !== k));
  };

  const deleteApplied = (k: string) => {
    const next: Record<string, unknown> = { ...applied };
    delete next[k];
    onChange(next as Partial<GridProps>);
  };

  const applyDraft = (d: DraftRow) => {
    if (d.draftValue.trim() === "") return;
    const n = Number(d.draftValue);
    if (Number.isNaN(n)) return;
    const next: Record<string, unknown> = { ...applied, [d.key]: n };
    onChange(next as Partial<GridProps>);
    setDrafts((prev) => prev.filter((x) => x.key !== d.key));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "xl",
        boxShadow: "sm",
        p: 2,
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Stack spacing={2.5}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            level="title-md"
            startDecorator={<LayoutGrid size={18} />}
            sx={{ fontWeight: 700 }}
          >
            Responsive Breakpoints
          </Typography>
          <Chip size="sm" variant="soft" color="primary">
            {Object.keys(applied).length} Active
          </Chip>
        </Box>

        <Divider />

        {/* Input Controls */}
        <FormControl disabled={disabled}>
          <FormLabel sx={{ fontSize: "xs", textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>
            Add New Constraint
          </FormLabel>
          <Stack direction="row" spacing={1}>
            <Select<GridPropKey>
              value={selectedKey}
              onChange={(_, v) => setSelectedKey(v)}
              placeholder="Breakpoint (xs, sm...)"
              sx={{ flex: 1, borderRadius: "lg" }}
            >
              {availableKeys.map((k) => (
                <Option key={k} value={k}>{k.toUpperCase()}</Option>
              ))}
              {availableKeys.length === 0 && (
                <Option value={"xs" as GridPropKey} disabled>All set!</Option>
              )}
            </Select>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<Plus size={18} />}
              onClick={addDraft}
              disabled={disabled || !selectedKey}
              sx={{ borderRadius: "lg", px: 2 }}
            >
              Add
            </Button>
          </Stack>
        </FormControl>

        {/* List Section */}
        <Stack spacing={1.5}>
          {/* Drafts - Warning/Action State */}
          {drafts.map((d) => (
            <Box
              key={d.key}
              sx={{
                p: 1.5,
                borderRadius: "lg",
                bgcolor: "warning.softBg",
                border: "1px dashed",
                borderColor: "warning.outlinedBorder",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography level="title-sm" sx={{ minWidth: 40, fontWeight: "bold" }}>
                {d.key.toUpperCase()}
              </Typography>
              
              <Input
                size="sm"
                type="number"
                variant="outlined"
                value={d.draftValue}
                onChange={(e) => {
                  const v = e.target.value;
                  setDrafts((prev) => prev.map((x) => (x.key === d.key ? { ...x, draftValue: v } : x)));
                }}
                placeholder="Value (1-12)"
                sx={{ 
                    flex: 1, 
                    borderRadius: 'md',
                    '--Input-focusedThickness': '1px'
                }}
                slotProps={{ input: { inputMode: "numeric" } }}
              />

              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="sm"
                  variant="solid"
                  color="success"
                  onClick={() => applyDraft(d)}
                  disabled={disabled || d.draftValue.trim() === ""}
                >
                  <Check size={16} />
                </IconButton>
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onClick={() => deleteDraft(d.key)}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Stack>
            </Box>
          ))}

          {/* Applied Items - Stable/Success State */}
          {Object.entries(applied).map(([k, v]) => (
            <Box
              key={k}
              sx={{
                p: 1.5,
                borderRadius: "lg",
                bgcolor: "neutral.softBg",
                border: "1px solid",
                borderColor: "neutral.outlinedBorder",
                display: "flex",
                alignItems: "center",
                transition: "0.2s",
                "&:hover": { bgcolor: "background.surface" }
              }}
            >
              <Typography level="title-sm" sx={{ minWidth: 40, fontWeight: "bold", color: "primary.plainColor" }}>
                {k.toUpperCase()}
              </Typography>
              
              <Box sx={{ flex: 1, px: 1 }}>
                <Typography level="body-sm" sx={{ fontFamily: 'code', color: 'neutral.600' }}>
                   Span: <b>{String(v)}</b> units
                </Typography>
              </Box>

              <IconButton
                size="sm"
                variant="plain"
                color="danger"
                onClick={() => deleteApplied(k)}
                disabled={disabled}
                sx={{ '--IconButton-size': '32px' }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Box>
          ))}

          {drafts.length === 0 && Object.keys(applied).length === 0 && (
            <Box sx={{ py: 4, textAlign: 'center', opacity: 0.5 }}>
                <Typography level="body-xs">No configuration set</Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}