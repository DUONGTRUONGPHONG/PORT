<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { useProfileStore } from '~/stores/v2/profile';

const props = defineProps<{
    position: 'dropdown' | 'sticky'
    group: 'self' | 'reader'
}>()

const { status, signOut } = useAuth()
const profileStore = useProfileStore()
const { profile, reader } = storeToRefs(profileStore)
const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ type: string }>()

const classes = computed(() => {
    return [
        props.position === 'sticky' && 'sticky top-16 left-0'
    ]

})

const xName = computed<string | undefined>(() => {
    if (props.group === 'self') {
        return profile.value?.alias
    } else {
        return reader.value?.alias
    }
})

const joinAt = computed<string | undefined>(() => {
    if (props.group === 'self') {
        return profile.value?.createdOn
    } else {
        return reader.value?.createdOn
    }
})

const userId = computed(() => {
    if (props.group === 'self') {
        return profileStore.getCurrentUserId()
    } else {
        return reader.value?.id
    }
})

const totalComment = computed(() => {
    if (props.group === 'self') {
        return profile.value?.totalComment
    } else {
        return reader.value?.totalComment
    }
})

const image = computed(() => {
    if (status.value === 'authenticated' &&  props.group === 'self' && props.position==='dropdown') {
        return profile.value?.avatar
    } else {
        return reader.value?.avatar
    }
})

const logout = async () => {
    if (profile.value) profile.value = null
    await signOut({ redirect: props.position === 'sticky', callbackUrl: '/' })
}
</script>

<template>
    <DefineTemplate v-slot="{ type }" class="bg-white">
        <ul :class="['leading-loose', { 'hidden lg:block': position === 'sticky' && type === 'sticky' },{' mt-3 pt-3 border-t':type!=='dropdown'}]">
            <li v-if="group==='self'">
                <NuxtLink to="/users/profile" class="menu-link" activeClass="active">
                    Thông tin chung
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="`/users/feed/${userId}`" class="menu-link" activeClass="active">
                    {{ group==='self' ? 'Ý kiến của bạn' : 'Ý kiến' }}
                    <span class="count-feed" v-if="position === 'sticky'">({{ totalComment }})</span>
                </NuxtLink>
            </li>
            <li v-if="group==='self'">
                <NuxtLink to="/" class="menu-link" activeClass="active">
                    Tin đã lưu
                </NuxtLink>
            </li>
            <li v-if="group==='self'">
                <NuxtLink to="/" class="menu-link" activeClass="active">
                    Tin đã xem
                </NuxtLink>
            </li>
        </ul>
        
            <button v-if="group==='self'" type="button" :class="['menu-link bg-transparent mt-3', {'hidden lg:block':type==='sticky' && position==='sticky'}]" @click="logout()">
                Đăng xuất

                <Icon name="ic:round-logout" class="ml-2 mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
            </button>
    </DefineTemplate>
    <div :class="['border rounded-lg p-3 text-sm bg-white', classes]">
        <div class="flex items-center relative">
            <AvatarManagement v-if="position === 'sticky' && status === 'authenticated' && group==='self'"/>
            <Avatar v-else class="leading-36px" :image="image" :name="xName" />

            <div class="ml-2 ">
                <p class="text-sm font-medium">
                    {{ xName }}
                </p>

                <p v-if="position === 'sticky'" class="text-xs text-[#757575]">Tham gia từ
                    {{ utils.formateDate(joinAt, 'L').slice(4) }}
                </p>
            </div>
            <!-- <HeadlessMenu v-if="position==='sticky'">
                <HeadlessMenuButton class="lg:hidden bg-transparent absolute top-1 right-0 px-2 py-1 rounded-full hover:bg-gray-100 outline-none">
                    <Icon name="tabler:dots" />
                </HeadlessMenuButton>
                <HeadlessMenuItems class="absolute top-full right-0 bg-gray-200 rounded p-2">
                    <ReuseTemplate :type="'dropdown'" />
                </HeadlessMenuItems>
            </HeadlessMenu> -->
        </div>
        <ReuseTemplate :type="'sticky'" />
    </div>
</template>