<script setup lang="ts">
const props = defineProps<{ tags?: any[], colorWhite?: boolean }>();

</script>

<template>
    <div v-if="tags?.length" :class="colorWhite ? 'text-white' : ''"
        class="flex flex-col items-center justify-between gap-6 sm:flex-row mt-6">
        <div id="article-tags" class="flex items-center order-2 gap-4 xl:order-1">
            <CustomText text="Tags" tag="h3" class="text-xl font-semibold after:content-[':']" />
            <div class="flex items-center gap-4">
                <template v-for="(item, index) in tags" :key="index">
                    <div v-if="item.code">
                        <nuxt-link :to="{ name: 'tag-tagSlug', params:{ tagSlug: item.code } }" class="text-blue-500 hover:text-blue-600">
                        {{ item?.title }}
                    </nuxt-link>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>