<script setup>
import dayjs from 'dayjs'
const props = defineProps({
    article: Object
})
</script>
<template>
    <div>
        <figure class="mb-[0.5rem] overflow-hidden">
            <nuxt-link :to="{name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }" class="block relative pb-[56.25%] w-full bg-[#eee] rounded-[0.5rem] overflow-hidden">
                <img class="absolute inset-0 object-cover w-full h-full" :src="props.article.thumbnail"
                    alt="">
            </nuxt-link>
        </figure>
        <header >
            <div class="font-bai-jamjuree md:flex md:justify-between md:items-center text-[0.75rem] mb-[0.5rem]">
                <time class="block opcity-50">{{ dayjs(article.createdOn).format('HH:mm DD/MM/YYYY') }}</time>
            </div>
            <h3 class="font-playfair-display line-clamp-2 mb-0 text-[1rem] leading-[1.4] overflow-hidden text-ellipsis transition duration-300 ease-in-out hover:text-red-500">
                <nuxt-link :to="{name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }" >
                    <span v-html="props.article.title"></span>
                </nuxt-link>
            </h3>
        </header>
    </div>
</template>