import { Link } from 'react-router-dom';
import bg from '../images/bg.jpg';

export default function TermsPage() {
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
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; Terms &amp; Conditions of Use
          </p>
          <h1 className="text-4xl font-bold text-white">Terms &amp; Conditions of Use</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-gray-700 leading-relaxed space-y-8">

          {/* Intro */}
          <section>
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">TERMS &amp; CONDITIONS OF USE</h2>
            <p className="text-sm text-gray-600">This is Mattress Factory's website to stay in consonance with the Terms &amp; Conditions and our Privacy Policy.</p>
          </section>

          {/* Infringement Policy */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">INFRINGEMENT POLICY</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>All elements such as scripts, text, graphics, software programs, animated files, user names, user interfaces, and our entire layouts, images, are displayed on the <strong>www.mattressfactory.in</strong> Website is the exclusive property of "Mattress factory" as we reserve all of the intellectual property rights (catalogs, trademarks, logos) that are either owned by or licensed to Mattress factory. Copying of any content from the website belonging to "Mattress Factory". The use of this material does not entitle the user to make or reproduce unlimited copies of any personal information and will use the Mattress Factory's Access to the website does not grant the user any license, express or implied, to the intellectual properties of the "Mattress factory" or its distributors.</p>
              <p>"Mattress Factory" accepts the intellectual property rights of others. It does not infer that any content displayed on this website infringes a third party's property, however if you are a person who believes that your intellectual property rights have been infringed, you may submit a notification that constitutes a verifiable Infringement and therefore a violation of all requirements of Independent Security along with additional criminal law.</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Your contact information including your name, address, telephone number, email address.</li>
                <li>A digital signature or your written signature on all behalf of the person whose intellectual property rights have been infringed and is verified.</li>
                <li>Identification of the work which is believed to infringe, describing it in sufficient detail.</li>
                <li>A request that the infringement be removed or service be disabled.</li>
                <li>The details of the Alleged content matter and a description as to how the alleged subject matter is infringing on it.</li>
                <li>A statement that the information provided, which in good faith the user obliges, is subject to the finest criminal/property rights.</li>
              </ul>
              <p>The contact information in the inquiry is be in order to verify the genuineness of the claim is required to be received by the administrator at <strong>info@mattressfactory.in</strong>. If you are able to confirm this, the user is required to protect the alleged intellectual property or the alleged protected parts are taken, or if the actions taken by us are not responsible.</p>
            </div>
          </section>

          {/* Notice */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">NOTICE</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>All notices or legal rights will be sent to third websites or will be posted on the website. The users, who in future might have a failure across with the purchase of a service, it will be notifying the user right once the information is shared with you. The correct address for the business is No Sites or URL after information/proof of property authentication or to mediate for accepted.</p>
              <p>In case of any queries, the user can contact us: <a href="mailto:info@mattressfactory.in" className="text-[#1a2a6c] font-semibold hover:underline">info@mattressfactory.in</a></p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 space-y-1">
                <p className="font-bold text-gray-800">SULAKSHMI ENTERPRISE</p>
                <p>NO-29/2, STUDIO ROAD, J.B.KAVAL, NEAR RAJKUMAR SAMADHI,</p>
                <p>MUNNESHWARA BLOCK, YESHWANTHPUR BANGALORE-560058,</p>
                <p>KARNATAKA, INDIA</p>
                <p className="mt-2">CONTACT: info@mattressfactory.in</p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">GOVERNING LAW</h2>
            <p className="text-sm text-gray-600">All issues shall be solved by interpretation or regulation of this agreement.</p>
          </section>

          {/* Arbitration */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">ARBITRATION</h2>
            <p className="text-sm text-gray-600">These terms and conditions will be governed by and construed in accordance with the laws applicable in INDIA and the terms, conditions and processes are subject to the exclusive jurisdiction of the courts of Bangalore.</p>
          </section>

          {/* Arbitration (cont.) */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">ARBITRATION</h2>
            <p className="text-sm text-gray-600">Any dispute arising should be subjected to binding arbitration with one arbitrator selected by each party and a final arbitrator selected by the two chosen arbitrators. All parties may take Referral or other customary pre-arbitral procedures. The arbitration proceeding shall be governed by the Arbitration and Conciliation Act 1996 and the language of the arbitration shall be English.</p>
          </section>

          {/* Severability */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">SEVERABILITY</h2>
            <p className="text-sm text-gray-600">If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue to effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.</p>
          </section>

          {/* Indemnification */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">INDEMNIFICATION</h2>
            <p className="text-sm text-gray-600">The user agrees to indemnify, defend, hold harmless Mattressfactory.in for any losses, costs, expenses (including reasonable attorney fees) arising in or arising out of the use or misuse or any violation by the website, user to conduct, user's dealings or agreement under violation of any applicable laws, rules or regulations. This clause shall survive the expiry or termination of this User Agreement.</p>
          </section>

          {/* Modification of Terms */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">MODIFICATION OF TERMS AND CONDITIONS</h2>
            <p className="text-sm text-gray-600">Mattressfactory.in reserves all the right to revise these terms and conditions from time to time without notifying the user. The revised terms and conditions would be applicable from the date on which the revised Terms &amp; Conditions are posted on this website. The user should discontinue using the Service, in case, if the user continues to use the Service, then the user shall be deemed to have agreed to accept and adhere to the revised Terms &amp; Conditions of use of this Site.</p>
          </section>

          {/* Termination */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">TERMINATION</h2>
            <p className="text-sm text-gray-600">Mattressfactory.in reserves all the right to suspend or terminate the user's use of its website without giving prior notice, if Mattressfactory.in, in its sole and absolute discretion, at the Terms &amp; Conditions has been violated. Mattressfactory.in will inform of the User of the violation of the Terms &amp; Conditions via an email or through electronic means as deemed appropriate by Mattressfactory.in. Such apps disclose and in no particular you have actually already, to make the time and to process the matter of the notification through the relationship of the customer to adhesion.</p>
          </section>

          {/* Objectionable Material */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">OBJECTIONABLE MATERIAL</h2>
            <p className="text-sm text-gray-600">There may be some instances, where users and easy to encounter contents that are offensive, abusive, or objectionable to some people. The users may or may not necessarily know of illegal or objectionable material when it appears on a Mattressfactory.in web site and Mattressfactory.in shall not be held liable for the content that appears objectionable or abusive to you.</p>
          </section>

          {/* Disclaimer */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">DISCLAIMER</h2>
            <p className="text-sm text-gray-600">All necessary endeavors have been made by Mattressfactory.in to ensure that the information provided on the website is correct. Mattressfactory.in, however, makes no warranties or guarantees in the warranty, reliability, accuracy, and completeness of the information on the website or at any point. Mattressfactory.in does not make any claim to the Services that could satisfy your particular needs and requirements. The website and Services are provided by Mattressfactory.in on an "as is" basis and Mattressfactory.in shall not be liable to you or any other person or entity for any indirect, incidental, consequential, special or exemplary damages arising from your use or inability to use our website (or the Services). No warranty will only be made by Mattressfactory.in that could affect the Services. Mattressfactory.in makes no claims for any beneficial communications or any other marketing ideas. Mattressfactory.in makes no claims for any content or other information in respect of the website that may arise including any act/omit. Mattressfactory.in is a malicious virus beyond the control of Mattressfactory.in.</p>
          </section>

          {/* Links to 3rd Party Sites */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">LINKS TO 3RD PARTY SITES</h2>
            <p className="text-sm text-gray-600">Mattressfactory.in may contain to websites operated by other companies (3rd party sites). User's use of any such third party sites is not governed by these terms and conditions. The third-party websites are not controlled by Mattressfactory.in and therefore Mattressfactory.in is not responsible for their content or their privacy policy. These links are provided to the user only as a convenience and the inclusion of any link doesn't imply any endorsement by Mattressfactory.in.</p>
          </section>

          {/* User Conduct and Rules Generally */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USER CONDUCT AND RULES GENERALLY</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>The user undertakes not to modify, copy, distribute, transmit, display, perform, reproduce, publish, create, create derivative, not issue, or use Services, or sell or other actions to change the website or any part of it. By purchasing any product, which includes purchasing, downloading, or otherwise using content and any activity including the right of use for any content shall not create any private or other liability under or for any matter under Indian law.</p>
              <p>The user acknowledges not to post or publish any defamatory information or material through any means to post or to encourage communications, not to make fraud, make comments about tampering, abusing, malicious, damaging, violates the right (right of use, or otherwise encourage conduct that would be seen in a criminal or criminal liability under Indian law.</p>
              <p>The user further agrees not to engage in marketing or other trade practices, illegal trade mark, mental, sexual, criminal, or similar or similar actions or the behavior shall be in violation of any laws or regulation for the protection of law.</p>
              <p>The user is not allowed to carry out disruptive activities including but not limited to altering or interfering with the settings or functionality of Mattressfactory.in.</p>
            </div>
          </section>

          {/* User Conduct – Pre Order */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USER CONDUCT – PRE ORDER (MATTRESS)</h2>
            <p className="text-sm text-gray-600">The user agrees to ensure accuracy, inadequacy or negligent or any appropriate related content or statement about Mattressfactory.in and its associated any partners and operations of any property owned by Mattressfactory.in.</p>
          </section>

          {/* Unauthorised or Fraudulent Use */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">UNAUTHORISED OR FRAUDULENT USE</h2>
            <p className="text-sm text-gray-600">As already mentioned in Clause 1, the use of Mattressfactory.in is limited to first person who is at or have 18 years of age or above. By continuing to use the website, the user guarantees that he or she 18 years above. A person below 18 years of age can use the website only under the supervision of a parent/guardian or Caregiver. Using the website without compliance will be a violation of these terms and conditions. Prohibited activities have been elaborated in the existing as stated here include all the rights of the authorized user on the website as elaborated above, unauthorized use is regarded as fraudulent use. In case user's account is being used by a minor, we reserve the legal responsible for any consequence of the action due to such fraudulent use.</p>
          </section>

          {/* Users Representation */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">USERS REPRESENTATION</h2>
            <p className="text-sm text-gray-600">User represents that the information provided by the user during the experience of online placing the order is up to date and current and consistent, and this set of related and personal details are provided to you are complete and correct and up to date. The user agrees to ensure accuracy by the Mattressfactory.in you are a user and not a member of those Products. Based on the user's allergic or medical conditions, you should take appropriate, fair regulations, as shown. The user acknowledges that the Products of the Mattressfactory.in does not provide you with any other kind of suggestion, and therefore, the user should purchase the product which is harmful. Mattressfactory.in would not be held responsible for any level of liability/loss. User access as a result of the use of any product labelled on the website data, note that Mattressfactory.in shall not be liable for this damage. Using the website without compliance is regarded as fraudulent consumption of any product from "Mattressfactory.in". The products listed on the website are of "mattressfactory.in" moreover. Mattressfactory.in assumes no responsibilities in liabilities in the event of supplier's problems.</p>
          </section>

          {/* Prices and Terms of Payment */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">PRICES AND TERMS OF PAYMENT</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>All the products listed on the website will be sold at the prices maintained on the website. All the prices are in Indian currency (i.e. rupees). Unless stated otherwise, the service prices on the website are inclusive of shipping and delivery charges. The user agrees to place the order on the website in Indian Rupee. Price changes are given time-to-time. In the event of price changes on the website, the user agrees that Mattressfactory.in reserves the right to make adjustments in the quoted price or the listing of the product with all adjustments, tax regulations, as shown. The user acknowledges that the Products of the Mattressfactory.in is subject to change, effective on the stated date. The user shall to purchase the product which is currently on our website to which act on the said promised order. The user should ask, and if the user changes or orders the orders that are not made, the user will be obligated to purchase this price or the website or any additional cost, if and when applicable. Please note that prices change regularly on the portal based on demand and on availability.</p>
              <p>Mattressfactory.in reserves all the right to change the prices for the services of its product or its website at any time without notice. The said discounts to the said prices on the website are offered to encourage a purchase. The user should notify/contact the website for its current or particular pricing of the product, to process the online order to address the exchange of the currency. When placing the order, the purchase shall be done as per GST.</p>
            </div>
          </section>

          {/* Account Password and Security */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">ACCOUNT PASSWORD AND SECURITY</h2>
            <p className="text-sm text-gray-600">The user may be required to register and sign in to your account with the website. The user should take all appropriate measures to protect the password and shall be responsible for all activities that occur through your account. The users should take note that, in cases of any breach in the safety of the account, immediately notify Mattressfactory.in of any unauthorized use of the amount of password. In case of any damage or losses Mattressfactory.in reports, the user's failure to comply with this provision, Mattressfactory.in shall not be held liable.</p>
          </section>

          {/* Eligibility Criteria */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">ELIGIBILITY CRITERIA</h2>
            <p className="text-sm text-gray-600">The use of this website is limited to person(s) who are above the age of 18 years and are capable of forming a contract under the Indian Contract Act, 1872. By operating on use the website, the user guarantees that they are over 18 years of age. In case you are below 18 years, however wish to use this website, kindly use it under the supervision of a parent or legal guardian as applicable. A parent or legal guardian can provide their such parent or guardian accepts the terms and conditions.</p>
          </section>

          {/* Services Overview */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">SERVICES OVERVIEW</h2>
            <p className="text-sm text-gray-600">The website "Mattressfactory.in" is operated by "COMIC". The website "Mattressfactory.in" is a non-stop shop provider to repair Certified Mattressfactory.in is an online store that gives you an online shopping and delivery service experience, of most comfortable quality mattress. Mattressfactory.in's website deals include Mattress delivery-less Support and warranty services as per company terms.</p>
          </section>

          {/* Introduction */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">INTRODUCTION</h2>
            <p className="text-sm text-gray-600">The following terms and conditions regulate the use of this website. By continuing to use the website, you agree to follow these terms and conditions. If you do not want to be bound by these terms and conditions, with effect from of these terms, you may not continue to use the website. By using the Service, the user will agree to the Terms and Conditions and the Privacy policy, and by the website will have exclusive on-system of the Services of their website.</p>
          </section>

          {/* Contact Us */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-[#1a2a6c] mb-3">Contact Us</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-700 space-y-1">
              <p className="font-bold text-gray-800 text-base mb-2">Mattress Factory – Sulakshmi Enterprise</p>
              <p>No-29/2, Studio Road, J.B. Kaval, Near Rajkumar Samadhi,</p>
              <p>Munneshwara Block, Yeshwanthpur Bangalore – 560058, Karnataka, India</p>
              <p className="pt-2">
                Email:{' '}
                <a href="mailto:info@mattressfactory.in" className="text-[#1a2a6c] font-semibold hover:underline">info@mattressfactory.in</a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+917760693333" className="text-[#1a2a6c] font-semibold hover:underline">+91-7760693333</a>
                {' | '}
                <a href="tel:+919448086545" className="text-[#1a2a6c] font-semibold hover:underline">+91-9448086545</a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
