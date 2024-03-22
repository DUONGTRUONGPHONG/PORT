<script setup lang="ts">
const props = defineProps({
    tags: Array
})

</script>
<template>
    <section>
        <article class="mt-[8px] flex items-center mb-[0.5rem]">
            <div class="mr-[12px] text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd"
                        d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <div class="flex items-center flex-wrap gap-[8px]">
                <nuxt-link to="#" v-for="(tag, index) in props.tags" :key="index"
                    :class="tag.title ? 'inline-block' : 'hidden'"
                    class="hover:text-red-500 text-gray-400 font-medium text-[14px] py-[0.25rem] px-[0.75rem] border-solid border border-current transition duration-200 ease-in-out">
                    {{ tag.title }}
                </nuxt-link>
            </div>
        </article>
    </section>
</template>