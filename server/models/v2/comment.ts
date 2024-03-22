import Base from "./base";
import { H3Event } from "h3";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Comment = {
  id: number;
  articleId: number;
  readerId?: number; // người bình luận
  replyId?: number; // bình luận cha
  replyTotal: number;
  userName?: string;
  avatar?: string;
  content: string;
  publishedOn?: string;
} & Base;

export const list = async (event: H3Event) => {
  try {
    const { articleId, replyId, readerId, page, fetch } = getQuery(event) as { articleId?: number, replyId?: number, readerId?:number, page: number, fetch: number };    
    console.log(articleId, replyId, readerId, page, fetch);
    
    const result = await $fetch(
      `${
        useRuntimeConfig().public.apiUrl
      }/cms/article-comment/general/condition/paging:${page}-${fetch}`,{
        method: "POST",
        body:{
          articleId,
          replyId,
          readerId
        }
      }
    );

    console.log("comments: ", result);    

    return result;
  } catch (error) {
    console.error("error: ", error);
    return null
  }
};

export const create = async (event: H3Event) => {
  try {
    const { articleId, content, replyId } = await readBody(event) as {
      articleId: number;
      content: string;
      replyId?: number;
    };    

    const {item} :any = await fetchWithAuth(
      `${
        useRuntimeConfig().public.apiUrl
      }/cms/article-comment`,
      {
        method: "POST",
        body: {
          articleId,
          content,
          replyId,
        },
      },
      event
    )

    return item;
  } catch (error) {
    handleError(error);
  }
};

export const update = async (event: H3Event) => {
  try {
    const { id, content } = await readBody(event) as {
      id: number;
      content: string;
    };

    await fetchWithAuth(
      `${
        useRuntimeConfig().public.apiUrl
      }/cms/article-comment`,
      {
        method: "PATCH",
        body: {
          id,
          content,
        },
      },
      event
    )

    return id;
  } catch (error) {
    handleError(error);
  }
};

export const remove = async (event: H3Event) => {
  try {
    const { id } = await readBody(event) as {
      id: number;
    };
    
    await fetchWithAuth(
      `${
        useRuntimeConfig().public.apiUrl
      }/cms/article-comment`,
      {
        method: "DELETE",
        body: {
          id,
        },
      },
      event
    )

    return id;
  } catch (error) {
    handleError(error);
  }
};
