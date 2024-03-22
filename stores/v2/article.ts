import type { LocationQuery } from '#vue-router';
import type { PaginationInfo } from '~/objects';
import type { Article } from '~/server/models/v2/article';

export const useArticleStoreV2 = defineStore('article-v2', () => {

  const { serverResourceUrl, pagingDefault, pagingLimit } = useRuntimeConfig().public

  const pagination = ref<PaginationInfo>({
    page: utils.toNumber(pagingDefault),
    limit: utils.toNumber(pagingLimit),
    total: 0,
  });

  async function fetchByCategoryIdWithPaging(categoryId: number, limit?: string | number) {
    const { data, error } = await useFetch<any>(`/api/v2/articles-paging?categoryId=${categoryId}&page=${pagination.value.page}&limit=${limit ? limit : pagination.value.limit}&sort=createdon desc`)

    if (error.value) {
      pagination.value.total = 0;
      return [] as Article[]
    }

    data.value.items.forEach((item: Article) => {
      item.title = item.title.replace(/<p>|<\/p>/g, '')
    })

    pagination.value.total = data.value.total;

    return data.value.items
  }
  async function fetchByCategorySectionArticle(layout: number) {
    const { data, error } = await useFetch<any>(`/api/v2/articles-category-section?layout=${layout}`)
    if (error.value) {
      return [] as Article[]
    }
    // data.value.items.forEach((item: Article) => {
    //   item.title = item.title.replace(/<p>|<\/p>/g, '')
    // })

    return data.value
  }

  async function fetchById(id: string) {
    const { data, error } = await useFetch<Article>(`/api/v2/articles`, { query: { articleId: id } })

    if (error.value) {
      return null
    }

    if (data.value) {
      data.value.title = data.value.title.replace(/<p>|<\/p>/g, '')
      data.value.detail = utils.domainImage(data.value.detail, serverResourceUrl)
    }

    return data.value
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

  return { pagination, fetchByCategoryIdWithPaging, fetchById, setStateFromRoute, fetchByCategorySectionArticle }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStoreV2, import.meta.hot))
}
