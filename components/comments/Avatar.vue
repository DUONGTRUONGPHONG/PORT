<script setup lang="ts">
export type Avatar = {
    id?: number,
    userName?: string,
    avatar?: string,
}
const props = defineProps<{payload: Avatar}>()

const {serverResourceUrl} = useRuntimeConfig().public

const imageUrl = computed<string | undefined>(() => {
  if(!props.payload.avatar) return undefined
  if(utils.isExternalUrl(props.payload.avatar)) return props.payload.avatar
  return `${serverResourceUrl}${props.payload.avatar}`
})
</script>

<template>
    <NuxtLink :to="`/users/feed/${payload?.id}`"
        class="h-36px w-36px rounded-full bg-[#E5E5E5] leading-36px text-center text-[#949494] font-400 uppercase text-18px">
        <NuxtImg v-if="imageUrl" :src="imageUrl" alt="" preset="avatar" class="rounded-full h-36px w-36px" />
        <template v-else>
            {{ payload?.userName?.[0] }}
        </template>
    </NuxtLink>
</template>