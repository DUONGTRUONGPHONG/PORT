<script setup lang="ts">

const emit = defineEmits<{
  change: [value:Event]
}>()

const uid = utils.uid()

const onChangeFile = (e: Event) => {
  emit('change', e);

}
</script>

<template>
  <div>
    <label :for="uid">
        <Icon name="solar:camera-broken" class="cursor-pointer" />
    </label>
    <input type="file" :id="uid" class="hidden" @change="onChangeFile"/>
  </div>
</template>