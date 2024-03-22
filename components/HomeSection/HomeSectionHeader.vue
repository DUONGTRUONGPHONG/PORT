<script setup lang="ts">
const props = defineProps<{
    categories: any[]
}>()
</script>
<template>
    <div class="flex items-center gap-4 mb-4">
        <template v-for="(c, i) in (props.categories || [])" :key="i">
            <NuxtLink :to="'/' + c?.code">
                <h3 class="uppercase" :class="{ 'text-2xl font-bold text-primary-100': i === 0 }">
                    {{ c?.title }}
                </h3>
            </NuxtLink>
        </template>
    </div>
</template>
