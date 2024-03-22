<script setup>
import Glide from '@glidejs/glide'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const articles = await articleStoreV2.fetchByCategoryIdWithPaging(69, 6)
const glideInstance = ref(null);
onMounted(async () => {
    // const perView = window.innerWidth > 1024 ? 1 : window.innerWidth > 640 ? 2 : 1;
    glideInstance.value = new Glide('.glide', {
        type: 'carousel',
        perView: 1,
        breakpoints: {
            1024: {
                perView: 2
            },
            640: {
                perView: 1
            }
        },
        autoplay: 2000,
        hoverpause: true,
        startAt: 0,
        gap: 12
    }).mount();
});
</script>
<template>
    <section>
        <article class="bg-gray-200 p-[0.75rem_1rem_0.5rem] xl:mb-[1.5rem] mb-[1rem] w-full overflow-hidden">
            <h2 class="text-center mb-[1rem] text-[1.125rem] font-playfair-display font-semibold">
                <nuxt-link class="text-blue hover:text-blue" :to="{ name: 'category', params: { category: 'tin-tuc' } }">Tin
                    Tức</nuxt-link>
            </h2>
            <div class="glide">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li v-for="article in articles" :key="article.id" class="glide__slide">
                            <figure class="mb-[10px]">
                                <nuxt-link class="rounded-[0.5rem]"
                                    :to="{ name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }">
                                    <img class="object-cover w-full aspect-[5/3] rounded-[0.5rem]"
                                        :src="article.thumbnail || '/images/default-thumbnail.jpg'" alt="">
                                </nuxt-link>
                            </figure>
                            <nuxt-link
                                :to="{ name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }">
                                <span class="line-clamp-2 transition duration-300 ease-in-out hover:text-red-500 font-playfair-display text-[0.875rem]" v-html="article.title"></span>

                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    </section>
</template>

<style lang="scss">
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
</style>