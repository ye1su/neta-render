import { defineConfig } from "vitepress";
import { sidebar } from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Neta-Render",
  description: "canvas render",
  base: "/neta-render/",
  outDir: "../docs-dist",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "文档", link: "/base-examples" },
    ],
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/qingyyying/neta-render" },
    ],

    search: {
      provider: "local",
    },
  },
  markdown: {
    // 在 Markdown 渲染时自动插入 TOC
    toc: {
      level: [2, 6],
    },
  },
});
