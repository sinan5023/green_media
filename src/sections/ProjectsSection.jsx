import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
    {
        title: 'THE SUMMIT OF THE FUTURE 2026',
        tag: 'GOVERNMENT SUMMIT',
        image: 'https://static.wixstatic.com/media/e9f76c_abfdceaf12064c64b0f1fb9cff49756d~mv2.avif',
    },
    {
        title: 'VIZHINJAM PORT INAUGURATION',
        tag: 'NATIONAL EVENT',
        image: 'https://static.wixstatic.com/media/e9f76c_91d71bcce6b24b539f6f5bf9fffaab64~mv2.jpg',
    },
    {
        title: 'CIAL CARGO SUMMIT 2026',
        tag: 'CORPORATE SUMMIT',
        image: 'https://static.wixstatic.com/media/e9f76c_ce5ae49ab9374fe3b42e3c3011324462~mv2.png',
    },
    {
        title: 'HUDDLE GLOBAL 2025',
        tag: 'GLOBAL CONFERENCE',
        image: 'https://static.wixstatic.com/media/e9f76c_789f184baf7447af805c930e7cdb2d15~mv2.jpeg',
    },
    {
        title: 'NAVY DAY 2025',
        tag: 'NATIONAL CEREMONY',
        image: 'https://static.wixstatic.com/media/e9f76c_0b6278adab424269879d15cfd0f18c77~mv2.jpg',
    },
    {
        title: 'SKILL KERALA GLOBAL SUMMIT 2025',
        tag: 'GOVERNMENT SUMMIT',
        image: 'https://static.wixstatic.com/media/e9f76c_40d6a455702549fb92a71cc2741d738a~mv2.jpeg',
    },
]

export default function ProjectsSection() {
    const sectionRef = useRef(null)
    const headRef = useRef(null)
    const gridRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
                }
            )

            const cards = gridRef.current?.querySelectorAll('.project-card')
            if (cards) {
                gsap.fromTo(cards,
                    { y: 80, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                        stagger: 0.1,
                        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" ref={sectionRef} style={{
            background: 'var(--dark2)',
            padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)',
        }}>
            <div ref={headRef} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: 24,
                marginBottom: 56,
            }}>
                <div>
                    <div className="section-label">Our Work</div>
                    <h2 style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)',
                        color: 'var(--white)',
                        lineHeight: 1.1,
                    }}>
                        EVENTS WE HAVE<br /><span style={{ color: 'var(--green)' }}>SUPPORTED</span>
                    </h2>
                </div>
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    maxWidth: 340,
                    fontWeight: 300,
                }}>
                    From historic inaugurations to international summits — here's a
                    selection of the events where Green Media delivered the technical backbone.
                </p>
            </div>

            <div ref={gridRef} className="projects-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 4,
                width: '90%',
                maxWidth: 1400,
                margin: '0 auto',
            }}>
                {PROJECTS.map((p) => (
                    <div
                        key={p.title}
                        className="project-card"
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            opacity: 0,
                        }}
                        onMouseEnter={e => {
                            const img = e.currentTarget.querySelector('img')
                            const overlay = e.currentTarget.querySelector('.proj-overlay')
                            const btn = e.currentTarget.querySelector('.proj-btn')
                            gsap.to(img, { scale: 1.08, duration: 0.7, ease: 'power2.out' })
                            gsap.to(overlay, { opacity: 0.9, duration: 0.4 })
                            gsap.to(btn, { opacity: 1, y: 0, duration: 0.4 })
                        }}
                        onMouseLeave={e => {
                            const img = e.currentTarget.querySelector('img')
                            const overlay = e.currentTarget.querySelector('.proj-overlay')
                            const btn = e.currentTarget.querySelector('.proj-btn')
                            gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out' })
                            gsap.to(overlay, { opacity: 0.55, duration: 0.4 })
                            gsap.to(btn, { opacity: 0, y: 10, duration: 0.3 })
                        }}
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{
                                width: '100%',
                                aspectRatio: '16 / 10',
                                objectFit: 'cover',
                                display: 'block',
                                transformOrigin: 'center',
                            }}
                        />

                        <div className="proj-overlay" style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.1) 100%)',
                            opacity: 0.55,
                        }} />

                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            padding: '20px 24px',
                        }}>
                            <div style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '0.55rem',
                                letterSpacing: '0.25em',
                                color: 'var(--green)',
                                marginBottom: 6,
                            }}>
                                {p.tag}
                            </div>
                            <h3 style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                color: 'var(--white)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                lineHeight: 1.3,
                            }}>
                                {p.title}
                            </h3>
                            <div className="proj-btn" style={{
                                display: 'inline-block',
                                marginTop: 12,
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.68rem',
                                letterSpacing: '0.15em',
                                color: 'var(--green)',
                                opacity: 0,
                                transform: 'translateY(10px)',
                            }}>
                                VIEW PROJECT →
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
