import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

const Demo = () => {
  // const fields: FieldType[] = [
  //   {
  //     field: "fullName",
  //     type: InputTypes.TEXT,
  //     label: "Full Name",
  //     helperText: "Enter your last Name",
  //     validation: { required: true, message: "First name is required" },
  //     muiProps: { variant: "soft" },
  //   },
  //   {
  //     field: "title",
  //     type: InputTypes.TEXT,
  //     label: "Full Name",
  //     validation: {
  //       required: true,
  //       message: "First name is required",
  //       minLength: 3,
  //       minLengthRuleMsg: "This 3 is required",
  //       maxLength: 5,
  //     },
  //     muiProps: { variant: "soft", fullWidth: true, type: "number" },
  //     gridProps: { xs: 12 },
  //   },
  //   // {
  //   //   field: "test.lastName",
  //   //   type: InputTypes.MULTI_TEXT,
  //   //   label: "Last Name",
  //   //   initialValue: "Doe",
  //   //   helperText: "Enter your last Name",
  //   //   validation: { required: true, message: "First name is required" },
  //   //   muiProps: { variant: "soft" },
  //   // },
  //   // {
  //   //   field: "test.firstName",
  //   //   type: InputTypes.TEXT,
  //   //   label: "Last 2",
  //   //   initialValue: "sssss",
  //   //   helperText: "Enter your last Name",
  //   //   validation: { required: true, message: "First name is required" },
  //   //   muiProps: { variant: "soft" },
  //   // },
  //   // {
  //   //   field: "MyCheckBox",
  //   //   type: InputTypes.CHECKBOX,
  //   //   groupLabel: "",
  //   //   helperText: "testing this checkbox with all the values",
  //   //   initialValue: [],
  //   //   validation: {
  //   //     required: true,
  //   //     message: "Please accept the terms",
  //   //     minLength: 1,
  //   //   },
  //   //   muiProps: {},
  //   //   options: [
  //   //     {
  //   //       label: "Option 1",
  //   //       value: "option1",
  //   //       description:
  //   //         "test is not the only thing people of the memeber of the  ithat is the best of the life of the need of",
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   field: "MyCheckBox2",
  //   //   type: InputTypes.CHECKBOX,
  //   //   groupLabel: "Choose any one",
  //   //   helperText: "testing this checkbox with all the values",
  //   //   initialValue: [],
  //   //   validation: {
  //   //     required: true,
  //   //     message: "Please accept the terms",
  //   //     minLength: 1,
  //   //   },
  //   //   muiProps: {},
  //   //   options: [
  //   //     {
  //   //       label: "Option 2",
  //   //       value: "option2",
  //   //       description: "testing this option",
  //   //     },
  //   //     {
  //   //       label: "Option 6",
  //   //       value: "option5",
  //   //       description: "what do you think I cant test this option ",
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   field: "radio1",
  //   //   type: InputTypes.RADIO,
  //   //   label: "radio",
  //   //   groupLabel: "Gender",
  //   //   initialValue: "",
  //   //   options: [
  //   //     { label: "Male", value: "male" },
  //   //     { label: "Female", value: "female" },
  //   //   ],
  //   //   validation: { required: true, message: "Please accept the terms" },
  //   // },
  //   // {
  //   //   field: "select25",
  //   //   type: InputTypes.AUTO_COMPLETE,
  //   //   label: "Shazam 2",
  //   //   initialValue: "",
  //   //   options: [
  //   //     { label: "Male", value: "male" },
  //   //     { label: "Female", value: "female" },
  //   //   ],
  //   //   validation: { required: true, message: "Please accept the terms" },
  //   //   gridProps: { xs: 12, sm: 4 },
  //   // },
  //   // {
  //   //   field: "select1",
  //   //   type: InputTypes.SELECT,
  //   //   label: "Shazam",
  //   //   helperText: "They Please select the dog type",
  //   //   options: [
  //   //     { label: "Male", value: "male" },
  //   //     { label: "Female", value: "female" },
  //   //     { label: "select", value: "" },
  //   //   ],
  //   //   validation: { required: true, message: "Please accept the terms" },
  //   //   gridProps: { xs: 12, sm: 4 },
  //   // },
  // ];

  const SignInForm: FieldType[] = [
    {
      field: "email",
      type: InputTypes.TEXT,
      label: "Email",
      validation: {
        required: true,
        message: "Email is Must, you should fill it.",
      },
      muiProps: { variant: "soft", fullWidth: true, type: "email" },
    },
    {
      field: "password",
      type: InputTypes.TEXT,
      label: "Password",
      validation: {
        required: true,
        message: "Password is Must, you should fill it.",
      },
      muiProps: { variant: "soft", fullWidth: true, type: "password" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(SignInForm);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      <Form>
        <FormBuilder
          group="form"
          fields={SignInForm}
          data-test="form"
          values={initailValues}
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Demo;
