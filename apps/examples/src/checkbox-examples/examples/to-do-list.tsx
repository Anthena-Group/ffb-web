import { Box, Button, Typography } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { checklistFields } from "../../constants";

const ToDoExample = () => {
  const { initailValues, yupSchemaValidation } =
    useFormBuilder(checklistFields);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        alert("Completed Tasks: " + JSON.stringify(values.tasks, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <Typography level="h4" gutterBottom>
            Checklist Example usage
          </Typography>

          <FormBuilder
            group="form"
            fields={checklistFields}
            values={values}
            data-test="form"
          />

          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="solid" type="submit">
              Completed
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ToDoExample;
