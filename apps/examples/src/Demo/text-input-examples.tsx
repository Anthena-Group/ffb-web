import { Form, Formik } from "formik";
import {
  FormBuilder,
  useFormBuilder,
} from "formik-form-builder";
import { fields } from "./constants";

const TextInputDemo = () => {
 
  const { initailValues, yupSchemaValidation } = useFormBuilder(fields);

  // Render Formik with FormBuilder
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
  fields={fields}
  group="form"
  values={initailValues}       
  data-test="form"       
  />         
      </Form>
    </Formik>
  );
};

export default TextInputDemo;
