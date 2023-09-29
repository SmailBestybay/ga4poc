import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export const logPageView = () => {
  if (ExecutionEnvironment.canUseDOM) {
    // Docusaurus handles page views automatically with the Google Analytics plugin
    console.log('logPageView');
  }
};

export const logEvent = (eventName, eventProperties) => {
  if (ExecutionEnvironment.canUseDOM) {
    // Log a custom event
    window.gtag('event', eventName, eventProperties);
    console.log(`Event ${eventName} logged with properties:`, eventProperties);
  }
};