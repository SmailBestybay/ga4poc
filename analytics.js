import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  // As soon as the site loads in the browser, register a global event listener
  gtag("set", { site_version: "1.0" });
  gtag("get", "G-E2D1DJQ11F", "page_title", (f) => console.log(f));
  console.log("FROM CLIENT");
}
