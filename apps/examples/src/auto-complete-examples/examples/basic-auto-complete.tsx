import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  useFormBuilder,
} from "formik-from-builder";
import { basic } from "../../constants/auto-complete-constants";


function BasicAuto() {
 
  const { initailValues, yupSchemaValidation } = useFormBuilder(basic);
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
            fields={basic}
          />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="solid" type="submit">
              Continue
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default BasicAuto;
