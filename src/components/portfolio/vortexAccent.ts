export function setVortexAccent(hex: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vortex:accent", { detail: hex }));
}
