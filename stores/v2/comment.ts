import { PagingData } from '~/objects/paging-data';
import type { Comment } from '~/server/models/v2/comment'

export const useCommentStoreV2 = defineStore('comment-v2', () => {
  const replyingTo = ref(0)

 async function create(comment: {articleId: number, content: string, replyId?: number}) {
  if(!comment.articleId || comment?.content?.trim().length<1) return
  
  const {data, error} = await useFetch<Comment>('/api/v2/comments',{
    method: 'POST',
    body: comment
  })

  if(error.value){
    console.error(error.value)
    return null
  }  

    return data.value || null
 }

 async function update(comment: Comment) {
  if(!comment.id || comment?.content?.trim().length<1) return

  const {data, error} = await useFetch<Comment>('/api/v2/comments',{
    method: 'PATCH',
    body: comment
  })

  if(error.value){
    console.error(error.value)
    return null
  }  

    return data.value || null
 }

 async function remove(comment: Comment) {
  if(!comment.id) return

  const {data, error} = await useFetch<Comment>('/api/v2/comments',{
    method: 'DELETE',
    body: comment
  })

  if(error.value){
    console.error(error.value)
    return null
  }  

    return data.value || null
 }

 async function fetchComments({articleId, replyId, readerId, page}:{articleId?:number, replyId?:number, readerId?:number, page?:number}){
    const pagingData = new PagingData<Comment>({fetch: 5, offset: page || 1})

    const result = await $fetch('/api/v2/comments',{
      query: {articleId, replyId, readerId, page: pagingData.offset, fetch: pagingData.fetch}
    })

    if(!result){
      return pagingData
    }

    pagingData.set({items: result.items, totals: result.total})
    
    if(pagingData.fetch*pagingData.offset < result.total){
      pagingData.set({next: pagingData.offset+1})
    }else{
      pagingData.set({next: 0})
    }

    return pagingData
 }

 function setReplyingTo(id?: number){
  if(id === replyingTo.value || !id){
    replyingTo.value = 0
    return
  }
   replyingTo.value = id
 }

 return {replyingTo, create, update, remove, fetchComments,setReplyingTo}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useCommentStoreV2, import.meta.hot))
}
