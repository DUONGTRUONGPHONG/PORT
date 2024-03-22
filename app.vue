<script setup lang="ts">
import { useInitDataStore } from './stores/v2/init-data';

const props = defineProps({
  error: Object,
});

const initStore = useInitDataStore()

await initStore.init()

const resolveError = async (error: any) => {
  await clearError({ redirect: "/" });
  error.value = null;
};

useHead({
  bodyAttrs: {
    class: "!overflow-x-hidden max-w-screen min-h-screen w-full h-full"
  }
})
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#3c7abc',
      },
    }"
  >
  <div>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <ErrorBoundary>
      <NuxtPage />

      <template #error="{ error }">
        <div class="text-center my-8">
          <h2 class="mb-2">404</h2>
          <p class="mb-3">Trang không tồn tại.</p>
          <p v-if="utils.isDev()">{{ error }}</p>
          <button @click="resolveError(error)" type="button" class=" p-2 border focus:outline-none border-blue text-blue-7 hover:(bg-blue text-white) rounded-lg transition-colors">Về
            trang chủ</button>
        </div>
      </template>
    </ErrorBoundary>
    <ScrollToTop />
  </NuxtLayout>

  <AuthModal />
</div>
  </a-config-provider>
  
</template>