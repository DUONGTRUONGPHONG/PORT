<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>

<template>
    <div class="grid grid-cols-12 gap-3 md:gap-6 items-start">
        <article class="grid sm:grid-cols-3 md:grid-cols-1 gap-3 md:col-span-4 col-span-12">
            <div class="" v-for="(article, i) in (props.articles.slice(0, 3) || [])" :key="i">
                <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)">
                    <div class="rounded overflow-hidden aspect-[16/10]">
                        <img :src="article.thumbnail || '/images/default-thumbnail.jpg'"
                            class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                    </div>
                    <div class="mt-2">
                        <h3 class="font-semibold hover-text-primary-100 transition-all duration-300 text-sm sm:text-base">
                            {{ article.title?.replace(/<[^>]+>/g, '') }}
                        </h3>
                        <div class="flex flex-wrap gap-2 mt-0 md:mt-2 justify-start items-center">
                            <NuxtLink :to="'/' + article.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title
                                    }}</span>
                            </NuxtLink>
                            <span class="text-sm md:inline-block hidden">{{ utils.dateFormat(article.createdOn) }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </article>
        <template v-for="(article, i) in (props.articles.slice(3, 5) || [])" :key="i">
            <article class=" md:col-span-4 col-span-6">
                <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)">
                    <div class="rounded overflow-hidden aspect-[16/10]">
                        <img :src="article.thumbnail || '/images/default-thumbnail.jpg'"
                            class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                    </div>
                    <div class="mt-0 md:mt-2">
                        <h3 class="font-semibold hover-text-primary-100 transition-all duration-300 text-sm sm:text-base"
                            >
                            {{ article.title?.replace(/<[^>]+>/g, '') }}
                        </h3>
                        <p class="text-xs sm:text-sm mt-1 md:inline-block hidden" :class="{'!hidden':i===1}">
                            {{ article.intro?.replace(/<[^>]+>/g, '') }}
                        </p>
                        <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                            <NuxtLink :to="'/' + article.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title
                                    }}</span>
                            </NuxtLink>
                            <span class="text-sm md:inline-block hidden">{{ utils.dateFormat(article.createdOn) }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </article>
        </template>
    </div>
</template>
