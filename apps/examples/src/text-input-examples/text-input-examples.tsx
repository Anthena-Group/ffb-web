import FirstNameInput from "./examples/firstname-input";
import EmailInput from "./examples/email-input";
 import UsernameInput from "./examples/username-input";
 import PasswordInput from "./examples/password-input";
import PhoneNumberInput from "./examples/phone-input";
 import PANInput from "./examples/pan-input";
import type { exampleType } from "../utils/tab-example-viewer";
import TabExampleViewer from "../utils/tab-example-viewer";

const examples: Record<string, exampleType> = {
  firstName: {
    label: "First Name",
    component: <FirstNameInput />,
  },
  email: {
    label: "Email",
    component: <EmailInput />,
  },
  username: {
    label: "Username",
    component: <UsernameInput />,
  },
  password: {
    label: "Password",
    component: <PasswordInput />,
  },
  phoneNumber:{
   label: "Phone Number",
   component: <PhoneNumberInput />
  },
  panNumber: {
    label: "PAN Number",
    component: <PANInput />,
  },
};

const TextInputExamples = () => <TabExampleViewer examples={examples} />;

export default TextInputExamples;
