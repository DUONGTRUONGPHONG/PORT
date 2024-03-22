import type { Province } from "~/server/models/v2/province";
export const useProvince = defineStore("province", () => {

    async function fetchAll(province: Province) {
        const { data, error } = await useFetch<Province>("/api/v2/province/city", {});
    
        if (error.value) {
          console.error(error.value);
          return null;
        }
    
        return data.value || null;
      }

    return {
        fetchAll
      };
    });
    
    if (import.meta.hot) {
      import.meta.hot.accept(acceptHMRUpdate(useProvince, import.meta.hot));
    }
    
