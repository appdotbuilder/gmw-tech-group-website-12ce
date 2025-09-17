import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/utils/trpc';
import type { CompanyStats } from '../../../server/src/schema';

type Page = 'home' | 'about' | 'services' | 'subsidiaries' | 'contact' | 'blog';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [stats, setStats] = useState<CompanyStats[]>([]);

  const loadStats = useCallback(async () => {
    try {
      const result = await trpc.getCompanyStats.query({ activeOnly: true });
      setStats(result);
    } catch (error) {
      console.error('Failed to load company stats:', error);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const services = [
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Advanced AI solutions for business automation, predictive analytics, and intelligent decision-making systems.',
      features: ['Predictive Analytics', 'Process Automation', 'AI-powered ERP']
    },
    {
      icon: '🔗',
      title: 'Blockchain & Web3',
      description: 'Decentralized systems, smart contracts, and supply chain tokenization for transparent operations.',
      features: ['Supply Chain Tokenization', 'Smart Contracts', 'Web3 Integration']
    },
    {
      icon: '🌐',
      title: 'Internet of Things',
      description: 'Connected devices, industrial automation, and predictive maintenance solutions.',
      features: ['Industrial Automation', 'Predictive Maintenance', 'Smart Monitoring']
    }
  ];

  const subsidiaries = [
    {
      name: 'Laocta Techlabs',
      icon: '⚡',
      focus: 'AI & Software Innovation',
      description: 'Leading AI innovation, mobile & web development, and digital transformation solutions across Africa.',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Integral IoT',
      icon: '📡',
      focus: 'Internet of Things',
      description: 'Specializing in predictive maintenance, automation, and comprehensive device connectivity solutions.',
      color: 'bg-gradient-to-r from-green-500 to-blue-500'
    },
    {
      name: 'Chaintum',
      icon: '⚛️',
      focus: 'Blockchain & Web3',
      description: 'Pioneering blockchain research, policy development, and Web3 transformation initiatives.',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  // Default stats for better UX when data isn't loaded
  const defaultStats: (CompanyStats | { metric_name: string; metric_value: string })[] = [
    { metric_name: 'Projects Completed', metric_value: '150+' },
    { metric_name: 'Happy Clients', metric_value: '50+' },
    { metric_name: 'Countries Served', metric_value: '8' },
    { metric_name: 'Years Experience', metric_value: '5+' }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                🚀 Driving Digital Innovation
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Driving Africa's Digital Transformation with{' '}
                <span className="text-cornflower-100">AI, Blockchain & IoT</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                GMW Tech Group delivers bespoke technological solutions that solve complex industry challenges
                and accelerate digital transformation across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-cornflower-700 hover:bg-gray-100"
                  onClick={() => onNavigate('about')}
                >
                  Learn More About Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => onNavigate('contact')}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {displayStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-cornflower-100">
                        {stat.metric_value}
                      </div>
                      <div className="text-sm text-blue-200">
                        {stat.metric_name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to deliver innovative solutions that drive business growth
              and operational efficiency across diverse industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="mr-2 mb-2">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="btn-primary"
              onClick={() => onNavigate('services')}
            >
              Explore All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Subsidiaries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three specialized companies working together to deliver comprehensive technology solutions
              across the entire digital transformation spectrum.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {subsidiaries.map((subsidiary, index) => (
              <Card key={index} className="card-hover overflow-hidden border-0 shadow-lg">
                <div className={`h-2 ${subsidiary.color}`}></div>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{subsidiary.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">{subsidiary.name}</CardTitle>
                      <p className="text-sm text-cornflower-600 font-medium">{subsidiary.focus}</p>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {subsidiary.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary"
              onClick={() => onNavigate('subsidiaries')}
            >
              Learn More About Our Subsidiaries
            </Button>
          </div>
        </div>
      </section>

      {/* Key Solutions Highlight */}
      <section className="py-20 bg-gradient-to-r from-cornflower-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Transforming Industries with <span className="gradient-text">Smart Solutions</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Industrial Automation</h3>
                    <p className="text-gray-600">IoT-powered systems that optimize manufacturing processes and reduce operational costs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Supply Chain Tokenization</h3>
                    <p className="text-gray-600">Blockchain solutions for transparent, traceable, and efficient supply chain management.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI-Powered ERP</h3>
                    <p className="text-gray-600">Intelligent enterprise resource planning systems that adapt and learn from business patterns.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="btn-primary"
                  onClick={() => onNavigate('contact')}
                >
                  Start Your Digital Journey
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Success Rate</span>
                    <span className="text-2xl font-bold text-cornflower-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Cost Reduction</span>
                    <span className="text-2xl font-bold text-green-600">40%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Implementation Time</span>
                    <span className="text-2xl font-bold text-orange-600">60 Days</span>
                  </div>
                </div>
              </div>
            </div>
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
            Join leading companies across Africa who trust GMW Tech Group to drive their digital transformation.
            Let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-cornflower-700 hover:bg-gray-100"
              onClick={() => onNavigate('contact')}
            >
              Start a Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('blog')}
            >
              Read Our Insights
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}