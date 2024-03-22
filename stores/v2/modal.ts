import { defineStore, acceptHMRUpdate } from 'pinia'

export const useModalStoreV2 = defineStore('modal-v2', () => {

    const authModalActive = ref(false)

    function setAuthModalActive(value: boolean) {
        authModalActive.value = value
    }
 
 return {authModalActive, setAuthModalActive}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useModalStoreV2, import.meta.hot))
}
