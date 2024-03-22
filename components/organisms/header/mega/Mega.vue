<script setup lang="ts">
import MegaItem from "./MegaItem.vue";
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";

const props = defineProps<{
  menuItems?: any;
}>();
const router = useRouter();
const layoutstore = useLayoutStore();
const { megaMenuActive } = storeToRefs(layoutstore);
const megaMenuEl = ref<HTMLElement>();
const q = ref("");

const computedClass = computed(() =>
  megaMenuActive.value
    ? ["opacity-100", "pointer-events-auto"]
    : ["opacity-0", "pointer-events-none"]
);
const fetchQuery = () => {
  router.push(`/tim-kiem/${q.value}`);
  megaMenuActive.value = false;
};

onMounted(() => {
  onClickOutside(megaMenuEl, () =>
    megaMenuActive.value ? (megaMenuActive.value = false) : null
  );
  const links = megaMenuEl.value?.querySelectorAll<HTMLAnchorElement>("a");
  links?.forEach((link) => {
    useEventListener(link, "click", (event) => {
      layoutstore.setStatus(false);
    });
  });

  useEventListener(document, "keydown", (event) => {
    if (event.key === "Escape" && megaMenuActive.value) {
      layoutstore.setStatus(false);
    }
  });
});

watch(
  () => megaMenuActive.value,
  (newVal) =>
    newVal
      ? (document.body.style.overflow = "hidden")
      : document.body.removeAttribute("style")
);
</script>

<template>
  <div
    ref="megaMenuEl"
    id="mega-menu"
    :class="computedClass"
    class="fixed inset-0 h-full z-50 overflow-hidden duration-300 bg-neutral-50"
  >
    <div
      class="overflow-y-auto h-full max-h-full flex flex-col gap-y-4 mx-auto p-6"
    >
      <div class="grid col-span-2 gap-2">
        <div class="flex justify-between">
          <span class="text-xl font-bold text-neutral-600"
            >Tất cả chuyên mục</span
          >
          <button
            @click="layoutstore.setStatus(false)"
            class="flex items-center gap-1 duration-300 hover:text-red-500"
          >
            <span>Đóng lại</span>
            <!-- <Icon icon="mi:close" class="text-xl" /> -->
          </button>
        </div>
      </div>
      <div class="flex items-center w-full pt-4">
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
      </div>

      <ul
        id="mega-list"
        class="flex-1 md:grid w-full h-full max-h-full md:grid-cols-4 pb-12 mx-auto overflow-y-auto invisible-scrollbar md:gap-y-8 md:gap-x-6"
        data-lenis-prevent
      >
        <MegaItem
          v-for="(item, i) in props.menuItems"
          :key="i"
          :menuItem="item"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
#mega-menu
    max-height: 100vh
    min-height: 100vh

#mega-list
    max-height: 100vh
</style>
