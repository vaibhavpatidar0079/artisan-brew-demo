"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui-btn"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const throttleRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (throttleRef.current) return
      
      throttleRef.current = true
      setIsScrolled(window.scrollY > 50)
      
      setTimeout(() => {
        throttleRef.current = false
      }, 150)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#about" },
    { label: "Visit", href: "#location" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5">
        <a href="#" className="relative group">
          <span className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            VOID
          </span>
          <span className="absolute -inset-2 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
            <a href="mailto:patidarvaibhav79@gmail.com">Order Now</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground p-2 rounded-full hover:bg-secondary/50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-foreground py-3 px-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-4 bg-primary text-primary-foreground rounded-full w-full">
                <a href="mailto:patidarvaibhav79@gmail.com">Order Now</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
