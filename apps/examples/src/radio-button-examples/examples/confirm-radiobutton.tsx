import { Box, Button } from "@mui/joy";
import { FormikRenderer } from "formik-form-builder";
import { confirmAction } from "../../constants";

export const Confirmation = () => {
  return (
    <FormikRenderer
      fields={confirmAction}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button variant="solid" type="submit">
          Continue
        </Button>
      </Box>
    </FormikRenderer>
  );
};
