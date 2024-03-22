<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const langSwitcherEl = ref<HTMLDivElement>();

const selectingLanguages = ref<boolean>(false);
const classes = computed(() => ({
    "pointer-events-auto opacity-100": selectingLanguages.value,
    "pointer-events-none opacity-0": !selectingLanguages.value,
}));
onClickOutside(langSwitcherEl, () => selectingLanguages.value = false);

const languages = ['Tiếng việt']

const onSelectLanguage = () => selectingLanguages.value = false
</script>

<template>
    <div ref="langSwitcherEl" id="lang-switcher" class="relative text-sm">
        <button class="text-sm bg-transparent" @click="selectingLanguages = !selectingLanguages">
            Tiếng việt
        </button>
        <div id="languages-switchable" :class="classes"
            class="absolute z-50 min-w-36 right-0  top-10 bg-white rounded shadow overflow-hidden shadow-lg flex flex-col duration-300">
            <div class="relative w-full px-1 py-1">
                <ul>
                    <li v-for="(l, i) in languages" @click="onSelectLanguage"  :key="i">
                        <button class="py-2 w-full rounded duration-300 hover:bg-blue-400 hover:text-white">
                            {{ l }} 
                        </button>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
