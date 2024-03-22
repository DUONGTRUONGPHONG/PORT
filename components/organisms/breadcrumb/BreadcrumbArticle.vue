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
        <ul class="breadcrumb flex items-center gap-6 text-sm overflow-x-auto">
            <li v-for="(item, index) in subtree" :key="index" class="relative inline-block first:text-blue">
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
    width: 7px;
    height: 7px;
    border-top: 1px solid #bdbdbd;
    border-right: 1px solid #bdbdbd;
    transform: rotate(45deg);
    position: absolute;
    left: -20px;
    top: 8px;
}
</style>