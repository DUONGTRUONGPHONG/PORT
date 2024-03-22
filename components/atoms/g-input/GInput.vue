<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from "cva";

/* TYPES / INTERFACES */
interface InputOptions {
    hint?: string
    placeholder?: string
    noAppearance?: boolean
    iconAt?: 'left' | 'right'
}

interface InputProps {
    id?: string
    class?: string
    type?: string
    disabled?: boolean
    required?: boolean
    invalid?: boolean
    readonly?: boolean
    loading?: boolean
    value?: any
    icon?: string
    intent?: InputWrapper['intent']
    options?: InputOptions
}

type InputWrapper = VariantProps<typeof inputWrapper.value>


/* PROPS */
const props = defineProps<InputProps>();

//Default value for specific props
const { type = "text" } = props


/* OPTIONS */
const defaultOptions: InputOptions = {
    placeholder: "",
    hint: "",
    noAppearance: false,
    iconAt: 'left',
}

const option = reactive<InputOptions>({ ...defaultOptions, ...props.options });

//Reactive options when changed dynamically at parents
watch(() => props.options, (newOptions) => Object.assign(option, defaultOptions, newOptions))


/* INPUT VARIANTS HANDLERS */
const inputWrapper = computed(() => cva({
    base: [ //default classes for input wrapper
        'overflow-hidden', 'rounded', 'border-1', 'border-zinc-300',
        'text-black',
        'cursor-text',
        'focus:border-blue-600',
        'duration-300', 'ease-in-out',
        'after:content-[""]', 'after:absolute', 'after:inset-0', 'after:z-1',
        'after:duration-300', 'after:ease-in-out'
    ],
    variants: {
        intent: { //classes for input wrapper by intent name
            primary: [
                'border-blue-300',
            ],
            danger: [
                'border-red-300',
                'focus:border-red-600',
                'text-red-500',
            ],
            warning: [
                'border-amber-300',
                'focus:border-amber-600',
                'text-amber-600'
            ],
            success: [
                'border-emerald-300',
                'focus:border-emerald-600',
                'text-emerald-500'
            ],
        },
        state: { //classes for input wrapper by input state
            invalid: [
                'border-red-500',
                'text-red-500',
                'focus:border-red-500',
                'animate-head-shake'
            ],
            disabled: [
                'bg-zinc-1',
                'text-opacity-60',
                'select-none',
                'cursor-not-allowed'
            ],
            readonly: [],
            loading: [],
        },
    }
}))

//Base classes for input
const inputBaseClasses = ['outline-none', 'py-2', 'px-4', 'w-full']

//Hide arrows buttons with input[type="number"]
const noAppearance = (option.noAppearance && props.type === 'number') ? 'no-appearance' : null

//Transform props into CVA's options
const state = computed(() => {
    if (props.invalid) return 'invalid'
    else if (props.disabled) return 'disabled'
    else if (props.loading) return 'loading'

    else return undefined
})

//Classes for loading overlay by intent name
const loadingOverlay = computed(() => {
    let overlayBg = ''
    if (props.loading) {
        if (props.intent === "primary") overlayBg = "after:bg-blue-500/25"
        if (props.intent === "danger") overlayBg = "after:bg-red-500/25"
        if (props.intent === "warning") overlayBg = "after:bg-warning-500/25"
        if (props.intent === "success") overlayBg = "after:bg-emerald-500/25"

        return overlayBg

    } else return undefined
})

//Classes for input's placeholder by intent name
const placeholderClasses = computed(() => {
    let classes = ''
    if (option.placeholder) {
        if (props.intent === "primary") classes = "placeholder-blue-500/75"
        if (props.intent === "danger") classes = "placeholder-red-500/75"
        if (props.intent === "warning") classes = "placeholder-amber-500/75"
        if (props.intent === "success") classes = "placeholder-emerald-500/75"

        return classes

    } else return undefined
})

//v-model
const vModel = defineModel();

const emit = defineEmits<{
    input: [e: KeyboardEvent | Event, value: string]
    change: [e: KeyboardEvent | Event, value: string]
    click: [e: MouseEvent | Event]
}>()

const onInput = (e: any) => {
    emit('input', e, String(vModel.value))
}

const onChange = (e: any) => {
    emit('change', e, String(vModel.value))
}

const onClick = (e: any) => {
    const inputWrapper = e.target as HTMLDivElement
    const input = inputWrapper?.querySelector('input')
    input?.focus()
    emit('click', e)
}
</script>

<template>
    <div :class="twMerge([props.class,inputWrapper({ intent, state }), option.iconAt === 'right' ? 'flex-row-reverse' : null, loadingOverlay])" class="relative flex items-center" @click="onClick">
        <div class="grid place-items-center text-xl pointer-events-none" :class="option.iconAt === 'right' ? 'mr-4' : 'ml-4'">
            <Icon v-if="props.icon" :name="props.icon" />
        </div>
        <input v-model="vModel" :id="props.id" :class="twMerge([inputBaseClasses, noAppearance, props.disabled ? 'pointer-events-none' : null, placeholderClasses])" :type="type" :placeholder="option.placeholder" :disabled="props.disabled" :readonly="props.readonly || props.loading" :required="props.required" @input="onInput" @change="onChange" />
    </div>
    <small v-if="option.hint">
        {{ option.hint }}
    </small>
</template>

<style lang="sass">
input[type="number"].no-appearance
    -moz-appearance: textfield

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0

@keyframes shake
    0%
        transform: translateX(0)

    25%
        transform: translateX(.25rem)

    75%
        transform: translateX(-.25rem)

    100%
        transform: translateX(0)
</style>
