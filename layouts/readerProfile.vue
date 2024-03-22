<script setup lang="ts">
import { useProfileStore } from '~/stores/v2/profile';


const profileStore = useProfileStore()

const { reader } = storeToRefs(profileStore)
</script>

<template>
  <Body class="antialiased text-black max-w-screen max-w-full w-full overflow-x-hidden">
    <Header />
    <Wrap max-width="md">
      <Row v-if="reader" class="mb-6 mt-4">
        <div class="lg:(w-4/12) relative z-2">
          <UserMenu group="reader" position="sticky" />
        </div>

        <div class="lg:(w-8/12 ml-6) relative z-1">
          <slot />
        </div>
      </Row>

      <Message v-else :message="'Thông tin không tồn tại.'" class="my-10" />
    </Wrap>
    <Footer />
  </Body>
</template>