
<script setup lang='ts'>

const props = defineProps<{
    thumb: string
    title: string
    brief?: string
    slug: string
    titleClass?: string
}>()

const defaultClass = {
    article: [
        'group',
        'max-w-full',
        'grid', 'gap-3',
        'overflow-hidden'
    ],
    thumbnail: [
        'md:rounded-tl-lg rounded-br-lg', 'shadow-md', 'max-w-full', 'w-full',
        'group-hover:scale-[1.05] ',
        'duration-500', 'ease-in-out',
    ],
    title: [
        'font-bold', 'px-4', 'md:px-0',
        props.titleClass ? props.titleClass : [
            'text-2xl'
        ]
    ],
    brief: [
        'text-xl',
        'mx-4', 'pb-4', 'md:pb-0', 'md:mx-0',
        'border-b', 'border-stone-400', 'md:border-none'
    ]
}

</script>

<template>
    <NuxtLink :to="props.slug || '#!'" :title="props.title">
        <article mode="change" :class="defaultClass.article">
            <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" loading="lazy" />
            <h3 :class="defaultClass.title">
                {{ props.title }}
            </h3>
            <p v-if='props.brief' :class="defaultClass.brief">
                <span v-html="props.brief"></span>
            </p>
        </article>
    </NuxtLink>
</template>