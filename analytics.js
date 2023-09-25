import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  // As soon as the site loads in the browser, register a global event listener
  gtag("set", { "site version": "1.0" });
}
