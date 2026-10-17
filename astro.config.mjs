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
            { label: "Lab environment", slug: "install/lab" },
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
            { label: "Kubernetes", slug: "sending-data/kubernetes" },
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
