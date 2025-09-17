import { useState, useEffect } from 'react';
import { trpc } from '@/utils/trpc';
import { HomePage } from '@/components/HomePage';
import { AboutPage } from '@/components/AboutPage';
import { ServicesPage } from '@/components/ServicesPage';
import { SubsidiariesPage } from '@/components/SubsidiariesPage';
import { ContactPage } from '@/components/ContactPage';
import { BlogPage } from '@/components/BlogPage';
import { BlogPostDetail } from '@/components/BlogPostDetail';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './App.css';

type Page = 'home' | 'about' | 'services' | 'subsidiaries' | 'contact' | 'blog';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [blogPostSlug, setBlogPostSlug] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize sample data on first load
  useEffect(() => {
    const initializeData = async () => {
      try {
        await trpc.seedSampleData.mutate();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setIsInitialized(true); // Continue anyway
      }
    };

    initializeData();
  }, []);

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    setBlogPostSlug(null);
    window.scrollTo(0, 0);
  };

  const navigateToBlogPost = (slug: string) => {
    setBlogPostSlug(slug);
    setCurrentPage('blog');
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    if (currentPage === 'blog' && blogPostSlug) {
      return <BlogPostDetail slug={blogPostSlug} onBackToBlog={() => setBlogPostSlug(null)} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateToPage} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'subsidiaries':
        return <SubsidiariesPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage onBlogPostClick={navigateToBlogPost} />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cornflower-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing GMW Tech Group...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={navigateToPage} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;