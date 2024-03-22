
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    src?: string
}>()

const isMoreControl = ref(false)
const isPlayed = ref(true)
const isVolume = ref(true)
const speedList = ref<{ [key: number]: string }>({
    1: '0.5x',
    2: '0.75x',
    3: '1.0x',
    4: '1.25x',
    5: '1.50x',
})
const speedIndexDefault = ref(3)
const speedDefault = ref(speedList.value[speedIndexDefault.value])
const volume = ref(1.0);
const audioPlayer = ref<HTMLAudioElement | null>(null);
const currentTime = ref(0);
const duration = ref(0);

function setUpVolums() {
    isVolume.value = !isVolume.value
    if (audioPlayer.value) {
        if (isVolume.value) {
            audioPlayer.value.volume = 1;
        } else {
            audioPlayer.value.volume = 0;
        }
    }
}

const updateVolume = () => {
    if (audioPlayer.value) {
        audioPlayer.value.volume = volume.value;
        if (volume.value == 0) {
            isVolume.value = false
        } else {
            isVolume.value = true
        }
    }
};

function chanageSpeed() {
    if (speedIndexDefault.value < 5) {
        console.log('ol')
        speedIndexDefault.value += 1
        if (audioPlayer.value) {
            audioPlayer.value.playbackRate += 0.25;
        }
        speedDefault.value = speedList.value[speedIndexDefault.value]
    } else {
        if (audioPlayer.value) {
            audioPlayer.value.playbackRate = 0.5;
        }
        speedIndexDefault.value = 1
        speedDefault.value = speedList.value[1]
    }
}

function togglePlayer() {
    isPlayed.value = !isPlayed.value
    if (audioPlayer.value) {
        if (isPlayed.value) {
            audioPlayer.value.pause();
        } else {
            audioPlayer.value.play();
        }
    }
}

function replayAndForward(time: number) {
    if (audioPlayer.value) {
        if (audioPlayer.value.currentTime == audioPlayer.value.duration) {
            isPlayed.value = true
        } else {
            audioPlayer.value.currentTime = audioPlayer.value.currentTime + time
        }
    }
}

const seekToTime = () => {
    if (audioPlayer.value) {
        audioPlayer.value.currentTime = currentTime.value;
    }
};

const updateCurrentTime = () => {
    if (audioPlayer.value) {
        currentTime.value = audioPlayer.value.currentTime;
    }
}

const updateDuration = () => {
    if (audioPlayer.value) {
        duration.value = audioPlayer.value.duration;
    }
}

const currrentTimeComputed = computed(() => {
    return utils.formattedTime(currentTime.value)
})

const durationComputed = computed(() => {
    return utils.formattedTime(duration.value)
})

</script>

<template>
    <audio :src="src" preload="auto" ref="audioPlayer" @timeupdate="updateCurrentTime" @loadedmetadata="updateDuration" />
    <div class="relative">
        <div class="w-full">
            <input class="w-full accent-[#fff] cursor-pointer" type="range" v-model="currentTime" @input="seekToTime" :max="duration" />

            <div class="flex items-center justify-between px-4 ">
                <span class="text-[10px] sm:text-lg font-normal font-[Raleway] text-[#fff]">{{ currrentTimeComputed }}</span>
                <span class="text-[10px] sm:text-lg font-normal font-[Raleway] text-[#fff]">{{ durationComputed }}</span>
            </div>
        </div>
        <div class="w-full px-4 ">
            <div class="flex items-center justify-between">
                <div>
                    <button @click="chanageSpeed"
                        class="text-[#fff] bg-transparent text-sm sm:text-sm lg:text-lg flex gap-1"><span
                            class="hidden lg:block">Tốc độ phát </span> <span
                            class="font-bold text-[12px] sm:text-sm lg:text-lg">{{
                                speedDefault
                            }}</span> </button>
                </div>
                <div>
                    <button @click="replayAndForward(-5)" class="hover:bg-stone-200 bg-transparent p-2 rounded-full">
                        <Icon name="ri:replay-5-fill" color="fff" class="text-lg sm:text-2xl md:text-4xl" style="" />
                    </button>
                    <button @click="togglePlayer" class="bg-transparent">
                        <Icon v-if="isPlayed" name="ri:play-circle-fill" color="fff"
                            class="text-lg sm:text-3xl md:text-6xl" />
                        <Icon v-if="!isPlayed" name="ri:pause-circle-fill" color="fff"
                            class="text-lg sm:text-3xl md:text-6xl" />
                    </button>
                    <button @click="replayAndForward(5)" class="hover:bg-stone-200 bg-transparent p-2 rounded-full">
                        <Icon name="ri:forward-5-line" color="fff" class="text-lg sm:text-2xl md:text-4xl" />
                    </button>
                </div>
                <div class="flex items-center">
                    <button class="bg-transparent">
                        <div class="flex gap-2 ">
                            <Icon v-if="isVolume" @click="setUpVolums()" name="ri:volume-up-fill" color="fff"
                                class="text-lg md:text-2xl lg:text-3xl" />
                            <Icon v-if="!isVolume" @click="setUpVolums()" name="ri:volume-mute-fill" color="fff"
                                class="text-lg md:text-2xl lg:text-3xl" />
                            <input v-if="isVolume" class="accent-[#fff] w-12 lg:w-20 cursor-pointer" type="range" v-model="volume"
                                @input="updateVolume" min="0" max="1" step="0.1" />
                        </div>
                </button>
            </div>
        </div>
    </div>
</div></template>