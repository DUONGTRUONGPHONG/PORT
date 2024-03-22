<template>
    id của poll đây nè {{ props.pollId }}
    <p>{{ test }}</p>
</template>

<script setup lang='ts'>
const props = defineProps<{
    pollId?: string | number
}>()
const test = ref('')
setTimeout(() => {
    test.value = 'Test'
}, 3000);
</script>

<style scoped lang='scss'>
</style>