import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { sidebar } from "./src/sidebar.mjs";
import markdownExport from "./src/integrations/markdown-export.mjs";

const site = "https://docs.fusescope.fuseone.io";
const base = "";

export default defineConfig({
  site,
  integrations: [
    markdownExport({ site, base, sidebar }),
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
      sidebar,
    }),
  ],
});
