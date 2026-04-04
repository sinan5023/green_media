import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import navLogo from '../assets/navlogo.jpg'

const NAV_LINKS = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Our Work', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
]

function GreenMediaLogo() {
    return (
        <a
            href="#home"
            onClick={e => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
            <img
                src={navLogo}
                alt="Green Media"
                style={{
                    height: 42,
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />
        </a>
    )
}

export default function Navbar({ visible }) {
    const navRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const overlayRef = useRef(null)
    const menuLinksRef = useRef([])

    // Animate pill in when visible
    useEffect(() => {
        if (visible && navRef.current) {
            gsap.fromTo(navRef.current,
                { y: -60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            )
        }
    }, [visible])

    // Active section tracking via IntersectionObserver
    useEffect(() => {
        const sectionIds = NAV_LINKS.map(l => l.id)
        const observers = []

        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, {
            threshold: 0.35,
            rootMargin: '0px 0px -10% 0px',
        })

        sectionIds.forEach(id => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [visible])

    // Animate overlay open/close
    useEffect(() => {
        if (!overlayRef.current) return
        if (menuOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
            gsap.fromTo(menuLinksRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.15 }
            )
            document.body.style.overflow = 'hidden'
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    const scrollTo = (href) => {
        setMenuOpen(false)
        setTimeout(() => {
            const el = document.querySelector(href)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 350)
    }

    if (!visible) return null

    return (
        <>
            {/* ── Floating Pill Navbar ── */}
            <nav ref={navRef} style={{
                position: 'fixed',
                top: 18,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                width: 'fit-content',
                maxWidth: '90vw',
                background: 'rgba(5,5,5,0.78)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(199,217,77,0.2)',
                borderRadius: 100,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 6px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(199,217,77,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
                opacity: 0,
            }}>
                <GreenMediaLogo />

                {/* Desktop links */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}
                    className="nav-desktop-links">
                    {NAV_LINKS.map(link => {
                        const isActive = activeSection === link.id
                        return (
                            <button key={link.href}
                                onClick={() => scrollTo(link.href)}
                                style={{
                                    background: isActive ? 'rgba(199,217,77,0.1)' : 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: isActive ? '#C7D94D' : 'rgba(245,245,245,0.65)',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.08em',
                                    padding: '6px 12px',
                                    borderRadius: 100,
                                    transition: 'all 0.25s ease',
                                    textTransform: 'uppercase',
                                    position: 'relative',
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = '#C7D94D'
                                        e.currentTarget.style.background = 'rgba(199,217,77,0.07)'
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = 'rgba(245,245,245,0.65)'
                                        e.currentTarget.style.background = 'none'
                                    }
                                }}
                            >
                                {link.label}
                                {isActive && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: 2,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        background: '#C7D94D',
                                        boxShadow: '0 0 6px rgba(199,217,77,0.8)',
                                        display: 'block',
                                    }} />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Hamburger — mobile only */}
                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                    style={{
                        width: 36, height: 36,
                        borderRadius: '50%',
                        border: '1px solid rgba(199,217,77,0.3)',
                        background: menuOpen ? '#C7D94D' : 'rgba(199,217,77,0.07)',
                        cursor: 'pointer',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 4,
                        transition: 'all 0.25s ease',
                        flexShrink: 0,
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{
                            display: 'block',
                            width: menuOpen ? (i === 1 ? '0px' : '15px') : '15px',
                            height: '1.5px',
                            background: menuOpen ? '#050505' : '#C7D94D',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            transform: menuOpen
                                ? (i === 0 ? 'rotate(45deg) translate(3.5px,3.5px)' : i === 2 ? 'rotate(-45deg) translate(3.5px,-3.5px)' : '')
                                : '',
                        }} />
                    ))}
                </button>
            </nav>

            {/* ── Full Screen Overlay Menu ── */}
            <div ref={overlayRef} style={{
                position: 'fixed', inset: 0, zIndex: 999,
                background: 'rgba(5,5,5,0.97)',
                backdropFilter: 'blur(4px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', justifyContent: 'center',
                padding: 'clamp(80px, 10vw, 120px)',
                opacity: 0,
                pointerEvents: menuOpen ? 'all' : 'none',
            }}>
                {/* Decorative grid line */}
                <div style={{
                    position: 'absolute', top: 0, right: '35%', bottom: 0,
                    width: '1px', background: 'rgba(199,217,77,0.08)',
                }} />
                <div style={{
                    position: 'absolute', left: 0, right: 0,
                    top: '50%', height: '1px',
                    background: 'rgba(199,217,77,0.05)',
                }} />

                <div style={{
                    position: 'absolute', bottom: 40, left: 'clamp(80px, 10vw, 120px)',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(199,217,77,0.4)',
                }}>
                    KERALA'S LEADING AV TECHNOLOGY
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {NAV_LINKS.map((link, i) => (
                        <button
                            key={link.href}
                            ref={el => menuLinksRef.current[i] = el}
                            onClick={() => scrollTo(link.href)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 900,
                                fontSize: 'clamp(2rem, 7vw, 5.5rem)',
                                color: activeSection === link.id ? 'rgba(199,217,77,0.9)' : 'rgba(245,245,245,0.15)',
                                letterSpacing: '-0.01em',
                                lineHeight: 1.1,
                                textAlign: 'left',
                                padding: '4px 0',
                                transition: 'all 0.25s ease',
                                opacity: 0,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#C7D94D'
                                e.currentTarget.style.transform = 'translateX(20px)'
                                e.currentTarget.style.textShadow = '0 0 60px rgba(199,217,77,0.4)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = activeSection === link.id ? 'rgba(199,217,77,0.9)' : 'rgba(245,245,245,0.15)'
                                e.currentTarget.style.transform = 'translateX(0)'
                                e.currentTarget.style.textShadow = 'none'
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Social links */}
                <div style={{
                    position: 'absolute', bottom: 40,
                    right: 'clamp(80px, 10vw, 120px)',
                    display: 'flex', gap: 20,
                }}>
                    {[
                        { label: 'Instagram', href: 'https://instagram.com' },
                        { label: 'LinkedIn', href: 'https://linkedin.com' },
                    ].map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.7rem', letterSpacing: '0.2em',
                                color: 'rgba(245,245,245,0.3)',
                                textTransform: 'uppercase',
                                transition: 'color 0.25s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#C7D94D'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,245,0.3)'}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                /* Desktop: show nav links, hide hamburger */
                @media (min-width: 768px) {
                    .nav-hamburger { display: none !important; }
                    .nav-desktop-links { display: flex !important; }
                }
                /* Mobile: hide nav links, show hamburger */
                @media (max-width: 767px) {
                    .nav-desktop-links { display: none !important; }
                    .nav-hamburger { display: flex !important; }
                }
            `}</style>
        </>
    )
}
