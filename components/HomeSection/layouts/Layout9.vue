<script setup lang="ts">
const props = defineProps<{
    articles: any[]
}>()

</script>
<template>
    <div class="grid md:grid-cols-4 gap-6">
        <template v-for="(article, i) in (props.articles || [])" :key="i">
            <article class="flex flex-col gap-2 h-full max-w-full overflow-hidden" :class="{
            'md:row-span-3': i === 0,
            'sm:col-span-2': [0, 5].includes(i),
            'md:col-span-1': i === 5,
            'md:col-span-2': i === 1
        }">
                <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)">
                    <div class="h-full rounded overflow-hidden" :class="{ 'aspect-video': i === 0 }">
                        <img :src="article.thumbnail" :alt="article.title?.replace(/<[^>]+>/g, '')"
                            class="w-full h-full object-cover" />
                    </div>
                </NuxtLink>

                <NuxtLink :to="'/' + article.category?.code + '/' + String(article.code)">
                    <h3 class="font-semibold flex gap-3 items-center text-lg">
                        {{ article.title?.replace(/<[^>]+>/g, '') }}
                    </h3>
                </NuxtLink>
                <p v-if="i === 0" class="opacity-50">
                    {{ article.intro?.replace(/<[^>]+>/g, '') }}
                </p>
                <!-- <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                    <NuxtLink :to="'/' + article.category?.code">
                        <span class="text-sm text-primary-100 font-semibold">{{ article.category?.title }}</span>
                    </NuxtLink>
                    <span class="text-sm hidden sm:inline-block">-</span>
                    <span class="text-sm">{{ utils.dateFormat(article.createdOn) }}</span>
                </div> -->
            </article>
        </template>
    </div>
</template>