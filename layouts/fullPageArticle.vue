<script setup lang="ts">
const layoutstore = useLayoutStore();
const { megaMenuActive } = storeToRefs(layoutstore);
</script>

<template>
    <Body class="bg-[#fcfaf6] antialiased text-slate-9">
        <div class="flex items-center gap-3 justify-center">
            <NuxtLink class="xl:-mt-6px inline-block" to="/">
                <Icon name="carbon:home" />
            </NuxtLink>
            <TopNavigation />
            <div class="block pl-4 xl:hidden">
                    <button type="button" v-show="!megaMenuActive" @click="layoutstore.setStatus(true)"
                        class="duration-300 hover:text-blue-500 bg-transparent">
                        <Icon name="fa6-solid:bars" />
                    </button>
                    <button type="button" v-show="megaMenuActive" @click="layoutstore.setStatus(false)"
                        class="duration-300 hover:text-red-500 bg-transparent">
                        <Icon name="fa6-solid:xmark" />
                    </button>
                </div>
        </div>
        <Teleport to="body">
            <MegaV2 />
        </Teleport>
        <slot />
    </Body>
</template>
