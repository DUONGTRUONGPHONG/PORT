<script setup lang="ts">
import { useCommentStore } from "@/stores/comment";
const commentStore = useCommentStore();

const props = defineProps({
  publishedOn: String,
  content: String,
  createdOn: String,
  replyCount: Number,
  id: Number,
  likeCount: Number,
  loveCount: Number,
  hahaCount: Number,
  sadCount: Number,
  wowCount: Number,
  userToken: String,
  type: { type: String, default: "comment" },
});

const comments = {
  publishedOn: props.publishedOn,
  content: props.content,
  createdOn: props.createdOn,
  replyCount: props.replyCount,
  id: props.id,
  type: props.type,
  likeCount: props.likeCount,
  loveCount: props.loveCount,
  hahaCount: props.hahaCount,
  sadCount: props.sadCount,
  wowCount: props.wowCount,
  userToken: props.userToken,
};

// toggle chat box
const childrenChatbox = ref<boolean>(false);
function toggleChatbox() {
  childrenChatbox.value = !childrenChatbox.value;
}

//trả lời comment
const commemtContent = ref();
async function replyComment(replyId: any) {
  let userData = localStorage.getItem('userData')
  if (userData) {
    const replyCommentResult = await commentStore.sendCommentByArticleId(
      comments?.id,
      replyId,
      commemtContent?.value
    );
    if (replyCommentResult) {
      commemtContent.value = "";
      alert("Bình luận của bạn đang chờ duyệt");
    }
  } else {
    alert('Vui lòng đăng nhập để bình luận')
  }

}

const replyChild = ref();
async function getReplychildByReplyId(replyId: any) {
  const replyList = await commentStore.getReplyChildByReplyId(replyId);
  if (replyList) {
    replyChild.value = replyList;
  } else {
    alert("Chưa có nội dung !");
  }
}

async function updateIcon(CommentId: any, Type: Number) {
  const resultIcon = await commentStore.updatereaction(CommentId, Type);
  if (resultIcon.reactionType) {
    emojiDefault.value = resultIcon.reactionType;
  } else {
    alert("vui long đăng nhập");
  }
}
const emojiStringName = {};

const emojiDefault = ref(4);
</script>
<template>
  <div class="comment my-2" :class="{ reply: type === 'reply' }">
    <Row class="gap-2 m-4 bg-stone-200/[.06] border-solid border-2 border-stone-200 p-2 rounded-xl relative">
      <div class="w-full">
        <Row>
          <!-- <img src="https://boxgaixinh.net/wp-content/uploads/2023/02/avatar-gai-xinh-6.1.jpg" loading="lazy"
            class="w-8 h-8 rounded-full mr-2" /> -->
          <Row class="gap-2 flex items-center">
            <span class="text-base font-extrabold whitespace-nowrap">{{ comments?.userToken }}</span>
            <time class="font-normal text-sm font-[Raleway] text-stone-500">{{
              utils.formateDate(comments?.createdOn) }}</time>
          </Row>
        </Row>
        <div class="p-2">
          <span class="comment-body text-base">{{ comments?.content }}</span>
        </div>
        <div class="">
          <Row class="gap-4 mt-2 pl-6">
            <div>
              <div class="group inline-block relative">
                <span class="text-blue-600 cursor-pointer">
                  <Icon v-if="emojiDefault == 4" @click="updateIcon(comments?.id, 4)" name="ri:thumb-up-line"
                    class="h-5 w-5" />
                  <Icon v-if="emojiDefault == 11" @click="updateIcon(comments?.id, 11)"
                    name="streamline-emojis:heart-suit" class="h-5 w-5" />
                  <Icon v-if="emojiDefault == 12" @click="updateIcon(comments?.id, 12)"
                    name="streamline-emojis:amusing-face" class="h-5 w-5" />
                  <Icon v-if="emojiDefault == 13" @click="updateIcon(comments?.id, 13)"
                    name="streamline-emojis:face-screaming-in-fear" class="h-5 w-5" />
                  <Icon v-if="emojiDefault == 14" @click="updateIcon(comments?.id, 14)"
                    name="streamline-emojis:sad-but-relieved-face" class="h-5 w-5" />
                </span>
                <div class="absolute hidden text-gray-700 pt-1 group-hover:block" style="top: -56px; left: -40px">
                  <Row class="gap-4 mt-2 pl-6 p-1 bg-[#FFFFFF] rounded-full h-12 flex items-center px-4 z-100">
                    <Icon @click="updateIcon(comments?.id, 11)" name="streamline-emojis:heart-suit"
                      class="h-6 w-6 cursor-pointer hover:scale-160" /><!--type 11-->
                    <Icon @click="updateIcon(comments?.id, 12)" name="streamline-emojis:amusing-face"
                      class="h-6 w-6 cursor-pointer hover:scale-160" /><!--type 12-->
                    <Icon @click="updateIcon(comments?.id, 13)" name="streamline-emojis:face-screaming-in-fear"
                      class="h-6 w-6 cursor-pointer hover:scale-160" /><!--type 13-->
                    <Icon @click="updateIcon(comments?.id, 14)" name="streamline-emojis:sad-but-relieved-face"
                      class="h-6 w-6 cursor-pointer hover:scale-160" /><!--type 14-->
                  </Row>
                </div>
              </div>
            </div>
            <span class="text-blue-600 cursor-pointer" @click="toggleChatbox">Trả lời</span>
            <!-- <span class="text-blue-600 cursor-pointer">Chia sẻ</span> -->
            <div class="group inline-block relative">
              <Row>
                <Icon v-if="comments?.likeCount" name="streamline-emojis:thumbs-up-1" class="h-5 w-5 cursor-pointer" />
                <!--type 11-->
                <Icon v-if="comments?.loveCount" name="streamline-emojis:heart-suit" class="h-5 w-5 cursor-pointer" />
                <!--type 11-->
                <Icon v-if="comments?.hahaCount" name="streamline-emojis:amusing-face" class="h-5 w-5 cursor-pointer" />
                <!--type 12-->
                <Icon v-if="comments?.wowCount" name="streamline-emojis:face-screaming-in-fear"
                  class="h-5 w-5 cursor-pointer" /><!--type 13-->
                <Icon v-if="comments?.sadCount" name="streamline-emojis:sad-but-relieved-face"
                  class="h-5 w-5 cursor-pointer" /><!--type 14-->
              </Row>
              <div class="absolute hidden pt-1 group-hover:block z-200" style="top: 8px; left: 0">
                <div class="gap-4 mt-2 pl-6 p-1 bg-[#FFFFFF] rounded-xl px-4">
                  <Row class="mb-2" v-if="comments?.likeCount">
                    <Icon name="streamline-emojis:thumbs-up-1" class="h-6 w-6 cursor-pointer hover:scale-160" />
                    <!--type 11-->
                    <span>{{ comments?.likeCount }}</span>
                  </Row>
                  <Row class="mb-2" v-if="comments?.loveCount">
                    <Icon name="streamline-emojis:heart-suit" class="h-6 w-6 cursor-pointer hover:scale-160" />
                    <!--type 11-->
                    <span>{{ comments?.loveCount }}</span>
                  </Row>
                  <Row class="mb-2" v-if="comments?.hahaCount">
                    <Icon name="streamline-emojis:amusing-face" class="h-6 w-6 cursor-pointer hover:scale-160" />
                    <!--type 12-->
                    <span>{{ comments?.hahaCount }}</span>
                  </Row>
                  <Row class="mb-2" v-if="comments?.wowCount">
                    <Icon name="streamline-emojis:face-screaming-in-fear"
                      class="h-6 w-6 cursor-pointer hover:scale-160" /><!--type 13-->
                    <span>{{ comments?.wowCount }}</span>
                  </Row>
                  <Row class="mb-2" v-if="comments?.sadCount">
                    <Icon name="streamline-emojis:sad-but-relieved-face" class="h-6 w-6 cursor-pointer hover:scale-160" />
                    <!--type 14-->
                    <span>{{ comments?.sadCount }}</span>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div class="gap-4 mt-2 pl-6" v-if="comments?.replyCount">
          <span class="text-[#757575] cursor-pointer" @click="getReplychildByReplyId(comments?.id)">
            <Icon name="gridicons:reply" /> {{ comments?.replyCount }} trả
            lời
          </span>
        </div>
        <div class="input_comment width_common" v-if="childrenChatbox">
          <form id="comment_post_form">
            <div class="box-area-input width_common">
              <textarea v-model="commemtContent" class="txt_comment block_input" placeholder="Chia sẻ ý kiến của bạn"
                required></textarea>
            </div>
          </form>
          <div class="absolute right-0 bottom-0">
            <button class="mr-2 p-2 bg-[#e4432d] text-[#fff] rounded-xl" @click="replyComment(comments?.id)">
              Trả lời
              <Icon name="ri-send-plane-2-fill"></Icon>
            </button>
          </div>
        </div>
      </div>
    </Row>
  </div>
  <div v-if="replyChild" class="comment-replies">
    <componentTree v-for="reply in replyChild" :key="reply.id" v-bind="reply" type="reply" />
  </div>
</template>

<style lang="scss" scoped>
.comment {
  padding-right: 1.5rem;
}

.comment.reply {
  position: relative;
}

.comment.reply:before {
  background-color: Silver;
  content: "";
  height: 1px;
  left: -2.5rem;
  position: absolute;
  top: 50%;
  width: 0.75rem;
}

h3,
p {
  margin: 0;
}

header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

svg {
  fill: SlateGray;
}

.comment-body {
  margin-bottom: 0.375rem;
}

.timestamp {
  color: DimGray;
  font-size: 0.8rem;
}

.comment-replies {
  padding-left: 3.5rem;
  position: relative;
}

.comment-replies:before {
  background-color: SlateGray;
  content: "";
  height: calc(100% + 1rem);
  left: 1rem;
  position: absolute;
  top: 0;
  width: 1px;
}

.comment-replies:last-child:before {
  height: calc(100% - 1rem);
}

.box_comment_vne .width_common {
  width: 100%;
  float: left;
}

.input_comment {
  padding: 0;
  margin-top: 20px;
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
  border-left: 2px solid #f90b22;
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
