import { useEffect, useRef } from 'react'
import isMobileDevice from '../hooks/useMobile'

const PARTICLE_COLOR_BASE = [199, 217, 77]
// Reduce count on low-power devices
const PARTICLE_COUNT = window.matchMedia('(max-width: 768px)').matches ? 1200 : 2500

export default function ParticleCanvas({ triggerRef }) {
    const canvasRef = useRef(null)
    // Mobile: skip the entire particle animation — saves 1200+ objects + 60fps rAF loop
    const mobile = isMobileDevice()

    useEffect(() => {
        if (mobile) return  // nothing to set up

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: true })

        let W = canvas.offsetWidth
        let H = canvas.offsetHeight
        canvas.width  = W
        canvas.height = H

        let animId   = null
        let running  = false   // controlled by IntersectionObserver

        // ── Particle ──────────────────────────────────────────────
        class Particle {
            constructor() { this.reset() }

            reset() {
                this.x  = Math.random() * W
                this.y  = Math.random() * H
                this.tx = this.x
                this.ty = this.y
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size      = Math.random() * 1.5 + 0.3
                this.baseAlpha = Math.random() * 0.5 + 0.1
                this.alpha     = this.baseAlpha
                this.ease      = 0.05 + Math.random() * 0.05

                const j = Math.floor(Math.random() * 28 - 14)
                const r = Math.min(255, PARTICLE_COLOR_BASE[0] + j)
                const g = Math.min(255, PARTICLE_COLOR_BASE[1] + j)
                const b = Math.min(255, PARTICLE_COLOR_BASE[2] + j)
                // Pre-cache the constant part of the rgba string
                this._styleBase = `rgba(${r},${g},${b},`
            }

            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < -4) this.x = W + 4
                if (this.x > W + 4) this.x = -4
                if (this.y < -4) this.y = H + 4
                if (this.y > H + 4) this.y = -4
                this.alpha += (this.baseAlpha - this.alpha) * 0.04
            }

            draw() {
                // Reuse pre-cached prefix — avoids building 4-part template literal each frame
                ctx.fillStyle = this._styleBase + this.alpha.toFixed(2) + ')'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, 6.2832) // 6.2832 = Math.PI*2 pre-computed
                ctx.fill()
            }
        }

        // ── Init particles ────────────────────────────────────────
        const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())

        // ── Render loop ───────────────────────────────────────────
        function render() {
            if (!running) return
            ctx.clearRect(0, 0, W, H)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()
            }
            animId = requestAnimationFrame(render)
        }

        // ── IntersectionObserver — pause when off-screen ──────────
        // Stops burning GPU/CPU for 2500 particles at 60fps when user isn't on this section
        const observer = new IntersectionObserver(
            ([entry]) => {
                running = entry.isIntersecting
                if (running && !animId) render()
                else if (!running && animId) {
                    cancelAnimationFrame(animId)
                    animId = null
                }
            },
            { threshold: 0.05 }
        )
        observer.observe(canvas)

        // ── Resize — debounced via rAF ────────────────────────────
        let resizeRaf = null
        function onResize() {
            if (resizeRaf) cancelAnimationFrame(resizeRaf)
            resizeRaf = requestAnimationFrame(() => {
                W = canvas.offsetWidth
                H = canvas.offsetHeight
                canvas.width  = W
                canvas.height = H
                particles.forEach(p => p.reset())
            })
        }
        window.addEventListener('resize', onResize, { passive: true })

        return () => {
            if (animId) cancelAnimationFrame(animId)
            if (resizeRaf) cancelAnimationFrame(resizeRaf)
            observer.disconnect()
            window.removeEventListener('resize', onResize)
        }
    }, [triggerRef])

    if (mobile) return null

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                zIndex: 0, pointerEvents: 'none',
            }}
        />
    )
}
