<script setup>
import dayjs from 'dayjs'
const props = defineProps({
    articles: Array
})
const articles = computed(() => props.articles)
</script>
<template>
    <section class="mt-[1rem]">
        <header class="justify-start flex mb-[0.75rem] md:mb-[1rem] flex-row items-center flex-wrap relative">
            <h2 class="font-playfair-display bg-transparent text-[1.25rem] mb-0 leading-[1] font-semibold">
                <a class="text-red-500 inline-block" href="02.1-category.html">Đọc tiếp</a>
            </h2>
        </header>
        <div
            class=" [&_article:not(:last-of-type)]:pb-[1rem] [&_article:not(:last-child)]:pb-[1rem] [&_article:not(:last-of-type)]:mb-[1rem] [&_article:not(:last-child)]:mb-[1rem]">
            <article class="border-b-[1px] border-solid border-[#eee]" v-for="article in articles"
                :key="article.id">
                <header>
                    <h3 class="font-playfair-display transition duration-300 ease-in-out hover:text-red-500 md:text-[1rem] mb-0 font-normal leading-[1.4] overflow-hidden text-ellipsis">
                        <nuxt-link :to="{ name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code }}">
                            <span v-if="article?.title" v-html="article.title"></span>
                        </nuxt-link>
                    </h3>
                    <div class="font-bai-jamjuree mt-[0.5rem] flex justify-between items-center text-[0.75rem] mb-[0.5rem] ">
                        <a href="02-category.html" class="text-[0.625rem] text-red-500 uppercase italic font-semibold">{{ article.category.title }}</a>
                        <time v-if="article?.createdOn">{{ dayjs(article.createdOn).format('HH:mm DD/MM/YYYY') }}</time>
                    </div>
                </header>
            </article>
        </div>
    </section>
</template>