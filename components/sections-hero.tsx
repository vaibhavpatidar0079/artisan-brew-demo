"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui-btn"
import { HeroCanvasContainer } from "./hero-3d"
import { ChevronDown, Sparkles } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const [dots, setPoints] = useState<{ x: number; y: number; id: number }[]>([])
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      // Throttle mouse tracking to ~16ms (60fps) to reduce state updates
      if (now - lastUpdateRef.current < 16) return
      lastUpdateRef.current = now

      setPoints((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: now }]
        return newTrail.slice(-8)
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => prev.slice(-6))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      {dots.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none fixed z-50 h-3 w-3 rounded-full bg-primary"
          style={{ left: point.x - 6, top: point.y - 6 }}
        />
      ))}

      <div className="absolute inset-0">
        <HeroCanvasContainer />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-center px-6 lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-primary"
          >
            <Sparkles className="h-4 w-4" />
            Click anywhere to interact
          </motion.p>

          <h1 className="font-serif text-5xl font-bold leading-[1.1] text-foreground md:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block"
            >
              Beyond
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="shimmer-text block"
            >
              Ordinary
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="block text-primary"
            >
              Coffee
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            A transcendent experience where artisanal craft meets the extraordinary. Move your cursor to explore. Click
            to create ripples in space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full bg-primary px-8 py-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
              >
                Begin Journey
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-transparent px-8 py-6 text-base font-medium text-foreground backdrop-blur-sm hover:bg-secondary/50"
              >
                <a href="#menu">Explore Menu</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Scroll to explore</span>
          <div className="h-12 w-px bg-gradient-to-b from-primary/50 to-transparent" />
          <ChevronDown size={20} className="glow-pulse text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
