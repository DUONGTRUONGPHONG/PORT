<template>
    <section class="mb-8 mx-3">
        <header class="mb-3">
            <h2 class="text-xl xl:text-7 font-semibold font-playfair text-[#ff0018] flex items-end">
                <nuxt-link class="pr-2" :to="`/${data[0]?.category?.code}`">{{
                    title
                }}</nuxt-link>
                <div class="flex-1 mb-3 h-[2px] w-full bg-[#ff0018] inset-x-0"></div>
            </h2>
        </header>
        <article class="gap-4 mb-4 flex md:flex-row flex-col group" v-if="!ads">
            <figure class="w-full md:w-1/2 max-h-[300px] overflow-hidden rounded-lg">
                <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`">
                    <img class="object-cover w-full" :src="data[0]?.thumbnail" style="" />
                </nuxt-link>
            </figure>
            <header class="flex-1">
                <h3
                    class="font-playfair group-hover:text-[#ff0018] font-bold text-[1.25rem] md:text-[1.35rem] leading-[1.4]">
                    <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`">{{
                    data[0]?.title
                }}</nuxt-link>
                </h3>
                <div class="text-[1rem] sm:text-[1.1rem] line-clamp-4 mt-1">
                    <span v-html="data[0]?.intro"></span>
                </div>
            </header>
        </article>
        <div class="grid lg:grid-cols-2 xl:grid-cols-1 grid-cols-1 gap-3" v-if="!ads">
            <article class="flex gap-3 group" v-for="item in listData">
                <figure class="w-[150px] h-20">
                    <nuxt-link :to="`/${item?.category?.code}/${item?.code}`"><img alt=""
                            class="object-cover h-full w-full rounded-lg" :src="item?.thumbnail" style="" /></nuxt-link>
                </figure>
                <header class="flex-1">
                    <h3 class="font-playfair group-hover:text-[#ff0018] text-[1rem] sm:text-[1.1rem] leading-[1.4]">
                        <nuxt-link :to="`/${item?.category?.code}/${item?.code}`">{{
                    item.title
                }}</nuxt-link>
                    </h3>
                </header>
            </article>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="ads">
            <div class="'col-span-1'">
                <article class="mb-3 group">
                    <figure class="w-full max-h-[300px] overflow-hidden rounded-lg mb-3">
                        <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`">
                            <img class="object-cover w-full" :src="data[0]?.thumbnail" style="" />
                        </nuxt-link>
                    </figure>
                    <header>
                        <h3
                            class="font-playfair group-hover:text-[#ff0018] font-bold text-[1.25rem] md:text-[1.35rem] leading-[1.4]">
                            <nuxt-link :to="`/${data[0]?.category?.code}/${data[0]?.code}`">{{
                    data[0]?.title
                }}</nuxt-link>
                        </h3>
                    </header>
                </article>
                <article class="flex gap-3 mb-3 last:mb-0 group" v-for="item in listData">
                    <figure class="w-[150px] h-20">
                        <nuxt-link :to="`/${item?.category?.code}/${item?.code}`"><img alt=""
                                class="object-cover h-full w-full rounded-lg" :src="item?.thumbnail"
                                style="" /></nuxt-link>
                    </figure>
                    <header class="flex-1">
                        <h3
                            class="font-playfair group-hover:text-[#ff0018] text-[1rem] sm:text-[1.1rem] leading-[1.4] line-clamp-3">
                            <nuxt-link :to="`/${item?.category?.code}/${item?.code}`">{{
                    item?.title
                }}</nuxt-link>
                        </h3>
                    </header>
                </article>
            </div>
            <div class="col-span-1">
                <section class="text-[14px]">
                    <header class="mb-4">
                        <ul class="flex">
                            <li @click="focusTable = 'currency'" class="cursor-pointer uppercase text-[#ff0018]" :class="{
                    'bg-[#eaa23e] text-white rounded-sm':
                        focusTable === 'currency',
                }">
                                <a class="nav-link btn-sm py-1 px-2 active" type="button">Ngoại tệ</a>
                            </li>
                            <li @click="focusTable = 'gold'" class="cursor-pointer uppercase text-[#ff0018]" :class="{
                    'bg-[#eaa23e] text-white rounded-sm': focusTable === 'gold',
                }">
                                <a class="nav-link btn-sm py-1 px-2" type="button">Giá vàng</a>
                            </li>
                        </ul>
                    </header>
                    <div>
                            <div :class="{ hidden: focusTable === 'gold' }">
                                <div class="overflow-x-auto">
                                    <table class="table text-left border bg-white table-striped"
                                        id="tableExchange">
                                        <thead>
                                            <tr>
                                                <th class="min-w-[80px] border-r p-1">Mã NT</th>
                                                <th class="min-w-[80px] border-r p-1">Mua TM</th>
                                                <th class="min-w-[80px] border-r p-1">Mua CK</th>
                                                <th class="min-w-[80px] border-r p-1">Bán TM</th>
                                                <th class="min-w-[80px] border-r p-1">Bán CK</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>AUD</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">15,931.27</td>
                                                <td class="min-w-[80px] border-r p-1">16,092.19</td>
                                                <td class="min-w-[80px] border-r p-1">16,609.21</td>
                                                <td class="min-w-[80px] border-r p-1">16,609.21</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>CAD</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">17,861.73</td>
                                                <td class="min-w-[80px] border-r p-1">18,042.16</td>
                                                <td class="min-w-[80px] border-r p-1">18,621.82</td>
                                                <td class="min-w-[80px] border-r p-1">18,621.82</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>CHF</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">27,379.18</td>
                                                <td class="min-w-[80px] border-r p-1">27,655.74</td>
                                                <td class="min-w-[80px] border-r p-1">28,544.27</td>
                                                <td class="min-w-[80px] border-r p-1">28,544.27</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>USD</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">24,480.00</td>
                                                <td class="min-w-[80px] border-r p-1">24,510.00</td>
                                                <td class="min-w-[80px] border-r p-1">24,850.00</td>
                                                <td class="min-w-[80px] border-r p-1">24,850.00</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>EUR</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">26,326.87</td>
                                                <td class="min-w-[80px] border-r p-1">26,592.80</td>
                                                <td class="min-w-[80px] border-r p-1">27,771.68</td>
                                                <td class="min-w-[80px] border-r p-1">27,771.68</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>GBP</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">30,770.80</td>
                                                <td class="min-w-[80px] border-r p-1">31,081.61</td>
                                                <td class="min-w-[80px] border-r p-1">32,080.21</td>
                                                <td class="min-w-[80px] border-r p-1">32,080.21</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>JPY</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">162.12</td>
                                                <td class="min-w-[80px] border-r p-1">163.75</td>
                                                <td class="min-w-[80px] border-r p-1">171.59</td>
                                                <td class="min-w-[80px] border-r p-1">171.59</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div :class="{ hidden: focusTable === 'currency' }">
                                <div class="table-responsive mt-3">
                                    <table class="table text-left border bg-white table-striped" id="boxGold">
                                        <thead>
                                            <tr>
                                                <th class="min-w-[80px] border-r p-1">Loại vàng</th>
                                                <th class="min-w-[80px] border-r p-1">Giá mua</th>
                                                <th class="min-w-[80px] border-r p-1">Giá bán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1"><strong>SJC 2c, 1C, 5 phân</strong></td>
                                                <td class="min-w-[80px] border-r p-1">79,000,000</td>
                                                <td class="min-w-[80px] border-r p-1">81,030,000</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1"><strong>SJC 5c</strong></td>
                                                <td class="min-w-[80px] border-r p-1">79,000,000</td>
                                                <td class="min-w-[80px] border-r p-1">81,020,000</td>
                                            </tr>
                                            <tr class="border-t">
                                                <td class="min-w-[80px] border-r p-1">
                                                    <strong>Vàng nhẫn SJC 99,99 1 chỉ, 2 chỉ, 5 chỉ</strong>
                                                </td>
                                                <td class="min-w-[80px] border-r p-1">67,600,000</td>
                                                <td class="min-w-[80px] border-r p-1">68,900,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps(["categoryId", "title", "ads"]);
import { ref } from "vue";
import { useArticleStoreV2 } from "~/stores/v2/article.ts";
import type { Article } from '~/server/models/v2/article';
const articleStoreV2 = useArticleStoreV2();
const data = ref<Article[]>([]);
const listData = ref<Article[]>([]);
const focusTable = ref<"currency" | "gold">("currency");
const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(
        props.categoryId,
        6
    );
    if (data.value.length > 0) {
        listData.value = data.value.slice(1, 5);
    }
};
await fetchData();
</script>
