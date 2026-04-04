import { useEffect, useRef } from 'react'

const PARTICLE_COLOR_BASE = [199, 217, 77]
const TEXT       = 'GREEN MEDIA'
const ANGLE_DEG  = -22
// Reduce count on low-power devices
const PARTICLE_COUNT = window.matchMedia('(max-width: 768px)').matches ? 1200 : 2500

export default function ParticleCanvas({ triggerRef }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: true })

        let W = canvas.offsetWidth
        let H = canvas.offsetHeight
        canvas.width  = W
        canvas.height = H

        let hovered  = false
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
                if (hovered) {
                    this.x += (this.tx - this.x) * this.ease
                    this.y += (this.ty - this.y) * this.ease
                    this.alpha += (0.9 - this.alpha) * 0.1
                } else {
                    this.x += this.vx
                    this.y += this.vy
                    if (this.x < -4) this.x = W + 4
                    if (this.x > W + 4) this.x = -4
                    if (this.y < -4) this.y = H + 4
                    if (this.y > H + 4) this.y = -4
                    this.alpha += (this.baseAlpha - this.alpha) * 0.04
                }
            }

            draw() {
                // Reuse pre-cached prefix — avoids building 4-part template literal each frame
                ctx.fillStyle = this._styleBase + this.alpha.toFixed(2) + ')'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, 6.2832) // 6.2832 = Math.PI*2 pre-computed
                ctx.fill()
            }
        }

        // ── Diagonal text pixel sampler ───────────────────────────
        function getTextPixels(width, height) {
            const off  = document.createElement('canvas')
            off.width  = width
            off.height = height
            const oc   = off.getContext('2d')
            oc.clearRect(0, 0, width, height)

            const diagonal = Math.sqrt(width * width + height * height)
            const angleRad = (ANGLE_DEG * Math.PI) / 180

            // Binary search for font size that spans ~88% of diagonal
            let lo = 10, hi = 600, fontSize = 100
            oc.textAlign    = 'center'
            oc.textBaseline = 'middle'
            for (let i = 0; i < 18; i++) {
                fontSize = (lo + hi) / 2
                oc.font = `900 ${fontSize}px Orbitron, sans-serif`
                if (oc.measureText(TEXT).width < diagonal * 0.88) lo = fontSize
                else hi = fontSize
            }

            oc.save()
            oc.translate(width / 2, height / 2)
            oc.rotate(angleRad)
            oc.fillStyle = '#fff'
            oc.fillText(TEXT, 0, 0)
            oc.restore()

            const data   = oc.getImageData(0, 0, width, height).data
            const pixels = []
            const gap    = 6 // sample every 6px — good density, less work
            for (let y = 0; y < height; y += gap) {
                for (let x = 0; x < width; x += gap) {
                    if (data[(y * width + x) * 4 + 3] > 120) pixels.push({ x, y })
                }
            }
            return pixels
        }

        // ── Init particles ────────────────────────────────────────
        const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
        let textPixels  = []

        function assignTargets() {
            textPixels = getTextPixels(W, H)
            const shuffled = textPixels.slice().sort(() => Math.random() - 0.5)
            const len = shuffled.length
            particles.forEach((p, i) => {
                const tp = shuffled[i % len]
                p.tx = tp.x
                p.ty = tp.y
            })
        }

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

        // ── Hover trigger ─────────────────────────────────────────
        const trigger = (triggerRef?.current) ? triggerRef.current : canvas.parentElement

        trigger.addEventListener('mouseenter', () => {
            hovered = true
            assignTargets()
        })
        trigger.addEventListener('mouseleave', () => {
            hovered = false
            particles.forEach(p => {
                p.vx = (Math.random() - 0.5) * 1.2
                p.vy = (Math.random() - 0.5) * 1.2
                p.baseAlpha = Math.random() * 0.5 + 0.1
            })
        })

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
                if (hovered) assignTargets()
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
