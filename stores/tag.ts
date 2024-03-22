import { defineStore, acceptHMRUpdate } from "pinia";

export const useTagStore = defineStore("tag", () => {
  const tag = ref<any>();
  const title = ref<any>();
  return { tag, title };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}
