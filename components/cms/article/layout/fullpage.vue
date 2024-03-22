<script setup lang="ts">
import * as cheerio from 'cheerio'
const props = defineProps<{ article: any, relations?: any[], category?: any }>();
const fadeEffects = ["fade", "fade-up", "fade-down", "fade-left", "fade-right", "fade-up-right", "fade-up-left", "fade-down-right", "fade-down-left"];
function useSample(array: any) {
    return array[Math.floor(Math.random() * array.length)];
}

const randomFadeEffect = () => useSample(fadeEffects);

const text = props.article?.detail;
const $ = cheerio.load(text);

$('img').each((index, img) => {
    $(img).attr('data-aos', randomFadeEffect());
});
const modifiedText = $.html();

const fontSize = ref(16)
const increaseFontSize = () => {
    if (fontSize.value < 24) {
        fontSize.value = fontSize.value + 2
    }
}

const decreaseFontSize = () => {
    if (fontSize.value > 10) {
        fontSize.value = fontSize.value - 2
    }

}
</script>

<template>
    <div>
        <NuxtLayout name="full-page-article">
            <div class="mx-auto overflow-x-hidden pb-12">

                <article class="flex flex-col gap-4">
                    <div class="container-xxl mx-auto text-[22px] flex items-center gap-2">
                        <div @click="increaseFontSize()"
                            :class="fontSize < 24 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                            class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                            <Icon name="fluent:font-increase-20-regular" />
                        </div>
                        <div @click="decreaseFontSize()"
                            :class="fontSize > 10 ? 'hover:bg-red-100 hover:bg-red-200 hover:text-white cursor-pointer' : ' hover:bg-gray-100 hover:border-gray-200 hover:text-black'"
                            class="bg-gray-100 text-[22px] w-[2rem] h-[2rem]  border-gray-200 border border-solid flex justify-center items-center rounded-full">
                            <Icon name="fluent:font-decrease-20-regular" />
                        </div>
                    </div>
                    <h1 v-html="article?.sub" class="text-xl font-bold opacity-60"></h1>
                    <h1 v-html="article?.title" class="text-2xl font-bold sm:text-3xl xl:text-4xl"></h1>
                    <div v-if="article?.intro" v-html="article?.intro" class="font-semibold text-xl tracking-widest">
                    </div>

                    <div id="article-detail" :class="'text-[' + fontSize + 'px]'" v-html="modifiedText"
                        class="[&_img]:mx-auto">
                    </div>
                    <div id="article-author" class="grid place-items-center text-slate-600">
                        <span class="text-2xl font-semibold">Trình bày</span>
                        <span class="text-3xl font-bold">
                            {{ article?.authors[0]?.title }}
                        </span>
                    </div>
                    <CustomText :text="utils.dateFormat(article?.createdOn)" class="xs:mt-0.5 flex justify-end"
                        tag="time" />
                </article>

                <div id="article-footer" class="grid gap-4 pb-6">
                    <section>
                        <article
                            class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
                            <iframe
                                src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId"
                                width="140" height="20" style="border:none;overflow:hidden" scrolling="no"
                                frameborder="0" allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </article>
                    </section>
                    <Topic :topics="article?.topics" />

                    <Event :events="article?.events" />

                    <Tag :tags="article?.tags" />


                    <ArticleButon :article="article" :category="category" class="mt-6" />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>