import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import mathjax3 from "markdown-it-mathjax3";
import { generateSidebar } from "vitepress-sidebar";

export default defineConfig({
  title: "AOI Study Hub",
  description: "Algerian Olympiad in Informatics Study Hub Documentation",
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/AOI-Logo.png?v=2' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/AOI-Logo.png?v=2' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/AOI-Logo.png?v=2' }],
    ['link', { rel: 'shortcut icon', href: '/assets/AOI-Logo.png?v=2' }],
    ['meta', { name: 'theme-color', content: '#1a5b91' }],
  ],
  themeConfig: {
    logo: {
      light: '/assets/AOI-BLACK-Logo.png',
      dark: '/assets/AOI-Logo.png'
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Roadmap", link: "/roadmap" },
      { text: "Fundamentals", link: "/fundamentals/intro-to-c++" },
      { text: "Math", link: "/math/proof-writing" },
      { text: "Editorials", link: "/editorials/" },
    ],

    sidebar: generateSidebar({
      documentRootPath: "",  // your docs folder
      useTitleFromFrontmatter: true,
      basePath: "/",             // site base
      collapsed: true,           // collapse groups
      transformPageName: (name) => {
        return name
          .replace(/-/g, " ")   // replace dashes with spaces
          .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize words
      },
    }),

    socialLinks: [
      { icon: "github", link: "https://github.com/algerianoi" },
      { icon: { svg: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' }, link: "https://algerianoi.com/" },
      //{ icon: { svg: '<svg viewBox="0 0 24 24" width="24" height="24"><text x="12" y="18" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="currentColor">AOI</text></svg>' }, link: "https://algerianoi.com/" },
      { icon: "discord", link: "https://algerianoi.com/discord" },
      { icon: "instagram", link: "https://www.instagram.com/algerian_oi" },
    ],
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
      md.use(mathjax3);
    },
  },
  base: "/",
});
