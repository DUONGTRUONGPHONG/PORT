<template>
    <section class="mb-8 mx-3">
        <header
            class="mb-3">
            <h2 class="text-xl xl:text-7 font-semibold font-playfair text-[#ff0018] flex items-end">
                <nuxt-link class="pr-2" :to="`/${data[0]?.category?.code}`">{{ title }}</nuxt-link>
                <div class="flex-1 mb-3 h-[2px] w-full bg-[#ff0018] inset-x-0"></div>
            </h2>
        </header>
        <article class=" gap-4 mb-4 flex md:flex-row flex-col group">
            <figure class=" w-full md:w-1/2 max-h-[300px] overflow-hidden rounded-lg">
                <nuxt-link :to="`/${i?.category?.code}/${i?.code}`">
                    <img class="object-cover w-full" :src="data[0]?.thumbnail" style="">
                </nuxt-link>
            </figure>
            <header class=" flex-1 ">
                <h3
                    class="font-playfair group-hover:text-[#ff0018] font-bold text-[1.25rem] md:text-[1.35rem] leading-[1.4]">
                    <nuxt-link :to="`/${i?.category?.code}/${i?.code}`">{{ data[0]?.title }}</nuxt-link>
                </h3>
                <div class="text-[1rem] sm:text-[1.1rem] line-clamp-4 mt-1"><span v-html="data[0]?.intro"></span>
                </div>
            </header>
        </article>
        <div class="grid lg:grid-cols-2 xl:grid-cols-1 grid-cols-1 gap-3">
            <article class="flex gap-3  group" v-for="item in listData">
            <figure class="w-[150px] h-20"><nuxt-link :to="`/${i?.category?.code}/${i?.code}`"><img alt=""
                        class="object-cover h-full w-full rounded-lg" :src="item?.thumbnail" style=""></nuxt-link>
            </figure>
            <header class="flex-1">
                <h3 class="font-playfair group-hover:text-[#ff0018]  text-[1rem] sm:text-[1.1rem] leading-[1.4]">
                    <nuxt-link :to="`/${i?.category?.code}/${i?.code}`">{{ item.title }}</nuxt-link>
                </h3>
            </header>
        </article>
        </div>
    </section>
</template>

<script setup>
const props = defineProps(['categoryId', 'title'])
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const data = ref([])
const listData = ref([])
const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryId, 6)
    if (data.value.length > 0) {
        listData.value = data.value.slice(1, 5);
    }
}
await fetchData()



</script>