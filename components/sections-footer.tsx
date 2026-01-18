"use client"

import { motion } from "framer-motion"
import { Instagram, Twitter } from "lucide-react"
import { Input } from "@/components/ui-input"
import { Button } from "@/components/ui-btn"
import { AnimatedGradientLine } from "@/components/motion-utils"

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background py-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto w-full max-w-[1400px] px-6">
        <div className="grid gap-16 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h3 className="font-serif text-3xl font-bold text-foreground">VOID</h3>
            <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
              Transcending the ordinary since 2014. Every cup is a portal to extraordinary taste.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/vaibhav0patidar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground">Navigate</h4>
            <ul className="mt-6 space-y-4">
              {["Menu", "Our Story", "Locations", "Careers"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground">Join the Dimension</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Receive transmissions about new blends and exclusive experiences.
            </p>
            <div className="mt-6 flex gap-2">
              <Input type="email" placeholder="Your email" className="border-border bg-card/50 rounded-full px-5" />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">Join</Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <AnimatedGradientLine orientation="horizontal" />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VOID Coffee. All dimensions reserved.</p>
        </div>
      </div>
    </footer>
  )
}
