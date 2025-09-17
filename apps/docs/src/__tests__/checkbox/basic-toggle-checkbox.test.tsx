import { Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
export const BasicToggleCheckBox = () => {
  const basicToggling: FieldType[] = [
    {
      field: "sport",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      groupLabel: "Choose the sports you love:",
      validation: {
        required: true,
        minLength: 1,
        minLengthRuleMsg: "Choose at least one sport",
      },
      options: [
        { label: "Football", value: "Football" },
        { label: "Volleyball", value: "Volleyball" },
        { label: "BasketBall", value: "BasketBall" },
        { label: "Cricket", value: "Cricket" },
      ],
      muiProps: { variant: "outlined" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(basicToggling);

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
          <FormBuilder group="form" values={values} data-test="form" fields={basicToggling} />
          <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <Button variant="solid" type="submit">
              Continue
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// ---------------- Test ----------------
describe("BasicToggleCheckBox Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits at least one selected sport", async () => {
    render(<BasicToggleCheckBox />);
    const options = ["Football", "Volleyball", "BasketBall", "Cricket"];

    // randomly pick 1 to all options
    const count = Math.floor(Math.random() * options.length) + 1;
    const selectedOptions = [...options].sort(() => 0.5 - Math.random()).slice(0, count);

    for (const label of selectedOptions) {
      const checkbox = screen.getByLabelText(new RegExp(label, "i"));
      await userEvent.click(checkbox);
    }

    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ sport: selectedOptions }, null, 2)
      );
    });
  });
});
