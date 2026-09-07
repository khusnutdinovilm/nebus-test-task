<template>
  <div class="layout">
    <site-header class="layout__header" />

    <slot></slot>

    <div id="modals"></div>
  </div>
</template>

<script setup lang="ts">
import { SiteHeader } from "@widgets/site-header";
</script>

<style lang="scss">
.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  & main {
    flex: 1;
  }
}
</style>
