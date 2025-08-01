import { Button, Link, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

function AcceptTerm() {
  const acceptance: FieldType[] = [
    {
      field: "Accept",
      type: InputTypes.CHECKBOX,
      initialValue: false,
      validation:{

      },
      options: [
        {
          label: "Accept terms and condition to continue",
          value: `true`,
        },
      ],
    },
  ];
  const { initailValues, yupSchemaValidation } = useFormBuilder(acceptance);
  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values),
          alert(JSON.stringify(values, null, 2)),
          actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <FormBuilder
            group="form"
            gridProps={{ xs: 12, lg: 12 }}
            fields={acceptance}
            data-test="form"
            values={values}
          />
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AcceptTerm;
