<script setup lang="ts">
const props = defineProps<{
  tag: string
  text?: string
}>();
const slots = useSlots()
const validTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p", //Heading Tags
  "span",
  "abbr",
  "bdi", //Neutral
  "label", //For inputs
  "i",
  "cite",
  "em",
  "dfn",
  "address", //Italic
  "strong",
  "b", //Bold
  "u",
  "ins", //Underline
  "s", //Strike-throught
  "small", //Small text
  "time", //Datetime / Time / Date
  "blockquote", //Blockquote
  "q", //Quote
  "mark", //Highlight
];

const isValid = computed(() => validTags.includes(props.tag));
const slotDefault = computed(() => {
  if (typeof slots.default === 'function' && slots.default()[0]?.children) return true
  return false
})

onMounted(() => {
  if (!isValid.value) {
    const errorMessage = `Invalid tag '${props.tag
      }' specified. Please use one of: ${validTags.join(", ")}`;
    throw new Error(errorMessage); // Throw an error to halt component rendering
  }
});
</script>

<template>
  <component v-if="isValid" :is="props.tag">
    <slot v-if='slotDefault' />
    {{ !slotDefault ? props.text : undefined }}
  </component>

  <div v-else class="invalid">
    Invalid tag <q>{{ props.tag }}</q> specified
    <br />
    Valid tags: {{ validTags.join(", ") }}
  </div>
</template>

<style lang="sass">
.ad-text

    &.invalid
        color: red
        font-weight: 600
</style>
