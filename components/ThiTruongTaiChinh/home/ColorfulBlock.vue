<template>
    <section class="xl:mb-6 mb-8 text-[white] px-4 py-3 rounded-lg bg-gradient-radial mx-3">
        <header class="relative flex-row justify-center items-center flex-wrap flex relative mb-3">
            <Icon class=" mr-2" name="ic:outline-remove-red-eye"></Icon>
            <h2 class="text-xl leading-none relative font-semibold font-playfair"><nuxt-link :to="`/${data[0]?.category?.code}`">{{ title }}</nuxt-link></h2>
        </header>
        <div class="">
            <article class="flex gap-3 flex-wrap justify-between" v-for="item in data">
                <figure class="w-10 flex justify-center items-center">
                    <nuxt-link :to="`/${item?.category?.code}/${i?.code}`" class="overflow-hidden pb-[100%] rounded-full block relative w-full bg-[#eeeeee]" to="#"><img :src="item?.thumbnail" alt="" class="object-cover border-2 border-solid border-[white] absolute object-cover w-full h-full transition-transform duration-[0.5s] ease-[ease-in-out] rounded-[inherit] inset-0 absolute object-cover w-full h-full transition-transform duration-[0.5s] ease-[ease-in-out] rounded-[inherit] inset-0"></nuxt-link>
                </figure>
                <header class=" flex-1">
                    <h3 class="">{{ item?.title }}</h3>
                    <div class="opacity-60">{{ dayjs(item.createdOn).locale('en').format('MMMM Do, YYYY') }}</div>
                </header>
                <div class="">
                    <!-- <h3 class="story__title"><a to="#"></a></h3> -->
                    <div class=" opacity-60 !text-[14px]"><span v-html="item?.intro"></span></div>
                </div>
            </article>
        </div>
    </section>
</template>
<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/en'
const props = defineProps(['categoryId','title'])
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const data= ref([])
const fetchData =async()=>{
        data.value=await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryId,4)
}
await fetchData()
</script>