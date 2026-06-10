import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenDeps Stellar Essentials',
  tagline: 'Architecture, standards, and integration patterns for Stellar on OpenDeps',
  favicon: 'img/favicon.ico',
  url: 'https://opendeps-network.github.io',
  baseUrl: '/stellar-essentials/',
  organizationName: 'opendeps-network',
  projectName: 'stellar-essentials',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/opendeps-network/stellar-essentials/edit/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/opendeps-social-card.jpg',
    navbar: {
      title: 'Stellar Essentials',
      logo: { alt: 'OpenDeps', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
        { href: 'https://github.com/opendeps-network/stellar-essentials', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [{ label: 'Architecture', to: '/docs/architecture' }] },
        { title: 'More', items: [{ label: 'GitHub', href: 'https://github.com/opendeps-network' }] },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenDeps. Built with Docusaurus.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
