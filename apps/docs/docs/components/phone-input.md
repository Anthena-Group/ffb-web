---
title: Phone Number 
description: Documentation for the Phone Number input field using formik-form-builder
---

# Phone Number Input Example

This page documents the **Phone Number** field example using `formik-form-builder`.

## Code Explanation

### Phone Number Field

```tsx
{
  field: "phoneNumber",
  type: InputTypes.TEXT,
  label: "Phone Number",
  placeholder: "Enter your 10-digit phone number",
  validation: {
    required: true,
    pattern: /^[0-9]{10}$/,
    message: "Phone number must be exactly 10 digits",
  },
  helperText: "Only digits allowed, no spaces or special characters",
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

Here’s the output preview for the Phone number field:
![Phone Number Input Output](/img/phone-output.jpg)


## Summary
- This example demonstrates how to create a Phone Number field using formik-form-builder.

 - Uses InputTypes.TEXT to render a basic input.

- Validation accepts only 10 numeric digits (no letters/symbols).

- Regex is passed using a JavaScript RegExp object.

- Displays helper text to guide the user.



