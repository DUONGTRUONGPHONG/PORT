<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as cheerio from 'cheerio'
import Poll from '@/components/cms/Poll.vue'
import Quiz from '@/components/cms/Quiz.vue'
import Comment from '@/components/comments/Comment.vue';
import type { Article } from '~/server/models/v2/article';
import {useCategoryStoreV2} from '~/stores/v2/category'
const router = useRouter();
const dataId = ref<any>('');
const props = defineProps<{ article?: Article | null, category?: any }>();
const redirectArticle = () => {
    const listArticleRelationElement = document.querySelectorAll('articlerelation');
    listArticleRelationElement.forEach(articleRelationElement => {
        articleRelationElement?.addEventListener("click", async (event) => {
            const element = event.target
            dataId.value = element?.getAttribute('data-id')
            try {
                const { apiUrl } = useRuntimeConfig().public;
                const { item }: any = await $fetch(`${apiUrl}/cms/article-publishing/${dataId.value}`, {
                    headers: {
                        Site: '1'
                    }
                })
                const category= useCategoryStoreV2().findById(item.categoryId)
                router.push(`/${category?.code}/${item.code}`)
            } catch (error) {
                console.log(error)
            }
        })
    })
}


onMounted(() => {
    redirectArticle()
    if(props.article?.brief) {
        const $ = cheerio.load(props.article?.brief)
        document.getElementById('audio').innerHTML = $('audio')
        if(document.querySelector('#audio audio')) {
            document.querySelector('#audio audio').style.width = '100%'
        }
    }
})

const fontSize = ref(16)
const increaseFontSize = () => {
    if (fontSize.value < 24) {
        fontSize.value = fontSize.value + 2
    }
}

const decreaseFontSize = () => {
    if (fontSize.value > 10) {
        fontSize.value = fontSize.value - 2
    }

}

// console.log(props.article)
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <div class=" bg-[#fcfaf6]">
                <Wrap>
                    <Row class="pt-4">
                        <MainCol class="overflow-x-hidden">
                            <template v-if="article?.id">
                                <div class="flex flex-wrap items-center justify-between">
                                    <BreadcrumbArticle :category="category" />
                                    <div class="text-[22px] flex items-center gap-2">
                                        <div @click="increaseFontSize()"
                                            :class="fontSize < 24 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                                            class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                                            <Icon name="fluent:font-increase-20-regular" />
                                        </div>
                                        <div @click="decreaseFontSize()"
                                            :class="fontSize > 10 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                                            class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                                            <Icon name="fluent:font-decrease-20-regular" />
                                        </div>
                                    </div>
                                </div>
                                <article class="flex flex-col gap-4 my-3">
                                    <h1 v-html="article?.sub" class="text-xl font-bold opacity-60"></h1>
                                    <h1 v-html="article?.title" class="text-2xl font-bold sm:text-3xl xl:text-4xl"></h1>
                                    <ArticleMeta :authors="article?.authors" :createdOn="article?.createdOn"
                                        :createdBy="article?.createdBy" />
                                    <div id="audio"></div>
                                    <div v-html="article?.intro" class="font-semibold text-xl"></div>
                                    <div :class="'text-[' + fontSize + 'px]'">
                                        <Component :is="{ template: article?.detail, components: { Poll, Quiz } }" />
                                    </div>
                                </article>

                                <div class="grid gap-4 mb-4">
                                    <section>
                                        <article
                                            class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
                                            <iframe
                                                src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId"
                                                width="140" height="20" style="border:none;overflow:hidden"
                                                scrolling="no" frameborder="0" allowfullscreen="true"
                                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                        </article>
                                    </section>
                                    <!-- topic -->
                                    <Topic :topics="article?.topics" />

                                    <Event :events="article?.events" />

                                    <!-- tags -->
                                    <Tag :tags="article?.tags" />

                                    
                                    
                                    <ArticleButon :article="article" :category="category" class="mt-3" />

                                    <hr v-if="article?.relations?.length" class="border-1 border-neutral-1" />
                                    <ListWithTitle :title="'Bài viết liên quan'" :articles="article?.relations" />
                                </div>
                            </template>

                            <Message v-else message="Bài viết không tồn tại" />
                        </MainCol>

                        <RightCol class="pl-6">
                            <div
                                class="grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1 h-80">
                                Mời<br />
                                Quảng cáo
                            </div>
                        </RightCol>
                    </Row>
                </Wrap>
            </div>
            <div class="border-t bg-white" v-if="article?.id">
                <Wrap>
                    <Row class="pt-4">
                        <MainCol>
                            <Comment :articleId="article?.articleId" />
                        </MainCol>
                    </Row>
                </Wrap>
            </div>

        </NuxtLayout>
    </div>
</template>

<style scoped>
audio {
    width: 100%;
}
</style>