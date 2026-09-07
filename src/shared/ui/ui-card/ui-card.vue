<template>
  <div class="ui-card">
    <div class="ui-card__header">
      <div class="ui-card__title">
        {{ cardTitle }}
      </div>
    </div>

    <div v-if="$slots['body']" class="ui-card__body">
      <slot name="body"></slot>
    </div>

    <div v-if="$slots['footer']" class="ui-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUiCardProps } from "./types";

defineOptions({
  name: "ui-card",
});

defineProps<IUiCardProps>();
</script>

<style lang="scss">
.ui-card {
  padding: $spacing-6;
  padding-bottom: $spacing-7;
  border-radius: $radius-3;
  box-shadow: $shadow-lg;
  background-color: $theme-foreground;

  display: flex;
  flex-direction: column;
  gap: $spacing-6;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-4;
  }

  &__title {
    @include display-xs-semibold;
    color: $theme-background;
  }
}
</style>
