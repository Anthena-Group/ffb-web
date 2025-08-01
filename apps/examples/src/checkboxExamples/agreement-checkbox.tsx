import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

function Agreement() {
  const termsAndAgreement: FieldType[] = [
    {
      field: "termAcceptence",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      validation: {
        required:true,
        minLength: 1,
        minLengthRuleMsg: "Accept terms and condition to continue",
      },
      options: [
        {
          label: "Accept terms and condition to continue",
          value: "Accepted",
        },
      ],
      muiProps: { variant: "solid" },
    },
  ];

  const { initailValues, yupSchemaValidation } =
    useFormBuilder(termsAndAgreement);
  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <FormBuilder
            group="form"
            values={values}
            data-test="form"
            fields={termsAndAgreement}
          />
          <Button type="submit" variant="contained">
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Agreement;
