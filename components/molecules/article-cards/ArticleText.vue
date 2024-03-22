<script setup lang='ts'>
const props = defineProps<{
    title: string
    slug: string
    brief?: string
    introClamp?: string
}>()

const defaultClass = {
    article: [
        'grid', 'items-center',
        props.brief ? 'pt-6' : [
            'pb-4',
            'border-b-2', 'border-b-stone-100'
        ],
        'group',
    ],
    title: [
        'text-sm', 'lg:text-base', 'font-bold',
        { 'mb-3 text-xl': props.brief },
        'group-hover:text-blue-600', 'duration-300'
    ],
    brief:[props.introClamp]
}
</script>

<template>
    <NuxtLink :to="slug || '#!'" :title="title">
        <article :class="defaultClass.article">
            <h3 :class="defaultClass.title" v-html="title">
            </h3>
            <div v-if="brief" v-html="brief" :class="defaultClass.brief">
            </div>
        </article>
    </NuxtLink>
</template>
