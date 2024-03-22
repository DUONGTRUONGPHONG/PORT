<script setup lang="ts">
const props = withDefaults(defineProps<{
    type?: 'submit' | 'button' | 'reset';
    label: string;
    class?:string
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
    disabled?: boolean;
    loading?: boolean;
}>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
});

const defaultClasses = 'focus:ring-4 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center'

const variantClasses = computed(() => {
    return {
        primary: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800',
        secondary: 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 hover:bg-gradient-to-br focus:ring-gray-400 dark:focus:ring-gray-800',
        danger: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800',
        success: 'text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800',
        warning: 'text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-yellow-300 dark:focus:ring-yellow-800',
    }[props.variant];
});

const currentClasses = computed(() => {
    return cn(defaultClasses, variantClasses.value, props.class, {
        'opacity-30 cursor-not-allowed': props.disabled,
    }, {
        'opacity-50 cursor-not-allowed': props.loading,
    })
})

</script>

<template>
    <button :type="type"
        :class="currentClasses">
        {{ label }}
    </button>
</template>