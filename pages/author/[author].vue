<script setup lang="ts">
const articleStore = useArticleStore()
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { pagination } = storeToRefs(articleStore)
const router = useRouter();
const route = useRoute()
const authorId = route.params.aliasSlug
console.log(authorId)
// const segments = _Split(AuthorSlug, '-')
// const authorId = Number(segments[segments.length - 1])
const AuthorResult = ref<any[]>([])
const fetchQueryauthor = async () => {
    AuthorResult.value = await articleStore.fetchByauthors(Number(authorId));
    if (!AuthorResult.value || (AuthorResult.value as any).total === 0) {
        AuthorResult.value = []
        return
    }
}
const authorDetail = ref<any>()
async function loadauthorDetail() {
    const { data } = await useFetch(`${useRuntimeConfig().public.apiUrl}/cms/author/${authorId}`);
    authorDetail.value = (data.value as any).item.title
}
loadauthorDetail()
fetchQueryauthor()
const init = () => {
    articleStore.setStateFromRoute(route.query)
}
init()


watch(() => route.query, () => {
    init()
    fetchQueryauthor()

})
</script>

<template>
    <wrap>
        <div class="flex items-center gap-4">
            <a class="text-blue-500 underline">Tác Giả :</a>
            <span class="text-xl uppercase font-bold">{{ authorDetail }}</span>
        </div>
        <div class="grid md:grid-cols-4 gap-4 mt-6" v-if="AuthorResult.length > 0">
            <span class="text-xl font-bold text-gray-500 underline">Bài Viết Đã Soạn :</span>
            <div v-for="(item, index) in AuthorResult" :key="index">
                <div class="mb-4">
                    <Article mode="modern" :title="item?.title" :thumb="item.thumbnail" :created-on="item.createdOn"
                    :slug="'/' + item.category?.code + '/' + item.code" />
                </div>
            </div>
        </div>
        <Pagination v-if="AuthorResult.length" :payload="pagination" class="mt-6" />
    </wrap>
</template>
