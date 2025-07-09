// app/mpc/[slug]/page.tsx
import React from 'react';
import MPCSection from '../../components/MPCSection';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

// For now, we'll have a simple list of valid MPC slugs
// This can be expanded when actual MPC content is added
const validMPCSlugs = [
  'protocol-basics',
  'security-analysis',
  'vulnerability-guide',
  'implementation-guide'
];

export default async function MPCSlugPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Check if the slug is valid
  if (!validMPCSlugs.includes(slug)) {
    notFound();
  }
  
  return (
    <MPCSection 
      initialSlug={slug}
    />
  );
}

export async function generateStaticParams() {
  return validMPCSlugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Map slugs to titles
  const slugTitles: Record<string, string> = {
    'protocol-basics': 'Protocol Basics',
    'security-analysis': 'Security Analysis',
    'vulnerability-guide': 'Vulnerability Guide',
    'implementation-guide': 'Implementation Guide'
  };
  
  const title = slugTitles[slug] || 'MPC Research';
  
  return {
    title: `${title} | yAcademy MPC Research`,
    description: `Learn about ${title} in yAcademy's comprehensive MPC research.`,
  };
}