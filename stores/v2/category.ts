import type { Category } from "~/server/models/v2/category";

export const useCategoryStoreV2 = defineStore("category-v2", () => {
  const v2_categories = ref<Category[]>([]);

  async function fetchCategories() {
    const { data, error } = await useFetch<Category[]>("/api/v2/categories");
    if (error.value) {
      return [] as Category[];
    }

    v2_categories.value = Object.assign([], data.value);

    return v2_categories.value;
  }

  function findByCode(code?: string) {
    if (code) return v2_categories.value.find((c) => c.code === code);
  }

  function findById(id?: number) {
    return v2_categories.value.find((c) => c.id === id);
  }

  function findParents(category?: Category) {
    if (!category) return [];

    const parents = [];
    let parent = findById(category.parentId);
    while (parent) {
      parents.push(parent);
      parent = findById(parent.parentId);
    }

    return parents.reverse().concat(category);
  }

  function findSubTree(category?: Category) {
    if (!category) return [];

    let subTree = [] as Category[];

    function findChildren(category: Category) {
      const children = v2_categories.value.filter((c:Category) => c.parentId === category.id);
      if (children.length === 0) return;

      subTree.push(...children,category);
    }

    if(category.parentId === 41){
      findChildren(category);
    }else{
      const parent = findById(category.parentId);
      if(parent){
        findChildren(parent);
      }
    }

    return subTree.reverse();
  }

  function findChildren(category: Category) {
    const children = v2_categories.value.filter((c:Category) => c.parentId === category.id);
    if (children.length === 0) return;
    else return [...children]
  }

  return { v2_categories, fetchCategories, findByCode, findById, findParents,findSubTree, findChildren };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStoreV2, import.meta.hot));
}
