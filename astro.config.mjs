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
          label: "Getting started",
          items: [
            { label: "What is FuseScope?", link: "/" },
            { label: "Install with Helm", slug: "install/helm" },
          ],
        },
        {
          label: "Configuration",
          items: [
            { label: "Configuration file", slug: "configuration/config-file" },
            { label: "Metadata store", slug: "configuration/metadata-store" },
            { label: "Single sign-on", slug: "configuration/sso" },
          ],
        },
        {
          label: "Sending data",
          items: [
            { label: "OTLP", slug: "sending-data/otlp" },
            { label: "Instrument applications", slug: "sending-data/instrumentation" },
            { label: "Kubernetes", slug: "sending-data/kubernetes" },
            { label: "Log pipelines", slug: "sending-data/log-pipelines" },
          ],
        },
        {
          label: "Using FuseScope",
          items: [
            { label: "Query builder", slug: "querying/query-builder" },
            { label: "Search syntax", slug: "querying/search-syntax" },
            { label: "ClickHouse SQL and PromQL", slug: "querying/clickhouse-promql" },
            { label: "Services", slug: "apm/services" },
            { label: "Traces explorer", slug: "explore/traces" },
            { label: "Logs explorer", slug: "explore/logs" },
            { label: "Metrics explorer", slug: "explore/metrics" },
            { label: "Dashboards", slug: "dashboards/dashboards" },
            { label: "Dashboard variables", slug: "dashboards/variables" },
          ],
        },
        {
          label: "Alerts",
          items: [
            { label: "Alert rules", slug: "alerts/alert-rules" },
            { label: "Notification channels", slug: "alerts/notification-channels" },
            { label: "Routing and planned downtime", slug: "alerts/routing-and-downtime" },
          ],
        },
        {
          label: "Administration",
          items: [
            { label: "Users and roles", slug: "administration/users-and-roles" },
            { label: "Service accounts", slug: "administration/service-accounts" },
            { label: "Data retention", slug: "administration/retention" },
          ],
        },
        {
          label: "Reference",
          items: [{ label: "Architecture", slug: "reference/architecture" }],
        },
      ],
    }),
  ],
});
