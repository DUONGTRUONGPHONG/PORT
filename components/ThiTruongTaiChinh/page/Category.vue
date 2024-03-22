<template>
    <main class="my-3">
        <div class="mx-auto xl:max-w-[1320px] px-3">
            <div class="mb-6">
                <!-- <ol class="gap-3 flex items-center">
                    <li class="text-5 font-400">
                        <h1><a href="#">Thời sự</a></h1>
                    </li>
                    <li class="inline-block text-5">/</li>
                    <li class="text-5" aria-current="page">
                        <h2><a class="bg-[#ff0018] inline-block text-white font-bold py-1 px-3" href="">Library</a></h2>
                    </li>
                </ol> -->
                <BreadcrumbArticleTTTC :category="category" />
            </div>
            <section class="mb-6">
                <div class="">
                    <div class="grid grid-cols-1 2xl:grid-cols-3 gap-4">
                        <HighlightCategory :categoryId="116"></HighlightCategory>
                        <div class="col-span-1  ">
                            <section class="p-[0.75rem_1rem_0.5rem] bg-[#eee] mb-1">
                                <h2 class="text-5 font-semibold leading-[1.3] font-playfair text-center mb-1">
                                    <a href="#">TIÊU ĐIỂM TÀI CHÍNH</a>
                                </h2>
                                <ArticleCore :categoryId="69"></ArticleCore>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="col-span-1 lg:col-span-2 px-3">
                    <ArticleRow :categoryParentId="categoryParent?.id"></ArticleRow>
                </div>
                <div class="col-span-1  mb-3 px-3">
                    <section class="mb-1">
                        <header>
                            <h2 class="text-[1.8rem] font-500 leading-[1.3] font-playfair text-center mb-4 text-[#ff0018]"><a class="flex justify-center items-center" href=""><Icon name="ic:outline-remove-red-eye" class="fas fa-eye mr-3"></Icon>Tin đọc nhiều</a></h2>
                        </header>
                        <div class="text-center">
                            <article class="group  pb-4 mb-4 border-b border-[#eee]">
                                <header class="relative">
                                    <div class="font-playfair italic font-400 text-3 text-center mb-2 uppercase text-[#ff0018]"><a href="" class="story__cate">Chính sách Tài chính</a></div>
                                    <h3 class="pl-10 text-[18px] font-300 leading-[1.3] font-playfair group-hover:text-[#ff0018]"><a href="">Hé lộ “ông chủ” phía sau dự án Khu công nghiệp Phúc Sơn - doanh nghiệp vừa bị Thanh tra Chính phủ điểm tên</a></h3>
                                    <div class="font-playfair text-5xl leading-[1em] font-[bold] text-[black] absolute -translate-y-2/4 z-[1] mt-0 left-0 top-2/4">1</div>
                                </header>
                            </article>
                        </div>
                    </section>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PostsCategory :category="item" v-for="item in listChildCategories"></PostsCategory>
            </div>
        </div>
    </main>
</template>  

<script setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import Glide from '@glidejs/glide';
import { useCategoryStoreV2 } from '~/stores/v2/category.ts'
const categoryStoreV2 = useCategoryStoreV2()

const listChildCategories = ref([])
const categoryParent = ref(null)
const route = useRoute()

// definePageMeta({
//     layout: 'category'
// })

const fetchData = () => {
    categoryParent.value = categoryStoreV2.v2_categories.find((item) => item?.code === route.params.category)
    if (categoryParent.value) {
        listChildCategories.value =  categoryStoreV2.findChildren({
            id: categoryParent.value?.id
        })
    }
}
fetchData()
const category = computed(() => {
    return categoryStoreV2.findById(categoryParent.value?.id)
})
onMounted(() => {
    new Glide('.glide', {
        type: 'carousel',
        perView: 1,
        autoplay: 3000
    }).mount();
});
</script>

<style lang='scss'>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
</style>