<script setup lang="ts">
const TopictStore = useTopicStore();
const route = useRoute()

const props = defineProps<{ category?: any, payload?: any, subtree?: any , pagination?:any,}>();
const top3 = computed(() => {
    return _Slice(props.payload, 1, 4)
})

const listArticle = computed(() => props.payload ? props.payload : [])
const topicSlug = route.params.topicSlug as string
const segments = _Split(topicSlug, '-')
const topicId = Number(segments[segments.length - 1])

// Get List topic New
const listTopic = ref<any>()
const topic = ref<any>()


async function loadDataDefault() {
    // list Chủ đề
    listTopic.value = await TopictStore.fetchPagingWithFiltering(1, 3, 10);

    // chi tiet Chủ đề
    topic.value = await TopictStore.fetchByTopicId(topicId);
}

async function main() {
    await loadDataDefault(); // Đợi loadDataDefault hoàn thành trước
    const topicTitle = topic.value;
}
main();
// Get List topic End
</script>

<template>
    <Wrap>
        <!-- topic -->
        <div class="px-4 xs:px-6 2xl:px-0 grid max-w-full items-center grid-cols-[max-content_1fr] gap-4 overflow-hidden border-t border-b border-blue-100 whitespace-nowrap">
            <div class="flex flex-col items-center md:flex-row md:gap-2 xl:gap-3 text-sky-600">
                <Icon name="fa6-solid:book-bookmark" class="text-xs xs:text-sm sm:text-base xl:text-xl" />
                <CustomText text="Chủ đề" class="after:content-[':'] after:hidden after:md:inline text-sm sm:text-base" tag="strong" />
            </div>
            <div class="flex items-center max-w-full gap-4 overflow-x-auto text-sm no-scrollbar zone__content h-12">
                <NuxtLink v-for="(topic, index) in listTopic" :key="index"
                    :to="utils.generateSlugWithId('/topic', topic?.slug as string, topic?.id as number)">
                    <CustomText tag="span" :text="topic?.title"
                    class="px-4 py-1 mb-2 cursor-pointer text-blue-600 duration-300 border-2 border-blue-400 border-dashed rounded-md hover:bg-blue-400 hover:text-white" />
                </NuxtLink>
            </div>
        </div>
        <!-- topic end -->
        
        <Row class="pt-5">
            <BreadcrumbCategory :category="category" :subtree="subtree" />
        </Row>
        <Row class="mt-5">
            <MainCol>
                <div class="flex items-center mt-5 mb-5">
                    <ul
                        class="bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 font-medium inline-block rounded-tl-lg rounded-br-lg">
                        <li
                            class="inline-block uppercase rounded-l-lg border-radius border-red-500 border-r-0 px-2 py-1 text-center block transition-transform duration-300 transform hover:scale-105">
                            <NuxtLink :to="topicSlug">
                                {{ topic?.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                    <div class="border border-slate-7 flex-grow ml-4"></div>
                </div>
                <Article v-for="(item, index) in listArticle" :key="index" mode="event" class="m-4" image-size="md" text-size="sm" 
                    :title="item?.title" :brief="item?.intro"
                    :slug="'/' + item.category?.code + '/' + item.code"
                    :thumb="item?.thumbnail"
                    :authors="item?.authors"
                    :createdOn="item?.createdOn" /> 
                <Pagination v-if="listArticle.length" :payload="pagination" class="mt-6" />
            </MainCol>
            <RightCol class="pl-8 hidden xl:block">
                <div class="grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1 h-80">
                    Mời<br />
                    Quảng cáo
                </div>
                <div class="border-b-2 mt-10">
                    <p class="text-lg font-semibold">Tin xem nhiều</p>
                </div>
                <div class="mt-4">
                    <ArticleBasicHorizontal v-for="(item, index) in listArticle" :key="index" image-size="sm"
                        :title="item.title" :slug="'/' + item.category?.code + '/' + item.code"
                        :thumb="item?.thumbnail" :class="[index !== 0 ? 'pt-4 mt-4 border-t' : '']" />
                </div>
            </RightCol>
        </Row>
    </Wrap>
</template>
<style lang="css" scoped>
.zone__content::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
 .zone__content::-webkit-scrollbar-thumb {
    background: #cdcccc;
    border-radius: 4px;
}
 .zone__content::-webkit-scrollbar-track {
    background: transparent;
}


</style>