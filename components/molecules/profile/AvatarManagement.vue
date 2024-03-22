<script setup lang="ts">
import { useProfileStore } from '~/stores/v2/profile';
const v2ProfileStore = useProfileStore()
const {profile} = storeToRefs(v2ProfileStore)
const fileUpload=ref<File | null>(null)
const previewImage = ref('')
const isOpen = ref(false)
const zoom = ref(0)
const cropper = ref()
const handleClose = () => {
  isOpen.value = false
}
const {data}=useAuth()
const token =data.value?.user?.accessToken
const handleUploadAvatar = async () => {
  const form = new FormData()
    form.append('file',fileUpload.value)
      const uploadedImage = await $fetch(`${useRuntimeConfig().public.apiUrl}/com/resources/file`, {
        method: 'POST',
        body: form,
        headers: { 
    'Authorization': `Bearer ${token}`,
  },
      })
      if(uploadedImage) {
        const updatedProfile = await v2ProfileStore.update({ avatar: `https://vpress.vn/${uploadedImage.item.publicUrl}` })
        if(updatedProfile) {
          handleClose()
          await v2ProfileStore.fetchCurrentUser(true)
        }
      }
  // if (cropper.value) {
  //   const result = cropper.value.getResult()
    // result.canvas.toBlob(async (blob: any) => {
    //   
    //   form.append('file', blob, 'avatar.jpg')
    //   const uploadedImage = await $fetch('https://portal-api-stable.vpress.vn/api-v1/com/resources/file', {
    //     method: 'POST',
    //     body: form
    //   })
    //   if(uploadedImage) {
    //     const updatedProfile = await v2ProfileStore.update({ avatar: uploadedImage.publicUrl })
    //     if(updatedProfile) {
    //       handleClose()
    //       await v2ProfileStore.fetchCurrentUser(true)
    //     }
    //   }
    // }, 'image/jpeg')
  //}
}


const handlePreviewFile = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.item(0)
  if (!file) return
  fileUpload.value=file
  const reader = new FileReader()
  reader.onloadend = (event) => {
    previewImage.value = event.target?.result as string
    isOpen.value = true
  }
  reader.readAsDataURL(file)
}

const onChange = ({ crop }: any) => {
  if (crop) {
    cropper.value = crop.value
    const { coordinates, imageSize } = cropper.value;
    if (
      imageSize.width / imageSize.height >
      coordinates.width / coordinates.height
    ) {
      // Determine the position of slider bullet
      // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
      zoom.value =
        (cropper.value.imageSize.height - cropper.value.coordinates.height) /
        (cropper.value.imageSize.height - cropper.value.sizeRestrictions.minHeight);
    } else {
      zoom.value =
        (cropper.value.imageSize.width - cropper.value.coordinates.width) /
        (cropper.value.imageSize.width - cropper.value.sizeRestrictions.minWidth);
    }
  }
}

const onZoom = (value: number) => {
  if (cropper.value) {
    if (cropper.value.imageSize.height < cropper.value.imageSize.width) {
      const minHeight = cropper.value.sizeRestrictions.minHeight
      const imageHeight = cropper.value.imageSize.height
      cropper.value.zoom((imageHeight - zoom.value * (imageHeight - minHeight)) / (imageHeight - value * (imageHeight - minHeight)))
    } else {
      const minWidth = cropper.value.sizeRestrictions.minWidth
      const imageWidth = cropper.value.imageSize.width
      cropper.value.zoom((imageWidth - zoom.value * (imageWidth - minWidth)) / (imageWidth - value * (imageWidth - minWidth)))
    }
  }
}
</script>

<template>
  <div class="relative">
    <Avatar class="h-[48px] w-[48px] leading-[48px] text-white font-extrabold" :image="profile?.avatar" :name="profile?.alias" />
    <FileInput class="absolute bottom-0 right-0" @change="handlePreviewFile" />
  </div>

  <LazyModal :is-open="isOpen" @close="handleClose" fit-content>
    <CustomCropper :previewImage="previewImage" @change="onChange" />

    <ZoomNavigation :zoom="zoom" @change="onZoom" />

    <div class="flex justify-between">
      <Button @click="handleClose" label="Hủy bỏ" class="w-full" variant="secondary" />
      <Button class="ml-2 w-full" @click="handleUploadAvatar" label="Xác nhận" />
    </div>
  </LazyModal>
</template>