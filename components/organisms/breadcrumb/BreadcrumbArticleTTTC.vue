<script setup lang="ts">
import { useCategoryStoreV2 } from '~/stores/v2/category';
import {type Category } from '~/server/models/v2/category';

const props = defineProps<{
    category?: Category
}>()


const v2CategoryStore = useCategoryStoreV2()
const subtree = v2CategoryStore.findParents(props.category)

const slug = (cate:Category)=>{
    let slug = ''
    if(cate.parentId && cate.parentId !== 41){
        const parentSlug = subtree.find((item:Category) => item.id === cate.parentId)?.code
        slug=parentSlug + '/' + cate?.code
    }else{
        slug = cate?.code
    }
    return utils.generateSlugWithId('/category', slug)
}

</script>

<template>
    <div class="overflow-x-hidden">
        <ul class="breadcrumb flex flex-wrap items-center gap-x-6 gap-y-2 text-[20px] overflow-x-auto mb-[1.5rem]">
            <li v-for="(item, index) in subtree" :key="index" class="relative inline-block first:text-blue tracking-wide">
                <NuxtLink v-if="item.id === 41" to="/">
                    {{ item?.title }}
                </NuxtLink>
                <NuxtLink v-else :to="`/${item.code}`">
                    {{ item?.title }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    
.breadcrumb li:not(:first-child):before {
    content: "";
    width: 20px;
    height: 20px;
    border-right: 2px solid #bdbdbd;
    transform: rotate(10deg) translateY(-50%);
    position: absolute;
    left: -33px;
    top: 40%;
}

.breadcrumb li:last-child {
    padding: 2px 20px;
    font-weight: 700;
    color: #fff;
    background-color: #ff0018;
}
</style>