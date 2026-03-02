// MuiPropsBuilder.tsx
import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Input,
  Select,
  Option,
  Switch,
  Chip,
  Divider,
  Button,
  Sheet,
  IconButton,
  Tooltip,
  ListItemDecorator,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "@mui/joy";
import {
  Plus,
  Trash2,
  Palette,
  Layout as LayoutIcon,
  Sparkles,
  Bug,
  Code2,
  Maximize,
  AlertCircle,
  Settings2,
  Layers,
  MousePointer2,
  Link2,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoveHorizontal,
  MoveVertical,
  Ban,
  EyeOff,
  Lock,
  ShieldCheck,
  BadgeCheck,
  Hash,
  Columns3,
  Rows3,
  Grip,
  TextCursorInput,
  Terminal,
} from "lucide-react";

type MuiProps = Record<string, any>;

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl";

const BREAKPOINTS: { key: Breakpoint; label: string }[] = [
  { key: "base", label: "Base" },
  { key: "sm", label: "SM" },
  { key: "md", label: "MD" },
  { key: "lg", label: "LG" },
  { key: "xl", label: "XL" },
];

/**
 * ✅ Lucide icon support
 * Store a string key in muiProps, and later your renderer maps it to a real component.
 * ex:
 *   muiProps.startIcon = "Search"
 *   muiProps.endIcon = "ChevronDown"
 */
const LUCIDE_ICON_KEYS = [
  "Search",
  "Mail",
  "User",
  "Phone",
  "Calendar",
  "Hash",
  "ChevronDown",
  "ChevronRight",
  "ChevronLeft",
  "Eye",
  "EyeOff",
  "Lock",
  "Unlock",
  "Info",
  "AlertCircle",
  "Check",
  "X",
  "Plus",
  "Minus",
  "Trash2",
  "Settings2",
  "Sparkles",
  "BadgeCheck",
  "ShieldCheck",
] as const;

function safeJsonParse(text: string) {
  try {
    return { ok: true as const, value: JSON.parse(text) };
  } catch (e: any) {
    return { ok: false as const, error: e?.message ?? "Invalid JSON" };
  }
}

// -----------------------------
// object utilities
// -----------------------------
function setPath(obj: MuiProps, path: string[], value: any): MuiProps {
  const next: MuiProps = { ...(obj ?? {}) };
  let cur: any = next;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    cur[key] =
      typeof cur[key] === "object" && cur[key] !== null ? { ...cur[key] } : {};
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
  return next;
}

function delPath(obj: MuiProps, path: string[]): MuiProps {
  const next: MuiProps = { ...(obj ?? {}) };
  let cur: any = next;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!cur[key] || typeof cur[key] !== "object") return next;
    cur[key] = { ...cur[key] };
    cur = cur[key];
  }
  delete cur[path[path.length - 1]];
  return next;
}

function get(obj: MuiProps, path: string[], fallback: any = "") {
  let cur: any = obj ?? {};
  for (const p of path) {
    if (cur == null) return fallback;
    cur = cur[p];
  }
  return cur ?? fallback;
}

/**
 * ✅ Breakpoint-aware sx storage.
 * We store responsive overrides like:
 *   muiProps.sxResponsive = {
 *     base: { mt: 1, width: "100%" },
 *     sm:   { width: 360 }
 *   }
 *
 * Your renderer merges them into Joy sx:
 *   const sx = { ...base, ...(sm and up overrides etc) }
 * OR simplest: pass { ...base, sm: {...}, md: {...} } if you want Joy's responsive syntax.
 *
 * For feasibility, we store as our own shape and keep it simple.
 */
function updateSx(
  bp: Breakpoint,
  key: string,
  value: any,
  muiProps: MuiProps,
  onChange: (m: MuiProps) => void,
) {
  const sxResp = (muiProps.sxResponsive ?? {}) as Record<string, any>;
  const bpObj = { ...(sxResp[bp] ?? {}) };
  if (value === "" || value === undefined || value === null) {
    delete bpObj[key];
  } else {
    bpObj[key] = value;
  }
  const nextSxResp = { ...sxResp, [bp]: bpObj };
  onChange(setPath(muiProps, ["sxResponsive"], nextSxResp));
}

// -----------------------------
// Layout components
// -----------------------------
const PropertyRow = ({
  label,
  children,
  icon: Icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: any;
}) => (
  <Stack
    direction="row"
    spacing={1.25}
    alignItems="center"
    justifyContent="space-between"
    sx={{
      minHeight: 36,
      minWidth: 0,
      "& > *": { minWidth: 0 },
    }}
  >
    <Typography
      level="body-xs"
      sx={{
        fontWeight: 700,
        color: "neutral.500",
        display: "flex",
        alignItems: "center",
        gap: 1,
        whiteSpace: "nowrap",
      }}
    >
      {Icon && <Icon size={14} strokeWidth={2} />}
      {label}
    </Typography>

    {/* ✅ Fix overflow: allow the control to shrink inside right panel */}
    <Box
      sx={{ minWidth: 0, flex: 1, display: "flex", justifyContent: "flex-end" }}
    >
      <Box sx={{ width: "min(220px, 100%)", minWidth: 0 }}>{children}</Box>
    </Box>
  </Stack>
);

const SectionHeader = ({
  label,
  icon: Icon,
  description,
  green,
}: {
  label: string;
  icon: any;
  description?: string;
  green: any;
}) => (
  <Box sx={{ mb: 1.5 }}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        sx={{
          p: 0.6,
          borderRadius: "8px",
          bgcolor: green.glow,
          color: green.accent,
          display: "flex",
          boxShadow: `0 2px 6px ${green.glow}`,
        }}
      >
        <Icon size={14} strokeWidth={2.5} />
      </Box>
      <Typography level="title-sm" sx={{ fontWeight: 800 }}>
        {label}
      </Typography>
    </Stack>
    {description && (
      <Typography
        level="body-xs"
        sx={{ mt: 0.5, opacity: 0.6, lineHeight: 1.4 }}
      >
        {description}
      </Typography>
    )}
  </Box>
);

// -----------------------------
// Main Builder
// -----------------------------
export function MuiPropsBuilder({
  value,
  onChange,
  green,
}: {
  value?: MuiProps;
  onChange: (muiProps: MuiProps) => void;
  green: { accent: string; glow: string; glow2: string };
}) {
  const muiProps = value ?? {};

  const [advancedOpen, setAdvancedOpen] = React.useState(false);
  const [jsonText, setJsonText] = React.useState(() =>
    JSON.stringify(muiProps, null, 2),
  );
  const [jsonErr, setJsonErr] = React.useState<string | null>(null);

  const [kvKey, setKvKey] = React.useState("");
  const [kvVal, setKvVal] = React.useState("");

  const [bp, setBp] = React.useState<Breakpoint>("base");

  React.useEffect(() => {
    setJsonText(JSON.stringify(muiProps, null, 2));
  }, [muiProps]);

  const update = (path: string[], v: any) =>
    onChange(setPath(muiProps, path, v));
  const remove = (path: string[]) => onChange(delPath(muiProps, path));

  const addDataAttr = () => {
    if (!kvKey.trim()) return;
    update(["dataAttrs", kvKey.trim()], kvVal);
    setKvKey("");
    setKvVal("");
  };

  const colors = ["primary", "neutral", "danger", "success", "warning"];
  const sizes = ["sm", "md", "lg"];
  const variants = ["outlined", "soft", "solid", "plain"];

  return (
    <Stack spacing={3} sx={{ pb: 4 }}>
      {/* Intro */}
      <Sheet
        variant="soft"
        sx={{
          p: 2,
          borderRadius: "xl",
          bgcolor: "background.level1",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Settings2 size={20} color={green.accent} />
          <Box sx={{ minWidth: 0 }}>
            <Typography level="title-sm" sx={{ fontWeight: 900 }}>
              MUI / Joy Props
            </Typography>
            <Typography level="body-xs" sx={{ opacity: 0.75 }}>
              Configure important UI props + responsive layout per breakpoint.
            </Typography>
          </Box>
        </Stack>
      </Sheet>

      {/* Breakpoint Tabs */}
      <Sheet variant="outlined" sx={{ borderRadius: "xl", p: 1.25 }}>
        <Typography
          level="body-xs"
          sx={{ fontWeight: 800, opacity: 0.7, mb: 1 }}
        >
          Responsive settings
        </Typography>

        <Tabs
          value={bp}
          onChange={(_, v) => setBp((v ?? "base") as Breakpoint)}
        >
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: "xl",
              bgcolor: "background.level1",
            }}
          >
            {BREAKPOINTS.map((b) => (
              <Tab
                key={b.key}
                value={b.key}
                disableIndicator
                sx={{
                  borderRadius: "lg",
                  minHeight: 34,
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {b.label}
              </Tab>
            ))}
          </TabList>

          {/* we don't need panels; bp state is enough */}
          {BREAKPOINTS.map((b) => (
            <TabPanel key={b.key} value={b.key} sx={{ p: 0, pt: 1.25 }}>
              <Typography level="body-xs" sx={{ opacity: 0.7 }}>
                Editing: <b>{b.label}</b> (stored in{" "}
                <code>muiProps.sxResponsive.{b.key}</code>)
              </Typography>
            </TabPanel>
          ))}
        </Tabs>
      </Sheet>

      {/* Appearance */}
      <Box>
        <SectionHeader
          green={green}
          label="Appearance"
          icon={Palette}
          description="Variant, size, color, and interaction states."
        />
        <Sheet
          variant="outlined"
          sx={{ p: 1.5, borderRadius: "xl", bgcolor: "background.surface" }}
        >
          <Stack spacing={1.5}>
            <PropertyRow label="Variant" icon={Layers}>
              <Select
                size="sm"
                value={get(muiProps, ["variant"], "outlined")}
                onChange={(_, v) => update(["variant"], v ?? "outlined")}
              >
                {variants.map((v) => (
                  <Option key={v} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>
            </PropertyRow>

            <PropertyRow label="Size" icon={Maximize}>
              <Select
                size="sm"
                value={get(muiProps, ["size"], "md")}
                onChange={(_, v) => update(["size"], v ?? "md")}
              >
                {sizes.map((v) => (
                  <Option key={v} value={v}>
                    {v.toUpperCase()}
                  </Option>
                ))}
              </Select>
            </PropertyRow>

            <PropertyRow label="Color">
              <Select
                size="sm"
                value={get(muiProps, ["color"], "neutral")}
                onChange={(_, v) => update(["color"], v ?? "neutral")}
                renderValue={(sel) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ minWidth: 0 }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: `${sel?.value}.solidBg`,
                      }}
                    />
                    <Typography
                      level="body-xs"
                      sx={{ textTransform: "capitalize" }}
                      noWrap
                    >
                      {sel?.value}
                    </Typography>
                  </Stack>
                )}
              >
                {colors.map((c) => (
                  <Option key={c} value={c}>
                    <ListItemDecorator>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: `${c}.solidBg`,
                        }}
                      />
                    </ListItemDecorator>
                    {c}
                  </Option>
                ))}
              </Select>
            </PropertyRow>

            <Divider sx={{ my: 0.5 }} />

            <PropertyRow label="Disabled" icon={Ban}>
              <Switch
                size="sm"
                checked={Boolean(get(muiProps, ["disabled"], false))}
                onChange={(e) => update(["disabled"], e.target.checked)}
              />
            </PropertyRow>

            <PropertyRow label="Read only" icon={Lock}>
              <Switch
                size="sm"
                checked={Boolean(get(muiProps, ["readOnly"], false))}
                onChange={(e) => update(["readOnly"], e.target.checked)}
              />
            </PropertyRow>

            <PropertyRow label="Hidden" icon={EyeOff}>
              <Switch
                size="sm"
                checked={Boolean(get(muiProps, ["hidden"], false))}
                onChange={(e) => update(["hidden"], e.target.checked)}
              />
            </PropertyRow>

            <PropertyRow label="Full width" icon={MoveHorizontal}>
              <Switch
                size="sm"
                checked={Boolean(get(muiProps, ["fullWidth"], false))}
                onChange={(e) => update(["fullWidth"], e.target.checked)}
              />
            </PropertyRow>

            <PropertyRow label="Auto focus" icon={TextCursorInput}>
              <Switch
                size="sm"
                checked={Boolean(get(muiProps, ["autoFocus"], false))}
                onChange={(e) => update(["autoFocus"], e.target.checked)}
              />
            </PropertyRow>
          </Stack>
        </Sheet>
      </Box>

      {/* Layout & Spacing (Responsive) */}
      <Box>
        <SectionHeader
          green={green}
          label="Layout & Spacing"
          icon={LayoutIcon}
          description="Set these per breakpoint. Fixes overflow issues in narrow panels."
        />
        <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: "xl" }}>
          <Stack spacing={1.25}>
            {/* width */}
            <PropertyRow label="Width" icon={MoveHorizontal}>
              <Input
                size="sm"
                placeholder="e.g. 100%, 360, 24rem"
                value={String(get(muiProps, ["sxResponsive", bp, "width"], ""))}
                onChange={(e) =>
                  updateSx(bp, "width", e.target.value, muiProps, onChange)
                }
              />
            </PropertyRow>

            <PropertyRow label="Max width" icon={Maximize}>
              <Input
                size="sm"
                placeholder="e.g. 100%, 720"
                value={String(
                  get(muiProps, ["sxResponsive", bp, "maxWidth"], ""),
                )}
                onChange={(e) =>
                  updateSx(bp, "maxWidth", e.target.value, muiProps, onChange)
                }
              />
            </PropertyRow>

            <PropertyRow label="Min width" icon={Maximize}>
              <Input
                size="sm"
                placeholder="e.g. 160"
                value={String(
                  get(muiProps, ["sxResponsive", bp, "minWidth"], ""),
                )}
                onChange={(e) =>
                  updateSx(bp, "minWidth", e.target.value, muiProps, onChange)
                }
              />
            </PropertyRow>

            <Divider />

            {/* margins */}
            <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  MT
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "mt"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "mt", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  MB
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "mb"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "mb", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  ML
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "ml"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "ml", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  MR
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "mr"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "mr", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
            </Stack>

            <Divider />

            {/* padding */}
            <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  PT
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "pt"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "pt", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  PB
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "pb"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "pb", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  PL
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "pl"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "pl", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  level="body-xs"
                  sx={{ mb: 0.5, fontWeight: 800, color: "neutral.500" }}
                >
                  PR
                </Typography>
                <Input
                  size="sm"
                  placeholder="0.."
                  value={String(get(muiProps, ["sxResponsive", bp, "pr"], ""))}
                  onChange={(e) =>
                    updateSx(bp, "pr", e.target.value, muiProps, onChange)
                  }
                />
              </Box>
            </Stack>

            <Divider />

            {/* others */}
            <PropertyRow label="Border radius" icon={Grip}>
              <Input
                size="sm"
                placeholder="e.g. xl, 12px"
                value={String(
                  get(muiProps, ["sxResponsive", bp, "borderRadius"], ""),
                )}
                onChange={(e) =>
                  updateSx(
                    bp,
                    "borderRadius",
                    e.target.value,
                    muiProps,
                    onChange,
                  )
                }
              />
            </PropertyRow>

            <PropertyRow label="Display" icon={Columns3}>
              <Select
                size="sm"
                value={String(
                  get(muiProps, ["sxResponsive", bp, "display"], ""),
                )}
                onChange={(_, v) =>
                  updateSx(bp, "display", v ?? "", muiProps, onChange)
                }
              >
                <Option value="">(unset)</Option>
                <Option value="block">block</Option>
                <Option value="inline-block">inline-block</Option>
                <Option value="flex">flex</Option>
                <Option value="grid">grid</Option>
                <Option value="none">none</Option>
              </Select>
            </PropertyRow>

            <PropertyRow label="Text align" icon={AlignLeft}>
              <Select
                size="sm"
                value={String(
                  get(muiProps, ["sxResponsive", bp, "textAlign"], ""),
                )}
                onChange={(_, v) =>
                  updateSx(bp, "textAlign", v ?? "", muiProps, onChange)
                }
              >
                <Option value="">(unset)</Option>
                <Option value="left">left</Option>
                <Option value="center">center</Option>
                <Option value="right">right</Option>
              </Select>
            </PropertyRow>
          </Stack>
        </Sheet>
      </Box>

      {/* Decorations + Icons */}
      <Box>
        <SectionHeader
          green={green}
          label="Decorations & Icons"
          icon={Sparkles}
          description="Text decorators and Lucide icon keys."
        />
        <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: "xl" }}>
          <Stack spacing={1.5}>
            <PropertyRow label="Start text" icon={MousePointer2}>
              <Input
                size="sm"
                placeholder="$"
                value={String(get(muiProps, ["startDecoratorText"], ""))}
                onChange={(e) => update(["startDecoratorText"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="End text" icon={MousePointer2}>
              <Input
                size="sm"
                placeholder="kg"
                value={String(get(muiProps, ["endDecoratorText"], ""))}
                onChange={(e) => update(["endDecoratorText"], e.target.value)}
              />
            </PropertyRow>

            <Divider />

            <Typography level="body-xs" sx={{ fontWeight: 800, opacity: 0.75 }}>
              Icons (Lucide)
            </Typography>
            <Typography level="body-xs" sx={{ opacity: 0.65 }}>
              Choose an icon key. Your renderer will map this key to a Lucide
              component.
            </Typography>

            <PropertyRow label="Start icon" icon={BadgeCheck}>
              <Select
                size="sm"
                value={String(get(muiProps, ["startIcon"], ""))}
                onChange={(_, v) => update(["startIcon"], v ?? "")}
              >
                <Option value="">(none)</Option>
                {LUCIDE_ICON_KEYS.map((k) => (
                  <Option key={k} value={k}>
                    {k}
                  </Option>
                ))}
              </Select>
            </PropertyRow>

            <PropertyRow label="End icon" icon={ShieldCheck}>
              <Select
                size="sm"
                value={String(get(muiProps, ["endIcon"], ""))}
                onChange={(_, v) => update(["endIcon"], v ?? "")}
              >
                <Option value="">(none)</Option>
                {LUCIDE_ICON_KEYS.map((k) => (
                  <Option key={k} value={k}>
                    {k}
                  </Option>
                ))}
              </Select>
            </PropertyRow>
          </Stack>
        </Sheet>
      </Box>

      {/* Input attributes (10-15 important ones) */}
      <Box>
        <SectionHeader
          green={green}
          label="Input Attributes"
          icon={Type}
          description="Common props for inputs / selects (stored in muiProps)."
        />
        <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: "xl" }}>
          <Stack spacing={1.25}>
            <PropertyRow label="Name" icon={Hash}>
              <Input
                size="sm"
                placeholder="name"
                value={String(get(muiProps, ["name"], ""))}
                onChange={(e) => update(["name"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Id" icon={Link2}>
              <Input
                size="sm"
                placeholder="id"
                value={String(get(muiProps, ["id"], ""))}
                onChange={(e) => update(["id"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Type" icon={Terminal}>
              <Select
                size="sm"
                value={String(get(muiProps, ["type"], ""))}
                onChange={(_, v) => update(["type"], v ?? "")}
              >
                <Option value="">(auto)</Option>
                <Option value="text">text</Option>
                <Option value="email">email</Option>
                <Option value="password">password</Option>
                <Option value="number">number</Option>
                <Option value="tel">tel</Option>
                <Option value="url">url</Option>
                <Option value="search">search</Option>
              </Select>
            </PropertyRow>

            <PropertyRow label="Placeholder" icon={TextCursorInput}>
              <Input
                size="sm"
                placeholder="placeholder"
                value={String(get(muiProps, ["placeholder"], ""))}
                onChange={(e) => update(["placeholder"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Helper text" icon={AlertCircle}>
              <Input
                size="sm"
                placeholder="helper text"
                value={String(get(muiProps, ["helperText"], ""))}
                onChange={(e) => update(["helperText"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Required" icon={BadgeCheck}>
              <Switch
                size="sm"
                checked={Boolean(get(muiProps, ["required"], false))}
                onChange={(e) => update(["required"], e.target.checked)}
              />
            </PropertyRow>

            <PropertyRow label="Min length" icon={Rows3}>
              <Input
                size="sm"
                placeholder="e.g. 3"
                value={String(get(muiProps, ["minLength"], ""))}
                onChange={(e) => update(["minLength"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Max length" icon={Rows3}>
              <Input
                size="sm"
                placeholder="e.g. 50"
                value={String(get(muiProps, ["maxLength"], ""))}
                onChange={(e) => update(["maxLength"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Min" icon={MoveVertical}>
              <Input
                size="sm"
                placeholder="e.g. 0"
                value={String(get(muiProps, ["min"], ""))}
                onChange={(e) => update(["min"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Max" icon={MoveVertical}>
              <Input
                size="sm"
                placeholder="e.g. 100"
                value={String(get(muiProps, ["max"], ""))}
                onChange={(e) => update(["max"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Step" icon={MoveVertical}>
              <Input
                size="sm"
                placeholder="e.g. 1"
                value={String(get(muiProps, ["step"], ""))}
                onChange={(e) => update(["step"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="Input mode" icon={Terminal}>
              <Select
                size="sm"
                value={String(get(muiProps, ["inputMode"], ""))}
                onChange={(_, v) => update(["inputMode"], v ?? "")}
              >
                <Option value="">(unset)</Option>
                <Option value="text">text</Option>
                <Option value="numeric">numeric</Option>
                <Option value="decimal">decimal</Option>
                <Option value="email">email</Option>
                <Option value="tel">tel</Option>
                <Option value="search">search</Option>
                <Option value="url">url</Option>
              </Select>
            </PropertyRow>

            <PropertyRow label="Pattern" icon={Code2}>
              <Input
                size="sm"
                placeholder="regex pattern"
                value={String(get(muiProps, ["pattern"], ""))}
                onChange={(e) => update(["pattern"], e.target.value)}
              />
            </PropertyRow>

            <PropertyRow label="AutoComplete" icon={Sparkles}>
              <Input
                size="sm"
                placeholder="on/off"
                value={String(get(muiProps, ["autoComplete"], ""))}
                onChange={(e) => update(["autoComplete"], e.target.value)}
              />
            </PropertyRow>
          </Stack>
        </Sheet>
      </Box>

      {/* Testing & attributes */}
      <Box>
        <SectionHeader
          green={green}
          label="Testing & Attributes"
          icon={Bug}
          description="QA IDs and custom attributes."
        />
        <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: "xl" }}>
          <Stack spacing={2}>
            <PropertyRow label="data-test">
              <Input
                size="sm"
                placeholder="form-field-01"
                value={String(get(muiProps, ["dataTest"], ""))}
                onChange={(e) => update(["dataTest"], e.target.value)}
              />
            </PropertyRow>

            <Divider />

            <Typography
              level="body-xs"
              sx={{ fontWeight: 800, color: "neutral.500" }}
            >
              Extra attributes (muiProps.dataAttrs)
            </Typography>

            <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
              <Input
                size="sm"
                placeholder="Key"
                value={kvKey}
                onChange={(e) => setKvKey(e.target.value)}
                sx={{ flex: 1, minWidth: 0 }}
              />
              <Input
                size="sm"
                placeholder="Val"
                value={kvVal}
                onChange={(e) => setKvVal(e.target.value)}
                sx={{ flex: 1, minWidth: 0 }}
              />
              <IconButton
                size="sm"
                variant="soft"
                sx={{ color: green.accent, bgcolor: green.glow }}
                onClick={addDataAttr}
              >
                <Plus size={16} />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {Object.entries(get(muiProps, ["dataAttrs"], {})).length === 0 ? (
                <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                  No extra attributes.
                </Typography>
              ) : (
                Object.entries(get(muiProps, ["dataAttrs"], {})).map(
                  ([k, v]) => (
                    <Chip
                      key={k}
                      size="sm"
                      variant="soft"
                      endDecorator={
                        <IconButton
                          size="sm"
                          variant="plain"
                          color="danger"
                          onClick={() => remove(["dataAttrs", k])}
                        >
                          <Trash2 size={12} />
                        </IconButton>
                      }
                    >
                      {k}: {String(v)}
                    </Chip>
                  ),
                )
              )}
            </Stack>
          </Stack>
        </Sheet>
      </Box>

      {/* Advanced JSON */}
      <Box>
        <Button
          fullWidth
          variant="soft"
          color="neutral"
          startDecorator={<Code2 size={16} />}
          onClick={() => setAdvancedOpen(!advancedOpen)}
          sx={{ borderRadius: "xl", fontWeight: 800 }}
        >
          {advancedOpen ? "Hide Source" : "Edit Raw JSON"}
        </Button>

        {advancedOpen && (
          <Sheet
            variant="outlined"
            sx={{ mt: 1, p: 1, borderRadius: "lg", bgcolor: "neutral.softBg" }}
          >
            <Input
              slotProps={{ input: { as: "textarea", rows: 10 } as any }}
              value={jsonText}
              onChange={(e) => {
                const t = e.target.value;
                setJsonText(t);
                const parsed = safeJsonParse(t);
                if (parsed.ok) {
                  setJsonErr(null);
                  onChange(parsed.value);
                } else setJsonErr(parsed.error);
              }}
              sx={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                fontSize: 12,
                bgcolor: "background.surface",
                border: "1px solid",
                borderColor: jsonErr ? "danger.outlinedBorder" : "divider",
                "& textarea": { p: 1 },
              }}
            />
            {jsonErr && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 1, color: "danger.plainColor", p: 1 }}
              >
                <AlertCircle size={14} />
                <Typography level="body-xs" color="danger">
                  {jsonErr}
                </Typography>
              </Stack>
            )}
          </Sheet>
        )}
      </Box>
    </Stack>
  );
}

/**
 * ✅ Renderer feasibility notes (for you to implement later)
 *
 * 1) Apply responsive sx:
 *    const resp = field.muiProps?.sxResponsive ?? {};
 *    // easiest: convert to Joy responsive sx:
 *    // sx={{ ...(resp.base ?? {}), sm: resp.sm, md: resp.md, lg: resp.lg, xl: resp.xl }}
 *
 * 2) Lucide icons:
 *    const iconKey = field.muiProps?.startIcon;
 *    const StartIcon = iconKey ? LUCIDE_MAP[iconKey] : null;
 *    <Input startDecorator={StartIcon ? <StartIcon size={16} /> : field.muiProps?.startDecoratorText} />
 */
