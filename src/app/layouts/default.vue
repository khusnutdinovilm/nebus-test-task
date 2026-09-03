<template>
  <div class="layout">
    <main class="layout__content">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
  }
}
</style>
