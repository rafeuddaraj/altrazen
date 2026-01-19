export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-foreground">
                Altrazen
              </span>
            </div>
            <p className="text-xs text-muted-foreground/50">
              Building modern software.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a 
              href="#" 
              className="text-xs uppercase tracking-widest text-muted-foreground/50 hover:text-foreground transition-colors duration-300"
            >
              Twitter
            </a>
            <a 
              href="#" 
              className="text-xs uppercase tracking-widest text-muted-foreground/50 hover:text-foreground transition-colors duration-300"
            >
              GitHub
            </a>
            <a 
              href="#" 
              className="text-xs uppercase tracking-widest text-muted-foreground/50 hover:text-foreground transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} Altrazen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
