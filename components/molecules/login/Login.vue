<script setup lang="ts">
import { useProfileStore } from '~/stores/v2/profile';
import { z } from 'zod';
import { type User } from '~/server/models/v2/user';
const router = useRouter()
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
            router.push("/")

        }

        emit('close')
    } catch (error) {
        console.log(error);
    }
};
const loginGG = async () => {
    await signIn('google')
    await profileStore.fetchCurrentUser()
};

const loginFB =async () => {
    await signIn('facebook')
}
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

    <!-- <button @click="loginGG"
        class="mt-4 relative text-blue-500 w-full gap-2 bg-white focus:ring-4 border border-blue-500 font-medium rounded text-sm px-5 py-2.5 flex justify-center items-center">
        <svg class="absolute top-1/2 -translate-y-1/2 left-1/4" width="18" height="19">
            <g id="Google-Button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="logo_googleg_48dp">
                    <path
                        d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
                        id="Shape" fill="#4285F4"></path>
                    <path
                        d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
                        id="Shape" fill="#34A853"></path>
                    <path
                        d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
                        id="Shape" fill="#FBBC05"></path>
                    <path
                        d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
                        id="Shape" fill="#EA4335"></path>
                    <path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape"></path>
                </g>
            </g>
        </svg>
        <div>Google</div>
    </button>

    <button @click="loginFB"
        class="mt-4 relative text-blue-500 w-full gap-2 bg-white focus:ring-4 border border-blue-500 font-medium rounded text-sm px-5 py-2.5 flex justify-center items-center">
        <svg
            viewBox="0 0 512 512" class="w-6 h-6">
            <path
                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
        </svg>
        <div>Facebook</div>
    </button> -->

    <ul class="flex items-center gap-x-2 mt-[10px] justify-center text-[22px]">
        <li @click="loginGG" class="w-[40px] h-[40px] rounded-full bg-red-600 hover:bg-red-700 cursor-pointer flex items-center justify-center">
            <Icon name="ion:logo-googleplus" class="text-white" />
        </li>
        <li @click="loginFB" class="w-[40px] h-[40px] rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer flex items-center justify-center">
            <Icon name="ion:social-facebook" class="text-white" />
        </li>
    </ul>
</template>
