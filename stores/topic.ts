import { LocationQuery } from "vue-router";
import { defineStore, acceptHMRUpdate } from "pinia";
import { PaginationInfo } from "~/objects";

export const useTopicStore = defineStore("topic", () => {
  const pagination = ref<PaginationInfo>({
    page: utils.toNumber(useRuntimeConfig().public.pagingDefault),
    limit: utils.toNumber(useRuntimeConfig().public.pagingLimit),
    total: 0,
  });

  function setStateFromRoute(query: LocationQuery) {
    if (query.page) pagination.value.page = utils.toNumber(query.page) 
      else pagination.value.page = utils.toNumber(useRuntimeConfig().public.pagingDefault);
    if (query.limit) pagination.value.limit = utils.toNumber(query.limit)
      else pagination.value.limit = utils.toNumber(useRuntimeConfig().public.pagingLimit);
  }

  async function fetchPagingWithFiltering(categoryId: number,siteId: number,fetch: number) {
    try {
      const results = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/topic/basic/limit:${fetch}/site:${siteId}`,{ method: "GET" });
      const data = results as any;
      if (!data || !data.items.length) {
        throw new Error("No articles found");
      }
      return data.items;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  // duongdx get bai viet theo topic
  async function fetchByTopicId(TopicId: number) {
    try {
      const results = await $fetch(`${ useRuntimeConfig().public.apiUrl}/cms/topic/${TopicId}`,{ method: "GET" });
      const data = results as any;
      if (!data || !data.item) {
        throw new Error("No articles found");
      }
      return data.item;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  
  return { pagination, fetchPagingWithFiltering ,fetchByTopicId ,setStateFromRoute};
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTopicStore, import.meta.hot));
}
