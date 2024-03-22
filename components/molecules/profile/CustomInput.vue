<script setup lang="ts">
import type { ProfileFormMode } from './ProfileForm.vue';

export type InputBusType = {
    status: 'idle' | 'clear'
}

const props = withDefaults(defineProps<{
    error?: string | boolean
    mode?: ProfileFormMode
    name?: string
    placeholder?: string
    type?: string
    modelValue?: string | number
}>(), {
    mode: 'default',
    type: 'text'
})

const emit = defineEmits(['update:modelValue', 'validate'])

const onInput = async (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
    emit('validate', {field:props?.name})
}

const inputClass = computed(() => {
    return [
        'text-md block outline-none rounded w-full mt-1',
        props.mode === 'edit' ? 'border border-gray-200 p-2' : 'pointer-events-none'
    ]
})

</script>

<template>
    <div class="relative">
        <input :type="type" :value="modelValue"
            :class="inputClass"
            :placeholder="placeholder" @input="onInput" />

        <p v-if="error" class="text-red text-xs mt-1">
            {{ error }}
        </p>
    </div>
</template>