import { defineStore, acceptHMRUpdate } from "pinia";
export const useCommentStore = defineStore("Comment", () => {

 async function findById( id: number) {
    try {
      // cms/comment/article:451-paging:1-100
      const results = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/comment/article:${id}-paging:1-10`,{ method: "GET" });
      const data = results as any;
      if (!data || !data.items.length) {
        return []
      }else{
        return data.items;
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

 async function sendCommentByArticleId( id: any , replyId:number , comment:any) {
    try {
      let userData = localStorage.getItem('userData')
      const requestBody: { content?: string , replyId?:number ,  userId?: number, userToken?: string,} = {};
      if(comment == '' || comment == null){
        return null
      }
      if (comment) {
        requestBody.content = comment;
      }
      if(replyId){
        requestBody.replyId = replyId
      }
      if(userData){
        const loginData = JSON.parse(userData);
        // requestBody.userId = loginData.user.id
        if(loginData?.userData?.firstName && loginData?.userData?.lastName){
          requestBody.userToken = loginData.userData.firstName + ' ' + loginData.userData.lastName
        }else{
          requestBody.userToken = loginData.user.account
        }
      }
      console.log(requestBody);
      
      const results = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/comment/articleVersion:${id}`,
      {
        method: "POST",
        body: requestBody,
      });
      const data = results as any;
      if (!data) {
        return null
        // throw new Error("No articles found");
      }
      return data.item;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

 async function getReplyChildByReplyId(replyId:any) {
    try {
      const results = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/comment/reply:${replyId}-paging:1-20`,{ method: "GET" });
      const data = results as any;
      if (!data) {
        return null
      }
      return data.items;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async function updatereaction(CommentId:Number , type: Number) {
    try {
      const results = await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/comment-reaction`,
      { 
        method: "POST",
        body : {
          commentId : CommentId,
          reactionType : type
        }
       });
      const data = results as any;
      if (!data) {
        return null
      }
      console.log(data.item)
      return data.item;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  return {
    findById,
    sendCommentByArticleId,
    getReplyChildByReplyId,
    updatereaction,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommentStore, import.meta.hot));
}
