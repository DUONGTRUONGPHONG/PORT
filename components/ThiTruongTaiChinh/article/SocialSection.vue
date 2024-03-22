<script setup>
const emits = defineEmits()
const increaseFontSize = () => {
    emits('increaseFontSize')
}

const reduceFontSize = () => {
    emits('reduceFontSize')
}
</script>
<template>
    <section>
        <ul class="flex flex-col gap-[8px]">
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:facebook-messenger" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:facebook" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:email-outline" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:printer-outline" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:link-variant" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:telegram" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:skype" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <a href="#"
                    class="text-[22px] w-[2rem] h-[2rem] hover:bg-black hover:text-white border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:alpha-z-circle" />
                </a>
            </li>
            <li class="flex items-start justify-end">
                <div @click="increaseFontSize"
                    class="bg-gray-200 text-[22px] w-[2rem] h-[2rem] border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:format-font-size-increase" />
                </div>
            </li>
            <li class="flex items-start justify-end">
                <div @click="reduceFontSize"
                    class="bg-gray-200 text-[22px] w-[2rem] h-[2rem] border-[#212121] border border-solid flex justify-center items-center rounded-full">
                    <Icon name="mdi:format-font-size-decrease" />
                </div>
            </li>
        </ul>
    </section>
</template>