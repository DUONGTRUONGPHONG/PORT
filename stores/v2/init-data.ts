import { defineStore, acceptHMRUpdate } from "pinia";
import { useCategoryStoreV2 } from "./category";
import { useNavigationStoreV2 } from "./navigation";
import { useProfileStore } from "./profile";

export const useInitDataStore = defineStore("init-data", () => {
  const v2CategoryStore = useCategoryStoreV2();
  const v2NavigationStore = useNavigationStoreV2();
  const profileStore = useProfileStore();
  const {status, data} = useAuth()

  const init = async () => {
    await useAsyncData("navigation-category", async () => {
      await Promise.all([
        v2NavigationStore.fetchNavigation(),
        v2CategoryStore.fetchCategories(),
        status.value==='authenticated' && profileStore.fetchCurrentUser(),
      ]);
    });
  };

  return { init };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInitDataStore, import.meta.hot));
}
