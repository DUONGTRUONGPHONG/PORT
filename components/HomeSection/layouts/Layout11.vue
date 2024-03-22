<script setup lang="ts">
const props = defineProps<{
    articles?: any[] | any
}>()

</script>

<template>
    <div class="grid grid-cols-4 gap-6">
        <template v-for="(article, i) in (props.articles || [])" :key="i">
            <article v-if="[0, 1].includes(i)" class="grid md:auto-rows-max gap-2 col-span-2">
                <div class="grid grid-cols-12 gap-4">
                    <div class="rounded overflow-hidden shadow-md col-span-12 sm:col-span-6">
                        <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)"
                            class="block aspect-[16/10]">
                            <img :src="article.thumbnail || '/images/default-thumbnail.jpg'"
                                class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                        </NuxtLink>
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)" class="block">
                            <h3
                                class="font-semibold mt-2 hover-text-primary-100 transition-all duration-300 text-sm sm:text-base">
                                {{ article.title?.replace(/<[^>]+>/g, '') }}
                            </h3>
                        </NuxtLink>
                        <p class="text-xs sm:text-sm line-clamp-3 mt-1">
                            {{ article.intro?.replace(/<[^>]+>/g, '') }}
                        </p>
                        <!-- <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                            <NuxtLink :to="'/' + article.category?.code">
                                <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title
                                    }}</span>
                            </NuxtLink>
                            <span class="text-sm hidden sm:inline-block">-</span>
                            <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                        </div> -->
                    </div>
                </div>
            </article>
            <article v-else class="gap-2">
                <div>
                    <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)">
                        <div class="rounded overflow-hidden aspect-[16/10]">
                            <img :src="article.thumbnail || '/images/default-thumbnail.jpg'"
                                class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                        </div>
                        <div class="mt-1">
                            <h3
                                class="font-semibold text-xs sm:text-base hover-text-primary-100 transition-all duration-300">
                                {{ article.title?.replace(/<[^>]+>/g, "") }}
                            </h3>
                            <p class="text-xs sm:text-sm mt-2 line-clamp-3">
                                {{ article.intro?.replace(/<[^>]+>/g, "") }}
                            </p>
                            <!-- <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                                <NuxtLink :to="'/' + article.category?.code">
                                    <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title
                                        }}</span>
                                </NuxtLink>
                                <span class="text-sm hidden sm:inline-block">-</span>
                                <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                            </div> -->
                        </div>
                    </NuxtLink>
                </div>
            </article>
        </template>
    </div>
</template>