import { Box, Button } from "@mui/joy";
import { FormikRenderer } from "formik-form-builder";
import {  } from "../../constants/auto-complete-constants";
import { FeedBack } from "../../constants/multi-text-constants";

function BasicMultiText() {
  return (
    <FormikRenderer
      fields={FeedBack}
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

export default BasicMultiText;
