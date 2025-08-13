---
title: Introduction
sidebar_position: 1
---

# Formik Form Builder

Leverage **Formik-Form-Builder** to effortlessly construct MUI-based forms using concise JSON definitions.

### What is Formik Form Builder?
Formik Form Builder is a customizable, configuration-driven form creation library built on top of:
- Formik (for form state management and validation)
- MUI (Material UI or Joy UI components)
- Yup (for validation rules)

It allows you to define forms entirely via a JSON configuration object. No more repetitive boilerplate — the form layout, fields, validations, and even conditional display logic are all driven by a single config.

### Core Concept:
1. Declarative: Define what the form should look like and how it should behave in JSON.
2. DRY (Don’t Repeat Yourself): Avoid repeating the same Formik setup across multiple forms.
3. Extensible: Easily add new input types, validation rules, or UI customizations.

### JSON-driven field definitions
- Built-in validation support (Yup)
- Dynamic field visibility and enabling/disabling based on other field values
- Multiple input types (text, number, select, checkbox, radio, date, etc.)
- MUI styling with support for both Material and Joy themes
- Easy integration with custom components