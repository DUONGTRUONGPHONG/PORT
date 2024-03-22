
<script setup lang='ts'>

interface InputProps {
    createdOn?: string
    category?: string
    thumb?: string
    title: string
    brief?: string
    slug: string
    titleClass?: string
    textFirst?: boolean
    hyphenNone?: boolean
    imageSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<InputProps>(), {
    textFirst: false,
    imageSize: 'md',
    textSize: 'md'
})

const imageSizes: Record<string, string> = {
    xs: 'md:w-[80px] lg:w-[120px] xl:w-[100px]',
    sm: 'md:w-[120px] lg:w-[150px] xl:w-[120px]',
    md: 'md:w-[180px] lg:w-[240px] xl:w-[200px]',
    lg: 'md:w-[3000px] lg:w-[360px] xl:w-[300px',
    xl: 'md:w-[400px] lg:w-[500px] xl:w-[400px]'
}

const textSizes: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
}

const defaultClass = {
    article: [
        'max-w-full', 'w-full',
        'flex', 'gap-4 flex-wrap',
    ],
    thumbnail: [
        'md:rounded-sm', 'shadow-md', 'w-full', 'h-full', 'object-cover',
    ],
    title: [
        'font-bold', 'px-4', 'md:px-0', 'text-start', textSizes[props.textSize]
    ],
    brief: [
        'text-sm',
        'mx-4', 'pb-4', 'md:pb-0', 'md:mx-0',
        'border-b', 'border-stone-400', 'md:border-none', 'line-clamp-9',
    ]
}

</script>

<template>
    <NuxtLink :to="slug || '#!'" :title="title" class="block">
        <article mode="basicHorizontal" :class="defaultClass.article">
            <div class="aspect-5/3" :class="[imageSizes[imageSize]]">
                <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover"
                    :class="defaultClass.thumbnail" loading="lazy" />
            </div>
            <div class="flex-1">
                <h3 :class="defaultClass.title" v-html="title"></h3>
                <div v-if="brief" :class="defaultClass.brief" v-html="brief"></div>
                <div class="flex flex-wrap gap-2 mt-2 justify-start items-center">
                    <NuxtLink :to="'/' + category">
                        <span class="text-sm text-primary-100 font-semibold">{{ category }}</span>
                    </NuxtLink>
                    <span class="text-sm hidden sm:inline-block" :class="{ '!hidden': hyphenNone || !createdOn }">-</span>
                    <span class="text-sm" v-if="createdOn">{{ utils.dateFormat(createdOn) }}</span>
                </div>
            </div>
        </article>
    </NuxtLink>
</template>