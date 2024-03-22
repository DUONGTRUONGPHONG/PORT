<script setup lang="ts">
import { useProfileStore } from '~/stores/v2/profile';

const profileStore = useProfileStore()

const { profile } = storeToRefs(profileStore)
const { status } = useAuth()

watchEffect(async () => {
  if (status.value === 'unauthenticated') {
    await navigateTo('/')
  }
})
</script>

<template>
  <Body class="antialiased text-black max-w-screen max-w-full w-full overflow-x-hidden">
    <Header />
    <Wrap max-width="md">
      <Row v-if="profile" class="mb-6 mt-4">
        <div class="lg:(w-4/12) relative z-2">
          <UserMenu group="self" position="sticky" />
        </div>

        <div class="lg:(w-8/12 ml-6) relative z-1">
          <slot />
        </div>
      </Row>
    </Wrap>
    <Footer />
  </Body>
</template>