<template>
    <main class="my-3">
        <div class="mx-auto xl:max-w-[1320px] px-3">
            <div class="mb-6">
                <ol class="gap-3 flex items-center">
                    <li class="text-5 font-400">
                        <h1><a href="#">Thời sự</a></h1>
                    </li>
                    <li class="inline-block text-5">/</li>
                    <li class="text-5" aria-current="page">
                        <h2><a class="bg-[#ff0018] inline-block text-white font-bold py-1 px-3" href="">Library</a></h2>
                    </li>
                </ol>
            </div>
            <section class="mb-6">
                <div class="">
                    <div class="grid grid-cols-1 2xl:grid-cols-3 gap-4">
                        <div class="col-span-1 2xl:col-span-2 ">
                            <article class="flex md:flex-row flex-col mb-0 lg:mb-4 group gap-4 border-b border-[#eee] pb-4">
                                <figure class="overflow-hidden max-h-[350px] w-full md:w-3/5 order-1 md:order-2 rounded-lg">
                                    <a href="#">
                                        <img alt="" class="w-full h-full object-cover" src="/images/1600x900a.jpg">
                                    </a>
                                </figure>
                                <header class="order-2 md:order-1 w-full md:w-2/5 ">
                                    <h3 class="text-6 font-semibold leading-[1.3] font-playfair group-hover:text-[#ff0018]">
                                        <a href="#">Liên tiếp các chính sách về thuế, phí, lệ phí hỗ trợ người dân, doanh
                                            nghiệp</a>
                                    </h3>
                                    <div class="text-[13px] opacity-50 my-2">
                                        <time datetime="2011-01-12">dayjs(inputDateTime).format('MMMM Do, YYYY')</time>
                                    </div>
                                    <div class="mt-2 text-justify">Từ khi dịch bệnh COVID-19 bùng phát năm 2020 đến nay, để hỗ
                                        trợ doanh nghiệp, người dân, Bộ Tài chính đã chủ động, kịp thời đề xuất ban hành và
                                        ban hành theo thẩm quyền liên tiếp các chính sách hỗ trợ từ thuế, phí, lệ phí, tiền
                                        thuê đất</div>
                                </header>
                            </article>
                            <hr class="my-4 lg:hidden">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="col-span-1" v-for="i in 3">
                                    <ArticleCol></ArticleCol>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1  ">
                            <section class="p-[0.75rem_1rem_0.5rem] bg-[#eee] mb-1">
                                <h2 class="text-5 font-semibold leading-[1.3] font-playfair text-center mb-1">
                                    <a href="#">TIÊU ĐIỂM TÀI CHÍNH</a>
                                </h2>
                                <div class="">
                                    <div class="glide relative">
                                        <div class="glide__track" data-glide-el="track">
                                            <ul class="glide__slides">
                                                <li class="glide__slide" v-for="i in 3">
                                                    <ArticleCol :minWidth="'400px'"></ArticleCol>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="glide__bullets absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" data-glide-el="controls[nav]">
                                            <button class="glide__bullet w-2 h-2 inline-block rounded-lg cursor-pointer mx-1 transition duration-200 ease-out bg-[#eee]" :data-glide-dir="`=${index}`"
                                                v-for="(i, index) in 3"></button>
                                        </div>
                                    </div>
                                </div>
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
    categoryParent.value = categoryStoreV2.v2_categories.find((item) => item.code === route.params.category)
    if (categoryParent.value) {
        listChildCategories.value =  categoryStoreV2.findChildren({
            id: categoryParent.value?.id
        })
    }
}
fetchData()


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