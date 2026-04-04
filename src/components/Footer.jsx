export default function Footer() {
    const links = [
        { label: 'Services', items: ['LED Video Walls', 'Sound Systems', 'Event Lighting', 'Content Creation'] },
        { label: 'Company', items: ['About Us', 'Our Projects', 'Contact'] },
    ]

    return (
        <footer style={{
            background: '#C7D94D',
            color: '#050505',
            padding: 'clamp(48px, 8vw, 80px) clamp(24px, 8vw, 100px) 32px',
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 48,
                marginBottom: 48,
            }}>
                {/* Brand column */}
                <div>
                    <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 900,
                        fontSize: '1.4rem',
                        letterSpacing: '0.1em',
                        marginBottom: 16,
                    }}>
                        green media
                    </div>
                    <p style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.82rem',
                        lineHeight: 1.7,
                        color: 'rgba(5,5,5,0.7)',
                        maxWidth: 260,
                        marginBottom: 24,
                    }}>
                        Kerala's leading AV technology company. Over 20 years of technical excellence
                        in conferences, conclaves, and business programs.
                    </p>
                    <div style={{ display: 'flex', gap: 12 }}>
                        {['Instagram', 'LinkedIn'].map(s => (
                            <a key={s} href="#"
                                style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '0.68rem',
                                    letterSpacing: '0.15em',
                                    fontWeight: 700,
                                    color: '#050505',
                                    padding: '6px 12px',
                                    border: '1px solid rgba(5,5,5,0.3)',
                                    transition: 'all 0.2s',
                                    textTransform: 'uppercase',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#050505'; e.currentTarget.style.color = '#C7D94D' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#050505' }}
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Link columns */}
                {links.map(col => (
                    <div key={col.label}>
                        <div style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            marginBottom: 20,
                            textTransform: 'uppercase',
                        }}>
                            {col.label}
                        </div>
                        <ul style={{ listStyle: 'none' }}>
                            {col.items.map(item => (
                                <li key={item} style={{ marginBottom: 10 }}>
                                    <a href="#" style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '0.82rem',
                                        color: 'rgba(5,5,5,0.7)',
                                        transition: 'color 0.2s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#050505'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(5,5,5,0.7)'}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Contact column */}
                <div>
                    <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        marginBottom: 20,
                        textTransform: 'uppercase',
                    }}>
                        Contact
                    </div>
                    <p style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.8rem',
                        lineHeight: 1.8,
                        color: 'rgba(5,5,5,0.7)',
                        marginBottom: 12,
                    }}>
                        Door No. 48, 574-A, Narayanasan Rd,<br />
                        beside Gold Souk Grandé Mall,<br />
                        Ponnurunni, Vyttila,<br />
                        Kochi, Kerala 682019
                    </p>
                    <a href="mailto:mail@greenmedia.co"
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: '#050505',
                        }}>
                        mail@greenmedia.co
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{
                borderTop: '1px solid rgba(5,5,5,0.15)',
                paddingTop: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
            }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: 'rgba(5,5,5,0.5)' }}>
                    © 2025 Green Media India. All rights reserved.
                </span>
                <span style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(5,5,5,0.4)',
                }}>
                    AV TECHNOLOGY · KERALA
                </span>
            </div>
        </footer>
    )
}
