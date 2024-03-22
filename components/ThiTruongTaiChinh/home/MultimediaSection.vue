<template>
    <section class="bg-[#212121] p-4 rounded-lg mb-4 mx-3">
        <header class="flex justify-between items-center mb-3">
            <h2 class="text-xl xl:text-7 font-semibold font-playfair text-[#ff0018]"><nuxt-link :to="`/${data[0]?.category?.code}`"><Icon
                        class=" mr-2 " name="material-symbols:add-photo-alternate-outline"</Icon>{{ title }}</nuxt-link></h2>
            <div class="zone__title--trigger trigger-button">
                <nuxt-link to="#" class="btn btn-sm btn-link py-1 px-2"><i class="fal fa-angle-down"></i></nuxt-link>
            </div>
            <div class="uppercase lg:flex gap-3 overflow-hidden text-[#ff0018] hidden">
                <nuxt-link to="#">ảnh</nuxt-link>
                <nuxt-link to="#">Video</nuxt-link>
                <nuxt-link to="#">clip</nuxt-link>
                <nuxt-link to="#">Infographic</nuxt-link>
                <nuxt-link to="#">eMagazine</nuxt-link>
            </div>
        </header>
        <div class="">
            <div class="grid grid-cols-12 gap-4 text-white">
                <div class="lg:col-span-8 col-span-12">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <article :class="[index === 0 ? 'sm:col-span-2 col-span-1' : 'col-span-1 ', ' group']"
                            v-for="(i, index) in firstData">
                            <figure class="mb-4 max-h-[235px] overflow-hidden rounded-lg"
                                :class="{ 'sm:max-h-[380px]': index === 0 }"><a to=""><img alt=""
                                        class="w-full h-full object-cover" :src="i?.thumbnail" style=""></a></figure>
                            <header class="">
                                <h3
                                    class="font-playfair group-hover:text-[#ff0018] font-bold text-[1rem] sm:text-[1.1rem] leading-[1.4]">
                                    <nuxt-link :to="`/${i?.category?.code}/${i?.code}`">{{ i?.title }}</nuxt-link></h3>
                                <!-- <div class="opacity-50 flex justify-end text-3 my-2"><time>{{dayjs(i.createdOn).locale('vi').format('DD/MM/YYYY') }}</time></div> -->
                                <div class="line-clamp-4" :class="{ 'hidden': index !== 0 }"><span v-html="i?.intro"></span>
                                </div>
                            </header>
                        </article>
                    </div>
                </div>
                <div class="lg:col-span-4 col-span-12 ">
                    <div class="grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4">
                        <article v-for="(item, index) in listData" :class="[index === 0 ? 'sm:col-span-2 col-span-1' : 'col-span-1 ', 'lg:col-span-1 group']">
                                <figure class="mb-4 max-h-[235px]  overflow-hidden rounded-lg" :class="{ 'max-h-[350px] lg:max-h-[235px]' : index === 0 }">
                                    <nuxt-link
                                        :to="`/${item?.category?.code}/${item?.code}`"><img alt="" class="w-full h-full object-cover"
                                            :src="item?.thumbnail" style=""></nuxt-link></figure>
                                <header>
                                    <h3
                                        class="font-playfair group-hover:text-[#ff0018] font-bold text-[1rem] sm:text-[1.1rem] leading-[1.4]">
                                        <nuxt-link :to="`/${item?.category?.code}/${item?.code}`">{{ item.title }}</nuxt-link></h3>
                                    <!-- <div class="opacity-50 flex justify-end text-3 mt-2"><time>{{dayjs(item.createdOn).locale('vi').format('DD/MM/YYYY') }}</time></div> -->
                                </header>
                            </article>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
const props = defineProps(['categoryId', 'title'])
const firstData = ref([])
const listData = ref([])
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const data = ref([])
const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(69, 6)
    if (data.value.length > 0) {
        firstData.value = data.value.slice(1, 4)
        listData.value = data.value.slice(3, 8);
    }
}
await fetchData()



</script>