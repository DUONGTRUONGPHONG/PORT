<script setup lang="ts">
import type { ProfileFormMode } from './ProfileForm.vue';

type EmailModels = {
    newEmail: string
    password: string
}
const props = withDefaults(defineProps<{
    icon?: string,
    modelValue:string,
    schema: any,
}>(), {
    icon: 'bxs:edit',
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const {changeStatus, emitFieldUpdate, status} = useFormGroup({group:'email'})

const initialModel = reactive<EmailModels>({
    newEmail: props.modelValue,
    password: ''
})
const errors = ref<any>({})
const error = ref(true)
const mode = ref<ProfileFormMode>('default')
const model = ref(_Clone(initialModel))
const currentLabel = computed(() => mode.value === 'default' ? 'Email' : 'Email mới')
const emailPlaceholder = computed(() => {
    if (mode.value === 'default') {
        if (props.modelValue) {
            return props.modelValue
        } else {
            return 'Chưa cập nhật'
        }
    } else {
        return 'Nhập email mới'
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
    return errors.value.newEmail === undefined && errors.value.password === undefined
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
</script>

<template>
    <ProfileForm @change-mode="modeChange" @confirm="handleUpdate" @clear="resetInputs" :mode="mode" :icon="icon" :error="error">
        <InputLabel>{{ currentLabel }}</InputLabel>
        <CustomInput :mode="mode" name="newEmail" v-model="model.newEmail" :placeholder="emailPlaceholder"
            :error="errors?.newEmail" @validate="handleValid" />

        <div v-show="mode === 'edit'" class="mt-4">
            <InputLabel>Mật khẩu xác thực</InputLabel>
            <CustomInput type="password" name="password" v-model="model.password" :error="errors?.password"
                :mode="mode" :placeholder="'Nhập mật khẩu hiện tại'" @validate="handleValid" />
        </div>
    </ProfileForm>
</template>