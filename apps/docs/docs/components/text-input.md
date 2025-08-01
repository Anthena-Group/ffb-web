---
id: text-input
title: Text Input Component
sidebar_label: Text Input
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page demonstrates the **TextInputDemo** component using `formik-form-builder`.

---

## Features Covered

- First Name Field – Includes required field validation with a custom message if left empty.

- Email Field which includes required field validation and format validation using a regular expression (e.g., someone@example.com)

- Auto-generated Form UI – Built using the formik-form-builder component

- UI Styling – Utilizes MUI (variant: soft, fullWidth: true) for a consistent, responsive layout.
---



## Code Explanation

### 1. First Name and Email Fields

```ts
{
  field: "firstName",
  type: InputTypes.TEXT,
  label: "First Name",
  validation: {
    required: true,
    message: "First Name is required",
  },
  helperText: "Please enter your first name",
  muiProps: {
    variant: "soft",
    fullWidth: true,
  },
  gridProps: { xs: 12 },
}
{
  field: "email",
  type: InputTypes.TEXT,
  label: "Email",
  validation: {
    required: true,
    message: "Email is required",
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    patternRuleMsg: "Enter a valid email",
  },
  helperText: "Please enter a valid email address",
  muiProps: {
    variant: "soft",
    fullWidth: true,
  },
  gridProps: { xs: 12 },
}

You can try the working example by running:

```bash
cd apps/examples
pnpm dev

```



Here’s the output preview for the first name and email fields:

<p align="center">
<img src="/img/basic-text-input-output.jpg" width="80%" />
</p>


