import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import { initGA, logEvent, logPageView } from '../../analytics'; // Import the necessary functions

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const handleButtonClick = () => {
    // Log custom event with versionId
    logEvent('Button', 'Click', 'Custom Event', siteConfig.customFields.gluepOpsVersion as string);
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {/* add here */}
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
          <button
            className="button button--secondary button--lg"
            onClick={handleButtonClick}
          >
            Log Custom Event
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Ensure Google Analytics is initialized
    if (!globalThis.GA_INITIALIZED) {
      console.log('GA_INITIALIZED');
      initGA();
    }

    // Log initial page view
    logPageView();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}