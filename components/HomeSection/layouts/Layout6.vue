<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>
<template>
    <div class="grid grid-cols-3 xl:grid-cols-5  gap-4 h-full">
        <template v-for="(article, i) in (props.articles.slice(0, 4) || [])" :key="i">
            <article class="col-span-1 xl:col-span-2" v-if="[0,3].includes(i)" :class="{
                'order-1':i===0,
                'order-3':i===3
            }">
                <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)">
                    <div
                        class="rounded overflow-hidden aspect-[16/10]"
                    >
                        <img
                        :src="article.thumbnail || '/images/default-thumbnail.jpg'"
                        class="w-full h-full object-cover"
                        :alt="article.title?.replace(/<[^>]+>/g, '')"
                        />
                    </div>
                    <div class="mt-1">
                        <h3 class="font-semibold text-xs sm:text-base hover-text-primary-100 transition-all duration-300">
                        {{article.title?.replace(/<[^>]+>/g, "") }}
                    </h3>
                    <p class="text-xs sm:text-sm mt-2 line-clamp-5">
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
        <article class="grid gap-4 order-2">
                <div v-for="(article, i) in (props.articles.slice(1, 3))">
                    <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)">
                    <div
                        class="rounded overflow-hidden aspect-[16/10]"
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
                    <!-- <p class="text-xs sm:text-sm mt-2 lg:hidden sm:inline-block hidden">
                        {{ article.intro?.replace(/<[^>]+>/g, "") }}
                    </p> -->
                    <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                                <NuxtLink :to="'/' + article.category?.code">
                                    <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title }}</span>
                                </NuxtLink>
                                <span class="text-sm hidden sm:inline-block">-</span>
                                <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                            </div>
                    </div>
                </NuxtLink>
                </div>
        </article>
    </div>
</template>
