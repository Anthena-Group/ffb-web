---
id: password-input
title: Password Input
sidebar_label: Password
---

# Password Input Example

This page documents the **Password** field example using `formik-form-builder`.

##  Code Explanation

### Password Field

```tsx
{
  field: "password",
  type: InputTypes.TEXT,
  label: "Password",
  placeholder: "Enter your password",
  validation: {
    required: true,
    message: "Password is required",
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
    patternRuleMsg: "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
  },
  helperText: "Use a strong password",
  muiProps: {
    variant: "outlined",
    fullWidth: true,
    type: "password", // Hides the password
  },
  gridProps: { xs: 12 },
}

---
## Try It Out

You can test this example by running the examples app:

```bash
cd apps/examples
pnpm dev



```

Here’s the output preview for the username field:

![Password Input Output](/img/password-output.jpg)


##  Summary

In this example, we created a secure **Password** input field using `formik-form-builder`.  
It includes required field validation and a strong regex pattern to enforce secure password rules  
(uppercase, lowercase, number, special character, and at least 6 characters).

We also used `muiProps.type = password` to mask the input.


