import { onScopeDispose, type Ref, watch } from "vue";

let lockCount = 0;
let savedOverflow = "";
let savedPaddingRight = "";

function lockBody() {
  if (lockCount === 0) {
    const { body, documentElement } = document;

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    savedOverflow = body.style.overflow;
    savedPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
  }

  lockCount += 1;
}

function unlockBody() {
  if (lockCount === 0) return;

  lockCount -= 1;

  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPaddingRight;
  }
}

export function useBodyScrollLock(active: Ref<boolean>) {
  let lockedByThis = false;

  const apply = (value: boolean) => {
    if (import.meta.server) return;

    if (value && !lockedByThis) {
      lockBody();
      lockedByThis = true;
    } else if (!value && lockedByThis) {
      unlockBody();
      lockedByThis = false;
    }
  };

  watch(active, apply, { immediate: true });

  onScopeDispose(() => {
    if (lockedByThis) {
      unlockBody();
      lockedByThis = false;
    }
  });
}
