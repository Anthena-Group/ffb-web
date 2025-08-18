import { Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import { FormBuilder, InputTypes, useFormBuilder, type FieldType } from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
function FullName() {
  const fullName: FieldType[] = [
    {
      field: "name",
      type: InputTypes.TEXT,
      initialValue: "",
      label: "FullName",
      validation: {
        required: true,
        message: "Required",
      },
      gridProps: { xs: 10, md: 5 },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(fullName);

  return (
    <Formik
      initialValues={initailValues}
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
            fields={fullName}
          />
          <Box
            width={"40%"}
            mt={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="solid" type="submit">
              Continue
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

// ---------------- Test ----------------
describe("FullName Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field", () => {
    render(<FullName />);
    expect(screen.getByLabelText(/FullName/i)).toBeInTheDocument();
  });

  it("submits entered name correctly", async () => {
    render(<FullName />);
    const input = screen.getByLabelText(/FullName/i);
    await userEvent.type(input, "John Doe");

    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ name: "John Doe" }, null, 2)
      );
    });
  });


});

export default FullName;
