import { Formik, Form } from "formik";
import { FormBuilder, useFormBuilder } from "@mjfy/core";
import { Button, Box } from "@mui/joy";
import { giftWrapFields } from "../../../constants";

const DisabledLogic = () => {
  const { initialValues, yupSchemaValidation } = useFormBuilder(giftWrapFields);

  return (
    <Formik
      initialValues={initialValues}
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
            data-test="form"
            fields={giftWrapFields}
            values={values}
          />
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

export default DisabledLogic;
