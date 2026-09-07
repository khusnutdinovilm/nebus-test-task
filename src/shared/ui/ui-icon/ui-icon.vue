<template>
  <span class="ui-icon">
    <Icon :name="iconName" class="ui-icon__icon" />
  </span>
</template>

<script setup lang="ts">
import type { IUiIconProps } from "./types";

defineOptions({
  name: "ui-icon",
});

const props = defineProps<IUiIconProps>();
const iconName = computed(() => `my:${props.name}`);
</script>

<style lang="scss">
.ui-icon {
  @include flex-center;

  &__icon {
    width: 100%;
    height: 100%;
    transition: inherit;
  }
}
</style>
