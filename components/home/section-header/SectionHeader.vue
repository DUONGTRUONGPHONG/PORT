<script setup lang="ts">
interface Props {
    payload?: any
}
const props = withDefaults(defineProps<Props>(), {
    payload: {}
})
</script>
<template>
    <!-- SECTION HEADER -->
    <div class="max-w-full flex items-center justify-between mb-6 border-b border-zinc-200">
        <h2 class="mr-4 text-lg font-bold uppercase xl:text-2xl  whitespace-nowrap">
            <NuxtLink :to="utils.generateSlugWithId('/category', payload?.slug, payload?.id)"
                class="hover:text-blue-500 cursor-pointer duration-300 ease-in-out">
                <span v-html="payload?.title"></span>
            </NuxtLink>
        </h2>
        <div class="w-full overflow-x-auto">
            <div class=" whitespace-nowrap flex gap-4">
            <NuxtLink v-for="(item, i) in payload?.children" :key="i"
                :to="utils.generateSlugWithId('/category', item?.slug, item?.id)"
                class="text-xs hover:text-blue-500 cursor-pointer duration-300 ease-in-out">
                <span v-html="item.title"></span>
            </NuxtLink>
        </div>
        </div>
    </div>
    <!-- END SECTION HEADER -->
</template>