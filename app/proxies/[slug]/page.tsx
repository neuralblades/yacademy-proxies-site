// app/proxies/[slug]/page.tsx
import React from 'react';
import ProxiesSite from '../../components/ProxiesSite';
import { ContentData, SearchIndexItem } from '@/lib/content';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

// Cache the content data
let cachedContent: ContentData[] | null = null;
let cachedSearchIndex: SearchIndexItem[] | null = null;

async function getPageData(): Promise<{ content: ContentData[]; searchIndex: SearchIndexItem[] }> {
  // Return cached data if available
  if (cachedContent && cachedSearchIndex) {
    return {
      content: cachedContent,
      searchIndex: cachedSearchIndex
    };
  }

  try {
    const { getAllContent, buildSearchIndex } = await import('../../../lib/content');
    
    const content = await getAllContent();
    
    if (content.length === 0) {
      return { content: [], searchIndex: [] };
    }
    
    const searchIndex = await buildSearchIndex();
    
    // Cache the results
    cachedContent = content;
    cachedSearchIndex = searchIndex;
    
    return { content, searchIndex };
  } catch (error) {
    console.error('Error loading content:', error);
    return { content: [], searchIndex: [] };
  }
}

export default async function ProxiesSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const { content, searchIndex } = await getPageData();
  
  // Check if the slug exists in our content
  const pageExists = content.some(page => page.slug === slug);
  
  if (!pageExists) {
    notFound();
  }
  
  return (
    <ProxiesSite 
      initialContent={content}
      initialSearchIndex={searchIndex}
      initialSlug={slug}
    />
  );
}

export async function generateStaticParams() {
  try {
    const { getAllContent } = await import('../../../lib/content');
    const content = await getAllContent();
    
    return content.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { getAllContent } = await import('../../../lib/content');
    const content = await getAllContent();
    const page = content.find(p => p.slug === slug);
    
    if (!page) {
      return {
        title: 'Page Not Found | yAcademy Proxies Research',
      };
    }
    
    return {
      title: `${page.title} | yAcademy Proxies Research`,
      description: page.description || `Learn about ${page.title} in yAcademy's comprehensive proxy research.`,
    };
  } catch (error) {
    return {
      title: 'yAcademy Proxies Research',
    };
  }
}