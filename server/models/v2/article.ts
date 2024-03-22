import { utils } from "~/utils/utilities";
import { Author } from "./author";
import Base from "./base";
import { H3Event } from "h3";

/**
 * Represents an article.
 */
export type Article = {
    id: number;
    siteId: number;
    articleId: number;
    categoryId: number;
    sub?: string; // tiền tố của tiêu đề
    title: string;
    intro?: string;
    brief?: string;
    detail?: string;
    summary?: string;
    thumbnail?: string;
    represent?: string;
    keyword?: string;
    description?: string;
    code?: string; // slug
    redirect?: string;
    type?: number; // 1: Editorial, 2: General , 3: Reportage , 4: Interview , 5: Survey , 6: Tutorial , 7: Podcast, 8: Broadcast  , 9: Talkshow  , 10: Livestream  , 11: Translation  , 12: Promotion  , 99: Other
    layoutType?: number; // 1: Normal  , 2: Short  , 3: Long  , 4: Page, 99: Other
    contentType?: number; // 1: General   , 2: Photo   , 3: Audio   , 4: Video   , 5: Graphic   , 6: Document   , 7: Interaction, 99: Other
    feature?: string; // Private, Exclusive, Featured, Sponsored ,Important ,Archived
    interaction?: string; // user hobbies
    language?: string; // vi, en, ...
    otherSettings?: string;
    views?: number;
    likes?: number;
    rates?: number;
    follows?: number;
    shares?: number;
    reports?: number;
    comments?: number;
    otherStatistics?: string;
    order?: number;
    priority?: number;
    tags?: string;
    authors?: Author[];
    topics?: string;
    events?: string;
    relations?: Article[];
    categories?: string;
    sourceTitle?: string;
    sourceUrl?: string;
    sourceType?: string;
    status?: number;
} & Base;

export const listPaging = async (event: H3Event) => {
    try {
        const { apiUrl } = useRuntimeConfig().public;
        const { categoryId, page, limit, sort } = getQuery(event)
        
        const { items, total }: any = await $fetch(`${apiUrl}/cms/article-publishing/condition/paging:${page}-${limit}/sorting:${sort}`,{
            method: 'POST',
            body:{ categoryId }
        })
        
        return { items, total };
    } catch (error) {
        handleError(error);
    }
}
export const listSectionArticle = async (event: H3Event) => {
    try {
        const { apiUrl } = useRuntimeConfig().public;
        const { layout } = getQuery(event)
        
        const { item }: any = await $fetch(`${apiUrl}/cms/category-section-article/category:41-sectionCode:${layout}`,{
            method: 'GET',
        })
        
        return { item };
    } catch (error) {
        handleError(error);
    }
}
export const get = async (event: H3Event) => {
    try {
        const { apiUrl } = useRuntimeConfig().public;
        const { articleId } = getQuery(event)
        const { item }: any = await $fetch(`${apiUrl}/cms/article-publishing/code:${articleId}`, {
            headers: {
                Site: '1'
            }
        })
        return item;
    } catch (error) {
        handleError(error);
    }
}