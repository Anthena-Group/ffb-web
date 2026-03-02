import { Card, CardContent, Typography, Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import {
  FormBuilder,
  useFormBuilder,
  type FieldType,
} from "@mjfy/core";
import { useMemo } from "react";

interface LivePreviewProps {
  finalConfig: Partial<FieldType>;
}

export function LivePreview({ finalConfig }: LivePreviewProps) {
  const hasConfig = Object.keys(finalConfig).length > 0;

  const { initialValues, yupSchemaValidation } = useMemo(() => {
    if (!hasConfig) {
      return { initialValues: {}, yupSchemaValidation: undefined };
    }
    return useFormBuilder([finalConfig as FieldType]);
  }, [hasConfig, finalConfig]);

  if (!hasConfig) return null;


  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardContent>
        <Typography level="h4">Live Form Preview</Typography>
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
                values={values}
                data-test="form"
                fields={[finalConfig as FieldType]}
              />
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
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
