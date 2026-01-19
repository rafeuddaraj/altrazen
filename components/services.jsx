const services = [
  {
    number: "01",
    title: "Web Applications",
    description: "Full-stack development with modern frameworks. From concept to deployment, we build web experiences that scale."
  },
  {
    number: "02",
    title: "Developer Tools",
    description: "APIs, SDKs, and infrastructure tools that developers love. We understand the craft because we live it."
  },
  {
    number: "03",
    title: "Digital Products",
    description: "End-to-end product development for startups and enterprises. Strategy, design, and engineering under one roof."
  },
  {
    number: "04",
    title: "Technical Consulting",
    description: "Architecture reviews, performance optimization, and strategic guidance for your most challenging problems."
  }
]

export default function Services() {
  return (
    <section className="py-32 px-6 relative border-t border-border/20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-widest text-primary/70 mb-4 block">Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            What we build.
          </h2>
        </div>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group py-8 border-b border-border/20 first:border-t first:border-border/20 hover:bg-card/20 transition-colors duration-300 -mx-6 px-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                <span className="text-xs font-mono text-primary/60 sm:w-12 shrink-0">
                  {service.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>
                <svg 
                  className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 hidden sm:block"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
