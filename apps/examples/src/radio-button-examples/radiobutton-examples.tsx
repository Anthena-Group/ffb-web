import { TabExampleViewer } from "../utils";
import { DarkLight, DisabledRadio, GenderRadioButton } from "./examples";
import type { exampleType } from "../utils/tab-example-viewer";

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
};

export const RadioButtonExamples = () => (
  <TabExampleViewer examples={examples} />
);
