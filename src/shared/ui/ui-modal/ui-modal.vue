<template>
  <teleport to="#modals">
    <transition name="fade">
      <div v-if="isModalOpen" class="ui-modal" @click="onCloseModal" @keydown.esc="onCloseModal">
        <div
          ref="bodyRef"
          class="ui-modal__body"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
          @click.stop
        >
          <div class="ui-modal__header">
            <h2 :id="titleId" class="ui-modal__title">
              {{ modalTitle }}
            </h2>

            <button
              type="button"
              class="ui-modal__close"
              aria-label="Закрыть"
              @click="onCloseModal"
            >
              <ui-icon name="cross" />
            </button>
          </div>

          <div v-if="$slots['content']" class="ui-modal__content">
            <slot name="content" :close-modal="onCloseModal"></slot>
          </div>

          <div v-if="$slots['footer']" class="ui-modal__footer">
            <slot name="footer" :close-modal="onCloseModal"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useId } from "vue";

import { useBodyScrollLock } from "@shared/lib/use-body-scroll-lock";
import { useFocusTrap } from "@shared/lib/use-focus-trap";
import { UiIcon } from "@shared/ui/ui-icon";

import type { IUiModalProps } from "./types";

defineOptions({ name: "ui-modal" });

defineProps<IUiModalProps>();

const isModalOpen = defineModel<boolean>({ required: true });

const bodyRef = ref<HTMLElement | null>(null);
const titleId = useId();

useFocusTrap(bodyRef, isModalOpen);
useBodyScrollLock(isModalOpen);

const onCloseModal = () => {
  isModalOpen.value = false;
};
</script>

<style lang="scss">
.ui-modal {
  @include flex-center;

  position: fixed;
  inset: 0;
  overflow-y: auto;
  padding: $spacing-6;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: $z-modal-backdrop;
    background-color: $theme-heading-foreground;
    opacity: 0.9;
    cursor: pointer;
  }

  &__body {
    position: relative;
    z-index: $z-modal-body;
    padding: $spacing-6;
    border-radius: $radius-4;
    background-color: $theme-foreground;
    box-shadow: $shadow-xl;
    cursor: default;

    display: flex;
    flex-direction: column;
    gap: $spacing-6;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: $spacing-6;
  }

  &__title {
    flex: 1;
    @include text-lg-semibold;
    text-align: center;
    color: $theme-background;
  }

  &__close {
    @include button-reset;
    @include flex-center;

    width: $size-2;
    height: $size-2;
    color: $theme-background;

    & .ui-icon {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    flex: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $duration-base $easing-standard;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
