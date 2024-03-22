<script setup lang="ts">
import type { Article } from '~/server/models/v2/article';
import type { Category } from '~/server/models/v2/category';

const props = defineProps<{ article: Article, category?: Category }>();

const htmlString = props.article.detail
const srcRegex = /src="([^"]+)"/;
const matchSRC = htmlString?.match(srcRegex);

</script>

<template>
    <div>
        <NuxtLayout name="default">
            <!-- <HeaderMedia type="PodCast"></HeaderMedia> -->
            <div class="w-full block">
                <div class="w-full h-60 md:h-100 relative bg-center"
                    :style="'background-image: url(' + article.thumbnail + '); background-size: cover;'">
                    <div class="absolute inset-0 bg-black opacity-80 z-1"></div>
                    <Wrap class="relative flex items-center justify-center">
                        <div class="w-full h-40 md:h-80 absolute inset-0 z-2">
                            <div class="grid grid-cols-10 w-full">
                                <div class="col-span-3 flex justify-center items-center h-60 md:h-80 mx-2 md:mx-8">
                                    <div class="h-40 md:h-60 w-full rounded-tl-3xl rounded-br-3xl border-double px-2 overflow-x-hidden relative overflow-y-hidden bg-cover z-1 after:z-2 after:content-[''] after:w-full after:h-full after:top-0 after:left-0 after:bg-#000 after:opacity-30 after:absolute"
                                        :style="{ backgroundImage: `url(${article.thumbnail})` }">
                                        <img :src="article.thumbnail" alt=""
                                            class="relative z-3 h-40 md:h-60 w-full object-contain ">
                                    </div>
                                </div>
                                <div class="col-span-7 grid grid-cols-12  relative">
                                    <div class="col-span-12 w-full grid grid-cols-12 mt-8 md:mb-4">
                                        <div class="col-span-11">
                                            <h1 v-html="article?.sub" class="text-xl font-bold text-white opacity-60"></h1>
                                            <h1 class="text-md md:text-3xl text-[#fff] font-bold font-['SFD']">{{
                        article.title }}</h1>
                                            <CustomText :text="utils.dateFormat(article?.createdOn)"
                                                class="xs:mt-0.5 text-[10px] md:text-sm text-[#fff]" tag="time" />
                                        </div>
                                    </div>
                                    <div class="col-span-12 w-full mb-4 hidden md:block">
                                        <div v-html="article.intro" class="text-left text-xl text-[#fff] font-['SFD']">
                                        </div>
                                    </div>
                                    <div class="col-span-11">
                                        <AudioPlayer :src="matchSRC?.[1]" />
                                        <section>
                                            <article
                                                class="mb-[1rem] py-[0.5rem] flex items-center">
                                                <iframe
                                                    src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId"
                                                    width="140" height="20" style="border:none;overflow:hidden"
                                                    scrolling="no" frameborder="0" allowfullscreen="true"
                                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                            </article>
                                        </section>
                                        <Topic :topics="article?.topics" :colorWhite="true"/>
                                        <Event :events="article?.events" />
                                        <Tag :tags="article?.tags" :colorWhite="true" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Wrap>
                </div>
            </div>
            <Wrap>
                <div class="w-full">
                    <div class="flex items-center mt-5 mb-5">
                        <ul
                            class="bg-red-500 text-white text-sm font-semibold hover:bg-red-400 font-medium inline-block rounded-tl-lg rounded-br-lg">
                            <li
                                class="inline-block uppercase rounded-l-lg border-radius border-red-500 border-r-0 px-2 py-1 text-center block transition-transform duration-300 transform hover:scale-105">
                                Podcast Hôm nay
                            </li>
                        </ul>
                        <div class="border border-slate-7 flex-grow ml-4"></div>
                    </div>
                    <div class="grid grid-cols-12 w-full md:gap-2 lg:gap-2">
                        <div class="md:col-span-6 lg:col-span-4 col-span-12" v-for="(item, index) in article?.relations"
                            :key="index" :style="{ display: item.id === article.id ? 'none' : '' }">
                            <!-- <div class="border border-red-5 flex-grow ml-4"></div> -->
                            <Article mode="podcast" image-size="md" text-size="lg" :createdOn="item?.createdOn"
                                :title="item?.title" :slug="'/' + item.category?.code + '/' + item.code"
                                :thumb="item?.thumbnail" />
                        </div>
                    </div>
                    <!-- <Pagination :payload="pagination" class="mt-6" /> -->
                </div>

                <div class="w-full">
                    <div class="flex items-center mt-5 mb-5">
                        <ul
                            class="bg-red-500 text-white text-sm font-semibold hover:bg-red-400 font-medium inline-block rounded-tl-lg rounded-br-lg">
                            <li
                                class="inline-block uppercase rounded-l-lg border-radius border-red-500 border-r-0 px-2 py-1 text-center block transition-transform duration-300 transform hover:scale-105">
                                Chủ đề
                            </li>
                        </ul>
                        <div class="border border-slate-7 flex-grow ml-4"></div>
                    </div>

                    <div class="grid grid-cols-12 w-full md:gap-3 gap-1">
                        <div class="md:col-span-6 lg:col-span-4 col-span-12 p-4 overflow-hidden" v-for="item in 12"
                            :key="item">
                            <nuxt-link to="#">
                                <div class="aspect-5/3 ">
                                    <NuxtImg :src="'http://picsum.photos/1024/600?random='+item" fill="cover"
                                        class="rounded-3xl shadow-md w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-bold px-4 md:px-0 xl:text-xl text-base mt-[10px]">Tin vui cho môn
                                        tích hợp trong Chương trình mới</h3>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </Wrap>

        </NuxtLayout>
    </div>
</template>

<style lang="scss" scoped>
.name {
    text-align: center;
    line-height: 100px;
}
</style>