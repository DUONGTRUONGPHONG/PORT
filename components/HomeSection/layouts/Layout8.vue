<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
            <article>
                <Nuxt-link :to="'/' + props.articles[0]?.category?.code + '/' + String(props.articles[0]?.code)">
                    <div class="rounded overflow-hidden aspect-16/10 ">
                        <img :src="props.articles[0]?.thumbnail || '/images/default-thumbnail.jpg'"
                            :alt="props.articles[0]?.title?.replace(/<[^>]+>/g, '')"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col gap-2 mt-2">
                        <h5 class="font-bold line-clamp-2 hover:text-primary-100" v-html="props.articles[0]?.title">
                        </h5>
                        <span class="text-sm line-clamp-5" v-html="props.articles[0]?.intro"></span>
                        <!-- <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                            <NuxtLink :to="'/' + props.articles[0]?.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{
                    props.articles[0]?.category?.title }}</span>
                            </NuxtLink>
                            <span class="text-sm hidden sm:inline-block">-</span>
                            <span class="text-sm">{{ utils.dateFormat(props.articles[0]?.createdOn) }}</span>
                        </div> -->
                    </div>
                </Nuxt-link>
            </article>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div v-for="(article, i) in (props.articles.slice(1,6) || [])" :key="i" :class="i == 0 ? 'col-span-2' : ''">
                <article v-if="i == 0">
                    <Nuxt-link :to="'/' + article?.category?.code + '/' + String(article?.code)" class="flex gap-2">
                        <div class="rounded overflow-hidden aspect-16/10 flex-1">
                            <img :src="article?.thumbnail || '/images/default-thumbnail.jpg'"
                                :alt="article?.title?.replace(/<[^>]+>/g, '')" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 flex flex-col gap-1">
                            <h5 class="font-bold line-clamp-3" v-html="article?.title"></h5>
                            <NuxtLink :to="'/' + article.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title
                                    }}</span>
                            </NuxtLink>
                            <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                        </div>
                    </Nuxt-link>
                </article>
                <article v-else>
                    <Nuxt-link :to="'/' + article?.category?.code + '/' + String(article?.code)">
                        <div class="rounded overflow-hidden aspect-16/10 flex-1">
                            <img :src="article?.thumbnail || '/images/default-thumbnail.jpg'"
                                :alt="article?.title?.replace(/<[^>]+>/g, '')" class="w-full h-full object-cover" />
                        </div>
                        <!-- <div class="flex-1 flex flex-col gap-1">
                            <h5 class="font-bold line-clamp-2" v-html="article?.title"></h5>
                            <NuxtLink :to="'/' + article.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title
                                    }}</span>
                            </NuxtLink>
                            <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                        </div> -->
                    </Nuxt-link>
                </article>
            </div>
        </div>
        <!-- <template v-for="(article, i) in (props.articles || [])" :key="i">
            <article class="most-views gap-2 overflow-hidden">
                <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)">
                    <div class="rounded overflow-hidden aspect-16/10">
                        <img :src="article.thumbnail || '/images/default-thumbnail.jpg'" :alt="article.title?.replace(/<[^>]+>/g, '')" class="w-full h-full object-cover" />
                    </div>
                    <h3 class="font-semibold flex gap-3 md:text-lg text-sm items-start mt-2 hover-text-primary-100 transition-all duration-300">
                        {{ article.title?.replace(/<[^>]+>/g, '') }}
                    </h3>
                    <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                                <NuxtLink :to="'/' + article.category?.code">
                                    <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title }}</span>
                                </NuxtLink>
                                <span class="text-sm hidden sm:inline-block">-</span>
                                <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                            </div>
                </NuxtLink>
            </article>
        </template> -->
    </div>
</template>

<style lang="sass">
body
    counter-reset: most-views

article.most-views h3::before
    counter-increment: most-views
    content: counter(most-views)
    font-size: clamp(2.5rem, -0.291rem + 4.44vw, 3.5rem)
    opacity: .5
    line-height: 50px
</style>