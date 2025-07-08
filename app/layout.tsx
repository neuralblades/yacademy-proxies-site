import './globals.css'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'yAcademy Proxies Research',
  description: 'Comprehensive guide to smart contract proxy patterns and security',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}