import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ServicesPage() {
  const [activeService, setActiveService] = useState<string>('ai_ml');

  const services = {
    ai_ml: {
      title: 'Artificial Intelligence & Machine Learning',
      icon: '🤖',
      description: 'Advanced AI solutions that automate processes, provide intelligent insights, and enable data-driven decision making.',
      features: [
        'Predictive Analytics & Forecasting',
        'Process Automation & Optimization',
        'AI-Powered ERP Systems',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Intelligent Chatbots & Virtual Assistants'
      ],
      useCases: [
        {
          title: 'Manufacturing Optimization',
          description: 'AI-powered quality control and production optimization reducing waste by 30%'
        },
        {
          title: 'Financial Risk Assessment',
          description: 'Machine learning models for credit scoring and fraud detection'
        },
        {
          title: 'Healthcare Diagnostics',
          description: 'Computer vision systems for medical image analysis and diagnosis'
        }
      ]
    },
    blockchain: {
      title: 'Blockchain & Web3 Consultancy',
      icon: '🔗',
      description: 'Decentralized systems, smart contracts, and tokenization solutions for transparent and secure operations.',
      features: [
        'Supply Chain Tokenization',
        'Smart Contract Development',
        'Cryptocurrency Integration',
        'NFT Marketplaces',
        'DeFi Solutions',
        'Blockchain Consulting & Strategy'
      ],
      useCases: [
        {
          title: 'Supply Chain Transparency',
          description: 'End-to-end product tracking from manufacturer to consumer using blockchain'
        },
        {
          title: 'Digital Identity Verification',
          description: 'Secure, decentralized identity management systems'
        },
        {
          title: 'Cross-border Payments',
          description: 'Fast, low-cost international payment solutions using cryptocurrency'
        }
      ]
    },
    iot: {
      title: 'Internet of Things Solutions',
      icon: '🌐',
      description: 'Connected devices and systems that enable real-time monitoring, automation, and intelligent control.',
      features: [
        'Industrial Automation',
        'Predictive Maintenance',
        'Smart Building Systems',
        'Environmental Monitoring',
        'Asset Tracking',
        'Remote Device Management'
      ],
      useCases: [
        {
          title: 'Predictive Maintenance',
          description: 'IoT sensors reduce equipment downtime by 40% through early failure detection'
        },
        {
          title: 'Smart Agriculture',
          description: 'Automated irrigation and crop monitoring systems for optimal yields'
        },
        {
          title: 'Fleet Management',
          description: 'Real-time vehicle tracking and performance optimization'
        }
      ]
    },
    data_analytics: {
      title: 'Data Analytics & Business Intelligence',
      icon: '📊',
      description: 'Transform raw data into actionable insights that drive strategic business decisions and operational efficiency.',
      features: [
        'Business Intelligence Dashboards',
        'Real-time Data Processing',
        'Market Research & Analysis',
        'Performance Metrics & KPIs',
        'Data Visualization',
        'Custom Reporting Solutions'
      ],
      useCases: [
        {
          title: 'Sales Performance Analysis',
          description: 'Comprehensive sales analytics identifying growth opportunities'
        },
        {
          title: 'Customer Behavior Insights',
          description: 'Advanced analytics revealing customer preferences and trends'
        },
        {
          title: 'Operational Efficiency',
          description: 'Data-driven process improvements reducing costs by 25%'
        }
      ]
    },
    risk_planning: {
      title: 'Risk & Liability Planning',
      icon: '🛡️',
      description: 'Comprehensive risk assessment and mitigation strategies to protect your business and ensure compliance.',
      features: [
        'Risk Assessment & Analysis',
        'Compliance Management',
        'Business Continuity Planning',
        'Cybersecurity Risk Evaluation',
        'Insurance Optimization',
        'Regulatory Compliance'
      ],
      useCases: [
        {
          title: 'Cybersecurity Risk Management',
          description: 'Comprehensive security assessments and incident response planning'
        },
        {
          title: 'Financial Risk Mitigation',
          description: 'Advanced risk modeling for financial institutions'
        },
        {
          title: 'Operational Risk Planning',
          description: 'Business continuity strategies ensuring minimal disruption'
        }
      ]
    },
    growth_strategy: {
      title: 'Growth & Market Positioning',
      icon: '📈',
      description: 'Strategic consulting and digital transformation planning to accelerate business growth and market expansion.',
      features: [
        'Digital Transformation Strategy',
        'Market Entry Planning',
        'Competitive Analysis',
        'Growth Strategy Development',
        'Technology Roadmapping',
        'Innovation Consulting'
      ],
      useCases: [
        {
          title: 'Market Expansion',
          description: 'Strategic planning for entering new African markets'
        },
        {
          title: 'Digital Transformation',
          description: 'End-to-end digitization roadmaps for traditional businesses'
        },
        {
          title: 'Innovation Strategy',
          description: 'Technology adoption strategies for competitive advantage'
        }
      ]
    }
  };

  const processes = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'We analyze your business challenges, goals, and technical requirements to understand your unique needs.'
    },
    {
      step: '02',
      title: 'Solution Design',
      description: 'Our experts design a bespoke solution that addresses your specific requirements and integrates with existing systems.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build and rigorously test your solution using agile methodologies to ensure quality and performance.'
    },
    {
      step: '04',
      title: 'Deployment & Training',
      description: 'We deploy your solution and provide comprehensive training to ensure smooth adoption and optimal usage.'
    },
    {
      step: '05',
      title: 'Support & Optimization',
      description: 'Ongoing support, maintenance, and optimization to ensure your solution continues to deliver value.'
    }
  ];

  const benefits = [
    {
      icon: '⚡',
      title: 'Faster Implementation',
      description: 'Streamlined processes reduce deployment time by 50%'
    },
    {
      icon: '💰',
      title: 'Cost Efficiency',
      description: 'Optimized solutions typically reduce operational costs by 30-40%'
    },
    {
      icon: '🎯',
      title: 'Targeted Solutions',
      description: 'Bespoke development ensures perfect fit for your business needs'
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description: 'All solutions optimized for mobile and web platforms'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-grade security and compliance built into every solution'
    },
    {
      icon: '🚀',
      title: 'Scalable Architecture',
      description: 'Solutions designed to grow with your business'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Comprehensive technology solutions designed to solve complex business challenges
              and accelerate digital transformation across diverse industries.
            </p>
            <Badge className="bg-cornflower-100 text-cornflower-800 border-cornflower-200 px-6 py-2">
              🎯 Bespoke Solutions • 🌍 Africa-Focused • ⚡ Agile Delivery
            </Badge>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeService} onValueChange={setActiveService}>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Technology <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Explore our comprehensive range of services designed to transform your business operations.
              </p>
              
              <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2 h-auto p-2">
                {Object.entries(services).map(([key, service]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-cornflower-600 data-[state=active]:text-white flex flex-col h-16 text-xs"
                  >
                    <span className="text-lg mb-1">{service.icon}</span>
                    <span className="hidden sm:block">{service.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(services).map(([key, service]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-4xl">{service.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cornflower-600 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Real-World Applications</h4>
                    <div className="space-y-4">
                      {service.useCases.map((useCase, index) => (
                        <Card key={index} className="border-l-4 border-l-cornflower-600 card-hover">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-gray-900 mb-2">{useCase.title}</h5>
                            <p className="text-gray-600 text-sm">{useCase.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery from concept to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processes.map((process, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-cornflower-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <CardTitle className="text-lg text-gray-900">{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text">Our Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the advantages of working with Africa's leading technology solutions provider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover">
                <CardHeader className="text-center">
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <CardTitle className="text-lg text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-20 bg-gradient-to-r from-cornflower-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Industries We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering specialized solutions across diverse sectors throughout Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏭', name: 'Manufacturing' },
              { icon: '🏦', name: 'Financial Services' },
              { icon: '🏥', name: 'Healthcare' },
              { icon: '🌾', name: 'Agriculture' },
              { icon: '🚚', name: 'Logistics' },
              { icon: '⚡', name: 'Energy' },
              { icon: '🏫', name: 'Education' },
              { icon: '🏛️', name: 'Government' }
            ].map((industry, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover text-center p-6">
                <div className="text-3xl mb-3">{industry.icon}</div>
                <h4 className="font-semibold text-gray-900">{industry.name}</h4>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how our services can solve your unique challenges and drive growth.
            Get a free consultation with our technology experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-cornflower-700 hover:bg-gray-100"
            >
              Start Your Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}