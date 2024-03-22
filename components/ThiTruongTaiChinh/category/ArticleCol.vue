<template>
    <article class="group" :class="{ [`min-w-[${minWidth}]`]: minWidth }">
        <figure class="overflow-hidden max-h-[380px] mb-2 rounded-lg">
            <nuxt-link :to="`/${category?.category?.code}/${category?.code}`">
                <img alt="" class="w-full h-full object-cover" :src="category?.thumbnail">
            </nuxt-link>
        </figure>
        <header class="">
            <h3 class="text-[1.1rem] leading-[1.3] font-playfair group-hover:text-[#ff0018]">
                <nuxt-link :to="`/${category?.category?.code}/${category?.code}`">{{category?.title}}</nuxt-link>
            </h3>
            <div class="text-[13px] opacity-50 my-2">
                <time datetime="2011-01-12">{{dayjs(category?.createdOn).format('MMMM Do, YYYY')}}</time>
            </div>
        </header>
    </article>
</template>
<script setup>
import dayjs from 'dayjs';

const props = defineProps(['minWidth','category'])

</script>