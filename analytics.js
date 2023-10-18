import pjson from "./package.json";
import { setCookie, getClientId } from "./trackUser";
import siteConfig from "@generated/docusaurus.config";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Singleton module to make sure is executed only once defined with a IIFE function,
// which means the function is executed immediately when the script is loaded and only once.
const LogEventManager = (() => {
  let clientId;
  let glueOpsVersion;

  const setup = () => {
    const days = 365;
    clientId = getClientId();
    setCookie("clientId", clientId, days);
    glueOpsVersion = pjson.version || 8000; // Default to 8000 if not defined

    if (ExecutionEnvironment.canUseDOM) {
      console.log("IN THE SETUP");
      window.gtag("config", "G-YJV3SCVC5E", {
        user_id: clientId,
      });
      const id = new Promise((resolve) => {
        window.gtag("get", "G-YJV3SCVC5E", "user_id", resolve);
      });
      id.then((res) => console.log(res));
    }
  };

  // Call setup once
  setup();

  return {
    get clientId() {
      return clientId;
    },
    get glueOpsVersion() {
      return glueOpsVersion;
    },
  };
})();

// Possible Button Event Names
// eventName = purchase_button_clicked_event | git_button_clicked_event

/* Possible eventProperties
 * {  
      glueOpsVersion: LogEventManager.glueOpsVersion,
      clientId: LogEventManager.clientId,
      event_category: 'Custom Category',
      event_label: 'Custom Label',
    })
 */

export const logEvent = (eventName, eventProperties) => {
  if (ExecutionEnvironment.canUseDOM) {
    // Log a custom event
    const updatedEventProperties = {
      glueOpsSiteVersion: LogEventManager.glueOpsVersion,
      userID: LogEventManager.clientId,
      ...eventProperties,
    };

    // Check if window.gtag is defined before triggering the event
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, updatedEventProperties);
      console.log(
        `Event ${eventName} logged with properties:`,
        updatedEventProperties
      );
    } else {
      console.warn(
        `window.gtag is not defined. Event ${eventName} was not logged.`
      );
    }
  }
};
