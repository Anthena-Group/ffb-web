import type { exampleType } from "../../layout/tab-example-viewer";
import TabExampleViewer from "../../layout/tab-example-viewer";
import {
  ConditionalRadioButton,
  Confirmation,
  DarkLight,
  DisabledRadio,
  GenderRadioButton,
  Rating,
} from "./examples";

const examples: Record<string, exampleType> = {
  gender: {
    label: "Gender Radio",
    component: <GenderRadioButton />,
  },
  darkLightTheme: {
    label: "Theme",
    component: <DarkLight />,
  },
  disableRadioButton: {
    label: "Disable Radio",
    component: <DisabledRadio />,
  },
  conditionalRadio: {
    label: "Conditional RadioButton",
    component: <ConditionalRadioButton />,
  },
  confirming: {
    label: "Confirmation",
    component: <Confirmation />,
  },
  rate: {
    label: "Rating",
    component: <Rating />,
  },
};

export const RadioButtonExamples = () => (
  <TabExampleViewer examples={examples} />
);
