<script setup lang="ts">

const props = defineProps<{
  category?: any;
  payload?: any[];
  subtree?: any;
  pagination?: any;
}>();

const articleStore = useArticleStore()
const categoryIds = computed(()=>{
  return props.subtree?.children?.map((item: any) => item.id)
})

const {data}=await useAsyncData('articles-multimedia', () => articleStore.fetchByMultiCategoryId(categoryIds.value,10))
const list = computed(()=>{
  return props.subtree?.children?.map((c: any) => {
    return {
      ...c,
      top1: data?.value?.find((a: any) => a.categoryId === c.id),
      articles: data?.value?.filter((a: any) => a.categoryId === c.id).slice(1)
    }
  })
})

</script>
<template>
  <HeaderMedia type="MULTIMEDIA"></HeaderMedia>
  <Wrap>
    <BreadcrumbCategory :category="category" :subtree="subtree" />

    <template v-for="(item, index) in list">
      <Row class="mt-5">
            <MainCol>
              <div class="flex items-center mt-5">
                <ul class="bg-red-500 text-white text-sm font-semibold hover:bg-red-400 font-medium inline-block rounded-tl-lg rounded-br-lg">
                    <li class="inline-block uppercase rounded-l-lg border-radius border-red-500 border-r-0 px-2 py-1 text-center block transition-transform duration-300 transform hover:scale-105">
                      <NuxtLink :to="utils.generateSlugWithId('/category', item?.slug, item?.id)"
                        :class="{ 'text-blue': category?.id === item?.id }">
                        {{ item?.title }}
                      </NuxtLink>
                    </li>
                </ul>
                <div class="border border-slate-7 flex-grow ml-4"></div>
              </div>
              <!-- Top1 -->
              <Row class="mt-5 mb-5">
                <div class="relative w-full">
                  <NuxtLink v-if="item?.id == 149 || item?.id == 151"
                    :slug="'/' + item?.top1?.category?.code + '/' + item?.top1?.code"
                    :title="item.top1?.title">
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style="background: rgba(241, 231, 231, 0.412); z-index: 1;">
                      <Icon name="ri-play-line" class="text-6xl" />
                    </div>
                  </NuxtLink>
                  <ArticleVideo class="xl:max-w-lg text-center" :title="item?.top1?.title"
                    :slug="'/' + item?.top1?.category?.code + '/' + item?.top1?.code"
                    :thumb="item?.top1?.thumbnail" />
                </div>
              </Row>
            </MainCol>

            <RightCol class="pl-8 hidden xl:block">
              <div class="md:grid md:grid-cols-1 gap-4 mt-6">
                <div class="relative" v-for="(child, index) in item?.articles.slice(1, 3)" :key="index" >
                  <ArticleVideo :title="child?.title" :slug="'/' + child.category?.code + '/' + child.code" :thumb="child?.thumbnail" />
                  <NuxtLink v-if="child?.categoryId == 149 || child?.categoryId == 151" :slug="'/' + child.category?.code + '/' + child.code" :title="child?.title">
                    <div class="absolute top-2/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style="background: rgba(241, 231, 231, 0.412); z-index: 1;">
                      <Icon name="ri-play-line" class="text-2xl" />
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </RightCol>
      </Row>
      <!-- List -->
      <Row v-if="item?.articles.length">
        <section>
          <div class="md:grid md:grid-cols-4 gap-8 pt-8">
            <div class="relative" v-for="(child, index) in item?.articles.slice(3)" :key="index" >
              <ArticleVideo :title="child?.title" :slug="'/' + child.category?.code + '/' + child.code"
                :thumb="child?.thumbnail" />
              <NuxtLink v-if="child?.categoryId == 149 || child?.categoryId == 151"
                :to="utils.generateSlugWithId('/v', child?.slug, child?.id)"
                :title="child?.title">
                <div class="absolute top-2/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style="background: rgba(241, 231, 231, 0.412); z-index: 1;">
                  <Icon name="ri-play-line" class="text-2xl" />
                </div>
              </NuxtLink>
            </div>
          </div>
          <Wrap class="grid grid-cols-12 mt-6">
              <div id="m_lfolder" class="col-span-12 text-center width_common">
                <NuxtLink :to="utils.generateSlugWithId('/category', item?.slug, item?.id)" 
                  :class="{ 'text-blue': category?.id === item?.id }" 
                  class="transition-all bg-gray-300 text-black  hover:bg-red-500 hover:text-white p-2 rounded-md">
                  Xem Thêm
                </NuxtLink>
              </div>
          </Wrap>
        </section>
      </Row>
    </template>
  </Wrap>
</template>
<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
