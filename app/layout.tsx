import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import {Toaster} from 'react-hot-toast'
import { SiteFooter } from "@/components/site-footer"
import { CopyrightFooter } from "@/components/copyright-footer"
import { SiteHeader } from "@/components/site-header"
import { AppDownloadCTA } from "@/components/app-download-cta"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Wiqi',
  description: 'Earn money while shopping online',
  generator: '',
  icons: {
    icon: [
      {
        url: '/shopping-bag.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/shopping-bag.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/shopping-bag.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/shopping-bag.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
              {/* <AnnouncementBar /> */}
              <SiteHeader />
              {children}
              <AppDownloadCTA />
              <SiteFooter />
              <CopyrightFooter />
            </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
