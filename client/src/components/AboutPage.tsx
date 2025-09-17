import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Innovation First',
      description: 'We prioritize cutting-edge solutions that push the boundaries of what\'s possible in technology.'
    },
    {
      icon: '🤝',
      title: 'Client Partnership',
      description: 'We build long-term relationships based on trust, transparency, and mutual success.'
    },
    {
      icon: '🌍',
      title: 'African Focus',
      description: 'Committed to solving uniquely African challenges with globally competitive solutions.'
    },
    {
      icon: '⚡',
      title: 'Agile Delivery',
      description: 'Fast, efficient, and adaptive project delivery that meets evolving business needs.'
    }
  ];

  const milestones = [
    { year: '2019', event: 'GMW Tech Group founded in Nairobi, Kenya' },
    { year: '2020', event: 'Launched first AI-powered ERP solution for manufacturing' },
    { year: '2021', event: 'Established Laocta Techlabs for AI innovation' },
    { year: '2022', event: 'Created Integral IoT for industrial automation solutions' },
    { year: '2023', event: 'Founded Chaintum for blockchain and Web3 development' },
    { year: '2024', event: 'Expanded operations across East Africa with 150+ completed projects' }
  ];

  const leadership = [
    {
      name: 'Gerald Wanjiku',
      role: 'Chief Executive Officer',
      background: 'Visionary leader with 10+ years in technology and digital transformation',
      focus: 'Strategic direction and innovation leadership'
    },
    {
      name: 'Mark Waweru',
      role: 'Chief Technology Officer',
      background: 'Expert in AI, blockchain, and IoT with deep technical expertise',
      focus: 'Technology architecture and product development'
    },
    {
      name: 'Wilson Gathogo',
      role: 'Chief Operations Officer',
      background: 'Operations specialist focused on delivery excellence and client success',
      focus: 'Project delivery and operational efficiency'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="gradient-text">GMW Tech Group</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              We are passionate technologists dedicated to driving Africa's digital transformation through
              innovative AI, Blockchain, and IoT solutions.
            </p>
            <Badge className="bg-cornflower-100 text-cornflower-800 border-cornflower-200 px-6 py-2">
              🚀 Founded in 2019 • Nairobi, Kenya
            </Badge>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg card-hover">
              <CardHeader className="bg-gradient-to-r from-cornflower-50 to-blue-50">
                <CardTitle className="text-2xl text-cornflower-800 flex items-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  To solve complex industry challenges across Africa through bespoke technological solutions
                  that integrate artificial intelligence, blockchain technology, and Internet of Things systems.
                  We are committed to delivering innovative, scalable, and sustainable digital transformation
                  that empowers businesses to thrive in the modern economy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="text-2xl text-indigo-800 flex items-center">
                  <span className="text-3xl mr-3">🌟</span>
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be Africa's leading technology conglomerate, recognized for innovation excellence and
                  transformative digital solutions. We envision a digitally empowered Africa where businesses
                  leverage advanced technologies to create unprecedented value, drive economic growth, and
                  improve quality of life across the continent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we develop for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <CardTitle className="text-lg text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a startup vision to a multi-subsidiary technology group, here's how we've grown
              to become a trusted partner in digital transformation.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-cornflower-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="border-0 shadow-lg card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge className="bg-cornflower-600 text-white px-3 py-1 font-bold">
                            {milestone.year}
                          </Badge>
                        </div>
                        <p className="text-gray-700 font-medium">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cornflower-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-r from-cornflower-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the visionary leaders driving GMW Tech Group's mission to transform Africa
              through technology innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cornflower-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{leader.name}</CardTitle>
                  <p className="text-cornflower-600 font-medium">{leader.role}</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {leader.background}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {leader.focus}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="gradient-text">GMW Tech Group</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Bespoke Solutions</h3>
                    <p className="text-gray-600">Every solution is tailored to meet specific industry challenges and business requirements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Multi-Subsidiary Expertise</h3>
                    <p className="text-gray-600">Comprehensive capabilities across AI, IoT, and Blockchain through specialized subsidiaries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Local Understanding</h3>
                    <p className="text-gray-600">Deep knowledge of African markets, challenges, and opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Proven Track Record</h3>
                    <p className="text-gray-600">150+ successful projects delivered across multiple countries and industries.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cornflower-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Commitment</h3>
              <blockquote className="text-lg italic leading-relaxed">
                "We are not just building technology solutions; we are crafting the digital foundation
                that will empower the next generation of African businesses to compete globally and
                drive economic transformation across the continent."
              </blockquote>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="font-medium">GMW Tech Group Leadership Team</p>
                <p className="text-sm text-blue-200">Committed to Africa's Digital Future</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}