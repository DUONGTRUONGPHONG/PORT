<script lang="ts" setup>

const widgetsStore = useWidgetsStore();
const layoutstore = useLayoutStore();

const { weather } = storeToRefs(widgetsStore);
const { megaMenuActive } = storeToRefs(layoutstore);

const navClass = ref("");
const handleScroll = () => {
  if (window.scrollY > 0) {
    navClass.value = "shadow-md";
  } else {
    navClass.value = "";
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await widgetsStore.fetchWeatherByLocation();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <header id="header" class="relative">
    <Wrap max-width="2xl" class="py-1">
      <div
        id="top-bar-inner"
        class="flex items-center justify-between md:justify-center md:divide-x"
      >
        <NuxtLink to="/" id="logo" class="pr-6">
          <img
            src="/images/200.png"
            alt="logo"
            class="object-cover w-24"
          />
        </NuxtLink>

        <ClientOnly>
          <CurrentDateTime class="md:px-4 pt-5px" />
        </ClientOnly>

        <div class="items-center hidden px-6 ml-auto space-x-8 lg:flex">
          <div>
            <ClientOnly>
              <div v-if="weather" class="flex items-center space-x-1">
                <p class="text-l">{{ weather.location.name }}</p>
                <img
                  :src="weather.current.condition.icon"
                  alt="Weather Icon"
                  class="h-8"
                />
                <p class="text-l">{{ weather.current.temp_c }}°C</p>
              </div>
              <div v-else>
                <p>Đang tải thông tin thời tiết...</p>
              </div>
            </ClientOnly>
          </div>
        </div>

        <div class="hidden md:flex gap-4 items-center px-4">
          <Search />
          <NuxtLink :to="`/subscriptions/paper`">
            <Icon name="material-symbols:book-4-outline"/>
          </NuxtLink>
          <Auth />
        </div>

        <LangSwitcher class="hidden md:block px-4 pt-5px" />
        
        <div class="xl:hidden block pl-4">
          <button
            type="button"
            v-show="!megaMenuActive"
            @click="layoutstore.setStatus(true)"
            class="py-1 duration-300 hover:text-blue-500 bg-transparent"
          >
            <Icon name="fa6-solid:bars" />
          </button>
          <button
            type="button"
            v-show="megaMenuActive"
            @click="layoutstore.setStatus(false)"
            class="py-1 duration-300 hover:text-red-500 bg-transparent"
          >
            <Icon name="fa6-solid:xmark" />
          </button>
        </div>

      </div>
    </Wrap>
  </header>
  <TopNavigation />

  <Teleport to="body">
    <MegaV2 />
  </Teleport>
</template>
<style></style>
