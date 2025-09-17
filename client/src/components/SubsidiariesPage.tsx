import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SubsidiariesPage() {
  const subsidiaries = {
    laocta: {
      name: 'Laocta Techlabs',
      tagline: 'AI Innovation & Software Excellence',
      icon: '⚡',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      textColor: 'text-purple-800',
      description: 'Laocta Techlabs is our premier AI and software innovation subsidiary, dedicated to developing cutting-edge artificial intelligence solutions and comprehensive digital transformation services.',
      specializations: [
        'Artificial Intelligence & Machine Learning',
        'Mobile & Web Application Development',
        'Digital Transformation Consulting',
        'Custom Software Development',
        'AI-Powered ERP Systems',
        'Intelligent Process Automation'
      ],
      services: [
        {
          title: 'AI-Powered ERP Solutions',
          description: 'Intelligent enterprise resource planning systems that learn and adapt to business patterns.',
          impact: 'Reduces manual processes by 70%'
        },
        {
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for iOS and Android.',
          impact: 'User engagement up to 300% increase'
        },
        {
          title: 'Web Development',
          description: 'Modern, responsive web applications using latest technologies.',
          impact: 'Faster loading times, better SEO'
        },
        {
          title: 'AI Consulting',
          description: 'Strategic AI implementation and machine learning model development.',
          impact: 'Data-driven decision accuracy improved by 85%'
        }
      ],
      achievements: [
        '50+ AI models deployed',
        '100+ mobile apps launched',
        '30+ ERP implementations',
        '95% client satisfaction rate'
      ],
      technologies: ['Python', 'TensorFlow', 'React Native', 'Node.js', 'AWS', 'Docker']
    },
    integral: {
      name: 'Integral IoT',
      tagline: 'Connected Solutions for Smart Operations',
      icon: '📡',
      color: 'from-green-500 to-blue-500',
      bgColor: 'from-green-50 to-blue-50',
      textColor: 'text-green-800',
      description: 'Integral IoT specializes in Internet of Things solutions, predictive maintenance, and industrial automation systems that connect and optimize operations across various industries.',
      specializations: [
        'Industrial IoT Solutions',
        'Predictive Maintenance Systems',
        'Smart Building Automation',
        'Environmental Monitoring',
        'Asset Tracking & Management',
        'Real-time Data Analytics'
      ],
      services: [
        {
          title: 'Predictive Maintenance',
          description: 'IoT-powered systems that predict equipment failures before they occur.',
          impact: 'Reduces downtime by 40%'
        },
        {
          title: 'Smart Agriculture',
          description: 'Automated irrigation and crop monitoring systems for optimal yields.',
          impact: 'Increases crop yield by 25%'
        },
        {
          title: 'Industrial Automation',
          description: 'Comprehensive automation solutions for manufacturing and production.',
          impact: 'Improves efficiency by 50%'
        },
        {
          title: 'Fleet Management',
          description: 'Real-time vehicle tracking and performance optimization systems.',
          impact: 'Reduces fuel consumption by 20%'
        }
      ],
      achievements: [
        '200+ IoT devices deployed',
        '40% average downtime reduction',
        '15+ industrial clients',
        '24/7 monitoring capabilities'
      ],
      technologies: ['Arduino', 'Raspberry Pi', 'LoRaWAN', 'MQTT', 'InfluxDB', 'Grafana']
    },
    chaintum: {
      name: 'Chaintum',
      tagline: 'Blockchain Innovation & Web3 Transformation',
      icon: '⚛️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      textColor: 'text-orange-800',
      description: 'Chaintum leads our blockchain and Web3 initiatives, focusing on decentralized systems, smart contracts, and innovative blockchain applications that transform traditional business models.',
      specializations: [
        'Blockchain Development',
        'Smart Contract Programming',
        'DeFi Solutions',
        'NFT Marketplaces',
        'Supply Chain Tokenization',
        'Web3 Consulting'
      ],
      services: [
        {
          title: 'Supply Chain Tokenization',
          description: 'End-to-end product tracking using blockchain technology for complete transparency.',
          impact: 'Eliminates counterfeit products'
        },
        {
          title: 'Smart Contracts',
          description: 'Automated contract execution and management on blockchain platforms.',
          impact: 'Reduces transaction costs by 60%'
        },
        {
          title: 'DeFi Platforms',
          description: 'Decentralized finance solutions for lending, borrowing, and trading.',
          impact: 'Access to global financial markets'
        },
        {
          title: 'Digital Identity',
          description: 'Secure, decentralized identity management and verification systems.',
          impact: 'Enhanced security and privacy'
        }
      ],
      achievements: [
        '25+ blockchain projects',
        '10+ smart contracts deployed',
        '5+ DeFi platforms launched',
        'Multi-chain compatibility'
      ],
      technologies: ['Solidity', 'Ethereum', 'Polygon', 'Web3.js', 'IPFS', 'Hardhat']
    }
  };

  const collaborationAreas = [
    {
      title: 'Cross-Technology Integration',
      description: 'Our subsidiaries work together to create comprehensive solutions that combine AI, IoT, and Blockchain.',
      example: 'AI-powered IoT devices with blockchain data integrity'
    },
    {
      title: 'Knowledge Sharing',
      description: 'Regular collaboration ensures best practices and innovations are shared across all subsidiaries.',
      example: 'Shared research and development initiatives'
    },
    {
      title: 'Unified Project Delivery',
      description: 'Complex projects benefit from the combined expertise of multiple subsidiaries.',
      example: 'Complete digital transformation solutions'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Subsidiaries</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Three specialized companies united by a shared vision to drive Africa's digital transformation
              through innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                ⚡ Laocta Techlabs
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                📡 Integral IoT
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2">
                ⚛️ Chaintum
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiaries Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="laocta">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Specialized <span className="gradient-text">Expertise</span>
              </h2>
              
              <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto p-2 bg-transparent">
                {Object.entries(subsidiaries).map(([key, subsidiary]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-cornflower-600 data-[state=active]:text-white flex flex-col items-center p-6 h-auto rounded-lg border-2 border-gray-200 data-[state=active]:border-cornflower-600"
                  >
                    <span className="text-3xl mb-2">{subsidiary.icon}</span>
                    <span className="font-semibold text-base">{subsidiary.name}</span>
                    <span className="text-xs opacity-80">{subsidiary.tagline}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(subsidiaries).map(([key, subsidiary]) => (
              <TabsContent key={key} value={key}>
                <div className="space-y-12">
                  {/* Subsidiary Header */}
                  <div className={`bg-gradient-to-r ${subsidiary.bgColor} rounded-2xl p-8 lg:p-12`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${subsidiary.color} rounded-2xl flex items-center justify-center text-3xl`}>
                            {subsidiary.icon}
                          </div>
                          <div>
                            <h3 className={`text-3xl font-bold ${subsidiary.textColor}`}>
                              {subsidiary.name}
                            </h3>
                            <p className="text-gray-600 font-medium">{subsidiary.tagline}</p>
                          </div>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {subsidiary.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {subsidiary.achievements.map((achievement, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <p className="font-bold text-2xl text-cornflower-600">
                              {achievement.split(' ')[0]}
                            </p>
                            <p className="text-sm text-gray-600">
                              {achievement.split(' ').slice(1).join(' ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">Core Services</h4>
                      <div className="space-y-4">
                        {subsidiary.services.map((service, index) => (
                          <Card key={index} className="border-l-4 border-l-cornflower-600 card-hover">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-gray-900">{service.title}</h5>
                                <Badge variant="secondary" className="text-xs">
                                  {service.impact}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm">{service.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">Specializations</h4>
                      <div className="space-y-3 mb-8">
                        {subsidiary.specializations.map((spec, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-cornflower-600 rounded-full"></div>
                            <span className="text-gray-700">{spec}</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-4">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {subsidiary.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="border-cornflower-200 text-cornflower-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Synergy & <span className="gradient-text">Collaboration</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our subsidiaries don't work in isolation. They collaborate closely to deliver 
              comprehensive solutions that leverage the full spectrum of our technological capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {collaborationAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-cornflower-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      {index + 1}
                    </div>
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {area.description}
                  </p>
                  <div className="bg-cornflower-50 p-3 rounded-lg">
                    <p className="text-cornflower-800 text-xs font-medium">
                      Example: {area.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Collaboration Visualization */}
          <div className="relative bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              How Our Subsidiaries Work Together
            </h3>
            
            <div className="flex justify-center items-center space-x-8 lg:space-x-16">
              {/* Laocta */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mb-3 mx-auto">
                  ⚡
                </div>
                <h4 className="font-semibold text-purple-800">Laocta Techlabs</h4>
                <p className="text-xs text-gray-600">AI & Software</p>
              </div>

              {/* Connection Lines */}
              <div className="hidden lg:block">
                <svg width="100" height="100" className="text-cornflower-300">
                  <line x1="10" y1="50" x2="90" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
                  <line x1="10" y1="50" x2="90" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
                </svg>
              </div>

              {/* Integral IoT */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mb-3 mx-auto">
                  📡
                </div>
                <h4 className="font-semibold text-green-800">Integral IoT</h4>
                <p className="text-xs text-gray-600">Connected Solutions</p>
              </div>

              {/* Connection Lines */}
              <div className="hidden lg:block">
                <svg width="100" height="100" className="text-cornflower-300">
                  <line x1="10" y1="20" x2="90" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
                  <line x1="10" y1="80" x2="90" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
                </svg>
              </div>

              {/* Chaintum */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl mb-3 mx-auto">
                  ⚛️
                </div>
                <h4 className="font-semibold text-orange-800">Chaintum</h4>
                <p className="text-xs text-gray-600">Blockchain & Web3</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Badge className="bg-cornflower-100 text-cornflower-800 border-cornflower-200 px-4 py-2">
                🤝 Unified Technology Ecosystem
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Combined <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real examples of how our subsidiaries work together to deliver transformative results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg card-hover">
              <CardHeader>
                <div className="flex space-x-2 mb-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-2xl">📡</span>
                  <span className="text-2xl">⚛️</span>
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Smart Manufacturing Solution
                </CardTitle>
                <CardDescription>
                  Multi-subsidiary collaboration for complete industrial transformation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-purple-100 text-purple-800 text-xs">AI</Badge>
                    <p className="text-sm text-gray-600">Predictive quality control system</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-green-100 text-green-800 text-xs">IoT</Badge>
                    <p className="text-sm text-gray-600">Real-time production monitoring</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Blockchain</Badge>
                    <p className="text-sm text-gray-600">Supply chain transparency</p>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    Result: 45% reduction in defects, 30% faster production
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover">
              <CardHeader>
                <div className="flex space-x-2 mb-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-2xl">⚛️</span>
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Agricultural Finance Platform
                </CardTitle>
                <CardDescription>
                  AI-powered blockchain solution for farmer financing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-purple-100 text-purple-800 text-xs">AI</Badge>
                    <p className="text-sm text-gray-600">Credit scoring and risk assessment</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Blockchain</Badge>
                    <p className="text-sm text-gray-600">Transparent loan disbursement</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm font-medium">
                    Result: 60% more farmers accessing credit, 99% repayment rate
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Experience the Power of Unified Innovation
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our subsidiaries work together to deliver solutions that no single company could provide alone.
            Discover how our integrated approach can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-cornflower-700 hover:bg-gray-100"
            >
              Explore Solutions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}