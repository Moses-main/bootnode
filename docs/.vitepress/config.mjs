import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "bootnode",
  description: "A simple CLI tool to bootstrap Express + MongoDB backend projects",
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: 'bootnode',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/installation' },
      { text: 'API Reference', link: '/api-reference/users' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Project Structure', link: '/getting-started/project-structure' },
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Users API', link: '/api-reference/users' },
        ]
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Environment Variables', link: '/configuration/environment-variables' },
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Error Handling', link: '/advanced/error-handling' },
          { text: 'Rate Limiting', link: '/advanced/rate-limiting' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Moses-main/bootnode' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Moses Sunday'
    }
  }
})
