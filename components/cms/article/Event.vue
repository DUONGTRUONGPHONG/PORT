<script setup lang="ts">
const props = defineProps<{ events: any[], colorWhite: boolean }>()
</script>

<template>
    <div v-if="events?.length" :class="colorWhite ? 'text-white' : ''" class="mt-6">
        <CustomText text="Sự kiện" tag="h3" class="text-xl font-semibold after:content-[':']" />
        <ul class="flex flex-col gap-2 list-disc ml-4 my-2 pl-3">
            <li v-for="(event, index) in events" :key="index" class="font-semibold text-primary-100">
                <nuxt-link :to="{ name: 'event-eventSlug', params: { eventSlug: event.code } }">{{ event.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>