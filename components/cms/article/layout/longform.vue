<script setup lang="ts">
const props = defineProps<{ article?: any, category?: any }>();
const ORIGIN = 'https://stable.vpress.vn'
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <Wrap class="!max-w-4xl">
                <div class="mt-4 mx-auto">

                    <article class="flex flex-col gap-4 mt-3">
                        <h1 v-html="article?.sub" class="text-xl font-bold opacity-60"></h1>
                        <h1 v-html="article?.title" tag="h1"
                            class="text-2xl font-bold sm:text-3xl text-balance xl:text-4xl">
                        </h1>

                        <div class="flex flex-col gap-4">
                            <div id="article-author" class="flex gap-2 justify-start">
                                <div>
                                    <img src="https://avatars.githubusercontent.com/u/89140442" loading="lazy"
                                        class="w-8 h-8 rounded-full" />
                                </div>

                                <div class="flex flex-col">
                                    <span class="text-sm font-semibold [&_not(:first)]:pl-2">
                                        {{ article?.authors[0]?.alias }}
                                    </span>

                                    <CustomText :text="utils.dateFormat(article?.createdOn)"
                                        class="xs:mt-0.5 xs:text-sm text-xs" tag="time" />
                                </div>
                            </div>
                        </div>

                        <div v-html="article?.intro" class="font-semibold text-xl tracking-widest"></div>

                        <div id="article-detail" class="grid gap-4 mx-auto xl:max-w-6xl" v-html="article?.detail">
                        </div>
                    </article>

                    <div id="article-footer" class="grid gap-4 pb-6">
                        <section>
                            <article
                                class="mb-[1rem] py-[1rem] border-y-[1px] border-solid border-[#e0e0e0] flex items-center">
                                <iframe
                                    :src="`https://www.facebook.com/plugins/like.php?href=${ORIGIN}/${category?.code}/${article?.code}&amp;width=160&amp;layout=button&amp;action=like&amp;size=small&amp;share=true&amp;height=65&amp;appId`"
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
            </Wrap>
        </NuxtLayout>
    </div>
</template>