<script setup lang="ts">
import { Article } from "@organisms/article";
import { storeToRefs } from "pinia";

const categoryStore = useCategoryStore();
const EventStore = useEventStore();
const TopictStore = useTopicStore();
const articleStore = useArticleStore()

const { tree } = storeToRefs(categoryStore);
const headingArticle = ref<any>(null);
const top6Articles = ref<any>(null);
const kinhte = ref<any>(null);
const bds = ref<any>(null);
const thethao = ref<any>(null);
const yte = ref<any>(null);
const thoisu = ref<any>(null);
const quocte = ref<any>(null);
const phapluat = ref<any>(null);
const multimedia = ref<any>(null);
const vanhoa = ref<any>(null);

// Get List Event New
const listEvent = ref<any>()
// async function fetchListEvent(){
//   listEvent.value = await EventStore.fetchPagingWithFiltering(1, 3, 30)
// }
// fetchListEvent()
// Get List Event End

// const {data} = await useAsyncData('homepage-articles', () =>
//   articleStore.fetchByMultiCategoryId([92, 98, 113, 120, 133, 137, 138, 143, 150])
// )

// const currentArticles = () => {
//   const articles = data.value;
//   headingArticle.value = articles[0];
//   top6Articles.value = articles.slice(1, 7);
//   kinhte.value = {
//     setKinhte: articles.filter((e: any) => e.categoryId === 98).slice(1, 11),
//     top1: articles.find((e: any) => e.categoryId === 98),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 98),
//   };
//   bds.value = {
//     setBds: articles.filter((e: any) => e.categoryId === 113).slice(1, 4),
//     top1: articles.find((e: any) => e.categoryId === 113),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 113),
//   };
//   thethao.value = {
//     setThethao: articles.filter((e: any) => e.categoryId === 137).slice(1, 10),
//     top1: articles.find((e: any) => e.categoryId === 137),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 137),
//   };
//   yte.value = {
//     setYte: articles.filter((e: any) => e.categoryId === 120).slice(0, 12),
//     // top1: articles.find((e: any) => e.categoryId === 120),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 120),
//   };
//   thoisu.value = {
//     setArticles: articles.filter((e: any) => e.categoryId === 92).slice(1, 2),
//     top1: articles.find((e: any) => e.categoryId === 92),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 92),
//   };
//   quocte.value = {
//     setArticles: articles.filter((e: any) => e.categoryId === 143).slice(1, 2),
//     top1: articles.find((e: any) => e.categoryId === 143),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 143),
//   };
//   phapluat.value = {
//     setArticles: articles.filter((e: any) => e.categoryId === 138).slice(1, 2),
//     top1: articles.find((e: any) => e.categoryId === 138),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 138),
//   };
//   multimedia.value = {
//     setArticles: articles.filter((e: any) => e.categoryId === 150).slice(1, 7),
//     top1: articles.find((e: any) => e.categoryId === 150),
//     category: categoryStore.findCategoryTreeRoot(tree.value as any, 150),
//   };
//   vanhoa.value = {
//     setArticles: articles.filter((e: any) => e.categoryId === 133).slice(0, 10),
//     // top1: articles.find((e: any) => e.categoryId === 133),
//     category: categoryStore.findCategoryTreeById(tree.value as any, 133),
//   };
// };
// currentArticles();

// topic
const listTopic = ref<any>()
// async function fetchListTopic(){
//   listTopic.value = await TopictStore.fetchPagingWithFiltering(1, 3, 30)
// }
// await fetchListTopic()
// topic end

useHead({
  title: "News",
});

const url = useRequestURL();
const hostname = url.hostname.split('.')[0];
console.log(hostname)

</script>
<template>
  <!-- Thi truong tai chinh -->
  <Wrap max-width="2xl" class="mt-8" v-if="hostname !== 'thitruongtaichinh'">
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="w-full lg:w-3/4">
        <HomeSection layout="1" page="41" noHeader featured />
      </div>
      <div class="w-full lg:w-1/4 bg-neutral-2 rounded grid place-items-center text-3xl uppercase font-bold">
        Quảng cáo
        <!-- <HomeSection layout="3" page="41" noHeader featured /> -->
      </div>
    </div>
    <div class="mt-12">
      <HomeSection layout="4" page="41" featured/>
    </div>
    <!-- <div class="flex gap-8 mt-12">
      <div class="w-full lg:w-3/4">
        <HomeSection layout="8" page="41" category="48" limit="6"/>
      </div>
      <div class="w-1/4 hidden lg:block">
        <h2 class="text-xl font-bold text-start uppercase xl:text-2xl text-primary-100">
          Tỷ giá ngoại tệ
        </h2>
        <Exchange />
      </div>
    </div> -->
   <div class="mt-12">
      <HomeSection layout="5" page="41" featured/>
    </div>
    <div class="mt-12">
      <!-- <HomeSection layout="2" page="41" noHeader featured /> -->
    </div>
   <div class="mt-12">
      <HomeSection layout="3" page="41" featured/>
    </div>
    <!-- <div class="mt-12">
      <HomeSection layout="9" page="41" category="9" />
    </div> -->
    <!-- <div class="mt-12">
      <HomeSection layout="11" page="41" category="78" limit="6" />
    </div> -->
  </Wrap>
  <HomeTTTC v-else />
  
  <!-- Heading box -->
  <!-- Event trending -->
  <!-- < ection class="zone zone--breaking mx-auto w-width-full xl:max-w-7xl m-2">
      <div class="flex items-center max-w-full mx-auto xs:px-6 lg:px-0 ">
          <h2 class="zone__title"><span>dòng sự kiện</span></h2>
          <div class="zone__content">
              <NuxtLink v-for="(event, index) in listEvent" :key="index" class="item"
                  :to="utils.generateSlugWithId('/event', event?.slug as string, event?.id as number)">
                      {{ event.title }}
              </NuxtLink>
          </div>
      </div>
  </> -->
  <!-- End Event trending -->
  <!-- <section
    class="md:grid md:grid-cols-2 md:gap-6 2xl:px-0 md:px-6 xl:grid-cols-[max-content_max-content_1fr] xl:px-8 mt-4 xl:max-w-7xl max-w-full mx-auto">
    <Article class="block xl:max-w-lg" :title="headingArticle?.title" :brief="headingArticle?.intro"
      :slug="utils.generateSlugWithId('/v', headingArticle?.slug, headingArticle?.id)"
      :thumb="headingArticle?.thumbnail" />
    <div class="grid gap-4 px-4 my-4 md:my-0 md:px-0 xs:px-6 xl:max-w-xs 2xl:max-w-md">
      <Article mode="text" v-for="(item, index) in top6Articles" :key="index" :title="item?.title"
        :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" />
    </div>
    <div class="grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1">
      ADS<br />
      HERE
    </div>
  </section> -->
  <!-- End heading box -->

  <!-- Tag trending đóng tạm chờ ver2 sửa lại đoạn này-->
  <!-- <section class="my-8">
    <div class="flex items-center max-w-full px-4 mx-auto overflow-hidden xs:px-6 lg:px-0 xl:max-w-7xl">
      <Icon name="fa6-solid:arrow-trend-up" class="text-red-500 text-2xl" />
      <div class="flex items-center max-w-full gap-4 overflow-x-auto lg:pl-4">
        <span class="px-4 py-1 border rounded-full whitespace-nowrap border-stone-300">
          Thi đua ái quốc
        </span>
        <span class="px-4 py-1 border rounded-full whitespace-nowrap border-stone-300">
          Chống tin giả, tin xấu độc
        </span>
        <span class="px-4 py-1 border rounded-full whitespace-nowrap border-stone-300">
          Lừa đảo trên không gian mạng
        </span>
        <span class="px-4 py-1 border rounded-full whitespace-nowrap border-stone-300">
          BLACKPINK trong khu vực bạn đó!
        </span>
      </div>
    </div>
  </section> -->
  <!-- End Event trending -->
  <!-- Hot topics -->
  <!-- <section class="flex flex-col gap-6 max-w-full h-max">
        <div class="grid gap-6 bg-dark-100 h-full w-full py-6">
            <h2
                class="uppercase text-2xl mx-auto font-bold tracking-wider text-white relative before:(content-[''] absolute top-1/2 -translate-y-1/2 -left-4 -translate-x-full h-0.5 w-full bg-white rounded-full) after:(content-[''] absolute top-1/2 -translate-y-1/2 -right-4 translate-x-full h-0.5 w-full bg-white rounded-full)">
                Hot Stories
            </h2>
            <div class="max-w-7xl mx-auto">
                <Swiper spaceBetween="24" effect="creative" :slidesPerView="4" :loop="true" :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }" :creative-effect="{
  prev: {
    shadow: false,
    translate: ['-20%', 0, -1],
  },
  next: {
    translate: ['100%', 0, 0],
  },
}">
          <SwiperSlide>
            <article>
              <div class="group cursor-pointer relative rounded overflow-hidden border-2 border-transparent hover:border-red-500 duration-300 ease-in-out">
                <img src="https://i.imgur.com/nVnZd0V.png" alt="" class="h-full w-full object-cover group-hover:scale-[1.05] duration-500 ease-in-out" />
                <div class="flex flex-col absolute inset-0 text-white text-xl font-semibold p-6 bg-gradient-to-t from-dark-500/50 from-5% to-100% to-transparent">
                  <h3 class="mt-auto">Chiến dịch cao điểm phòng, chống sốt xuất huyết</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article>
              <div class="group cursor-pointer relative rounded overflow-hidden border-2 border-transparent hover:border-red-500 duration-300 ease-in-out">
                <img src="https://i.imgur.com/iwRwgBH.jpg" alt="" class="h-full w-full object-cover group-hover:scale-[1.05] duration-500 ease-in-out" />
                <div class="flex flex-col absolute inset-0 text-white text-xl font-semibold p-6 bg-gradient-to-t from-dark-500/50 to-transparent">
                  <h3 class="mt-auto">Phương án xây dựng cầu Thủ Thiêm 4</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article>
              <div class="group cursor-pointer relative rounded overflow-hidden border-2 border-transparent hover:border-red-500 duration-300 ease-in-out">
                <img src="https://i.imgur.com/I3zE3qG.jpg" alt="" class="h-full w-full object-cover group-hover:scale-[1.05] duration-500 ease-in-out" />
                <div class="flex flex-col absolute inset-0 text-white text-xl font-semibold p-6 bg-gradient-to-t from-dark-500/50 to-transparent">
                  <h3 class="mt-auto">Lừa đảo trực tuyến: Nhận diện và cách phòng chống</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article>
              <div class="group cursor-pointer relative rounded overflow-hidden border-2 border-transparent hover:border-red-500 duration-300 ease-in-out">
                <img src="https://i.imgur.com/5WPkzvK.png" alt="" class="h-full w-full object-cover group-hover:scale-[1.05] duration-500 ease-in-out" />
                <div class="flex flex-col absolute inset-0 text-white text-xl font-semibold p-6 bg-gradient-to-t from-dark-500/50 to-transparent">
                  <h3 class="mt-auto">Tô đậm dấu ấn Việt Nam trong ASEAN</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
            </div>
        </div>
    </section> -->
  <!-- End hot topics -->
  <!-- Kinh tế -->
  <!-- <section class="grid max-w-full mt-12">
    <div class="w-full max-w-7xl mx-auto grid gap-6 xl:grid-cols-[max-content_1fr] mb-12 md:px-6 2xl:px-0">
      <div class="max-w-full xl:max-w-4xl overflow-hidden">
        <SectionHeader :payload="kinhte?.category" />
        <div class="max-w-full lg:px-0">
          <div class="grid max-w-full gap-6 md:grid-cols-2">
            <Article mode="modern" class="lg:max-w-lg 2xl:max-w-xl" :thumb="kinhte?.top1?.thumbnail"
              aspect="aspect-6/4" :title="kinhte?.top1?.title" :brief="kinhte?.top1?.intro"
              :slug="utils.generateSlugWithId('/v', kinhte?.top1?.slug, kinhte?.top1?.id)" />
            <div class="grid gap-8 px-4 xs:px-6 md:px-0">
              <Article mode="text" v-for="(item, index) in kinhte?.setKinhte.slice(0, 4)" :key="index" :title="item?.title"
                :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" />
            </div>
          </div>
          <div class="grid w-full gap-6 px-4 mt-6 xs:px-6 sm:grid-cols-2 md:px-0 xl:max-w-6xl">
            <Article mode="microSquare" v-for="(item, index) in kinhte?.setKinhte.slice(4)" :key="index"
              :title="item?.title" :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)"
              :thumb="item.thumbnail" />
          </div>
        </div>
      </div>

      <div class="">
        <h2 class="text-xl font-bold text-center uppercase xl:text-2xl">
          Tỷ giá ngoại tệ
        </h2>
        <Exchange />
      </div>
    </div>
  </section> -->
  <!-- End Kinh tế -->
  <!-- BDS -->
  <!-- <section class="grid max-w-full">
    <div class="w-full max-w-7xl mx-auto grid gap-6 xl:grid-cols-[max-content_1fr] mb-12 md:px-6 2xl:px-0">
      <div class="max-w-full xl:max-w-4xl overflow-hidden">
        <SectionHeader :payload="bds?.category" />
        <div class="max-w-full lg:px-0">
          <div class="grid max-w-full gap-6 md:grid-cols-2">
            <Article class="lg:max-w-lg 2xl:max-w-xl" :thumb="bds?.top1?.thumbnail" :title="bds?.top1?.title"
              :brief="bds?.top1?.intro" clampIntro="line-clamp-3"
              :slug="utils.generateSlugWithId('/v', bds?.top1?.slug, bds?.top1?.id)" />
            <div class="grid gap-8 px-4 xs:px-6 md:px-0">
              <Article mode="microSquare" v-for="(item, index) in bds?.setBds" :key="index" :title="item?.title"
                :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" :thumb="item.thumbnail" />
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <h2 class="text-xl font-bold text-center uppercase xl:text-2xl">Thời tiết</h2>
        <Weather />
      </div>
    </div>
  </section> -->
  <!-- End BDS-->
  <!-- Thể thao -->
  <!-- <section class="relative mb-12 bg-gradient-to-bl from-rose-900 to-[#0d1934] to-70% text-slate-100 overflow-hidden">
    <div class="px-4 py-8 mx-auto xs:px-6 xl:p-8 max-w-7xl 2xl:px-0">
      <div
        class="grid max-w-full items-center grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr_max-content] pb-1 mb-6 border-b-2 lg:px-0 lg:mx-0 xs:px-6 md:px-0 whitespace-nowrap border-red-400/50">
        <h2>
          <NuxtLink :to="utils.generateSlugWithId(
            '/category',
            thethao?.category?.slug,
            thethao?.category?.id
          )
            " class="mr-4 text-lg font-bold uppercase lg:mr-8 xl:text-2xl">
            <span v-html="thethao?.category?.title"></span>
          </NuxtLink>
        </h2>
        <div class="flex items-center max-w-full gap-4 overflow-x-auto text-xs">
          <NuxtLink v-for="(item, index) in thethao?.category?.children" :key="index"
            :to="utils.generateSlugWithId('/category', item?.slug as string, item?.id as number)">
            <span v-html="item?.title"></span>
          </NuxtLink>
        </div>
        <a href="/test"><CustomText text="Danh sách lịch thi đấu >>" class="hidden ml-auto text-sm md:block" tag="h2" /></a>
      </div>
      <div ref="microArticlesWrapper"
        class="relative z-10 grid pb-6 mb-6 border-b lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 border-red-400/50 gap-x-6 gap-y-8">
        <Article mode="micro" v-for="(item, index) in thethao?.setThethao.slice(0, 4)" :key="index" :title="item?.title"
          :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" :thumb="item.thumbnail" />
      </div>
      <div class="grid gap-6 lg:grid-rows-[30rem_12rem] xl:grid-rows-1 2xl:gap-8 lg:grid-flow-col">
        <aside class="grid order-2 gap-6 lg:order-3 xl:order-1 lg:grid-cols-1 sm:grid-cols-2 xl:max-w-xs lg:auto-rows-fr">
          <Article mode="modern" v-for="(item, index) in thethao?.setThethao.slice(4, 6)" :key="index"
            :title="item?.title" :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" :thumb="item.thumbnail"
            class="h-full" aspect="aspect-16/15"
            gradientOverlay="after:bg-gradient-to-t after:from-red-800/50 after:to-transparent after:to-50%" />
        </aside>
        <Article mode="modern" :title="thethao?.top1?.title"
          :slug="utils.generateSlugWithId('/v', thethao?.top1?.slug, thethao?.top1?.id)"
          :thumb="thethao?.top1?.thumbnail" :brief="thethao?.top1?.intro" aspect="aspect-12/13"
          class="order-1 w-full h-full xl:order-2"
          gradientOverlay="after:bg-gradient-to-t after:from-red-800/50 after:to-transparent after:to-45%" />
        <aside
          class="grid order-3 max-h-full gap-6 xl:order-3 lg:order-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 xl:max-w-xs lg:col-span-2 lg:auto-rows-fr">
          <Article mode="modern" v-for="(item, index) in thethao?.setThethao.slice(6)" :key="index" :title="item?.title"
            :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" :thumb="item.thumbnail" class="h-full"
            gradientOverlay="after:bg-gradient-to-t after:from-red-800/50 after:to-transparent after:to-50%" />
        </aside>
      </div>
    </div>
  </section> -->
  <!-- End Thể thao-->
  <!-- Intro -->
  <!-- <section class="px-4 mx-auto mb-12 xs:px-6 xl:px-8 max-w-7xl">
    <CustomText text="Our Ecosystem" tag="h2"
      class="text-2xl font-bold tracking-wide text-center uppercase sm:text-3xl xl:text-4xl" />
    <div class="flex flex-wrap justify-center gap-6 mt-4 text-center pointer-events-none sm:gap-8 group/parent">
      <a href="#!"
        class="group/child flex flex-col gap-2 hover:-translate-y-2 hover:!brightness-100 group-hover/parent:brightness-75 duration-300 pointer-events-auto">
        <div
          class="grid w-12 h-12 text-xl duration-300 bg-blue-500 rounded-full sm:w-16 sm:h-16 sm:text-3xl group-hover/child:shadow-md group-hover/child:shadow-blue-500 place-items-center">
          <Icon name="fa6-brands:facebook-f" color="#fff" />
        </div>
        <CustomText text="248,1K" tag="strong" />
      </a>
      <a href="#!"
        class="group/child flex flex-col gap-2 hover:-translate-y-2 hover:!brightness-100 group-hover/parent:brightness-75 duration-300 pointer-events-auto">
        <div
          class="grid w-12 h-12 text-xl duration-300 rounded-full sm:text-3xl sm:h-16 sm:w-16 bg-sky-500 group-hover/child:shadow-md group-hover/child:shadow-sky-500 place-items-center">
          <Icon name="fa6-brands:twitter" color="#fff" />
        </div>
        <CustomText text="69,1K" tag="strong" />
      </a>
      <a href="#!"
        class="group/child flex flex-col gap-2 hover:-translate-y-2 hover:!brightness-100 group-hover/parent:brightness-75 duration-300 pointer-events-auto">
        <div
          class="grid w-12 h-12 text-xl duration-300 rounded-full sm:text-3xl sm:h-16 sm:w-16 bg-gradient-to-br from-red-500 to-violet-600 group-hover/child:shadow-md group-hover/child:shadow-violet-600 place-items-center">
          <Icon name="fa6-brands:instagram" color="#fff" />
        </div>
        <CustomText text="54,3K" tag="strong" />
      </a>
      <a href="#!"
        class="group/child flex flex-col gap-2 hover:-translate-y-2 hover:!brightness-100 group-hover/parent:brightness-75 duration-300 pointer-events-auto">
        <div
          class="grid w-12 h-12 text-xl duration-300 rounded-full sm:text-3xl sm:h-16 sm:w-16 bg-stone-800 group-hover/child:shadow-md group-hover/child:shadow-stone-600 place-items-center">
          <Icon name="fa6-brands:tiktok" color="#fff" />
        </div>
        <CustomText text="134K" tag="strong" />
      </a>
      <a href="#!"
        class="group/child flex-col gap-2 hover:-translate-y-2 hover:!brightness-100 group-hover/parent:brightness-75 duration-300 pointer-events-auto xs:hidden sm:flex">
        <div
          class="grid w-12 h-12 text-xl duration-300 bg-red-600 rounded-full sm:text-3xl sm:h-16 sm:w-16 group-hover/child:shadow-md group-hover/child:shadow-red-600 place-items-center">
          <Icon name="fa6-brands:youtube" color="#fff" />
        </div>
        <CustomText text="54,3K" tag="strong" />
      </a>
    </div>
  </section> -->
  <!-- End Intro-->
  <!-- Y tế -->
  <!-- <section class="mx-auto mb-12 max-w-7xl">
    <div
      class="px-4 2xl:px-0 grid max-w-full items-center grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr_max-content] pb-1 mb-6 border-b-2 lg:px-0 lg:mx-0 xs:px-6 md:px-0 whitespace-nowrap border-blue-100">
      <NuxtLink :to="utils.generateSlugWithId('/category', yte?.category?.slug as string, yte?.category?.id as number)"
        class="mr-4 text-lg font-bold uppercase lg:mr-8 xl:text-2xl">
        <span v-html="yte?.category?.title"></span>
      </NuxtLink>
      <div class="flex items-center max-w-full gap-4 overflow-x-auto text-xs">
        <NuxtLink v-for="(item, index) in yte?.category?.children" :key="index"
          :to="utils.generateSlugWithId('/category', item?.slug as string, item?.id as number)">
          <span v-html="item?.title"></span>
        </NuxtLink>
      </div>
    </div>
    <div class="grid gap-6 px-4 xs:px-6 2xl:px-0 sm:grid-cols-2 xl:grid-cols-4 auto-rows-fr lg:grid-cols-3">
      <Article mode="modern" v-for="(item, index) in yte?.setYte.slice(0, 4)" :key="index" :title="item?.title"
        :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" :thumb="item.thumbnail"
        gradientOverlay="after:bg-gradient-to-t after:from-sky-500/75 after:to-transparent after:to-50%" />
    </div>
    <div class="px-4 xs:px-6 2xl:px-0 grid max-w-full items-center grid-cols-[max-content_1fr] py-4 my-6 gap-4 overflow-hidden border-t border-b border-blue-100 whitespace-nowrap">
      <div class="flex flex-col items-center md:flex-row md:gap-2 xl:gap-3 text-sky-600">
        <Icon name="fa6-solid:book-bookmark" class="text-xs xs:text-sm sm:text-base xl:text-xl" />
        <CustomText text="Chủ đề" class="after:content-[':'] after:hidden after:md:inline text-sm sm:text-base" tag="strong" />
      </div>
      <div class="flex items-center max-w-full gap-4 overflow-x-auto text-sm no-scrollbar zone__content h-12">
        <NuxtLink v-for="(topic, index) in listTopic" :key="index"
              :to="utils.generateSlugWithId('/topic', topic?.slug as string, topic?.id as number)">
              <CustomText tag="span" :text="topic?.title"
              class="px-4 py-1 mb-2 cursor-pointer text-blue-600 duration-300 border-2 border-blue-400 border-dashed rounded-md hover:bg-blue-400 hover:text-white" />
        </NuxtLink>
      </div>
    </div>
    <div
      class="relative grid px-4 sm:grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-6 xs:px-6 2xl:px-0 after:absolute after:left-0 after:right-0 after:top-1/2 after:-translate-y-1/2 after:border-t after:border-blue-100">
      <Article mode="textDot" v-for="(item, index) in yte?.setYte.slice(4)" :key="index" :title="item?.title"
        :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" />
    </div>
  </section> -->
  <!-- End Y tế -->
  <!-- Thời sự, phát luật, thế giới -->
  <!-- <section class="max-w-full px-4 mx-auto mb-12 xs:px-6 2xl:px-0 2xl:max-w-7xl">
    <div class="grid gap-6 md:grid-cols-3 md:auto-rows-fr">
      <div class="max-w-full overflow-hidden" v-for="(item, index) in [thoisu, quocte, phapluat]" :key="index">
        <div class="flex items-center pb-1 mb-6 border-b-2 border-red-900 border-opacity-50 whitespace-nowrap">
          <h2 class="mr-4 text-base font-bold uppercase xs:mr-6 xl:text-xl">
            <NuxtLink :to="utils.generateSlugWithId(
              '/category',
              item?.category?.slug,
              item?.category?.id
            )
              " class="hover:text-blue-500 cursor-pointer duration-300 ease-in-out">
              <span v-html="item?.category?.title"></span>
            </NuxtLink>
          </h2>

          <div class="flex items-center max-w-full gap-4 custom_scrollbar text-xs">
            <NuxtLink v-for="(subItem, i) in item?.category?.children" :key="i"
              :to="utils.generateSlugWithId('/category', subItem?.slug, subItem?.id)">
              <span v-html="subItem.title"></span>
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col divide-y-2">
          <article class="w-full mb-6">
            <NuxtLink :to="utils.generateSlugWithId('/v', item?.top1?.slug, item?.top1?.id)">
              <NuxtImg :src="item?.top1?.thumbnail" placeholder fit="cover"
                class="aspect-5/3 w-full h-full rounded shadow" :alt="item?.top1?.title" loading="lazy" />
            </NuxtLink>
            <h3 class="my-3 text-xl font-bold min-h-[3.5rem]">
              <NuxtLink :to="utils.generateSlugWithId('/v', item?.top1?.slug, item?.top1?.id)">
                <span v-html="item?.top1?.title"></span>
              </NuxtLink>
            </h3>
            <NuxtLink :to="utils.generateSlugWithId('/v', item?.top1?.slug, item?.top1?.id)" class="block">
              <div v-html="item?.top1?.intro" class="line-clamp-3"></div>
            </NuxtLink>
          </article>
          <Article mode="text" v-for="(subItem, index) in item?.setArticles" :key="index" :title="subItem?.title"
            introClamp="line-clamp-5" :slug="utils.generateSlugWithId('/v', subItem?.slug, subItem?.id)"
            :brief="subItem?.intro" />
        </div>
      </div>
    </div>
  </section> -->
  <!-- End Thời sự, phát luật, thế giới -->
  <!-- Multimedia -->
  <!-- <section class="bg-gradient-to-bl from-purple-900 to-rose-700 text-slate-100">
    <div class="px-4 py-8 mx-auto 2xl:px-0 xs:px-6 max-w-7xl">
      <div class="flex items-center w-full pb-1 mb-6 border-b border-white border-opacity-40 whitespace-nowrap">
        <h2 class="mr-4 text-base font-bold uppercase xs:mr-6 xl:text-xl">
          <NuxtLink :to="utils.generateSlugWithId(
            '/category',
            multimedia?.category?.slug,
            multimedia?.category?.id
          )
            " class="hover:text-blue-500 cursor-pointer duration-300 ease-in-out">
            <span v-html="multimedia?.category?.title"></span>
          </NuxtLink>
        </h2>
        <div class="flex items-center max-w-full gap-4 overflow-x-auto text-xs">
          <NuxtLink v-for="(subItem, i) in multimedia?.category?.children" :key="i"
            :to="utils.generateSlugWithId('/category', subItem?.slug, subItem?.id)"
            class="hover:text-blue-500 cursor-pointer duration-300 ease-in-out">
            <span v-html="subItem.title"></span>
          </NuxtLink>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="grid col-span-2 order-2 gap-4 xl:order-1">
          <Article mode="modern" v-for="(item, index) in multimedia?.setArticles.slice(0, 2)" :key="index"
            :title="item?.title" :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)" :thumb="item.thumbnail"
            aspect="aspect-13/9" gradientOverlay="after:bg-gradient-to-t after:from-violet-950/70 after:to-transparent" />
        </div>
        <Article mode="modern" :title="multimedia?.top1?.title" :slug="utils.generateSlugWithId('/v', multimedia?.top1?.slug, multimedia?.top1?.id)
          " :thumb="multimedia?.top1?.thumbnail" :brief="multimedia?.top1?.intro" aspect="aspect-auto"
          class="col-span-2 order-1 xl:order-2 block flex-grow outline-none overflow-hidden"
          gradientOverlay="after:bg-gradient-to-t after:from-violet-950/70 after:to-transparent" />
      </div>
      <div class="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <Article v-for="(subItem, index) in multimedia?.setArticles.slice(2)" :key="index" :title="subItem?.title"
          :slug="utils.generateSlugWithId('/v', subItem?.slug, subItem?.id)" :brief="subItem?.intro"
          :thumb="subItem.thumbnail" clampIntro="line-clamp-5" titleClass="text-lg" />
      </div>
    </div>
  </section> -->
  <!-- End  Multimedia -->
  <!-- Văn hóa -->
  <section class="grid max-w-screen mt-8">
    <div class="w-full max-w-6xl mx-auto overflow-hidden">
      <SectionHeader :payload="vanhoa?.category" />
    </div>
    <!-- <Glide name="travel-slide" rewind bound gap="24" perView="2" class="max-w-screen">
      <GlideSlide v-for="(item, index) in vanhoa?.setArticles.slice(0, 3)" :key="index">
        <NuxtLink :to="utils.generateSlugWithId('/v', item?.slug, item?.id)">
        <article
          class="overflow-hidden grid relative rounded h-80 after:(content-[''] absolute inset-0 rounded-inherit bg-dark-500/40)">
          <div class="overflow-hidden">
            <NuxtImg :src="item?.thumbnail" fit="cover" class="object-cover w-full h-full" :alt="item?.title"
              loading="lazy" />
          </div>
          <div
            class="absolute z-1 h-full w-[35%] py-4 px-6 flex flex-col justify-center gap-6 text-white backdrop-blur-sm rounded-l">
            <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-bold" v-html="item?.title"></h3>
            <div class="hidden md:block text-balance font-semibold line-clamp-3" v-html="item?.intro"></div>
          </div>
        </article>
      </NuxtLink>
      </GlideSlide>
    </Glide> -->
    <div class="mt-6 gap-6 grid md:grid-cols-3 md:grid-rows-3 w-full max-w-7xl mx-auto">
      <Article v-for="(subItem, index) in vanhoa?.setArticles.slice(3)" :key="index" :title="subItem?.title" mode="modern" :slug="'/' + subItem.category?.code + '/' + subItem.code" :brief="subItem?.intro" :thumb="subItem.thumbnail" :class="[
        index === 0
          ? 'md:(col-span-2 row-span-2)'
          : index === 1 || index === 3
            ? 'md:row-span-2'
            : '',
      ]" aspect="aspect-auto" gradientOverlay="after:bg-gradient-to-t after:from-violet-950/70 after:to-transparent" />
    </div>
  </section>
</template>

<style scoped>
#blob {
  --blob-color: linear-gradient(to right, white, mediumpurple);
  --blob-size: 120px;
  background: var(--blob-color);
  filter: blur(calc(var(--blob-size) / 2.15));
  width: var(--blob-size);
  height: var(--blob-size);
  position: absolute;
  translate: 200% 0%;
  border-radius: 50%;
}

#blob-blur {
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur;
}

.zone--breaking {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
}

.zone {
  margin-bottom: 1rem;
}

.zone--breaking .zone__title {
  flex-basis: 120px;
  margin-bottom: 0;
  font-size: 0.75em;
}

.zone__title {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: inline-block;
  padding-right: 1rem;
  background-color: white;
  position: relative;
}

.zone__title span,
.zone__title a {
  background-color: #FF0018;
  color: white;
  display: inline-block;
  border-radius: 0.5rem 0 0.5rem 0;
  padding: 0.25rem 0.5rem;
  font-weight: 500;
}

.zone--breaking .zone__content {
  flex-basis: calc(100% - 128px);
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  font-size: 16px;
  margin: 5px 0px;
  scrollbar-color: #f5f5f5 transparent;
  scrollbar-width: thin;
}

.zone__content::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.zone__content::-webkit-scrollbar-thumb {
  background: #cdcccc;
  border-radius: 4px;
}

.zone__content::-webkit-scrollbar-track {
  background: transparent;
}

.zone__content .item::before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  width: 4px;
  height: 4px;
  transform: translateY(-50%);
  background-color: #FF0018;
  border-radius: 50%;
}

.zone__content::after {
  display: block;
  content: "";
  clear: both;
}

.zone__content .item {
  display: inline-block;
  font-size: 0.75rem;
  line-height: 2;
  text-transform: uppercase;
  padding-left: 0.75rem;
  position: relative;
  margin-right: 1rem;
  color: #757575;
}
</style>
