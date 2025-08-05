import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--dark', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
<main className={styles.main}>
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>Formik Form Builder</h1>
    <p style={{ fontSize: '1.2rem' }}>
      A small project to learn how to build and document forms using React and Formik.
    </p>
  </div>

  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem',
    flexWrap: 'wrap',
    gap: '1.5rem'
  }}>
    {/* Feature 1 */}
    <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
      <h3>✍️ Create Inputs</h3>
      <p>
        Add simple input fields like text and email using formik-form-builder.
      </p>
    </div>

    {/* Feature 2 */}
    <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
      <h3>✅ Add Validation</h3>
      <p>
        Use basic validation like required fields and email format using Yup.
      </p>
    </div>

    {/* Feature 3 */}
    <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
      <h3>📄 Document Everything</h3>
      <p>
        Write simple documentation in Docusaurus to explain how each input works.
      </p>
    </div>
  </div>

  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h3>🔧 Run the Project</h3>
    <p>Use this command to run the examples app:</p>
    <pre>
      <code>cd apps/examples<br />pnpm dev</code>
    </pre>
  </div>
</main>



      </main>
    </Layout>
  );
}
