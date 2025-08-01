import { Formik, Form } from "formik";
import { FieldType } from "./types";
import { useFormBuilder } from "./hooks";
import { FormBuilder } from "./FormBuilder";

interface FormikRendererProps {
  fields: FieldType[];
  children?: React.ReactNode;
  onSubmit?: (values: any, actions: any) => void;
  onReset?: () => void;
  formProps?: {
    initialValues?: any;
    validationSchema?: any;
  };
  group?: string;
  builderProps?: Record<string, any>;
}

export const FormikRenderer: React.FC<FormikRendererProps> = ({
  fields,
  children,
  onSubmit,
  onReset,
  formProps,
  group = "form",
  builderProps = {},
}) => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(fields);

  const effectiveInitialValues = formProps?.initialValues || initailValues;
  const effectiveValidationSchema = formProps?.validationSchema || yupSchemaValidation;

  return (
    <Formik
      initialValues={effectiveInitialValues}
      validationSchema={effectiveValidationSchema}
      onSubmit={onSubmit || (() => {})}
      onReset={onReset}>
      <Form>
        <FormBuilder
          data-test="form-builder-root"
          fields={fields}
          group={group}
          values={effectiveInitialValues}
          {...builderProps}
        />
        {children || <button type="submit">Submit</button>}
      </Form>
    </Formik>
  );
};
