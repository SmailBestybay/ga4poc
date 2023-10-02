import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import { logEvent, logPageView } from '../../analytics'; // Import the necessary functions

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Log page view when the component mounts
    logPageView();

    // Log a custom event
    logEvent('custom_event', {
      event_category: 'Custom Category',
      event_label: 'Custom Label',
    });
  }, []);

  const handleButtonClick = () => {
    // Log custom event with versionId
    

    // Log a custom event
    logEvent('button_event', {
      event_category: 'User click button',
      event_label: siteConfig.customFields.gluepOpsVersion as string,
    });
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