<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useModalStoreV2 } from '~/stores/v2/modal';

const modalStore = useModalStoreV2()

const { authModalActive } = storeToRefs(modalStore)

const modalType = ref("login");

const closeModal = () => {
    modalStore.setAuthModalActive(false)
    modalType.value = "login";
};
</script>

<template>
    <a-modal width="700px" :footer="false" v-model:open="authModalActive" @close="closeModal">
        <section class="py-6">
                <div class="container h-full">
                    <div class="flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div class="hidden lg:(block w-6/12)">
                            <img src="https://media.istockphoto.com/id/1263795728/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-m%C3%A0u-%C4%91%C6%B0%E1%BB%9Dng-du-l%E1%BB%8Bch-qu%E1%BB%91c-h%E1%BB%99i-v%C3%A0-tri%E1%BB%83n-l%C3%A3m-c%C3%B4-g%C3%A1i-d%E1%BB%85-th%C6%B0%C6%A1ng-trong-ph%C3%B2ng-tr%C6%B0ng-b%C3%A0y.jpg?s=1024x1024&w=is&k=20&c=Vlea_UHzo110f6rn3Trb0o4PfcSwCv29Jn2s_WmTy9E="
                                class="w-full" alt="Phone image" />
                        </div>

                        <div class="lg:w-5/12">
                            <Login v-if="modalType === 'login'" @close="closeModal" />
                            <Register v-else-if="modalType === 'register'" @close="closeModal" />



                            <!-- Divider -->
                            <div class="my-4 items-center">
                                <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    HOẶC
                                </p>
                            </div>

                            <Button class="w-full"  v-if="modalType === 'login'" type="button" label="Đăng ký tài khoản mới"
                                @click="modalType = 'register'" />
                            <Button class="w-full"  v-else-if="modalType === 'register'" type="button" label="Đăng nhập"
                                @click="modalType = 'login'" />



                            <!-- Social login buttons -->
                            <!-- <button type="button"
                                class="p-2 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                <icon name="uim:facebook-f" class="mr-2 flex" />
                                Đăng Nhập với FaceBook
                            </button>
                            <button type="button"
                                class="p-2 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                <icon name="mdi:email" class="mr-2 flex" />
                                Đăng Nhập với Email
                            </button> -->
                        </div>
                    </div>
                </div>
        </section>
    </a-modal>
</template>