import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleCanvas from '../components/ParticleCanvas'

gsap.registerPlugin(ScrollTrigger)

const EVENT_TYPES = [
    'Conference / Conclave',
    'Government Summit',
    'Product Launch',
    'Award Night / Gala',
    'Dealer Meet',
    'Exhibition / Expo',
    'Wedding / Destination Event',
    'Other',
]

const CONTACT_ITEMS = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C7D94D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: 'FIND US',
        value: 'Door No. 48, 574-A, Narayanasan Rd, beside Gold Souk Grandé Mall, Ponnurunni, Vyttila, Kochi 682019',
        href: null,
        multiline: true,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C7D94D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: 'EMAIL US',
        value: 'mail@greenmedia.co',
        href: 'mailto:mail@greenmedia.co',
        multiline: false,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C7D94D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.18 2.18 2 2 0 012.18 0H5.18a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.08v2.84z" />
            </svg>
        ),
        label: 'CALL US',
        value: '+91 484 000 0000',
        href: 'tel:+914840000000',
        multiline: false,
    },
]

const labelStyle = {
    display: 'block',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '0.58rem',
    letterSpacing: '0.28em',
    color: '#C7D94D',
    marginBottom: 8,
    textTransform: 'uppercase',
}

const inputBase = {
    width: '100%',
    padding: '13px 16px 13px 20px',
    background: 'rgba(255,255,255,0.03)',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: '1px solid rgba(199,217,77,0.15)',
    borderLeft: '3px solid rgba(199,217,77,0.4)',
    color: '#f5f5f5',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
    borderRadius: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
}

const focusStyle = (e) => {
    e.target.style.borderLeftColor = '#C7D94D'
    e.target.style.background = 'rgba(199,217,77,0.04)'
    e.target.style.boxShadow = 'inset 0 0 0 1px rgba(199,217,77,0.08)'
}
const blurStyle = (e) => {
    e.target.style.borderLeftColor = 'rgba(199,217,77,0.4)'
    e.target.style.background = 'rgba(255,255,255,0.03)'
    e.target.style.boxShadow = 'none'
}

export default function ContactSection() {
    const sectionRef = useRef(null)
    const headRef = useRef(null)
    const infoRef = useRef(null)
    const formRef = useRef(null)
    const formCardRef = useRef(null) // the card that triggers particle formation

    const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
                }
            )
            gsap.fromTo(infoRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
                    scrollTrigger: { trigger: infoRef.current, start: 'top 82%' },
                }
            )
            gsap.fromTo(formRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
                    scrollTrigger: { trigger: formRef.current, start: 'top 82%' },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section id="contact" ref={sectionRef} style={{
            background: '#050505',
            padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Particle system background — triggers on form card hover */}
            <ParticleCanvas triggerRef={formCardRef} />

            {/* Large green radial glow — bottom right */}
            <div style={{
                position: 'absolute', bottom: -200, right: -150,
                width: 700, height: 700,
                background: 'radial-gradient(circle, rgba(199,217,77,0.09) 0%, transparent 65%)',
                pointerEvents: 'none',
            }} />
            {/* Top-left secondary glow */}
            <div style={{
                position: 'absolute', top: -100, left: -100,
                width: 400, height: 400,
                background: 'radial-gradient(circle, rgba(199,217,77,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Diagonal accent slash */}
            <div style={{
                position: 'absolute', top: 0, left: '55%',
                width: '3px', height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(199,217,77,0.12) 30%, rgba(199,217,77,0.12) 70%, transparent)',
                transform: 'skewX(-16deg)',
                pointerEvents: 'none',
            }} />

            {/* ── Heading ── */}
            <div ref={headRef} style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1, opacity: 0 }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>Let's Talk</div>
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.2rem, 7vw, 6rem)',
                    color: '#f5f5f5',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginTop: 12,
                }}>
                    LET'S CREATE<br />
                    <span style={{ color: '#C7D94D', textShadow: '0 0 60px rgba(199,217,77,0.3)' }}>SOMETHING</span><br />
                    EXTRAORDINARY
                </h2>
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.95rem',
                    color: 'rgba(245,245,245,0.45)',
                    maxWidth: 480,
                    margin: '20px auto 0',
                    lineHeight: 1.85,
                    fontWeight: 300,
                }}>
                    Your event deserves precision. Tell us about it — we'll bring the AV expertise.
                </p>
            </div>

            {/* ── Contact info pills row ── */}
            <div ref={infoRef} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                maxWidth: 1100,
                margin: '0 auto 48px',
                position: 'relative', zIndex: 1,
                opacity: 0,
            }}>
                {CONTACT_ITEMS.map((item, i) => (
                    <div key={i} style={{
                        padding: '24px 28px',
                        border: '1px solid rgba(199,217,77,0.12)',
                        background: 'rgba(255,255,255,0.025)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 16,
                        transition: 'border-color 0.3s, background 0.3s',
                        cursor: item.href ? 'pointer' : 'default',
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(199,217,77,0.3)'
                            e.currentTarget.style.background = 'rgba(199,217,77,0.04)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(199,217,77,0.12)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                        }}
                        onClick={() => item.href && window.open(item.href)}
                    >
                        <div style={{
                            width: 40, height: 40, flexShrink: 0,
                            border: '1px solid rgba(199,217,77,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {item.icon}
                        </div>
                        <div>
                            <div style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '0.55rem',
                                letterSpacing: '0.28em',
                                color: '#C7D94D',
                                marginBottom: 8,
                            }}>{item.label}</div>
                            <div style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.82rem',
                                color: 'rgba(245,245,245,0.7)',
                                lineHeight: item.multiline ? 1.8 : 1.4,
                                fontWeight: item.href ? 600 : 300,
                            }}>{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main form card ── */}
            <div ref={formRef} style={{
                maxWidth: 1100,
                margin: '0 auto',
                position: 'relative', zIndex: 1,
                opacity: 0,
            }}>
                <div
                    ref={formCardRef}
                    style={{
                    background: 'rgba(10, 20, 5, 0.45)',
                    border: '1px solid rgba(199,217,77,0.25)',
                    padding: 'clamp(32px, 5vw, 56px)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 0 1px rgba(199,217,77,0.07) inset, 0 8px 48px rgba(0,0,0,0.6), 0 0 80px rgba(199,217,77,0.05)',
                }}>
                    {/* Corner accent — top left */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0,
                        width: 60, height: 60,
                        borderTop: '2px solid rgba(199,217,77,0.5)',
                        borderLeft: '2px solid rgba(199,217,77,0.5)',
                        pointerEvents: 'none',
                    }} />
                    {/* Corner accent — bottom right */}
                    <div style={{
                        position: 'absolute', bottom: 0, right: 0,
                        width: 60, height: 60,
                        borderBottom: '2px solid rgba(199,217,77,0.5)',
                        borderRight: '2px solid rgba(199,217,77,0.5)',
                        pointerEvents: 'none',
                    }} />
                    {/* Inner glow — top right bloom */}
                    <div style={{
                        position: 'absolute', top: -80, right: -80,
                        width: 360, height: 360,
                        background: 'radial-gradient(circle, rgba(199,217,77,0.09) 0%, transparent 65%)',
                        pointerEvents: 'none',
                    }} />
                    {/* Inner glow — bottom left bloom */}
                    <div style={{
                        position: 'absolute', bottom: -80, left: -80,
                        width: 280, height: 280,
                        background: 'radial-gradient(circle, rgba(199,217,77,0.05) 0%, transparent 65%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Top bar accent */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(199,217,77,0.6) 40%, rgba(199,217,77,0.6) 60%, transparent 100%)',
                    }} />

                    {submitted ? (
                        <div style={{
                            padding: '60px 40px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 20,
                        }}>
                            <div style={{
                                width: 72, height: 72,
                                border: '2px solid #C7D94D',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem', color: '#C7D94D',
                                boxShadow: '0 0 30px rgba(199,217,77,0.2)',
                            }}>✓</div>
                            <h3 style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 700, fontSize: '1.3rem', color: '#f5f5f5',
                            }}>MESSAGE RECEIVED</h3>
                            <p style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.88rem', color: 'rgba(245,245,245,0.5)',
                                lineHeight: 1.7, maxWidth: 380,
                            }}>
                                We'll be in touch within 24 hours to discuss your event requirements.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Row 1: Name + Email */}
                            <div className="contact-form-row" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '24px 32px',
                                marginBottom: 24,
                            }}>
                                <div>
                                    <label style={labelStyle}>Your Name</label>
                                    <input type="text" required placeholder="John Doe"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        onFocus={focusStyle} onBlur={blurStyle}
                                        style={inputBase} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email Address</label>
                                    <input type="email" required placeholder="you@company.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        onFocus={focusStyle} onBlur={blurStyle}
                                        style={inputBase} />
                                </div>
                            </div>

                            {/* Row 2: Phone + Event Type */}
                            <div className="contact-form-row" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '24px 32px',
                                marginBottom: 24,
                            }}>
                                <div>
                                    <label style={labelStyle}>Phone Number</label>
                                    <input type="tel" placeholder="+91 98000 00000"
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        onFocus={focusStyle} onBlur={blurStyle}
                                        style={inputBase} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Event Type</label>
                                    <select required
                                        value={form.eventType}
                                        onChange={e => setForm({ ...form, eventType: e.target.value })}
                                        onFocus={focusStyle} onBlur={blurStyle}
                                        style={{
                                            ...inputBase,
                                            cursor: 'pointer',
                                            color: form.eventType ? '#f5f5f5' : 'rgba(245,245,245,0.35)',
                                        }}>
                                        <option value="" disabled style={{ background: '#0c0c0c', color: 'rgba(245,245,245,0.4)' }}>
                                            Select event type
                                        </option>
                                        {EVENT_TYPES.map(t => (
                                            <option key={t} value={t} style={{ background: '#0c0c0c', color: '#f5f5f5' }}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Row 3: Event Date */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={labelStyle}>Event Date</label>
                                <input type="date"
                                    value={form.eventDate}
                                    onChange={e => setForm({ ...form, eventDate: e.target.value })}
                                    onFocus={focusStyle} onBlur={blurStyle}
                                    style={{
                                        ...inputBase,
                                        colorScheme: 'dark',
                                        maxWidth: 280,
                                    }} />
                            </div>

                            {/* Row 4: Message */}
                            <div style={{ marginBottom: 32 }}>
                                <label style={labelStyle}>Tell Us About Your Event</label>
                                <textarea required rows={5}
                                    placeholder="Venue, audience size, any specific AV requirements..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    onFocus={focusStyle} onBlur={blurStyle}
                                    style={{ ...inputBase, resize: 'vertical', fontFamily: 'Montserrat, sans-serif' }} />
                            </div>

                            {/* Submit row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                                <button type="submit" className="btn-primary" style={{
                                    padding: '16px 48px',
                                    fontSize: '0.78rem',
                                    letterSpacing: '0.12em',
                                    clipPath: 'none',
                                }}>
                                    SEND MESSAGE →
                                </button>
                                <p style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '0.72rem',
                                    color: 'rgba(245,245,245,0.3)',
                                    lineHeight: 1.6,
                                    margin: 0,
                                }}>
                                    We respond to all inquiries within 24 hours.
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Bottom stat strip */}
                <div className="contact-stat-strip" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    border: '1px solid rgba(199,217,77,0.12)',
                    borderTop: 'none',
                    marginTop: 0,
                }}>
                    {[
                        { num: '20+', label: 'Years of Excellence' },
                        { num: '500+', label: 'Events Delivered' },
                        { num: '24hr', label: 'Response Time' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            padding: '20px 28px',
                            borderLeft: i > 0 ? '1px solid rgba(199,217,77,0.1)' : 'none',
                            background: i === 0 ? 'rgba(199,217,77,0.06)' : 'transparent',
                            display: 'flex', alignItems: 'center', gap: 16,
                        }}>
                            <div style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 900,
                                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                                color: '#C7D94D',
                                lineHeight: 1,
                            }}>{s.num}</div>
                            <div style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.72rem',
                                color: 'rgba(245,245,245,0.45)',
                                lineHeight: 1.4,
                                fontWeight: 300,
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
