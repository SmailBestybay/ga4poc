import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export const logPageView = () => {
  if (ExecutionEnvironment.canUseDOM) {
    // Docusaurus handles page views automatically with the Google Analytics plugin
     // Log a custom event
     logEvent('log_page_view_event', {
      event_category: 'website loading',
      event_label: 'event_label',
    });
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