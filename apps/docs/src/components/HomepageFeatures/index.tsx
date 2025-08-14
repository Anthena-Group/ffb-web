import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Schema-Driven Forms",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Define fields, validations, and conditions in one config.
        <code>formik-form-builder</code> handles UI and validation for you.
      </>
    ),
  },
  {
    title: "Dynamic Conditional Logic",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Show, hide, enable, or disable fields based on other values
        using built-in <code>conditions</code>.
      </>
    ),
  },
  {
    title: "Rich Component Support",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Supports text, select, checkbox, radio, multitext, autocomplete,
        and more — all consistently styled.
      </>
    ),
  },
  {
    title: "Built with MUI & Formik",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Powered by <b>Material UI/Joy UI</b> for styling and
        <b> Formik</b> for form state management.
      </>
    ),
  },
  {
    title: "Auto-Generated Setup",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Generates <code>initialValues</code> and Yup
        <code>validationSchema</code> from one configuration.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
