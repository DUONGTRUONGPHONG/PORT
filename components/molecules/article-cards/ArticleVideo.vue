
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
        'rounded-sm', 'shadow-md', 'max-w-full', 'w-full', 'object-cover', 'aspect-5/3',
        'group-hover:scale-[1.05]',
        'duration-500', 'ease-in-out'
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
        'border-b', 'border-stone-400', 'md:border-none'
    ]
}

const videoDuration = ref(0)


function onVideoLoad(e: any) {
    // Lấy độ dài video từ thuộc tính duration của video element
    videoDuration.value = e.duration;
}

</script>

<template>
    <NuxtLink :to="slug || '#!'" :title="title">
        <article mode="basic" :class="defaultClass.article">
            <div class="rounded-sm overflow-hidden">
                <img :class="defaultClass.thumbnail" :src="thumb  || '/images/default-thumbnail.jpg'" draggable="false" style="border-top-left-radius: 10%; border-bottom-right-radius: 10%;" />
            </div>
            <h3 :class="defaultClass.title" v-html="title"></h3>
            <div v-if='brief' :class="defaultClass.brief" v-html="brief"> </div>
        </article>
    </NuxtLink>
</template>