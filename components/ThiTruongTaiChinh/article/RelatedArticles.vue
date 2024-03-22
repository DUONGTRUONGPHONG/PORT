<script setup>
import dayjs from 'dayjs'
const props = defineProps({
    articleRelations: Array
})
</script>
<template>
    <section class="xl:mb-[1.5rem] mb-[1rem]">
        <header class="justify-start flex mb-[0.75rem] md:mb-[1rem] flex-row items-center flex-wrap relative">
            <h2 class="bg-transparent text-[1.25rem] mb-0 leading-[1] font-semibold">
                <a class="text-red-500 transition duration-300 ease-in-out hover:text-red-500 font-playfair-display inline-block" href="02.1-category.html">Tin liên quan</a>
            </h2>
        </header>
        <div class="[&_article:not(:last-of-type)]:pb-[1rem] [&_article:not(:last-child)]:pb-[1rem] [&_article:not(:last-of-type)]:mb-[1rem] [&_article:not(:last-child)]:mb-[1rem]">
            
            <article class="border-b-[1px] border-solid border-[#eee]" v-for="article in props.articleRelations" :key="article.id">
                <header>
                    <h3 class="font-playfair-display md:text-[1rem] mb-0 font-normal leading-[1.4] overflow-hidden text-ellipsis transition duration-300 ease-in-out hover:text-red-500">
                        <nuxt-link :to="{name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code }}"><span v-html="article.title"></span></nuxt-link>
                    </h3>
                    <div class="opacity-50 font-bai-jamjuree mt-[0.5rem] md:flex md:justify-between items-center text-[0.75rem] mb-[0.5rem] ">
                        <time>{{ dayjs(article.createdOn).format('DD/MM/YYYY') }}</time>
                    </div>
                </header>
            </article>
        </div>
</section></template>