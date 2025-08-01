import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

const TextInputDemo = () => {
  // Step 1: Define input fields
  const fields: FieldType[] = [
    {
      field: "firstName", // Field name (used in form values)
      type: InputTypes.TEXT, // Type of input field
      label: "First Name", // Label shown above the input
      validation: {
        required: true,
        message: "First Name is required", // Validation message if empty
      },
      helperText: "Please enter your first name", // Info shown below input
      muiProps: {
        variant: "plain",
        fullWidth: true,
      },
      gridProps: { xs: 12 }, // Full width field on grid
    },
    {
    field: "email",
    type: InputTypes.TEXT,
    label: "Email",
    validation: {
      required: true,
      message: "Email is required",
       pattern:
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // ✅ Email regex pattern
    patternRuleMsg: "Enter a valid email", // Message if format is wrong
    },
    helperText: "Please enter a valid email address",
    muiProps: {
      variant: "plain" ,
      fullWidth: true,
    },
    gridProps: { xs: 12 },
  },

 {
  field: "username",
  type: InputTypes.TEXT,
  label: "Username",
  placeholder: "Enter your username",  // 👈 this is the new thing here!
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
},
 {
  field: "password",
  type: InputTypes.TEXT,
  label: "Password",
  placeholder: "Enter your password",
  validation: {
    required: true,
    message: "Password is required",
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
    patternRuleMsg:
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
  },
  helperText: "Include uppercase, lowercase, number, and symbol",
  muiProps: {
    variant: "outlined",
    fullWidth: true,
    type: "password",
  },
  gridProps: { xs: 12 },
},

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
},

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


  ];

  // Step 2: Build initial values and validation schema using hook
  const { initailValues, yupSchemaValidation } = useFormBuilder(fields);

  // Step 3: Render Formik with FormBuilder
  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <FormBuilder
  fields={fields}
  group="form"
  values={initailValues}       
  data-test="form"       
  />         
      </Form>
    </Formik>
  );
};

export default TextInputDemo;
