'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, ChevronRight, ChevronDown, Book, Shield, Code, FileText, ExternalLink, Menu, X, List, ArrowLeft } from 'lucide-react';
import { Navbar, MobileNavbar } from './Navbar';
import UnifiedSidebar, { SidebarItem } from './UnifiedSidebar';
import dynamic from 'next/dynamic';
import { ContentData, SearchIndexItem } from '@/lib/content';
import '../markdown.css';

interface SearchResult extends SearchIndexItem {
  highlightedContent: string;
}

interface ProxiesSiteProps {
  initialContent?: ContentData[];
  initialSearchIndex?: SearchIndexItem[];
  onNavigateBack?: () => void;
}

// Separate client-only components to prevent hydration issues
const ClientOnlySearch = dynamic(() => Promise.resolve(SearchComponent), {
  ssr: false,
  loading: () => <SearchSkeleton />
});

const ClientOnlyMobileMenu = dynamic(() => Promise.resolve(MobileMenuComponent), {
  ssr: false,
  loading: () => null
});

const ClientOnlySidebar = dynamic(() => Promise.resolve(UnifiedSidebar), {
  ssr: false,
  loading: () => <SidebarSkeleton />
});

// Search skeleton component
function SearchSkeleton() {
  return (
    <div className="relative max-w-lg">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <div className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-50 border-gray-300 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>
    </div>
  );
}

// Sidebar skeleton component
function SidebarSkeleton() {
  return (
    <aside className="hidden md:block sticky top-16 w-72 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="px-3 py-2 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// Extracted search component
interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  handleSearchResultClick: (result: SearchResult) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchDropdownRef: React.RefObject<HTMLDivElement | null>;
}

function SearchComponent({ 
  searchQuery, 
  setSearchQuery, 
  searchResults,
  isSearchFocused, 
  setIsSearchFocused,
  handleSearchResultClick,
  searchInputRef,
  searchDropdownRef
}: SearchComponentProps) {
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, [setIsSearchFocused]);

  return (
    <div className="relative max-w-lg">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search documentation... (Press / to focus)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={handleSearchFocus}
        className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
      />
      
      {isSearchFocused && (searchQuery || searchResults.length > 0) && (
        <div 
          ref={searchDropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border-gray-200 border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
          role="listbox"
          aria-label="Search results"
        >
          {searchResults.length > 0 ? (
            searchResults.map((result, idx) => (
              <button
                key={`${result.id}-${idx}`}
                onClick={() => handleSearchResultClick(result)}
                className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors"
                role="option"
                aria-selected={false}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-green-600">
                    {result.pageTitle || result.title}
                  </span>
                  {result.type === 'section' && (
                    <>
                      <ChevronRight size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {result.title}
                      </span>
                    </>
                  )}
                </div>
                <p 
                  className="text-sm text-gray-600 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: result.highlightedContent }}
                />
              </button>
            ))
          ) : searchQuery ? (
            <div className="p-4 text-center text-gray-500">
              No results found for &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// Extracted mobile menu component for navbar
interface MobileMenuComponentProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

function MobileMenuComponent({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: MobileMenuComponentProps) {
  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0" onClick={() => setIsMobileMenuOpen(false)} />
      <div className="fixed top-0 left-0 w-full h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <MobileNavbar 
          setMenuOpen={setIsMobileMenuOpen}
        />
      </div>
    </div>
  );
}


// Main component
const ProxiesSite: React.FC<ProxiesSiteProps> = ({ 
  initialContent = [], 
  initialSearchIndex = [],
  onNavigateBack
}) => {
  // State management
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => 
    initialContent.length > 0 ? initialContent[0].slug : 'home'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'proxies-deep-dive': true,
    'security-guide': true
  });
  
  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  
  // Client-side hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Memoized search index
  const searchIndex = useMemo(() => {
    if (initialSearchIndex.length > 0) {
      return initialSearchIndex;
    }
    if (initialContent.length > 0) {
      const index: SearchIndexItem[] = [];
      initialContent.forEach(page => {
        index.push({
          id: page.slug,
          type: 'page',
          title: page.title,
          path: `/${page.slug}`,
          category: page.category || 'general',
          content: page.contentHtml ? page.contentHtml.replace(/<[^>]*>/g, '') : '',
          searchText: `${page.title} ${page.contentHtml ? page.contentHtml.replace(/<[^>]*>/g, '') : ''}`.toLowerCase()
        });
      });
      return index;
    }
    return [];
  }, [initialSearchIndex, initialContent]);
  
  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = searchIndex
      .filter(item => item.searchText.includes(query))
      .slice(0, 10)
      .map(item => ({
        ...item,
        highlightedContent: highlightSearchTerm(item.content, searchQuery)
      }));
    
    setSearchResults(results);
  }, [searchQuery, searchIndex]);
  
  // Click outside handler for search dropdown
  useEffect(() => {
    if (!isClient) return;
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
        setSearchQuery('');
      }
    };

    if (isSearchFocused) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSearchFocused, isClient]);
  
  // Keyboard shortcuts
  useEffect(() => {
    if (!isClient) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setSearchQuery('');
        setIsMobileMenuOpen(false);
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isClient]);
  
  // Utility functions
  const highlightSearchTerm = useCallback((text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }, []);
  
  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  }, []);
  
  const handleSearchResultClick = useCallback((result: SearchResult) => {
    const pageSlug = result.id.split('-section-')[0];
    setCurrentPage(pageSlug);
    setSearchQuery('');
    setIsSearchFocused(false);
  }, []);
  
  // Memoized sidebar items
  const sidebarItems = useMemo((): SidebarItem[] => [
    { id: 'home', title: 'yAcademy Proxies Research', icon: Book },
    { id: 'proxy-basics', title: 'Proxy Basics', icon: Code },
    { 
      id: 'proxies-deep-dive', 
      title: 'Proxies Deep Dive', 
      icon: FileText,
      children: [
        { id: 'proxies-storage', title: 'Proxies Storage' },
        { id: 'proxies-table', title: 'Proxies Table' },
        { id: 'delegatecall-history', title: 'History of Callcode and Delegatecall' }
      ]
    },
    { 
      id: 'security-guide', 
      title: 'Security Guide to Proxy Vulns', 
      icon: Shield,
      children: [
        { id: 'proxy-identification', title: 'Proxy Identification Guide' }
      ]
    }
  ], []);
  
  // Get current page data
  const getCurrentPageData = useCallback(() => {
    if (initialContent.length > 0) {
      const page = initialContent.find(page => page.slug === currentPage);
      if (page) return page;
    }
    
    // Handle special parent pages
    if (currentPage === 'proxies-deep-dive') {
      const proxiesListPage = initialContent.find(page => page.slug === 'proxies-list');
      if (proxiesListPage) {
        return {
          ...proxiesListPage,
          slug: 'proxies-deep-dive',
          title: 'Proxies Deep Dive'
        };
      }
    }
    
    if (currentPage === 'security-guide') {
      const securityGuidePage = initialContent.find(page => page.slug === 'security-guide');
      if (securityGuidePage) {
        return securityGuidePage;
      }
      
      return {
        slug: 'security-guide',
        title: 'Security Guide to Proxy Vulns',
        category: 'security',
        contentHtml: `
          <p>Note: If you are unsure which proxy type is in the scope of your audit or security review, see the <a href="/proxy-identification">proxy identification guide</a>.</p>
          
          <div class="jekyll-toc">
            <h2>Table of contents</h2>
            <ol class="toc-list">
              <li class="toc-item"><a href="#uninitialized-proxy-vulnerability" class="toc-link">Uninitialized Proxy Vulnerability</a></li>
              <li class="toc-item"><a href="#storage-collision-vulnerability" class="toc-link">Storage Collision Vulnerability</a></li>
              <li class="toc-item"><a href="#function-clashing-vulnerability" class="toc-link">Function Clashing Vulnerability</a></li>
              <li class="toc-item"><a href="#metamorphic-contract-rug-vulnerability" class="toc-link">Metamorphic Contract Rug Vulnerability</a></li>
            </ol>
          </div>
          
          <p>This section contains detailed information about various proxy security vulnerabilities that auditors should be aware of.</p>
        `,
        description: 'Comprehensive security guide covering common proxy vulnerabilities'
      };
    }
    
    return {
      slug: 'home',
      title: 'yAcademy Proxies Research',
      category: 'overview',
      contentHtml: `
        <p>In Web3, the Proxy or Proxy Delegate is a <a href="https://en.wikipedia.org/wiki/Delegation_pattern">delegation pattern</a> commonly used to introduce upgradability in smart contracts.</p>
        <p>This research effort compiles proxy knowledge with the goal of improving the correctness of proxy implementations and providing a useful resource for security reviews of proxy contracts.</p>
        <h2>Getting Started</h2>
        <p>To see the full content, please set up your markdown files in the content directory.</p>
      `,
      description: 'Comprehensive guide to smart contract proxy patterns and security'
    };
  }, [currentPage, initialContent]);
  
  const currentPageData = getCurrentPageData();
  
  // Floating TOC
  const floatingTOC = useMemo(() => {
    if (!currentPageData.contentHtml) return [];
    
    const tocRegex = /<div class="jekyll-toc">[\s\S]*?<\/div>/;
    const tocMatch = currentPageData.contentHtml.match(tocRegex);
    
    if (!tocMatch) return [];
    
    const linkRegex = /<a href="([^"]*)" class="toc-link">([^<]*)<\/a>/g;
    const links: { href: string; title: string }[] = [];
    let match;
    
    while ((match = linkRegex.exec(tocMatch[0])) !== null) {
      links.push({
        href: match[1],
        title: match[2]
      });
    }
    
    return links;
  }, [currentPageData.contentHtml]);

  // Render content
  const renderContent = useCallback(() => {
    if (currentPageData.contentHtml) {
      let processedHtml = currentPageData.contentHtml;
      processedHtml = processedHtml.replace(
        /<table/g, 
        '<div class="table-wrapper"><table'
      );
      processedHtml = processedHtml.replace(
        /<\/table>/g, 
        '</table></div>'
      );
      
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: processedHtml }}
          className="markdown-content leading-relaxed"
        />
      );
    }
    
    if (currentPageData.sections?.length > 0) {
      return (
        <div>
          {currentPageData.sections?.map((section: any, idx: number) => (
            <section key={idx} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      );
    }
    
    return (
      <p className="text-lg leading-relaxed mb-8">
        {currentPageData.description || 'Content not available.'}
      </p>
    );
  }, [currentPageData]);

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const parentPage = sidebarItems.find(item => 
      item.children?.some(child => child.id === currentPage)
    );
    if (parentPage) {
      setCurrentPage(parentPage.id);
    }
  }, [currentPage, sidebarItems]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header with imported Navbar */}
      <header className="sticky top-0 z-50 bg-white border-gray-200 border-b">
        {isClient ? (
          <Navbar 
            menuOpen={isMobileMenuOpen}
            setMenuOpen={setIsMobileMenuOpen}
          />
        ) : (
          <div className="h-16 bg-white border-b border-gray-200 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu for Navbar */}
      {isClient && (
        <ClientOnlyMobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      {/* Centered container with max-width and margin auto */}
      <div className="max-w-7xl mx-auto flex relative">
        
        {/* Sidebar */}
        {isClient ? (
          <ClientOnlySidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            sidebarItems={sidebarItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            sectionType="proxies"
          />
        ) : (
          <SidebarSkeleton />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 md:ml-0">
          {/* Search Section */}
          <div className="px-8 py-6 md:px-12 lg:px-16 border-b border-gray-200">
            <div className="max-w-4xl"> 
              <div className="flex items-center mb-4">
                {/* Back Button */}
                {onNavigateBack && (
                  <button
                    onClick={onNavigateBack}
                    className="mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    title="Back to Landing"
                    aria-label="Back to landing page"
                  >
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                )}

                {/* Mobile sidebar toggle button */}
                {isClient && (
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                    title="Toggle Sidebar"
                    aria-label="Toggle sidebar"
                  >
                    <List size={20} />
                  </button>
                )}
              </div>
              
              {/* Search Bar */}
              {isClient ? (
                <ClientOnlySearch
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchResults={searchResults}
                  isSearchFocused={isSearchFocused}
                  setIsSearchFocused={setIsSearchFocused}
                  handleSearchResultClick={handleSearchResultClick}
                  searchInputRef={searchInputRef}
                  searchDropdownRef={searchDropdownRef}
                />
              ) : (
                <SearchSkeleton />
              )}
            </div>
          </div>

          {/* Floating TOC */}
          {showTableOfContents && floatingTOC.length > 0 && (
            <div className="fixed right-8 top-24 bottom-4 w-64 bg-white border-gray-200 border rounded-lg shadow-lg z-30 overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-900">
                  Table of Contents
                </h3>
                <button
                  onClick={() => setShowTableOfContents(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close table of contents"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="space-y-1">
                {floatingTOC.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-sm text-green-600 hover:text-green-800 transition-colors"
                    onClick={() => setShowTableOfContents(false)}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          )}
          
          {/* Content */}
          <div className="px-8 py-8 md:px-12 lg:px-16">
            <div className="content-container">
              <article>
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
                  <button
                    onClick={handleBreadcrumbClick}
                    className="hover:text-green-600 transition-colors"
                  >
                    {sidebarItems.find(item => 
                      item.children?.some(child => child.id === currentPage)
                    )?.title || 'Security Guide to Proxy Vulns'}
                  </button>
                  <span>/</span>
                  <span className="text-gray-900">
                    {currentPageData.title}
                  </span>
                </nav>
                
                {/* Page Content */}
                <div className="prose prose-gray max-w-none">
                  {renderContent()}
                </div>
                
                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Research effort led by engn33r and devtooligan of yAcademy</span>
                    <a
                      href="https://github.com/YAcademy-Residents/Proxies-website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Edit on GitHub
                    </a>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProxiesSite;