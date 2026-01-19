const stats = [
  { value: "2023", label: "Founded" },
  { value: "100%", label: "Remote" },
  { value: "∞", label: "Ambition" }
]

export default function About() {
  return (
    <section className="py-32 px-6 relative border-t border-border/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="text-xs uppercase tracking-widest text-primary/70 mb-4 block">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-8">
              We are builders.
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground text-base font-light leading-relaxed">
                Altrazen was founded with a singular vision: to create software that matters.
                We are a collective of engineers, designers, and dreamers who refuse to settle for ordinary.
              </p>
              <p className="text-muted-foreground/70 text-base font-light leading-relaxed">
                In a world of noise, we choose clarity. In a world of bloat, we choose precision.
                Every product we build reflects our commitment to excellence and our belief that
                technology should empower, not overwhelm.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-border/20 bg-card/20"
              >
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
