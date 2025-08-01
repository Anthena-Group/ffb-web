import {
  FormikRenderer,
  InputTypes,
  type FieldType
} from "formik-form-builder";

const SignInFormExample = () => {
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

  return (
    <>
      <FormikRenderer
        fields={SignInForm}
          onSubmit = {(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}>

      </FormikRenderer>
    </>
  );
};

export default SignInFormExample;
