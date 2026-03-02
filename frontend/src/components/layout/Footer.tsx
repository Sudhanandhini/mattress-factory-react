'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimatedSection } from '../ui/AnimatedSection';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

const categories = [
  { label: 'Bedsheets', href: '/products?category=bedsheets' },
  { label: 'Quilts', href: '/products?category=quilts' },
  { label: 'Mattresses', href: '/products?category=mattresses' },
  { label: 'Pillows', href: '/products?category=pillows' },
  { label: 'Bed Frames', href: '/products?category=bed-frames' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-navy-700 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-accent-500 to-accent-600">
        <div className="container mx-auto px-4 py-10">
          <AnimatedSection direction="up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready to Transform Your Home?
                </h3>
                <p className="text-white/90">
                  Explore our complete range of premium home furnishings. Order now for free delivery!
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/products">
                  <Button variant="secondary" size="lg">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-accent-600">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.8 4.8C16.4 3.4 14.3 2.5 12 2.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c3.4 0 6.4-2 7.7-5h-2.1c-1.2 2-3.3 3.3-5.7 3.3-3.7 0-6.7-3-6.7-6.7s3-6.7 6.7-6.7c1.9 0 3.5.8 4.7 2L14 9.5h7V2.5l-3.2 2.3z" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-white font-cursive">MATTRESS</div>
                <div className="text-xl font-bold text-accent-400 font-cursive -mt-1">FACTORY</div>
              </div>
            </Link>
            <p className="text-sm mb-4 leading-relaxed text-gray-400">
              Karumatampatti, Karur M, Karur, Tamil Nadu, India - 639 002
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:border-accent-500 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent-400 font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-accent-400 font-semibold text-lg mb-5">Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent-400 font-semibold text-lg mb-5">Need Help?</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+918150011660" className="text-gray-300 hover:text-white transition-colors">
                    +91 81500 11660
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <a href="mailto:contact@mattressfactory.com" className="text-gray-300 hover:text-white transition-colors">
                  contact@mattressfactory.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Monday - Saturday: 09:00 am - 8:00 pm</p>
                  <p>Sunday: 10:00 am - 4:00 pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} MATTRESS FACTORY. All Rights Reserved.</p>
            <p>
              Developed with{' '}
              <span className="text-accent-400">&#9829;</span>{' '}
              by{' '}
              <a
                href="https://sunsystechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-300 transition-colors"
              >
                Sunsys Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
