import { LocationQuery } from "vue-router";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useLoginStore = defineStore("login", () => {

  const user = ref<any>();

  /* Đăng nhập */
  async function login(username:string , password:string , isPersistent: boolean) {    
    try {
      const results = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/auth`,
        {
          method: "POST",
          body: {
            siteId: useRuntimeConfig().public.site ,
            username: username,
            password: password,
            isPersistent: isPersistent
          },
        }
      );      
      const data = results as any;
      if(data && data.item){
        return data.item;
      }
      return null
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /* Tạo tài khoản */
  async function create(account:string , password:string , isPersistent: boolean) {    
    try {
      const results = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/com/client/user`,
        {
          method: "POST",
          body: {
            siteId: useRuntimeConfig().public.site ,
            account: account,
            password: password
          },
        }
      );      
      const data = results as any;
      if(data && data.item){
        return data.item;
      }
      return null
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /* Kiểm Tra tài khoản */
  async function checkUsername(username:string) {    
    try {
      const results = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/com/client/user/check-account/site:${
            useRuntimeConfig().public.site
          }-account:${username}`,
        {
          method: "GET",
        }
      );
      const data = results as any;      
      return data
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  

  return {
    login,
    checkUsername,
    create,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
