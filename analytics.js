import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { setCookie, getClientId } from './trackUser';

export const setGtag = (glueOpsVersionId) => {
  if (ExecutionEnvironment.canUseDOM) {
    if (typeof window.gtag === 'function') {
      window.gtag('set', {'glueOpsVersionId': glueOpsVersionId });
      console.log(`Google Analytics set to: ${glueOpsVersionId}`);
    } else {
      console.warn('window.gtag is not defined. Google Analytics may not be properly initialized.');
    }
  }
};

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
    // Generate clientId
    const clientId = getClientId();
    setCookie('clientId', clientId, 365);

    // Log a custom event
    // Add glueOpsVersionId to the event properties
    const updatedEventProperties = {
      gluepOpsVersion: 8000, // Replace with your dynamic value
      ...eventProperties,
      newPropTest:'newPropTest',
      anotherNewPropTest: 'anotherNewPropTest',
      cliendId: clientId
    };

    // Check if window.gtag is defined before triggering the event
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, updatedEventProperties);
      console.log(`Event ${eventName} logged with properties:`, eventProperties);
    } else {
      console.warn(`window.gtag is not defined. Event ${eventName} was not logged.`);
    }
  }
};