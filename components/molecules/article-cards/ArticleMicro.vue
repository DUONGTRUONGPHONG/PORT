<script setup lang="ts">

const props = defineProps<{
    mode?: string
    thumb: string
    title: string
    slug: string
}>()

const defaultClass = {
    article: [
        'grid', 'grid-cols-2', 'gap-4', 'items-center',
        'h-24',
    ],
    thumbnailContainer: [
        'max-h-full',
        'grid', 'place-items-center',
        'shadow',
    ],
    thumbnail: [
        'w-full', 'h-24', 'rounded-sm',
    ],
    title: [
        'text-base', 'font-bold',
    ]
}


</script>
<template>
    <NuxtLink :to="props.slug || '#!'" :title="props.title">
        <article mode="micro" :class="defaultClass.article">
            <div :class="defaultClass.thumbnailContainer">
                <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" loading="lazy" />
            </div>
            <h3 :class="defaultClass.title">
                {{ props.title }}
            </h3>
        </article>
    </NuxtLink>
</template>