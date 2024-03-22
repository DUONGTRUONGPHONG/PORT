<script setup lang="ts">
import type { Article } from "~/server/models/v2/article";

const props = defineProps<{ article: Article; category?: any; }>();
const fontSize = ref(16)
const increaseFontSize = () => {
  if (fontSize.value < 24) {
    fontSize.value = fontSize.value + 2
  }
}

const decreaseFontSize = () => {
  if (fontSize.value > 10) {
    fontSize.value = fontSize.value - 2
  }

}
const ORIGIN = 'https://stable.vpress.vn'
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <section class="@container pt-4 w-full bg-black">
        <div class="grid w-full gap-4 px-4 max-w-7xl mx-auto">
          <div class="flex items-center justify-between flex-wrap">
            <BreadcrumbArticle class="text-white" :category="category" />
            <div class="text-[22px] flex items-center gap-2">
              <div @click="increaseFontSize()"
                :class="fontSize < 24 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                <Icon name="fluent:font-increase-20-regular" />
              </div>
              <div @click="decreaseFontSize()"
                :class="fontSize < 24 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                <Icon name="fluent:font-decrease-20-regular" />
              </div>
            </div>
          </div>

          <article class="flex flex-col gap-4 max-w-full overflow-x-hidden">
            <h1 v-html="article?.sub" class="text-xl font-bold  text-white opacity-60"></h1>
            <h1 v-html="article.title" tag="h1" class="text-2xl font-bold sm:text-3xl text-white xl:text-4xl">
            </h1>

            <ArticleMeta class="text-white" :authors="article?.authors" :createdOn="article?.createdOn"
              :createdBy="article?.createdBy" />

            <div id="article-brief" class="xl:max-w-6xl text-white">
              <div v-html="article.intro" class="font-semibold"></div>
            </div>
            <div id="article-detail" class="text-white [&_img]:w-full [&_*]:my-2" v-html="article.detail">
            </div>
          </article>
        </div>
        <div id="article-footer" class="grid gap-4 pb-6 max-w-7xl mx-auto">
          <section>
            <article class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
              <iframe
                :src="`https://www.facebook.com/plugins/like.php?href=${ORIGIN}/${category?.code}/${article?.code}&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId`"
                width="140" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </article>
          </section>
          <Topic :topics="article?.topics" :colorWhite="true" />

          <Event :events="article?.events" :colorWhite="true" />

          <Tag :tags="article?.tags" :colorWhite="true" />


          <ArticleButon :article="article" :category="category" class="mt-6" />
        </div>

      </section>

      <wrap>
        <ListWithTitle class="mt-4" :title="'Bài viết liên quan'" :articles="article?.relations" />


        <CommentsComment class="mt-4" :articleId="article?.articleId" />
      </wrap>
    </NuxtLayout>
  </div>
</template>

<style scoped>
::v-deep figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

::v-deep img {
  margin: 0 auto;
  max-width: 100%;
}

::v-deep figcaption {
  font-style: italic;
  color: grey;
  font-size: 0.8rem;
}
</style>
