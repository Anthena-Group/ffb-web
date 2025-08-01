import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

const ToDoExample = () => {
  const checklistFields: FieldType[] = [
    {
      field: "tasks",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      direction:"row",
      groupLabel: "Tasks to complete:",
      options: [
        { label: "Check email", value: "email" },
        { label: "Write code", value: "code" },
        { label: "Attend standup", value: "standup" },
        { label: "Review PRs", value: "review" },
      ],
      muiProps:{variant:"solid"}
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(checklistFields);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        alert("Completed Tasks: " + JSON.stringify(values.tasks, null, 2))
        actions.setSubmitting(false)
      }}
    >
      {({ values }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Checklist Example usage
          </Typography>

          <FormBuilder
            group="form"
            fields={checklistFields}
            values={values}
            data-test="form"
          />

          <Button variant="contained" type="submit">
            Completed
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ToDoExample;