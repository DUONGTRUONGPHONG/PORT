<script setup lang="ts">
import { Layout1, Layout2, Layout4, Layout5, Layout6, Layout7, Layout8, Layout9, Layout11 } from './layouts'
import { useCategoryStoreV2 } from '~/stores/v2/category';
import { useArticleStoreV2 } from '~/stores/v2/article';

const props = defineProps<{
    layout?: string | number
    page?: string | number
    noHeader?: boolean
    featured?: boolean
    category?: number | string
    limit?: string | number
}>()

const store = {
    article: useArticleStoreV2(),
    category: useCategoryStoreV2()
}

const props2Layout = new Map([
    [ 1, Layout1 ],
    [ 2, Layout2 ],
    [ 4, Layout4 ],
    [ 5, Layout5 ],
    [ 6, Layout6 ],
    [ 7, Layout7 ],
    [ 3, Layout8 ],
    [ 9, Layout9 ],
    [ 11, Layout11 ]
])
const articles = shallowRef<any[]>([])
const categories = shallowRef<any[]>([])

if (props.featured) {
    // const data = await $fetch(`https://portal-api-stable.vpress.vn/api-v1/cms/category-article-layout/page:${props.page}-layout:${props.layout}`, {
    //     headers: {
    //         Site: '1'
    //     }
    // })
    const data =  await store.article.fetchByCategorySectionArticle(Number(props.layout))

    if(data){
        const { item }: any = data
        articles.value = item?.articlePublishings
        categories.value = [item?.navigation,...item?.subNavigations]
    }
} else {
    articles.value = await store.article.fetchByCategoryIdWithPaging(Number(props.category), props.limit)
    const primaryCategory: any = store.category.findById(Number(props.category))
    const secondaryCategories = store.category.findChildren(primaryCategory)
    categories.value = [ primaryCategory, ...<[]>secondaryCategories ]
}

// function getCategoriesFromLayout(obj: any) {
//     const primaryCategory = store.category.findById(Number(obj?.categoryId))
//     const subCategories = obj?.subCategories || []
//     return [ primaryCategory, ...subCategories ]
// }
</script>

<template>
    <HomeSectionHeader v-if="!noHeader&&categories.length>0" :categories="categories" />
    <Component :is="props2Layout.get(Number(props.layout))" v-if="articles.length > 0" :articles="articles" />
</template>