<script setup lang="ts">
import { useModalStoreV2 } from '~/stores/v2/modal';

const modalStore = useModalStoreV2()

const { status } = useAuth()

const openModal = () => {
    modalStore.setAuthModalActive(true)
};

</script>

<template>
        <button @click="openModal" v-if="status === 'unauthenticated'" class="outline-none flex py-2 bg-transparent">
            <Icon name="fa6-regular:circle-user" size="16" />
        </button>

        <User v-else /> 
</template>