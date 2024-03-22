<script setup lang="ts">
import { useCommentStoreV2 } from '~/stores/v2/comment';
import { useProfileStore } from '~/stores/v2/profile';
import { PagingData } from '~/objects/paging-data';
import type { Comment } from '~/server/models/v2/comment';

definePageMeta({
  auth: false,
  layout: false
})
const v2CommentStore = useCommentStoreV2();
const v2ProfileStore = useProfileStore();

const route = useRoute()
const userId = route.params.id as string
const readerId = utils.toNumber(userId)
const currentPageComment = ref(1);
const pagingData = ref<PagingData<Comment>>(new PagingData<Comment>({}));

const isCurrentUser = computed(() => {
  return v2ProfileStore.isCurrentUser(readerId)
})

const layout = computed(() => {
  if (isCurrentUser.value) {
    return 'user-profile'
  }
  return 'reader-profile'
})

v2ProfileStore.fetchById(readerId, {noFetch:isCurrentUser.value})

watch(currentPageComment, async (value) => {
    
      const result = await v2CommentStore.fetchComments({ readerId, page: value });
      if (result?.items) {
        pagingData.value.items.push(...result?.items)
        pagingData.value.next = result?.next
        pagingData.value.totals = result?.totals
        pagingData.value.fetch = result?.fetch
        pagingData.value.offset = result?.offset
      }
  }, { immediate: true });

</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <div class="text-xl font-bold mt-3">Ý Kiến</div>
      <div class="item_active px-3" v-for="comment in pagingData.items" :key="comment.id">
        <p class="title_article_com">
          <a title="" href="https://vnexpress.net/bai-viet-4698739.html"></a>
        </p>
        <div class="text-sm text-[#757575] mt-3">
          <span>{{ utils.formateDate(comment?.createdOn) }}</span>
          <div class="like">
          </div>
        </div>
        <!-- <a class="text-sm text-[#757575] cursor-pointer">Trả lời đến
            ngodanhdu</a> -->
        <div class="text-lg text-[#222]! ___">
          <p>{{ comment.content }}</p>
        </div>
        <!-- <a title="" class="text-sm text-[#757575] underline cursor-pointer">Xem thảo
            luận</a> -->
        <hr class="border-gray-300 mt-3 mb-2">
      </div>
      <Button class="w-full" v-if="pagingData.next>1" @click="currentPageComment++" label="Xem thêm" />
    </NuxtLayout>
  </div>
</template>