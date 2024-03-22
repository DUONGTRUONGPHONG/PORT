<template>
    <section class="mx-3 bg-[#EFF3FF] relative mb-8 p-4 rounded-lg  before:content-[''] before:block before:absolute before:top-[-0.5rem] before:bottom-[-0.5rem] before:bg-[#E5EAFC] before:z-[-1] before:rounded-[inherit] before:inset-x-2">
        <header class=" justify-center items-center flex mb-3">
            <h2 class="text-xl xl:text-7 font-semibold font-playfair text-[#ff0018]"><nuxt-link :to="`/${data[0]?.category?.code}`">{{ title }}</nuxt-link></h2>
        </header>
        <div class="flex flex-wrap lg:flex-row flex-col gap-4">
                <div class="w-full xl:w-8/12 min-w-[300px]" :class="{'flex-1':imgFull}">
                    <article class="group flex gap-4 md:flex-row flex-col" :class="{'!flex-col':imgFull}">
                        <figure class="order-1 md:order-2 h-[280px] w-full" :class="{ '!w-full !order-1': imgFull }"><nuxt-link class="" :to="`${data[0]?.category?.code}/${data[0]?.code}`"><img alt=""
                                    class="object-cover rounded-lg h-full w-full" :src="data[0]?.thumbnail" style=""></nuxt-link></figure>
                        <header class=" md:order-1 order-2">
                            <h3 class="font-playfair group-hover:text-[#ff0018] font-bold text-[1.25rem] md:text-[1.35rem] leading-[1.4]"><a :to="`${data[0]?.category?.code}/${data[0]?.code}`">{{ data[0]?.title }}</a></h3>
                            <div class="text-[15px] font-400 line-clamp-4 mt-1"><span v-html="data[0]?.intro"></span></div>
                        </header>
                    </article>
                    <!-- <footer class="mt-6 relative">
                            <div class="bg-[#bdbdbd] absolute w-5 h-[1px] top-0 left-0"></div>
                            <nuxt-link :to="`/${i?.category?.code}/${i?.code}`" class="text-[1rem] sm:text-[1.1rem] font-playfair hover:text-[#ff0018] pt-6 font-semibold block mb-2">F0 điều trị tại nhà nên làm những điều sau để
                                tránh lây cho gia đình?</nuxt-link>
                    </footer> -->
                </div>
                <div class="w-full lg:w-4/12 sm:min-w-[380px] flex-1">
                    <article class="flex gap-3 mb-4 last:mb-0 group" v-for="item in listData">
                        <figure class="w-[150px] h-20"><nuxt-link class="" :to="`/${item?.category?.code}/${item?.code}`"><img alt="" class="object-cover h-full w-full rounded-lg"
                            :src="item?.thumbnail" style=""></nuxt-link>
                        </figure>
                        <header class="flex-1">
                            <h3 class="font-playfair group-hover:text-[#ff0018] font-bold text-[1rem] sm:text-[1.1rem] leading-[1.4]"><nuxt-link :to="`/${item?.category?.code}/${item?.code}`">{{ item.title }}</nuxt-link></h3>
                        </header>
                    </article>
                </div>
            </div>
    </section>
</template>
<script setup>
const props = defineProps(['categoryId','title','imgFull'])
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const data= ref([])
const listData = ref([])
const fetchData =async()=>{
        data.value=await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryId,4)
        if ( data.value.length > 0) {
        listData.value = data.value.slice(1, 4);
    }
}
await fetchData()



</script>