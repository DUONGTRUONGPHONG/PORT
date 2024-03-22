<script setup lang='ts'>
const props = defineProps<{
    menuItem?: any
}>()

const computedClass = computed(() => {
    if (!props.menuItem?.parentId) return [
        'text-lg', 'font-bold', 'text-blue-500',
        'hover:underline', 'hover:underline-offset-2'
    ]
    else return 'hover:text-blue-600'
})
</script>

<template>
    <li :class="menuItem?.slug" class="text-sm">
        <NuxtLink :to="utils.generateSlugWithId('/', menuItem?.slug, menuItem?.id)" :class="computedClass" class="duration-300">
            {{ menuItem.title }}
        </NuxtLink>
        <ul v-if="menuItem?.children" class="grid gap-4 mt-2">
            <MegaItem v-for="(childItem, index) in menuItem?.children" :key="index" :menu-item="childItem" />
        </ul>
    </li>
</template>