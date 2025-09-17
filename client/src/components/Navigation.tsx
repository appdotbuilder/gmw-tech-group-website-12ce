import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

type Page = 'home' | 'about' | 'services' | 'subsidiaries' | 'contact' | 'blog';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'subsidiaries', label: 'Subsidiaries' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ] as const;

  const serviceItems = [
    { title: 'AI & Machine Learning', description: 'Intelligent solutions for business automation' },
    { title: 'Blockchain & Web3', description: 'Decentralized systems and smart contracts' },
    { title: 'Internet of Things', description: 'Connected devices and industrial automation' },
    { title: 'Data Analytics', description: 'Business intelligence and predictive insights' },
    { title: 'Risk Planning', description: 'Comprehensive risk assessment and mitigation' },
    { title: 'Growth Strategy', description: 'Market positioning and expansion planning' }
  ];

  const subsidiaryItems = [
    { title: 'Laocta Techlabs', description: 'AI innovation and software development' },
    { title: 'Integral IoT', description: 'IoT solutions and predictive maintenance' },
    { title: 'Chaintum', description: 'Blockchain research and Web3 transformation' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-cornflower-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cornflower-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GMW</span>
              </div>
              <span>Tech Group</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <button
                    onClick={() => onNavigate('home')}
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-cornflower-600 ${
                      currentPage === 'home' ? 'text-cornflower-600' : 'text-gray-700'
                    }`}
                  >
                    Home
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => onNavigate('about')}
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-cornflower-600 ${
                      currentPage === 'about' ? 'text-cornflower-600' : 'text-gray-700'
                    }`}
                  >
                    About
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`text-sm font-medium ${
                      currentPage === 'services' ? 'text-cornflower-600' : 'text-gray-700'
                    }`}
                    onClick={() => onNavigate('services')}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-96 p-6">
                      <div className="grid gap-4">
                        {serviceItems.map((item) => (
                          <div
                            key={item.title}
                            className="group grid grid-cols-1 gap-1 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => onNavigate('services')}
                          >
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-cornflower-600">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`text-sm font-medium ${
                      currentPage === 'subsidiaries' ? 'text-cornflower-600' : 'text-gray-700'
                    }`}
                    onClick={() => onNavigate('subsidiaries')}
                  >
                    Subsidiaries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-6">
                      <div className="grid gap-4">
                        {subsidiaryItems.map((item) => (
                          <div
                            key={item.title}
                            className="group grid grid-cols-1 gap-1 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => onNavigate('subsidiaries')}
                          >
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-cornflower-600">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => onNavigate('blog')}
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-cornflower-600 ${
                      currentPage === 'blog' ? 'text-cornflower-600' : 'text-gray-700'
                    }`}
                  >
                    Blog
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button
                    onClick={() => onNavigate('contact')}
                    size="sm"
                    className="btn-primary ml-2"
                  >
                    Contact Us
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as Page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors hover:text-cornflower-600 hover:bg-gray-50 rounded-md ${
                    currentPage === item.id ? 'text-cornflower-600 bg-cornflower-50' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}