"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ScrollParallax({
  children,
  strength = 1,
  className = "",
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * strength, -100 * strength])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

export function GlowingOrb({
  size = "medium",
  color = "primary",
  className = "",
}: {
  size?: "small" | "medium" | "large" | "xlarge"
  color?: "primary" | "accent" | "muted"
  className?: string
}) {
  const sizeClasses = {
    small: "h-32 w-32",
    medium: "h-48 w-48",
    large: "h-72 w-72",
    xlarge: "h-96 w-96",
  }

  const colorClasses = {
    primary: "bg-primary/20",
    accent: "bg-accent/20",
    muted: "bg-muted/30",
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full blur-3xl glow-pulse ${className}`} 
    />
  )
}

export function AnimatedGradientLine({
  orientation = "horizontal",
  className = "",
}: {
  orientation?: "horizontal" | "vertical"
  className?: string
}) {
  const isHorizontal = orientation === "horizontal"
  
  return (
    <motion.div
      initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: !isHorizontal ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`${isHorizontal ? "h-px w-full" : "h-full w-px"} bg-gradient-to-r from-transparent via-primary/50 to-transparent ${className}`}
    />
  )
}
