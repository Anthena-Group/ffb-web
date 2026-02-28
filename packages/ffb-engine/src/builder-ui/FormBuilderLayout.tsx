// FormBuilderLayout.tsx
import * as React from "react";
import { Box, Sheet, Stack, Typography, IconButton, Tooltip } from "@mui/joy";
import { Widgets, Tune } from "@mui/icons-material";

export type GreenTheme = {
  accent: string;
  glow: string;
  glow2: string;
};

export function FormBuilderLayout({
  green,
  title = "Green Form Builder",
  subtitle = "Drag elements · Drop on canvas · Select to configure · Preview or export JSON",
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
  left,
  center,
  right,
}: {
  green: GreenTheme;
  title?: string;
  subtitle?: string;
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) {
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
          `radial-gradient(1000px 600px at 15% 0%, ${green.glow}, transparent 60%),` +
          `radial-gradient(900px 500px at 95% 10%, ${green.glow2}, transparent 55%),` +
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
            bgcolor: green.glow,
            color: green.accent,
          }}
        >
          <Typography level="title-sm">FB</Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography level="title-md">{title}</Typography>
          <Typography level="body-xs" sx={{ opacity: 0.75 }} noWrap>
            {subtitle}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Tooltip title={leftOpen ? "Hide elements" : "Show elements"}>
            <IconButton variant="outlined" onClick={onToggleLeft}>
              <Widgets />
            </IconButton>
          </Tooltip>
          <Tooltip title={rightOpen ? "Hide settings" : "Show settings"}>
            <IconButton variant="outlined" onClick={onToggleRight}>
              <Tune />
            </IconButton>
          </Tooltip>
        </Stack>
      </Sheet>

      {/* 3-column body */}
      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        {left}
        {center}
        {right}
      </Box>
    </Box>
  );
}