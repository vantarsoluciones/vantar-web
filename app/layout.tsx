import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit-var',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VantAr — Tecnología en CX y Marketing para Abogados',
  description:
    'VantAr atiende a tus potenciales clientes al instante, los entrevista, y te entrega todo listo para que vos cierres el caso. Marketing y automatización para estudios jurídicos.',
  openGraph: {
    title: 'VantAr — Tecnología en CX y Marketing para Abogados',
    description:
      'El cliente que no respondiste ya llamó al siguiente. VantAr responde por vos.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
