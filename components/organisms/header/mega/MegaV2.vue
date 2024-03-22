<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useNavigationStoreV2 } from '~/stores/v2/navigation';
import {storeToRefs} from "pinia";
import { vInterpolate } from '~/directives/v-interpolate';
import * as cherrio from 'cheerio'

const router = useRouter();
const route = useRoute();
const v2NavigationStore = useNavigationStoreV2()
const layoutstore = useLayoutStore();

const { megaMenuActive } = storeToRefs(layoutstore);
const {topMenu} = storeToRefs(v2NavigationStore)

const megaMenuEl = ref<HTMLElement>();
const q = ref("");

const computedClass = computed(() =>
  megaMenuActive.value
    ? ["opacity-100", "pointer-events-auto"]
    : ["opacity-0", "pointer-events-none"]
);
// const fetchQuery = () => {
//   router.push(`/tim-kiem/${q.value}`);
//   megaMenuActive.value = false;
// };

const $ = cherrio.load(topMenu.value)

const html = $('.parent').addClass('xl:(flex items-center justify-center)')
html.find('>li').addClass('xl:(relative group xl:mr-3) hover:bg-[#e6f4ff] py-3 px-6 rounded-md')
html.find('ul').addClass('pl-4 hidden xl:(gap-0 w-200px shadow group-hover:(block absolute top-full left-0 bg-white z-50))')
html.find('>li>a').addClass('xl:(block py-4 hover:(text-blue))')
html.find('>li>ul>li>a').addClass('xl:(block py-10px px-15px hover:(bg-blue text-white))')

// onMounted(() => {
//   onClickOutside(megaMenuEl, () =>
//     megaMenuActive.value ? (megaMenuActive.value = false) : null
//   ); 

//   useEventListener(document, "keydown", (event) => {
//     if (event.key === "Escape" && megaMenuActive.value) {
//       layoutstore.setStatus(false);
//     }
//   });

//   watch(()=>route.path, ()=>{    
//     layoutstore.setStatus(false);    
//   })
// });

// watch(
//   () => megaMenuActive.value,
//   (newVal) =>
//     newVal
//       ? (document.body.style.overflow = "hidden")
//       : document.body.removeAttribute("style")
// );
</script>

<template>
  <!-- <div
    ref="megaMenuEl"
    id="mega-menu"
    :class="computedClass"
    
  >
  class="custom-class fixed inset-0 h-full z-50 overflow-hidden duration-300 bg-neutral-50 computedClass "
  </div> -->
  
  <a-drawer
    v-model:open="megaMenuActive"
    class="custom-class"
    root-class-name="root-class-name"
    title="Tất cả chuyên mục"
    placement="right"
    :bodyStyle="{padding:0}"
  >
  <div
      class=" h-full max-h-full flex flex-col gap-y-4 mx-auto"
    >
      <!-- <div class="grid col-span-2 gap-2">
        <div class="flex justify-between">
          <span class="text-xl font-bold text-neutral-600"
            ></span
          >
          <button
            @click="layoutstore.setStatus(false)"
            class="flex items-center gap-1 duration-300 hover:text-red-500 bg-transparent"
          >
            <span>Đóng lại</span>
            <Icon icon="mi:close" class="text-xl" />
          </button>
        </div>
      </div> -->
      <!-- <div class="flex items-center w-full pt-4">
        <input
          type="text"
          v-model="q"
          class="inline-block w-full border-y border-l rounded-s-md px-3 py-2 border-neutral-500"
          @keyup.enter="fetchQuery"
        />
        <p
          class="border-y border-r px-3 py-2 rounded-e-md inline-block border-neutral-500"
        >
          <Icon
            v-if="megaMenuActive"
            name="gg:search"
            size="18"
            @click="fetchQuery"
          />
        </p>
      </div> -->

      <div id="mega-menu" v-interpolate v-html="html"></div>
    </div>
  </a-drawer>
</template>

<style lang="sass" scoped>
#mega-menu
    max-height: 100vh
    min-height: 100vh

#mega-list
    max-height: 100vh
</style>
