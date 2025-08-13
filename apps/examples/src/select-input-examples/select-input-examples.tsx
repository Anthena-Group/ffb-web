import GenderSelect from "./examples/gender-select";
 import CountrySelect from "./examples/country-select";
 import RoleSelect from "./examples/role-select";
 import LanguageSelect from "./examples/language-select";
import type { exampleType } from "../Layout/tab-example-viewer";
import TabExampleViewer from "../Layout/tab-example-viewer";

const examples: Record<string, exampleType> = {
  gender: {
    label: "Gender",
    component: <GenderSelect />,
  },
  country: {
    label: "Country",
    component: <CountrySelect />,
  },
  role: {
    label: "User Role",
    component: <RoleSelect />,
  },
  language: {
    label: "Preferred Language",
    component: <LanguageSelect />,
  },
};

const SelectInputExamples = () => <TabExampleViewer examples={examples} />;

export default SelectInputExamples;
