import { defineStore, acceptHMRUpdate } from "pinia";

export const useLayoutStore = defineStore("layout", () => {
  const megaMenuActive = ref<boolean>(false);
  function setStatus(status: boolean) {
    megaMenuActive.value = status;
  }
  return { megaMenuActive, setStatus };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}
