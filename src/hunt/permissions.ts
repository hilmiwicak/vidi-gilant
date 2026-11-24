type OrientationWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<unknown>;
};

function ignore() {
  // The Pointer screen surfaces any failure later; this is only a warm-up.
}

/**
 * The Welcome's Start button requests location and compass permission before
 * the first Puzzle (docs/HUNT.md). iOS requires a user gesture for both, so
 * this runs inside the button's click handler.
 */
export function requestPointerPermissions(): void {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(ignore, ignore, { enableHighAccuracy: true, timeout: 10_000 });
  }

  (DeviceOrientationEvent as OrientationWithPermission).requestPermission?.().catch(ignore);
}
