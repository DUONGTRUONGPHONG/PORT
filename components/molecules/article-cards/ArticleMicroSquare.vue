<script setup lang='ts'>
const props = defineProps<{
    thumb: string
    title: string
    slug: string
}>()

const defaultClass = {
    article: [
        'flex', 'items-center', 'space-x-4'
    ],
    thumbnail: [
        'object-cover', 'h-28', 'w-28', 'aspect-square',
        'rounded-sm', 'shadow-sm'
    ],
    title: [
        'text-base', 'lg:text-lg', 'font-semibold'
    ]
}
</script>

<template>
    <NuxtLink :to="props.slug || '#!'" :title="props.title">
        <article mode="micro-dot" :class="defaultClass.article">
            <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" loading="lazy" />
            <h3 :class="defaultClass.title">{{ props.title }}</h3>
        </article>
    </NuxtLink>
</template>

