---
id: checkbox
title: Checkbox
description: Checkbox usage
---

Checkboxes give users binary choices when presented with multiple options in a series.

## Introduction

[Checkboxes](./checkbox.md) provide users with a graphical representation of a binary choice (yes or no, on or off). They are most commonly presented in a series, giving the user multiple choices to make.

---

### Basic toggle Checkbox

![Docosaurus](../../static/img/docusaurus.png)
```tsx
    {
      field: "music",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      groupLabel: "Do you love music?:",
      validation: {
        required: true,
      },
      options: [ { label: "Yes", value: "Yes" }, { label: "No", value: "No" }],
    },
```
