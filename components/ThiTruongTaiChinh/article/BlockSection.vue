<script setup>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)
const props = defineProps({
    title: {
        type: String,
    },
    articles: {
        type: Array
    }
})

</script>

<template>
    <section class="xl:mb-[1.5rem] mb-[1rem]" v-if="props.articles">
        <header class="relative justify-start xl:mb-[1rem] mb-[0.75rem] flex-row items-center flex-wrap flex">
            <h2 class="font-playfair-display mb-0 xl:text-[1.5rem] text-[1.25rem] leading-[1] relative font-semibold">
                <a href="#" class="pr-[1rem] bg-white block relative z-1 text-red-500">{{ props.title }}</a>
            </h2>
            <div class="absolute block w-full bottom-0 h-[4px] bg-red-500" />
        </header>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
            <div>
                <article>
                    <figure class="mb-[0.5rem] overflow-hidden">
                        <nuxt-link class="block relative pb-[56.25%] w-full bg-[#eee] rounded-[0.5rem] overflow-hidden"
                            :to="{ name: 'category-articleSlug', params: { category: props.articles[0].category.code, articleSlug: props.articles[0].code } }">
                            <img class="absolute inset-0 object-cover w-full h-full" :src="props.articles[0].thumbnail" alt="">
                        </nuxt-link>
                    </figure>
                    <header>

                        <h3
                            class="font-playfair-display transition duration-300 ease-in-out hover:text-red-500 mb-0 text-[1rem] leading-[1.4] overflow-hidden text-ellipsis font-bold hover:text-red-500">
                            <nuxt-link
                                :to="{ name: 'category-articleSlug', params: { category: props.articles[0].category.code, articleSlug: props.articles[0].code } }">
                                <span v-html="props.articles[0].title" class="line-clamp-2"></span>
                            </nuxt-link>
                        </h3>
                        <div
                            class="font-bai-jamjuree md:flex md:justify-between md:items-center text-[0.75rem] mb-[0.5rem]">
                            <time class="block opcity-50">{{ dayjs(props.articles[0].createdOn).format('DD/MM/YYYY')
                                }}</time>
                        </div>
                    </header>
                </article>
            </div>

            <div
                class="[&_div:last-child]:border-none [&_div:not(:last-child)]:pb-[1rem] [&_div:not(:last-child)]:mb-[1rem]">
                <div v-for="(article, index) in props.articles.slice(1, 4)" :key="index" class="border-b-[1px] border-solid border-[#eee]">
                    <article
                        :class="index ? '': 'grid grid-cols-2 gap-[20px]' ">
                        <figure v-if="!index" class="mb-[0.5rem] overflow-hidden">
                            <nuxt-link
                                :to="{ name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }"
                                class="block relative pb-[56.25%] w-full bg-[#eee] rounded-[0.5rem] overflow-hidden">
                                <img class="absolute inset-0 object-cover w-full h-full" :src="article.thumbnail" alt="">
                            </nuxt-link>
                        </figure>
                        <header>
                            <h3 class="font-playfair-display transition duration-300 ease-in-out hover:text-red-500 mb-0 text-[1rem] leading-[1.4] overflow-hidden text-ellipsis">
                                <nuxt-link
                                    :to="{name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }">
                                    <span v-html="article.title" :class="index ? 'line-clamp-2' : 'line-clamp-4'"></span>
                                </nuxt-link>
                            </h3>
                        </header>
                    </article>
                </div>

            </div>
            <!-- <div v-else class="grid grid-cols-2 gap-[20px]">
                    <article>
                        <figure v-if="!index" class="mb-[0.5rem] overflow-hidden">
                            <nuxt-link
                                :to="{ name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }"
                                class="block relative pb-[56.25%] w-full bg-[#eee] rounded-[0.5rem] overflow-hidden">
                                <img class="absolute inset-0 object-cover w-full h-full" :src="article.thumbnail"
                                    alt="">
                            </nuxt-link>
                        </figure>
                        <header>
                            <h3
                                class="font-playfair-display mb-0 text-[1rem] leading-[1.4] overflow-hidden text-ellipsis">
                                <nuxt-link
                                    :to="{ name: 'category-articleSlug', params: { category: article.category.code, articleSlug: article.code } }">
                                    <span v-html="article.title"
                                        :class="index ? 'line-clamp-2' : 'line-clamp-4'"></span>
                                </nuxt-link>
                            </h3>
                        </header>
                    </article>
                </div> -->
        </div>
        <!-- <div>
                <article>
                    <figure class="mb-[0.5rem] overflow-hidden">
                        <nuxt-link class="block relative pb-[56.25%] w-full bg-[#eee] rounded-[0.5rem] overflow-hidden"
                            :to="{ name: 'category-slug', params: { category: props.articles[0].code, slug: props.articles[0].code } }">
                            <img class="absolute inset-0 object-cover w-full h-full" :src="props.articles[0].thumbnail" alt="">
                        </nuxt-link>
                    </figure>
                    <header>

                        <h3 class="font-playfair-display mb-0 text-[1rem] leading-[1.4] overflow-hidden text-ellipsis">
                            <nuxt-link
                                :to="{ name: 'category-slug', params: { category: props.articles[0].code, slug: props.articles[0].code } }">
                                <span v-html="props.articles[0].title" class="line-clamp-2"></span>
                            </nuxt-link>
                        </h3>
                        <div class="font-bai-jamjuree md:flex md:justify-between md:items-center text-[0.75rem] mb-[0.5rem]">
                        <time class="block opcity-50" >{{ dayjs(props.articles[0].createdOn).format('MMMM Do, YYYY')}}</time></div>
                    </header>
                </article>
            </div>
            <div
                class="[&_div:last-child]:border-none [&_div:not(:last-child)]:pb-[1rem] [&_div:not(:last-child)]:mb-[1rem]">
                <div v-for="(post, index) in props.articles.slice(1, 4)" :key="index" class="border-b-[1px] border-solid border-[#eee]">
                    <article
                        :class="index ? '': 'grid grid-cols-2 gap-[20px]' ">
                        <figure v-if="!index" class="mb-[0.5rem] overflow-hidden">
                            <nuxt-link
                                :to="{ name: 'category-slug', params: { category: post.code, slug: post.code } }"
                                class="block relative pb-[56.25%] w-full bg-[#eee] rounded-[0.5rem] overflow-hidden">
                                <img class="absolute inset-0 object-cover w-full h-full" :src="post.thumbnail" alt="">
                            </nuxt-link>
                        </figure>
                        <header>
                            <h3 class="font-playfair-display mb-0 text-[1rem] leading-[1.4] overflow-hidden text-ellipsis">
                                <nuxt-link
                                    :to="{name: 'category-slug', params: { category: post.category.code, code: post.code } }">
                                    <span v-html="post.title" :class="index ? 'line-clamp-2' : 'line-clamp-4'"></span>
                                </nuxt-link>
                            </h3>
                        </header>
                    </article>
                </div>

            </div> -->
        <!-- </div> -->
    </section>
</template>