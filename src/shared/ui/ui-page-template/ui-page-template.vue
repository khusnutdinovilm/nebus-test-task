<template>
  <main class="ui-page-template container">
    <div class="ui-page-template__header">
      <h1 v-if="pageTitle" class="ui-page-template__title">
        {{ pageTitle }}
      </h1>

      <div v-if="$slots['actions']" class="ui-page-template__actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div :class="pageContentClasses">
      <slot v-if="isContentLoading && $slots['content-loading']" name="content-loading"></slot>
      <slot v-else-if="isContentEmpty && $slots['content-empty']" name="content-empty"></slot>
      <slot v-else></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { IUiPageTemplateProps } from "./types";

defineOptions({
  name: "ui-page-template",
});

const props = defineProps<IUiPageTemplateProps>();

const pageContentClasses = computed(() => [
  "ui-page-template__content",
  props.pageClass,
  {
    "ui-page-template__content--loading": props.isContentLoading,
    "ui-page-template__content--empty": props.isContentEmpty,
  },
]);
</script>

<style lang="scss">
.ui-page-template {
  display: flex;
  flex-direction: column;
  gap: $spacing-5;
  padding-top: $spacing-5;
  padding-bottom: $spacing-5;

  @include media-up("md") {
    gap: $spacing-7;
    padding-top: $spacing-7;
    padding-bottom: $spacing-7;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-5;
  }

  &__title {
    @include display-md-semibold;
    color: $theme-background;

    @include media-up("md") {
      @include display-lg-semibold;
    }
  }

  &__content {
    flex: 1;

    &--empty {
      @include flex-center;
    }
  }
}
</style>
