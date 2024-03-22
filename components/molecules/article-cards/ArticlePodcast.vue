
<script setup lang='ts'>

const props = defineProps<{
    thumb: string
    title: string
    brief?: string
    slug: string
    createdOn : string
    titleClass?: string
    clampIntro?: string
}>()

const defaultClass = {
    article: [
        'group',
        'max-w-full',
        'grid', 'gap-3',
        'overflow-hidden', 
        'p-4'
    ],
    thumbnail: [
        'rounded-3xl', 'shadow-md', 'max-w-full', 'w-full', 'aspect-5/3',
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
        'border-b', 'border-stone-400', 'md:border-none',props.clampIntro
    ]
}

</script>

<template>
    <NuxtLink :to="slug || '#!'" :title="title">
        <article mode="basic" :class="defaultClass.article">
            <div class="rounded-sm overflow-hidden relative">
                <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" loading="lazy" />
                <div class="absolute bottom-2 left-0 bg-stone-200/[.56] h-10 flex justify-center items-center w-20 rounded-full">
                        <span class="icon">
                            <svg width="30" height="30" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0131 0.5C5.38869 0.5 0 5.88331 0 12.5C0 19.1167 5.38869 24.5 12.0131 24.5C18.6376 24.5 24.0263 19.1167 24.0263 12.5C24.0263 5.88331 18.6376 0.5 12.0131 0.5ZM16.7889 12.9204L9.78122 17.4204C9.6991 17.4736 9.60426 17.5 9.51041 17.5C9.42829 17.5 9.34518 17.4795 9.2709 17.439C9.10957 17.3511 9.00985 17.1831 9.00985 17V8C9.00985 7.81691 9.10957 7.64891 9.2709 7.56102C9.42927 7.47411 9.62773 7.47945 9.78122 7.57958L16.7889 12.0796C16.9316 12.1714 17.0186 12.3301 17.0186 12.5C17.0186 12.6699 16.9316 12.8286 16.7889 12.9204Z" fill="#FF0000"></path>
                            </svg>
                        </span>
                            <!-- Nghe tập này -->
                </div>
            </div>
            <CustomText :text="utils.dateFormat(createdOn)" class="xs:mt-0.5 xs:text-sm text-sm" tag="time" />
            <h3 :class="defaultClass.title" v-html="title"></h3>
            <div v-if='brief' :class="defaultClass.brief" v-html="brief"> </div>
        </article>
    </NuxtLink>
</template>