import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
    {
        quote: 'For many years now, Green Media has supported our events with structured AV setups. The technical side is always handled with clarity and discipline.',
        name: 'Githesh Viswambharan',
        role: 'Founder',
        company: 'Kalamaya Event Management',
        initial: 'G',
        stars: 5,
    },
    {
        quote: 'We have associated with Arun for more than ten years. He understands how AV systems need to function in real event conditions — not just on paper.',
        name: 'Prasad',
        role: 'Managing Director',
        company: 'Kerala Printing Press',
        initial: 'P',
        stars: 5,
    },
    {
        quote: 'Across our conferences and public programs, Green Media has always managed the AV technology smoothly. That consistency is why we keep coming back.',
        name: 'Viginesh Vijayan',
        role: 'General Manager',
        company: 'ANZ Integrated Marketing',
        initial: 'V',
        stars: 5,
    },
]

// Triple the items for a seamless, fully-populated marquee loop
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

function StarRating({ count }) {
    return (
        <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#C7D94D">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </div>
    )
}

function TestimonialCard({ item }) {
    const cardRef  = useRef(null)
    const glareRef = useRef(null)
    const rafRef   = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current
        if (!card) return
        if (rafRef.current) return
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const cx = rect.width  / 2
            const cy = rect.height / 2
            const rotX = ((y - cy) / cy) * -7
            const rotY = ((x - cx) / cx) *  7

            gsap.to(card, {
                rotateX: rotX, rotateY: rotY,
                scale: 1.03,
                duration: 0.35, ease: 'power2.out',
                transformPerspective: 800,
                overwrite: 'auto',
            })

            if (glareRef.current) {
                const px = (x / rect.width)  * 100
                const py = (y / rect.height) * 100
                glareRef.current.style.background =
                    `radial-gradient(circle at ${px}% ${py}%, rgba(199,217,77,0.12) 0%, transparent 60%)`
            }
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return
        gsap.to(card, {
            rotateX: 0, rotateY: 0, scale: 1,
            duration: 0.6, ease: 'power3.out',
        })
        if (glareRef.current) glareRef.current.style.background = 'transparent'
    }, [])

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                flex: '0 0 360px',
                padding: '32px 28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(199,217,77,0.1)',
                position: 'relative',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                cursor: 'default',
                transition: 'border-color 0.3s, box-shadow 0.35s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(199,217,77,0.3)'
                e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(199,217,77,0.12)'
            }}
            onMouseOut={e => {
                // Only reset if leaving the card entirely (not bubbling from children)
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    e.currentTarget.style.borderColor = 'rgba(199,217,77,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                }
            }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, var(--green), transparent)',
            }} />

            {/* Glare layer */}
            <div ref={glareRef} style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                transition: 'background 0.1s',
            }} />

            {/* Stars */}
            <StarRating count={item.stars} />

            {/* Quote mark */}
            <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '2.2rem',
                color: 'var(--green)',
                lineHeight: 1,
                marginBottom: 14,
                opacity: 0.6,
            }}>"</div>

            {/* Quote text */}
            <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.88rem',
                color: 'rgba(245,245,245,0.72)',
                lineHeight: 1.85,
                fontWeight: 300,
                fontStyle: 'italic',
                marginBottom: 28,
                minHeight: 100,
            }}>
                {item.quote}
            </p>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(199,217,77,0.12)',
                    border: '2px solid rgba(199,217,77,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 700, fontSize: '0.95rem',
                    color: 'var(--green)',
                }}>
                    {item.initial}
                </div>
                <div>
                    <div style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700, fontSize: '0.82rem',
                        color: 'var(--white)',
                    }}>{item.name}</div>
                    <div style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.7rem', color: 'var(--text-muted)',
                        marginTop: 2,
                    }}>{item.role}, {item.company}</div>
                </div>
            </div>
        </div>
    )
}

export default function TestimonialsSection() {
    const sectionRef = useRef(null)
    const headRef = useRef(null)
    const trackRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
                }
            )
        }, sectionRef)

        // Set CSS variable for one set width
        const track = trackRef.current
        if (track) {
            let singleSetWidth = 0
            const children = track.children
            for (let i = 0; i < TESTIMONIALS.length; i++) {
                if (children[i]) singleSetWidth += children[i].offsetWidth + 24
            }
            track.style.setProperty('--marquee-width', `-${singleSetWidth}px`)
        }

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} style={{
            background: 'var(--black)',
            padding: 'clamp(80px, 10vw, 120px) 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative bg quote */}
            <div style={{
                position: 'absolute', top: 20, right: 40,
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(8rem, 18vw, 16rem)',
                color: 'rgba(199,217,77,0.03)',
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>"</div>

            {/* Heading */}
            <div ref={headRef} style={{ marginBottom: 56, padding: '0 clamp(24px, 8vw, 100px)' }}>
                <div className="section-label">What Clients Say</div>
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
                    color: 'var(--white)',
                    lineHeight: 1.1,
                }}>
                    TRUSTED BY <span style={{ color: 'var(--green)' }}>EVENT LEADERS</span><br />ACROSS INDIA
                </h2>
            </div>

            {/* Marquee wrapper */}
            <div style={{ width: '100%', overflow: 'hidden', perspective: '1000px', paddingTop: 16, paddingBottom: 16, position: 'relative' }}>
                <div
                    ref={trackRef}
                    className="marquee-track"
                    style={{ animationDuration: '28s' }}
                >
                    {MARQUEE_ITEMS.map((t, i) => (
                        <TestimonialCard key={`${t.name}-${i}`} item={t} />
                    ))}
                </div>

                {/* Fade edges */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: 120,
                    background: 'linear-gradient(to right, var(--black), transparent)',
                    pointerEvents: 'none', zIndex: 5,
                }} />
                <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0, width: 120,
                    background: 'linear-gradient(to left, var(--black), transparent)',
                    pointerEvents: 'none', zIndex: 5,
                }} />
            </div>
        </section>
    )
}
