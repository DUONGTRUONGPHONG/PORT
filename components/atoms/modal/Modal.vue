<script setup lang="ts">
interface ModalProps {
  isOpen?: boolean;
  fitContent?: boolean;
}
const props = withDefaults(defineProps<ModalProps>(), {
  isOpen: false,
  fitContent: false,
});
const emit = defineEmits(["close", "update:isOpen"]);
const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit("update:isOpen", val),
});
const closeModal = () => {
  isOpen.value = false;
  emit("close");
};
</script>

<template>
  <!-- <HeadlessTransitionRoot appear :show="false" as="template">
    <HeadlessDialog as="div" @close="closeModal">
      <HeadlessTransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
      </HeadlessTransitionChild>
      <div class="fixed top-0 left-0 w-full h-full bg-black/30 z-50">
        <div class="fixed inset-0 overflow-hidden">
          <div class="flex min-h-full justify-center p-4 text-center items-center">
            <HeadlessTransitionChild
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <HeadlessDialogPanel
                :class="['w-full max-w-4xl transform overflow-x-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all', fitContent ? 'max-h-[fit-content]':'max-h-560px']"
              >
                <HeadlessDialogTitle>
                  <slot name="title" />
                </HeadlessDialogTitle>
                <slot name="default" />
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot> -->

  <a-modal v-model:open="isOpen" :footer="null" :closable="false">
    <slot name="title" />
    <slot name="default" />
  </a-modal>
</template>

<style lang="scss">
</style>
