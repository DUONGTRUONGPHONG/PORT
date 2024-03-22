<template>
    <div :class="props.name || 'glide'">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <slot />
            </ul>
        </div>
        <div class="glide__arrows hidden" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="|<">prev</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir="|>">next</button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import Glide, { Controls, Breakpoints, Autoplay, Swipe } from '@glidejs/glide/dist/glide.modular.esm'

const props = defineProps<{
    perView?: string | number
    rewind?: boolean
    bound?: boolean
    breakpoints?: any
    gap?: number | string
    navigation?: string[]
    name?: string
}>()

onMounted(() => {
    let root = `.${props.name || 'glide'}`

    const glide = new Glide(root, {
        perView: Number(props.perView),
        perSwipe: '|',
        rewind: props.rewind || false,
        bound: props.bound || false,
        breakpoints: props.breakpoints || {},
        gap: Number(props.gap) || 16,
        focusAt: 'center',
        type: 'carousel'
    })
    glide.mount({ Controls, Breakpoints, Swipe, Autoplay })
})
</script>

<style lang='scss'>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
</style>