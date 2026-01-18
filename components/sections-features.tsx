"use client"

import type React from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import { ScrollParallax, GlowingOrb } from "@/components/motion-utils"
import { FEATURES } from "@/lib/data"

function FeatureCard({ feature, idx }: { feature: (typeof FEATURES)[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rx = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 })
  const ry = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set(e.clientX - cx)
    y.set(e.clientY - cy)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm p-8 border border-border/50 transition-all duration-500 hover:border-primary/30 hover:bg-card/80">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "scale(1.5)" }} />
          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
            <feature.icon size={28} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="mb-4 font-serif text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
        />
      </div>
    </motion.div>
  )
}

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-40">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <GlowingOrb size="xlarge" color="primary" className="absolute -right-48 top-20" />
        <GlowingOrb size="large" color="accent" className="absolute -left-24 bottom-40" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <ScrollParallax strength={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">The Experience</p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Crafted for the <span className="text-primary">senses</span>
            </h2>
          </motion.div>
        </ScrollParallax>

        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
