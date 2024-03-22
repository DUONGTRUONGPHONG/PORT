<script setup lang="ts">
import {type Author } from '~/server/models/v2/author';

const props = defineProps<{authors?: Author[], createdOn?: string, createdBy?:number|string}>();

const author = computed(() => {
    return props.authors?.find((author) => author.id === props.createdBy) || props?.authors?.[0] || null;
});
</script>

<template>
    <div class="flex gap-3 mt-2 items-center">
        <NuxtLink v-if="author" :to="`/author/${author.code}-${author.id}`" class="font-semibold">
            {{ author.title }}
        </NuxtLink>
        <span>-</span>
        <CustomText v-if="createdOn" :text="utils.dateFormat(createdOn)" class="xs:mt-0.5" tag="h4" />
    </div>
</template>

{
    "name": "torres-react",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@testing-library/jest-dom": "^5.11.4",
      "@testing-library/react": "^11.1.0",
      "@testing-library/user-event": "^12.1.10",
      "autoprefixer": "^10.4.13",
      "bootstrap": "^5.0.1",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^5.2.0",
      "react-scripts": "^5.0.1",
      "react-slick": "^0.28.1",
      "slick-carousel": "^1.8.1",
      "web-vitals": "^1.0.1"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    "devDependencies": {
      "sass": "^1.34.0"
    },
    "resolutions": {
      "autoprefixer": "10.4.5"
    }
  }