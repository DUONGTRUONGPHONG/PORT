<script setup lang="ts">
import Comment from "@/components/comments/Comment.vue";

const props = defineProps<{
  category: any;
  payload?: any[];
  subtree?: any;
  pagination?: any;
}>();
const article1 = await useFetch(
  `${useRuntimeConfig().public.apiUrl}/cms/article/flat:${
    props?.payload?.[0].id
  }`,
  { method: "post", body: { all: true } }
);
const { data } = await useAsyncData("article-caterory", async () => {
  const [caterory] = await Promise.all([
    $fetch(
      "http://45.77.168.121:8080/api-v1/cms/article/filtering/paging:1-16/sorting:asc",
      {
        method: "POST",
        body: {
          categoryIds: [151],
        },
      }
    ),
  ]);
  return { caterory };
});

const listArticle = (data.value?.caterory as any)?.items;
const article = (article1.data.value as any)?.item;
</script>
<template>
  <HeaderMedia type="Video"></HeaderMedia>
  <section class="@container pt-4 w-full">
    <div class="grid w-full gap-4 px-4 xs:px-6 2xl:px-0 clearfix">
      <div class="flex items-center justify-between">
        <div id="date-posted"></div>
      </div>
      <section
        class="max-w-7xl xl:max-w-full flex xl:flex-row xl:justify-center flex-col gap-4"
      >
        <!-- LEFT: VIDEO-->
        <div class="w-full lg:max-w-5xl">
          <div class="max-w-full lg:px-0">
            <div
              id="article-detail"
              class="max-w-full grid gap-4 xl:max-w-6xl text-balance [&_iframe]:(w-full) [&_iframe]:max-w-full [&_iframe]:max-h-52 md:[&_iframe]:max-h-full [&_video]:max-w-full"
              v-html="article?.detail"
            ></div>
          </div>
        </div>
        <!-- RIGHT -->
        <div class="bg-stone-50 lg:w-[500px] overflow-y-auto max-h-[65vh] flex">
          <section class="flex-col gap-4 mx-auto max-w-7xl xl:w-md">
            <h1
              v-html="article?.title"
              tag="h1"
              class="text-2xl font-bold text-left sm:text-3xl text-balance xl:text-4xl"
            ></h1>
            <div id="article-brief" class="mx-auto xl:max-w-6xl text-balance">
              <div
                v-html="article?.intro"
                class="font-semibold text-left"
              ></div>
            </div>
            <div
              v-if="article?.authors?.length"
              class="flex flex-col items-center gap-4 @xs:flex-row justify-end mt-2"
            >
              <div id="article-author" class="flex items-center gap-2">
                <img
                  src="https://boxgaixinh.net/wp-content/uploads/2023/02/avatar-gai-xinh-6.1.jpg"
                  loading="lazy"
                  class="w-8 h-8 rounded-full"
                />
                <span
                  class="text-xs text-gray-400"
                  v-for="(item, index) in article?.authors"
                  :key="index"
                >
                  <span v-if="index === 0">{{ item?.alias }}</span>
                </span>
              </div>
            </div>
            <div
              class="flex flex-col items-center gap-4 @xs:flex-row justify-end mt-2"
            ></div>
            <div
              class="flex flex-col items-center gap-4 @xs:flex-row justify-start mt-2 send-info-div"
            >
              <p class="send-info">
                Độc giả chia sẻ Video đến
                <a href="mailto:video@vnpress.net">video@vnpress.net</a>
                hoặc gửi thông tin, câu hỏi
                <a href="https://vnpress.net/lien-he-toa-soan?p=video"
                  >tại đây</a
                >.
              </p>
            </div>
            <div class="flex flex-col items-center gap-4 @xs:flex-row mt-2">
              <p class="cat_time width_common o_info">
                <a href="/thoi-su" class="cat" title="Thời sự">Thời sự</a>
                <CustomText
                  :text="
                    article?.createdOn.substring(0, 10) +
                    ' ' +
                    article?.createdOn.substring(11, 16) +
                    '(GMT +7)'
                  "
                  class="time"
                  tag="time"
                />
              </p>
            </div>
          </section>
          <!-- <section id="comment-section" class="grid">
                        <Comment :articleId="article.id" :articleVersionId="article.articleVersionId"/>
                    </section> -->
        </div>
      </section>
    </div>
    <div class="w-full border-t-2 border-dashed"></div>
    <div id="related-articles" class="grid m-10">
      <div id="top_inner" class="box_cat list_art_common gaBoxVideoDisplay">
        <div class="title_box">
          <h2>Video nổi bật</h2>
        </div>
      </div>
      <div class="grid gap-6 @lg:grid-cols-2 @xl:grid-cols-4">
        <ArticleBasic
          v-for="(item, index) in payload"
          :key="index"
          :title="item.title"
          :slug="'/' + item.category?.code + '/' + item.code"
          :thumb="item?.thumbnail"
          :style="{ display: item.id === article.id ? 'none' : '' }"
        />
        <!-- <Article mode="basic" v-for="(item, index) in listArticle" :key="index"
                    :thumb="item.thumbnails[0]?.picture"
                    :title="item.title?.content"
                    :slug="utils.generateSlugWithId('/v', item?.url?.slug, item?.id)"  /> -->
      </div>
      <br />
      <Wrap class="grid grid-cols-12 mt-6">
        <div id="m_lfolder" class="col-span-12 text-center width_common">
          <NuxtLink
            :to="utils.generateSlugWithId('/category', 'video-clip', 151)"
            class="transition-all bg-gray-300 text-black hover:bg-red-500 hover:text-white p-2 rounded-md text-blue"
          >
            Xem Thêm
          </NuxtLink>
        </div>
        <!-- <div id="m_lfolder" class="col-span-12 text-center width_common xemthem_large">
                        <a class="more">Xem Thêm</a>
                    </div> -->
      </Wrap>
    </div>
  </section>
  <!-- <section class="@container pt-4 w-full">
            <div class="grid w-full gap-4 px-4 mx-auto xs:px-6 2xl:px-0 clearfix">
                <div class="flex items-center justify-between">
                    <div id="date-posted"></div>
                </div>
            </div>
            <div class="w-full border-t-2 border-dashed"></div>
            <div id="related-articles" class="grid m-10">
                <div id="top_inner" class="box_cat list_art_common gaBoxVideoDisplay">
                    <div class="title_box">
                        <h2>Thời sự</h2>
                    </div>
                </div>
               <div class="grid gap-6 @lg:grid-cols-2 @xl:grid-cols-4">
                    <Article mode="video" v-for="(item, index) in payload" :key="index"
                        thumb="https://i1-vnexpress.vnecdn.net/2023/10/07/giphypccc-1696667919-8546-1696667958.gif?w=300&amp;h=180&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=j-jzbzynLHStsHRUO8cYaA&amp;t=video"
                        :title="item.title"
                        :slug="utils.generateSlugWithId('/v', item?.slug, item?.id)"  />
                </div>
                <br>
            </div>
        </section> -->
</template>
<style lang="scss" scoped>
body {
  background: #fff;
}

#article-detail video {
  max-width: 100% !important;
  width: unset !important;
  height: unset !important;
}

// video {
//     max-width: 100% !important;
//     width: unset !important;
//     height: unset !important;
// }

@media screen and (max-width: 1680px) {
  .top_detail {
    width: 1480px;
  }
}

.top_detail {
  width: 1720px;
  margin: 0px 20px;
  background: #f7f7f7;
  position: relative;
}

.clearfix {
  clear: both;
}

.top_detail .detail_right .send-info {
  width: 100%;
  float: left;
  padding: 12px 16px;
  background: #f0cdcd;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 14px;
  line-height: 150%;
  margin-bottom: 20px;
}

.send-info-div {
  background: #f3ebeb;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.send-info a {
  color: #004f8b;
  text-decoration: underline;
}

.width_common {
  width: 100%;
  float: left;
}

.top_detail .detail_right .cat_time .cat {
  color: #fa0727;
  font-weight: bold;
  margin-right: 10px;
}

.top_detail .detail_right .cat_time .time {
  font-size: 14px;
  color: #999;
}

// icon comemnt
.box_comment_vne .width_common {
  width: 100%;
  float: left;
}

.input_comment {
  background: none;
  border-top: none;
}

.input_comment {
  padding: 0;
  margin-top: 20px;
  background: #f5f5f5;
  position: relative;
  width: 100%;
  border-top: 1px solid #dedede;
}

.width_common {
  width: 100%;
  float: left;
}

.top_detail .box-area-input {
  background: #fff;
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

.top_detail .box-area-input .block_input {
  background: #fff;
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

.box_comment_vne input[type="text"],
.box_comment_vne input[type="password"],
.box_comment_vne input[type="email"],
.box_comment_vne input[type="tel"],
.box_comment_vne textarea,
.box_comment_vne select {
  background: #fff;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin: 0;
  padding: 0 5px;
  outline: none;
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

.xemthem_large a {
  display: inline-block;
  background: #eee;
  padding: 12px 40px;
  color: #004f8c;
  font-size: 14px;
  cursor: pointer;
}

.box_cat .title_box,
.box_tags .title_box {
  width: calc(100% - 30px);
  float: left;
  border-bottom: 1px solid #ccc;
  margin-left: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
}

.box_cat .title_box h2:before,
.box_tags .title_box h2:before {
  content: "";
  width: 100%;
  height: 1px;
  background: #f90b22;
  position: absolute;
  left: 0;
  bottom: -11px;
}

.box_cat .title_box h2,
.box_tags .title_box h2 {
  font-size: 24px;
  line-height: normal;
  display: inline-block;
  position: relative;
  font-weight: 900;
}
</style>
