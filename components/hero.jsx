"use client"

import { useState } from "react"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Now in Development</span>
        </div>

        {/* Company name */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-6">
          Altrazen
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground text-xl sm:text-2xl md:text-3xl font-light max-w-2xl mx-auto mb-4 leading-relaxed text-balance">
          Building modern software for the next generation.
        </p>

        {/* Subtle description */}
        <p className="text-muted-foreground/60 text-base sm:text-lg font-light max-w-xl mx-auto mb-12">
          We craft elegant, high-performance digital solutions that push the boundaries of what's possible.
        </p>

        {/* CTA Button */}
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 ease-out border border-border hover:border-primary/50 rounded-md bg-transparent text-foreground hover:text-primary"
        >
          <span className="relative z-10">Get Updates</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          
          {/* Glow effect on hover */}
          <div className={`absolute inset-0 rounded-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-md bg-primary/5" />
          </div>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/20 to-transparent" />
      </div>
    </section>
  )
}
