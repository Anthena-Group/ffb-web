// FormBuilderRightPanel.tsx
import * as React from "react";
import {
  Box,
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
  Button,
  IconButton,
  Sheet,
  Chip,
  Switch,
  Tooltip,
} from "@mui/joy";
import {
  ChevronRight,
  DeleteOutline,
  Tune,
  Settings,
  List,
  GridView,
  VerifiedUser,
} from "@mui/icons-material";

import {
  InputTypes,
  CHECK_BOX_VALUE_TYPE,
  type ValidationRule,
  type ConditionType,
  type OptionType,
} from "formik-form-builder";

import {
  GridPropsBuilder,
  ValidationBuilder,
  ConditionBuilder,
  FieldOptionBuilder,
  MuiPropsBuilder,
} from "../builders";
import type { GridProps } from "@mui/joy";
import { Zap } from "lucide-react";
import { GREEN } from "./FormBuilder";

// --- Types ---

export type UnknownField = {
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

export type CanvasField = UnknownField;

type GreenTheme = {
  accent: string;
  glow: string;
  glow2: string;
};

interface PanelProps {
  rightOpen: boolean;
  setRightOpen: (v: boolean) => void;
  selected: CanvasField | null;
  onPatch: (patch: Partial<UnknownField>) => void;
  onDelete: () => void;
  green: GreenTheme;
  typeMeta: (type: InputTypes) => { chip: string; hint: string };
}

// --- Helper Components ---

/**
 * PropertyRow: Standardizes the vertical spacing and label styling
 * for a premium "Inspector" look.
 */
const PropertyRow = ({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) => (
  <Box>
    <Typography
      level="body-xs"
      sx={{
        mb: 0.75,
        fontWeight: 700,
        color: "neutral.500",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </Typography>
    {children}
    {description && (
      <Typography level="body-xs" sx={{ mt: 0.5, opacity: 0.6 }}>
        {description}
      </Typography>
    )}
  </Box>
);

// --- Main Components ---

export function FormBuilderRightPanel({
  rightOpen,
  setRightOpen,
  selected,
  onPatch,
  onDelete,
  green,
  typeMeta,
}: PanelProps) {
  return (
    <Sheet
      variant="plain"
      sx={{
        width: rightOpen ? 380 : 0,
        flexBasis: rightOpen ? 380 : 0,
        transition:
          "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), flex-basis 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        borderLeft: rightOpen ? "1px solid" : "none",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.surface",
        overflow: "hidden",
        zIndex: 10,
        boxShadow: rightOpen ? "-4px 0 20px rgba(0,0,0,0.04)" : "none",
      }}
    >
      {/* Panel Header */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              bgcolor: green.glow,
              color: green.accent,
              boxShadow: `0 0 15px ${green.glow2}`,
            }}
          >
            <Tune sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography level="title-md" sx={{ fontWeight: 800 }}>
              Inspector
            </Typography>
            <Typography level="body-xs" sx={{ opacity: 0.6 }}>
              Field configuration
            </Typography>
          </Box>
        </Stack>

        <IconButton
          size="sm"
          variant="plain"
          onClick={() => setRightOpen(false)}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      <Divider />

      {/* Content Area */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <FieldSettingsPanel
          selected={selected}
          onPatch={onPatch}
          onDelete={onDelete}
          green={green}
          typeMeta={typeMeta}
        />
      </Box>
    </Sheet>
  );
}

function FieldSettingsPanel({
  selected,
  onPatch,
  onDelete,
  green,
  typeMeta,
}: Omit<PanelProps, "rightOpen" | "setRightOpen">) {
  // Explicitly manage tab index to prevent sync issues
  const [tabIndex, setTabIndex] = React.useState(0);

  // Reset to first tab when selecting a new field
  React.useEffect(() => {
    if (selected?.id) setTabIndex(0);
  }, [selected?.id]);

  if (!selected) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          opacity: 0.5,
          textAlign: "center",
          p: 4,
        }}
      >
        <Settings sx={{ fontSize: 40 }} />
        <Typography level="body-sm">
          Select an element on the canvas to edit its properties.
        </Typography>
      </Box>
    );
  }

  const t = selected.type;

  // Logic checks
  const showPlaceholder = [
    InputTypes.TEXT,
    InputTypes.MULTI_TEXT,
    InputTypes.AUTO_COMPLETE,
    InputTypes.DATE,
  ].includes(t);

  const showOptions = [
    InputTypes.SELECT,
    InputTypes.DROPDOWN,
    InputTypes.AUTO_COMPLETE,
    InputTypes.RADIO,
    InputTypes.CHECKBOX,
  ].includes(t);

  const showDirection = t === InputTypes.CHECKBOX || t === InputTypes.RADIO;
  const showOutputType = t === InputTypes.RADIO;
  const showVariant = t === InputTypes.RADIO;
  const showValueType = t === InputTypes.CHECKBOX;

  // Small helper for consistent tab styling
  const tabSx = (idx: number) => ({
    borderRadius: "lg",
    flex: 1,
    minHeight: 36,
    transition: "0.2s",
    ...(tabIndex === idx
      ? {
          bgcolor: "background.surface",
          color: green.accent,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }
      : {}),
  });

  return (
    <Stack spacing={2.5}>
      {/* Active Field Context Card */}
      <Sheet
        variant="soft"
        sx={{
          p: 1.5,
          borderRadius: "xl",
          bgcolor: "background.level1",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            level="body-xs"
            fontWeight="800"
            sx={{ color: "neutral.500" }}
          >
            ACTIVE FIELD
          </Typography>
          <Chip
            size="sm"
            variant="solid"
            sx={{
              bgcolor: green.accent,
              color: "#fff",
              fontWeight: 700,
              borderRadius: "md",
            }}
          >
            {typeMeta(t).chip}
          </Chip>
        </Stack>
        <Typography level="title-md" sx={{ mt: 1, fontWeight: 700 }} noWrap>
          {selected.label || "Untitled Field"}
        </Typography>
      </Sheet>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, val) => setTabIndex(val as number)}
        sx={{ bgcolor: "transparent" }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: "xl",
            bgcolor: "background.level1",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tab value={0} disableIndicator sx={tabSx(0)}>
            <Tooltip title="General" variant="soft">
              <Settings fontSize="small" />
            </Tooltip>
          </Tab>

          <Tab value={1} disableIndicator disabled={!showOptions} sx={tabSx(1)}>
            <Tooltip title="Options" variant="soft">
              <List fontSize="small" />
            </Tooltip>
          </Tab>

          <Tab value={2} disableIndicator sx={tabSx(2)}>
            <Tooltip title="Layout" variant="soft">
              <GridView fontSize="small" />
            </Tooltip>
          </Tab>

          <Tab value={3} disableIndicator sx={tabSx(3)}>
            <Tooltip title="Validation" variant="soft">
              <VerifiedUser fontSize="small" />
            </Tooltip>
          </Tab>

          <Tab value={4} disableIndicator sx={tabSx(4)}>
            <Tooltip title="Conditions" variant="soft">
              <Zap size={16} />
            </Tooltip>
          </Tab>

          <Tab value={5} disableIndicator sx={tabSx(5)}>
            <Tooltip title="MUI Props" variant="soft">
              <Tune fontSize="small" />
            </Tooltip>
          </Tab>
        </TabList>

        <Box sx={{ mt: 3 }}>
          {/* TAB 0: CORE */}
          <TabPanel value={0} sx={{ p: 0 }}>
            <Stack spacing={2}>
              <PropertyRow label="Label">
                <Input
                  placeholder="Field label..."
                  value={selected.label || ""}
                  onChange={(e) => onPatch({ label: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </PropertyRow>

              <PropertyRow
                label="Field Key (API ID)"
                description="Used as the key in the JSON output."
              >
                <Input
                  placeholder="e.g. user_first_name"
                  value={selected.field || ""}
                  onChange={(e) => onPatch({ field: e.target.value })}
                  sx={{
                    borderRadius: "lg",
                    fontFamily: "code",
                    fontSize: "xs",
                  }}
                />
              </PropertyRow>

              <PropertyRow label="Group Label">
                <Input
                  placeholder="Optional section grouping..."
                  value={selected.groupLabel || ""}
                  onChange={(e) => onPatch({ groupLabel: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </PropertyRow>

              {showPlaceholder && (
                <PropertyRow label="Placeholder">
                  <Input
                    placeholder="Ghost text..."
                    value={selected.placeholder || ""}
                    onChange={(e) => onPatch({ placeholder: e.target.value })}
                    sx={{ borderRadius: "lg" }}
                  />
                </PropertyRow>
              )}

              <PropertyRow label="Helper Text">
                <Input
                  placeholder="Instructions for user..."
                  value={selected.helperText || ""}
                  onChange={(e) => onPatch({ helperText: e.target.value })}
                  sx={{ borderRadius: "lg" }}
                />
              </PropertyRow>

              {/* <Divider sx={{ my: 1 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography level="title-sm" sx={{ fontWeight: 600 }}>
                  Required Field
                </Typography>
                <Switch
                  checked={Boolean(selected.required)}
                  onChange={(e) => onPatch({ required: e.target.checked })}
                  sx={{
                    "--Switch-trackBackground": Boolean(selected.required) ? green.accent : undefined,
                    "&:hover": { "--Switch-trackBackground": green.accent },
                  } as any}
                />
              </Stack> */}

              <Divider sx={{ my: 1 }} />

              {showDirection && (
                <PropertyRow label="Alignment">
                  <Select
                    value={selected.direction || "column"}
                    onChange={(_, v) => onPatch({ direction: v as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value="row">Row (Side by Side)</Option>
                    <Option value="column">Column (Stacked)</Option>
                  </Select>
                </PropertyRow>
              )}

              {showOutputType && (
                <PropertyRow label="Data Output Format">
                  <Select
                    value={selected.outputType || "string"}
                    onChange={(_, v) => onPatch({ outputType: v as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                  </Select>
                </PropertyRow>
              )}

              {showValueType && (
                <PropertyRow label="Value Structure">
                  <Select
                    value={selected.valueType || CHECK_BOX_VALUE_TYPE.ARRAY}
                    onChange={(_, v) => onPatch({ valueType: v as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value={CHECK_BOX_VALUE_TYPE.ARRAY}>
                      Array (Multiple)
                    </Option>
                    <Option value={CHECK_BOX_VALUE_TYPE.STRING}>
                      String (Single)
                    </Option>
                    <Option value={CHECK_BOX_VALUE_TYPE.BOOLEAN}>
                      Boolean (True/False)
                    </Option>
                  </Select>
                </PropertyRow>
              )}

              {showVariant && (
                <PropertyRow label="Visual Style">
                  <Select
                    value={selected.variant || "DEFAULT"}
                    onChange={(_, v) => onPatch({ variant: v as any })}
                    sx={{ borderRadius: "lg" }}
                  >
                    <Option value="DEFAULT">Standard List</Option>
                    <Option value="ICON">Icon Grid</Option>
                  </Select>
                </PropertyRow>
              )}

              <Box sx={{ pt: 2 }}>
                <Button
                  fullWidth
                  color="danger"
                  variant="soft"
                  startDecorator={<DeleteOutline />}
                  onClick={onDelete}
                  sx={{ borderRadius: "xl", py: 1.2 }}
                >
                  Delete Field
                </Button>
              </Box>
            </Stack>
          </TabPanel>

          {/* TAB 1: OPTIONS */}
          <TabPanel value={1} sx={{ p: 0 }}>
            {showOptions ? (
              <FieldOptionBuilder
                type={t}
                value={selected.options}
                variant={selected.variant}
                onChange={(opts: any) => onPatch({ options: opts ?? [] })}
              />
            ) : (
              <Typography
                level="body-sm"
                color="neutral"
                textAlign="center"
                sx={{ py: 4 }}
              >
                Options not available for this type.
              </Typography>
            )}
          </TabPanel>

          {/* TAB 2: GRID */}
          <TabPanel value={2} sx={{ p: 0 }}>
            <GridPropsBuilder
              value={(selected.gridProps ?? {}) as Partial<GridProps>}
              onChange={(gp: any) => onPatch({ gridProps: gp })}
            />
          </TabPanel>

          {/* TAB 3: VALIDATION */}
          <TabPanel value={3} sx={{ p: 0 }}>
            <ValidationBuilder
              value={(selected.validation as ValidationRule) ?? {}}
              onChange={(rules: ValidationRule) =>
                onPatch({ validation: rules })
              }
            />
          </TabPanel>

          {/* TAB 4: CONDITIONS */}
          <TabPanel value={4} sx={{ p: 0 }}>
            <ConditionBuilder
              value={selected.conditions}
              onChange={(c: ConditionType) => onPatch({ conditions: c })}
            />
          </TabPanel>

          <TabPanel value={5} sx={{ p: 0 }}>
            <MuiPropsBuilder
              green={GREEN}
              value={(selected.muiProps ?? {}) as any}
              onChange={(next) => onPatch({ muiProps: next })}
            />
          </TabPanel>
        </Box>
      </Tabs>
    </Stack>
  );
}

export default React.memo(FormBuilderRightPanel);
