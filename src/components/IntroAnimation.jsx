import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import introVideo from '../assets/file.mp4'

export default function IntroAnimation({ onComplete }) {
    const [hidden, setHidden] = useState(false)
    const videoRef    = useRef(null)
    const panelTopRef = useRef(null)
    const panelBotRef = useRef(null)
    const glowRef     = useRef(null)

    // ── Exit: video fades → curtain splits → website revealed ────────
    const doExit = () => {
        if (doExit._fired) return
        doExit._fired = true

        const tl = gsap.timeline()

        // 1. Fade out video (panels beneath become visible — same #050505 so seamless)
        tl.to(videoRef.current, { opacity: 0, duration: 0.45, ease: 'power2.in' })

        // 2. Curtain panels split open
        tl.to(panelTopRef.current, { yPercent: -100, duration: 0.78, ease: 'power3.inOut' }, '-=0.05')
        tl.to(panelBotRef.current, { yPercent:  100, duration: 0.78, ease: 'power3.inOut' }, '<')

        // 3. Done
        tl.call(() => {
            onComplete()
            setTimeout(() => setHidden(true), 120)
        })
    }

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.addEventListener('ended', doExit)

        // Fallback — never leave user stuck on black
        const fallback = setTimeout(doExit, 8000)

        return () => {
            clearTimeout(fallback)
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
              ── Z-index map ───────────────────────────────────────────
              z-index 1 → Curtain panels (black, hide website behind intro)
              z-index 2 → Video (plays on top of panels — both black so seamless)
              z-index 3 → Lighting overlays (glow, vignette — sit on video)
              
              EXIT: video fades (panels visible behind) → panels slide out → site revealed
            */}

            {/* Curtain panels — z-index 1, start covering screen */}
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

            {/* Video — z-index 2 (above panels, covers them while playing) */}
            <video
                ref={videoRef}
                src={introVideo}
                autoPlay
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

            {/* Green radial glow — z-index 3, sits on top of video */}
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

            {/* Vignette — z-index 3 */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.40) 70%, rgba(5,5,5,0.78) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Cinematic top/bottom bars — z-index 3 */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                background: 'linear-gradient(to bottom, rgba(5,5,5,0.30) 0%, transparent 16%, transparent 80%, rgba(5,5,5,0.45) 100%)',
                pointerEvents: 'none',
            }} />
        </div>
    )
}
