<script setup lang="ts">
const props = withDefaults(defineProps<{
    message?:string
}>(),{
    message:''
})
</script>

<template>
  <div class="mx-auto text-center">
    {{ message }}
  </div>
</template>