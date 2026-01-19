"use client"

import { useState } from "react"

export default function Contact() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-32 px-6 relative border-t border-border/20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section header */}
        <span className="text-xs uppercase tracking-widest text-primary/70 mb-4 block">Stay Connected</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
          Join the journey.
        </h2>
        <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto mb-12">
          Be the first to know when we launch. No spam, just meaningful updates about our progress.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 text-sm bg-card/50 border border-border/50 rounded-md text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors duration-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 text-sm font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Thanks for subscribing!</span>
          </div>
        )}

        {/* Trust indicators */}
        <p className="mt-8 text-xs text-muted-foreground/40">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
