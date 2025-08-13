import { Box, Button } from "@mui/joy";
import { FormikRenderer } from "formik-form-builder";
import { rate } from "../../constants";

export const Rating = () => {

  return (

    <FormikRenderer
      fields={rate}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button variant="solid" type="submit">
          Continue
        </Button>
      </Box>
    </FormikRenderer>
  );
};
