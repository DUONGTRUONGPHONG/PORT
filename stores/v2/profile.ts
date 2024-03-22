import type {
  Profile,
  ProfileWithNameAndTotalCommentAndEmail,
  Reader,
} from "~/server/models/v2/profile";
import type { GeneralUser, User } from "~/server/models/v2/user";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<ProfileWithNameAndTotalCommentAndEmail | null>(null);
  const reader = ref<Reader | null>(null);

  const { status, data } = useAuth()

  async function fetchCurrentUser(refresh = false) {
    if (profile.value && !refresh) return profile.value;

    const { data, error } = await useFetch<GeneralUser>(
      "/api/v2/user/current-user"
    );

    if (error.value) {
      return null;
    }

    if (data.value) {
      profile.value = data.value.profile as ProfileWithNameAndTotalCommentAndEmail;
      profile.value.email = data.value.user.email;
      profile.value.totalComment = data.value.totalComment;
      profile.value.name = data.value.user.name;
      setAlias("current-user");
    }

    return profile.value;
  }

  async function fetchById(id: number, options:{noFetch?:boolean}) {
    if(options.noFetch) return Promise.resolve(null);
    const { data, error } = await useFetch<Reader >(
      `/api/v2/user/${id}`
    );

    if (error.value) {
      utils.log('error', error.value)
      return null;
    }

    if (data.value) {
      reader.value = data.value;
      setAlias("reader");
    }
    return data.value;
  }

  async function update(items: Partial<Profile>) {
    const currentProfile = {
      id: profile.value?.id,
      siteId: profile.value?.siteId,
      userId: profile.value?.userId,
      ...items,
    };
    const { data, error } = await useFetch<Profile>("/api/v2/profile", {
      method: "PATCH",
      body: currentProfile,
    });

    if (error.value) {
      console.error(error.value);
      return null;
    }

    return data.value;
  }

  async function remove(profile: Profile) {
    const { data, error } = await useFetch<Profile>("/api/v2/profile", {
      method: "DELETE",
      body: profile,
    });

    if (error.value) {
      console.error(error.value);
      return null;
    }

    return data.value || null;
  }

  function setAlias(type: "current-user" | "reader") {
    const user = type === "current-user" ? profile.value : reader.value;
    if (!user) return;
    const { alias, firstName, lastName, name } = user;

    if (!alias) {
      if (firstName && lastName) {
        user.alias = `${firstName} ${lastName}`;
      } else if (firstName) {
        user.alias = firstName;
      } else if (lastName) {
        user.alias = lastName;
      } else {
        user.alias = name;
      }
    }
  }

  function getCurrentUserId(){
    const user = computed(() => data.value?.user) as ComputedRef<User | undefined>
    return user.value?.id
  }

  function isCurrentUser(id:number){    
      if(status.value === 'authenticated') return getCurrentUserId() === id
      return false
  }

  return {
    profile,
    reader,
    fetchCurrentUser,
    update,
    remove,
    fetchById,
    isCurrentUser,
    getCurrentUserId
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
