import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder, InputTypes, type FieldType } from "formik-form-builder";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Component
const DarkLight = () => {
  const darkLight: FieldType[] = [
    {
      field: "mode",
      type: InputTypes.RADIO,
      initialValue: "Dark",
      groupLabel: "Choose a theme:",
      options: [
        { label: "Dark", value: "Dark" },
        { label: "Light", value: "Light" },
      ],
      variant: "ICON",
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(darkLight);

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
          <FormBuilder data-test="form" values={values} fields={darkLight} group="form" />
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
describe("DarkLight Form", () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  it("renders both Dark and Light options", () => {
    render(<DarkLight />);
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBe(2);
    expect(radios.find(r => r.getAttribute("value") === "Dark")).toBeInTheDocument();
    expect(radios.find(r => r.getAttribute("value") === "Light")).toBeInTheDocument();
  });

  it("submits selected theme", async () => {
    render(<DarkLight />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios.find(r => r.getAttribute("value") === "Light")!);
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringMatching(/"mode":\s*"Light"/)
      );
    });
  });

  it("submits default theme if not changed", async () => {
    render(<DarkLight />);
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringMatching(/"mode":\s*"Dark"/)
      );
    });
  });
});

export default DarkLight;
