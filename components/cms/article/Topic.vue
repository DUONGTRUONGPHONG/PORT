<script setup lang="ts">
const props = defineProps<{topics?: any[], colorWhite?: boolean}>()
console.log(props.topics)
</script>
<template>
    <div v-if="topics?.length" :class="colorWhite ? 'text-white': ''" class="flex flex-col items-center justify-between gap-6 sm:flex-row mt-6">
        <div id="article-tags" class="flex items-center order-2 gap-4 xl:order-1">
            <CustomText text="Topics" tag="h3" class="text-xl font-semibold after:content-[':']" />
            <div class="flex items-center gap-4">
                <NuxtLink v-for="(item, index) in topics" :key="index" :to="{ name:'topic-topicSlug', params:{ topicSlug: item.code } }" class="text-blue-500 hover:text-blue-600">
                    {{ item?.title }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>