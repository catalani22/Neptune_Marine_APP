import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ship, Phone, Mail } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { href: '/charter', label: 'Charter' },
    { href: '/cabin-cruise', label: 'Cabin Cruises' },
    { href: '/sale', label: 'Yachts for Sale' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Ship className="w-8 h-8 text-[#c9a227]" />
            <span className="text-xl font-serif font-semibold text-[#1a1a1a]">
              NEPTUNE MARINE
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#c9a227] ${
                  location.pathname === link.href ? 'text-[#c9a227]' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="btn-gold text-sm">
              Reserve with Crypto
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium text-gray-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="btn-gold text-sm mt-2">
              Reserve with Crypto
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ship className="w-8 h-8 text-[#c9a227]" />
              <span className="text-xl font-serif font-semibold">
                NEPTUNE MARINE
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your gateway to exclusive yacht experiences. 
              Secure your dream voyage with crypto.
            </p>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c9a227]">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/charter" className="hover:text-white">Luxury Charter</a></li>
              <li><a href="/cabin-cruise" className="hover:text-white">Cabin Cruises</a></li>
              <li><a href="/sale" className="hover:text-white">Yacht Sales</a></li>
              <li><a href="/new-build" className="hover:text-white">New Builds</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c9a227]">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/team" className="hover:text-white">Our Team</a></li>
              <li><a href="/news" className="hover:text-white">News</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c9a227]">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:ale.catalani@neptunemarine.vip">ale.catalani@neptunemarine.vip</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +1 (888) 555-YACHT
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Neptune Marine. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/cookies" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
