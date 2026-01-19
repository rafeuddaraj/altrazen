const features = [
  {
    title: "Performance First",
    description: "Built from the ground up with speed and efficiency at the core. Every millisecond matters.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Modern Stack",
    description: "Leveraging cutting-edge technologies to deliver solutions that scale with your ambitions.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: "Thoughtful Design",
    description: "Every pixel, every interaction is crafted with intention. Beautiful interfaces that feel intuitive.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  }
]

export default function Features() {
  return (
    <section className="py-32 px-6 relative">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-xs uppercase tracking-widest text-primary/70 mb-4 block">What We Do</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
          Engineering Excellence
        </h2>
        <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
          We believe great software is invisible. It simply works, beautifully.
        </p>
      </div>

      {/* Features grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group p-8 rounded-lg border border-border/30 hover:border-border/60 transition-all duration-500 bg-card/30"
          >
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/15 transition-colors duration-300">
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium text-foreground mb-3">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
