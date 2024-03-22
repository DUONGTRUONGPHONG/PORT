<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useAnalytics from '~/composables/useAnalytics';
const articleStore = useArticleStore()
const { pagination } = storeToRefs(articleStore)
const route = useRoute()
const router = useRouter()
const searchInput = ref()
const query = ref('')
const searchResult = ref<any[]>([])
const count = ref()
const page = ref(1)
// const items = ref(Array(55))
const init = () => {
    articleStore.setStateFromRoute(route.query)
}
useFocus(searchInput, { initialValue: true })

async function fetchQuery() {
    const data : any = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/article-publishing/paging:${1}-${100}/search`,
      {
        query: { q: query.value },
        onRequest({ request, options } : any) {
          options.headers = {
            ...options.headers,
            Site: '1'
          }
        },  
      },
    );
    if (!data.items || (data.items as any).total === 0) {
      searchResult.value = [];
      return;
    }
    searchResult.value = data.items;
    count.value = data.total
}

const handleSearch = () => {
    if (query.value && query.value.trim()) {
        query.value = query.value
        router.push({ query: { query: query.value } })
    }
}

const _fetchDebounce = _Debounce(async () => {
    fetchQuery();
  }, 200)

  function changeSearch() {
    _fetchDebounce();
  }

watch(() => route.query, (value) => {
    query.value = value.query as string
    init()
    fetchQuery()
}, { immediate: true })

onMounted(()=>{
    const analytics = useAnalytics()
    watch(() => route.query.query, (value) => {
        analytics.addUseSearchTools(value as string)
    })
})

</script>
<template>
    <wrap>
        <Row class="my-8">
            <MainCol class="border-r p-2">
                <a class="uppercase font-bold text-2xl"> TÌM KIẾM</a>
                <div class="flex items-center w-full pt-4">
                    <input type="text" v-model="query" ref="searchInput" placeholder="Tìm kiếm bài viết"
                        class="inline-block w-full transition-all duration-300 ease-in-out border-y border-l rounded-s-md p-3 border-[#d9d9d9] hover:border-[#6197c9] outline-none focus:shadow-[0_0_0_2px_rgba(30,155,217,0.08)] focus:border-[#6197c9]"
                        @keyup.enter="handleSearch" @change="changeSearch"/>
                    <span class="text-white bg-[#3c7abc] border-y border-r px-6 py-3 rounded-e-md inline-block border-[#3c7abc] ">
                        <Icon name="gg:search" size="24" @click="handleSearch" />
                    </span>
                </div>
                <div class="mt-5">
                    <a class="font-bold ml-4"> {{ count }}</a> <a class="p-2 text-sm text-gray-500">kết quả phù hợp </a>
                </div>
                <!-- <div class="flex pt-5">
                <div class="w-1/3 m-2">
                    <label for="time" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Thời
                        Gian</label>
                    <select id="time"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Tất Cả</option>
                        <option value="US">1 ngày qua</option>
                        <option value="CA">1 tuần qua</option>
                        <option value="FR">1 tháng qua</option>
                        <option value="DE">1 năm qua</option>
                    </select>
                </div>
                <div class="w-1/3 m-2">
                    <label for="categories" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Chuyên
                        Mục</label>
                    <select id="category"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Tất Cả</option>
                        <option v-for="category in tree" :key="category.id" :value="category.id">
                            {{ category.title }}
                        </option>
                    </select>
                </div>
                <div class="w-1/3 m-2">
                    <label for="articleLayouts" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Dạng
                        Bài</label>
                    <select id="articleLayouts"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Tất Cả</option>
                        <option v-for="(articleLayout, index) in articleLayouts" :key="index" :value="articleLayout.name">
                            {{ articleLayout.label }}
                        </option>
                    </select>
                </div>
            </div> -->
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <div>
                    <div class=" rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel">
                        <div class="flex-1 px-2 mx-auto overflow-y-auto mt-4">
                            <div v-if="searchResult.length > 0">
                                <div v-for="(item, index) in searchResult" :key="index">
                                    <div class="mb-4 border-b border-gray-200 dark:border-gray-700 p-4">
                                        <Article mode="event" :title="item?.title" :thumb="item.thumbnail" :slug="'/' + item.category?.code + '/' + item.code" />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p class="text-red-500 text-cl text-center">Không Tìm Thấy Kết Quả</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="searchResult.length">
                        <Pagination :payload="pagination" class="mt-6" />
                    </div>
                </div>
            </MainCol>
            <RightCol class="pl-6">
                <div class="h-96 mt-4 grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1">
                    ADS<br />
                    HERE
                </div>
                <div class="mt-5">
                    <a class="text-xl text-black-500 hover:text-pink border-b-2 border-pink ml-5"> Xem Nhiều</a>
                    <div v-for="(item, index) in searchResult" :key="index">
                        <div class="mb-4 border-b border-gray-200 dark:border-gray-700 p-2 ml-5 pt-4">
                            <Article mode="text" :title="item?.title" :slug="'/' + item.category?.code + '/' + item.code" />
                        </div>
                    </div>
                </div>
            </RightCol>
        </Row>
    </wrap>
</template>
<style scoped lang="scss">
.underline-light {
    text-decoration: underline;
    color: #888;
    /* Màu xám nhạt cho gạch chân */
}
</style>
