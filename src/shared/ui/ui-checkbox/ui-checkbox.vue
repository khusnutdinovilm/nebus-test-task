<template>
  <label class="ui-checkbox">
    <input :id="id" v-model="checked" :name="name" type="checkbox" class="ui-checkbox__real" />

    <span class="ui-checkbox__fake">
      <ui-icon v-if="checked" name="mark" />
    </span>

    <span v-if="$slots['default']" class="ui-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { UiIcon } from "@shared/ui/ui-icon";

import type { IUiCheckboxProps } from "./types";

defineOptions({
  name: "ui-checkbox",
});

defineProps<IUiCheckboxProps>();

const checked = defineModel<boolean>({ required: true });
</script>

<style lang="scss">
.ui-checkbox {
  --border-color: #{$theme-stroke};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: $spacing-6;

  &__real {
    @include visually-hidden;

    &:checked + .ui-checkbox__fake {
      --border-color: #{$primary-background};
    }

    &:focus-visible + .ui-checkbox__fake {
      --border-color: #{$primary-background};
    }
  }

  &__fake {
    @include flex-center;
    width: $size-2;
    height: $size-2;

    border-radius: $radius-3;
    border: 1px solid var(--border-color);
    background-color: $theme-background;
    transition: border-color $duration-base $easing-standard;

    & .ui-icon {
      width: 12px;
      height: 12px;
      color: $primary-background;
    }
  }
}
</style>
