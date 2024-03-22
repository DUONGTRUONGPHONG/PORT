<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
dayjs.extend(advancedFormat)
import type { Article } from '~/server/models/v2/article';
const props = defineProps<{ article?: Article | null, category?: any }>()

const authors = ref('')
const article = computed(() => props.article)
const categoryId = computed(() => props.category.id)
if (article?.value?.authors?.length) {
    article?.value?.authors?.forEach((author, index) => {
        if (index == 0) {
            authors.value = author.title
        } else {
            authors.value = authors.value + ', ' + author.title
        }
    });
}

// const 

const realEstates = await articleStoreV2.fetchByCategoryIdWithPaging(58, 4)
const socialLife = await articleStoreV2.fetchByCategoryIdWithPaging(69, 4)
const articlesSameCategory = await articleStoreV2.fetchByCategoryIdWithPaging(categoryId.value, 6)
const fontSize = ref(16)
const increaseFontSize = () => {
    fontSize.value = fontSize.value + 2
}
const reduceFontSize = () => {
    fontSize.value = fontSize.value - 2

}
</script>

<template>
    <MainHeader />

    <main class="container-xxl mx-auto font-sans my-[1.5rem]">
        <BreadcrumbArticleTTTC :category="category" />

        <div class="grid grid-cols-12 gap-[1rem] ">

            <div class="md:col-span-2 md:block hidden">
                <SocialSection @increaseFontSize="increaseFontSize" @reduceFontSize="reduceFontSize" />

                <div
                    class="bg-gray-100 w-full h-[200px] my-[1.5rem] sticky top-[60px] flex items-center justify-center text-[30px]">
                    quảng cáo
                </div>
            </div>

            <div class="lg:col-span-7 md:col-span-10 col-span-12">
                <template v-if="article?.id">

                    <section class="mb-2">
                        <article>
                            <h1 class="font-playfair-display mb-[0.5rem] lg:text-[1.5rem] md:text-[1.25rem] text-[1.125rem] font-bold text-gray-700"
                                v-if="article?.sub" v-html="article.sub" />
                            <h1 class="font-playfair-display mb-[1rem] leading-[1.4] font-bold xl:text-[2rem] lg:text-[1.75rem] md:text-[1.5rem]"
                                v-if="article?.title" v-html="article.title" />
                            <div>
                                <span class="font-semibold mr-[0.5rem]" v-if="article?.authors?.length">{{ authors
                                    }}</span>
                                <span v-if="article?.createdOn"><time>{{
            dayjs(article?.createdOn).format('dddd,DD/MM/YYYY HH:mm') }}</time></span>
                            </div>

                            <h2 class="text-justify text-[1.125rem] leading-[1.6] mt-[0.5rem] mb-[1.5rem] italic relative"
                                v-if="article?.intro" v-html="article?.intro" />

                            <div  :class="'text-['+fontSize+'px]'" v-if="article?.detail" v-html="article?.detail" />
                        </article>
                    </section>

                    <section>
                        <article
                            class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
                            <iframe
                                src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId"
                                width="140" height="20" style="border:none;overflow:hidden" scrolling="no"
                                frameborder="0" allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </article>
                    </section>

                    <TagSection v-if="article?.tags?.length" :tags="article?.tags" />

                    <RelatedArticles v-if="article?.relations"
                        :articleRelations="article?.relations.filter(item => item.id !== article?.id).slice(0, 3)" />

                    <CommentSection :total="article?.comments" />
                </template>
            </div>

            <div class="lg:col-span-3 col-span-12">
                <News />

                <div class="bg-gray-100 w-full h-[200px] my-[1.5rem] flex items-center justify-center text-[30px]">
                    quảng cáo
                </div>

                <ReadSection />

                <div class="bg-gray-100 w-full h-[200px] my-[1.5rem] flex items-center justify-center text-[30px]">
                    quảng cáo
                </div>
            </div>
        </div>

        <div
            class="bg-gray-100 mb-[1.5rem] mx-auto w-full md:w-[80%] h-[200px] flex items-center justify-center text-[30px]">
            quảng cáo
        </div>

        <div class="grid grid-cols-12 gap-[20px]">
            <div class="lg:col-span-9 md:col-span-8 col-span-12">
                <ArticlesSameCategory v-if="articlesSameCategory"
                    :articles="articlesSameCategory" />
            </div>

            <div class="lg:col-span-3 md:col-span-4 col-span-12">
                <div class="bg-gray-100 w-full h-[200px] my-[1.5rem] flex items-center justify-center text-[30px]">
                    quảng cáo
                </div>
                <div class="bg-gray-100 w-full h-[200px] my-[1.5rem] flex items-center justify-center text-[30px]">
                    quảng cáo
                </div>
            </div>
        </div>


        <div class="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
            <BlockSection title="Bất động sản" :articles="realEstates" />
            <BlockSection title="Đời sống xã hội" :articles="socialLife" />
        </div>
    </main>

    <FooterArticleDetailMagazine />
    <ScrollToTop />
</template>