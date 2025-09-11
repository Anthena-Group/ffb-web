import { Card, CardContent, Typography } from "@mui/joy";

interface Props {
  finalConfig: any;
}

export function ConfigPreview({ finalConfig }: Props) {
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
          {JSON.stringify(
            finalConfig,
            (_key, value) => (value instanceof RegExp ? value.source : value),
            2
          )}
        </pre>
      </CardContent>
    </Card>
  );
}
