<template>
    <div class="col-span-1 " v-if="data?.length > 0">
        <section class="mb-4 ">
            <header class="flex items-end mb-4">
                <h2 class="text-[1.8rem] font-600 leading-[1.3] font-playfair text-[#ff0018] block pr-3">
                    <nuxt-link to="">{{ category.title }}</nuxt-link>
                </h2>
                <div class="flex-1 w-full bg-[#ff0018] h-[1px] mb-[10px]"></div>
            </header>
            <div>
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div class=" gap-x-4" :class="[listData?.length > 0 ? 'col-span-1 ' : 'col-span-2']">
                        <article class="group mb-0 lg:mb-lg-0">
                            <figure class="rounded-lg max-h-[380px] mb-2 overflow-hidden" :class="[listData?.length > 0 ? 'xl:h-[170px]' : 'h-[350px]']">
                                <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`"><img alt="" class="w-full h-full object-cover" :src="data[0]?.thumbnail"></nuxt-link>
                            </figure>
                            <header>
                                <h3 class="text-[1.25rem] font-bold leading-[1.2] font-playfair group-hover:text-[#ff0018]"><nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`" v-html="data[0]?.title"></nuxt-link></h3>
                                <div class="text-[13px] opacity-50 my-2"><time datetime="2011-01-12">{{dayjs(data[0]?.createdOn).format('MMMM DD,YYYY') }}</time>
                                </div>
                            </header>
                        </article>
                    </div>
                    <div class="gap-x-4" v-if="listData?.length > 0">
                        <article class="group flex gap-3 pb-4 mb-4 last:pb-0 last:border-b-0 border-b border-[#eee]" v-for="(item, index) in listData">
                            <figure class="rounded-lg overflow-hidden sm:w-[150px] sm:h-20 w-30 h-[60px]" :class="{ 'hidden': index !== 0 }">
                                <nuxt-link :to="`/${item?.category?.code}/${item?.code}`"><img alt="" :src="item?.thumbnail" class="w-full h-full object-cover"></nuxt-link>
                            </figure>
                            <header class="flex-1">
                                <h3 class="text-[1.1rem] leading-[1.3] font-playfair group-hover:text-[#ff0018] "><nuxt-link :to="`/${item?.category?.code}/${item?.code}`" v-html="item?.title"></nuxt-link></h3>
                            </header>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const props = defineProps(['category'])
import { ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useArticleStoreV2 } from '~/stores/v2/article'
const articleStoreV2 = useArticleStoreV2()
const listData = ref([])
const data = ref([])

const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(props.category?.id, 4)
    if (data.value?.length > 0) {
        listData.value = data.value.slice(1, 4);
    }
}
await fetchData()
</script>