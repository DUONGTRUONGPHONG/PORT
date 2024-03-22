<script setup lang="ts">
// import { PaginationInfo } from '~/objects';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
const articleStore = useArticleStore()
const { pagination } = storeToRefs(articleStore)
const router = useRouter();
const route = useRoute()
const TagSlug = route.params.tagSlug as string
const segments = _Split(TagSlug, '-')
const tagId = Number(segments[segments.length - 1])
const tagResult = ref<any[]>([])
const fetchQuery = async () => {
    tagResult.value = await articleStore.fetchByTagId(tagId);
    if (!tagResult.value || (tagResult.value as any).total === 0) {
        tagResult.value = []
        return
    }
    console.log(tagResult)
}
const tagDetail = ref<any>()
async function loadTagDetail() {
    const { data } = await useFetch(`${useRuntimeConfig().public.apiUrl}/cms/tag/${tagId}`);
    tagDetail.value = (data.value as any).item.title
}
loadTagDetail()
fetchQuery()


const init = () => {
    articleStore.setStateFromRoute(route.query)
}
init()


watch(() => route.query, () => {
    init()
    fetchQuery()
})

</script>
<template>
    <wrap>
        <Row class="mt-5">
            <MainCol class="border-r border-gray-300 dark:border-gray-700 p-5">
                <div class="flex items-center gap-4">
                    <a class="text-blue-500">Tag :</a>
                    <span class="text-xl uppercase font-bold">{{ tagDetail }}</span>
                </div>
                <div class=" border-b border-gray-300 mt-5 mb-5 p-3"></div>
                <div>
                    <div class=" rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel"
                        aria-labelledby="dashboard-tab">
                        <p class="text-sm text-black-500 dark:text-gray-400">
                        <div v-if="tagResult.length > 0">
                            <div v-for="(item, index) in tagResult" :key="index">
                                <div class="mb-4 border-b border-black-200 p-2">
                                    <Article mode="event" :title="item?.title" :thumb="item.thumbnail"
                                        :created-on="item.createdOn"
                                        :slug="'/' + item.category?.code + '/' + item.code" />
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-red-500 text-xl text-center">Không có bài viết</p>
                        </div>
                        </p>
                    </div>
                    <Pagination v-if="tagResult.length > 0" :payload="pagination" class="mt-6" />
                </div>
            </MainCol>
            <RightCol>
                <div class="ml-5 h-96 mt-4 grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1">
                    ADS<br />
                    HERE
                </div>
                <div class="mt-5">
                    <a class="text-xl text-black-500 hover:text-pink border-b-2 border-pink ml-5"> Xem Nhiều</a>
                    <div v-for="(item, index) in tagResult" :key="index">
                        <div class="mb-4 border-b border-gray-200 dark:border-gray-700 p-2 ml-5 pt-4">
                            <Article mode="text" :title="item?.title"
                            :slug="'/' + item.category?.code + '/' + item.code" />
                        </div>
                    </div>
                </div>
            </RightCol>
        </Row>

    </wrap>
</template>
