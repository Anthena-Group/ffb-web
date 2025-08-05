---
title: PAN Number Input
description: Documentation for the PAN Number input field using formik-form-builder
---

# PAN Number Input Example

This page documents the **PAN Number** field example using `formik-form-builder`.

## Code Explanation

### PAN Number Field

```tsx
{
  field: "panNumber",
  type: InputTypes.TEXT,
  label: "PAN Number",
  placeholder: "Enter your PAN (e.g., ABCDE1234F)",
  validation: {
    required: true,
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    message: "Enter a valid PAN number (ABCDE1234F)",
  },
  helperText: "PAN format: 5 letters, 4 digits, 1 letter (all uppercase)",
  muiProps: {
    variant: "plain",
    fullWidth: true,
  },
  gridProps: { xs: 12 },
}

You can test this example by running the examples app:

```bash
cd apps/examples
pnpm dev

```

Here’s the output preview for the PAN number field:
![PAN Input Output](/img/pan-output.jpg)