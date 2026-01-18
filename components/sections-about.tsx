"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ScrollParallax, GlowingOrb, AnimatedGradientLine } from "@/components/motion-utils"

const metrics = [
  { value: "∞", label: "Possibilities" },
  { value: "12", label: "Origin Realms" },
  { value: "42", label: "Signature Blends" },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imgRot = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const txtY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <GlowingOrb size="xlarge" color="primary" className="absolute -right-48 top-1/4 opacity-30" />
        <GlowingOrb size="large" color="accent" className="absolute -left-32 bottom-1/3 opacity-20" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div style={{ y: imgY, rotate: imgRot }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/30">
                <Image src="/cafe-interior.jpg" alt="Cafe interior" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-8 md:-right-16 rounded-2xl bg-primary p-8 shadow-2xl shadow-primary/20"
              >
                <p className="font-serif text-5xl font-bold text-primary-foreground">10+</p>
                <p className="text-sm text-primary-foreground/80 mt-1">Years transcending</p>
              </motion.div>

              <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full border border-primary/30" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-accent/20 blur-lg" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: txtY }}>
            <ScrollParallax strength={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">Our Origin</p>
                <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                  Born from <span className="text-primary">obsession</span>
                </h2>

                <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    In 2014, a dream materialized in the space between worlds. What began as a relentless pursuit of the
                    perfect cup evolved into something beyond ordinary—a sanctuary where coffee becomes an experience.
                  </p>
                  <p>
                    Our beans journey from mystical highlands where generations of families have perfected their craft.
                    We honor their legacy through precise roasting and passionate brewing, ensuring every sip transcends
                    expectation.
                  </p>
                </div>

                <div className="my-12">
                  <AnimatedGradientLine orientation="horizontal" />
                </div>

                <div className="flex gap-16">
                  {metrics.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    >
                      <p className="font-serif text-4xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollParallax>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
