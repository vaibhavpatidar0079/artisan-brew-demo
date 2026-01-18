"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui-btn"
import Image from "next/image"
import { GlowingOrb } from "@/components/motion-utils"

const contact = [
  {
    icon: MapPin,
    title: "Coordinates",
    lines: ["123 Dimension Street", "Coffee District, SF 94102"],
  },
  {
    icon: Clock,
    title: "Portal Hours",
    lines: ["Mon - Fri: 7am - 9pm", "Sat - Sun: 8am - 8pm"],
  },
  {
    icon: Phone,
    title: "Transmit",
    lines: ["+91 9672707103", "patidarvaibhav79@gmail.com"],
  },
]

export function LocationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imgX = useTransform(scrollYProgress, [0, 1], [100, -50])

  return (
    <section id="location" ref={ref} className="relative overflow-hidden bg-secondary/30 py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <GlowingOrb size="xlarge" color="primary" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">Enter the Portal</p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Find your <span className="text-primary">dimension</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Cross the threshold into our realm. The aroma of transcendence awaits—your journey to extraordinary coffee
              begins here.
            </p>

            <div className="mt-12 space-y-8">
              {contact.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border/50 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                    <info.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{info.title}</p>
                    {info.lines.map((line) => (
                      <p key={line} className="text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="mt-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 group"
              >
                <a href="mailto:patidarvaibhav79@gmail.com">
                  Open Portal
                  <ArrowUpRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div style={{ x: imgX }} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/30">
                <Image src="/cafe-storefront-night.jpg" alt="Cafe exterior" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
              </div>

              <div className="absolute -inset-4 rounded-3xl border border-primary/20 -z-10" />
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
