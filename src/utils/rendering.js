// WebKit gets the existing lightweight presentation: same content, fewer composited effects.
export function prefersLightweightRendering(userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent) {
  const appleMobile = /iPhone|iPad|iPod/.test(userAgent);
  const desktopSafari = /AppleWebKit/.test(userAgent) && /Safari/.test(userAgent)
    && !/Chrome|Chromium|Edg|OPR|Android/.test(userAgent);
  return appleMobile || desktopSafari;
}
