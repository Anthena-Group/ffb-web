import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder, InputTypes, type FieldType } from "formik-form-builder";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Component
const GenderRadioButton = () => {
  const gender: FieldType[] = [
    {
      field: "gender",
      type: InputTypes.RADIO,
      groupLabel: "What's your gender?",
      initialValue: "",
      validation: { required: true, message: "This field is required" },
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(gender);

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
          <FormBuilder data-test="form" values={values} fields={gender} group="form" />
          <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// Tests
describe("GenderRadioButton Form", () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  it("renders both gender radio options", () => {
    render(<GenderRadioButton />);
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBe(2);
    expect(radios.find(r => r.getAttribute("value") === "Male")).toBeInTheDocument();
    expect(radios.find(r => r.getAttribute("value") === "Female")).toBeInTheDocument();
  });

  it("submits selected gender", async () => {
    render(<GenderRadioButton />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios.find(r => r.getAttribute("value") === "Female")!);
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringMatching(/"gender":\s*"Female"/)
      );
    });
  });

  it("shows validation error if not selected", async () => {
    render(<GenderRadioButton />);
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalled();
      expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
    });
  });
});
