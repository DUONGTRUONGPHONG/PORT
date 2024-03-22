<script setup lang="ts">
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';

const props = defineProps<{ category?: any, payload?: any[], subtree?: any , pagination?:any}>();
const categoryStore = useCategoryStore()
const { tree } = storeToRefs(categoryStore)
const articleStore = useArticleStore()


const breadcrumb = ref<any[]>([])


const handleBreadcrumb = (categoryId: number) => {
    const result = categoryStore.findById(tree.value, categoryId)
    breadcrumb.value.push(result)
}
handleBreadcrumb(props.category?.categoryId)


// lay danh sach podcast
const listArticles = await articleStore.fetchByCategoryId(149)

</script>
<template>
    <HeaderMedia type="PodCast"></HeaderMedia>
    <Wrap>
        <!-- <div class="grid w-full gap-4 px-4 mx-auto xs:px-6 2xl:px-0 top_detail clearfix"> -->
        <Row>
            <div class="w-full bg-[#fafafa] hover:bg-[#fff6f6] hover:border-[#f00] h-80 rounded-3xl border-double border-1 border-gray-300">
               <div class="grid grid-cols-10 w-full">
                    <div class="col-span-3 flex justify-center items-center h-80 mx-8">
                        <div class="h-60 w-full rounded-tl-3xl rounded-br-3xl border-double border-1 border-red-500">
                            <img :src="listArticles[0]?.thumbnail" alt="" class="h-60 w-full rounded-tl-3xl rounded-br-3xl" >
                        </div>
                    </div>
                    <div class="col-span-7 relative">
                        <div class="col-span-12 w-full grid grid-cols-12 mt-8 mb-4">
                            <div class="col-span-11">
                                <h1 class="text-3xl text-[#f00] font-bold font-['SFD']">{{ listArticles[0]?.title }}</h1>
                                <CustomText :text="utils.dateFormat(listArticles[0]?.createdOn)"
                                        class="xs:mt-0.5 xs:text-sm text-sm" tag="time" />
                            </div>
                        </div>
                        <div class="col-span-12 w-full mb-4">
                            <div v-html="listArticles[0]?.intro" class="text-left text-xl text-[#000] font-['SFD']"></div>
                        </div>
                        <div class="col-span-12 w-full grid grid-cols-6 absolute bottom-10 left-0">
                            <div class="col-span-6 flex justify-end px-10">
                                <NuxtLink :to="utils.generateSlugWithId('/v', listArticles[0]?.slug, listArticles[0]?.id) || '#!'"
                                :title="listArticles[0]?.title" class="item-play inited cursor-pointer">
                                    <span class="icon">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0131 0.5C5.38869 0.5 0 5.88331 0 12.5C0 19.1167 5.38869 24.5 12.0131 24.5C18.6376 24.5 24.0263 19.1167 24.0263 12.5C24.0263 5.88331 18.6376 0.5 12.0131 0.5ZM16.7889 12.9204L9.78122 17.4204C9.6991 17.4736 9.60426 17.5 9.51041 17.5C9.42829 17.5 9.34518 17.4795 9.2709 17.439C9.10957 17.3511 9.00985 17.1831 9.00985 17V8C9.00985 7.81691 9.10957 7.64891 9.2709 7.56102C9.42927 7.47411 9.62773 7.47945 9.78122 7.57958L16.7889 12.0796C16.9316 12.1714 17.0186 12.3301 17.0186 12.5C17.0186 12.6699 16.9316 12.8286 16.7889 12.9204Z" fill="#FF0000"></path>
                                        </svg>
                                    </span>
                                    Nghe tập này
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
               </div> 
            </div>
        </Row>

        <div class="w-full">
            <div class="flex items-center mt-5 mb-5">
                <ul class="bg-red-500 text-white text-sm font-semibold hover:bg-red-400 font-medium inline-block rounded-tl-lg rounded-br-lg">
                    <li class="inline-block uppercase rounded-l-lg border-radius border-red-500 border-r-0 px-2 py-1 text-center block transition-transform duration-300 transform hover:scale-105">
                        Podcast Hôm nay
                    </li>
                </ul>
                <div class="border border-slate-7 flex-grow ml-4"></div>
            </div>

            <div class="grid grid-cols-12 w-full gap-2">
                <div class="md:col-span-6 lg:col-span-4 col-span-12" v-for="(item, index) in listArticles.slice(1) " :key="index" >
                    <Article  mode="podcast" image-size="md" text-size="lg"
                        :createdOn="item?.createdOn"
                        :title="item?.title" 
                        :slug="'/' + item.category?.code + '/' + item.code"
                        :thumb="item?.thumbnail"  />
                </div>
            </div>
            <Pagination v-if="listArticles.length > 0" :payload="pagination" class="mt-6" />
        </div>
    </Wrap>
</template>
<style lang="scss" scoped>
.item-play {
   display: flex;
   align-items: center;
   border: 2px solid #f00;
   box-sizing: border-box;
   border-radius: 92.8391px;
   padding: 8px 28px;
   font-size: 18px;
   line-height: 22px;
   color: #f00;
}
</style>