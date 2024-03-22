<script setup lang="ts">
import {
  ArticleBasic,
  ArticleBasicHorizontal,
  ArticleModern,
  ArticleText,
  ArticleTextDot,
  ArticleMicroSquare,
  ArticleMicro,
  ArticleMicro2,
  ArticleVideo,
  ArticleChange,
  ArticlePodcast,
  ArticleEvent,
  ArticleTTTC
} from "@molecules/article-cards";

const props = defineProps<{
  mode?: string;
}>();

const articleComponent = computed(() => {
  if (props.mode === "basic" || !props.mode) return ArticleBasic;
  if (props.mode === "basicHorizontal") return ArticleBasicHorizontal;
  if (props.mode === "modern") return ArticleModern;
  if (props.mode === "text") return ArticleText;
  if (props.mode === "textDot") return ArticleTextDot;
  if (props.mode === "microSquare") return ArticleMicroSquare;
  if (props.mode === "micro") return ArticleMicro;
  if (props.mode === "micro2") return ArticleMicro2;
  if (props.mode === "video") return ArticleVideo;
  if (props.mode === "change") return ArticleChange;
  if (props.mode === "podcast") return ArticlePodcast;
  if (props.mode === "event") return ArticleEvent;
  if (props.mode === "tttc") return ArticleTTTC;
  return "";
});
</script>

<template>
  <Component :is="articleComponent" />
</template>
