<template>
  <div class="ui-skeleton" :style="skeletonStyle" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import type { IUiSkeletonProps } from "./types";

defineOptions({
  name: "ui-skeleton",
});

const { width, height, radius } = defineProps<IUiSkeletonProps>();

const toCssSize = (value?: string | number): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

const skeletonStyle = computed(() => ({
  width: toCssSize(width),
  height: toCssSize(height),
  borderRadius: toCssSize(radius),
}));
</script>

<style lang="scss">
.ui-skeleton {
  --skeleton-base: #{$grey-400};
  --skeleton-highlight: #{$grey-300};

  display: block;
  border-radius: $radius-2;

  background-color: var(--skeleton-base);
  background-image: linear-gradient(
    90deg,
    var(--skeleton-base) 25%,
    var(--skeleton-highlight) 37%,
    var(--skeleton-base) 63%
  );
  background-size: 400% 100%;
  animation: ui-skeleton-loading 1s ease infinite;
}

@keyframes ui-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-skeleton {
    animation: none;
  }
}
</style>
