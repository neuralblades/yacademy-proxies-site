// app/proxies/security-guide/page.tsx
import React from 'react';
import ProxiesSite from '../../components/ProxiesSite';
import { getAllContent, buildSearchIndex } from '@/lib/content';
import { Metadata } from 'next';

export default async function SecurityGuidePage() {
  const content = await getAllContent();
  const searchIndex = await buildSearchIndex();
  
  return (
    <ProxiesSite 
      initialContent={content}
      initialSearchIndex={searchIndex}
      initialSlug="security-guide"
    />
  );
}

export const metadata: Metadata = {
  title: 'Security Guide to Proxy Vulns | yAcademy Proxies Research',
  description: 'Comprehensive security guide covering common proxy vulnerabilities and attack vectors.',
};