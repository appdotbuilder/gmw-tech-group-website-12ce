import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/utils/trpc';
import type { CreateNewsletterSubscriptionInput } from '../../../server/src/schema';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const subscriptionData: CreateNewsletterSubscriptionInput = {
        email,
        name: null
      };
      await trpc.createNewsletterSubscription.mutate(subscriptionData);
      setSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Our Team', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'News & Press', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const serviceLinks = [
    { name: 'AI & Machine Learning', href: '#' },
    { name: 'Blockchain & Web3', href: '#' },
    { name: 'Internet of Things', href: '#' },
    { name: 'Data Analytics', href: '#' },
    { name: 'Risk Planning', href: '#' },
    { name: 'Growth Strategy', href: '#' }
  ];

  const subsidiaryLinks = [
    { name: 'Laocta Techlabs', href: '#' },
    { name: 'Integral IoT', href: '#' },
    { name: 'Chaintum', href: '#' }
  ];

  const resourceLinks = [
    { name: 'Blog & Insights', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'White Papers', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support Center', href: '#' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'GitHub', icon: '💻', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest insights on technology trends, innovation stories, and digital transformation
              strategies delivered to your inbox.
            </p>
            
            {success ? (
              <div className="max-w-md mx-auto">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-400 text-lg">✓</span>
                    <span className="text-green-200">Thank you for subscribing!</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="mt-4 text-gray-300 hover:text-white"
                  onClick={() => setSuccess(false)}
                >
                  Subscribe Another Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-cornflower-600 hover:bg-cornflower-700 text-white px-6"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  No spam, unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cornflower-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GMW</span>
              </div>
              <span className="text-xl font-bold">Tech Group</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Driving Africa's digital transformation through innovative AI, Blockchain, and IoT solutions.
              We deliver bespoke technological solutions that solve complex industry challenges.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-cornflower-400">📍</span>
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-cornflower-400">📧</span>
                <span>hello@gmwtechgroup.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-cornflower-400">📞</span>
                <span>+254 700 000 000</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-lg hover:bg-cornflower-600 transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cornflower-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cornflower-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 mb-6">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cornflower-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h5 className="text-md font-semibold mb-3 text-cornflower-400">Subsidiaries</h5>
            <ul className="space-y-2">
              {subsidiaryLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cornflower-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} GMW Tech Group. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cornflower-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cornflower-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cornflower-400 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-cornflower-400 transition-colors">
                Sitemap
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-400">❤️</span>
              <span>in Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-cornflower-600 hover:bg-cornflower-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
        title="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
}