<script setup lang="ts">
import type { Category } from '~/server/models/v2/category';
import { useCategoryStoreV2 } from '~/stores/v2/category';

const props = defineProps<{ article: any; category: any }>();

const v2CategoryStore = useCategoryStoreV2();
const subTree = v2CategoryStore.findParents(props.category)

// const categorySlug = ()=>{
//   let slug = ''
//   subTree.slice(1).forEach((item: Category) => {
//     slug += `/${item.code}`
//   });
//   console.log(subTree)
//   return `/category${slug}`
// }

function copyUrl() {
  const urlToCopy = window.location.href;

  // Sử dụng Clipboard API
  navigator.clipboard
    .writeText(urlToCopy)
    .then(() => {
      alert("URL đã được sao chép vào bảng ghi tạm");
    })
    .catch((err) => {
      console.error(err);
    });
}

const defaultClasses = "grid w-12 h-12 bg-white border rounded-full shadow place-items-center hover:text-blue-600"
</script>
<template>
  <div
    class="flex flex-wrap items-center justify-between md:flex-row"
  >
    <div class="flex items-center gap-4">
      <NuxtLink
        title="Quay trở lại"
        :to="{ name: 'category', params: { category: category.code } }"
        :class="defaultClasses"
      >
        <Icon name="fa6-solid:arrow-left" />
      </NuxtLink>
      <button
        class="defaultClasses"
      >
        <Icon name="fa6-regular:bookmark" />
      </button>
    </div>

    <div class="flex items-center gap-4">
      <button
        title="Copy link"
        :class="[defaultClasses, 'text-2xl']"
        @click="copyUrl"
      >
        <Icon name="bi:link-45deg" />
      </button>
      
    </div>
  </div>
</template>
