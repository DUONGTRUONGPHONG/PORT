<template>
    <section class=" mb-8 px-3">
        <div class="" v-if="data?.length > 0">
            <div class="grid lg:grid-cols-2 gap-4">
                <article>
                    <div class="group">
                        <figure class="mb-2"><nuxt-link
                                class="block relative w-full bg-[#eeeeee] pb-[56.25%] rounded-lg"
                                :to="`/${data[0]?.category?.code}/${data[0]?.code}`"><img :src="data[0]?.thumbnail"
                                    alt=""
                                    class="absolute object-cover w-full h-full transition-transform duration-[0.5s] ease-[ease-in-out] rounded-[inherit] inset-0"></nuxt-link>
                        </figure>
                        <header class="">
                            <h3
                                class="font-playfair group-hover:text-[#ff0018] font-bold text-[1.3rem] md:text-[1.65rem] leading-[1.4] overflow-hidden text-ellipsis mb-0">
                                <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`"
                                    v-html="data[0]?.title"></nuxt-link>
                            </h3>
                            <div class="mt-2 line-clamp-5 text-[17px] font-400"><span v-html="data[0]?.intro"></span>
                            </div>
                        </header>
                    </div>
                    <!-- <footer class="mt-6 relative">
                        <div class="bg-[#bdbdbd] absolute w-5 h-[1px] top-0 left-0"></div>
                        <nuxt-link :to="`/${i?.category?.code}/${i?.code}`"
                            class="text-[1rem] sm:text-[1.1rem] font-playfair hover:text-[#ff0018] pt-6 font-semibold block mb-2">F0
                            điều trị tại nhà nên làm những điều sau để
                            tránh lây cho gia đình?</nuxt-link>
                        <nuxt-link :to="`/${i?.category?.code}/${i?.code}`"
                            class="text-[1rem] sm:text-[1.1rem] font-playfair hover:text-[#ff0018] font-semibold block">Tái
                            chế iPhone thu về nhiều vàng hơn khai thác
                            quặng</nuxt-link>
                    </footer> -->
                </article>
                <div class="grid sm:grid-cols-2 gap-4">
                    <article class="group" v-for="(i, index) in listData">
                        <figure class="mb-2"><nuxt-link
                                class="block relative w-full bg-[#eeeeee] pb-[56.25%] rounded-lg"
                                :to="`/${i?.category?.code}/${i?.code}`"><img :src="i?.thumbnail" alt=""
                                    class="absolute object-cover w-full h-full transition-transform duration-[0.5s] ease-[ease-in-out] rounded-[inherit] inset-0"></nuxt-link>
                        </figure>
                        <header class="">
                            <h3
                                class="font-playfair font-bold text-[1.1rem] lg:text-[1.125rem] xl:text-[1.25rem] leading-[1.4] overflow-hidden text-ellipsis mb-0 group-hover:text-[#ff0018]">
                                <nuxt-link :to="`/${i?.category?.code}/${i?.code}`">{{ i?.title }}</nuxt-link>
                            </h3>
                            <!-- <div class="mt-2 line-clamp-4 text-[17px] font-300"><span v-html="i?.intro"></span></div> -->
                        </header>
                    </article>
                    <div class="justify-center flex items-center">
                        <iframe
                            src="https://ssltsw.investing.com?lang=52&amp;forex=1,2,3,5,7,9,10,52&amp;commodities=8830,8836,8831,8849,8833,8862,8832&amp;indices=175,166,172,27,179,170,174&amp;stocks=345,346,347,348,349,350,352&amp;tabs=1,2,3,4"
                            width="350" height="490" style="border: none; max-width: 100% !important;"
                            id="investor-iframe"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps(['categoryId'])
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article';
const store = {
    article: useArticleStoreV2(),
}
const data = ref([])
const listData = ref([])
// const res = await $fetch(`https://portal-api-stable.vpress.vn/api-v1/cms/category-article-layout/page:${props.categoryId}-layout:1`, {
//         headers: {
//             Site: '1'
//         }
//     })
//     const { items } = res
//     data.value = items.map((record) => ({...record.articlePublishing, category: record.category}))
//     listData.value = data.value.slice(1, 4);

const fetchData = async () => {
    data.value = await store.article.fetchByCategoryIdWithPaging(props.categoryId, 3)
    listData.value = data.value.slice(1, 3);
}
await fetchData()
</script>