# Formik Form Builder

Leverage Formik-Form-Builder Creator to effortlessly construct MUI-based forms using concise JSON definitions.

# Usage
## Here is a basic example of how to use the Formik Form Builder:

Play with it [SANBOX](https://codesandbox.io/p/sandbox/formik-form-builder-exmaple-2552ys?file=%2Fsrc%2FApp.js)

The provided code is a React component that uses `Formik` for form management and a custom `FormBuilder` component to dynamically generate form fields. Below is a detailed explanation of how to use this code, along with examples and usage scenarios.

### 1. **Install Dependencies**

Before using the code, ensure you have the necessary dependencies installed:

```bash
npm install formik-form-builder
```

```bash
yarn add formik-form-builder
```

- **Formik**: A popular library for building forms in React.
- **Yup**: A schema validation library often used with Formik.
- **Material-UI (MUI)**: A UI library that provides pre-built components like text fields, checkboxes, etc.

### 2. **Importing Required Modules**

The code imports several modules from `formik` and a custom `form-builder` module:

```javascript
import { Form, Formik } from 'formik';
import { ConditionAction, ConditionName, FieldType, FormBuilder, InputTypes, PostCondition, useFormBuilder } from './form-builder';
```

- **Formik**: Provides the `Formik` component and `Form` helper.
- **FormBuilder**: A custom component that dynamically generates form fields based on the provided configuration.
- **useFormBuilder**: A custom hook that initializes form values and validation schema.

### 3. **Defining Form Fields**

The `fields` array contains the configuration for each form field. Each field is an object with properties like `field`, `type`, `label`, `validation`, `muiProps`, etc.

#### Example Field Configurations:

- **Text Input**:

  ```javascript
  {
    field: 'title',
    type: InputTypes.TEXT,
    label: 'Property Title',
    validation: { required: true, message: "First name is required" },
    muiProps: { variant: 'soft', fullWidth: true }
  }
  ```

- **Checkbox**:

  ```javascript
  {
    field: 'MyCheckBox',
    type: InputTypes.CHECKBOX,
    groupLabel: "",
    helperText: "testing this checkbox with all the values",
    initialValue: [],
    validation: { required: true, message: "Please accept the terms", minLength: 1 },
    muiProps: {},
    options: [{ label: 'Option 1', value: 'option1', description: "test is not the only thing people of the memeber of the  ithat is the best of the life of the need of" }],
  }
  ```

- **Radio Button**:

  ```javascript
  {
    field: 'radio1',
    type: InputTypes.RADIO,
    label: 'radio',
    groupLabel: 'Gender',
    initialValue: '',
    options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
    validation: { required: true, message: "Please accept the terms" }
  }
  ```

- **Select Dropdown**:

  ```javascript
  {
    field: 'select1',
    type: InputTypes.SELECT,
    label: 'Shazam',
    helperText: "They Please select the dog type",
    options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'select', value: '' }],
    validation: { required: true, message: "Please accept the terms" },
    gridProps: { xs: 12, sm: 4 }
  }
  ```

### 4. **Using `useFormBuilder` Hook**

The `useFormBuilder` hook is used to generate initial values and validation schema based on the `fields` array:

```javascript
const { initailValues, yupSchemaValidation } = useFormBuilder(fields);
```

- **initailValues**: An object containing the initial values for each field.
- **yupSchemaValidation**: A Yup validation schema generated based on the validation rules defined in the `fields` array.

### 5. **Formik Integration**

The `Formik` component is used to manage form state, validation, and submission:

```javascript
<Formik
  initialValues={initailValues}
  validationSchema={yupSchemaValidation}
  onSubmit={(values, actions) => {
    setTimeout(() => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  }}
>
  {({ values }) => (
    <Form>
      <FormBuilder group="form" fields={fields} data-test="form" values={values} />
      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>
```

- **initialValues**: The initial values for the form fields.
- **validationSchema**: The Yup validation schema.
- **onSubmit**: A callback function that is called when the form is submitted.
- **FormBuilder**: A custom component that renders the form fields based on the `fields` array.

### 6. **Conditional Logic**

The `conditions` property allows you to define conditional logic for showing/hiding fields based on the values of other fields:

```javascript
conditions: {
  action: ConditionAction.SHOW,
  groups: [{
    group: "check",
    groupPostCondition: PostCondition.AND,
    logic: [
      {
        field: 'test.firstName',
        value: "10",
        condition: ConditionName.EQUALS,
        postCondition: PostCondition.AND
      },
    ]
  }]
}
```

- **action**: Specifies whether to `SHOW` or `HIDE` the field based on the condition.
- **groups**: An array of condition groups.
- **logic**: An array of conditions that must be met for the action to take effect.

### 7. **Grid Layout**

The `gridProps` property allows you to define the layout of the form fields using Material-UI's grid system:

```javascript
gridProps: { xs: 12, sm: 4 }
```

- **xs**: The number of columns the field should occupy on extra small screens.
- **sm**: The number of columns the field should occupy on small screens.

### 8. **Form Submission**

When the form is submitted, the `onSubmit` function is called, which logs the form values and displays them in an alert:

```javascript
onSubmit={(values, actions) => {
  setTimeout(() => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
}}
```

### 9. **Complete Example**

Here is the complete example with all the fields and configurations:

```javascript
import { Form, Formik } from 'formik';
import { ConditionAction, ConditionName, FieldType, FormBuilder, InputTypes, PostCondition, useFormBuilder } from './form-builder';

export function App() {
  const fields: FieldType[] = [
    {
      field: 'title', type: InputTypes.TEXT, label: 'Property Title',
      validation: { required: true, message: "First name is required" },
      muiProps: { variant: 'soft', fullWidth: true }
    },
    {
      field: 'test.lastName', type: InputTypes.TEXT, label: 'Last Name', initialValue: 'Doe',
      helperText: "Enter your last Name",
      validation: { required: true, message: "First name is required" },
      muiProps: { variant: 'soft' },
      conditions: {
        action: ConditionAction.SHOW,
        groups: [{
          group: "check", groupPostCondition: PostCondition.AND, logic: [
            {
              field: 'test.firstName', value: "10", condition: ConditionName.EQUALS,
              postCondition: PostCondition.AND
            },
          ]
        }]
      }
    },
    {
      field: 'test.amount', type: InputTypes.TEXT,
      label: 'Amount', initialValue: 0,
      helperText: "Enter your last Name",
      validation: { required: true, message: "Amount is required", isPositive: true },
      muiProps: { variant: 'soft', type: 'number' },
    },
    {
      field: 'test.firstName', type: InputTypes.TEXT, label: 'Last 2', initialValue: 'sssss',
      helperText: "Enter your last Name",
      validation: { required: true, message: "First name is required" },
      muiProps: { variant: 'soft' }
    },
    {
      field: 'MyCheckBox', type: InputTypes.CHECKBOX, groupLabel: "",
      helperText: "testing this checkbox with all the values",
      initialValue: [],
      validation: { required: true, message: "Please accept the terms", minLength: 1 },
      muiProps: {},
      options: [{ label: 'Option 1', value: 'option1', description: "test is not the only thing people of the memeber of the  ithat is the best of the life of the need of" }],
    },
    {
      field: 'MyCheckBox2', type: InputTypes.CHECKBOX, groupLabel: "Choose any one",
      helperText: "testing this checkbox with all the values",
      initialValue: [],
      validation: { required: true, message: "Please accept the terms", minLength: 1 },
      muiProps: {},
      options: [{ label: 'Option 2', value: 'option2', description: "testing this option" }, { label: 'Option 6', value: 'option5', description: "what do you think I cant test this option " }],
    },
    {
      field: 'radio1', type: InputTypes.RADIO, label: 'radio',
      groupLabel: 'Gender',
      initialValue: '',
      options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
      validation: { required: true, message: "Please accept the terms" }
    },
    {
      field: 'radio2', type: InputTypes.RADIO, label: 'radio',
      groupLabel: 'Gender',
      initialValue: '',
      options: [{ label: 'Male334', value: true }, { label: 'Female333', value: false }],
      validation: { required: true, message: "Please accept the terms" }
    },
    {
      field: 'select25', type: InputTypes.RADIO, label: 'Shazam 2', initialValue: '',
      options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
      validation: { required: true, message: "Please accept the terms" },
      gridProps: { xs: 12, sm: 4 }
    },
    {
      field: 'select30', type: InputTypes.AUTO_COMPLETE, label: 'Shazam 2', initialValue: '',
      options: [{ label: 'Male', value: true }, { label: 'Female', value: false }],
      validation: { required: true, message: "Please accept the terms" },
      gridProps: { xs: 12, sm: 4 }
    },
    {
      field: 'select1', type: InputTypes.SELECT, label: 'Shazam',
      helperText: "They Please select the dog type",
      options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'select', value: '' }],
      validation: { required: true, message: "Please accept the terms" },
      gridProps: { xs: 12, sm: 4 }
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(fields);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(values);
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values }) => (
        <Form>
          <FormBuilder group="form" fields={fields} data-test="form" values={values} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default App;
```

### 10. **Running the Application**

To run the application, simply include the `App` component in your main `index.js` or `App.js` file and start the development server:

```bash
npm start
```

This will start the React application, and you should see the form rendered in your browser.


# License
## This project is licensed under the MIT License. See the LICENSE file for details.

Author
Created by [codewithshinde]("https://github.com/codewithshinde").