import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import mathjax3 from "markdown-it-mathjax3";

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

    sidebar: [
      {
        text: "Learning Path",
        items: [
          { text: "AOI Roadmap", link: "/roadmap" },
        ],
      },
      {
        text: "Fundamentals", 
        items: [
          { text: "Introduction to C++", link: "/fundamentals/intro-to-c++" },
          { text: "Time Complexity", link: "/fundamentals/time-complexity" },
        ],
      },
      {
        text: "Math",
        items: [
          { text: "Proof Writing", link: "/math/proof-writing" },
        ],
      },
      {
        text: "Editorials",
        items: [
          {
            text: "IOI TST 2025",
            collapsed: true,
            items: [
              { text: "IOI TST 2025 Editorials", link: "/editorials/IOI TST 2025/" },
              { text: "Goal", link: "/editorials/IOI TST 2025/goal" },
              { text: "Quantum", link: "/editorials/IOI TST 2025/quantum" },
              { text: "Temperature", link: "/editorials/IOI TST 2025/temperature" },
              { text: "Turtles", link: "/editorials/IOI TST 2025/turtles" },
            ],
          },
          {
            text: "Implementation Gauntlets",
            collapsed: true,
            items: [
              { text: "The Trial of Order and Chaos", link: "/editorials/Implementation Gauntlets/chaos" },
            ],
          },
          {
            text: "NAOI TST 2025",
            collapsed: true,
            items: [
              { text: "Clocks", link: "/editorials/NAOI TST 2025/clocks" },
              { text: "DNA", link: "/editorials/NAOI TST 2025/dna" },
              { text: "Jump", link: "/editorials/NAOI TST 2025/jump" },
              { text: "Pi", link: "/editorials/NAOI TST 2025/pi" },
              { text: "Rectangles", link: "/editorials/NAOI TST 2025/rectangles" },
              { text: "Switch", link: "/editorials/NAOI TST 2025/switch" },
            ],
          },
          {
            text: "PAIO TST 2025",
            collapsed: true,
            items: [
              { text: "PAIO TST 2025 Editorials", link: "/editorials/PAIO TST 2025/" },
              { text: "Alpacas", link: "/editorials/PAIO TST 2025/alpacas" },
              { text: "Carnival", link: "/editorials/PAIO TST 2025/carnival" },
              { text: "Cooling", link: "/editorials/PAIO TST 2025/cooling" },
              { text: "Garden", link: "/editorials/PAIO TST 2025/garden" },
              { text: "Gift", link: "/editorials/PAIO TST 2025/gift" },
              { text: "Nelward", link: "/editorials/PAIO TST 2025/nelward" },
              { text: "Plane", link: "/editorials/PAIO TST 2025/plane" },
              { text: "Purchase", link: "/editorials/PAIO TST 2025/purchase" },
            ],
          },
        ],
      },
    ],

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
  vite: {
    assetsInclude: ['**/*.pdf']
  },
});
