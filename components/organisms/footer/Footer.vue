<script setup lang="ts">
import { storeToRefs } from "pinia";

const props = defineProps<{
  payload?: any[];
}>();
const categoryStore = useCategoryStore();
const { tree } = storeToRefs(categoryStore);
</script>
<template>
  <footer class="border-t bg-white">
    <div id="footer-desktop" class="px-4 mx-auto max-w-7xl 2xl:px-0 pt-4">
      <div class="grid gap-4 font-semibold md:grid-cols-12 text-sm mb-2">
        <div class="col-span-8">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="(item, index) in tree" :key="index" class="mb-4 hover-underline list-none">
              <NuxtLink :to="utils.generateSlugWithId('/category', item?.slug, item?.id)">
                {{ item.title }}
              </NuxtLink>
            </li>
          </div>
        </div>
        <div class="col-span-4 grid gap-4 sm:border-l sm:pl-4 auto-rows-max">
          <div>
            <p class="mb-2 uppercase text-xl font-bold">Liên hệ</p>
            <div class="flex flex-col gap-3 whitespace-nowrap">
              <div class="flex items-center max-w-full gap-2">
                <Icon name="fa6-solid:building" />
                <span class="text-sm hover-underline" title="Trụ sở chính: T.5 93A, Thụy Khuê, TP.Hà Nội">Toà Soạn</span>
              </div>
              <div class="flex items-center max-w-full gap-2">
                <Icon name="fa6-solid:envelope" />
                <a href="mailto:ktdtonline@gmail.com" class="text-sm hover-underline">
                  contact@vpress.vn
                </a>
              </div>
              <div class="flex items-center max-w-full gap-2">
                <Icon name="fa6-solid:handshake" />
                <span class="text-sm">Hợp tác bản quyền</span>
              </div>
            </div>
          </div>
          <div>
            <p class="mb-2 text-neutral-500">Đường dây nóng</p>
            <div class="flex flex-col lg:(flex-row justify-between)">
              <div class="flex flex-col">
                <span class="text-lg font-bold tracking-wide">0123456789</span>
                <p class="text-sm text-neutral-500">(Hà Nội)</p>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-bold tracking-wide">0123456789</span>
                <p class="text-sm text-neutral-500">(Hồ Chí Minh)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="flex flex-col items-center justify-between gap-4 my-2 sm:flex-row">
        <div class="flex items-center justify-center sm:order-1">
          <span>Hệ thống đang chạy thử nghiệm</span>
        </div>
        <div class="flex items-center justify-center gap-4 sm:order-3">
          <a href="https://www.facebook.com" title="Theo dõi chúng tôi trên facebook" class="grid duration-300 border rounded-full w-9 h-9 border-neutral-200 text-neutral-500 place-items-center hover:bg-blue-500 hover:text-white hover:border-blue-500">
            <Icon name="fa6-brands:facebook-f" />
          </a>
          <a href="https://www.youtube.com" title="Theo dõi chúng tôi trên youtube" class="grid duration-300 border rounded-full w-9 h-9 border-neutral-200 text-neutral-500 place-items-center hover:bg-black hover:text-white hover:border-black">
            <Icon name="ion:logo-youtube" />
          </a>
          <a href="https://www.tiktok.com" title="Theo dõi chúng tôi trên tiktok" class="grid border rounded-full w-9 h-9 border-neutral-200 text-neutral-500 place-items-center hover:bg-black hover:text-white hover:border-black">
            <Icon name="fa6-brands:tiktok" />
          </a>
        </div>
        <div class="flex items-center justify-center gap-4 sm:ml-auto sm:order-2">
          <a href="#!" class="text-sm lg:text-base text-neutral-500">RSS</a>
        </div>
      </div>
      <hr />
    </div>
  </footer>
</template>
