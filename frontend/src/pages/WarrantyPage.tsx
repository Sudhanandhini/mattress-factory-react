import { Link } from 'react-router-dom';
import bg from '../images/bg.jpg';

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; Warranty
          </p>
          <h1 className="text-4xl font-bold text-white">Warranty</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">10-Year Warranty</h2>
            <p>Mattress Factory offers a 10-year warranty on all premium mattresses against manufacturing defects. This warranty covers structural defects, sagging greater than 1.5 inches, and loss of shape that affects comfort and support.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">What is Covered</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Structural defects in the mattress core or support system</li>
              <li>Abnormal softening or sagging (greater than 1.5 inches)</li>
              <li>Manufacturing defects in the cover or fabric</li>
              <li>Spring malfunction (for spring mattresses)</li>
              <li>Foam deterioration beyond normal wear</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">What is Not Covered</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Normal wear and tear</li>
              <li>Physical damage from misuse, accidents, or improper handling</li>
              <li>Stains, burns, cuts, or tears</li>
              <li>Comfort preference changes</li>
              <li>Use on an improper or unsupportive base</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">How to Claim Warranty</h2>
            <p>To claim warranty, contact us with your order number, photos of the defect, and a description of the issue. Email us at <a href="mailto:info@mattressfactory.in" className="text-navy-700 font-semibold hover:underline">info@mattressfactory.in</a>. Our team will review your claim and respond within 5 business days.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Warranty Registration</h2>
            <p>Your warranty is automatically registered upon purchase. Keep your order confirmation email as proof of purchase for future warranty claims.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
