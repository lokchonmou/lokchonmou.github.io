import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserSite = repositoryName.toLowerCase() === 'lokchonmou.github.io'
const legacySiteUrl = 'https://lokchonmou.github.io/'

const base = repositoryName && !isUserSite ? `/${repositoryName}/` : '/'

export default defineConfig({
  title: 'LCM STUDIO',
  description: 'Course notes, tutorials, and experiments',
  lang: 'zh-Hant',
  base,
  lastUpdated: true,

  themeConfig: {
    aside: false,
    outline: false,
    sidebar: false,
    locales: {
      '/zh/': {
        nav: [
          { text: '首頁', link: '/zh/' },
          { text: '舊版網站', link: legacySiteUrl },
          { text: 'English', link: '/en/' }
        ],
        lastUpdated: {
          text: '最後更新'
        }
      },
      '/en/': {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Legacy Site', link: legacySiteUrl },
          { text: '繁體中文', link: '/zh/' }
        ],
        lastUpdated: {
          text: 'Last Updated'
        }
      }
    }
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(mathjax3)
    }
  },

  locales: {
    '/': {
      label: '繁體中文',
      lang: 'zh-Hant',
      link: '/zh/'
    },
    '/zh/': {
      label: '繁體中文',
      lang: 'zh-Hant',
      title: 'LOKCM Studio',
      description: '繁體中文內容'
    },
    '/en/': {
      label: 'English',
      lang: 'en-US',
      title: 'LOKCM Studio',
      description: 'English content'
    }
  }
})
