import type { ConfigBase } from "unocss";

import {
  defineConfig,
  transformerVariantGroup,
  transformerDirectives,
  presetWebFonts,
  presetUno,
  presetMini,
} from "unocss";

export default defineConfig({
  safelist: [],

  theme: {
    colors: {
      'primary': {
        100: "#3c7abc",
      },
      // 'red': '#ff0018',
      // 'blue': '#2d6cf6',
      // 'brown-700': '#99553D',
      // 'gray-100': '#f5f5f5',
      // 'gray-200': '#eee',
      // 'gray-400': '#bdbdbd',
      // 'gray-600': '#757575',
      // 'gray-700': '#616161',
      // 'green-100': '#2ED0A9',
      // 'yellow-700': '#eaa23e',
    },
  },

  shortcuts: [
    {
      "after:no-content": "after:content-['']",
      "before:no-content": "before:content-['']",
      'container-xxl': 'px-[8px] mx-auto w-full sm:w-620px md:w-760px lg:w-980px xl:w-1100px 2xl:w-1320px',
    },
  ],
  rules: [
    [
      "text-fill-transparent",
      {
        "-webkit-text-fill-color": "transparent",
        "text-fill-color": "transparent",
      },
    ],
    [
      "backdrop-blur-xs",
      {
        "backdrop-filter": "blur(2px)",
        "-webkit-backdrop-filter": "blur(2px)",
      },
    ],
    [
      "max-w-6xl",
      {
        "max-width": "60rem",
      },
    ],
    [
      "max-w-8xl",
      {
        "max-width": "85.375rem",
      },
    ],
  ],
  extractors: [],
  presets: [
    presetUno(),
    presetMini(),
    presetWebFonts({
      provider: "google",
      fonts: {
        nunito: "Nunito",
        playfair: ['Playfair Display', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'serif'],
        'bai-jamjuree': ['Bai Jamjuree', 'Arial', 'sans-serif'],
        sans: ['Raleway', 'Arial', "Helvetica Neue", 'Helvetica', 'sans-serif'],

      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
}) satisfies ConfigBase;
