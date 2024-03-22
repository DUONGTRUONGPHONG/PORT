<script setup>
import { useInitDataStore } from './stores/v2/init-data';
const props = defineProps({
    error: Object,
});

const initStore = useInitDataStore()

await initStore.init()

const handleError = () => {
    clearError({
        redirect: "/",
    });
};
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <div class="text-center py-16">
                <template v-if="error.statusCode === 404">
                    <h1>404!</h1>
                    <p>Không tìm thấy trang.</p>
                </template>
                <template v-else>
                        <p>Có vẻ như đã có lỗi xảy ra.</p>
                        <p>Rất xin lỗi vì sự bất tiện này.</p>
                        <p v-if="utils.isDev()">{{ error }}</p>
                </template>
                <button type="button"
                    class="border focus:outline-none p-2 border-blue rounded-lg text-blue-7 hover:(bg-blue text-white) transition-colors"
                    @click="handleError">
                    Về trang chủ
                </button>
            </div>
        </NuxtLayout>
    </div>
</template>
