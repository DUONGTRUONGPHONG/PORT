<script setup lang="ts">
const { data } = useAuth()
const props = defineProps<{
  class?: string;
  image?: string;
  name?: string;
}>();
const { serverResourceUrl } = useRuntimeConfig().public

const imageUrl = computed<string | undefined>(() => {
  if (!props.image) return undefined
  if (utils.isExternalUrl(props.image)) return props.image
  return `${serverResourceUrl}${props.image}`
})
</script>

<template>
  <client-only v-if="imageUrl">
    <NuxtImg :src="imageUrl" alt="" preset="avatar" :class="cn('rounded-full h-[36px] w-[36px]', props.class)" />
  </client-only>
  <div v-else
    :class="cn('h-[36px] w-[36px] rounded-full bg-blue text-center text-white font-normal uppercase text-[18px]', props.class)">
    {{ name?.charAt(0) }}
  </div>
</template>