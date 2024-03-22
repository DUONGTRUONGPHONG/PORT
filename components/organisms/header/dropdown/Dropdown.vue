<script setup lang='ts'>
import { storeToRefs } from 'pinia';

const props = defineProps<{
    menuItems?: any[]
}>()

const layoutstore = useLayoutStore()
const { megaMenuActive } = storeToRefs(layoutstore)
const computedClass = computed(() => megaMenuActive.value ? 'text-neutral-400' : undefined)

const menu = computed(() => props.menuItems?.slice(0, 13) ?? [])

</script>

<template>
    <li v-for="(item, i) in menu" :key="i" :class="[{ 'relative group menu-item': item.children }, { 'xl:max-2xl:hidden': i > 12 },]">
        <NuxtLink :to="utils.generateSlugWithId('/category', item?.slug, item?.id)" class="duration-300 hover:text-blue-600 text-sm  py-2 block" :class="computedClass">
            {{ item.title }}
        </NuxtLink>
        <ul v-if="item.children.length" class="absolute bottom-0 left-0 z-10 grid gap-4 p-4 duration-300 text-sm  translate-y-full bg-white border-t border-blue-600 rounded-b-sm shadow-lg opacity-0 pointer-events-none isolate group-hover:pointer-events-auto group-hover:opacity-100">
            <Dropdown :menuItems="item.children" v-if="item.children" />
        </ul>
    </li>
</template>
<style></style>