import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Shield, Tag, Headphones, Truck, Factory, UserX, Home } from 'lucide-react';
import bg from '../images/bg.jpg';
import mattressImg from '../images/bg.jpg'; // replace with actual mattress image

export default function AboutPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('quality');
  const [beliefSlide, setBeliefSlide] = useState(0);

  const accordionItems = [
    {
      id: 'quality',
      title: 'QUALITY',
      icon: '✦',
      content:
        'Produce quality mattresses in factory and sell them directly to consumers, eliminating the middleman and providing real value. Our quality control process ensures every mattress meets the highest standards before it leaves our factory.',
    },
    {
      id: 'courteous',
      title: 'COURTEOUS',
      icon: '◎',
      content:
        'We treat every customer with respect and care, providing honest advice and support throughout your buying journey.',
    },
    {
      id: 'winwin',
      title: 'WIN-WIN',
      icon: '◇',
      content:
        'Our factory-direct model creates a win-win — you get a premium mattress at a fair price, and we build lasting relationships with happy customers.',
    },
  ];

  const beliefs = [
    {
      title: 'Uncompromising Quality',
      text: 'Every mattress that leaves our factory has passed stringent quality checks at every stage of production.',
    },
    {
      title: 'Fair Pricing',
      text: 'By cutting out retailers and middlemen, we pass the savings directly to you without compromising on materials.',
    },
    {
      title: 'Customer First',
      text: 'From the moment you visit us to long after delivery, our team is here to make sure you sleep better.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-800/65" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left */}
          <div className="flex-1">
            <p className="text-gray-300 text-xs uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              A Brand Built on <br />
              <span className="text-[#4a90d9]">Comfort &amp; Trust</span>
            </h1>
            <p className="text-gray-300 text-sm max-w-md">
              Learn what makes MATTRESS FACTORY different and how our passion and vision guide every product we create.
            </p>
          </div>
          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-4 min-w-[260px]">
            {[
              { value: '1078+', label: 'Happy Customers' },
              { value: '81+', label: 'Products' },
              { value: '5+', label: 'Years in Service' },
              { value: 'Pan India', label: 'Delivery' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-gray-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. OUR STORY ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-14">
          {/* Left: Image with badges */}
          <div className="relative flex-shrink-0 w-full lg:w-[380px]">
            <img src={mattressImg} alt="Mattress" className="w-full h-[300px] object-cover rounded-2xl shadow-lg" />
            <div className="absolute top-4 left-4 bg-navy-700 text-white text-xs font-bold rounded-xl px-4 py-2 leading-tight">
              5+<br /><span className="font-normal text-[10px]">Years of Trust</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-navy-700 text-white text-xs font-bold rounded-xl px-4 py-2 text-center leading-tight">
              1078+<br /><span className="font-normal text-[10px]">Happy Customers</span>
            </div>
          </div>
          {/* Right: Text */}
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="inline-block w-8 border-t border-gray-400" /> Our Story
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-700 mb-5 leading-tight">
              Premium Mattress<br />Manufacturing
            </h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              At our Mattress Factory, we focus on crafting high-quality mattresses designed for comfort, durability, and healthy sleep. Using advanced manufacturing techniques and carefully selected materials, every mattress is built to support the body and improve sleep quality.
            </p>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Our commitment to precision and quality ensures that each product meets the highest standards. Our production process combines modern technology with skilled craftsmanship.
            </p>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              From foam cutting and spring assembly to stitching and finishing, every stage is handled with strict quality control. This allows us to create mattresses that provide excellent support, pressure relief, and long-lasting performance for different sleeping preferences.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-navy-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors"
            >
              Explore Products <span>›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION STATEMENT ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row gap-14">
          {/* Left */}
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-8 border-t border-gray-400" /> Our Purpose
            </p>
            <h2 className="text-3xl font-extrabold text-navy-700 mb-2">Mission</h2>
            <h2 className="text-3xl font-extrabold text-navy-700 mb-2">Statement</h2>
            <div className="w-12 h-1 bg-navy-700 mb-6 rounded-full" />
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              At Mattress Factory, our mission is simple: <span className="font-semibold text-navy-700">"Providing Every mattress at a budget price"</span>
            </p>
            <blockquote className="bg-navy-700 text-white text-sm rounded-2xl p-6 italic leading-relaxed">
              "You can take your time and shop around without worry. Compare our brand to national brands, feature for feature, and make an informed buying decision with complete confidence."
            </blockquote>
          </div>
          {/* Right: Accordion */}
          <div className="flex-1 space-y-3">
            {accordionItems.map((item) => (
              <div key={item.id} className={`rounded-xl border transition-all ${openAccordion === item.id ? 'border-navy-700 bg-navy-700 text-white' : 'border-gray-200 bg-white text-gray-700'}`}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                >
                  <span className="flex items-center gap-3 font-bold text-sm">
                    <span className={openAccordion === item.id ? 'text-white' : 'text-navy-700'}>{item.icon}</span>
                    {item.title}
                  </span>
                  {openAccordion === item.id
                    ? <ChevronUp size={16} />
                    : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openAccordion === item.id && (
                  <div className="px-5 pb-5 text-sm leading-relaxed opacity-90">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PHILOSOPHY ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row gap-14">
          {/* Left */}
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-8 border-t border-gray-400" /> Core Values
            </p>
            <h2 className="text-3xl font-extrabold text-navy-700 mb-1">Philosophy</h2>
            <div className="w-12 h-1 bg-navy-700 mb-5 rounded-full" />
            <p className="text-gray-700 font-semibold text-sm mb-3">Nice of you to drop by!</p>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">Our philosophy is very much simple.</p>
            <blockquote className="bg-blue-50 border border-blue-100 text-navy-700 text-sm rounded-2xl p-5 italic mb-6 leading-relaxed">
              "Uncompromising quality in everything we do and provide you the product at the lowest competitive prices"
            </blockquote>
            <p className="text-gray-500 text-sm leading-relaxed">
              Established 25 years ago, the principles on which our company is based serve to continually guide our employees to strive for excellence, act with integrity and produce products that are built right and built to last.
            </p>
          </div>
          {/* Right: Belief Slider */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">What We Believe In . . . .</p>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 min-h-[160px]">
              <h3 className="text-lg font-bold text-navy-700 mb-3">{beliefs[beliefSlide].title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{beliefs[beliefSlide].text}</p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              {beliefs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBeliefSlide(i)}
                  className={`w-8 h-1.5 rounded-full transition-all ${i === beliefSlide ? 'bg-navy-700' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. ELIMINATE MIDDLEMAN ── */}
      <section className="bg-navy-700 py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-14 mb-14">
            {/* Left */}
            <div className="flex-1">
              <p className="text-xs text-blue-300 uppercase tracking-widest mb-4">Our Advantage</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Best Online Mattress —<br />Eliminating<br />The Middleman
              </h2>
            </div>
            {/* Right */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Did you know that when you buy a mattress from a retail store, that mattress is being <span className="text-white font-semibold">sold for the second time?</span>
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                The factory sells to a retailer, who in turn sells it to you — with costs and mark-ups at both stages.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                At Mattress Factory, we eliminate the middleman and only sell our mattresses once. We manufacture all products in our own local factories and sell them direct — no extra step, no extra mark-up. <span className="text-white font-semibold">Save great quality at a great low price.</span>
              </p>
            </div>
          </div>
          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 'STEP 01',
                icon: <Factory size={28} className="text-blue-300" />,
                title: 'We Manufacture',
                desc: 'Every mattress is produced in our own factories in India with direct quality checks at every stage.',
              },
              {
                step: 'STEP 02',
                icon: <UserX size={28} className="text-blue-300" />,
                title: 'No Middleman',
                desc: 'We skip the retailer entirely, saving you the double mark-up that traditional stores charge.',
              },
              {
                step: 'STEP 03',
                icon: <Home size={28} className="text-blue-300" />,
                title: 'Direct to You',
                desc: 'Premium mattresses delivered straight to your door at the lowest possible factory price.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-7 text-white">
                <div className="mb-4">{s.icon}</div>
                <p className="text-xs text-blue-300 uppercase tracking-widest mb-2">{s.step}</p>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MISSION & VISION ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Direction</p>
          <h2 className="text-3xl font-extrabold text-navy-700 mb-2">Mission &amp; Vision</h2>
          <div className="w-12 h-1 bg-navy-700 mx-auto mb-14 rounded-full" />
          <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-2xl mx-auto">
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-navy-700" />
              </div>
              <h3 className="font-bold text-navy-700 text-base mb-3">Our Mission</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To continuously craft comfortable and premium-value mattresses for every household. We envision making durable, innovative and eco-friendly sleep solutions accessible to all, while maintaining our heritage of craftsmanship.
              </p>
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4">
                <Tag size={24} className="text-navy-700" />
              </div>
              <h3 className="font-bold text-navy-700 text-base mb-3">Our Vision</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To be India's most trusted factory-direct mattress brand — known for delivering sleep quality that rivals global brands at a price every family can afford.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. WHAT MAKES US DIFFERENT ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-3xl font-extrabold text-navy-700 mb-3">What Makes Us Different</h2>
          <p className="text-gray-500 text-sm mb-12">Thoughtfully made home essentials that balance quality, comfort, and value.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield size={28} className="text-navy-700" />,
                title: 'Premium Quality',
                desc: 'Each mattress undergoes rigorous testing for comfort for quality assurance before shipping to your door.',
              },
              {
                icon: <Tag size={28} className="text-navy-700" />,
                title: 'Fair Pricing',
                desc: 'Factory-direct means no middlemen, no retailer mark-ups. Maximum value guaranteed — you pay for the mattress, not the mark-up.',
              },
              {
                icon: <Headphones size={28} className="text-navy-700" />,
                title: 'Dedicated Support',
                desc: 'Our sleep experts are available to guide your comfort mattress choice. We advise, not pressure.',
              },
              {
                icon: <Truck size={28} className="text-navy-700" />,
                title: 'Free Delivery',
                desc: 'Every mattress ordered at your doorstep, Pan India. Factory-to-home shipping with zero extra charge.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-5 border border-gray-100">
                  {f.icon}
                </div>
                <h3 className="font-bold text-navy-700 text-base mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}