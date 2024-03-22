<script setup lang="ts">
import { useCommentStoreV2 } from '~/stores/v2/comment';
import type { Comment } from '~/server/models/v2/comment';
import { PagingData } from '~/objects/paging-data';
import { useModalStoreV2 } from '~/stores/v2/modal';
import type { User } from '~/server/models/v2/user';

const props = defineProps<{ articleId?: number }>();

const v2CommentStore = useCommentStoreV2();
const modalStore = useModalStoreV2()
const { status, data } = useAuth()

const pagingData = ref<PagingData<Comment>>(new PagingData<Comment>({}));
const user = ref<User | undefined>(undefined);

const commentContent = ref<string>('');
const replyContent = ref<string>('');
const activeButtonSendComment = ref(false);
const currentPageComment = ref(1);

const onSubmit = async ({ replyId, content }: { replyId?: number, content?: string }) => {
  if (status.value === 'unauthenticated') {
    modalStore.setAuthModalActive(true)
    return
  }
  if (props.articleId === undefined) return

  const comment = await v2CommentStore.create({ articleId: props.articleId, replyId, content: content ?? commentContent.value });

  if (comment) {
    commentContent.value = '';
    replyContent.value = '';
    alert('Bình luận của bạn đang chờ duyệt');
  } else {
    alert('Bình luận thất bại');
  }
};

const handleReply = async (comment: { replyId: number, content: string }) => {
  await onSubmit({ replyId: comment.replyId, content: comment.content });
}

onMounted(() => {
  watch(commentContent, (value) => {
    if (value && value?.trim()?.length > 1) {
      activeButtonSendComment.value = true;
    } else {
      activeButtonSendComment.value = false;
    }
  }, { immediate: true });

  watch(currentPageComment, async (value) => {
    if (props.articleId) {
      const result = await v2CommentStore.fetchComments({ articleId: props.articleId, page: value });
      if (result?.items) {
        pagingData.value.items.push(...result?.items)
        pagingData.value.next = result?.next
        pagingData.value.totals = result?.totals
        pagingData.value.fetch = result?.fetch
        pagingData.value.offset = result?.offset
      }
    }
  }, { immediate: true });

  if (data.value?.user) {
    user.value = data.value?.user as User
  }
})
</script>
<template>
  <div class="mt-4">
    <div class="w-full max-w-7xl" v-if="pagingData.totals">
      <CustomText :text="'Ý kiến (' + pagingData.totals + ')'" tag="h3" class="text-xl font-bold" />
    </div>

    <div class="input_comment width_common mb-2">
      <div class="box-area-input width_common">
        <textarea v-model="commentContent" id="txtComment" class="block_input"
          placeholder="* Bình luận của bạn sẽ được biên tập trước khi đăng. Xin vui lòng gõ tiếng Việt có dấu"></textarea>
      </div>
    </div>

    <div class="mb-2">
      <button type="button" class="mr-2 p-2 bg-blue-500 text-[#fff] rounded text-xs"
        @click="!activeButtonSendComment || onSubmit({})" :disabled="!activeButtonSendComment">
        Gửi bình luận
        <Icon name="ri:send-plane-2-fill"></Icon>
      </button>
    </div>

    <CommentsCommentTree :payload="pagingData" :user="user" v-model="replyContent" type="comment" @reply="handleReply" />

    <Button class="w-full" v-if="pagingData.next>1" @click="currentPageComment++" label="Xem thêm" />
  </div>
</template>

<style scoped lang="scss">
.box_comment_vne .width_common {
  width: 100%;
  float: left;
}

.input_comment {
  padding: 0;
  margin-top: 10px;
  background: #f5f5f5;
  position: relative;
  width: 100%;
  border-top: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  border-radius: 5px;
}

.width_common {
  width: 100%;
  float: left;
}

.box_comment_vne .width_common {
  width: 100%;
  float: left;
}

.box-area-input {
  background: #f7f7f7;
  border-radius: 4px;
  position: relative;
  padding: 10px 0 10px 0;
  border-left: 2px solid rgba(59, 130, 246, 1);
}

.width_common {
  width: 100%;
  float: left;
}

.input_comment textarea.block_input {
  height: 30px;
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
  -webkit-transition-property: all;
  transition-property: all;
  -webkit-transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);
  transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);
}

.input_comment textarea.block_input {
  height: 76px;
  overflow: hidden;
  resize: none;
}

.box-area-input .block_input {
  background: #f7f7f7;
}

.input_comment textarea {
  font: 400 16px/150% arial;
  background: #fff;
  border: none;
  width: 100%;
  height: 58px;
  color: #4f4f4f !important;
  overflow: hidden;
  padding: 5px 37px 0 15px;
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="tel"],
textarea,
select {
  font: 400 13px/14px Arial;
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="tel"],
textarea,
select {
  background: #fff;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin: 3px 0;
  padding: 0 5px;
  outline: none;
}

input,
textarea {
  font-family: arial;
  font-size: 11px;
  border: none;
  background: none;
}
</style>
