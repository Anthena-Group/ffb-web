import { Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import { FormBuilder, ConditionAction, ConditionName, InputTypes, useFormBuilder, PostCondition, type FieldType } from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
const ConditionalCheckBox = () => {
  const conditionalCheck: FieldType[] = [
    {
      field: "isIntern",
      type: InputTypes.CHECKBOX,
      initialValue: "",
      groupLabel: "Are you a intern?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      muiProps: { variant: "outlined", color: "primary" },
    },
    {
      field: "companyName",
      type: InputTypes.TEXT,
      label: "Please enter the name of your company",
      initialValue: "",
      conditions: {
        action: ConditionAction.SHOW,
        groups: [
          {
            group: "check",
            groupPostCondition: PostCondition.AND,
            logic: [
              {
                field: "isIntern",
                value: "yes",
                condition: ConditionName.INCLUDES,
                postCondition: PostCondition.AND,
              },
            ],
          },
        ],
      },
      muiProps: { placeholder: "Enter your company name" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(conditionalCheck);

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
            fields={conditionalCheck}
            data-test="form"
            group="form"
            values={values}
          />
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

// ---------------- Test ----------------
describe("ConditionalCheckBox Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders intern checkbox options correctly and companyName hidden initially", () => {
    render(<ConditionalCheckBox />);
    expect(screen.getByLabelText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/No/i)).toBeInTheDocument();

    // Conditional field should not be in the document initially
    const companyInput = screen.queryByPlaceholderText(/Enter your company name/i);
    expect(companyInput).toBeNull();
  });

  it("shows companyName input only when 'Yes' is selected", async () => {
    render(<ConditionalCheckBox />);
    const yesCheckbox = screen.getByLabelText(/Yes/i);
    const noCheckbox = screen.getByLabelText(/No/i);

    // select "No" -> company input should remain hidden
    await userEvent.click(noCheckbox);
    expect(screen.queryByPlaceholderText(/Enter your company name/i)).toBeNull();

    // select "Yes" -> company input should appear
    await userEvent.click(yesCheckbox);
    const companyInput = await screen.findByPlaceholderText(/Enter your company name/i);
    expect(companyInput).toBeInTheDocument();
  });

  it("submits correct values when 'Yes' selected with company name", async () => {
    render(<ConditionalCheckBox />);
    const yesCheckbox = screen.getByLabelText(/Yes/i);
    await userEvent.click(yesCheckbox);

    const companyInput = await screen.findByPlaceholderText(/Enter your company name/i);
    await userEvent.type(companyInput, "MyCompany");

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ isIntern: ["yes"], companyName: "MyCompany" }, null, 2)
      );
    });
  });

  it("submits correct values when 'No' selected", async () => {
    render(<ConditionalCheckBox />);
    const noCheckbox = screen.getByLabelText(/No/i);
    await userEvent.click(noCheckbox);

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ isIntern: ["no"], companyName: "" }, null, 2)
      );
    });
  });
});

export default ConditionalCheckBox;
