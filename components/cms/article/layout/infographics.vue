<script setup lang="ts">
import Comment from '@/components/comments/Comment.vue';
import type { Article } from '~/server/models/v2/article';
const ORIGIN = 'https://stable.vpress.vn'
const props = defineProps<{ article?: Article | null, category?: any }>();
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
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <wrap>
        <section v-if="article?.id">
          <article class=" lg:w-2/3 mx-auto overflow-x-hidden">
            <div class="flex flex-wrap items-center justify-between">
              <BreadcrumbArticle :category="category" />
              <div class="text-[22px] flex items-center gap-2">
                <div @click="increaseFontSize()"
                  :class="fontSize < 24 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                  class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                  <Icon name="fluent:font-increase-20-regular" />
                </div>
                <div @click="decreaseFontSize()"
                  :class="fontSize > 10 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                  class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                  <Icon name="fluent:font-decrease-20-regular" />
                </div>
              </div>
            </div>

            <h1 v-html="article?.sub" class="text-xl font-bold opacity-60"></h1>
            <h1 v-html="article?.title" class="text-2xl font-bold text-black mt-4"></h1>

            <ArticleMeta :authors="article?.authors" :createdOn="article?.createdOn" :createdBy="article?.createdBy" />

            <div id="article-brief" class="text-sm text-black pt-3">
              <div v-html="article?.intro" class="font-semibold"></div>
            </div>
            <div id="article-detail" :class="'text-[' + fontSize + 'px]'"
              class="grid gap-4 text-black font-sembold text-sm pt-4" v-html="article.detail">
            </div>
          </article>

          <div id="article-footer" class="grid gap-4 py-6">
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
            <ArticleButon :article="article" :category="category" class="mt-3" />

            <hr v-if="article?.relations?.length" class="border-1 border-neutral-1" />
            <ListWithTitle :title="'Bài viết liên quan'" :articles="article?.relations" />
          </div>

          <Row class="pt-4">
            <MainCol>
              <Comment :articleId="article?.articleId" />
            </MainCol>
          </Row>
        </section>

        <Message v-else message="Bài viết không tồn tại" />
      </wrap>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
figcaption {
  font-style: italic;
  color: grey;
  font-size: 0.875rem;
}
</style>
