<script setup lang="ts">

const exchange = ref<any[]>([]);

const getExchange = async () => {
  try {
    const response = await $fetch("https://openapi.hhcorp.vn/exchange/get-indexes");
    exchange.value = response as any[];
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
    await getExchange();
});
</script>

<template>
    <ClientOnly>
        <div class="relative h-[400px] mt-4 overflow-hidden rounded-lg">
          <!-- Hình ảnh nền -->
          <img
            src="https://file3.qdnd.vn/data/images/0/2022/11/20/minhanh/ty%20gia%20usd%20hom%20nay%2021-11.jpg?dpi=150&quality=100&w=870"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 z-10 overflow-hidden shadow-md bg-opacity-70 bg-neutral-6"
          >
            <table class="w-full text-sm text-left text-white">
              <thead class="text-xs uppercase bg-white bg-opacity-20 text-center">
                <tr>
                  <th scope="col" class="py-3">Mã</th>
                  <th scope="col" class="py-3">Mua</th>
                  <th scope="col" class="py-3">Bán</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="currency in exchange" :key="currency.code" class="border-b">
                  <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                    {{ currency.code }}
                  </th>
                  <td class="px-6 py-4">
                    {{ currency.buyTransfer }}
                  </td>
                  <td class="px-6 py-4">
                    {{ currency.sellTransfer }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </ClientOnly>
</template>