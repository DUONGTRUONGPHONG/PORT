<script setup lang="ts">
const currentDateTime = ref<string>("");
onMounted(() => {
  setInterval(() => {
    let t = new Date()
    currentDateTime.value = utils.dateFormat(t, "dddd, DD/MM/YYYY")
  }
  , 1000);
});
</script>

<template>
  <div class="flex items-center text-sm whitespace-nowrap">
    <Icon name="fa6-regular:clock" />
    <span class="inline-block text-16px leading-normal ml-1">{{ currentDateTime }}</span>
  </div>
</template>
