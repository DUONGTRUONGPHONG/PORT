<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>
<template>
    <div class="grid grid-cols-3 gap-6">
        <template v-for="(article, i) in (props.articles || [])" :key="i">
            <article class="grid md:auto-rows-max gap-2" :class="[i !== 0 ? 'col-span-1' : 'col-span-3 border-b-1 border-solid border-gray/40 pb-6']">
                <div v-if="i === 0" class="grid grid-cols-12 gap-4">
                    <div class="rounded overflow-hidden shadow-md col-span-12 sm:col-span-6">
                        <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)" class="block aspect-[16/10]">
                            <img :src="article.thumbnail  || '/images/default-thumbnail.jpg'" class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                        </NuxtLink>
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)" class="block">
                            <h3 class="font-semibold mt-2 hover-text-primary-100 transition-all duration-300" :class="i === 0 ? 'md:text-2xl text-base' : 'text-lg'">
                                {{ article.title?.replace(/<[^>]+>/g, '') }}
                            </h3>
                        </NuxtLink>
                        <p class="text-xs sm:text-sm line-clamp-3 mt-1" :class="[i === 0 ? 'block' : 'lg:hidden']">
                            {{ article.intro?.replace(/<[^>]+>/g, '') }}
                        </p>
                        <div class="flex flex-wrap gap-2 mt-2 justify-end items-center">
                            <NuxtLink :to="'/' + article.category?.code">
                                <span class="text-sm sm:text-base text-primary-100 font-semibold">{{ article.category?.title }}</span>
                            </NuxtLink>
                            <span class="text-sm sm:text-base">-</span>
                            <span class="text-sm sm:text-base">{{ utils.dateFormat(article.createdOn) }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="grid grid-cols-12 gap-1">
                    <div class="aspect-[16/10] rounded overflow-hidden shadow-md col-span-12">
                        <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)" class="block">
                            <img :src="article.thumbnail  || '/images/default-thumbnail.jpg'" class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                        </NuxtLink>
                    </div>
                    <div class="col-span-12">
                        <NuxtLink :to="'/' + article.category?.code + '/'+ String(article.code)" class="block">
                            <h3 class="text-sm md:text-base font-semibold mt-2 hover-text-primary-100 transition-all duration-300">
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
                    </div>
                </div>
            </article>
        </template>
    </div>
</template>
