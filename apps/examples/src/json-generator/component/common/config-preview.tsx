import { Card, CardContent, Typography } from "@mui/joy";
import type { FieldType } from "@mjfy/core";
import { useMemo } from "react";
interface ConfigPreviewProps {
  finalConfig: Partial<FieldType>;
}

export function ConfigPreview({ finalConfig }: ConfigPreviewProps) {
  const prettyConfig = useMemo(
    () =>
      JSON.stringify(
        finalConfig,
        (_key, value) => (value instanceof RegExp ? value.source : value),
        2
      ),
    [finalConfig]
  );

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardContent>
        <Typography level="h4">Preview Config</Typography>
        <pre
          style={{
            marginTop: 16,
            fontSize: "0.875rem",
            backgroundColor: "#f9f9f9",
            padding: 12,
            borderRadius: 6,
          }}
        >
          {prettyConfig}
        </pre>
      </CardContent>
    </Card>
  );
}
