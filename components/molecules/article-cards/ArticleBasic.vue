
<script setup lang='ts'>

const props = defineProps<{
    createdOn?: string
    category?: string
    thumb: string
    title: string
    brief?: string
    slug: string
    titleClass?: string
    clampIntro?: string
}>()

const defaultClass = {
    article: [
        'group',
        'max-w-full',
        'grid', 'gap-3',
        'overflow-hidden'
    ],
    thumbnail: [
        'rounded-sm', 'shadow-md', 'max-w-full', 'w-full', 'aspect-5/3',
        'group-hover:scale-[1.05]',
        'duration-500', 'ease-in-out', 'object-cover'
    ],
    title: [
        'font-bold', 'px-4', 'md:px-0',
        props.titleClass ? props.titleClass : [
            'xl:text-xl', 'text-base'
        ]
    ],
    brief: [
        'text-sm', 'sm:text-base',
        'mx-4', 'pb-4', 'md:pb-0', 'md:mx-0',
        'border-b', 'border-stone-400', 'md:border-none',props.clampIntro
    ]
}

</script>

<template>
    <NuxtLink :to="slug || '#!'" :title="title">
        <article mode="basic" :class="defaultClass.article">
            <div class="rounded-sm overflow-hidden">
                <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" loading="lazy" />
            </div>
            <h3 :class="defaultClass.title" v-html="title"></h3>
            <div v-if='brief' :class="defaultClass.brief" v-html="brief"> </div>
            <div class="flex flex-wrap gap-1 justify-start items-center">
                    <NuxtLink :to="'/' + category">
                        <span class="text-sm text-primary-100 font-semibold">{{ category }}</span>
                    </NuxtLink>
                    <span class="text-sm" v-if="createdOn">{{ utils.dateFormat(createdOn) }}</span>
                </div>
        </article>
    </NuxtLink>
</template>