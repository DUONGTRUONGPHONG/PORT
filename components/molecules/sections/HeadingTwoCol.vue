<script setup lang="ts">
import {Article}  from '~/server/models/v2/article';

const props = defineProps<{
  articles?: Article[] | any[];
}>();

const headingArticle = computed(() => props.articles?.[0]);
const setArticles = computed(() => props.articles?.slice(1, 7) ?? []);
</script>

<template>
  <div
    class="md:grid md:grid-cols-2 md:gap-6 2xl:px-0 md:px-6 xl:grid-cols-[max-content_max-content_1fr] xl:px-8 mt-4 xl:max-w-7xl max-w-full mx-auto">
    <Article class="block xl:max-w-lg" :title="headingArticle?.title" :brief="headingArticle?.intro"
    :slug="'/' + headingArticle.category?.code + '/' + headingArticle.code"
      :thumb="headingArticle?.thumbnail" />
      
    <div class="grid gap-4 px-4 my-4 md:my-0 md:px-0 xs:px-6 xl:max-w-xs 2xl:max-w-md">
      <Article mode="text" v-for="(item, index) in setArticles" :key="index" :title="item?.title"
      :slug="'/' + item.category?.code + '/' + item.code" />
    </div>
  </div>
</template>