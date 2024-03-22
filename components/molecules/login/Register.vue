<script setup lang="ts">
import { z } from 'zod';
import { useProfileStore } from '~/stores/v2/profile';

const emit = defineEmits(['close']);

const profileStore = useProfileStore()
const { signIn } = useAuth()

const fieldErrors = ref({ success: true, errors: {} as any });
const show = ref(false);

const form = reactive({
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
});

const check = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  name: z.string().min(8, { message: 'Tài khoản phải có ít nhất 8 ký tự' }).max(20,'Tài khoản có độ dài tối đa 20 ký tự'),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  confirmPassword: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
})
  .refine((data) => data.password === data.confirmPassword,
    { message: 'Mật khẩu không khớp', path: ['confirmPassword'] });

const onSubmit = async () => {
  try {
    const validated = check.safeParse(form);

    if (!validated.success) {
      fieldErrors.value = { success: false, errors: validated.error.format() };
      console.log(fieldErrors.value);

      return;
    }

    const { data, error } = await useFetch('/api/auth/register', {
      method: 'POST',
      body: { email: form.email, name: form.name, password: form.password }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    if (data.value) {
      const { error, ok }: any = await signIn('credentials', {
        username: form.name,
        password: form.password,
        redirect: false
      })
      
      if (error) {
        utils.log('error', error)
        return
      }

      if (ok) {
        await profileStore.fetchCurrentUser()
      }
    }

    emit('close')
  } catch (error) {
    console.error(error);
  }
}

const toggleVisibility = () => {
  show.value = !show.value;
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <WelcomeAuth>Mời bạn đăng ký!</WelcomeAuth>

    <div class="relative mb-4" data-te-input-wrapper-init>
      <input type="email" v-model="form.email" class="peer block min-h-[auto] w-full rounded border border-gray-300 p-3"
        placeholder="Nhập email....." />
      <div v-if="!fieldErrors.success && fieldErrors.errors.email" class="text-red text-xs pt-1">
        {{ fieldErrors.errors.email._errors[0] }}
      </div>
    </div>

    <div class="relative mb-4" data-te-input-wrapper-init>
      <input type="text" v-model="form.name" class="peer block min-h-[auto] w-full rounded border border-gray-300 p-3"
        placeholder="Nhập tên....." />
      <div v-if="!fieldErrors.success && fieldErrors.errors.name" class="text-red text-xs pt-1">
        {{ fieldErrors.errors.name._errors[0] }}
      </div>
    </div>

    <div class="py-2">
      <div class="relative">
        <input :type="show ? 'text' : 'password'" v-model="form.password"
          class="text-md block p-3 rounded w-full border border-gray-300 " placeholder="Nhập mật khẩu...." />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          <a class="h-6 text-gray-700" @click="toggleVisibility">
            <Icon name="fa6-solid:eye-slash" v-show="show" />
          </a>
          <a class="h-6 text-gray-700" @click="toggleVisibility">
            <Icon name="fa6-solid:eye" v-show="!show" />
          </a>
        </div>

        <div v-if="!fieldErrors.success && fieldErrors.errors.password" class="text-red text-xs pt-1">
          {{ fieldErrors.errors.password._errors[0] }}
        </div>
      </div>
    </div>

    <div class="py-2">
      <div class="relative">
        <input :type="show ? 'text' : 'password'" v-model="form.confirmPassword"
          class="text-md block p-3 rounded w-full border border-gray-300 " placeholder="Nhập lại mật khẩu...." />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          <a class="h-6 text-gray-700" @click="toggleVisibility">
            <Icon name="fa6-solid:eye-slash" v-show="show" />
          </a>
          <a class="h-6 text-gray-700" @click="toggleVisibility">
            <Icon name="fa6-solid:eye" v-show="!show" />
          </a>
        </div>

        <div v-if="!fieldErrors.success && fieldErrors.errors.confirmPassword" class="text-red text-xs pt-1">
          {{ fieldErrors.errors.confirmPassword._errors[0] }}
        </div>
      </div>
    </div>



    <Button class="w-full" type="submit" label="Đăng ký" />
  </form>
</template>