import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/utils/trpc';
import type { CreateContactFormInput, CreateServiceInquiryInput } from '../../../server/src/schema';

export function ContactPage() {
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);

  const [contactForm, setContactForm] = useState<CreateContactFormInput>({
    name: '',
    email: '',
    phone: null,
    company: null,
    subject: '',
    message: ''
  });

  const [serviceForm, setServiceForm] = useState<CreateServiceInquiryInput>({
    name: '',
    email: '',
    phone: null,
    company: null,
    service_type: 'ai_ml',
    budget_range: null,
    project_timeline: null,
    description: ''
  });

  const serviceTypes = [
    { value: 'ai_ml', label: 'AI & Machine Learning' },
    { value: 'blockchain', label: 'Blockchain & Web3' },
    { value: 'iot', label: 'Internet of Things' },
    { value: 'data_analytics', label: 'Data Analytics' },
    { value: 'risk_planning', label: 'Risk & Liability Planning' },
    { value: 'growth_strategy', label: 'Growth & Market Positioning' }
  ];

  const budgetRanges = [
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+'
  ];

  const timelines = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '12+ months'
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);
    
    try {
      await trpc.createContactForm.mutate(contactForm);
      setContactSuccess(true);
      setContactForm({
        name: '',
        email: '',
        phone: null,
        company: null,
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsServiceLoading(true);
    
    try {
      await trpc.createServiceInquiry.mutate(serviceForm);
      setServiceSuccess(true);
      setServiceForm({
        name: '',
        email: '',
        phone: null,
        company: null,
        service_type: 'ai_ml',
        budget_range: null,
        project_timeline: null,
        description: ''
      });
    } catch (error) {
      console.error('Failed to submit service inquiry:', error);
    } finally {
      setIsServiceLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hello@gmwtechgroup.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+254 700 000 000',
      description: 'Call us during business hours'
    },
    {
      icon: '📍',
      title: 'Office',
      value: 'Nairobi, Kenya',
      description: 'Visit us at our headquarters'
    },
    {
      icon: '🕒',
      title: 'Hours',
      value: 'Mon - Fri: 8AM - 6PM EAT',
      description: 'East Africa Time'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'GitHub', icon: '💻', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Ready to transform your business with cutting-edge technology? We're here to help you
              navigate your digital transformation journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-cornflower-100 text-cornflower-800 border-cornflower-200 px-4 py-2">
                🚀 Free Consultation
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                ⚡ Fast Response
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                🎯 Tailored Solutions
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contact <span className="gradient-text">Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover text-center">
                <CardHeader>
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <CardTitle className="text-lg text-gray-900">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-cornflower-600 mb-1">{info.value}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl hover:bg-cornflower-600 hover:text-white transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* General Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <span className="text-2xl mr-3">💬</span>
                  General Inquiry
                </CardTitle>
                <CardDescription>
                  Have questions or want to learn more? Send us a message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => setContactSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name *"
                        value={contactForm.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setContactForm((prev: CreateContactFormInput) => ({ ...prev, name: e.target.value }))
                        }
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={contactForm.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setContactForm((prev: CreateContactFormInput) => ({ ...prev, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Phone Number"
                        value={contactForm.phone || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setContactForm((prev: CreateContactFormInput) => ({ ...prev, phone: e.target.value || null }))
                        }
                      />
                      <Input
                        placeholder="Company Name"
                        value={contactForm.company || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setContactForm((prev: CreateContactFormInput) => ({ ...prev, company: e.target.value || null }))
                        }
                      />
                    </div>
                    
                    <Input
                      placeholder="Subject *"
                      value={contactForm.subject}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContactForm((prev: CreateContactFormInput) => ({ ...prev, subject: e.target.value }))
                      }
                      required
                    />
                    
                    <Textarea
                      placeholder="Your Message *"
                      value={contactForm.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setContactForm((prev: CreateContactFormInput) => ({ ...prev, message: e.target.value }))
                      }
                      className="min-h-[120px]"
                      required
                    />
                    
                    <Button
                      type="submit"
                      disabled={isContactLoading}
                      className="w-full btn-primary"
                      size="lg"
                    >
                      {isContactLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Service Inquiry Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Service Inquiry
                </CardTitle>
                <CardDescription>
                  Looking for specific services? Tell us about your project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {serviceSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Inquiry Received!</h3>
                    <p className="text-gray-600">Our team will review your project requirements and contact you soon.</p>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => setServiceSuccess(false)}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name *"
                        value={serviceForm.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, name: e.target.value }))
                        }
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={serviceForm.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Phone Number"
                        value={serviceForm.phone || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, phone: e.target.value || null }))
                        }
                      />
                      <Input
                        placeholder="Company Name"
                        value={serviceForm.company || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, company: e.target.value || null }))
                        }
                      />
                    </div>
                    
                    <Select
                      value={serviceForm.service_type}
                      onValueChange={(value: 'ai_ml' | 'blockchain' | 'iot' | 'data_analytics' | 'risk_planning' | 'growth_strategy') =>
                        setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, service_type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service Type *" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        value={serviceForm.budget_range || undefined}
                        onValueChange={(value: string) =>
                          setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, budget_range: value || null }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Budget Range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select
                        value={serviceForm.project_timeline || undefined}
                        onValueChange={(value: string) =>
                          setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, project_timeline: value || null }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Textarea
                      placeholder="Project Description *"
                      value={serviceForm.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setServiceForm((prev: CreateServiceInquiryInput) => ({ ...prev, description: e.target.value }))
                      }
                      className="min-h-[120px]"
                      required
                    />
                    
                    <Button
                      type="submit"
                      disabled={isServiceLoading}
                      className="w-full btn-primary"
                      size="lg"
                    >
                      {isServiceLoading ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="gradient-text">Office</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Nairobi, Kenya - the technology hub of East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">GMW Tech Group Headquarters</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                  <p className="text-gray-500 text-sm">East Africa's Technology Hub</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🚗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Getting Here</h3>
                  <p className="text-gray-600">Easily accessible by car or public transport</p>
                  <p className="text-gray-500 text-sm">Parking available on-site</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cornflower-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Schedule a Visit</h3>
                  <p className="text-gray-600">Book a meeting to discuss your project in person</p>
                  <p className="text-gray-500 text-sm">Monday - Friday, 8AM - 6PM EAT</p>
                </div>
              </div>

              <Button className="btn-primary" size="lg">
                Schedule a Meeting
              </Button>
            </div>

            <div className="bg-gradient-to-r from-cornflower-100 to-blue-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Office Space</h3>
              <p className="text-gray-600 mb-6">
                Our state-of-the-art facility features collaborative workspaces, meeting rooms,
                and the latest technology infrastructure to support our innovative projects.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-cornflower-600">24/7</div>
                  <div className="text-sm text-gray-600">Security</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-cornflower-600">100%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}