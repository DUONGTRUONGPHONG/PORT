
<script setup lang='ts'>

interface InputProps {
    thumb?: string
    title: string
    brief?: string
    slug: string
    authors?: any
    createdOn?:string 
    titleClass?: string
    textFirst?: boolean
    imageSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    textSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<InputProps>(), {
    textFirst: false,
    imageSize: 'md',
    textSize: 'md'
})

const imageSizes: Record<string, string> = {
    xs: 'lg:w-[120px]',
    sm: 'lg:w-[150px]',
    md: 'md:max-lg:w-[160px] lg:w-[240px]',
    lg: 'lg:w-[360px]',
    xl: 'lg:w-[500px]'
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
        'flex', 'flex-col md:flex-row', 'gap-4',
    ],
    thumbnail: [
        'md:rounded-sm', 'shadow-md', 'w-full', 'object-cover', 'aspect-5/3'
    ],
    title: [
        'text-xl', 'font-bold', 'px-4', 'md:px-0', textSizes[props.textSize]
    ],
    brief: [
        'hidden lg:block text-md',
        'mx-4', 'pb-4', 'lg:pb-0', 'lg:mx-0',
        'border-b', 'border-stone-400', 'lg:border-none'
    ]
}

</script>

<template>
    <NuxtLink :to="slug || '#!'" :title="title" class="block">
        <article mode="event" :class="defaultClass.article">
            <div class="aspect-5/3" :class="[textFirst ? 'order-2' : '', imageSizes[imageSize]]">
                <NuxtImg :src="thumb || '/images/default-thumbnail.jpg'" placeholder fit="cover" :class="defaultClass.thumbnail" :alt="title" loading="lazy" />
            </div>
            <div class="grid gap-2 auto-rows-max" :class="[textFirst?'order-1':'flex-1']">
                <h3 :class="defaultClass.title" v-html="title"></h3>
                <div v-if="brief" :class="defaultClass.brief" v-html="brief"></div>
                <div class="flex flex-col gap-4">
                    <div id="article-author" class="flex gap-2">
                        <!-- <img src="https://avatars.githubusercontent.com/u/89140442" loading="lazy"
                            class="w-8 h-8 rounded-full" /> -->
                        <div class="flex flex-col">
                            <!-- <span class="text-sm font-semibold [&_not(:first)]:pl-2"
                                v-for="(item, index) in authors" :key="index">
                                {{ item?.alias }}
                            </span> -->

                            <CustomText :text="utils.dateFormat(createdOn)"
                                class="xs:mt-0.5 xs:text-sm text-xs text-gray-600" tag="time" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </NuxtLink>
</template>
<style scoped lang="css">

</style>