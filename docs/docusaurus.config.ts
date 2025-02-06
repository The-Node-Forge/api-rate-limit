import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'API Rate Limiter',
  tagline:
    'A simple and efficient API rate limiter for JavaScript/TypeScript applications',
  favicon: 'img/favicon.ico',

  url: 'https://the-node-forge.github.io',
  baseUrl: '/api-rate-limiter/',
  trailingSlash: false,

  organizationName: 'The-Node-Forge',
  projectName: 'api-rate-limiter',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl:
            'https://github.com/The-Node-Forge/api-rate-limiter/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/The-Node-Forge/api-rate-limiter/tree/main/docs/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/theNodeForge.png',
    navbar: {
      title: 'API Rate Limiter',
      logo: {
        alt: 'The Node Forge Logo',
        src: 'img/theNodeForge.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },

        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://github.com/The-Node-Forge/api-rate-limiter',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API',
              to: '/docs/api/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/The-Node-Forge/api-rate-limiter',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Node Forge. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/api',
        includeVersion: true,
        hideGenerator: true,
        categorizeByGroup: true,
        excludePrivate: true,
        excludeProtected: true,
        excludeExternals: true,
        excludeNotDocumented: true, // Exclude code without JSDoc comments
      },
    ],
  ],
};

export default config;
