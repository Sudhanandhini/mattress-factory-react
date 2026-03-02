'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ShieldCheck, Truck, Headphones, BadgePercent, Quote } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';

const categories = [
  { name: 'Memory Foam', slug: 'memory-foam-mattress', image: '/images/categories/memory-foam.jpg' },
  { name: 'Spring Mattress', slug: 'spring-mattress', image: '/images/categories/spring.jpg' },
  { name: 'Orthopedic', slug: 'orthopedic-mattress', image: '/images/categories/orthopedic.jpg' },
  { name: 'Hybrid', slug: 'hybrid-mattress', image: '/images/categories/hybrid.jpg' },
  { name: 'Coir Mattress', slug: 'coir-mattress', image: '/images/categories/coir.jpg' },
  { name: 'Latex Foam', slug: 'latex-foam-mattress', image: '/images/categories/latex.jpg' },
];

const marqueeItems = [
  'BONNELL SPRING', 'COIR MATTRESS', 'EURO TOP', 'FOAM MATTRESS', 'HYBRID MATTRESS',
  'LATEX FOAM', 'MEMORY FOAM', 'ORTHOPEDIC', 'POCKET SPRING', 'REBONDED FOAM', 'SPRING MATTRESS',
];

const features = [
  { icon: ShieldCheck, title: 'Premium Quality', desc: 'Pure materials with rigorous quality control ensuring lasting comfort.' },
  { icon: BadgePercent, title: 'Fair Pricing', desc: 'Factory-direct prices without middlemen. Maximum value guaranteed.' },
  { icon: Headphones, title: 'Dedicated Help', desc: 'Our sleep experts are available to guide your perfect mattress choice.' },
  { icon: Truck, title: 'Everyday Practicality', desc: 'Free delivery, easy returns, and hassle-free setup at your doorstep.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Bengaluru',
    rating: 5,
    text: 'The memory foam mattress from MATTRESS FACTORY completely transformed my sleep. I wake up refreshed every morning. The quality is outstanding for the price!',
  },
  {
    name: 'Rahul Verma',
    location: 'Chennai',
    rating: 5,
    text: 'Excellent product and service. The mattress was delivered on time and the setup was hassle-free. My back pain has significantly reduced.',
  },
  {
    name: 'Anita Krishnan',
    location: 'Karur',
    rating: 4,
    text: 'Beautiful bedsheets and comfortable quilts. MATTRESS FACTORY products are a class apart. Will definitely recommend to friends and family.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-navy-700 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236,72,153,0.1) 0%, transparent 50%)',
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="bg-accent-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  New Arrivals
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Transform Your{' '}
                <span className="font-cursive italic text-accent-400">Sleep</span>{' '}
                <span className="font-cursive italic text-accent-400">Experience</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8 max-w-lg"
              >
                Discover our curated collection of premium mattresses, bedsheets, and home furnishings. Crafted with love, delivered to your door.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/products">
                  <Button variant="primary" size="lg">
                    Shop Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    Customize
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Hero Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-navy-600 to-navy-800 overflow-hidden shadow-2xl flex items-center justify-center border border-white/10">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">&#128716;</div>
                    <p className="text-white/60 text-sm">Premium Mattress Collection</p>
                  </div>
                </div>
                {/* Floating accent */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500/20 rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="bg-gray-100 py-4 border-y border-gray-200">
        <div className="marquee-container">
          <div className="marquee-content gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Discover Fresh Styles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
              <div>
                <span className="section-badge mb-3 inline-block">Collection</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-700">
                  Discover Fresh{' '}
                  <span className="font-cursive italic text-accent-500">Styles</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="mt-4 md:mt-0 text-accent-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                Check All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((category) => (
              <StaggerItem key={category.slug}>
                <Link href={`/products?category=${category.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden mb-3 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                        &#128716;
                      </div>
                      <div className="absolute inset-0 bg-navy-700/0 group-hover:bg-navy-700/10 transition-colors duration-300 rounded-xl" />
                    </div>
                    <h3 className="text-sm font-semibold text-navy-700 text-center group-hover:text-accent-500 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Customer Favorites / Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
              <div>
                <span className="section-badge mb-3 inline-block">Bestsellers</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-700">
                  Customer{' '}
                  <span className="font-cursive italic text-accent-500">Favorites</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="mt-4 md:mt-0 text-accent-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          <FeaturedProducts />
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-3 inline-block">Our Strengths</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-700">
              What Makes Us{' '}
              <span className="font-cursive italic text-accent-500">Different</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Thoughtfully made home essentials that balance quality, comfort, and value.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title}>
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-accent-50 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
                      <Icon className="w-9 h-9 text-accent-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-700 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-navy-700">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Mission{' '}
              <span className="font-cursive italic text-accent-400">&amp;</span>{' '}
              Vision
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection direction="left" delay={0.1}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full hover:bg-white/15 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center mb-5">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To continuously craft comfortable yet affordable mattresses for every household. We envision making quality sleep solutions accessible to all, while maintaining the highest standards of craftsmanship.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full hover:bg-white/15 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center mb-5">
                  <span className="text-navy-700 text-xl font-bold">V</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To be India&apos;s most trusted home furnishings brand, renowned for quality, innovation, and customer delight. Every product is a testament to our vision of bringing comfort accessible to everyone.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-800">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-14">
            <span className="section-badge mb-3 inline-block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Our Customers{' '}
              <span className="font-cursive italic text-accent-400">Say</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl p-7 h-full relative">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-accent-100" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${j < t.rating ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">{t.text}</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-700 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="section-badge mb-3 inline-block">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-4">
              Discover the{' '}
              <span className="font-cursive italic text-accent-500">Newest Mattress</span>{' '}
              Styles &amp; Trends
            </h2>
            <p className="text-gray-600 mb-8">
              Experience the finest home furnishings. Order now for free delivery in Karur. Discover comfort that transforms your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Explore Products <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="accent" size="lg">
                  Know More
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
