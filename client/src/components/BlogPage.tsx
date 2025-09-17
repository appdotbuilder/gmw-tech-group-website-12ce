import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/utils/trpc';
import type { BlogPost } from '../../../server/src/schema';

interface BlogPageProps {
  onBlogPostClick: (slug: string) => void;
}

export function BlogPage({ onBlogPostClick }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    try {
      const result = await trpc.getBlogPosts.query({ published: true });
      setPosts(result);
      setFilteredPosts(result);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Filter posts based on search term and category
  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  // Extract unique categories from posts
  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  // Sample posts for better UX when no posts are loaded
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: 'AI-Powered ERP Solutions Transforming African Businesses',
      slug: 'ai-powered-erp-solutions-transforming-african-businesses',
      excerpt: 'Discover how artificial intelligence is revolutionizing enterprise resource planning systems across Africa, driving efficiency and growth.',
      content: 'Full article content...',
      author: 'Gerald Wanjiku',
      category: 'AI/ML',
      tags: '["AI", "ERP", "Business Transformation"]',
      featured_image: null,
      published: true,
      published_at: new Date('2024-01-15'),
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Blockchain Revolution: Tokenizing Supply Chains in Kenya',
      slug: 'blockchain-revolution-tokenizing-supply-chains-kenya',
      excerpt: 'How blockchain technology is creating transparent, traceable supply chains that eliminate fraud and improve trust.',
      content: 'Full article content...',
      author: 'Mark Waweru',
      category: 'Blockchain',
      tags: '["Blockchain", "Supply Chain", "Tokenization"]',
      featured_image: null,
      published: true,
      published_at: new Date('2024-01-10'),
      created_at: new Date('2024-01-10'),
      updated_at: new Date('2024-01-10')
    },
    {
      id: 3,
      title: 'IoT Predictive Maintenance: Reducing Downtime by 40%',
      slug: 'iot-predictive-maintenance-reducing-downtime',
      excerpt: 'Learn how IoT sensors and machine learning algorithms are preventing equipment failures and saving millions in maintenance costs.',
      content: 'Full article content...',
      author: 'Wilson Gathogo',
      category: 'IoT',
      tags: '["IoT", "Predictive Maintenance", "Industry 4.0"]',
      featured_image: null,
      published: true,
      published_at: new Date('2024-01-05'),
      created_at: new Date('2024-01-05'),
      updated_at: new Date('2024-01-05')
    },
    {
      id: 4,
      title: 'GMW Tech Group Expands Operations Across East Africa',
      slug: 'gmw-tech-group-expands-operations-east-africa',
      excerpt: 'Announcing our expansion into Uganda, Tanzania, and Rwanda, bringing cutting-edge technology solutions to new markets.',
      content: 'Full article content...',
      author: 'GMW Tech Group',
      category: 'Company News',
      tags: '["Expansion", "East Africa", "Growth"]',
      featured_image: null,
      published: true,
      published_at: new Date('2024-01-01'),
      created_at: new Date('2024-01-01'),
      updated_at: new Date('2024-01-01')
    },
    {
      id: 5,
      title: 'Digital Transformation Trends Shaping Africa\'s Future',
      slug: 'digital-transformation-trends-shaping-africa-future',
      excerpt: 'An in-depth analysis of emerging technology trends and their potential impact on African economies and societies.',
      content: 'Full article content...',
      author: 'Gerald Wanjiku',
      category: 'Industry Insights',
      tags: '["Digital Transformation", "Technology Trends", "Africa"]',
      featured_image: null,
      published: true,
      published_at: new Date('2023-12-28'),
      created_at: new Date('2023-12-28'),
      updated_at: new Date('2023-12-28')
    }
  ];

  const displayPosts = posts.length > 0 ? filteredPosts : samplePosts.filter(post => {
    if (selectedCategory !== 'all' && post.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const displayCategories = posts.length > 0 ? categories : ['all', 'AI/ML', 'Blockchain', 'IoT', 'Company News', 'Industry Insights'];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai/ml': return 'bg-purple-100 text-purple-800';
      case 'blockchain': return 'bg-orange-100 text-orange-800';
      case 'iot': return 'bg-green-100 text-green-800';
      case 'company news': return 'bg-blue-100 text-blue-800';
      case 'industry insights': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTags = (tagsString: string | null) => {
    if (!tagsString) return [];
    try {
      return JSON.parse(tagsString);
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tech <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Stay informed with the latest trends, insights, and innovations in AI, Blockchain, IoT,
              and digital transformation across Africa.
            </p>
            <Badge className="bg-cornflower-100 text-cornflower-800 border-cornflower-200 px-6 py-2">
              📚 Knowledge Hub • 🌍 Africa-Focused • 🚀 Innovation Stories
            </Badge>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {displayCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'btn-primary' : ''}
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cornflower-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back soon for new insights and updates.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured Post */}
              {displayPosts[0] && (
                <Card 
                  className="border-0 shadow-xl cursor-pointer card-hover overflow-hidden"
                  onClick={() => onBlogPostClick(displayPosts[0].slug)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="bg-gradient-to-br from-cornflower-100 to-blue-100 p-12 flex items-center justify-center">
                      <div className="text-center">
                        <Badge className="mb-4 bg-cornflower-600 text-white">
                          ⭐ Featured Article
                        </Badge>
                        <div className="text-6xl mb-4">📰</div>
                        <h4 className="text-lg font-semibold text-cornflower-800">Latest Insights</h4>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={getCategoryColor(displayPosts[0].category)}>
                          {displayPosts[0].category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(displayPosts[0].published_at || displayPosts[0].created_at)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-cornflower-600 transition-colors">
                        {displayPosts[0].title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {displayPosts[0].excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">
                          By {displayPosts[0].author}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {getTags(displayPosts[0].tags).slice(0, 3).map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.slice(1).map((post) => (
                  <Card 
                    key={post.id} 
                    className="border-0 shadow-lg cursor-pointer card-hover"
                    onClick={() => onBlogPostClick(post.slug)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </div>
                      <CardTitle className="text-lg hover:text-cornflower-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">
                          {post.author}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {getTags(post.tags).slice(0, 2).map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {displayPosts.length >= 6 && (
                <div className="text-center pt-8">
                  <Button variant="outline" size="lg">
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Stay Updated with Tech Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest articles, insights, and technology trends delivered directly to your inbox.
            Join thousands of tech leaders across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Your email address"
              className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
            />
            <Button
              className="bg-white text-cornflower-700 hover:bg-gray-100"
              size="lg"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}