import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Neta-Render",
  description: "canvas render",
  base: '/neta-render/',
  outDir: '../docs-dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/base-examples' }
    ],

    sidebar: [
      {
        text: '组件使用',
        items: [
          { text: '快速入门', link: '/base-examples' },
        ]
      },
      {
        text: '图配置(Graph)',
        items: [
          { text: '渲染', link: '/canvas/render.md' },
          { text: '视图', link: '/canvas/viewbox.md' },
          { text: '数据', link: '/canvas/data.md' },
          { text: '元素', link: '/canvas/element.md' },
          { text: '布局', link: '/canvas/layout.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qingyyying/neta-render' }
    ],

    search: {
      provider: 'local'
    },
 
  },
  markdown: {
    // 在 Markdown 渲染时自动插入 TOC
    toc: {
      level: [2, 6]
    }
  }
})
