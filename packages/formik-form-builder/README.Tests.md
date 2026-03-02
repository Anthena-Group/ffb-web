  
  # Testing Guide
  
## Test naming:

 
*.unit.test.tsx → fast, isolated (pure fns, field components).

*.int.test.tsx → render full builder, user interactions, validation and submit.

 *smoke.test.tsx -> Smoke Tests
  

## Example builder integration test (render → fill → validate → submit)

 
src/__tests__/builder 

Render Full Form with all the Components and test in the above folder

## Recommended folder structure



    formik-form-builder/
    ├─ src/
    ├─ __tests__/            # (optional) small black-box tests at package level
    │  └─ smoke.test.tsx
    │
    ├─ src/__tests__/        # unit + integration colocated by feature
    │  ├─ builder/
    │  │  ├─ FormBuilder.int.test.tsx
    │  │  └─ FieldFactory.unit.test.tsx
    │  ├─ components/fields/
    │  │  ├─ TextField.unit.test.tsx
    │  │  └─ SelectField.unit.test.tsx
    │  └─ utils/
    │     └─ normalizeSchema.unit.test.ts
    │
    ├─ test/
    │  ├─ setupTests.ts      # JSDOM, Testing Library setup, polyfills
    │  └─ matchMedia.polyfill.ts
    │
    ├─ jest.config.ts
    ├─ tsconfig.json
    ├─ tsconfig.test.json
    ├─ package.json
    └─ README.md
