<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="tag === 'button' ? disabled : undefined"
    :type="tag === 'button' ? type : undefined"
    :to="tag === NuxtLink ? to : undefined"
    :target="tag !== 'button' ? target : undefined"
    :href="tag === 'a' ? href : undefined"
  >
    <div v-if="loading" class="ui-button__loader"></div>
    <div v-else class="ui-button__label">
      <slot>{{ label }}</slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

import type { IUiButtonProps } from "./types";

defineOptions({
  name: "ui-button",
});

const { variant = "primary", type = "button", ...props } = defineProps<IUiButtonProps>();

const tag = computed(() => {
  if (props.to) return NuxtLink;
  if (props.href) return "a";
  return "button";
});

const buttonClasses = computed(() => [
  "ui-button",
  `ui-button--${variant}`,
  {
    "ui-button--loading": props.loading,
    "ui-button--disabled": props.disabled,
  },
]);
</script>

<style lang="scss">
.ui-button {
  --btn-padding: #{$spacing-3} #{$spacing-5};
  --bg-color: transparent;
  --text-color: transparent;
  --box-shadow: #{$shadow-xs};
  --radius: #{$radius-3};

  box-shadow: var(--box-shadow);
  padding: var(--btn-padding);
  background-color: var(--bg-color);
  border-radius: var(--radius);
  transition: background-color $duration-base $easing-standard;

  &--primary {
    --bg-color: #{$primary-background};
    --text-color: #{$primary-inverted};

    &:hover {
      --bg-color: #{$primary-hover};
      --text-color: #{$primary-hover-inverted};
    }
  }

  &--default {
    --bg-color: #{$theme-heading-foreground};
    --text-color: #{$primary-inverted};

    &:hover {
      --text-color: #{$primary-hover-inverted};
    }
  }

  &--texted {
    &-primary {
      --btn-padding: #{$spacing-2} 0;
      --bg-color: transparent;
      --text-color: #{$primary-inverted};

      &:hover {
        --text-color: #{$primary-hover-inverted};
      }
    }

    &-danger {
      --btn-padding: 5px 0;
      --bg-color: transparent;
      --text-color: #{$semantic-error-background};

      &:hover {
        --text-color: #{$semantic-error-hover};
      }
    }
  }

  &--loading,
  &--disabled {
    pointer-events: none;
  }

  &--disabled {
    --bg-color: #{$theme-muted-foreground};
    --text-color: #{$theme-surface-stroke};
  }

  &__label {
    @include text-sm-semibold;
    color: var(--text-color);
    text-align: center;
    transition: color $duration-base $easing-standard;
  }

  &__loader {
    width: 20px;
    height: 20px;
    border: 3px solid $theme-surface-background;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: ui-button-rotation 1s linear infinite;
  }
}

@keyframes ui-button-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
