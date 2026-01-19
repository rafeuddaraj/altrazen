import './globals.css'

export const metadata = {
  title: 'Altrazen | Building Modern Software',
  description: 'Altrazen is a software company focused on crafting elegant, high-performance digital solutions for the modern web.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
