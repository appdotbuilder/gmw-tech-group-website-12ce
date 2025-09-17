import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import type { BlogPost } from '../../../server/src/schema';

interface BlogPostDetailProps {
  slug: string;
  onBackToBlog: () => void;
}

export function BlogPostDetail({ slug, onBackToBlog }: BlogPostDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.getBlogPostBySlug.query({ slug });
      setPost(result);
      setError(null);
    } catch (err) {
      console.error('Failed to load blog post:', err);
      setError('Article not found');
      // Use sample data for demo purposes
      const samplePosts = getSamplePosts();
      const samplePost = samplePosts.find(p => p.slug === slug);
      if (samplePost) {
        setPost(samplePost);
        setError(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const getSamplePosts = (): BlogPost[] => [
    {
      id: 1,
      title: 'AI-Powered ERP Solutions Transforming African Businesses',
      slug: 'ai-powered-erp-solutions-transforming-african-businesses',
      excerpt: 'Discover how artificial intelligence is revolutionizing enterprise resource planning systems across Africa, driving efficiency and growth.',
      content: `
        <h2>The Revolution of Enterprise Resource Planning in Africa</h2>
        
        <p>Africa's business landscape is experiencing a digital transformation unlike any other period in its history. At the forefront of this change are AI-powered Enterprise Resource Planning (ERP) solutions that are fundamentally reshaping how businesses operate, plan, and grow across the continent.</p>
        
        <h3>What Makes AI-Powered ERP Different?</h3>
        
        <p>Traditional ERP systems have served businesses well, but they often require manual input, rely on historical data, and lack the intelligence to adapt to changing business conditions. AI-powered ERP solutions change this paradigm completely:</p>
        
        <ul>
          <li><strong>Predictive Analytics:</strong> Instead of just reporting what happened, these systems predict what will happen, allowing businesses to prepare for future demands, market changes, and potential challenges.</li>
          <li><strong>Automated Decision Making:</strong> Routine decisions are automated based on learned patterns, freeing up human resources for more strategic activities.</li>
          <li><strong>Real-time Adaptability:</strong> The system learns continuously and adapts its recommendations based on new data and changing business conditions.</li>
        </ul>
        
        <h3>Real Impact on African Businesses</h3>
        
        <p>Our work with manufacturing companies in Kenya has shown remarkable results. One client, a textile manufacturer in Nairobi, saw a 40% reduction in inventory costs within six months of implementing our AI-powered ERP solution. The system learned their seasonal patterns, supplier reliability, and customer demand fluctuations to optimize stock levels automatically.</p>
        
        <blockquote>
          "The AI system knows our business better than we do sometimes. It predicted a supply chain disruption three weeks before it happened, allowing us to secure alternative suppliers and avoid production delays." - Manufacturing Client, Nairobi
        </blockquote>
        
        <h3>The Technology Behind the Transformation</h3>
        
        <p>Our AI-powered ERP solutions leverage several cutting-edge technologies:</p>
        
        <ul>
          <li><strong>Machine Learning Algorithms:</strong> These continuously learn from business data to improve predictions and recommendations.</li>
          <li><strong>Natural Language Processing:</strong> Enables intuitive interaction with the system through voice commands and natural language queries.</li>
          <li><strong>Computer Vision:</strong> For inventory management and quality control in manufacturing environments.</li>
          <li><strong>IoT Integration:</strong> Connects with sensors and devices to provide real-time operational data.</li>
        </ul>
        
        <h3>Overcoming Implementation Challenges</h3>
        
        <p>While the benefits are clear, implementing AI-powered ERP systems in African businesses comes with unique challenges:</p>
        
        <h4>1. Infrastructure Limitations</h4>
        <p>Many businesses operate in areas with unreliable internet connectivity. Our solutions are designed to work offline when necessary and sync data when connectivity is restored.</p>
        
        <h4>2. Skills Gap</h4>
        <p>We provide comprehensive training programs to ensure staff can effectively use and maintain these advanced systems. Our approach focuses on practical, hands-on learning that builds confidence and competence.</p>
        
        <h4>3. Cost Concerns</h4>
        <p>We've developed flexible pricing models that make advanced ERP accessible to businesses of all sizes, with options for gradual implementation and scaled features.</p>
        
        <h3>Looking to the Future</h3>
        
        <p>The future of AI-powered ERP in Africa is bright. As more businesses adopt these technologies, we're seeing the emergence of interconnected business ecosystems where suppliers, manufacturers, and distributors share intelligence to optimize the entire value chain.</p>
        
        <p>We're already working on the next generation of features, including:</p>
        
        <ul>
          <li>Advanced supply chain optimization using blockchain for transparency</li>
          <li>Integration with IoT devices for real-time production monitoring</li>
          <li>AI-powered customer service that can predict and resolve issues before customers even report them</li>
        </ul>
        
        <h3>Getting Started</h3>
        
        <p>If you're interested in learning how AI-powered ERP can transform your business, we offer free consultations where we assess your current processes and identify opportunities for improvement. Our team of experts will work with you to design a solution that fits your specific needs and budget.</p>
        
        <p>The digital transformation of African business is not just a trend—it's an imperative. Those who embrace AI-powered solutions today will be the leaders of tomorrow's economy.</p>
      `,
      author: 'Gerald Wanjiku',
      category: 'AI/ML',
      tags: '["AI", "ERP", "Business Transformation", "Manufacturing", "Predictive Analytics"]',
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
      content: `
        <h2>Transforming Supply Chain Transparency in Kenya</h2>
        
        <p>Kenya's position as a regional hub for trade and commerce makes it an ideal testbed for innovative supply chain solutions. Blockchain technology is revolutionizing how goods move from producers to consumers, creating unprecedented levels of transparency and trust.</p>
        
        <h3>The Challenge of Traditional Supply Chains</h3>
        
        <p>Traditional supply chains in Kenya face several critical challenges:</p>
        
        <ul>
          <li><strong>Lack of Transparency:</strong> Consumers cannot verify the origin or authenticity of products</li>
          <li><strong>Fraud and Counterfeiting:</strong> Fake products enter the supply chain at various points</li>
          <li><strong>Inefficient Documentation:</strong> Paper-based tracking systems are slow and error-prone</li>
          <li><strong>Limited Traceability:</strong> When problems occur, it's difficult to identify their source quickly</li>
        </ul>
        
        <h3>How Blockchain Tokenization Works</h3>
        
        <p>Blockchain tokenization creates a digital twin of physical products and processes. Each item, batch, or shipment receives a unique digital token that contains all relevant information about its journey through the supply chain.</p>
        
        <p>Here's how it works in practice:</p>
        
        <ol>
          <li><strong>Product Registration:</strong> When a product is created or harvested, it receives a unique blockchain token</li>
          <li><strong>Journey Tracking:</strong> Every step in the supply chain adds information to the token</li>
          <li><strong>Verification Points:</strong> Key stakeholders verify and validate information at critical junctions</li>
          <li><strong>Consumer Access:</strong> End consumers can scan a QR code to see the complete product history</li>
        </ol>
        
        <h3>Success Story: Kenyan Coffee Supply Chain</h3>
        
        <p>One of our most successful implementations has been with a cooperative of coffee farmers in Kiambu County. The traditional coffee supply chain involved multiple intermediaries, making it difficult for consumers to know the true origin of their coffee and for farmers to receive fair compensation.</p>
        
        <p>Our blockchain solution tracks coffee beans from the farm to the cup:</p>
        
        <ul>
          <li>Farmers register their harvest on the blockchain with details about growing conditions, harvest date, and quality metrics</li>
          <li>Processing facilities add information about milling, drying, and grading</li>
          <li>Exporters and importers update the token with shipping and handling information</li>
          <li>Roasters add details about roasting profiles and quality assessments</li>
          <li>Retailers and consumers can access the complete story of their coffee</li>
        </ul>
        
        <blockquote>
          "Now our customers in Europe can see exactly which farm their coffee came from, when it was harvested, and how it was processed. This transparency has allowed us to charge premium prices and build direct relationships with buyers." - Coffee Farmer, Kiambu County
        </blockquote>
        
        <h3>Technical Architecture</h3>
        
        <p>Our supply chain tokenization platform is built on a hybrid blockchain architecture that combines the security of public blockchains with the privacy and performance requirements of business applications:</p>
        
        <ul>
          <li><strong>Private Blockchain Layer:</strong> Handles sensitive business data and high-frequency transactions</li>
          <li><strong>Public Blockchain Anchoring:</strong> Critical hash values are anchored to public blockchains for immutability</li>
          <li><strong>IoT Integration:</strong> Sensors automatically update token information with environmental and handling data</li>
          <li><strong>Mobile Applications:</strong> User-friendly apps allow all stakeholders to interact with the system</li>
        </ul>
        
        <h3>Benefits Realized</h3>
        
        <p>Our clients have reported significant benefits from implementing blockchain tokenization:</p>
        
        <h4>For Producers:</h4>
        <ul>
          <li>25% increase in prices due to verified authenticity</li>
          <li>Direct access to international markets</li>
          <li>Reduced dependency on intermediaries</li>
        </ul>
        
        <h4>For Consumers:</h4>
        <ul>
          <li>Complete product transparency</li>
          <li>Confidence in product authenticity</li>
          <li>Ability to support specific producers or practices</li>
        </ul>
        
        <h4>For Businesses:</h4>
        <ul>
          <li>Faster issue resolution and recalls</li>
          <li>Improved compliance with international standards</li>
          <li>Enhanced brand trust and customer loyalty</li>
        </ul>
        
        <h3>Expanding Beyond Agriculture</h3>
        
        <p>While our initial focus was on agricultural products, we're now expanding tokenization to other sectors:</p>
        
        <ul>
          <li><strong>Pharmaceuticals:</strong> Combating counterfeit drugs through authentic supply chain tracking</li>
          <li><strong>Manufacturing:</strong> Ensuring component authenticity in complex products</li>
          <li><strong>Textiles:</strong> Verifying sustainable and ethical production practices</li>
        </ul>
        
        <h3>Challenges and Solutions</h3>
        
        <p>Implementing blockchain solutions in Kenya's diverse business environment requires addressing several challenges:</p>
        
        <h4>Digital Literacy</h4>
        <p>We provide extensive training and support to ensure all stakeholders can effectively use the technology, regardless of their technical background.</p>
        
        <h4>Infrastructure Limitations</h4>
        <p>Our solutions work with basic smartphones and can function in areas with limited internet connectivity through offline capabilities and data synchronization.</p>
        
        <h4>Cost Concerns</h4>
        <p>We've developed tiered pricing models that make blockchain technology accessible to small-scale producers and businesses.</p>
        
        <h3>The Future of Supply Chain Tokenization</h3>
        
        <p>As blockchain technology matures and adoption increases, we envision a future where:</p>
        
        <ul>
          <li>All products have digital identities that consumers can trust</li>
          <li>Supply chains are automatically optimized based on real-time data</li>
          <li>International trade barriers are reduced through standardized, verifiable documentation</li>
          <li>Small-scale producers have equal access to global markets</li>
        </ul>
        
        <p>The blockchain revolution in supply chains is not just about technology—it's about creating a more equitable, transparent, and efficient economy that benefits all stakeholders from producers to consumers.</p>
      `,
      author: 'Mark Waweru',
      category: 'Blockchain',
      tags: '["Blockchain", "Supply Chain", "Tokenization", "Coffee", "Transparency"]',
      featured_image: null,
      published: true,
      published_at: new Date('2024-01-10'),
      created_at: new Date('2024-01-10'),
      updated_at: new Date('2024-01-10')
    }
    // Add more sample posts as needed...
  ];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cornflower-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Button onClick={onBackToBlog} className="btn-primary">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={onBackToBlog}
            className="mb-4 hover:bg-cornflower-50 hover:text-cornflower-600"
          >
            ← Back to Blog
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <Badge className={getCategoryColor(post.category)}>
              {post.category}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatDate(post.published_at || post.created_at)}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cornflower-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Technology Expert</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {getTags(post.tags).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-gray-700 prose-ol:text-gray-700
                  prose-li:mb-1
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-cornflower-600 
                  prose-blockquote:bg-cornflower-50 prose-blockquote:p-4 prose-blockquote:italic
                  prose-blockquote:text-cornflower-800 prose-blockquote:rounded-r-lg
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Author Bio */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cornflower-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{post.author}</h3>
                  <p className="text-cornflower-600">Technology Expert & Innovation Leader</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {post.author} is a leading technology expert at GMW Tech Group, specializing in digital transformation 
                and emerging technologies. With extensive experience in implementing cutting-edge solutions across Africa, 
                {post.author.split(' ')[0]} is passionate about driving innovation that creates real business value.
              </p>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getSamplePosts()
                .filter(p => p.slug !== post.slug && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="border-0 shadow-lg cursor-pointer card-hover"
                    onClick={() => window.location.reload()} // Simple reload for demo
                  >
                    <CardContent className="p-6">
                      <Badge className={getCategoryColor(relatedPost.category)}>
                        {relatedPost.category}
                      </Badge>
                      <h4 className="text-lg font-semibold text-gray-900 mt-3 mb-2 hover:text-cornflower-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-500">
                          By {relatedPost.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(relatedPost.published_at || relatedPost.created_at)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Learn how GMW Tech Group can help you implement the solutions discussed in this article.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-cornflower-700 hover:bg-gray-100"
            >
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={onBackToBlog}
            >
              Read More Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}