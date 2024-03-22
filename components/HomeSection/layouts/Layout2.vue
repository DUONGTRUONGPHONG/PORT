<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>
<template>
    <div class="grid gap-4 divide-y">
        <template v-for="(article, i) in (props.articles || [])" :key="i">
            <article class="flex gap-3 items-center" :class="{ 'pt-4': i !== 0 }">
                <figure class="w-[150px] h-20"><img alt="" class="object-cover h-full w-full rounded-lg"
                            :src="article?.thumbnail" style="">
                </figure>
                <NuxtLink class="flex-1" :to="'/' + article.category?.code + '/'+ String(article.code)">
                    <h3 class="font-semibold">
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
        </template>
    </div>
</template>
