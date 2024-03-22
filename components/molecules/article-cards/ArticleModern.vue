<script setup lang="ts">
interface Props {
    thumb: string
    title: string
    brief?: string
    slug?: string
    gradientOverlay?: string
    titleClass?: string
    aspect?: string
}
const props = withDefaults(defineProps<Props>(), {
    thumb: '',
    title: '',
    brief: '',
    slug: '',
    gradientOverlay: '',
    titleClass: '',
    aspect: 'aspect-5/3'
})

const defaultClass = {
    article: [
        'h-full', 'w-full', 'max-w-full', 'max-h-full',
        'relative', 'overflow-hidden',
        'rounded-sm', 'shadow-md',
        'after:absolute', 'after:inset-0',
        'group',
        'after:content-[""]'
    ],
    thumbnail: [
        props.aspect,
        'w-full', 'h-full',
        'object-cover',
        'group-hover:scale-[1.02]',
        'duration-500', 'ease-in-out'
    ],
    info: [
        'absolute', 'left-0', 'right-0', 'bottom-0', 'z-10',
        'p-4', 'backdrop-blur-xs',
        'grid', 'grid-rows-[max-content_0fr]',
        'group-hover:grid-rows-[max-content_1fr]',
        'duration-500', 'ease-in-out'
    ],
    title: [
        'font-bold', 'text-white',
        (!props.titleClass && props.brief) ? ['sm:text-2xl', 'md:text-xl', 'text-lg'] : null,
        props.titleClass ? props.titleClass : null,
    ],
    brief: [
        'overflow-hidden',
        'text-white',
        'group-hover:pt-3',
        'duration-500', 'ease-in-out'

    ],
    overlay: [
        'after:no-content',
        'after:bg-gradient-to-t', 'after:from-stone-800', 'after:to-transparent'
    ]
}

const articleOverlay = computed(() => props.gradientOverlay && props.gradientOverlay || defaultClass.overlay)
</script>

<template>
    <NuxtLink :to="props.slug || '#!'" :title="props.title">
        <article mode="modern" :class="[defaultClass.article, articleOverlay]">
            <div :class="[props.aspect, 'overflow-hidden w-full h-full']">
                <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" :alt="title" loading="lazy" />
            </div>

            <div :class="defaultClass.info">
                <h3 :class="defaultClass.title">
                    <span v-html="props.title"></span>
                </h3>
                <div v-if='props.brief' :class="defaultClass.brief" v-html="props.brief">
                </div>
            </div>
        </article>
    </NuxtLink>
</template>