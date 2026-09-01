import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: 'Atharv Singh Solanki — Software Engineer',
  description: 'Portfolio of Atharv Singh Solanki, a software engineer building thoughtful digital experiences.',
  generator: 'v0.app',
}

export const viewport = { colorScheme: 'dark', themeColor: '#07111f', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
