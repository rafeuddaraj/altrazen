"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/20' : ''}`}>
      <nav className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-foreground">
            Altrazen
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          <a 
            href="#features"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Features
          </a>
          <a 
            href="#about"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            About
          </a>
          <a 
            href="#services"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Services
          </a>
        </div>

        {/* Contact link */}
        <a 
          href="#contact"
          className="px-5 py-2.5 text-xs uppercase tracking-widest text-foreground border border-border/50 rounded-md hover:border-primary/50 hover:text-primary transition-all duration-300"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
