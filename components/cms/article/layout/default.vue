<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Poll from '@/components/cms/Poll.vue'
import Quiz from '@/components/cms/Quiz.vue'
import Comment from '@/components/comments/Comment.vue';
import type { Article } from '~/server/models/v2/article';
import { useCategoryStoreV2 } from '~/stores/v2/category'
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
                const category = useCategoryStoreV2().findById(item.categoryId)
                router.push(`/${category?.code}/${item.code}`)
            } catch (error) {
                console.log(error)
            }
        })
    })
}

const ORIGIN = 'https://stable.vpress.vn'
const showPropAuthor = () => {
    const listAuthor = document.querySelectorAll('author')
    if (listAuthor?.length > 0) {
        listAuthor.forEach(author => {
            author.classList.add('relative', 'group', 'cursor-pointer')
            const code = author.getAttribute('data-code') ? author.getAttribute('data-code') as string : ''
            const title = author.getAttribute('data-title') ? author.getAttribute('data-title') as string : ''
            const thumbnail = author.getAttribute('data-thumbnail') ? author.getAttribute('data-thumbnail') as string : ''
            const description = author.getAttribute('data-description') ? author.getAttribute('data-description') as string : ''

            const div = document.createElement('div')
            div.classList.add('absolute', 'z-10', 'hidden', 'group-hover:flex', 'top-[90%]', 'w-[200px]', 'bg-white', 'shadow-lg', 'p-2', 'rounded-[12px]', 'text-black', 'gap-3')
            div.innerHTML = propupAuthor(code, title, thumbnail, description)
            author.appendChild(div)
        })
    }
}
const propupAuthor = (code: string, title?: string, thumbnail?: string, description?: string) => {
    const results = []
    if (thumbnail) {
        results.push(
            '<figure class="w-[50px] h-[50px]">',
            `<a href="/author/${code}">`,
            '<img class="w-full h-full rounded-full object-cover"',
            `src="${thumbnail}" alt="">`,
            '</a>',
            '</figure>',
        )
    }
    results.push(`<a href="/author/${code}" class="text-[14px]">`,)
    if (title) {
        results.push(
            '<div class="font-bold hover:text-primary-100">',
            `${title}`,
            '</div>',
        )
    }

    if (description) {
        results.push(
            '<div class="line-clamp-3">',
            `${description}`,
            '</div>',
        )
    }

    results.push(
        '</a>'
    )

    return results.join('')
}
onMounted(() => {
    redirectArticle()
    showPropAuthor()
    if (document.querySelectorAll('audio')?.length) {
        document.querySelectorAll('audio').forEach(element => {
            element.style.width = '100%'
        });
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
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <div class=" bg-[#fcfaf6]">
                <Wrap>
                    <Row class="pt-4">
                        <MainCol>
                            <template v-if="article?.id">
                                <BreadcrumbArticle :category="category" />

                                <article class="flex flex-col gap-4 my-3 relative">
                                    <div class="absolute h-full lg:left-[-54px]">
                                        <div class="sticky top-[60px] z-10 mt-2">
                                            <div
                                                class="h-full text-center p-1 rounded-full gap-2 w-[2.5rem] h-[2.5rem] border border-solid border-gray-400 bg-white">
                                                <button @click="increaseFontSize"
                                                    class="bg-transparent flex items-center rounded-full justify-center p-1 border border-solid border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white">
                                                    <Icon name="ic:outline-plus" class="w-[22px] h-[22px]" />
                                                </button>
                                                <Icon name="mingcute:font-size-line"
                                                    class="w-[22px] h-[22px] my-1 text-gray-500" />
                                                <button @click="decreaseFontSize"
                                                    class="bg-transparent flex items-center rounded-full justify-center p-1 border border-solid border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white">
                                                    <Icon name="ic:outline-minus" class="w-[22px] h-[22px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 v-html="article?.sub" class="text-xl font-bold opacity-60"></h1>
                                    <h1 v-html="article?.title" class="text-2xl font-bold sm:text-3xl xl:text-4xl"></h1>
                                    <ArticleMeta class="text-primary-100" :authors="article?.authors"
                                        :createdOn="article?.createdOn" :createdBy="article?.createdBy" />
                                    <div id="audio"></div>
                                    <div v-html="article?.intro" class="font-semibold text-xl"></div>
                                    <div :class="`text-[${fontSize}px]`">
                                        <Component :is="{ template: article?.detail, components: { Poll, Quiz } }" />
                                    </div>


                                </article>
                                <div class="grid gap-4 mb-4">
                                    <section>
                                        <article
                                            class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
                                            <div>
                                                <iframe
                                                    :src="`https://www.facebook.com/plugins/like.php?href=${ORIGIN}/${category?.code}/${article?.code}&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId`"
                                                    width="140" height="20" style="border:none;overflow:hidden"
                                                    scrolling="no" frameborder="0" allowfullscreen="true"
                                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                            </div>
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