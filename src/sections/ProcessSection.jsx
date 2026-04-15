import { useEffect, useRef } from 'react'
import isMobileDevice from '../hooks/useMobile'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
    {
        step: 'STEP 01',
        title: 'Understanding the Event',
        desc: 'We analyse the event format, audience size, stage layout, and key shifts in the program to understand what the AV needs to achieve.',
        bullets: [
            'Event format & audience profiling',
            'Stage layout & program flow analysis',
            'Key AV objectives defined upfront',
        ],
    },
    {
        step: 'STEP 02',
        title: 'Venue Assessment',
        desc: 'Checking hall size, ceiling height, acoustics, power supply, rigging points, and logistics before a single piece of equipment is specified.',
        bullets: [
            'On-site acoustic & spatial survey',
            'Power, rigging & logistics check',
            'Equipment specification locked in',
        ],
    },
    {
        step: 'STEP 03',
        title: 'Technical Planning',
        desc: 'An integrated technical design — LED wall placement, sound configuration, lighting cue sequences, signal flow, and backup systems.',
        bullets: [
            'LED placement & signal flow design',
            'Sound & lighting cue sequencing',
            'Full backup system planning',
        ],
    },
    {
        step: 'STEP 04',
        title: 'Setup & Testing',
        desc: 'Overnight setups, full system rehearsals, and backup equipment on standby. Every switch, every cue, tested before the first guest arrives.',
        bullets: [
            'Overnight rig & full system setup',
            'End-to-end rehearsal run-through',
            'Backup gear on standby throughout',
        ],
    },
    {
        step: 'STEP 05',
        title: 'Live Event Supervision',
        desc: 'Real-time management by experienced engineers. Instant switching, cue control, and on-the-fly adjustments throughout the entire event.',
        bullets: [
            'Dedicated engineer per system',
            'Real-time cue & switch control',
            'On-the-fly adjustments as needed',
        ],
    },
]

// Pure CSS-driven hover: no GSAP tweens involved so no stacking/orphan issues
function StepCard({ step, index, elRef }) {
    const barRef = useRef(null)
    const cardRef = useRef(null)

    const onEnter = () => {
        if (isMobileDevice()) return
        // Direct style mutation — instantaneous, no tween queue
        if (barRef.current) {
            barRef.current.style.transform = 'scaleY(1)'
        }
        if (cardRef.current) {
            cardRef.current.style.transform = 'translateY(-4px)'
            cardRef.current.style.borderColor = 'rgba(199,217,77,0.45)'
            cardRef.current.style.boxShadow = '0 14px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(199,217,77,0.12)'
        }
    }

    const onLeave = () => {
        if (isMobileDevice()) return
        if (barRef.current) {
            barRef.current.style.transform = 'scaleY(0)'
        }
        if (cardRef.current) {
            cardRef.current.style.transform = 'translateY(0)'
            cardRef.current.style.borderColor = 'rgba(199,217,77,0.12)'
            cardRef.current.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'
        }
    }

    return (
        <div
            ref={elRef}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
                display: 'flex',
                gap: 'clamp(20px, 4vw, 48px)',
                alignItems: 'flex-start',
                marginBottom: index < STEPS.length - 1 ? 28 : 0,
                opacity: 0,
            }}
        >
            {/* Step dot column */}
            <div style={{
                flexShrink: 0,
                width: 'clamp(56px, 8vw, 80px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 6,
            }}>
                <div style={{
                    width: 12, height: 12,
                    borderRadius: '50%',
                    background: '#C7D94D',
                    boxShadow: '0 0 0 4px rgba(199,217,77,0.15), 0 0 16px rgba(199,217,77,0.4)',
                    flexShrink: 0,
                }} />
            </div>

            {/* Card */}
            <div
                ref={cardRef}
                style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(199,217,77,0.12)',
                    padding: 'clamp(20px, 3vw, 32px)',
                    display: 'flex',
                    gap: 'clamp(16px, 3vw, 32px)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    // CSS transition handles the smooth visual — not GSAP
                    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.35s ease',
                }}
            >
                {/* Left accent bar — CSS transition, never GSAP */}
                <div ref={barRef} style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0,
                    width: 3,
                    background: 'linear-gradient(to bottom, #C7D94D, rgba(199,217,77,0.3))',
                    transformOrigin: 'top',
                    transform: 'scaleY(0)', // start hidden
                    transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                }} />

                {/* Vertical step label */}
                <div style={{
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingLeft: 12,
                }}>
                    <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.55rem',
                        letterSpacing: '0.25em',
                        color: 'rgba(199,217,77,0.5)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        userSelect: 'none',
                    }}>
                        {step.step}
                    </div>
                </div>

                {/* Thin divider */}
                <div style={{
                    width: 1,
                    alignSelf: 'stretch',
                    background: 'rgba(199,217,77,0.1)',
                    flexShrink: 0,
                }} />

                {/* Main content */}
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 700,
                        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                        color: '#f5f5f5',
                        marginBottom: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        {step.title}
                    </h3>
                    <p style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.85rem',
                        color: 'rgba(245,245,245,0.5)',
                        lineHeight: 1.75,
                        fontWeight: 300,
                        marginBottom: 16,
                    }}>
                        {step.desc}
                    </p>

                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 7,
                    }}>
                        {step.bullets.map((b, bi) => (
                            <li key={bi} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.78rem',
                                color: 'rgba(245,245,245,0.65)',
                                fontWeight: 400,
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: 5, height: 5,
                                    borderRadius: '50%',
                                    background: '#C7D94D',
                                    flexShrink: 0,
                                    boxShadow: '0 0 6px rgba(199,217,77,0.6)',
                                }} />
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default function ProcessSection() {
    const sectionRef = useRef(null)
    const headRef = useRef(null)
    const stepsRef = useRef([])
    const lineRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading: plays forward on scroll down, reverses on scroll back up
            gsap.fromTo(headRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headRef.current,
                        start: 'top 85%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            // Connecting line — scrub-based so it follows scroll perfectly in both directions
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'bottom 85%',
                        scrub: 0.8,
                    },
                }
            )

            // Cards: each one plays/reverses individually as they enter/leave viewport
            stepsRef.current.forEach((step) => {
                if (!step) return
                gsap.fromTo(step,
                    { x: -50, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 0.65,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: step,
                            start: 'top 88%',
                            end: 'top 55%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="about" ref={sectionRef} style={{
            background: 'var(--dark)',
            padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)',
            borderTop: '1px solid rgba(199,217,77,0.07)',
        }}>
            <div ref={headRef} style={{ marginBottom: 64, maxWidth: 700 }}>
                <div className="section-label">How We Work</div>
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)',
                    color: 'var(--white)',
                    lineHeight: 1.1,
                }}>
                    FIVE STEPS TO A <span style={{ color: 'var(--green)' }}>FLAWLESS EVENT</span>
                </h2>
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    marginTop: 20,
                    fontWeight: 300,
                }}>
                    Over 20 years, many of our clients have stayed because of this. Not because
                    we promised reliability. Because they experienced it.
                </p>
            </div>

            <div style={{ position: 'relative', maxWidth: 900 }}>
                {/* Vertical connecting line — scrub-animated */}
                <div style={{
                    position: 'absolute',
                    left: 'clamp(28px, 4vw, 40px)',
                    top: 0, bottom: 0,
                    width: 1,
                    background: 'rgba(199,217,77,0.08)',
                }}>
                    <div ref={lineRef} style={{
                        width: '100%', height: '100%',
                        background: 'linear-gradient(to bottom, rgba(199,217,77,0.7), rgba(199,217,77,0.05))',
                        transformOrigin: 'top',
                    }} />
                </div>

                {STEPS.map((s, i) => (
                    <StepCard
                        key={s.step}
                        step={s}
                        index={i}
                        elRef={el => stepsRef.current[i] = el}
                    />
                ))}
            </div>
        </section>
    )
}
