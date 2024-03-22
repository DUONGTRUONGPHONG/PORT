<template>
    <div>
        <div class="glide relative">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide" v-for="item in data">
                        <ArticleCol :minWidth="'400px'" :category="item"></ArticleCol>
                    </li>
                </ul>
            </div>
            <div class="glide__bullets absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" data-glide-el="controls[nav]">
                <button
                    class="glide__bullet w-2 h-2 inline-block rounded-lg cursor-pointer mx-1 transition duration-200 ease-out bg-[#eee]"
                    :data-glide-dir="`=${index}`" v-for="(i, index) in data?.length">
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['categoryId'])
import dayjs from 'dayjs';
import { ref } from 'vue'
import { useArticleStoreV2 } from '~/stores/v2/article.ts'
const articleStoreV2 = useArticleStoreV2()
const data = ref([])
const fetchData = async () => {
    data.value = await articleStoreV2.fetchByCategoryIdWithPaging(props.categoryId, 12)
}
await fetchData()

</script>