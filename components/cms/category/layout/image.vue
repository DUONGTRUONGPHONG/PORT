<script setup lang="ts">
import type { PaginationInfo } from "~/objects";
const props = defineProps<{
  subtree: any[];
  pagination?: any;
  category: any;
  payload: any[];
}>();

const top2 = computed(() => {
  return _Slice(props.payload, 1, 3);
});
const top4 = computed(() => {
  return _Slice(props.payload, 1, 5);
});
const readMore = ref(false);

const toggleReadMore = () => {
  readMore.value = !readMore.value;
};
useHead({
  title: "image",
});
</script>
<template>
  <HeaderMedia :type="props.category.title"></HeaderMedia>
  <Wrap>
    <BreadcrumbCategory :category="category" :subtree="subtree" />

    <div class="relative border-t border-neutral-200 mr-4 mt-4"></div>
    <section class="md:grid md:grid-cols-3 pt-7">
      <div
        class="sm:col-span-3 md:col-span-2 col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2"
      >
        <ArticleVideo
          class="xl:max-w-lg text-center"
          :thumb="payload[0]?.thumbnail"
          :title="payload[0]?.title"
          :brief="payload[0]?.intro"
          :createdOn="payload[0]?.createdOn"
          :slug="'/' + payload[0].category?.code + '/' + payload[0].code"
        />
        <NuxtLink
          :href="
            utils.generateSlugWithId('/v', payload[0]?.slug, payload[0]?.id)
          "
          class="inline-flex mt-5 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Xem bài viết
          <svg
            class="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </NuxtLink>
      </div>
      <div class="md:grid md:grid-row-2 gap-8 ml-7">
        <ArticleBasic
          v-for="(item, index) in top2"
          :key="index"
          :thumb="item.thumbnail"
          :title="item.title"
          :brief="item.intro"
          :createdOn="item.createdOn"
          :slug="'/' + item.category?.code + '/' + item.code"
        />
      </div>
    </section>
    <div class="relative border-t border-neutral-200 mt-8"></div>
    <section>
      <div class="grid md:grid-cols-4 gap-8 pt-8">
        <Article
          mode="video"
          v-for="(item, index) in top4"
          :key="index"
          :thumb="item.thumbnail"
          :title="item.title"
          :created-on="item.createdOn"
          :slug="'/' + item.category?.code + '/' + item.code"
        />
      </div>
    </section>
    <MainCol>
      <div class="pt-3 mt-6 border-t-2">
        <div id="app" class="container mx-auto p-4">
          <p class="text-gray-700 leading-7">
            <ArticleEvent
              v-for="(item, index) in payload"
              :key="index"
              :title="item.title"
              :brief="item.intro"
              :slug="'/' + item.category?.code + '/' + item.code"
              :thumb="item?.thumbnail"
              :created-on="item.createdOn"
              :class="[index !== 0 ? 'pt-5 mt-5 border-t' : '']"
            />
          </p>
          <Pagination v-if="payload.length > 0" :payload="pagination" class="mt-6" />
        </div>
      </div>
    </MainCol>
  </Wrap>
</template>
