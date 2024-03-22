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

if (article?.value?.authors?.length) {
    article?.value?.authors?.forEach((author, index) => {
        if (index == 0) {
            authors.value = author.title
        } else {
            authors.value = authors.value + ', ' + author.title
        }
    });
}

</script>

<template>

<MainHeader />

    <main class="container-xxl mx-auto font-sans">

        <div class="bg-gray-100 my-[1.5rem] mx-auto w-full h-[200px] flex items-center justify-center text-[30px]">
            quảng cáo
        </div>
        <BreadcrumbArticleTTTC :category="category" />

        <div class="grid grid-cols-12 gap-[16px] text-[16px]">
            <div class="md:col-span-2 lg:block hidden">
            </div>

            <div class="lg:col-span-7 col-span-12">
                <section class="mb-2" v-if="article?.id">
                    <article class="mb-[1.5rem] relative">
                        <h1 class="text-center font-playfair-display mb-[0.5rem] lg:text-[1.5rem] md:text-[1.25rem] text-[1.125rem] font-bold text-gray-700"
                            v-if="article.sub" v-html="article.sub" />
                        <h1 class="text-center font-playfair-display mb-[1rem] leading-[1.4] font-bold xl:text-[2rem] lg:text-[1.75rem] md:text-[1.5rem]"
                            v-if="article.title" v-html="article.title" />
                        <div class="text-center opacity-80">
                            <span class="font-semibold mr-[0.5rem]" v-if="article.authors?.length">{{ authors }}</span>
                            <span v-if="article.createdOn"><time>{{ dayjs(article.createdOn).format('DD/MM/YYYY HH:mm')
                                    }}</time></span>
                        </div>
                        <div class="my-[0.5rem] flex items-center justify-center gap-[10px]">
                            <span>Chia sẻ</span>
                            <a href="#"
                                class="text-[22px] flex items-center justify-center w-[28px] h-[28px] leading-[28px] text-center rounded-[50%] text-white text-[0.8125rem] bg-[#3b5998]">
                                <Icon name="mdi:facebook" />
                            </a>
                            <a href="#"
                                class="text-[20px] flex items-center justify-center w-[28px] h-[28px] leading-[28px] text-center rounded-[50%] text-white text-[0.8125rem] bg-[#55ACEE]">
                                <Icon name="mdi:twitter" />
                            </a>
                            <a href="#"
                                class="w-[28px] h-[28px] leading-[28px] flex items-center justify-center rounded-[50%] text-white text-[0.8125rem] bg-[#018FE5]"><img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEdSURBVHgBnVTtDYIwED2M/2WEOoGMoBu4gTgBcQJlAtwAnYA4AWwAToBOAE5Q38UjIU2h4EsebS9998UBEaC1jsBcT0MDZqBirYdNiDUFY7ACWxqHD+7BA7hjBzk2L8/zjjQDnW6BxxtU9B8+nEGATSaGoRKeyPDai66w1MQl9Axc18YQBsIdHBRyl3tQgsVo2ewUrMGLYU/F7tMY5FJu2CJ5lcolPosDZWTUmBnZxKFE2VoyylxiaxScEzOjIQe2uruMApc4Gai7nlN34MrIxFIiJmCMwah64jP9Rry1OOF7Dx4uHmX+Erc4rI3oPLqrgcCKNeCJpOshzQT3hbULObv+ATYUoL/E4w4m0otqopibHYG3fjqlno5aNP4X0QRio12c6d4AAAAASUVORK5CYII="
                                    alt="" class="img-fluid"></a>
                            <a href="#"
                                class="w-[28px] h-[28px] leading-[28px] flex items-center justify-center rounded-[50%] text-white text-[0.8125rem] bg-[#ff0018]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>

                            </a>
                        </div>
                        <h2 class="text-justify text-[1.125rem] leading-[1.6] mt-[0.5rem] mb-[1.5rem] italic relative"
                            v-if="article.intro" v-html="article.intro" />

                        <div v-if="article.detail" v-html="article.detail" />
                    </article>
                </section>

                <ContinueReadingSection v-if="article?.relations" :articles="article?.relations?.filter(item => item.id !== article?.id).slice(0, 3)" />


                <section>
                    <article class="mb-[1rem] py-[1rem] border-b-[1px] border-solid border-[#e0e0e0] flex items-center">
                        <iframe
                            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=160&layout=button&action=like&size=small&share=true&height=65&appId"
                            width="140" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </article>
                </section>

                <TagSection v-if="article?.tags?.length" :tags="article?.tags" />
                <CommentSection :total="article?.comments" />

            </div>
        </div>
    </main>

    <FooterArticleDetailMagazine />
    <ScrollToTop />
</template>