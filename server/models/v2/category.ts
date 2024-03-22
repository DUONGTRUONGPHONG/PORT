import Base from "./base";
import {H3Event} from "h3";

export type Category = {
  id: number;
  siteId: number;
  parentId?: number;
  title: string;
  code: string;
  description?: string;
  thumbnail?: string;
  keyword?: string;
  taxonomy?: string;
  type: number;
  layout?: number;
  template?: string;
  feature?: string;
  settings?: string;
  order?: number;
  isPublished?: boolean;
  publishType?: number;
  publishedBy?: string;
  publishedOn?: string;
  status: number;
} & Base;

export const list = async () => {
  try {
    const { site, apiUrl } = useRuntimeConfig().public;    

    const {items}:any = await $fetch(`${apiUrl}/cms/category/site`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        site: site,
      },
    });    

    return items;
  } catch (error) {
    handleError(error);
  }
};
