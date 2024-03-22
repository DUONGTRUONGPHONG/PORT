<script lang="ts" setup>

const show = ref(false)

// scroll to top
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
onMounted(() => {
    // listen to scroll event, if scrollY > 1000, show the button
    const handleScroll = () => {
        const scrollY = window.scrollY
        if (scrollY > 1000) {
            show.value = true
        } else {
            show.value = false
        }
    }
    useEventListener('scroll', handleScroll)
})
</script>

<template>
    <div v-if="show" class="fixed bottom-4 right-4 z-50">
        <button @click="scrollToTop" class="p-2 bg-white rounded-full shadow-md">
            <Icon name="carbon:arrow-up" class="w-6 h-6 text-slate-9" />
        </button>
    </div>
</template>