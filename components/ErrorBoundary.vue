<script setup lang="ts">
const error = ref<Error>()

async function clearError() {
    await navigateTo('/')
    error.value = undefined
}

onMounted(() => {
    onErrorCaptured(err => {
        error.value = err
        return false
    })
})

const route = useRoute()
watch(
    () => route.fullPath,
    () => {
        error.value = undefined
    },
)
</script>

<template>
    <slot v-if="!error" />
    <slot v-else name="error" :error="error" :clear-error="clearError" />
</template>