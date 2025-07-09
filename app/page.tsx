// app/page.tsx
import React from 'react'
import LandingPage from './components/LandingPage'
import { Metadata } from 'next'

export default function Home() {
  return <LandingPage />
}

// Enhanced metadata for SEO
export const metadata: Metadata = {
  title: 'yAcademy Proxies Research | Smart Contract Proxy Patterns & Security',
  description: 'Comprehensive guide to smart contract proxy patterns, security vulnerabilities, and best practices for Web3 developers and auditors. Research by yAcademy.',
  keywords: [
    'smart contracts',
    'proxy patterns', 
    'Web3 security',
    'Ethereum',
    'blockchain',
    'yAcademy',
    'delegatecall',
    'upgradeable contracts',
    'proxy vulnerabilities',
    'smart contract auditing'
  ].join(', '),
  authors: [{ name: 'yAcademy', url: 'https://yacademy.dev' }],
  openGraph: {
    title: 'yAcademy Proxies Research',
    description: 'Comprehensive guide to smart contract proxy patterns and security vulnerabilities',
    url: 'https://proxies.yacademy.dev',
    siteName: 'yAcademy Proxies Research',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png', // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'yAcademy Proxies Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yAcademy Proxies Research',
    description: 'Comprehensive guide to smart contract proxy patterns and security',
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