// FormBuilderLeftPanel.tsx
import * as React from "react";
import { useDrag } from "react-dnd";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Sheet,
} from "@mui/joy";
import { AddCircleOutline, ChevronLeft } from "@mui/icons-material";
import type { InputTypes } from "@mjfy/core";

export type PaletteItem = { type: InputTypes; label: string };

type GreenTheme = {
  accent: string;
  glow: string;
};

export function FormBuilderLeftPanel({
  leftOpen,
  setLeftOpen,
  palette,
  dndPaletteType,
  green,
  typeMeta,
}: {
  leftOpen: boolean;
  setLeftOpen: (v: boolean) => void;
  palette: PaletteItem[];
  dndPaletteType: string;
  green: GreenTheme;
  typeMeta: (type: InputTypes) => { chip: string; hint: string };
}) {
  return (
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
        {palette.map((p) => (
          <PaletteCard
            key={String(p.type)}
            item={p}
            dndPaletteType={dndPaletteType}
            green={green}
            typeMeta={typeMeta}
          />
        ))}
      </Stack>
    </Sheet>
  );
}

function PaletteCard({
  item,
  dndPaletteType,
  green,
  typeMeta,
}: {
  item: PaletteItem;
  dndPaletteType: string;
  green: GreenTheme;
  typeMeta: (type: InputTypes) => { chip: string; hint: string };
}) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: dndPaletteType,
      item,
      collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
    }),
    [item, dndPaletteType],
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
          borderColor: green.accent,
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
            bgcolor: green.glow,
            color: green.accent,
          }}
        >
          <AddCircleOutline sx={{ fontSize: "1.1rem" }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography level="title-sm" noWrap>
              {item.label}
            </Typography>
            <Chip size="sm" variant="soft" sx={{ bgcolor: green.glow, color: green.accent }}>
              {meta.chip}
            </Chip>
          </Stack>

          <Tooltip title="Drag to canvas">
            <Typography level="body-xs" sx={{ opacity: 0.72, mt: 0.25 }} noWrap>
              {meta.hint} · Drag to canvas
            </Typography>
          </Tooltip>
        </Box>
      </Stack>
    </Card>
  );
}