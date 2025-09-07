import {
  reactive,
  watch
} from "./chunk-JNFF4ERX.js";

// node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_vitepress@1.6.4_@algolia+client-search@5.37.0_markdown-it-m_32661479ee81dc10abb8fffb7ac0b3a7/node_modules/vitepress-plugin-tabs/src/client/index.ts
import PluginTabs from "/Users/adelayoub/dev/Resources-Website/docs/node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_vitepress@1.6.4_@algolia+client-search@5.37.0_markdown-it-m_32661479ee81dc10abb8fffb7ac0b3a7/node_modules/vitepress-plugin-tabs/src/client/PluginTabs.vue";
import PluginTabsTab from "/Users/adelayoub/dev/Resources-Website/docs/node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_vitepress@1.6.4_@algolia+client-search@5.37.0_markdown-it-m_32661479ee81dc10abb8fffb7ac0b3a7/node_modules/vitepress-plugin-tabs/src/client/PluginTabsTab.vue";

// node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_vitepress@1.6.4_@algolia+client-search@5.37.0_markdown-it-m_32661479ee81dc10abb8fffb7ac0b3a7/node_modules/vitepress-plugin-tabs/src/client/useTabsSelectedState.ts
var injectionKey = "vitepress:tabSharedState";
var ls = typeof localStorage !== "undefined" ? localStorage : null;
var localStorageKey = "vitepress:tabsSharedState";
var setLocalStorageValue = (v) => {
  if (!ls) return;
  ls.setItem(localStorageKey, JSON.stringify(v));
};
var provideTabsSharedState = (app) => {
  const state = reactive({});
  watch(
    () => state.content,
    (newStateContent, oldStateContent) => {
      if (newStateContent && oldStateContent) {
        setLocalStorageValue(newStateContent);
      }
    },
    { deep: true }
  );
  app.provide(injectionKey, state);
};

// node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_vitepress@1.6.4_@algolia+client-search@5.37.0_markdown-it-m_32661479ee81dc10abb8fffb7ac0b3a7/node_modules/vitepress-plugin-tabs/src/client/index.ts
var enhanceAppWithTabs = (app) => {
  provideTabsSharedState(app);
  app.component("PluginTabs", PluginTabs);
  app.component("PluginTabsTab", PluginTabsTab);
};
export {
  enhanceAppWithTabs
};
//# sourceMappingURL=vitepress-plugin-tabs_client.js.map
