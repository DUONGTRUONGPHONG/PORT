<template>
    <div class="mx-auto  xl:max-w-[1320px] mt-3">
    <HighlightSection :categoryId="146" />
    <!-- <ClientOnly>
        <PublicationSection :categoryId="69" :title="'Nông nghiệp - Nông thôn '" />
    </ClientOnly> -->
    <div class="grid grid-cols-1 md:grid-cols-12">
        <div class="order-1 md:order-first   col-span-5 xl:col-span-3 ">
            <ColorfulBlock :categoryId="123" :title="'Góc nhìn'" />
        </div>
        <div class="order-2 xl:col-span-9  col-span-7 ">
            <FeaturedSection :categoryId="148" :imgFull="true" :title="'Đường thủy'" />
        </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2 xl:gap-4 gap-0">
      <SecondarySection :categoryId="128" :title="'Xã hội'" />
        <SecondarySection :categoryId="117" :title="'Giao thông 24h'" />
    </div>
    <FeaturedSection :categoryId="145" :title="'Hàng không'" />
    <FeaturedSection :categoryId="120" :title="'Đầu tư - phát triển'" />
    <MultimediaSection :categoryId="82" :title="'Đời sống'" />
  </div>
</template>