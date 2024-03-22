<script setup lang="ts">
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = withDefaults(defineProps<{
    previewImage: string
}>(), {
    previewImage: '',
})

const emit = defineEmits<{
    change: [value: any]
}>()

const isReady = ref(false)
const crop = ref()

const defaultSize = ({ imageSize }: { imageSize: any }) => {
    return {
        width: Math.min(imageSize.height, imageSize.width),
        height: Math.min(imageSize.height, imageSize.width),
    };
}

const stencilSize = ({ boundaries }: { boundaries: any }) => {
    return {
        width: Math.min(boundaries.height, boundaries.width),
        height: Math.min(boundaries.height, boundaries.width),
    };
}

const onChange = (result:any)=>{
  if(isReady.value) {
    emit('change', {crop})}
}

const onReady = () => {
    isReady.value = true
}
</script>

<template>
    <cropper ref="crop" class="v-cropper" background-class="v-cropper__background"
        foreground-class="v-cropper__foreground" :stencil-component="CircleStencil" image-restriction="fit-area"
        :stencil-size="stencilSize" :stencil-props="{
            lines: {},
            handlers: {},
            movable: false,
            scalable: false,
            aspectRatio: 1,
            previewClass: 'v-cropper__stencil',
        }" :transitions="false" :debounce="false" :default-size="defaultSize" :min-width="300"
        :min-height="300" :src="previewImage" @ready="onReady" @change="onChange"/>
</template>

<style lang="scss">
.v-cropper {
    max-width: 500px;
    max-height: 500px;

    &__background {
        background-color: #edf2f4;
    }

    &__foreground {
        background-color: #edf2f4;
    }

    &__stencil {
        border: solid 5px rgb(29, 161, 242);
    }
}
</style>