import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "@mjfy Form Builder",
  tagline: "MUI-JOY | FORMIK | YUP Form Builder for React.",
  favicon: "img/favicon.ico",
  future: { v4: true },

  url: "https://formik-form-builder.web.app/",
  baseUrl: "/",
  organizationName: "Anthena Group",
  projectName: "mjfy Form Builder",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Instance 1: @mjfy/core
          id: "default",
          path: "docs/core", // CHANGED: Points inside your docs folder
          routeBasePath: "core-docs",
          sidebarPath: "./sidebarsCore.ts",
          lastVersion: "current",
          includeCurrentVersion: true,
          versions: {
            current: {
              label: "1.0.16 (Next)",
              badge: true, // This shows the badge in the UI
            },
          },
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        // Instance 2: @mjfy/form-builder
        id: "form-builder",
        path: "docs/form-builder", // CHANGED: Points inside your docs folder
        routeBasePath: "form-builder-docs",
        sidebarPath: "./sidebarsFormBuilder.ts",
        lastVersion: "current",
        includeCurrentVersion: true,
        versions: {
          current: {
            label: "1.0.1 (Next)",
            badge: true, // This shows the badge in the UI
          },
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "MJFY",
      logo: {
        alt: "MJFY Logo",
        src: "img/mjfy-logo.png",
      },
      hideOnScroll: true,
      items: [
        {
          type: "docSidebar",
          sidebarId: "coreSidebar",
          docsPluginId: "default",
          position: "left",
          label: "@mjfy/Core",
        },
        {
          type: "docSidebar",
          sidebarId: "builderSidebar",
          docsPluginId: "form-builder",
          position: "left",
          label: "@mjfy/form-builder",
        },
        {
          type: "docsVersionDropdown",
          docsPluginId: "default",
          position: "right",
          label: "Core Version",
          className: "navbar-version-core",
        },
        {
          type: "docsVersionDropdown",
          docsPluginId: "form-builder",
          position: "right",
          label: "Builder Version",
          className: "navbar-version-builder",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/Anthena-Group/ffb-web",
          className: "header-github-logo",
          "aria-label": "Github repository",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Core Docs", to: "/core-docs/intro" },
            { label: "Form Builder Docs", to: "/form-builder-docs/intro" },
          ],
        },
        {
          title: "Community",
          items: [{ label: "Discord", href: "https://discord.gg/YxhWTrbq" }],
        },
        {
          title: "More",
          items: [
            { label: "Blog", to: "/blog" },
            {
              label: "GitHub",
              href: "https://github.com/Anthena-Group/ffb-web",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} @anthenaGroup, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
