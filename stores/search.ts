import { defineStore, acceptHMRUpdate } from "pinia";

export const useSearchStore = defineStore("search", () => {
  
  const keyword = ref<string>('');

  return { keyword };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot));
}
