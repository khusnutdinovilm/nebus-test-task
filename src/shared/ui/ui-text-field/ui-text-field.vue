<template>
  <div :class="textFieldClasses">
    <label v-if="label" :for="id" class="ui-text-field__label">
      {{ label }}
    </label>

    <input
      :id="id"
      v-model.trim="model"
      :type="type"
      :name="name"
      :disabled="disabled"
      class="ui-text-field__input"
    />
  </div>
</template>

<script setup lang="ts">
import type { IUiTextFieldProps } from "./types";

defineOptions({
  name: "ui-text-field",
});

const { type = "text", variant = "default" } = defineProps<IUiTextFieldProps>();

const model = defineModel<string>({ required: true });

const textFieldClasses = computed(() => ["ui-text-field", `ui-text-field--${variant}`]);
</script>

<style lang="scss">
.ui-text-field {
  --input-border-color: transparent;
  --input-text-color: transparent;
  --input-bg-color: transparent;

  display: flex;
  flex-direction: column;
  gap: $spacing-3;

  &__label {
    @include text-sm-medium;
    color: $theme-background;
  }

  &--default {
    --input-bg-color: #{$theme-background};
    --input-text-color: #{$theme-heading-foreground};

    & .ui-text-field__input {
      border: 1px solid var(--input-border-color);
      border-radius: $radius-3;
    }
  }

  &--tertiary {
    --input-bg-color: transparent;
    --input-text-color: #{$theme-background};

    & .ui-text-field__input {
      border-bottom: 1px solid var(--input-border-color);
      border-radius: 0;
    }
  }

  &__input {
    padding: $spacing-3 $spacing-4;
    background-color: var(--input-bg-color);

    @include text-md-regular;
    color: var(--input-text-color);
    outline: none;
    transition: border-color $duration-base $easing-standard;

    &:focus,
    &:active {
      --input-border-color: #{$primary-active};
    }
  }
}
</style>
