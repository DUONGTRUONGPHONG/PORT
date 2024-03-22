<script setup lang="ts">
import type { ProfileFormMode } from './ProfileForm.vue';

const props = withDefaults(defineProps<{
    icon?: string,
    field: string,
    label: string,
    schema?: any,
    modelValue?: any
    type: string
}>(), {
    icon: 'bxs:edit'
})

const field = props.field
const label = props.label
const { changeStatus, emitFieldUpdate, status } = useFormGroup({ group: field })

const initialModel = reactive({
    [field]: props.modelValue
})
const errors = ref()
const error = ref(true)
const mode = ref<ProfileFormMode>('default')
const model = ref(_Clone(initialModel))
const currentLabel = computed(() => {
    return mode.value === 'default' ? label : `${label} hiện tại`
})

const currentPlaceholder = computed(() => {
    if (mode.value === 'default') {
        return props.modelValue? props.modelValue : `Chưa cập nhật ${label}`
    } else {
        return `Nhập ${label} hiện tại`
    }
})
const modeChange = () => {
    mode.value = mode.value === 'default' ? 'edit' : 'default'
}

const handleUpdate = () => {
    changeStatus('committing')
    emitFieldUpdate(model.value[field])
}

const canConfirm = () => {
    return errors.value === undefined
}

const handleValid = (event:any) =>{
    const result = props.schema.safeParse(model.value[field])
        if (result.success) {
            errors.value = undefined
            canConfirm() ? error.value = false : error.value = true
        } else {
            const formatted = result.error.format()
            error.value = true
                errors.value = formatted._errors[0]
        }
}


const resetInputs = () => {
    model.value = _Clone(initialModel)
    errors.value = undefined
    error.value = true
}

watch(status, (newStatus) => {
    if (newStatus === 'idle') {
        mode.value = 'default'
    }
})

</script>

<template>
    <ProfileForm @change-mode="modeChange" @confirm="handleUpdate" @clear="resetInputs" :mode="mode" :icon="icon"
        :error="error">
        <InputLabel>{{ currentLabel }}</InputLabel>
        <CustomInput v-model="model[props.field]" :error="errors" :mode="mode" :name="field" :placeholder="currentPlaceholder" :type="type" @validate="handleValid" />
    </ProfileForm>
</template>