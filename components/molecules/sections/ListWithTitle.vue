<script setup lang="ts">
import type { Article } from '~/server/models/v2/article';

const props = withDefaults(defineProps<{ 
    title?: string, 
    articles?: Article[] | any[],
}>(),{
    title:'',
});
</script>

<template>
    <div>
        <CustomText :text="title" tag="strong" class="text-lg xs:text-xl" />
        <div class="grid gap-y-4 mt-2">
            <Article mode="basicHorizontal" v-for="(item, index) in articles" :key="index" :thumb="item?.thumbnail" :slug="'/' + item?.category?.code + '/' + item.code" :title="item?.title" :brief="item?.intro" />
        </div>
    </div>
</template>