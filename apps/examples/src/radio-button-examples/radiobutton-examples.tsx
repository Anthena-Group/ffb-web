import { TabExampleViewer } from "../Layout";
import { ConditionalRadioButton, Confirmation, DarkLight, DisabledRadio, GenderRadioButton, Rating } from "./examples";
import type { exampleType } from "../Layout/tab-example-viewer";

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
