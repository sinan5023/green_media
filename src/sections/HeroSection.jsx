import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO = 'https://video.wixstatic.com/video/e9f76c_adfab8519642428991e483f0fdb4a207/1080p/mp4/file.mp4'

export default function HeroSection() {
    const sectionRef = useRef(null)
    const line1Ref = useRef(null)
    const line2Ref = useRef(null)
    const line3Ref = useRef(null)
    const bodyRef = useRef(null)
    const ctaRef = useRef(null)
    const scrollHintRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 2.8 }) // After intro

        tl.fromTo(line1Ref.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
        )
        tl.fromTo(line2Ref.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            '-=0.6'
        )
        tl.fromTo(line3Ref.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
        )
        tl.fromTo(bodyRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.4'
        )
        tl.fromTo(ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
        )
        tl.fromTo(scrollHintRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            '-=0.2'
        )

        return () => tl.kill()
    }, [])

    return (
        <section id="home" ref={sectionRef} style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: '#050505',
        }}>
            {/* Background video */}
            <video
                autoPlay muted loop playsInline
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: 0.55,
                    zIndex: 0,
                }}
            >
                <source src={HERO_VIDEO} type="video/mp4" />
            </video>

            {/* Dark gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(135deg, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.3) 60%, rgba(5,5,5,0.7) 100%)',
            }} />

            {/* Green glow bottom-right */}
            <div style={{
                position: 'absolute', bottom: -100, right: -100,
                width: 600, height: 600,
                background: 'radial-gradient(circle, rgba(199,217,77,0.12) 0%, transparent 70%)',
                zIndex: 1,
                pointerEvents: 'none',
            }} />

            {/* Corner decorations */}
            {[{ top: 80, left: 40 }, { bottom: 80, right: 40 }].map((pos, i) => (
                <div key={i} style={{
                    position: 'absolute', zIndex: 2,
                    width: 50, height: 50,
                    ...pos,
                    transform: i === 1 ? 'rotate(180deg)' : 'none',
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 1, background: 'rgba(199,217,77,0.4)' }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100%', background: 'rgba(199,217,77,0.4)' }} />
                </div>
            ))}

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 3,
                padding: 'clamp(100px, 8vw, 140px) clamp(24px, 8vw, 120px)',
                maxWidth: 1000,
            }}>
                <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.35em',
                    color: '#C7D94D',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}>
                    <span style={{ display: 'inline-block', width: 32, height: 1, background: '#C7D94D' }} />
                    KERALA · AV TECHNOLOGY SINCE 2000
                </div>

                <h1 style={{ margin: 0 }}>
                    <div ref={line1Ref} style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(2.2rem, 6vw, 5.2rem)',
                        color: '#f5f5f5',
                        lineHeight: 1.05,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        opacity: 0,
                    }}>
                        EVENT
                    </div>
                    <div ref={line2Ref} style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(2.2rem, 6vw, 5.2rem)',
                        color: '#C7D94D',
                        lineHeight: 1.05,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        textShadow: '0 0 40px rgba(199,217,77,0.35)',
                        opacity: 0,
                    }}>
                        AV TECHNOLOGY
                    </div>
                    <div ref={line3Ref} style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(2.2rem, 6vw, 5.2rem)',
                        color: '#f5f5f5',
                        lineHeight: 1.05,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        opacity: 0,
                    }}>
                        & VISUAL <span style={{ color: '#C7D94D', textShadow: '0 0 40px rgba(199,217,77,0.35)' }}>PRODUCTION</span>
                    </div>
                </h1>

                <p ref={bodyRef} style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                    color: 'rgba(245,245,245,0.65)',
                    lineHeight: 1.8,
                    maxWidth: 540,
                    marginTop: '2rem',
                    opacity: 0,
                }}>
                    Your event has one chance to work. The sound must be clear. The screens
                    must be sharp. The lighting must set the right mood. Everything technical
                    must come together at the right moment. <em>That is what Green Media does.</em>
                </p>

                <div ref={ctaRef} style={{ marginTop: '2.5rem', display: 'flex', gap: 16, flexWrap: 'wrap', opacity: 0 }}>
                    <button
                        className="btn-primary"
                        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        VIEW OUR PROJECTS
                        <span style={{ fontSize: '1rem' }}>→</span>
                    </button>
                    <button
                        className="btn-outline"
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        TALK TO US
                    </button>
                </div>
            </div>

            {/* Scroll hint */}
            <div ref={scrollHintRef} style={{
                position: 'absolute', bottom: 32, left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3, textAlign: 'center',
                opacity: 0,
            }}>
                <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(199,217,77,0.5)',
                    marginBottom: 10,
                }}>SCROLL</div>
                <div style={{
                    width: 1, height: 48,
                    background: 'linear-gradient(to bottom, rgba(199,217,77,0.5), transparent)',
                    margin: '0 auto',
                    animation: 'scrollPulse 2s ease-in-out infinite',
                }} />
            </div>

            <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity:0.5; transform:scaleY(1); }
          50% { opacity:1; transform:scaleY(1.1); }
        }
      `}</style>
        </section>
    )
}
