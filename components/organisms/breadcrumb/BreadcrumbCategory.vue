<script setup lang="ts">
import { useCategoryStoreV2 } from '~/stores/v2/category';

const props = defineProps<{
    category?: any
}>()

const v2CategoryStore = useCategoryStoreV2()
const subtree = v2CategoryStore.findSubTree(props.category)

const parent = computed(() => {
    return subtree[0]
})

const children = computed(() => {
    return subtree.slice(1)
})
</script>

<template>
    <div class="overflow-hidden">
        <div id="breadcrumb" class="flex items-center gap-2  whitespace-nowrap">
            <div class="text-base font-bold">
                <NuxtLink :to="'/' + parent?.code"
                    :class="{ 'text-blue': category?.id === parent?.id }">
                    {{ parent?.title }}
                </NuxtLink>
            </div>
            <ol class="flex gap-2 text-xs ms-3 font-bold overflow-x-auto">
                <li v-for="(item, index) in children" :key="index">
                    <NuxtLink :to="'/' +item?.code"
                        :class="{ 'text-blue': category?.id === item?.id }">
                        {{ item?.title }}
                    </NuxtLink>
                </li>
            </ol>
        </div>
    </div>
</template>