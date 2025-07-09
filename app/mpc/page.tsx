// app/mpc/page.tsx
import React from 'react'
import MPCSection from '../components/MPCSection'
import { Metadata } from 'next'

export default function MPCPage() {
  return <MPCSection />
}

// Enhanced metadata for SEO
export const metadata: Metadata = {
  title: 'yAcademy MPC Research | Multi-Party Computation Security',
  description: 'Advanced research on multi-party computation protocols, privacy-preserving technologies, and cryptographic security analysis by yAcademy.',
  keywords: [
    'multi-party computation',
    'MPC protocols',
    'privacy-preserving computation',
    'cryptographic security',
    'yAcademy',
    'security research',
    'blockchain privacy',
    'cryptography'
  ].join(', '),
  authors: [{ name: 'yAcademy', url: 'https://yacademy.dev' }],
  openGraph: {
    title: 'yAcademy MPC Research',
    description: 'Advanced research on multi-party computation protocols and cryptographic security',
    url: 'https://proxies.yacademy.dev/mpc',
    siteName: 'yAcademy Research',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'yAcademy MPC Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yAcademy MPC Research',
    description: 'Advanced research on multi-party computation protocols and security',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}