<script setup lang="ts">
import Comment from "@/components/comments/Comment.vue";
import type { Article } from "~/server/models/v2/article";
import type { Category } from "~/server/models/v2/category";
const ORIGIN = 'https://stable.vpress.vn'
const props = defineProps<{ article?: Article; category?: Category }>();
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div class="max-w-1500px mx-auto">
        <BreadcrumbArticle class="mt-4" :category="category" />
        <article class="w-full flex flex-col lg:flex-row gap-4 overflow-x-hidden mt-4 bg-#f7f7f7">
          <div id="article-detail"
            class="flex-1 [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:max-h-52 md:[&_iframe]:max-h-full [&_video]:max-w-full [&_video]:w-full">
            <div v-html="article?.detail" />
          </div>
          <div class="lg:w-[480px] overflow-y-auto lg:max-h-560px">
            <div class="w-full pt-6 pr-3">
              <h1 v-html="article?.sub" class="text-xl font-bold opacity-60"></h1>
              <h1 v-html="article?.title" class="text-2xl font-bold text-left sm:text-3xl xl:text-4xl" />
              <ArticleMeta class="!justify-start items-center gap-x-2" :authors="article?.authors"
                :createdOn="article?.createdOn" :createdBy="article?.createdBy" />

              <div id="article-brief" class="mx-auto xl:max-w-6xl text-balance">
                <div v-html="article?.intro" class="font-semibold text-left" />
              </div>
              <section>
                <article class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
                  <iframe
                    :src="`https://www.facebook.com/plugins/like.php?href=${ORIGIN}/${category?.code}/${article?.code}&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId`"
                    width="140" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </article>
              </section>
              <Topic :topics="article?.topics" />
              <Event :events="article?.events" />
              <Tag :tags="article?.tags" />
              <section id="comment-section" class="grid">
                <Comment :articleId="article?.articleId" />
              </section>
            </div>
          </div>
        </article>
        <div class="w-full border-t-2 border-dashed mt-4" />
      </div>
      <Wrap max-width="2xl">
        <ListWithTitle class="my-4" :title="'Bài viết liên quan'" :articles="article?.relations" />
      </Wrap>
    </NuxtLayout>
  </div>
</template>
