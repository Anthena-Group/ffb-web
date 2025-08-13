import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Box, Typography, Button, Stack } from "@mui/joy";

import { Formik, Form } from "formik";
import { FormBuilder, InputTypes, useFormBuilder } from "formik-form-builder";

type LiveCodeBlockProps = {
  code: string;
  scope?: Record<string, any>;
  componentName?: string;
};

const defaultScope = {
  React,
  Box,
  Typography,
  Button,
  Formik,
  Form,
  FormBuilder,
  InputTypes,
  useFormBuilder,
};

function processCode(code: string, componentName: string) {
  const lines = code.split("\n");
  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    return !trimmed.startsWith("import") && !trimmed.startsWith("export");
  });
  filtered.push(`\nrender(<${componentName} />);`);
  return filtered.join("\n");
}

export default function LiveCodeBlock({
  code,
  scope = {},
  componentName = "",
}: LiveCodeBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  return (
    <LiveProvider
      language="tsx"
      enableTypeScript
      code={code}
      scope={{ ...defaultScope, ...scope }}
      noInline
      transformCode={(wholeCode) => processCode(wholeCode, componentName)}
    >
      <Box
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          fontSize: 14,
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ddd",
        }}
      >
        <Box sx={{ px: 2, py: 1,bgcolor:"white",mb: 0.5, borderBottom: "1px solid #ddd" }}>
          <LiveError />
          <LivePreview/>
        </Box>

        <Box
          sx={{
            px: 2,
            py: 0.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h4" fontFamily={"monospace"}>
            Code Editor
          </Typography>
          <Stack direction="row" gap={1}>
            <Button variant="soft" size="sm" onClick={handleCopy}>
              {copied ? "Copied..!" : "Copy"}
            </Button>
            <Button
              variant="soft"
              size="sm"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Collapse" : "Expand"}
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            maxHeight: expanded ? "none" : 300,
            overflow: "auto",
            transition: "all 1s ease",
            scrollbarWidth: "none",
            bgcolor: "black",
          }}
        >
          <LiveEditor
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              minHeight: 300,
            }}
          />
        </Box>
      </Box>
    </LiveProvider>
  );
}
