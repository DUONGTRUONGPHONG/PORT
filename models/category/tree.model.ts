export interface CategoryTree {
  id?: number;
  parentId?: number;
  siteId?: number;
  title?: string;
  description?: string;
  path?: string;
  slug?: string;
  type?: number;
  order?: number;
  layoutType?: number;
  priority?: number;
  status?: number;
  language?: string;
  isPrivate?: boolean;
  isPrimary?: boolean;
  isFeatured?: boolean;
  children?: CategoryTree[];
}
