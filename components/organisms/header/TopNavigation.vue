<script setup lang="ts">
import { useNavigationStoreV2 } from '~/stores/v2/navigation';
import {storeToRefs} from "pinia";
import { vInterpolate } from '~/directives/v-interpolate';
import * as cherrio from 'cheerio'

const v2NavigationStore = useNavigationStoreV2()
const {topMenu} = storeToRefs(v2NavigationStore)

const $ = cherrio.load(topMenu.value)

const html = $('.parent').addClass('xl:(flex items-center justify-center)')
html.find('>li').addClass('relative group xl:mr-3 hover:text-blue')
html.find('ul').addClass('hidden w-200px shadow group-hover:(block absolute top-full left-0 bg-white z-50)')
html.find('>li>a').addClass('block py-4')
html.find('>li>ul>li>a').addClass('block py-10px px-15px text-black hover:(bg-blue text-white)')

</script>

<template>
    <nav class="main-nav text-sm z-40 sticky top-0 bg-white relative border-y border-neutral-200 hidden xl:block" v-interpolate v-html="html">
    </nav>
</template>