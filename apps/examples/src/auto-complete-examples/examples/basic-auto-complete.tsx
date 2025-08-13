import { Box, Button } from "@mui/joy";
import { FormikRenderer } from "formik-form-builder";
import { basic } from "../../constants/auto-complete-constants";

function BasicAuto() {
  return (
    <FormikRenderer
      fields={basic}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} >
        <Button variant="solid" type="submit">
          Continue
        </Button>
      </Box>
    </FormikRenderer>
  );
}

export default BasicAuto;
