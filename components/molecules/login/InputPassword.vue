<script setup lang="ts">
import type { ProfileFormMode } from '../profile/ProfileForm.vue';

const props = defineProps<{
    error?: string
    placeholder?: string
    mode?: ProfileFormMode
    name?: string
}>()

const emit = defineEmits(['validate'])

const show = ref(false);

const model = defineModel<string>()

const toggleVisibility = () => {
    show.value = !show.value;
};

const inputClass = computed(() => {
    return [
        'text-md block mt-1 outline-none rounded w-full',
        props.mode === 'edit' ? 'border border-gray-200 p-2' : 'pointer-events-none'
    ]
})

const onInput = () => {
    emit('validate', { field: props?.name })
}
</script>

<template>
    <div>
        <div class="relative">
            <input :type="show ? 'text' : 'password'" v-model="model" :class="inputClass" :placeholder="placeholder"
                @input="onInput" />

            <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <a class="h-6 text-gray-700" @click="toggleVisibility">
                    <Icon name="fa6-solid:eye-slash" v-show="show && (mode ? mode === 'edit' : true)" />
                </a>
                <a class="h-6 text-gray-700" @click="toggleVisibility">
                    <Icon name="fa6-solid:eye" v-show="!show && mode === 'edit'" />
                </a>
            </div>
        </div>


        <p v-if="error" class="text-red text-xs mt-1">
            {{ error }}
        </p>
    </div>
</template>