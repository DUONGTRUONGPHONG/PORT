import { defineStore, acceptHMRUpdate } from "pinia";
import type { User } from "~/server/models/v2/user";

export const useUserStoreV2 = defineStore("user-v2", () => {
  async function changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const result = await $fetch("/api/v2/user/change-password", {
      method: "POST",
      body: { currentPassword, newPassword, confirmPassword },
    });

    return result;
  }

  return { changePassword};
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStoreV2, import.meta.hot));
}
