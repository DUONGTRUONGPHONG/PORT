<script setup lang="ts">
export type ProfileFormMode = 'default' | 'edit'

const props = defineProps<{
    error?: boolean
    icon: string
    mode: ProfileFormMode
}>()

const emits = defineEmits(['change-mode','clear','confirm'])

const currentConfirmLabel = computed(() => {
    return props.mode === 'default' ? 'Chỉnh sửa' : 'Lưu'
})

const handleConfirm = () => {
    if (props.error) {
        return
    }
    
    emits('confirm')
}

const handleCancel = () => {
    emits('change-mode')
    emits('clear')
}

const changeMode = () => {
    emits('change-mode')
}

const changeModeButtonClass = computed(() => {
    return [
        'absolute transition-opacity top-3 right-0 bg-transparent',
        utils.isTouchDevice() ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
    ]
})

</script>

<template>
    <div>
        <div class="grid grid-cols-[max-content_1fr] gap-x-4">
            <Icon :name="icon" size="20" class="row-span-2" />

            <div class="text-sm relative flex flex-col group">
                <slot />

                <button v-if="mode === 'default'" type="button"
                    :class="changeModeButtonClass"
                    @click="changeMode">
                    Chỉnh sửa
                </button>

                <div class="mt-2 flex gap-x-2" v-if="mode === 'edit'">
                    <Button variant="secondary" class="px-2 py-1 w-full" @click="handleCancel" label="Hủy bỏ" />
                    <Button variant="primary" class="px-2 py-1 w-full" @click=" error || handleConfirm()"
                        :label="currentConfirmLabel" :disabled="error" />
                </div>
            </div>
            <hr class="border-gray-300 mt-2">
        </div>
    </div>
</template>