/**
 * useMobile — returns true when the viewport is ≤ 767px OR the device is
 * primarily touch-based. Evaluated once on mount (no resize re-render needed
 * for our use-case: animation guards that run in useEffect).
 */
const isMobileDevice = () =>
    window.matchMedia('(max-width: 767px)').matches ||
    window.matchMedia('(pointer: coarse)').matches

export default isMobileDevice
