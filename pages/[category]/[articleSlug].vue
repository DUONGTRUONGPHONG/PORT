/*
- LayoutType: None=0 | Normal=1 | Short=2 | Long=3 | Page=4 | Other=5
- ContentType: None=0 | Normal=1 | Photo=2 | Video=3 | Graphic=4 | Document=5 | Reaction=6 (Poll,Quiz) | Other=7
- Type: None=0 | Editorial=1 | General=2 | Reportage=3 | Interview=4 | Survey=5 | Tutorial=6 | Podcast=7 | Broadcast=8 |
TalkShow=9 | LiveStream=10 | Translation=11 | Promotion=12 | Other=13
*/
<script setup lang="ts">
import { ArticleLayoutDefault, ArticleLayoutFullPage, ArticleLayoutImage, ArticleLayoutInfographics, ArticleLayoutLongform, ArticleLayoutVideo, ArticleLayoutPodcast } from '@/components/cms/article/layout'
import { ArticleLayoutDetail, ArticleLayoutDetailMagazine } from '@/components/ThiTruongTaiChinh/article/layout'
import { useArticleStoreV2 } from '~/stores/v2/article';
import { useCategoryStoreV2 } from '~/stores/v2/category';

const route = useRoute()

const v2CategoryStore = useCategoryStoreV2()
const v2ArticleStore = useArticleStoreV2()

const articleSlug = route.params.articleSlug as string

let article = await v2ArticleStore.fetchById(articleSlug)
if (article?.relations?.length > 0) {
    const newRelations = article?.relations.filter(item => item.category)
    article = { ...article, relations: newRelations }
}
// console.log("article",article.detail,article.articleId)
const category = computed(() => {
    return v2CategoryStore.findById(article?.categoryId)
})

const url = useRequestURL();
let hostname = url.hostname.split('.')[0];
console.log(hostname)
if (hostname === 'localhost') hostname = ''

const articleWrap = computed(() => {
    if (hostname === 'thitruongtaichinh') {
        switch (article?.layoutType) {
            case 1:
                return ArticleLayoutDetail
            case 2:
                return ArticleLayoutDetailMagazine
            default:
                return ArticleLayoutDetail
        }
    } else {
        switch (article?.contentType) {
            case 1:
                return ArticleLayoutDefault
            case 2:
                return ArticleLayoutImage
            case 3:
                return ArticleLayoutPodcast
            case 4:
                return ArticleLayoutVideo
            case 5:
                if (article?.layoutType === 3) return ArticleLayoutInfographics
                return ArticleLayoutFullPage
            default:
                return ArticleLayoutDefault
        }
    }
})

utils.log('article', article)

onMounted(() => {
    if (article?.id) {
        const analytics = useAnalytics(article)
        analytics.addAccessSpecificArticle(article.id)
    }
})
definePageMeta({
    layout: false,
})
useSeoMeta({
    title: article?.title,
    ogTitle: article?.title,
    description: article?.intro,
    ogDescription: article?.intro,
    ogImage: article?.thumbnail,
})
</script>

<template>
    <component :is="articleWrap" :article="article" :category="category" class="font-arial" />
</template>