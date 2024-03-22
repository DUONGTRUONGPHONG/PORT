<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-[1rem]">
        <article class="bg-gray-200 flex items-center justify-center text-3xl font-bold uppercase">
            quảng cáo
        </article>
        <template v-for="(article, i) in (props.articles.slice(0,5) || [])" :key="i">
            <article>
                <Nuxt-link :to="'/' + article.category?.code + '/' + String(article.code)">
                    <div class="rounded overflow-hidden aspect-16/10">
                        <img :src="article.thumbnail || '/images/default-thumbnail.jpg'"
                            :alt="article.title?.replace(/<[^>]+>/g, '')" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col gap-2 mt-2">
                        <h5 class="font-bold line-clamp-2 hover:text-primary-100" v-html="article?.title">
                        </h5>
                        <span class="text-sm line-clamp-5" v-html="article?.intro"></span>
                        <!-- <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                            <NuxtLink :to="'/' + article?.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{
            article?.category?.title }}</span>
                            </NuxtLink>
                            <span class="text-sm hidden sm:inline-block">-</span>
                            <span class="text-sm">{{ utils.dateFormat(article?.createdOn) }}</span>
                        </div> -->
                    </div>
                </Nuxt-link>
            </article>
        </template>
    </div>
</template>
