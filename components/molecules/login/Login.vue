<script setup lang="ts">
import { useProfileStore } from '~/stores/v2/profile';
import { z } from 'zod';
import {type User } from '~/server/models/v2/user';

const emit = defineEmits(['close']);

const { signIn } = useAuth()
const profileStore = useProfileStore()

const show = ref(false);
const fieldErrors = ref({ success: true, errors: {} as any });
const form = reactive({
    username: '',
    password: '',
});

const check = z.object({
    username: z.string().trim().min(8, { message: 'Tài khoản phải có ít nhất 8 ký tự' }),
    password: z.string().trim().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

const toggleVisibility = () => {
    show.value = !show.value;
};

const onSubmit = async () => {
    try {
        const validated = check.safeParse(form);

        if (!validated.success) {
            fieldErrors.value = { success: false, errors: validated.error.format() };
            return;
        }
        const { error, ok }: any = await signIn('credentials', { ...form, redirect: false })

        if (error) {
            fieldErrors.value = { success: false, errors: { credential: { _error: 'Sai thông tin đăng nhập' } } };
            return;
        }

        if (ok) {
            await profileStore.fetchCurrentUser()
        }

        emit('close')
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <form @submit.prevent="onSubmit" class="max-w-md mx-auto bg-white rounded-md">
        <WelcomeAuth>Mời bạn đăng nhập!</WelcomeAuth>

        <div v-if="!fieldErrors.success && fieldErrors.errors.credential" class="text-red text-center mb-2">
            {{ fieldErrors.errors.credential._error }}
        </div>

        <div class="mb-4">
            <input type="text" v-model="form.username" id="username" class="mt-1 p-3 w-full border rounded-md"
                placeholder="Nhập tài khoản..." />
            <div v-if="!fieldErrors.success && fieldErrors.errors.username" class="text-red text-xs pt-1">
                {{ fieldErrors.errors.username._errors[0] }}
            </div>
        </div>

        <div class="mb-4">
            <div class="relative">
                <input :type="show ? 'text' : 'password'" v-model="form.password" id="password"
                    class="mt-1 p-3 w-full border rounded-md" placeholder="Nhập mật khẩu..." />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <a class="h-6 text-gray-700" @click="toggleVisibility">
                        <Icon name="fa6-solid:eye-slash" v-show="show" />
                    </a>
                    <a class="h-6 text-gray-700" @click="toggleVisibility">
                        <Icon name="fa6-solid:eye" v-show="!show" />
                    </a>
                </div>
            </div>
            <div v-if="!fieldErrors.success && fieldErrors.errors.password" class="text-red text-xs pt-1">
                {{ fieldErrors.errors.password._errors[0] }}
            </div>
        </div>

        <Button class="w-full bg-blue-500 text-white hover:bg-blue-600" type="submit" label="Đăng Nhập" />
    </form>
</template>
