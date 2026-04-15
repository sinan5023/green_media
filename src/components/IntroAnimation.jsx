import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import introVideo from '../assets/file.mp4'
import isMobileDevice from '../hooks/useMobile'

/* ─────────────────────────────────────────────────────────────
   IntroAnimation  —  Preloaded video with loading state

   Flow:
     1. Show pulsing logo + "loading" bar while video buffers
     2. Once `canplaythrough` fires → cross-fade to video → play
     3. On video end → fade out → curtain split → reveal site

   The loading screen doubles as a preloading buffer — gives
   lazy-loaded sections, images, and fonts time to settle.
   ────────────────────────────────────────────────────────────── */

export default function IntroAnimation({ onComplete }) {
    const isMobile = isMobileDevice()
    const [hidden, setHidden] = useState(isMobile)

    const videoRef     = useRef(null)
    const panelTopRef  = useRef(null)
    const panelBotRef  = useRef(null)
    const glowRef      = useRef(null)
    const loaderRef    = useRef(null)   // loading state container
    const progressRef  = useRef(null)   // progress bar fill

    // ── Exit: video fades → curtain splits → website revealed ────────
    const doExit = () => {
        if (doExit._fired) return
        doExit._fired = true

        const tl = gsap.timeline()
        tl.to(videoRef.current, { opacity: 0, duration: 0.45, ease: 'power2.in' })
        tl.to(panelTopRef.current, { yPercent: -100, duration: 0.78, ease: 'power3.inOut' }, '-=0.05')
        tl.to(panelBotRef.current, { yPercent:  100, duration: 0.78, ease: 'power3.inOut' }, '<')
        tl.call(() => {
            onComplete()
            setTimeout(() => setHidden(true), 120)
        })
    }

    useEffect(() => {
        if (isMobile) {
            onComplete()
            return
        }

        const video = videoRef.current
        if (!video) return

        // ── Start preloading the video ──────────────────────────
        video.preload = 'auto'
        video.load()

        // ── Simulate progress while buffering ───────────────────
        let progressTween = null
        if (progressRef.current) {
            progressTween = gsap.to(progressRef.current, {
                scaleX: 0.9,           // animate to 90% — last 10% on canplaythrough
                duration: 4,
                ease: 'power1.out',
                transformOrigin: 'left center',
            })
        }

        // ── Once buffered enough → cross-fade to video → play ───
        const onReady = () => {
            // Finish progress bar to 100%
            if (progressTween) progressTween.kill()
            if (progressRef.current) {
                gsap.to(progressRef.current, {
                    scaleX: 1, duration: 0.3, ease: 'power2.out',
                    transformOrigin: 'left center',
                })
            }

            // Short delay for the progress bar to visually complete
            setTimeout(() => {
                // Fade out loader, play video
                if (loaderRef.current) {
                    gsap.to(loaderRef.current, {
                        opacity: 0, duration: 0.35, ease: 'power2.in',
                        onComplete: () => {
                            if (loaderRef.current) loaderRef.current.style.display = 'none'
                        },
                    })
                }
                video.play().catch(() => {})
            }, 350)
        }

        // Try canplaythrough first (fully buffered)
        video.addEventListener('canplaythrough', onReady, { once: true })

        // Also listen to 'canplay' as a fallback (enough data to start)
        const canPlayFallback = setTimeout(() => {
            if (video.readyState >= 3) {
                onReady()
            }
        }, 3000)

        // Absolute fallback — never leave user stuck
        const hardFallback = setTimeout(() => {
            // If video still hasn't loaded, just play whatever we have
            video.play().catch(() => {})
            if (loaderRef.current) {
                gsap.to(loaderRef.current, {
                    opacity: 0, duration: 0.2,
                    onComplete: () => {
                        if (loaderRef.current) loaderRef.current.style.display = 'none'
                    },
                })
            }
        }, 6000)

        video.addEventListener('ended', doExit)

        // Ultimate safety net
        const exitFallback = setTimeout(doExit, 12000)

        return () => {
            clearTimeout(canPlayFallback)
            clearTimeout(hardFallback)
            clearTimeout(exitFallback)
            if (progressTween) progressTween.kill()
            video.removeEventListener('canplaythrough', onReady)
            video.removeEventListener('ended', doExit)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (hidden) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            overflow: 'hidden',
        }}>
            {/*
              Z-index map:
                1 → Curtain panels
                2 → Video
                3 → Lighting overlays
                4 → Loading state (on top of everything until video is ready)
            */}

            {/* Curtain panels — z1 */}
            <div ref={panelTopRef} style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: '#050505', zIndex: 1, willChange: 'transform',
                pointerEvents: 'none',
            }} />
            <div ref={panelBotRef} style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: '#050505', zIndex: 1, willChange: 'transform',
                pointerEvents: 'none',
            }} />

            {/* Video — z2 (hidden behind loader until ready) */}
            <video
                ref={videoRef}
                src={introVideo}
                muted
                playsInline
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    zIndex: 2,
                }}
            />

            {/* Green radial glow — z3 */}
            <div ref={glowRef} style={{
                position: 'absolute',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '72vw', height: '72vw',
                maxWidth: 820, maxHeight: 820,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(199,217,77,0.13) 0%, rgba(199,217,77,0.04) 42%, transparent 68%)',
                filter: 'blur(20px)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 3,
            }} />

            {/* Vignette — z3 */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.40) 70%, rgba(5,5,5,0.78) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Cinematic bars — z3 */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                background: 'linear-gradient(to bottom, rgba(5,5,5,0.30) 0%, transparent 16%, transparent 80%, rgba(5,5,5,0.45) 100%)',
                pointerEvents: 'none',
            }} />

            {/* ── Loading state — z4 (covers everything until video ready) ── */}
            <div ref={loaderRef} style={{
                position: 'absolute', inset: 0, zIndex: 4,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: '#050505',
            }}>
                {/* Pulsing logo */}
                <img
                    src="/favicon.jpg"
                    alt="Green Media"
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        marginBottom: 32,
                        animation: 'introLogoPulse 1.8s ease-in-out infinite',
                        filter: 'drop-shadow(0 0 18px rgba(199,217,77,0.35))',
                    }}
                />

                {/* Progress bar track */}
                <div style={{
                    width: 'min(60vw, 220px)',
                    height: 2,
                    background: 'rgba(199,217,77,0.12)',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}>
                    {/* Progress bar fill */}
                    <div ref={progressRef} style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(199,217,77,0.6), #C7D94D)',
                        borderRadius: 1,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left center',
                    }} />
                </div>

                {/* Inline keyframes for the logo pulse */}
                <style>{`
                    @keyframes introLogoPulse {
                        0%, 100% { opacity: 0.5; transform: scale(1); }
                        50%      { opacity: 1;   transform: scale(1.08); }
                    }
                `}</style>
            </div>
        </div>
    )
}
