<template>
    <div class="col-span-1 2xl:col-span-2 ">
        <article class="flex md:flex-row flex-col mb-0 lg:mb-4 group gap-4 border-b border-[#eee] pb-4">
            <figure class="overflow-hidden max-h-[350px] w-full md:w-3/5 order-1 md:order-2 rounded-lg">
                <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`"><img alt="" class="w-full h-full object-cover" :src="data[0]?.thumbnail"></nuxt-link>
            </figure>
            <header class="order-2 md:order-1 w-full md:w-2/5 ">
                <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`">
                    <h3 class="text-6 font-semibold leading-[1.3] font-playfair group-hover:text-[#ff0018]">
                        {{ data[0]?.title.replace(/<div>|<\/div>/g, '') }}
                    </h3>
                </nuxt-link>
                <div class="text-[13px] opacity-50 my-2">
                    <time datetime="2011-01-12">{{dayjs(data[0]?.createdOn).format('MMMM Do, YYYY')}}</time>
                </div>
                <div class="mt-2 text-justify" v-html="data[0]?.intro"></div>
            </header>
        </article>
        <hr class="my-4 lg:hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="col-span-1" v-for="item in listData">
                <ArticleCol :category="item"></ArticleCol>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['categoryId'])
import dayjs from 'dayjs';
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const data = ref([])
const listData = ref([])
const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryId, 4)
    if (data.value.length > 0) {
        listData.value = data.value.slice(1, 4);
    }
}
await fetchData()

</script>