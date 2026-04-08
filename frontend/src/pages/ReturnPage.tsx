import { Link } from 'react-router-dom';
import bg from '../images/bg.jpg';

export default function ReturnPage() {
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
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; Return Policy
          </p>
          <h1 className="text-4xl font-bold text-white">Return Policy</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-gray-700 leading-relaxed space-y-8">

          {/* Return Policy Intro */}
          <section>
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">RETURN POLICY</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>We do not currently offer returns or exchanges. If you need to make changes, please reach out to us at info@mattressfactory.in as soon as possible after the order has been placed.</p>
            </div>
          </section>

          {/* How to Request */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">How Do I Request a Replacement?</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>In order to initiate a replacement, you must reach out to our team with a picture of the damaged merchandise at info@mattressfactory.in within 24 hours of receipt. You must notify us about the damage during the delivery. Please take pictures of the damage for our records. We cannot initiate a replacement in the following cases:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>The item is not in its original condition.</li>
                <li>The mattress has been used / slept on.</li>
                <li>The size is incorrect (Please ensure the mattress will fit in the bed before ordering).</li>
              </ul>
            </div>
          </section>

          {/* Something Apply */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">SOMETHING APPLY</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>These conditions apply to replacement requests:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>The item(s) ordered must have damage or defect as evidenced through photos of the material/fabric.</li>
                <li>The item is in its original packaging.</li>
                <li>The idea is incorrect (prior to use).</li>
              </ul>
              <p>Please email us at info@mattressfactory.in to inform us of any of the above before returning the item to us. Once Confirmed, we'll arrange for the pick-up and delivery of the replacement item at no additional cost.</p>
            </div>
          </section>

          {/* Shipping */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">SHIPPING</h2>
            <p className="text-sm text-gray-600">After the replacement request is approved, your new item will be shipped out within 5-7 business days. You will receive a shipping confirmation, with tracking information once your item ships.</p>
          </section>

          {/* Bulk/Large Orders */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">BULK/LARGE ORDERS</h2>
            <p className="text-sm text-gray-600">If you place a bulk order (more than 5 items), you will first need to pay a deposit of 50% of the total amount before we begin production. Balance payment on delivery. Minimum order quantity: 5 Items.</p>
          </section>

          {/* Manufacture Lapses */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">MANUFACTURE LAPSES</h2>
            <p className="text-sm text-gray-600">We guarantee quality products so you can shop with confidence.</p>
          </section>

          {/* What if I don't like my mattress */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">WHAT IF I DON'T LIKE MY MATTRESS?</h2>
            <p className="text-sm text-gray-600">Customer's purchase experience begins when you start browsing our store. Once a product is purchased, it is the responsibility of the buyer to ensure the suitability of the item.</p>
          </section>

          {/* Who is providing the return/replacement policy */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">WHO IS PROVIDING THE RETURN/REPLACEMENT POLICY?</h2>
            <p className="text-sm text-gray-600">We are providing the return/replacement policy for our customers.</p>
          </section>

          {/* Disclaimer */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">DISCLAIMER</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Mattressfactory.in ("Mattressfactory.In") is committed to giving high quality, affordable, durable and value for money products to our customers. You acknowledge that Mattressfactory.in has featured all the information on the Features & Condition page of the Website. You agree to have read and understood this information and acknowledge that Mattressfactory.in is not and will not be responsible for any purchases made without a good understanding of the product's condition.</p>
              <p>More Return/replace request will be accepted after inspection done by the technician.</p>
              <p className="font-semibold text-gray-700">Return cause for the mattress:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Deformity</li>
                <li>Cover Damage</li>
                <li>Glass surface irregular – both sides – in seam at edges</li>
              </ul>
              <p>When a return is used, it can be sent to our returns team for verification and the decision about an issue offer release is final.</p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">Contact Us</h2>
            <p className="text-sm text-gray-600">All Return/replace request must be sent to info@mattressfactory.in. Do not submit to the office in case of any Tampering.</p>
          </section>

          {/* Conditions */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">CONDITIONS</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Given the nature of the items we sell, the following exceptions to the standard return policy exist: In this mode of products we inspect and ensure that all products are in satisfactory condition. Goods are inspected and certified.</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Seller Condition: Eligible for Standard Return Policy and additional warranty condition based on grade.</li>
                <li>Seller Condition: "Refurbished" Eligible for Standard Return Policy.</li>
                <li>Seller Condition: "Mattressfactory.in Certified" Eligible for Extended Return Policy.</li>
                <li>Mattress Condition: "Refurbished" Eligible for Standard Return Policy and "Mattressfactory.in Certified" warranty conditions/</li>
              </ul>
            </div>
          </section>

          {/* Sulakshmi Enterprise */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">SULAKSHMI ENTERPRISE</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-700 space-y-1">
              <p>Sulakshmi Enterprise, No-29/2, Studio Road, J.b.kaval, Near Rajkumar Samadhi, Munneshwara Block, Yeshwanthpur Bangalore-560058</p>
              <p className="font-semibold mt-2">PHONE: 7760693333</p>
              <p>CONTACT: info@mattressfactory.in</p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">GOVERNING LAW</h2>
            <p className="text-sm text-gray-600">These terms and conditions will be governed by and construed in accordance with the laws applicable in INDIA and the terms, conditions and processes are subject to the exclusive jurisdiction of the courts of Bangalore.</p>
          </section>

          {/* Arbitration */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">ARBITRATION</h2>
            <p className="text-sm text-gray-600">Any dispute arising would be subjected to binding arbitration with one arbitrator selected by each party and a final arbitrator selected by the two chosen arbitrators. All parties may take Referral or other customary pre-arbitral procedures. The arbitration proceeding shall be governed by the Arbitration and Conciliation Act 1996 and the language of the arbitration shall be English.</p>
          </section>

          {/* Severability */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">SEVERABILITY</h2>
            <p className="text-sm text-gray-600">If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.</p>
          </section>

          {/* Indemnification */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">INDEMNIFICATION</h2>
            <p className="text-sm text-gray-600">The user agrees to indemnify, defend, hold harmless Mattressfactory.in for any losses, costs, expenses (including reasonable attorney fees) arising in or arising out of the use or misuse or any violation by the website, user to conduct, user's dealings or agreement under violation of any applicable laws and rules/ violation of our applicable laws, rules or regulations. This clause shall survive the expiry or termination of this user Agreement.</p>
          </section>

          {/* Modification of Terms */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">MODIFICATION OF TERMS AND CONDITIONS</h2>
            <p className="text-sm text-gray-600">Mattressfactory.in reserves all the right to revise these terms and conditions from time to time without notifying the user. The revised terms and conditions would be applicable from the date on which the revised Terms & Conditions are posted on this website. The user should discontinue using the Service, in case, if the user continues to use the Service, then the user shall be deemed to have agreed to accept and adhere to the revised Terms & Conditions of use of this Site.</p>
          </section>

          {/* Termination */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">TERMINATION</h2>
            <p className="text-sm text-gray-600">Mattressfactory.in reserves all the right to suspend or terminate the user's use of its website without giving prior notice, if Mattressfactory.in, in its sole and absolute discretion, at the Terms & Conditions has been violated. Mattressfactory.in will inform of the User of the violation of the Terms & Conditions via an email or through electronic means as deemed appropriate by Mattressfactory.in. Such apps disclose and in no particular you have actually already, to make the time and to process the matter of the notification through the relationship of the customer to adhesion.</p>
          </section>

          {/* Objectionable Material */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">OBJECTIONABLE MATERIAL</h2>
            <p className="text-sm text-gray-600">There may be some instances, where users and easy to encounter contents that are offensive, abusive, or objectionable to some people. The users may or may not necessarily know of illegal or objectionable material when it appears on a Mattressfactory.in web site and Mattressfactory.in shall not be held liable for the content that appears objectionable or abusive to you.</p>
          </section>

          {/* Disclaimer (General) */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">DISCLAIMER</h2>
            <p className="text-sm text-gray-600">All necessary endeavors have been made by Mattressfactory.in to ensure that the information provided on the website is correct. Mattressfactory.in, however, makes no warranties or guarantees in the warranty, reliability, accuracy, and completeness of the information on the website or at any point. Mattressfactory.in do make any claim to the Services that could satisfy your particular needs and requirements. The website and Services provided by Mattressfactory.in are provided "AS IS" basis and Mattressfactory.in shall not be liable to you or any other person or entity for any indirect, incidental, consequential, special or exemplary damages arising from your use or inability to use our website (or the Services). No warranty/ promise will only be made by Mattressfactory.in that could affect the Services. The arbitration proceeding shall be governed by the Arbitration and Conciliation Act 1996 and the language of the arbitration shall be English.</p>
          </section>

          {/* Links to 3rd Party Sites */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">LINKS TO 3RD PARTY SITES</h2>
            <p className="text-sm text-gray-600">Mattressfactory.in may contain to websites operated by other companies (3rd party sites). User's use of any third party sites is not governed by these terms and conditions. The third party websites are not controlled by Mattressfactory.in and therefore Mattressfactory.in is not responsible for their content or privacy policy. These links are provided to the user only as a convenience and the inclusion of any link doesn't imply any endorsement by Mattressfactory.in.</p>
          </section>

          {/* User Conduct and Rules Generally */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USER CONDUCT AND RULES GENERALLY</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>The user undertakes not to modify, copy, distribute, transmit, display, perform, reproduce, publish, create, create derivative, not issue, or use Services, or sell or other actions to change the website or any part of it. By purchasing any product, which includes purchasing, downloading or otherwise using content and any activity including the right of use for any content shall not create any private or other liability under or for any matter under Indian law.</p>
              <p>The user acknowledges not to post or publish any defamatory information or material through any means, to post or to encourage communications, not to make fraud, make comments about tampering, abusing, malicious, damaging, violates the right (right of use, or otherwise encourage conduct that would be seen in a criminal or criminal liability under Indian law.</p>
              <p>The user further agrees not to engage in marketing or other trade practices, illegal, illegal trade mark, mental, sexual, criminal, or similar or similar actions or the behavior shall be in violation of any laws or regulation for the protection of law.</p>
              <p>The user is not allowed to carry out disruptive activities including but not limited to altering or interfering with the settings or functionality of Mattressfactory.in.</p>
            </div>
          </section>

          {/* User Conduct – Don't */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USER CONDUCT – DON'T (BASIC)</h2>
            <p className="text-sm text-gray-600">The user agrees to ensure accuracy, inadequacy or negligent or any appropriate related content or statement about Mattressfactory.in and its associated any partners and stakeholders or categories using the online platform.</p>
          </section>

          {/* User Conduct – Don't (Extended) */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USER CONDUCT – DON'T (EXTENDED)</h2>
            <p className="text-sm text-gray-600">The user has not allowed to engage in collecting information or materials through any means out of (or could impose available). To use this website for any purpose that is an offence or act-offense to anyone or creates any damages, whether it's an offence, inappropriate or prohibited, or may creates nuisance, harass, damage or otherwise harm any person or entity. To use the website for any purpose that creates the right to any reasonable commercial use to include, but not limited to, and not limited to any direct or indirect cost of any sales, rental, business use of any other property or any use of any goods, approved or controlled by any party, or similar other commercial action. Files or documents from Mattressfactory.in or in such cases we may need to cancel your Order and Refund will be processed through the same mode made in 15 to 16 working days.</p>
          </section>

          {/* Unauthorized or Fraudulent Use */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">UNAUTHORIZED OR FRAUDULENT USE</h2>
            <p className="text-sm text-gray-600">To access or intended to Clause 1, the use of Mattressfactory.in is limited to first person who is at or have 18 years of age or above. By continuing to use the website, the user guarantees that he or she years above. A person below 18 years of age can use the website only under the supervision of a parent/guardian or Caregiver. Using the website without compliance will be a violation of these terms and conditions. In case user's account is being used by a minor, we reserve the rights to the user under the terms and conditions of such effect. Acceptance of such terms and conditions is regarded as fraudulent use by the user and the user is the legal responsible for any consequence of the action due to such fraudulent use.</p>
          </section>

          {/* Users Representation */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USERS REPRESENTATION</h2>
            <p className="text-sm text-gray-600">User represents that is the information provided by the user during the experience of online placing the order to up to date and correct, and complete, and that all information about particular details are provided by complete and provided you. Authorization may only provides some products may have liability for credit card losses and other financial data such as personal registration and other particular contact data which is provided to create, in such cases, some products may be harmful to a user, and in such cases, the user should make a decision and consult a doctor or qualified medical health care situation. If such product is purchased, then the product purchased is purchased in its original complete condition and the user shall be held responsible for any level of responsibility. User access as a result of the use of any product (labelled on the website data, note that Mattressfactory.in shall not be liable for this damage). Using the website without compliance with these terms and conditions is regarded as fraudulent use by the user's sole risk and responsibility and the users will use such products entirely at their sole risk and responsibility and the user is the sole legal responsible for all products as it is for any expenses in the event of supplier's problems.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
