<template>
    <header id="site-header">
        <HeaderTopBar />
        <div class="py-2"
            :class="{ 'max-md:fixed max-md:top-0 max-md:left-0 max-md:right-0 max-md:z-10 max-md:bg-white': isFixed }">
            <div class="mx-auto px-3 xl:max-w-[1320px] py-0 md:py-4 flex justify-center">
                <div class="flex mx-5 items-center">
                    <div class="cursor-pointer w-1/3 block md:hidden" @click="showModal">
                        <Icon name="fa6-solid:bars" />
                    </div>
                    <div class="flex justify-center w-1/3 md:w-full relative">
                        <nuxt-link to="/" title="">
                            <h1 class="logo">
                                <img src="/images/logotttcfooter.png" alt="" class="max-h-[70px]" draggable="false" />
                            </h1>
                        </nuxt-link>
                        <div class="w-[300px] absolute h-[2px] bg-[#ff0018] top-[107%] hidden md:block"></div>
                    </div>
                    <div class="cursor-pointer w-1/3 text-end  block md:hidden">
                        <Icon name="fa6-solid:magnifying-glass" class="font-300" />
                    </div>
                </div>
            </div>
        </div>
        <div :class="{ 'fixed top-0 left-0 right-0 z-10 bg-white': isFixed }"
            class=" border-b-[3px] border-[#e0e0e0] bg-[rgb(245_245_245_/80%)] hidden md:block">
            <div class="mx-auto px-3 xl:max-w-[1320px]">
                <ul class="flex min-h-10 items-center">
                    <li class="text-[#ff0018] text-[14px] !mr-a py-3 px-2 hover:bg-[#eee] cursor-pointer"
                        @click="showModal">
                        <a class=" menuDesktop" title="Trang chủ" id="">
                            <Icon name="fa-solid:bars" />
                        </a>
                    </li>
                    <li class=" relative group py-3 px-2 text-[#ff0018] text-[14px] font-700 uppercase hover:bg-[#eee]"
                        v-for="item in listParent"
                        :class="{ '!bg-[rgba(0,0,0,0.2)]': listFocusMenu.includes(item.code) }">
                        <nuxt-link class="cursor-pointer" :to="item.code === 'trang-chu' ? '/' : `/${item.code}`"
                            :title="item.title">{{ item.title }}</nuxt-link>
                        <ul
                            class="z-2 absolute top-full border-white border-t-[2px] bg-[#eee] left-0 w-[260px] hidden group-hover:inline-block">
                            <li class="font-300 text-[15px]"
                                :class="{ 'bg-[rgba(0,0,0,0.2)]': listFocusMenu.includes(itemChild.code) }"
                                v-for="itemChild in categoryStoreV2.findChildren({ id: item.id })">
                                <nuxt-link :to="`/${itemChild.code}`"
                                    class="hover:underline py-3 border-b-[2px] border-white px-2 block"
                                    :title="itemChild.title">{{ itemChild.title }}</nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li class="py-3 px-2 text-[#ff0018] text-[14px] font-700 uppercase hover:bg-[#eee] ml-a !block">
                        <nuxt-link class="cursor-pointer !block" :to="'/'" title="Ấn phẩm">
                            <img src="/images/logo-ktdt.png" alt="" class="max-h-5 object-cover" />
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <teleport to="body">
            <div class="fixed top-0 left-0 right-0 bottom-0 z-20 " :class="{ 'hidden': !isShow }" id="nav-extend">
                <div class="w-[300px] absolute top-0 bottom-0 left-0 bg-white overflow-auto z-3">
                    <h2 class="flex justify-between items-center mx-3 my-1">
                        <nuxt-link to="#">
                            <img src="/images/logotttcfooter.png" alt="" class="max-w-200px object-cover">
                        </nuxt-link>
                        <nuxt-link to="#" class="btn btn-default" id="menuDesktopRemove">
                            <i class="fas fa-times"></i>
                        </nuxt-link>
                    </h2>
                    <ul class="!flex-col border-t border-[#eee] px-3">
                        <li class=" py-2 relative">
                            <div :class="{ 'outline-[3px] outline outline-[rgba(255,_0,_24,_0.25)] ': focusInput }"
                                class=" overflow-hidden ">
                                <input @focus="focusInput = true" @focusout="focusInput = false" type="text"
                                    class="form-control  p-2 text-3 w-full font-300 outline-none border border-gray"
                                    placeholder="Từ khóa tìm kiếm">
                                <nuxt-link to="#">
                                    <Icon
                                        class="absolute top-1/2 transform -translate-y-1/2 text-red-500 right-3 text-3xl"
                                        name="material-symbols-light:search" />
                                </nuxt-link>
                            </div>
                        </li>
                        <li @click="showModal" class=" hover:text-[#ff0018]  uppercase  hover:bg-[#f5f5f5]"
                            v-for="item in listParent">
                            <nuxt-link class="font-bold text-[16px] py-3 border-b-[2px] border-white px-2 block"
                                :class="{ '!bg-[rgba(0,0,0,0.2)]': listFocusMenu.includes(item.code) }"
                                :to="item.code === 'trang-chu' ? '/' : `/${item.code}`" :title="item.title">{{
                item.title }}</nuxt-link>
                            <ul>
                                <li class="font-300 text-[15px]"
                                    v-for="itemChild in categoryStoreV2.findChildren({ id: item.id })"
                                    :class="{ '!bg-[rgba(0,0,0,0.2)]': listFocusMenu.includes(itemChild.code) }">
                                    <nuxt-link :to="`/${itemChild.code}`"
                                        class="hover:underline py-3 border-b-[2px] border-white px-2 block"
                                        :title="itemChild.title">{{ itemChild.title }}</nuxt-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="absolute bg-[rgba(0,0,0,0.4)] z-1 cursor-pointer inset-0" @click="showModal"> </div>
            </div>
        </teleport>
        <ClientOnly>
            <TradingWidget />
        </ClientOnly>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useCategoryStoreV2 } from '~/stores/v2/category.ts'
const categoryStoreV2 = useCategoryStoreV2()
const route = useRoute()
const isFixed = ref(false);
const isShow = ref(false);
const focusInput = ref(false);
let listParent = []
const handleScroll = () => {
    if (window.scrollY > 200) {
        isFixed.value = true;
    } else {
        isFixed.value = false;
    }
};
const fetchMenu = async () => {
    await categoryStoreV2.fetchCategories();
    listParent = categoryStoreV2.v2_categories.filter(item => item.parentId === null).reverse();
}

await fetchMenu()
const showModal = () => {
    if (!isShow.value) {
        isShow.value = true
    } else {
        isShow.value = false
    }
    document.body.classList.toggle('overflow-hidden')
}
const listFocusMenu = computed(() => {
    const category = categoryStoreV2.findByCode(route.params.category || 'trang-chu')
    return categoryStoreV2.findParents(category).map((item) => item.code) || []
});
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});


</script>
