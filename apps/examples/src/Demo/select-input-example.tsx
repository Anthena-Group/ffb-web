import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { fields, selectField } from "./constants";

const SelectInputDemo = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(fields);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <FormBuilder
          fields={selectField}
          group="form"
          values={initailValues}
          data-test="form"
        />
      </Form>
    </Formik>
  );
};

export default SelectInputDemo;
