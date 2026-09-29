/* Cursor-spotlight cards: one delegated listener feeds the pointer
   position into --mx/--my on any `.spot` card under the cursor;
   the `.spot::after` radial gradient reads them. */
export function initSpotlight() {
  const onMove = (e: MouseEvent) => {
    const el = (e.target as Element).closest?.(".spot") as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  window.addEventListener("mousemove", onMove);
  return () => window.removeEventListener("mousemove", onMove);
}
