import { nextTick, onBeforeUnmount, type Ref, watch } from "vue";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useFocusTrap(containerRef: Ref<HTMLElement | null>, active: Ref<boolean>) {
  let previouslyFocused: HTMLElement | null = null;

  const getFocusable = (): HTMLElement[] => {
    const root = containerRef.value;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null
    );
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const items = getFocusable();
    const first = items[0];
    const last = items[items.length - 1];

    if (!first || !last) {
      e.preventDefault();
      return;
    }

    const current = document.activeElement;

    if (e.shiftKey && current === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && current === last) {
      e.preventDefault();
      first.focus();
    }
  };

  watch(active, async (isActive) => {
    if (isActive) {
      previouslyFocused = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", onKeydown);
      await nextTick();
      (getFocusable()[0] ?? containerRef.value)?.focus();
    } else {
      document.removeEventListener("keydown", onKeydown);
      previouslyFocused?.focus();
      previouslyFocused = null;
    }
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", onKeydown);
  });
}
