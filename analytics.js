import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import ReactGA from 'react-ga';

if (ExecutionEnvironment.canUseDOM) {
  console.log('canUseDOM');
  // As soon as the site loads in the browser, register a global event listener
  gtag("set", { site_version: "1.0" });
}

if (!globalThis.GA_INITIALIZED) {
  globalThis.GA_INITIALIZED = false;
  initGA();
}

export const initGA = () => {
  ReactGA.initialize('G-YJV3SCVC5E');
  globalThis.GA_INITIALIZED = true;
};

export const logPageView = () => {
  console.log('logPageView');
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '', label = '', value = '') => {
  console.log('new event');
  console.log(category, action, label, value);
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
