import { useEffect, useRef, useCallback } from 'react'
import isMobileDevice from '../hooks/useMobile'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
    {
        number: '01',
        title: 'LED Video Walls',
        description: 'High-resolution LED screens that transform any stage into a dynamic visual experience. From conference backdrops to full-immersion summits — pixel-perfect, every time.',
        image: 'https://static.wixstatic.com/media/d31169_cefa8379670a4b619bf3c7a59d4b384a~mv2.jpg',
        tag: 'VISUAL TECH',
    },
    {
        number: '02',
        title: 'Professional Sound',
        description: 'Crystal-clear audio systems engineered for speech intelligibility and high-impact presentations. From 200-seat boardrooms to 5,000-person summits.',
        image: 'https://static.wixstatic.com/media/d31169_99ec0fd4a94b4f3888859964c24911ac~mv2.jpg',
        tag: 'AUDIO SYSTEMS',
    },
    {
        number: '03',
        title: 'Event Lighting',
        description: 'Stage lighting that sets the mood, frames the moment, and elevates your brand on stage. Conferences, conclaves, award nights — precision-controlled.',
        image: 'https://static.wixstatic.com/media/8ae041_b041418291564009b2375af8a8848b69~mv2.jpg',
        tag: 'LIGHTING DESIGN',
    },
    {
        number: '04',
        title: 'Content Creation',
        description: 'Dynamic digital content for LED walls, digital signage, and VR experiences. We design and deploy visuals that complement your event narrative.',
        image: 'https://static.wixstatic.com/media/8ae041_4b2bbaa8166c4226bd73173976fdd35a~mv2.jpg',
        tag: 'CONTENT & VR',
    },
]

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...SERVICES, ...SERVICES]

function ServiceCard({ service, index }) {
    const cardRef  = useRef(null)
    const glareRef = useRef(null)
    const rafRef   = useRef(null)   // throttle mousemove to one update per frame

    const handleMouseMove = useCallback((e) => {
        if (isMobileDevice()) return  // skip 3D tilt entirely on touch devices
        if (rafRef.current) return  // already a frame queued — skip
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null
            const card = cardRef.current
            if (!card) return
            const rect    = card.getBoundingClientRect()
            const x       = e.clientX - rect.left
            const y       = e.clientY - rect.top
            const centerX = rect.width  / 2
            const centerY = rect.height / 2
            const rotateX = ((y - centerY) / centerY) * -8
            const rotateY = ((x - centerX) / centerX) *  8

            gsap.to(card, {
                rotateX, rotateY, scale: 1.04,
                duration: 0.35, ease: 'power2.out',
                transformPerspective: 800,
                overwrite: 'auto',   // cancel any running tween to same target
            })

            if (glareRef.current) {
                const px = (x / rect.width)  * 100
                const py = (y / rect.height) * 100
                glareRef.current.style.background =
                    `radial-gradient(circle at ${px}% ${py}%, rgba(199,217,77,0.15) 0%, transparent 60%)`
            }

            const img = card.querySelector('.svc-img')
            if (img) gsap.to(img, { scale: 1.1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })

            const overlay = card.querySelector('.svc-overlay')
            if (overlay) gsap.to(overlay, { opacity: 0.85, duration: 0.35, overwrite: 'auto' })

            const num = card.querySelector('.svc-num')
            if (num) gsap.to(num, { color: '#C7D94D', duration: 0.25, overwrite: 'auto' })
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
        })

        if (glareRef.current) {
            glareRef.current.style.background = 'transparent'
        }

        const img = card.querySelector('.svc-img')
        if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' })

        const overlay = card.querySelector('.svc-overlay')
        if (overlay) gsap.to(overlay, { opacity: 0.7, duration: 0.4 })

        const num = card.querySelector('.svc-num')
        if (num) gsap.to(num, { color: 'rgba(199,217,77,0.25)', duration: 0.3 })
    }, [])

    const mobile = isMobileDevice()

    return (
        <div
            ref={cardRef}
            onMouseMove={e => {
                if (mobile) return
                handleMouseMove(e)
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(199,217,77,0.12), 0 0 0 1px rgba(199,217,77,0.2)'
            }}
            onMouseLeave={e => {
                if (mobile) return
                handleMouseLeave()
                e.currentTarget.style.boxShadow = 'none'
            }}
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                flex: '0 0 340px',
                height: 420,
                transformStyle: mobile ? 'flat' : 'preserve-3d',
                willChange: mobile ? 'auto' : 'transform',
                border: '1px solid rgba(199,217,77,0.08)',
                transition: 'box-shadow 0.4s ease',
            }}
        >
            {/* Background image */}
            <img
                className="svc-img"
                src={service.image}
                alt={service.title}
                loading="lazy"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    inset: 0,
                    willChange: mobile ? 'auto' : 'transform',
                }}
            />

            {/* Dark overlay */}
            <div className="svc-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.5) 60%, rgba(5,5,5,0.2) 100%)',
                opacity: 0.7,
            }} />

            {/* Glare layer */}
            <div ref={glareRef} style={{
                position: 'absolute', inset: 0,
                pointerEvents: 'none',
                zIndex: 3,
            }} />

            {/* Tag */}
            <div style={{
                position: 'absolute', top: 20, left: 20, zIndex: 2,
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.25em',
                color: 'var(--green)',
                background: 'rgba(5,5,5,0.7)',
                padding: '5px 10px',
                border: '1px solid rgba(199,217,77,0.3)',
                backdropFilter: 'blur(4px)',
            }}>
                {service.tag}
            </div>

            {/* Content */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 24px 28px',
                zIndex: 2,
            }}>
                <div className="svc-num" style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: '2.5rem',
                    color: 'rgba(199,217,77,0.25)',
                    lineHeight: 1,
                    marginBottom: 8,
                }}>
                    {service.number}
                </div>
                <h3 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--white)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 10,
                }}>
                    {service.title}
                </h3>
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(245,245,245,0.6)',
                    lineHeight: 1.7,
                    fontWeight: 300,
                }}>
                    {service.description}
                </p>
            </div>

            {/* Bottom green accent line */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                zIndex: 3,
            }}
                className="svc-accent"
            />

            <style>{`
                div:hover > .svc-accent { opacity: 1 !important; }
            `}</style>
        </div>
    )
}

export default function ServicesSection() {
    const sectionRef = useRef(null)
    const headRef = useRef(null)
    const trackRef = useRef(null)
    const marqueeWrapRef = useRef(null)

    useEffect(() => {
        // Heading scroll animation (GSAP only here, no marquee GSAP)
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
                }
            )
        }, sectionRef)

        // Set CSS variable for the marquee width (one set of cards)
        const track = trackRef.current
        if (track) {
            // Width of one set = first N children (cards count)
            let singleSetWidth = 0
            const children = track.children
            for (let i = 0; i < SERVICES.length; i++) {
                if (children[i]) singleSetWidth += children[i].offsetWidth + 24
            }
            track.style.setProperty('--marquee-width', `-${singleSetWidth}px`)
        }

        return () => ctx.revert()
    }, [])

    return (
        <section id="services" ref={sectionRef} style={{
            background: 'var(--dark)',
            padding: 'clamp(80px, 10vw, 120px) 0',
        }}>
            <div ref={headRef} style={{ marginBottom: 64, padding: '0 clamp(24px, 8vw, 100px)' }}>
                <div className="section-label">What We Do</div>
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                    color: 'var(--white)',
                    maxWidth: 640,
                    lineHeight: 1.1,
                }}>
                    AV SOLUTIONS <span style={{ color: 'var(--green)' }}>BUILT FOR</span> PRECISION
                </h2>
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1rem',
                    color: 'var(--text-muted)',
                    maxWidth: 560,
                    lineHeight: 1.8,
                    marginTop: 20,
                    fontWeight: 300,
                }}>
                    A conference for 500 people and a product launch for 200 need very different
                    setups. Corporate conferences, dealer meets, award nights, government summits —
                    we handle the full technical spectrum.
                </p>
            </div>

            {/* Marquee outer wrapper — overflow hidden + fade edges */}
            <div
                ref={marqueeWrapRef}
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    // perspective causes GPU layer compositing; skip on mobile
                    perspective: isMobileDevice() ? 'none' : '1000px',
                    paddingTop: 20,
                    paddingBottom: 20,
                    position: 'relative',
                }}
            >
                {/* CSS-animated track — pauses on hover via CSS */}
                <div
                    ref={trackRef}
                    className="marquee-track"
                >
                    {MARQUEE_ITEMS.map((s, i) => (
                        <ServiceCard key={`${s.number}-${i}`} service={s} index={i} />
                    ))}
                </div>

                {/* Fade edges */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: 120,
                    background: 'linear-gradient(to right, var(--dark), transparent)',
                    pointerEvents: 'none', zIndex: 5,
                }} />
                <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0, width: 120,
                    background: 'linear-gradient(to left, var(--dark), transparent)',
                    pointerEvents: 'none', zIndex: 5,
                }} />
            </div>
        </section>
    )
}
