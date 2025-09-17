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
const DisabledRadio = () => {
  const disabledRadio: FieldType[] = [
    {
      field: "accountType",
      type: InputTypes.RADIO,
      groupLabel: "Select account type",
      initialValue: "guest",
      options: [
        { label: "Guest", value: "guest" },
        { label: "Registered", value: "registered" },
      ],
    },
    {
      field: "subscription",
      type: InputTypes.RADIO,
      groupLabel: "Pick a plan",
      initialValue: "free",
      options: [
        { label: "Free", value: "free" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "enterprise" },
      ],
      conditions: {
        action: ConditionAction.ENABLE,
        groups: [
          {
            group: "radio",
            groupPostCondition: PostCondition.AND,
            logic: [
              {
                field: "accountType",
                value: "registered",
                condition: ConditionName.CONTAINS,
                postCondition: PostCondition.AND,
              },
            ],
          },
        ],
      },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(disabledRadio);

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
          <FormBuilder group="form" values={values} data-test="form" fields={disabledRadio} />
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
describe("DisabledRadio Form", () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  it("renders both accountType options", () => {
    render(<DisabledRadio />);
    expect(screen.getByLabelText(/Guest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Registered/i)).toBeInTheDocument();
  });

  it("disables subscription options when accountType is guest", () => {
    render(<DisabledRadio />);
    expect(screen.getByLabelText(/Free/i)).toBeDisabled();
    expect(screen.getByLabelText(/Pro/i)).toBeDisabled();
    expect(screen.getByLabelText(/Enterprise/i)).toBeDisabled();
  });

  it("enables subscription options when accountType is registered", async () => {
    render(<DisabledRadio />);
    fireEvent.click(screen.getByLabelText(/Registered/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/Free/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/Pro/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/Enterprise/i)).not.toBeDisabled();
    });
  });

  it("submits correct values", async () => {
    render(<DisabledRadio />);
    fireEvent.click(screen.getByLabelText(/Registered/i));
    fireEvent.click(screen.getByLabelText(/Pro/i));
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringMatching(/"accountType":\s*"registered"/)
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringMatching(/"subscription":\s*"pro"/)
      );
    });
  });
});

export default DisabledRadio;
