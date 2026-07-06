<template>
  <div
    class="classificationBanner-banner"
    :style="cssVars"
    aria-label="Application classification banner"
  >
    <div class="classificationBanner-content">
      <span>{{ displayText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, watch, onMounted } from "vue";
import { getReadableTextColor, resolveClassificationColor } from "../colors";
import {
  DEFAULT_CLASSIFICATION_PRETEXT,
  DEFAULT_CLASSIFICATION_TEXT,
  DEFAULT_CLASSIFICATION_SCALE,
  classificationBannerKey,
} from "../options";
import type { ClassificationBannerProps } from "../types";

const props = defineProps<ClassificationBannerProps>();

const provided = inject(classificationBannerKey, {});

const resolvedText = computed(() => {
  return props.text || provided.text || DEFAULT_CLASSIFICATION_TEXT;
});

const resolvedPretext = computed(() => {
  return props.pretext ?? provided.pretext ?? DEFAULT_CLASSIFICATION_PRETEXT;
});

const resolvedDynamicContent = computed(() => {
  return props.dynamicContent ?? provided.dynamicContent ?? false;
});

const displayText = computed(() => {
  if (resolvedDynamicContent.value) {
    return `DYNAMIC PAGE - HIGHEST POSSIBLE CLASSIFICATION IS ${resolvedText.value}`;
  }
  return `${resolvedPretext.value}${resolvedText.value}`;
});

const resolvedColor = computed(() => {
  return (
    props.color ||
    provided.color ||
    resolveClassificationColor(resolvedText.value)
  );
});

const resolvedTextColor = computed(() => {
  return (
    props.textColor ||
    provided.textColor ||
    getReadableTextColor(resolvedColor.value)
  );
});

const resolvedScale = computed(() => {
  return props.scale ?? provided.scale ?? DEFAULT_CLASSIFICATION_SCALE;
});

const cssVars = computed<Record<string, string>>(() => ({
  "--classification-banner-color": resolvedColor.value,
  "--classification-banner-text-color": resolvedTextColor.value,
  "--classification-banner-scale": String(resolvedScale.value),
}));

// Set global CSS variable for banner height so apps can use it for padding
const bannerHeight = computed(() => {
  return `${24 * resolvedScale.value}px`;
});

onMounted(() => {
  document.documentElement.style.setProperty(
    "--classification-banner-height",
    bannerHeight.value,
  );
});

watch(bannerHeight, (newHeight) => {
  document.documentElement.style.setProperty(
    "--classification-banner-height",
    newHeight,
  );
});
</script>

<style scoped>
.classificationBanner-banner {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: calc(24px * var(--classification-banner-scale));
  text-align: center;
  line-height: normal;
  overflow: visible;
  z-index: 9999;
  user-select: none;
  pointer-events: none;
}

/* top horizontal stripe */
.classificationBanner-banner::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: calc(6px * var(--classification-banner-scale));
  background: var(--classification-banner-color);
  z-index: 1;
}

.classificationBanner-content {
  font-family: Inter, sans-serif;
  color: var(--classification-banner-text-color) !important;
  font-size: calc(12px * var(--classification-banner-scale));
  line-height: 1;
  min-height: calc(16px * var(--classification-banner-scale));
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 calc(0.8rem * var(--classification-banner-scale))
    calc(0.15rem * var(--classification-banner-scale));
  text-transform: uppercase;
  letter-spacing: calc(0.05em * var(--classification-banner-scale));
  background: var(--classification-banner-color);

  /* move the tab/text up into the stripe */
  top: 0;
}

.classificationBanner-content::before,
.classificationBanner-content::after {
  content: "";
  position: absolute;
  width: calc(8px * var(--classification-banner-scale));
  top: 0;
  height: calc(16px * var(--classification-banner-scale));
  z-index: -1;
  background: var(--classification-banner-color);
  transform: skewX(25deg);
}

.classificationBanner-content::before {
  left: calc(-4px * var(--classification-banner-scale));
}

.classificationBanner-content::after {
  right: calc(-4px * var(--classification-banner-scale));
  transform: skewX(-25deg);
}
</style>
