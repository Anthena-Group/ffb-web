---
title: Username Input
description: Documentation for the Username input field using formik-form-builder
---

# Username Input Example

This page documents the **Username** field example using `formik-form-builder`.


## Code Explanation

###  Username Field

```tsx
{
  field: "username",
  type: InputTypes.TEXT,
  label: "Username",
  placeholder: "Enter your username", //added one
  validation: {
    required: true,
    message: "Username is required",
  },
  helperText: "Choose a unique username",
  muiProps: {
    variant: "plain",
    fullWidth: true,
  },
  gridProps: { xs: 12 },
}


You can try the working example by running:

```bash
cd apps/examples
pnpm dev



```

Here’s the output preview for the username field:

![Username Input Output](/img/username-output.jpg)





### Summary

This example demonstrates how to create a simple Username field using formik-form-builder.

- It uses InputTypes.TEXT to render a standard text input.

- Includes a required validation rule with a custom error message.

- Displays helper text and uses Material UI props for styling.







