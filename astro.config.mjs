import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const site = "https://fuseone-io.github.io";
const base = "/fusescope-docs";

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "FuseScope",
      description:
        "OpenTelemetry-native observability: APM, traces, metrics, logs and alerts on ClickHouse.",
      logo: {
        light: "./src/assets/fusescope-logo.svg",
        dark: "./src/assets/fusescope-logo-white.svg",
        alt: "FuseScope",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      head: [
        {
          tag: "meta",
          attrs: { property: "og:image", content: `${site}${base}/fusescope-og.png` },
        },
      ],
      customCss: [
        "@fontsource-variable/inter",
        "@fontsource-variable/jetbrains-mono",
        "./src/styles/fusescope.css",
      ],
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/fuseone-io/fusescope" },
      ],
      editLink: {
        baseUrl: "https://github.com/fuseone-io/fusescope-docs/edit/main/",
      },
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "What is FuseScope?", slug: "start/what-is-fusescope" },
            { label: "Core concepts", slug: "start/concepts" },
            { label: "Tour of the interface", slug: "start/tour" },
            { label: "Glossary", slug: "reference/glossary" },
          ],
        },
        {
          label: "Install",
          items: [{ label: "Install with Helm", slug: "install/helm" }],
        },
        {
          label: "Send data",
          items: [
            { label: "Instrument applications", slug: "sending-data/instrumentation" },
            { label: "OTLP endpoints", slug: "sending-data/otlp" },
            { label: "Kubernetes", slug: "sending-data/kubernetes" },
            { label: "Log pipelines", slug: "sending-data/log-pipelines" },
            { label: "Data source catalog", slug: "sending-data/data-source-catalog" },
          ],
        },
        {
          label: "How-to guides",
          items: [
            { label: "Investigate a slow endpoint", slug: "guides/slow-endpoint" },
            { label: "Find out why a service is failing", slug: "guides/failing-service" },
            { label: "See the logs for one request", slug: "guides/logs-for-a-request" },
            { label: "Build your first dashboard", slug: "guides/first-dashboard" },
            { label: "Set up your first alert", slug: "guides/first-alert" },
          ],
        },
        {
          label: "Observe",
          items: [
            { label: "Home", slug: "observe/home" },
            { label: "Services", slug: "apm/services" },
            { label: "Traces explorer", slug: "explore/traces" },
            { label: "Trace details", slug: "explore/trace-details" },
            { label: "Logs explorer", slug: "explore/logs" },
            { label: "Metrics explorer", slug: "explore/metrics" },
            { label: "Dashboards", slug: "dashboards/dashboards" },
            { label: "Panel editor", slug: "dashboards/panel-editor" },
            { label: "Dashboard variables", slug: "dashboards/variables" },
            { label: "Dashboard JSON", slug: "reference/dashboard-json" },
            { label: "Infrastructure", slug: "observe/infrastructure" },
            { label: "Service Map", slug: "apm/service-map" },
          ],
        },
        {
          label: "Frontend (RUM)",
          badge: { text: "Beta", variant: "caution" },
          items: [
            { label: "Real User Monitoring", slug: "frontend/real-user-monitoring" },
            { label: "Set up a web application", slug: "frontend/set-up-web" },
            { label: "Applications and Overview", slug: "frontend/applications" },
            { label: "Keys", slug: "frontend/keys" },
            { label: "Browser SDK reference", slug: "frontend/sdk-reference" },
            { label: "Use another OpenTelemetry client", slug: "frontend/opentelemetry-clients" },
          ],
        },
        {
          label: "Respond",
          items: [
            { label: "Alert rules", slug: "alerts/alert-rules" },
            { label: "Notification channels", slug: "alerts/notification-channels" },
            { label: "Routing and planned downtime", slug: "alerts/routing-and-downtime" },
            { label: "Exceptions", slug: "apm/exceptions" },
          ],
        },
        {
          label: "Analyze",
          items: [
            { label: "External APIs", slug: "analyze/external-apis" },
            { label: "Messaging Queues", slug: "analyze/messaging-queues" },
            { label: "AI Observability", slug: "analyze/ai-observability" },
            { label: "Cost Meter", slug: "analyze/cost-meter" },
          ],
        },
        {
          label: "Query reference",
          items: [
            { label: "Search syntax", slug: "querying/search-syntax" },
            { label: "Query builder", slug: "querying/query-builder" },
            { label: "ClickHouse SQL and PromQL", slug: "querying/clickhouse-promql" },
          ],
        },
        {
          label: "Operate",
          items: [
            { label: "Users and roles", slug: "administration/users-and-roles" },
            { label: "Service accounts", slug: "administration/service-accounts" },
            { label: "Single sign-on", slug: "configuration/sso" },
            { label: "Impersonation mode", slug: "configuration/impersonation-mode" },
            { label: "Data retention", slug: "administration/retention" },
            { label: "Configuration file", slug: "configuration/config-file" },
            { label: "Metadata store", slug: "configuration/metadata-store" },
            { label: "Architecture", slug: "reference/architecture" },
          ],
        },
      ],
    }),
  ],
});
