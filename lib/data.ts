import { Coffee, Sparkles, Flame, LucideIcon } from "lucide-react"

// Menu item interface
export interface MenuItem {
  name: string
  description: string
  price: string
  image: string
}

// Feature interface
export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

// Menu items data
export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Nebula Espresso",
    description: "Dark matter intensity with stardust finish",
    price: "$4.50",
    image: "/espresso-signature.jpg",
  },
  {
    name: "Aurora Latte",
    description: "Oat silk dreams with vanilla constellation",
    price: "$5.50",
    image: "/latte-vanilla.jpg",
  },
  {
    name: "Void Cold Brew",
    description: "24-hour immersion into caffeinated depths",
    price: "$6.00",
    image: "/cold-brew.jpg",
  },
  {
    name: "Ethereal Matcha",
    description: "Ceremonial grade transcendence",
    price: "$6.50",
    image: "/matcha-ceremonial.jpg",
  },
]

// Features data
export const FEATURES: Feature[] = [
  {
    icon: Coffee,
    title: "Single Origin",
    description: "Rare beans sourced from hidden valleys and misty peaks where coffee achieves transcendence.",
  },
  {
    icon: Sparkles,
    title: "Alchemist Roasted",
    description: "Each batch transformed through an ancient craft, unlocking flavors beyond imagination.",
  },
  {
    icon: Flame,
    title: "Soul Crafted",
    description: "Baristas who channel passion into every pour, creating moments of pure bliss.",
  },
]
