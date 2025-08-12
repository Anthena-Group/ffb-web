import { Box, Button } from "@mui/joy";
import { FormBuilder, useFormBuilder } from "formik-from-builder";
import { basicToggling } from "../../constants";
import { Form, Formik } from "formik";

function BasicToggleCheckBox() {
  const {initailValues, yupSchemaValidation} = useFormBuilder(basicToggling)
  return (
    // <FormikRenderer
    //   fields={basicToggling}
    //   onSubmit={(values, actions) => {
    //     console.log(values);
    //     alert(JSON.stringify(values, null, 2));
    //     actions.setSubmitting(false);
    //   }}
    // >
    //   <Box
    //     width={"100%"}
    //     display={"flex"}
    //     justifyContent={"center"}
    //     alignItems={"center"}
    //   >
    //     <Button variant="contained" type="submit">
    //       Submit
    //     </Button>
    //   </Box>
    // </FormikRenderer>
    
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
                fields={basicToggling}
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

export default BasicToggleCheckBox;
