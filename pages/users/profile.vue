<script setup lang="ts">
import type { InputStatus } from '~/utils/types';
import { useProfileStore } from '~/stores/v2/profile';
import { z } from 'zod'

definePageMeta({
  middleware: 'auth',
  layout: false
})

const profileStore = useProfileStore()
const { status } = useAuth()

const now = new Date()
const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const minDate = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate())

watchEffect(async () => {
  if (status.value === 'unauthenticated') {
    await navigateTo('/')
  }
})

const { profile } = storeToRefs(profileStore)

const form = reactive({
  siteId: profile.value?.siteId!,
  birthDate: profile.value?.birthDate ? `${new Date(profile.value?.birthDate).getFullYear()}-${String(new Date(profile.value?.birthDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(profile.value?.birthDate).getDate()).padStart(2, '0')}` : undefined,
  firstName: profile.value?.firstName,
  lastName: profile.value?.lastName,
  gender: profile.value?.gender||0,
  phone: profile.value?.phone,
  email: profile.value?.email||'',
})

const formStatus = ref<Record<string, InputStatus>>({
  birthDate: 'idle',
  firstName: 'idle',
  lastName: 'idle',
  gender: 'idle',
  phone: 'idle',
  email: 'idle',
})

utils.log('profile', profile.value);

const bus = useEventBus('profile-form-event')

onMounted(()=>{
  bus.on(async (event:any)=>{
    const field = event.field
    const type = event.type
    if(type==='update'){
      if(event.field === 'email'){
        await updateEmail(event.data)
      }
      else if(event.field === 'password'){
        await updatePassword(event.data)
      }else{
        await handleUpdateProfile(event)
      }
    }else if(type==='action'){
      if(event.data === 'reset'){
        formStatus.value[field] = 'idle'
      }
    }else if(type==='status'){
      formStatus.value[field] = event.data
    }
  })
})

onBeforeUnmount(()=>{
  bus.reset()
})

provide('profile-form-event', bus)
provide('profile-form-status', formStatus)

const emailSchema = z.object({
  newEmail: z.string().email(),
  password: z.string().min(6)
}).refine((data) => data.newEmail !== profile.value?.email, {
  message: "Email mới không được trùng với email hiện tại",
  path: ["newEmail"],
})
const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu nhập lại không trùng khớp",
  path: ["confirmPassword"],
})
const birthDateSchema = z.coerce.date().min(minDate, { message: 'Quá già' }).max(maxDate, { message: 'Bạn chưa sinh ra' })
const phoneSchema = z.string().refine((data) => utils.isValidPhone(data), {
  message: "Số điện thoại không hợp lệ",
})

const handleUpdateProfile = async (event:any) => {
  if(!profile.value){
    return
  }

  // @ts-ignore
  const result = await profileStore.update({ id: profile.value.id, userId: profile.value.userId, [event.field]: event.data})

  if(!result){
    formStatus.value[event.field] = 'error'
    return
  }

  if(result){
    await refreshProfile(event.field)
  }
}

const updateEmail = async (data:any) => {
  const {data:response, error} = await useFetch('/api/v2/user/change-email',{
    method: 'POST',
    body:data,
    watch:false
  })

  if(error.value){
    alert(JSON.stringify(error.value?.data.data, null, 2))
    formStatus.value['email'] = 'error'
    return
  }

  if(response.value){
    await refreshProfile('email')
  }
}

const updatePassword = async (data:any) => {
  const {data:response, error} = await useFetch('/api/v2/user/change-password',{
    method: 'POST',
    body:data
  })

  if(error.value){
    alert(JSON.stringify(error.value?.data.data, null, 2))
    formStatus.value['password'] = 'error'
    return
  }

  if(response.value){
    await refreshProfile('password')
  }
}

async function refreshProfile(field:string) {
  const updatedProfile = await profileStore.fetchCurrentUser(true)
  Object.assign(form, updatedProfile)
  alert('Cập nhật thông tin thành công')
  formStatus.value[field] = 'idle'
}

</script>

<template>
  <div>
    <NuxtLayout name="user-profile">
      <div class="grid gap-y-4 w-full mt-6">
        <div>
          <p class="text-xl font-bold">Thông tin tài khoản</p>

          <GroupEmail class="mt-2" v-model="form.email" :schema="emailSchema" :icon="'mdi:email-edit-outline'" />

          <GroupPassword class="mt-2" :schema="passwordSchema" :icon="'mdi:lock-outline'" />

        </div>

        <div class="">
          <p class="text-xl font-bold">Thông tin cá nhân</p>

          <GroupCommon class="mt-2" v-model="form.birthDate" :label="'Ngày sinh'" :schema="birthDateSchema" :field="'birthDate'" :icon="'cil:birthday-cake'" :type="'date'"  />
          <GroupRadio class="mt-2" v-model="form.gender" :field="'gender'"  />
          <GroupCommon class="mt-2" v-model="form.phone" :label="'Số điện thoại'" :schema="phoneSchema" :field="'phone'" :icon="'fluent:phone-16-regular'" :type="'tel'" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>