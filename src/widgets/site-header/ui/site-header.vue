<template>
  <header class="site-header">
    <div class="site-header__wrapper container">
      <nuxt-link to="/" class="site-header__logo">
        <img src="/img/logo.webp" alt="Notes" />
      </nuxt-link>
    </div>
  </header>
</template>

<script setup lang="ts">
defineOptions({
  name: "site-header",
});
</script>

<style lang="scss">
.site-header {
  border-bottom: 1px solid $theme-foreground;

  &__wrapper {
    height: $size-10;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  &__logo {
    display: inline-flex;
    & img {
      height: $size-2;
      width: auto;
      object-fit: contain;
    }
  }
}
</style>
