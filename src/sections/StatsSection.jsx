import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
    { value: 20, suffix: '+', label: 'Years of Excellence', sub: 'Since 2000' },
    { value: 500, suffix: '+', label: 'Events Delivered', sub: 'Conferences, Summits, Galas' },
    { value: 50, suffix: '+', label: 'Corporate Clients', sub: 'Government to Fortune 500' },
    { value: 1000, suffix: '+', label: 'Crew Days', sub: 'Across Kerala & India' },
]

function animateCounter(el, target, duration = 2) {
    const obj = { val: 0 }
    gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        onUpdate() {
            if (el) el.textContent = Math.round(obj.val)
        },
    })
}

export default function StatsSection() {
    const sectionRef = useRef(null)
    const valueRefs = useRef([])
    const cardRefs = useRef([])
    const triggered = useRef(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, i) => {
                if (!card) return
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.12,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                            onEnter: () => {
                                if (!triggered.current) {
                                    triggered.current = true
                                    valueRefs.current.forEach((el, j) => {
                                        if (el) animateCounter(el, STATS[j].value)
                                    })
                                }
                            },
                        },
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} style={{
            background: 'var(--black)',
            padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* BG glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw', height: '80vw', maxWidth: 800,
                background: 'radial-gradient(circle, rgba(199,217,77,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
                marginBottom: 60,
            }}>
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                    color: 'var(--white)',
                    lineHeight: 1.1,
                }}>
                    TWO DECADES OF <span style={{ color: 'var(--green)' }}>TECHNICAL</span><br />EXCELLENCE
                </h2>
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    maxWidth: 340,
                    fontWeight: 300,
                }}>
                    From intimate boardrooms to 10,000-seat government summits,
                    Green Media has been Kerala's most trusted AV partner.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
            }}>
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label}
                        ref={el => cardRefs.current[i] = el}
                        style={{
                            padding: '40px 32px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(199,217,77,0.1)',
                            position: 'relative',
                            overflow: 'hidden',
                            opacity: 0,
                        }}
                        onMouseEnter={e => gsap.to(e.currentTarget, { borderColor: 'rgba(199,217,77,0.4)', background: 'rgba(199,217,77,0.05)', duration: 0.3 })}
                        onMouseLeave={e => gsap.to(e.currentTarget, { borderColor: 'rgba(199,217,77,0.1)', background: 'rgba(255,255,255,0.03)', duration: 0.3 })}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginBottom: 12 }}>
                            <span
                                ref={el => valueRefs.current[i] = el}
                                style={{
                                    fontFamily: 'Orbitron, sans-serif',
                                    fontWeight: 900,
                                    fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                                    color: 'var(--green)',
                                    lineHeight: 1,
                                    textShadow: '0 0 40px rgba(199,217,77,0.3)',
                                }}
                            >
                                0
                            </span>
                            <span style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 900,
                                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                color: 'var(--green)',
                                lineHeight: 1,
                                marginTop: 8,
                            }}>
                                {stat.suffix}
                            </span>
                        </div>
                        <div style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            color: 'var(--white)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: 6,
                        }}>
                            {stat.label}
                        </div>
                        <div style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                        }}>
                            {stat.sub}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
