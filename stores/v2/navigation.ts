import { defineStore, acceptHMRUpdate } from 'pinia'

export const useNavigationStoreV2 = defineStore('navigation-v2', () => {
 const topMenu = ref('')

async function fetchNavigation() {
    const {data, error } = await useFetch('/api/v2/navigation')

    if (error.value) {
        return ''
    }

    if(data.value) {
        topMenu.value = data.value
    }

    return topMenu.value
}

 return {topMenu, fetchNavigation}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useNavigationStoreV2, import.meta.hot))
}
