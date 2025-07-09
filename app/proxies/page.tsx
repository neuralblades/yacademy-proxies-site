// app/proxies/page.tsx
import React from 'react'
import ProxiesSite from '../components/ProxiesSite'
import { ContentData, SearchIndexItem } from '@/lib/content'
import { Metadata } from 'next'

interface PageData {
  content: ContentData[];
  searchIndex: SearchIndexItem[];
}

// Cache the content data
let cachedContent: ContentData[] | null = null;
let cachedSearchIndex: SearchIndexItem[] | null = null;

// Load content data at build time
async function getPageData(): Promise<PageData> {
  // Return cached data if available
  if (cachedContent && cachedSearchIndex) {
    return {
      content: cachedContent,
      searchIndex: cachedSearchIndex
    };
  }

  try {
    // Import content functions
    const { getAllContent, buildSearchIndex } = await import('../../lib/content')
    
    const content = await getAllContent()
    
    if (content.length === 0) {
      return {
        content: [],
        searchIndex: []
      }
    }
    
    const searchIndex = await buildSearchIndex()
    
    // Cache the results
    cachedContent = content;
    cachedSearchIndex = searchIndex;
    
    return {
      content,
      searchIndex
    }
  } catch (error) {
    console.error('Error loading content:', error)
    
    // Return empty data if content loader fails
    return {
      content: [],
      searchIndex: []
    }
  }
}

export default async function ProxiesPage() {
  const { content, searchIndex } = await getPageData()
  
  return (
    <ProxiesSite 
      initialContent={content}
      initialSearchIndex={searchIndex}
      initialSlug="home"
    />
  )
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
    url: 'https://proxies.yacademy.dev/proxies',
    siteName: 'yAcademy Proxies Research',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
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