<script setup lang="ts">
import { EventLayoutDefault } from '@/components/cms/event/layout'
import { storeToRefs } from 'pinia';


const route = useRoute()
const articleStore = useArticleStore()
const { pagination } = storeToRefs(articleStore)
const eventSlug = route.params.eventSlug as string
const segments = _Split(eventSlug, '-')
const eventId = Number(segments[segments.length - 1])
const articles = ref<any>()

const init = () => { articleStore.setStateFromRoute(route.query)}
init()

// get list article By EventId
async function loadArticleByEventId(eventId:any) {
    articles.value = await articleStore.fetchByEventId(eventId, 1, 20)
    console.log(articles.value)
}
loadArticleByEventId(eventId)

const eventWrap = computed(() => {
    return EventLayoutDefault
})

watch(()=>route.query, () => {      
    init()
    loadArticleByEventId(eventId)
})
useHead({
    title: "Events"
})
</script>

<template>
    <component :is="eventWrap" :payload="articles" :pagination="pagination" />
</template>