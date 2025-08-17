import { Form, Formik } from "formik";
import { Box, Button } from "@mui/joy";
import {
  FormBuilder,
  useFormBuilder,
  ConditionAction,
  ConditionName,
  InputTypes,
  PostCondition,
  type FieldType,
} from "formik-form-builder";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Component
const ConditionalRadioButton = () => {
  const conditionalRadio: FieldType[] = [
    {
      field: "planType",
      type: InputTypes.RADIO,
      groupLabel: "Choose your subscription plan:",
      initialValue: "Basic",
      validation: { required: true },
      options: [
        { label: "Basic", value: "Basic" },
        { label: "Pro", value: "Pro" },
        { label: "Custom", value: "Custom" },
      ],
    },
    {
      field: "planDescription",
      type: InputTypes.MULTI_TEXT,
      label: "Provide description for your plan:",
      initialValue: "",
      conditions: {
        action: ConditionAction.SHOW,
        groups: [
          {
            group: "radio",
            groupPostCondition: PostCondition.AND,
            logic: [
              {
                field: "planType",
                value: "Custom",
                condition: ConditionName.CONTAINS,
                postCondition: PostCondition.AND,
              },
            ],
          },
        ],
      },
      muiProps: { placeholder: "Description" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(conditionalRadio);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        // Always submit both keys in a single object
        alert(JSON.stringify({ planType: values.planType, planDescription: values.planDescription || "" }, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <FormBuilder group="form" values={values} data-test="form" fields={conditionalRadio} />
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

// Tests
describe("ConditionalRadioButton Form", () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  it("renders planType radio options", () => {
    render(<ConditionalRadioButton />);
    expect(screen.getByLabelText(/Basic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom/i)).toBeInTheDocument();
  });

  it("does not show planDescription initially", () => {
    render(<ConditionalRadioButton />);
    expect(screen.queryByPlaceholderText(/Description/i)).toBeNull();
  });

  it("shows planDescription when Custom is selected", async () => {
    render(<ConditionalRadioButton />);
    fireEvent.click(screen.getByLabelText(/Custom/i));
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    });
  });

  it("submits correct values with empty description initially", async () => {
    render(<ConditionalRadioButton />);
    fireEvent.click(screen.getByLabelText(/Custom/i));
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ planType: "Custom", planDescription: "" }, null, 2)
      );
    });
  });

  it("submits correct values with filled description", async () => {
    render(<ConditionalRadioButton />);
    fireEvent.click(screen.getByLabelText(/Custom/i));
    const descInput = await screen.findByPlaceholderText(/Description/i);
    fireEvent.change(descInput, { target: { value: "Custom Plan Details" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ planType: "Custom", planDescription: "Custom Plan Details" }, null, 2)
      );
    });
  });
});

export default ConditionalRadioButton;
