<script setup lang='ts'>
const props = defineProps<{
    title: string
    slug: string
}>()

const defaultClass = {
    article: [
        'relative', 'pl-6',
        'before:content-[""]', 'before:absolute', 'before:top-2.5', 'before:left-0', 'before:z-10',
        'before:w-2', 'before:h-2', 'before:bg-stone-400',
        'before:rounded-full',
        'hover:before:bg-blue-300', 'before:duration-300',
        'group',
    ],
    title: [
        'text-base', '2xl:text-lg', 'font-semibold',
        'group-hover:text-blue-600', 'duration-300',
    ]
}

</script>

<template>
    <NuxtLink :to="props.slug || '#!'" :title="props.title">
        <article :class="defaultClass.article">
            <h3 :class="defaultClass.title">{{ props.title }}</h3>
        </article>
    </NuxtLink>
</template>
