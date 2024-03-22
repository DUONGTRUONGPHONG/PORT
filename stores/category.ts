import { defineStore, acceptHMRUpdate } from "pinia";
import { CategoryTree } from "~/models/category";

export const useCategoryStore = defineStore("category", () => {
  const tree = ref<CategoryTree[] | null>(null);

  async function fetchTree() {
    const result = await $fetch(
      `${useRuntimeConfig().public.apiUrl}/cms/category/custom/site:${
        useRuntimeConfig().public.site
      }`
    );
    if(result && (result as any).items.length){
      tree.value = sortTree(
        useOrderBy((result as any).items, ["order"], ["asc"]),
        "order"
      );
    }
  }

  function findById(categories: CategoryTree[] | null, id: number): any {
    if (!categories) return;
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }

      if (category.children) {
        const subCategory = findById(category.children, id);
        if (subCategory) {
          return subCategory;
        }
      }
    }

    return null;
  }

  function findBySlug(categories: CategoryTree[] | null, slug: string): any {
    if (!categories) return;
    for (const category of categories) {
      if (category.slug === slug) {
        return category;
      }

      if (category.children) {
        const subCategory = findBySlug(category.children, slug);
        if (subCategory) {
          return subCategory;
        }
      }
    }

    return null;
  }

  function findCategoryTreeById(
    tree: CategoryTree[],
    id: number
  ): CategoryTree | undefined {
    for (const node of tree) {
      if (node.id === id) {
        return node;
      }
      const children = node.children || [];
      const result = findCategoryTreeById(children, id);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  function findCategoryTreeRoot(
    tree: CategoryTree[],
    id: number
  ): CategoryTree | undefined {
    const subtree = findCategoryTreeById(tree, id);
    if (!subtree) {
      return undefined;
    }
    let node: CategoryTree | undefined = subtree;
    while (node.parentId) {
      node = findCategoryTreeById(tree, node.parentId);
      if (!node) {
        return undefined;
      }
    }
    return node;
  }

  function sortTree(
    tree: CategoryTree[],
    property: keyof CategoryTree
  ): CategoryTree[] {
    return tree
      .map((item) => ({
        ...item,
        children: item.children ? sortTree(item.children, property) : [],
      }))
      .sort((a, b) => (a[property] as number) - (b[property] as number));
  }

  return {
    tree,
    findById,
    findBySlug,
    fetchTree,
    findCategoryTreeById,
    findCategoryTreeRoot,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
