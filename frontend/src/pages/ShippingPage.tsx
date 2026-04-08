import { Link } from 'react-router-dom';
import bg from '../images/bg.jpg';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[280px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-300 text-sm mb-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; Shipping Policy
          </p>
          <h1 className="text-4xl font-bold text-white">Shipping Policy</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-gray-700 leading-relaxed space-y-8">

          {/* Free Delivery Banner */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-6 py-4">
            <p className="text-[#1a2a6c] font-bold text-base">Free Delivery Pan India</p>
            <p className="text-[#1a2a6c] text-sm mt-0.5">Free shipping on all orders. No hidden charges.</p>
          </div>

          {/* 1. Delivery Timeline */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4">1. Delivery Timeline</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3.5 font-semibold text-gray-700">Location</th>
                    <th className="text-left px-6 py-3.5 font-semibold text-gray-700">Estimated Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { location: 'Bangalore City',  delivery: '1–3 Business Days' },
                    { location: 'Karnataka',        delivery: '3–5 Business Days' },
                    { location: 'Metro Cities',     delivery: '4–7 Business Days' },
                    { location: 'Rest of India',    delivery: '7–10 Business Days' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-3.5 text-gray-700">{row.location}</td>
                      <td className="px-6 py-3.5 text-gray-700">{row.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Order Processing */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Order Processing</h2>
            <p className="text-sm text-gray-600">
              Orders are processed within 1–2 business days after payment confirmation. You will receive tracking details once dispatched.
            </p>
          </section>

          {/* 3. Tracking */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Tracking</h2>
            <p className="text-sm text-gray-600">
              You will receive an SMS and email with the tracking number once your order ships.
            </p>
          </section>

          {/* 4. Shipping Coverage */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Shipping Coverage</h2>
            <p className="text-sm text-gray-600">
              We ship Pan India. All mattresses are shipped directly from our factory in Bangalore, Karnataka using trusted logistics partners to ensure safe and timely delivery.
            </p>
          </section>

          {/* 5. Custom Size Orders */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Custom Size Orders</h2>
            <p className="text-sm text-gray-600">
              Custom size mattresses require additional production time of 7–14 business days before dispatch. Total delivery time will vary based on your location.
            </p>
          </section>

          {/* 6. Delivery Conditions */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Delivery Conditions</h2>
            <p className="text-sm text-gray-600">
              Our delivery team will deliver the mattress to your doorstep. Ground-floor delivery is included. For upper floors, kindly make arrangements in advance. Please ensure someone is available to receive the delivery.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Contact</h2>
            <p className="text-sm text-gray-600 mb-4">
              For shipping queries, contact us at{' '}
              <a href="mailto:info@mattressfactory.in" className="text-[#1a2a6c] font-semibold hover:underline">
                info@mattressfactory.in
              </a>{' '}
              or{' '}
              <a href="tel:+917760693333" className="text-[#1a2a6c] font-semibold hover:underline">
                +91 77606 93333
              </a>.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-sm text-gray-700">
              <p className="font-bold text-gray-800">Mattress Factory</p>
              <p className="mt-1">
                Email:{' '}
                <a href="mailto:info@mattressfactory.in" className="text-[#1a2a6c] font-semibold hover:underline">
                  info@mattressfactory.in
                </a>
                {' | '}
                Phone:{' '}
                <a href="tel:+917760693333" className="text-[#1a2a6c] font-semibold hover:underline">
                  +91 77606 93333
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
