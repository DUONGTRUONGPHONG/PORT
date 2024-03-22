<template>
  <Wrap>
    <div class="flex">
      <Button @click="handleTest" label="Test" />
    </div>
  </Wrap>
</template>

<script setup lang='ts'>

const handleTest = async () => {
  await navigateTo('/v/abc-500')
  
}
</script>