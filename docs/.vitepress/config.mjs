import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "BootNode",
  description: "Enterprise-Grade Backend Framework for Node.js",
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: 'BootNode',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/installation' },
      { text: 'Templates', link: '/templates/overview' },
      { text: 'API Reference', link: '/api-reference/overview' },
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
        text: 'Templates',
        items: [
          { text: 'Overview', link: '/templates/overview' },
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'API Overview', link: '/api-reference/overview' },
          { text: 'Authentication', link: '/api-reference/auth-api' },
          { text: 'Users API', link: '/api-reference/users-api' },
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
