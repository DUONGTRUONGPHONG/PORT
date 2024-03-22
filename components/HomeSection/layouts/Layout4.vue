<script setup lang="ts">
const props = defineProps<{
  articles: any[];
}>();
</script>
<template>
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5  gap-6">
    <template v-for="(article, i) in props.articles || []" :key="i">
      <article class="">
        <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)">
          <div
            class="rounded overflow-hidden aspect-[16/10]"
            :class="[
              {
                'row-span-2 lg:col-span-2': i === 0,
              },
            ]"
          >
            <img
              :src="article.thumbnail || '/images/default-thumbnail.jpg'"
              class="w-full h-full object-cover"
              :alt="article.title?.replace(/<[^>]+>/g, '')"
            />
          </div>
          <div class="mt-1">
            <h3 class="font-semibold text-xs sm:text-base hover-text-primary-100 transition-all duration-300">
            {{ article.title?.replace(/<[^>]+>/g, "") }}
          </h3>
          <p class="text-xs sm:text-sm mt-2 line-clamp-3">
            {{ article.intro?.replace(/<[^>]+>/g, "") }}
          </p>
          <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                                <NuxtLink :to="'/' + article.category?.code">
                                    <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title }}</span>
                                </NuxtLink>
                                <span class="text-sm hidden sm:inline-block">-</span>
                                <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                            </div>
          </div>
        </NuxtLink>
      </article>
    </template>
  </div>
</template>
