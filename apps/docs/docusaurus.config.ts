import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "@mjfy Form Builder",
  tagline:
    "MUI-JOY | FORMIK | YUP Form Builder for React. Build forms with ease using our drag-and-drop interface, powered by MUI, Formik, and Yup.",
  favicon: "img/favicon.ico",
  future: {
    v4: true,
  },

  url: "https://formik-form-builder.web.app/", // Your website URL
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  organizationName: "Anthena Group", // Usually your GitHub org/user name.
  projectName: "mjfy Form Builder", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Translate page
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "MJFY Form Builder",
      logo: {
        alt: "My Site Logo",
        src: "img/mjfy-logo.png",
        srcDark: "img/mjfy-logo.png",
      },
      hideOnScroll: true,
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/Anthena-Group/ffb-web",
          className: "header-github-logo",
          "arial-label": "Github repository",
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
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "Getting Started",
              to: "/docs/category/getting-started",
            },
            {
              label: "Components",
              to: "/docs/category/components",
            },
            {
              label: "Contribution",
              to: "/docs/contribution",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "#",
            },
            {
              label: "Discord",
              href: "https://discord.gg/YxhWTrbq",
            },
            {
              label: "X",
              href: "#",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
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
    docs: {
      versionPersistence: "localStorage",
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
