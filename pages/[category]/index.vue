/*
- LayoutType: Normal=1 | Photo=2 | Video=3|Document=4 | Reaction=5 (Poll,Quiz)
*/
<script setup lang="ts">
import { CategoryLayoutDefault,CategorylayoutTTTC } from '@/components/cms/category/layout'
import useAnalytics from '~/composables/useAnalytics';
import { useCategoryStoreV2 } from '~/stores/v2/category';
import { useArticleStoreV2 } from '~/stores/v2/article';
import type { Article } from '~/server/models/v2/article';

const route = useRoute()
const v2CategoryStore = useCategoryStoreV2()
const v2ArticleStore = useArticleStoreV2()

const { pagination } = storeToRefs(v2ArticleStore)

const categorySlug = route.params.category as string[]
const articles = ref<Article[]>([])

const init = () => {
    v2ArticleStore.setStateFromRoute(route.query)
}

const currentCategory = v2CategoryStore.findByCode(categorySlug)
console.log(categorySlug)

init()

if (currentCategory) articles.value = await v2ArticleStore.fetchByCategoryIdWithPaging(currentCategory.id)

const categoryWrap = computed(() => {
    return CategoryLayoutDefault
})

watch(() => route.query, async () => {
    init()
    if (currentCategory) articles.value = await v2ArticleStore.fetchByCategoryIdWithPaging(currentCategory.id)
})

useHead({
    title: currentCategory?.title,
})

onMounted(() => {
    const analytics = useAnalytics()
    if (currentCategory) analytics.addAccessSpecificSection(currentCategory.id)
})
const layout = {
    tttc: CategorylayoutTTTC,
    '': CategoryLayoutDefault
}
</script>

<template>
    <component :is="layout['']" :category="currentCategory" :payload="articles" :pagination="pagination" />
</template>