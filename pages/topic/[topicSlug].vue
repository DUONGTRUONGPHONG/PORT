<script setup lang="ts">
import { TopicLayoutDefault } from '@/components/cms/topic/layout'
import { storeToRefs } from 'pinia';


const route = useRoute()
const articleStore = useArticleStore()
const { pagination } = storeToRefs(articleStore)
const topicSlug = route.params.topicSlug as string
const segments = _Split(topicSlug, '-')
const topicId = Number(segments[segments.length - 1])
const articles = ref<any>()

const init = () => { articleStore.setStateFromRoute(route.query)}
init()

// get list article By topicId
loadArticleByTopicId(topicId)
async function loadArticleByTopicId(topicId:any) {
    articles.value = await articleStore.fetchByTopicId(topicId)
    console.log(articles.value)
}


const topicWrap = computed(() => {
    return TopicLayoutDefault
})

watch(()=>route.query, () => {      
    init()
    loadArticleByTopicId(topicId)
})
useHead({
    title: "Topics"
})
</script>

<template>
    <component :is="topicWrap" :payload="articles" :pagination="pagination" />
</template>