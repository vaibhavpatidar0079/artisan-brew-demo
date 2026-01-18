"use client"

import type React from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui-btn"
import Image from "next/image"
import { ArrowRight, Plus } from "lucide-react"
import { GlowingOrb } from "@/components/motion-utils"
import { MENU_ITEMS } from "@/lib/data"

function CoffeeItem({ item, idx }: { item: (typeof MENU_ITEMS)[0]; idx: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-150, 150], [8, -8]), { stiffness: 400, damping: 40 })
  const ry = useSpring(useTransform(x, [-150, 150], [-8, 8]), { stiffness: 400, damping: 40 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - (rect.left + rect.width / 2))
    y.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card/30 backdrop-blur-sm border border-border/30 transition-all duration-700 hover:border-primary/40 hover:bg-card/60">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                {item.price}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30"
              >
                <Plus size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6">
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {item.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function MenuGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="menu" ref={ref} className="relative overflow-hidden py-32 md:py-40">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <GlowingOrb size="xlarge" color="accent" className="absolute left-1/4 top-20 opacity-50" />
        <GlowingOrb size="large" color="primary" className="absolute right-1/4 bottom-40 opacity-40" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">The Collection</p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Liquid <span className="text-primary">dimensions</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MENU_ITEMS.map((item, i) => (
            <CoffeeItem key={item.name} item={item} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
