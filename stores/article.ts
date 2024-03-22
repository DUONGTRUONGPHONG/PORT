import { LocationQuery } from "vue-router";
import { defineStore, acceptHMRUpdate } from "pinia";
import { PaginationInfo } from "~/objects";

export const useArticleStore = defineStore("article", () => {
  const pagination = ref<PaginationInfo>({
    page: utils.toNumber(useRuntimeConfig().public.pagingDefault),
    limit: utils.toNumber(useRuntimeConfig().public.pagingLimit),
    total: 0,
  });
  const articles = ref<any>();

  async function fetchByCategoryId(categoryId: number) {
    try {
      const {data} = await useFetch('/api/article/list', {
        params:{
          categoryId: categoryId,
          page: pagination.value.page,
          pageSize: pagination.value.limit
        }
      })
      pagination.value.total = data.value.total;
      return data.value.items;
    } catch (e: any) {}
  }

  async function fetchByMultiCategoryId(
    categoryIds: number[],
    limit: number = 12
  ) {
    try {
      const result = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/cms/article/homepage`,
        {
          method: "POST",
          body: {
            categoryIds: categoryIds,
            limit: limit,
          },
        }
      );
      const data = result as any;
      return data.items;
    } catch (e: any) {}
  }

  function setStateFromRoute(query: LocationQuery) {
    if (query.page) pagination.value.page = utils.toNumber(query.page);
    else
      pagination.value.page = utils.toNumber(
        useRuntimeConfig().public.pagingDefault
      );
    if (query.limit) pagination.value.limit = utils.toNumber(query.limit);
    else
      pagination.value.limit = utils.toNumber(
        useRuntimeConfig().public.pagingLimit
      );
  }

  // duongdx get bai viet theo su kien
  async function fetchByEventId(eventId: number, page: number, fetch: number) {
    try {
      const results = await $fetch(
        `${
          useRuntimeConfig().public.apiUrl
        }/cms/article/event:${eventId}-paging:${page}-${fetch}`,
        { method: "GET" }
      );
      const data = results as any;
      pagination.value.total = data.total;
      return data.items;
    } catch (e: any) {}
  }

  // duongdx get bai viet theo topic
  async function fetchByTopicId(topicId: number) {
    try {
      const results = await $fetch(
        `${
          useRuntimeConfig().public.apiUrl
        }/cms/article/topic:${topicId}-paging:${pagination.value.page}-${
          pagination.value.limit
        }`,
        { method: "GET" }
      );
      const data = results as any;
      pagination.value.total = data.total;
      return data.items;
    } catch (e: any) {}
  }

  // yenht xet theo tag
  async function fetchByTagId(tagId: number) {
    try {
      const results = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/cms/article/tag:${tagId}-paging:${
          pagination.value.page
        }-${pagination.value.limit}`,
        {
          method: "GET",
        }
      );
      const data = results as any;
      pagination.value.total = data.total;
      return data.items;
    } catch (e: any) {}
  }
  // xet theo search
  async function fetchByQuery(query: string, siteId: number) {
    try {
      const results = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/cms/article/q/site:3-paging:${
          pagination.value.page
        }-${pagination.value.limit}?query=${query}`,
        { method: "GET" }
      );
      const data = results as any;
      if (!data || !data.items.length) {
        throw new Error("No articles found");
      }
      pagination.value.total = data.total;
      return data;
    } catch (e: any) {}
  }
  // xet theo authors
  async function fetchByauthors(authorId: number) {
    try {
      const results = await $fetch(
        `${
          useRuntimeConfig().public.apiUrl
        }/cms/article/author:${authorId}-paging:${pagination.value.page}-${
          pagination.value.limit
        }`,
        {
          method: "GET",
        }
      );
      const data = results as any;
      pagination.value.total = data.total;
      return data.items;
    } catch (e: any) {}
  }

  return {
    articles,
    pagination,
    fetchByCategoryId,
    fetchByMultiCategoryId,
    setStateFromRoute,
    fetchByEventId,
    fetchByTagId,
    fetchByQuery,
    fetchByTopicId,
    fetchByauthors,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot));
}
