<script setup lang="ts">
import type { ProfileFormMode } from './ProfileForm.vue';

type PasswordModels = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}
const props = withDefaults(defineProps<{
    icon?: string,
    schema: any
}>(), {
    icon: 'bxs:edit'
})

const { changeStatus, emitFieldUpdate, status } = useFormGroup({ group: 'password' })

const initialModel = reactive<PasswordModels>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})
const errors = ref<any>({})
const error = ref(true)
const mode = ref<ProfileFormMode>('default')
const model = ref(_Clone(initialModel))
const currentLabel = computed(() => mode.value === 'default' ? 'Mật khẩu' : 'Mật khẩu hiện tại')
const currentPasswordPlaceholder = computed(() => {
    if (mode.value === 'default') {
        return '••••••'
    } else {
        return 'Nhập mật khẩu hiện tại'
    }
})
const modeChange = () => {
    mode.value = mode.value === 'default' ? 'edit' : 'default'
}

const handleUpdate = () => {
    changeStatus('committing')
    emitFieldUpdate(model.value)
}

const canConfirm = () => {
    return errors.value.currentPassword === undefined && errors.value.newPassword === undefined && errors.value.confirmPassword === undefined
}

const handleValid = (event:any) =>{
    const result = props.schema.safeParse(model.value)
    const field = event.field
        if (result.success) {
            errors.value = {}
            canConfirm() ? error.value = false : error.value = true
        } else {
            const formatted = result.error.format()
            error.value = true
            if(formatted[field]){ 
                errors.value[field] = formatted[field]._errors[0]
            }else{
                errors.value[field] = undefined
            }
        }
}

const resetInputs = () => {
    model.value = _Clone(initialModel)
    errors.value = {}
    error.value = true
}

watch(status, (newStatus) => {
    if (newStatus === 'idle') {
        mode.value = 'default'
    }
})

watch

</script>

<template>
    <ProfileForm @change-mode="modeChange" @confirm="handleUpdate" @clear="resetInputs" :mode="mode" :icon="icon"
        :error="error">
        <InputLabel>{{ currentLabel }}</InputLabel>
        <InputPassword v-model="model.currentPassword" :mode="mode" :error="errors.currentPassword" :name="'currentPassword'"
            :placeholder="currentPasswordPlaceholder" @validate="handleValid" />

            <div v-show="mode === 'edit'" class="mt-4">
            <InputLabel>Mật khẩu mới</InputLabel>

            <InputPassword v-model="model.newPassword" :mode="mode" :error="errors.newPassword" :name="'newPassword'"
                placeholder="Nhập mật khẩu mới" @validate="handleValid" />
            <InputPassword v-model="model.confirmPassword" :mode="mode" :error="errors.confirmPassword" :name="'confirmPassword'"
                placeholder="Nhập lại mật khẩu mới" @validate="handleValid" />
        </div>
    </ProfileForm>
</template>