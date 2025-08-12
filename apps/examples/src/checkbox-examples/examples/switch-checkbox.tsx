import { Formik, Form } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { Button, Box } from "@mui/joy";
import { switchField } from "../../constants";

const SwitchDemo = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(switchField);

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
          <FormBuilder group="form" data-test="form" fields={switchField} values={values} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="solid">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SwitchDemo;
