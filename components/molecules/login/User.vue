<script setup lang="ts">
import { useProfileStore } from '~/stores/v2/profile';

const v2ProfileStore = useProfileStore()
const {profile} = storeToRefs(v2ProfileStore)
</script>

<template>
  <!-- <HeadlessMenu as="div" class="relative inline-block text-left">
      <div class="flex">
        <HeadlessMenuButton
          class="inline-flex w-full justify-center rounded-full hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <Avatar class="leading-[36px]" position="dropdown" :image="profile?.avatar" :name="profile?.alias" />
        </HeadlessMenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <HeadlessMenuItems
          class="absolute z-50 right-0 mt-2 min-w-260px origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
         <UserMenu group="self" position="dropdown" />
        </HeadlessMenuItems>
      </transition>
    </HeadlessMenu> -->
    <a-dropdown placement="bottomRight">
      <div>
        <Avatar class="leading-[36px]" position="dropdown" :image="profile?.avatar || '/images/default-thumbnail.jpg'" :name="profile?.alias" />
      </div>
      <template #overlay>
        <UserMenu group="self" position="dropdown" />
      </template>
    </a-dropdown>
</template>
