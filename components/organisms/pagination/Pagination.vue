<script setup lang="ts">
import type { PaginationInfo } from "@/objects";

const props = defineProps({
  payload: { type: Object as () => PaginationInfo, required: true },
});

const route = useRoute();
const router = useRouter();

const canShowPagination = computed(()=>{
  return props.payload.total > 0
})
const currPage = computed(() => props.payload.page);
const prevPage = computed(() => currPage.value - 1);
const nextPage = computed(() => currPage.value + 1);
const totalPages = computed(() =>
  Math.ceil(props.payload.total / props.payload.limit)
);
const displayPages = computed(() => {
  const pages: Array<number | string> = [];
  let prevValue = prevPage.value;
  let nextValue = nextPage.value;
  if (totalPages.value <= 3) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (prevValue < 1) {
      prevValue = 1;
      nextValue = 3;
    } else if (nextValue > totalPages.value) {
      prevValue = totalPages.value - 2;
      nextValue = totalPages.value;
    }
    for (let i = prevValue; i <= nextValue; i++) {
      pages.push(i);
    }
    if (prevValue > 1) {
      pages.unshift(1);
    }
    if (nextValue < totalPages.value) {
      pages.push(totalPages.value);
    }
  }
  return pages;
});

const emit = defineEmits(["changeEvent"]);

const perform = (page: number | string): void => {
  const pageNumber = parseInt(String(page));
  if (pageNumber !== currPage.value) {
    router.push({ query: { ...route.query, page: pageNumber } });
    emit("changeEvent", pageNumber);
  }
};

const handleFirst = (): void => {
  if (currPage.value !== 1) {
    perform(1);
  }
};

const handlePrev = (): void => {
  const prevValue = prevPage.value;
  if (prevValue > 0) {
    perform(prevValue);
  }
};

const handleNext = (): void => {
  const nextValue = nextPage.value;
  if (nextValue <= totalPages.value) {
    perform(nextValue);
  }
};

const handleLast = (): void => {
  if (currPage.value !== totalPages.value) {
    perform(totalPages.value);
  }
};

const pageInput = ref("");

const isInputValid = computed(() => {
  const pageNumber = parseInt(pageInput.value);
  return (
    !isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages.value
  );
});

const handlePageEnter = (): void => {
  const pageNumber = parseInt(pageInput.value);
  if (isInputValid.value) {
    perform(pageNumber);
    pageInput.value = "";
  }
};
</script>

<template>
  <div v-if="canShowPagination" class="flex justify-center">
    <ul class="flex justify-end gap-2">
      <li>
        <a
          href="#"
          :class="[
            'page',
            currPage <= 1
              ? 'pointer-events-none cursor-default opacity-50'
              : '',
          ]"
          @click.prevent="handleFirst"
        >
          <Icon name="ri:arrow-left-double-fill" />
        </a>
      </li>
      <li>
        <a
          href="#"
          :class="[
            'page',
            currPage <= 1
              ? 'pointer-events-none cursor-default opacity-50'
              : '',
          ]"
          @click.prevent="handlePrev"
        >
          <Icon name="ri:arrow-left-s-line" />
        </a>
      </li>
      <li v-for="page in displayPages" :key="page">
        <a
          :class="[
            'page',
            page === currPage
              ? 'bg-blue text-white pointer-events-none cursor-default'
              : '',
          ]"
          href="#"
          target="_self"
          @click.prevent="perform(page)"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          href="#"
          :class="[
            'page',
            currPage >= totalPages
              ? 'pointer-events-none cursor-default opacity-50'
              : '',
          ]"
          @click.prevent="handleNext"
        >
          <Icon name="ri:arrow-right-s-line" />
        </a>
      </li>
      <li>
        <a
          href="#"
          :class="[
            'page',
            currPage >= totalPages
              ? 'pointer-events-none cursor-default opacity-50'
              : '',
          ]"
          @click.prevent="handleLast"
        >
          <Icon name="ri:arrow-right-double-fill" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  @apply inline-block text-center transition-all duration-300 hover:(text-blue-500 border-blue-400) border-2 px-3 py-1 rounded-1;
}
</style>
