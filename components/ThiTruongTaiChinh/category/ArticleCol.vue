<template>
    <article class="group" :class="{ [`min-w-[${minWidth}]`]: minWidth }">
        <figure class="overflow-hidden max-h-[380px] mb-2 rounded-lg">
            <nuxt-link to="#">
                <img alt="" class="w-full h-full object-cover" src="/images/1600x900a.jpg">
            </nuxt-link>
        </figure>
        <header class="">
            <h3 class="text-[1.1rem] leading-[1.3] font-playfair group-hover:text-[#ff0018]">
                <nuxt-link to="#">Liên tiếp các chính sách về thuế, phí, lệ phí hỗ trợ người dân,
                    doanh nghiệp</nuxt-link>
            </h3>
            <div class="text-[13px] opacity-50 my-2">
                <time datetime="2011-01-12">dayjs(inputDateTime).format('MMMM Do, YYYY')</time>
            </div>
        </header>
    </article>
</template>
<script setup>
const props = defineProps(['minWidth'])

</script>