<script setup lang="ts">
import { PagingData } from "~/objects/paging-data";
import type { Comment } from "~/server/models/v2/comment"
import { useCommentStoreV2 } from "~/stores/v2/comment";
import { storeToRefs } from "pinia";
import type { User } from "~/server/models/v2/user";

const props = defineProps<{ 
  payload?: PagingData<Comment> | Map<number, PagingData<Comment>>, 
  id?: number,
  type?: "comment" | "reply",
  user?: User
}>();

const emit = defineEmits<{
  (e: 'reply', comment: { replyId: number, content: string }): void
}>();

const v2CommentStore = useCommentStoreV2();
const {replyingTo} = storeToRefs(v2CommentStore);
const commentContent = defineModel<string>({default:''})
const viewingRepliesOf = ref<number[]>([]);
const replyChildren = ref(new Map<number, PagingData<Comment>>());
const countdownReplies = new Map<number, number>();

const type = computed(() => {
  return props.type || "comment";
})

const comments = computed(() => {
  const result = new PagingData<Comment>({});
  if (props.payload instanceof PagingData) {
    Object.assign(result, props.payload);
  } else if (props.payload instanceof Map) {
    const data = props.payload.get(props.id!);
    if (data) {
      Object.assign(result, data);
    }
  }

  result.items.forEach((item) => {
    if (item.replyTotal > 0) {
      countdownReplies.set(item.id!, item.replyTotal);
    }
  });

  return result
})

const activeButtonReply = computed(() => {
  return commentContent.value && commentContent.value?.trim()?.length > 1;
})

const showMoreReplies = async (id: number) => {  
  if(replyChildren.value.has(id) && !replyChildren.value.get(id)?.next) return
  const result = await v2CommentStore.fetchComments({ replyId: id, page: replyChildren.value.get(id)?.next || 1 });

  if (result?.items) {    
    viewingRepliesOf.value.push(id);
    const count = result.totals - (result.fetch* result.offset)
    countdownReplies.set(id, count > 0 ? count : 0);

    if(replyChildren.value.has(id)){
      const data = replyChildren.value.get(id)
      if(data){
        data.items.push(...result.items)
        data.next = result.next
        data.totals = result.totals
        data.fetch = result.fetch
        data.offset = result.offset
      }
    }else{
      replyChildren.value.set(id, result)
    }
  }
};

const isActiveCountdown = (id: number) => {
  return countdownReplies.get(id)! > 0;
};

const handleClick = (reply?:number)=> {
  if(!reply) return
  emit('reply', { replyId: reply, content: commentContent.value })
};

const handleReply = (comment: { replyId: number, content: string }) => {
  emit('reply', comment)
}

</script>
<template>
  <ClientOnly>
    <div class="my-2" v-for="(item, index) in comments.items" :key="index">
      <Row :class="['my-4', type === 'reply' ? 'pl-4' : '']">
        <div class="w-full">
          <Row class="flex">
            <CommentsAvatar :payload="{ id: item.readerId, userName: item?.userName, avatar: item?.avatar}" class="mr-2" />
            <Row>
              <span class="text-sm font-semibold whitespace-nowrap">
                {{ user&&user.id===item?.readerId? 'Tôi' : item?.userName }}
              </span>
              <span class="text-sm pl-1">{{ item?.content }}</span>
            </Row>
          </Row>

          <div class="flex gap-x-2 mt-1 pl-10">
            <span class="text-[#757575] cursor-pointer text-sm" @click="v2CommentStore.setReplyingTo(item.id)">
              Trả lời
            </span>
          </div>

          <div v-if="replyingTo === item.id" class="relative pl-10">
            <textarea v-model="commentContent"
              class="w-full h-16 placeholder:text-sm p-2 border-solid border outline-none border-stone-200 rounded"
              placeholder="Chia sẻ ý kiến của bạn"></textarea>

            <div class="absolute right-0 bottom-3">
              <button class="flex items-center mr-2 p-2 bg-blue text-[#fff] rounded-xl text-xs"
                @click="!activeButtonReply || handleClick(item?.replyId||item?.id)"
                :disabled="!activeButtonReply">
                Trả lời
                <Icon name="ri:send-plane-2-fill" class="ml-1"></Icon>
              </button>
            </div>
          </div>

          <div v-if="viewingRepliesOf.includes(item.id)"
            class="pl-6 relative before:(absolute content-[''] w-2px bg-[#E5E5E5] h-full)">
            <CommentTree 
            :payload="replyChildren.get(item.id)!" 
            :id="item.id"
            type="reply"
            :user="user"
            @reply="handleReply" />
          </div>

          <div class="gap-4 mt-1 pl-6" v-if="isActiveCountdown(item.id)">
            <span class="text-[#757575] cursor-pointer text-sm" @click="showMoreReplies(item.id)">
              <Icon name="gridicons:reply" />
              {{ countdownReplies.get(item.id) }} trả lời
            </span>
          </div>

        </div>
      </Row>
    </div>
  </ClientOnly>
</template>

<style></style>
