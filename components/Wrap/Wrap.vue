<script setup lang="ts">
import { twJoin } from 'tailwind-merge';

const props = withDefaults(defineProps<{maxWidth?: 'sm'|'md'|'lg'|'xl'|'2xl'}>(),{
    maxWidth: 'xl'
})

const maxWidthStyles: Record<string,string> = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-8xl'
}

const currentStyles = computed(() =>{
    return twJoin('w-full mx-auto px-4', maxWidthStyles[props.maxWidth])
})

</script>

<template>
    <div :class="currentStyles">
        <slot />
    </div>
</template>