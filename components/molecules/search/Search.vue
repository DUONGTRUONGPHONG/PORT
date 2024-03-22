<script setup lang="ts">
  const router = useRouter();
  const isOpen = ref(false);
  const query = ref('');

  const searchResult = ref<any[]>([]);

  const openModal = () => {
    isOpen.value = true;
  };

  const fetchQuery = async () => {
      const data : any = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/article-publishing/paging:${1}-${100}/search`,
      {
        query: { q: query.value },
        onRequest({ request, options } : any) {
          options.headers = {
            ...options.headers,
            Site: '1'
          }
        },  
      },
    );
    console.log(data)
    if (!data.items || (data.items as any).total === 0) {
      searchResult.value = [];
      return;
    }
    searchResult.value = data.items;
  };

  const handleSearch = async () => {
    router.push(`/tim-kiem?query=${query.value}`);
    isOpen.value = false;
  };

  const _fetchDebounce = _Debounce(async () => {
    fetchQuery();
  }, 200)

  function changeSearch() {
    _fetchDebounce();
  }
</script>

<template>
    <button @click="openModal" class="outline-none flex py-2 bg-transparent">
      <Icon name="gg:search" size="18" />
    </button>
    <a-modal v-model:open="isOpen" title="Tìm kiếm bài viết" width="800px" style="top: 20px" :footer="false">
        <div class="mt-4">
          <a-input-search
            v-model:value="query"
            placeholder="Tìm kiếm bài viết"
            enter-button="Tìm kiếm"
            size="large"
            @search="handleSearch"
            @change="changeSearch"
          />
        </div>
        <div class="flex-1 px-2 overflow-y-auto mt-4 search-box" :class="[searchResult.length > 0 ? ' h-600px' : ' h-300px']">
            <div v-if="searchResult.length > 0" class="search-box flex flex-col gap-4">
              <NuxtLink class="hover-text-black" v-for="(article, index) in searchResult" :key="index" :to="'/' + article.category?.code + '/' + String(article.code)">
                  <div class="grid grid-cols-12 gap-3">
                      <div class="aspect-[16/10] rounded overflow-hidden shadow-md col-span-4">
                          <img :src="article.thumbnail  || '/images/default-thumbnail.jpg'" class="w-full h-full object-cover" :alt="article.title?.replace(/<[^>]+>/g, '')" />
                      </div>
                      <div class="col-span-8">
                          <h3 class="font-semibold hover-text-primary-100 transition-all duration-300 text-sm sm:text-base">
                              {{ article.title?.replace(/<[^>]+>/g, '') }}
                          </h3>
                          <p class="text-xs md:text-sm line-clamp-3 mt-1 hover-text-black">
                              {{ article.intro?.replace(/<[^>]+>/g, '') }}
                          </p>
                      </div>
                  </div>
                </NuxtLink>
            </div>
            <div v-else>
              <p class="py-8 text-slate-500 text-sm text-center">Chưa có tìm kiếm gần đây</p>
            </div>
          </div>
    </a-modal>
</template>

<style lang="scss">
  .search-box {
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
  }
}
</style>