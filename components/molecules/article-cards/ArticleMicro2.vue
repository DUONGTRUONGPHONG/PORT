<script setup lang="ts">

const props = defineProps<{
    mode?: string
    thumb: string
    title: string
    slug: string
    brief: string
}>()

const defaultClass = {
    article: [
        'w-full'
    ],
    thumbnailContainer: [
        'max-h-full', 'w-3/4',
        'grid', 'place-items-center',
        'shadow',
    ],
    thumbnail: [
        'object-cover', 'w-full', 'h-full', 'rounded-sm',
    ],
    title: [
        'xl:text-lg', 'text-base', 'font-bold', 'col-span-2', 'mb-3'
    ],
    brief: [
        'w-full'
    ]
}


</script>
<template>
    <NuxtLink :to="props.slug || '#!'" :title="props.title">
        <article mode="micro" :class="defaultClass.article">
            <h3 :class="defaultClass.title">{{ props.title }}</h3>
            <div class="flex gap-4">
                <div :class="defaultClass.thumbnailContainer">
                    <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" loading="lazy" />
                </div>
                <p :class="defaultClass.brief">
                    <span v-html="props.brief"></span>
                </p>
            </div>

        </article>
    </NuxtLink>
</template>