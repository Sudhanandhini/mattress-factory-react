'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Headphones, BadgePercent, ArrowRight, Users, Package, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const stats = [
  { value: 1078, suffix: '+', label: 'Happy Customers', icon: Users, color: 'bg-accent-500' },
  { value: 81, suffix: '+', label: 'Products', icon: Package, color: 'bg-gold-400' },
  { value: 5, suffix: '+', label: 'Years in Service', icon: Clock, color: 'bg-accent-500' },
  { value: 0, suffix: '', label: 'Pan India Delivery', icon: MapPin, color: 'bg-gold-400', isText: true, displayText: 'Pan India' },
];

const features = [
  { icon: ShieldCheck, title: 'Premium Quality', desc: 'Pure materials with rigorous quality control ensuring lasting comfort for years.' },
  { icon: BadgePercent, title: 'Fair Pricing', desc: 'Factory-direct prices without middlemen cost effective products guaranteed.' },
  { icon: Headphones, title: 'Dedicated Help', desc: 'Our sleep experts are available to guide your perfect mattress choice anytime.' },
  { icon: Truck, title: 'Everyday Practicality', desc: 'Free delivery, easy returns, and hassle-free setup at your doorstep.' },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center bg-navy-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(236,72,153,0.15) 0%, transparent 50%)',
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-accent-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl"
          >
            A Brand Built on{' '}
            <span className="font-cursive italic text-accent-400">Comfort &amp; Trust</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl"
          >
            Learn what makes MATTRESS FACTORY different and how our passion and vision guide every product we create.
          </motion.p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="relative -mt-10 z-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-gold-400 to-gold-500 rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-full ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-navy-700 mb-1">
                        {stat.isText ? (
                          stat.displayText
                        ) : (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        )}
                      </div>
                      <p className="text-navy-700/70 text-sm font-medium">{stat.label}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="right">
              <div>
                <span className="section-badge mb-4 inline-block">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-6">
                  From Karur to Every Home in{' '}
                  <span className="font-cursive italic text-accent-500">India</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Born in the heart of Karur, Tamil Nadu &mdash; India&apos;s textile capital &mdash; MATTRESS FACTORY brings three generations of weaving excellence to every product it creates. Our roots run deep in the rich textile heritage of this region.
                  </p>
                  <p>
                    From carefully sourced 100% cotton fabrics to our meticulous finishing processes, every detail is a commitment to the craft. Our team of skilled artisans combines traditional techniques with modern innovation.
                  </p>
                  <p>
                    Today, we deliver premium quality home furnishings across India, making comfort accessible to every household. Each product tells a story of quality, care, and craftsmanship.
                  </p>
                </div>
                <Link href="/products" className="inline-flex items-center gap-2 mt-6 text-accent-500 font-semibold hover:gap-3 transition-all">
                  Explore Our Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center shadow-lg">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-3">&#127968;</div>
                    <p className="text-gray-500 text-sm">Our Manufacturing Unit, Karur</p>
                  </div>
                </div>
                {/* Decorative border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-accent-300 -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-3 inline-block">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-700">
              Mission{' '}
              <span className="font-cursive italic text-accent-500">&amp;</span>{' '}
              Vision
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection direction="left" delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-accent-500 h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-navy-700 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To continuously craft comfortable and premium-value mattresses for every household. We envision making durable, innovative and eco-friendly sleep solutions accessible to all, while maintaining our heritage of craftsmanship.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-gold-400 h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-navy-700 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be India&apos;s most trusted home furnishings brand, renowned for blending quality, innovation, and customer comfort. Each product is a step toward making premium sleep and home comfort accessible to every family in India.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-3 inline-block">Why Choose Us</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-500 to-accent-600">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/90 mb-8">
              Explore our complete range of premium home furnishings. Order now for free delivery in Karur. Discover comfort redefining your living space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
