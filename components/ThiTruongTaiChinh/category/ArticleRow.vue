
<script setup>
const props = defineProps(['categoryParentId'])
import { ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useArticleStoreV2 } from '~/stores/v2/article'
const articleStoreV2 = useArticleStoreV2()
const listArticle = shallowRef([])
const fetch = ref(4)
const fetchArticle = async () => {
    listArticle.value = await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryParentId,fetch.value)
}

await fetchArticle()
watch(fetch, (newX) => {
    fetchArticle()
})
// const listArticleResult = computed(() => {
//     if (!listArticle.value || !listArticle.value.length) return [];
//     return listArticle.value.map(item => {
//         return {
//             ...item,
//             intro: item.intro ? item.intro.replace(/<div>|<\/div>/g, '') : '',
//             title: item.title ? item.title.replace(/<div>|<\/div>/g, '') : ''
//         };
//     });
// });
</script>
<template>
    <section class="mb-6">
        <div class="">
            <article class="group flex gap-4 pb-4 last:border-b-0 border-b border-[#eee] mb-4" v-for="item, index in listArticle" :key="index">
                <figure class="md:w-[194px] max-h-[380px] w-[120px] md:h-[110px] h-[60px] rounded-lg overflow-hidden">
                    <nuxt-link :to="`/${item?.category?.code}/${item?.code}`">
                        <img alt="" class="w-full h-full object-cover" :src="item?.thumbnail">
                    </nuxt-link>
                </figure>
                <header class="flex-1">
                    <h3 class="md:text-5 text-[18px] font-300 leading-[1.3] font-playfair group-hover:text-[#ff0018]"><nuxt-link :to="`/${item.code}/${categoryParentId}`" v-html="item?.title"></nuxt-link></h3>
                    <div class="text-[13px] opacity-50 my-2"><time>{{ dayjs(createdOn).format('DD/MM/YYYY') }}</time></div>
                    <div class="mt-2 text-justify font-300 hidden md:block" >
                        <span class="!line-clamp-2  " v-html="item.intro"></span>
                        </div>
                </header>
            </article>
        </div>
        <footer class=" flex justify-center cursor-pointer" @click="fetch += 4">
            <p
                class="text-center text-4 text-[#ff0018] inline-block w-a py-[0.375rem] px-3 w-auto border border-[#ff0018] rounded hover:bg-[#ff0018] hover:text-white">
                Xem thêm
            </p>
        </footer>
    </section>
</template>