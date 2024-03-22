<script setup lang="ts">

const props = defineProps<{ category: any, payload: any[], pagination?: any, subtree?: any }>();
const top3 = computed(() => {
    return _Slice(props.payload, 1, 4)
})
</script>

<template>
    <Wrap>
        <Row class="pt-5">
            <BreadcrumbCategory :category="category" :subtree="subtree" />
        </Row>
        <Row class="mt-5">
            <MainCol>
                <template v-if="payload.length">
                    <ArticleBasicHorizontal  image-size="lg" text-size="lg" :brief="payload[0]?.intro" :title="payload[0]?.title" :slug="'/' + payload[0].category?.code + '/' + payload[0].code" :thumb="payload[0]?.thumbnail" />

                    <div class="grid md:grid-cols-3 gap-4 mt-5 md:mt-8">
                        <ArticleBasic v-for="(item, index) in top3"  :key="index" :title="item.title" :slug="'/' + item.category?.code + '/' + item.code" :thumb="item?.thumbnail" titleClass="text-sm" />
                    </div>
                </template>

                <Message v-else message="Không có bài viết nào" />
            </MainCol>

            <RightCol class="pl-8 hidden xl:block">
                <div class="grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1 h-80">
                    Mời<br />
                    Quảng cáo
                </div>
            </RightCol>
        </Row>

        <Row v-if="payload.length">
            <MainCol>
                <div class="mt-4">
                    <h3 class="text-lg font-semibold">Bài viết khác</h3>
                    <div class="pt-6 border-t-2">
                        <ArticleBasicHorizontal v-for="(item, index) in payload" :category="category.title" :createdOn="item.createdOn" :key="index" :title="item.title" :brief="item.intro" :slug="'/' + item.category?.code + '/' + item.code" :thumb="item?.thumbnail" :class="[index !== 0 ? 'pt-5 mt-5 border-t' : '']" />
                    </div>
                </div>
                <Pagination v-if="payload.length && pagination?.page > 1" :payload="pagination" class="my-4" />
            </MainCol>

            <RightCol class="pl-8 hidden xl:block">
                <div class="border-b-2 mt-4">
                    <p class="text-lg font-semibold">Tin xem nhiều</p>
                </div>
                <div class="mt-4">
                    <ArticleBasicHorizontal v-for="(item, index) in payload" :hyphenNone="true" :category="category.title" :createdOn="item.createdOn" :key="index" image-size="sm"
                        :title="item.title" :slug="'/' + item.category?.code + '/' + item.code"
                        :thumb="item?.thumbnail" :class="[index !== 0 ? 'pt-4 mt-4 border-t' : '']" textSize="sm" />
                </div>
            </RightCol>
        </Row>
    </Wrap>
</template>