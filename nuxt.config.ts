import svgLoader from "vite-svg-loader";
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'iis_node'
  },
  devtools: { enabled: true },
  app: {
    head: {
      link: [],
    },
  },
  modules: [
    '@nuxt/image',
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-delay-hydration",
    // "@nuxtjs/critters",
    "nuxt-icon",
    // "nuxt-custom-elements",
    "dayjs-nuxt",
    "nuxt-swiper",
    "nuxt-lodash",
    // "nuxt-headlessui",
    '@ant-design-vue/nuxt',
    "@sidebase/nuxt-auth",
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_BASE_API || "https://portal-api-stable.vpress.vn/api-v1",
      site: process.env.NUXT_PUBLIC_SITE_DEFAULT || "1",
      pagingLimit: process.env.PUBLIC_PAGING_LIMIT || "10",
      pagingDefault: process.env.PUBLIC_PAGING_PAGE || "1",
      serverResourceUrl: process.env.PUBLIC_BASE_SERVER_RESOURCE || "",
    },
    authSecret: process.env.AUTH_SECRET||"vpress"
  },

  alias: {
    "@": resolve(__dirname, "./"),
    "@atoms": resolve(__dirname, "./components/atoms"),
    "@molecules": resolve(__dirname, "./components/molecules"),
    "@organisms": resolve(__dirname, "./components/organisms"),
    "@mocks": resolve(__dirname, "./mocks"),
  },

  components: {
    dirs: [
      { path: "./components/atoms", pathPrefix: false },
      { path: "./components/molecules", pathPrefix: false },
      { path: "./components/organisms", pathPrefix: false },
      { path: "./components/cms", pathPrefix: false },
      { path: "./components/home", pathPrefix: false },
      { path: "./components/Wrap", pathPrefix: false },
      { path: "./components/ThiTruongTaiChinh", pathPrefix: false },
      "~/components"
    ],
  },

  // hooks: {
  //   "components:dirs": (dirs) => {
  //     dirs.push({
  //       path: "~/components",
  //     });
  //   },
  // },

  css: ["@/assets/styles/app.sass", "@unocss/reset/tailwind-compat.css"],

  experimental: {
    headNext: true,
    componentIslands: true,
    viewTransition: true,
  },

  routeRules:{
    '/users/**': { ssr: false }
  },

  //@ts-ignore
  customElements: {
    entries: [
      {
        name: "CustomElement",
        tags: [
          {
            name: "TestPoll",
            path: "@/components/TestPoll.ce.vue",
          },
        ],
      },
    ],
  },

  //nuxt-auth
  auth:{
    isEnabled:true,
    baseURL: process.env.AUTH_ORIGIN,
  },

  // dayjs
  dayjs: {
    locales: ["vi"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultTimezone: "Asia/Ho_Chi_Minh",
    defaultLocale: ["vi", {
      weekdays: 'Chủ nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy'.split('_'),
    }],
  },

  lodash: {
    prefix: "_",
  },

  delayHydration: {
    mode: "init",
  },

  imports: {
    dirs: ["stores"],
  },

  // image
  image: {
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 36,
          height: 36
        }
      }
    },
  },
  // Optionally change the default prefix.
  headlessui: {
    prefix: "Headless",
  },

  // pinia
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      'storeToRefs',
      'acceptHMRUpdate',
    ],
  },

  swiper: {
    // Swiper Option ,
    prefix: "Swiper",
    styleLang: "css",
    modules: [
      "navigation",
      "pagination",
      "autoplay",
      "effect-creative",
      "effect-coverflow",
    ],
  },

  vite: {
    plugins: [svgLoader()],
  },

  vue: {
    defineModel: true,
    runtimeCompiler: true,
    propsDestructure: true,
  },

  ssr: true,

  typescript: {
    shim: false,
  },
});
