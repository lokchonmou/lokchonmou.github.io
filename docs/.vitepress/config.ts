import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

const containerDefaultTitles = {
  info: '💡💡💡',
  tip: '💁‍♂️💁💁‍♀️',
  warning: '‼️‼️‼️',
  danger: '⛔️⛔️⛔️'
} as const

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

      for (const [containerType, title] of Object.entries(containerDefaultTitles)) {
        const ruleName = `container_${containerType}_open`
        const originalRule = md.renderer.rules[ruleName]

        if (!originalRule) {
          continue
        }

        md.renderer.rules[ruleName] = (tokens, index, options, env, self) => {
          const token = tokens[index]
          const hasCustomTitle = token.info.trim().split(/\s+/).length > 1

          if (!hasCustomTitle) {
            token.info = `${containerType} ${title}`
          }

          return originalRule(tokens, index, options, env, self)
        }
      }
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
      title: 'LCM STUDIO',
      description: '繁體中文內容'
    },
    '/en/': {
      label: 'English',
      lang: 'en-US',
      title: 'LCM STUDIO',
      description: 'English content'
    }
  }
})
