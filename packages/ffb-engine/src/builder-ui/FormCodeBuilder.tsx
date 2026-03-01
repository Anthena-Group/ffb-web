// FormCodeBuilder.tsx
import React, { useMemo, useState } from "react";
import {
  Card,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Stack,
  Select,
  Option,
  Chip,
} from "@mui/joy";
import { Code2, Copy, Check, Terminal } from "lucide-react";
import type { FieldType } from "@mjfy/core";

type Mode = "FULL_CODE" | "JSON_ONLY";

interface FormCodeBuilderProps {
  fields: FieldType[];
  group?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightJsonHtml(jsonText: string) {
  // expects raw JSON string; returns HTML
  const escaped = escapeHtml(jsonText);

  // basic highlighting for JSON only
  return escaped
    .replace(/&quot;(\w+)&quot;:/g, '<span class="key">"$1"</span>:')
    .replace(/: &quot;(.*?)&quot;/g, ': <span class="string">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="number">$1</span>')
    .replace(/: (true|false)/g, ': <span class="boolean">$1</span>');
}

export const FormCodeBuilder = React.memo(({ fields, group = "form" }: FormCodeBuilderProps) => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>("FULL_CODE");

  const jsonText = useMemo(() => {
    return JSON.stringify(
      { group, fields },
      (_key, value) => (value instanceof RegExp ? value.source : value),
      2,
    );
  }, [fields, group]);

  const fullCodeText = useMemo(() => {
    const fieldsOnly = JSON.stringify(
      fields,
      (_key, value) => (value instanceof RegExp ? value.source : value),
      2,
    );

    return `import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import { FormBuilder, useFormBuilder, type FieldType } from "@mjfy/core";

const FIELDS: FieldType[] = ${fieldsOnly};

export default function GeneratedForm() {
  const { initialValues, yupSchemaValidation } = useMemo(() => {
    return useFormBuilder(FIELDS);
  }, []);

  return (
    <Card variant="outlined" sx={{ maxWidth: 720, mx: "auto" }}>
      <CardContent>
        <Typography level="h4">Generated Form</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={yupSchemaValidation}
          onSubmit={(values, actions) => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {({ values }) => (
            <Form>
              <FormBuilder group="${group}" values={values} fields={FIELDS} />

              <Box width="100%" display="flex" justifyContent="center" mt={2}>
                <Button variant="solid" type="submit">
                  Continue
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
`;
  }, [fields, group]);

  const outputText = mode === "FULL_CODE" ? fullCodeText : jsonText;

  const outputHtml = useMemo(() => {
    if (mode === "JSON_ONLY") return highlightJsonHtml(jsonText);
    // FULL_CODE: escape only, NO regex highlight
    return escapeHtml(fullCodeText);
  }, [mode, jsonText, fullCodeText]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const headerTitle = mode === "FULL_CODE" ? "Full React Code" : "JSON Only";

  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
        borderRadius: "xl",
        boxShadow: "lg",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Toolbar */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          gap: 1,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              p: 0.75,
              borderRadius: "md",
              bgcolor: "primary.solidBg",
              color: "white",
            }}
          >
            <Terminal size={18} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography level="title-sm" sx={{ color: "white" }} noWrap>
              {headerTitle}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Badge color="success" size="sm" variant="solid" sx={{ "--Badge-ring": "0px" }} />
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Live Sync Active
              </Typography>

              <Chip
                size="sm"
                variant="soft"
                sx={{ bgcolor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
              >
                Fields: {fields.length}
              </Chip>
            </Stack>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Select
            size="sm"
            variant="soft"
            value={mode}
            onChange={(_, v) => setMode((v ?? "FULL_CODE") as Mode)}
            sx={{
              minWidth: 140,
              borderRadius: "lg",
              bgcolor: "rgba(255,255,255,0.08)",
              color: "white",
              "& button": { color: "white" },
              "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
            }}
          >
            <Option value="FULL_CODE">Full code</Option>
            <Option value="JSON_ONLY">JSON only</Option>
          </Select>

          <Tooltip title={copied ? "Copied!" : mode === "FULL_CODE" ? "Copy full code" : "Copy JSON"} variant="solid">
            <IconButton
              variant="soft"
              color={copied ? "success" : "neutral"}
              onClick={handleCopy}
              sx={{
                borderRadius: "lg",
                "--IconButton-size": "36px",
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Divider sx={{ opacity: 0.1, bgcolor: "white" }} />

      {/* Code Display Area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflow: "auto",
          position: "relative",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          component="pre"
          sx={{
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "#94A3B8",
            whiteSpace: "pre",
            "& .key": { color: "#F472B6" },
            "& .string": { color: "#34D399" },
            "& .number": { color: "#FB923C" },
            "& .boolean": { color: "#818CF8" },
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: outputHtml }} />
        </Typography>
      </Box>

      {/* Footer Info */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: "rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          level="body-xs"
          startDecorator={<Code2 size={12} />}
          sx={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}
        >
          Generated by Formik Form Builder Engine
        </Typography>
      </Box>
    </Card>
  );
});