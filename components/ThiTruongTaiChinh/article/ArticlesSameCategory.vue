<script setup>
const props = defineProps({
    articles: Array
})

</script>
<template>
    <section class="xl:mb-[1.5rem] mb-[1rem]">
        <header class="relative justify-start xl:mb-[1rem] mb-[0.75rem] flex-row items-center flex-wrap flex">
            <h2 class="mb-0 xl:text-[1.5rem] text-[1.25rem] leading-[1] relative font-semibold">
                <a href="#" class="font-playfair-display pr-[1rem] bg-white block relative z-1 text-red-500">Tin cùng chuyên mục</a>
            </h2>
            <div class="absolute block w-full bottom-0 h-[4px] bg-red-500" />
        </header>
        <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            <div v-for="article, index in props.articles" :key="index">
                <Article :mode="'tttc'" :article="article" />
            </div>
        </div>
    </section>
</template>