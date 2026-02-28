// FormBuilderPreview.tsx
import { Card, CardContent, Typography, Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import { FormBuilder, useFormBuilder, type FieldType } from "formik-form-builder";
import { useMemo } from "react";

interface FormBuilderPreviewProps {
  fields: FieldType[];
  group?: string;
}

export function FormBuilderPreview({ fields, group = "form" }: FormBuilderPreviewProps) {
  const hasConfig = fields.length > 0;

  const { initialValues, yupSchemaValidation } = useMemo(() => {
    if (!hasConfig) return { initialValues: {}, yupSchemaValidation: undefined };
    return useFormBuilder(fields);
  }, [hasConfig, fields]);

  if (!hasConfig) return null;

  return (
    <Card variant="outlined" sx={{ flex: 1, minHeight: "400px" }}>
      <CardContent>
        <Typography level="h4">Live Form Preview</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={yupSchemaValidation}
          onSubmit={(values, actions) => {
            // eslint-disable-next-line no-console
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {({ values }) => (
            <Form>
              <FormBuilder group={group} values={values} data-test="form" fields={fields} />

              <Box width="100%" display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button variant="solid" type="submit">
                  Continue
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}