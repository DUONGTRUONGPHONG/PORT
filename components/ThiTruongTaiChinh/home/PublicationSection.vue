<template>
    <section class="mb-8 mx-3" v-if="data?.length > 0">
        <header class="flex-row justify-center items-center flex-wrap flex relative mb-3">
            <h2 class="text-xl xl:text-7 font-semibold font-playfair text-[#ff0018]"><nuxt-link
                    :to="`/${data[0]?.category?.code}`">{{ title }}</nuxt-link></h2>
        </header>
        <div class="">
            <div ref="optionsPerView" id="options-per-view" class="glide">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li v-for="i in data" class="glide__slide lg:w-[244px] w-1/2"
                            style="width: 244px!important; margin-right: 10px;">
                            <article class="group">
                                <figure class="rounded-lg overflow-hidden mb-2 max-h-[145px]"><nuxt-link
                                        :to="`/${i?.category?.code}/${i?.code}`"><img :src="i?.thumbnail" alt=""
                                            class="h-hull w-full object-cover"></nuxt-link></figure>
                                <header class="story__header">
                                    <h3
                                        class="font-playfair group-hover:text-[#ff0018] font-bold text-[1rem] md:text-[1.125rem] leading-[1.3]">
                                        <nuxt-link :to="`/${i?.category?.code}/${i?.code}`">{{ i?.title }}</nuxt-link>
                                    </h3>
                                </header>
                            </article>
                        </li>
                    </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                    <button
                        class=" top-1/2 -translate-y-1/2 absolute w-10 h-10 text-[#ff0018] opacity-50 rounded-[50%] left-0 flex justify-center items-center"
                        data-glide-dir="<"> <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq" style="--color: var(--secondary-icon);">
                            <path
                                d="M14.791 5.207 8 12l6.793 6.793a1 1 0 1 1-1.415 1.414l-7.5-7.5a1 1 0 0 1 0-1.414l7.5-7.5a1 1 0 1 1 1.415 1.414z">
                            </path>
                        </svg> </button>
                    <button
                        class=" top-1/2 -translate-y-1/2 absolute w-10 h-10 text-[#ff0018] opacity-50 rounded-[50%] right-0 flex justify-center items-center"
                        data-glide-dir=">"> <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq" style="--color: var(--secondary-icon);">
                            <path
                                d="M9.209 5.207 16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z">
                            </path>
                        </svg> </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
import Glide from '@glidejs/glide';
const props = defineProps(['categoryId', 'title'])
const glideInstance = ref(null);
const data = ref([])
onMounted(async () => {
    const perView = window.innerWidth > 1280 ? 5 : window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : 2;
    glideInstance.value = new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView,
        autoplay: 1000,
        gap: 12
    }).mount();
});


const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryId, 5)
}
await fetchData()
</script>

<style lang="scss">
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
</style>