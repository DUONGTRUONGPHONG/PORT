import { H3Event} from 'h3'
import { handleError } from '../utils/error'
import { apiUrl } from '../utils/config'
import { Author } from './author';
import { Tag } from './tag';

export interface Article {
    thumbnailUrl?: string
    id?: number;
    articleVersionId?: number;
    originId?: number;
    categoryId?: number;
    primaryCategoryId?: number;
    title: string;
    intro?: string;
    brief?: string;
    detail?: string;
    domain?: string;
    path?: string;
    slug: string;
    contentType?: number;
    layoutType?: number;
    type?: number;
    createdOn?: string;
    allowComment?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    metaKeyword?: string;
    authors?: Author[];
    tags?: Tag[];
  };

  export type ArticleResponse = {
    item: Article;
  };

  export type ArticleListResponse = {
    items: Article[];
    total: number;
  };

export const read = async (event: H3Event) =>{
    try {
        const {articleId} = getQuery(event)

        const article = await $fetch<ArticleResponse>(`${apiUrl}/cms/article/article:${articleId}`)        
        
        return article.item
    } catch (error) {
        handleError(error)
    }    
}

export const list = async (event: H3Event) =>{
  try {
    const {categoryId, eventSlug, tagSlug, topicSlug, authorId, page, pageSize} = getQuery(event)
    const response: ArticleListResponse = {items: [], total: 0}

    const entity = categoryId ? 'category' : eventSlug ? 'event-slug' : tagSlug ? 'tag-slug' : topicSlug ? 'topic-slug' : authorId ? 'author' : null
    const entityId = categoryId || eventSlug || tagSlug || topicSlug || authorId

    if(entity){
      const res = await $fetch<ArticleListResponse>(`${apiUrl}/cms/article/${entity}:${entityId}-paging:${page}-${pageSize}`)
      response.items = res.items
      response.total = res.total
    }
    return response;    
  } catch (error) {
    handleError(error)
  }
}

export const listMultiCategory = async (event: H3Event) =>{
  try {
    const {categoryIds} = getQuery(event) as {categoryIds: number[]}
    let response = {} as any

    if(categoryIds.length){
      const res = await $fetch(`${apiUrl}/cms/article/category:${categoryIds}`)
      response = (res as any).items
    }
  } catch (error) {
    handleError(error)
  }
}