<script setup lang="ts">
import type { ProfileFormMode } from './ProfileForm.vue';

const props = withDefaults(defineProps<{
    modelValue: number
    icon?: string,
    field: string,
}>(),{
    icon: 'bxs:edit'

})

const field = props.field
const { changeStatus, emitFieldUpdate, status } = useFormGroup({ group: field })
const mode = ref<ProfileFormMode>('default')
const model = ref(_Clone(props.modelValue))
const errors = ref()
const error = ref(true)

const genderLabels = ['Khác', 'Nam', 'Nữ']

const displayValue = computed(() => genderLabels[model.value])

const currentLabel = computed(() => {
    return mode.value === 'default' ? 'Giới tính' : 'Chọn giới tính'
})

const handleUpdate = () => {
    changeStatus('committing')
    emitFieldUpdate(model.value)
}

watch(model, () => {
    if(model.value !== props.modelValue) {
        error.value = false
    } else {
        error.value = true
    }
})

watch(status, (newStatus) => {
    if (newStatus === 'idle') {
        mode.value = 'default'
    }
})


const modeChange = () => {
    mode.value = mode.value === 'default' ? 'edit' : 'default'
}

const resetInputs = () => {
    model.value = _Clone(props.modelValue)
    errors.value = undefined
    error.value = true
}

</script>

<template>
    <ProfileForm @change-mode="modeChange" @confirm="handleUpdate" @clear="resetInputs" :mode="mode" :icon="icon" :error="error">
        <InputLabel>{{ currentLabel }}</InputLabel>
        <p v-if="mode==='default'">{{ displayValue }}</p>
        <ul v-else
            class="mt-2 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-license" type="radio" :value="1" v-model="model" name="list-radio"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ">
                    <label for="horizontal-list-radio-license"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam
                    </label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-id" type="radio" :value="2" v-model="model" name="list-radio"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ">
                    <label for="horizontal-list-radio-id"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-military" type="radio" :value="0" v-model="model" name="list-radio"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ">
                    <label for="horizontal-list-radio-military"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Khác</label>
            </div>
        </li>
    </ul>
    </ProfileForm>
</template>