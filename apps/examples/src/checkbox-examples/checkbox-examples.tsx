import BasicToggleCheckBox from "./examples/basic-toggle";
import Agreement from "./examples/agreement-checkbox";
import BulkSelection from "./examples/bulk-selection";
import ToDoExample from "./examples/to-do-list";
import ConditionalCheckBox from "./examples/conditional-checkbox";
import type { exampleType } from "../utils/tab-example-viewer";
import TabExampleViewer from "../utils/tab-example-viewer";
import SwitchDemo from "./examples/switch-checkbox";

const examples: Record<string, exampleType> = {
  basicToggle: {
    label: "Basic Toggle",
    component: <BasicToggleCheckBox />,
  },
  agreement: {
    label: "Agreement Checkbox",
    component: <Agreement />,
  },
  switch: {
    label:"Switch Checkbox",
    component: <SwitchDemo/>
  },
  bulkSelection: {
    label: "Bulk Selection",
    component: <BulkSelection />,
  },
  todo: {
    label: "To-do List",
    component: <ToDoExample />,
  },
  conditional: {
    label: "Conditional Checkbox",
    component: <ConditionalCheckBox />,
  },
};

const CheckboxExamples = () => <TabExampleViewer examples={examples} />;

export default CheckboxExamples;
