import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import bg from '../images/bg.jpg';

const faqs = [
  {
    q: 'DO YOU MAKE MATTRESS OF CUSTOMIZED SIZE?',
    a: 'Yes, we do make mattresses of customized sizes. Please contact us with your required dimensions and we will provide you with a quote. Custom size mattresses may take additional time for manufacturing and delivery.',
  },
  {
    q: 'SHOULD I BUY A HARD OR SOFT MATTRESS?',
    a: 'The choice between a hard and soft mattress depends on your sleeping position and personal preference. Back and stomach sleepers generally benefit from a firmer mattress for proper spinal alignment, while side sleepers may prefer a softer mattress to cushion the shoulders and hips. We recommend visiting our showroom to try different options.',
  },
  {
    q: 'HOW DO I CLEAN MY MATTRESS?',
    a: 'To clean your mattress, spot-clean stains with a mild detergent and cold water. Avoid soaking the mattress. Use a mattress protector to prevent stains. Vacuum the surface regularly to remove dust and allergens. Air it out periodically to keep it fresh.',
  },
  {
    q: 'DO I NEED TO REPLACE MY BASE ALSO?',
    a: 'Not necessarily. However, if your base is old, damaged, or incompatible with your new mattress type (e.g., a slatted base with wide gaps for a foam mattress), it may reduce the life and performance of your new mattress. We recommend checking the condition of your base before purchase.',
  },
  {
    q: 'HOW OFTEN SHOULD MATTRESSES BE REPLACED?',
    a: 'On average, a good quality mattress lasts 7–10 years. However, this depends on the quality of materials and how well it is maintained. If you notice sagging, discomfort, or sleep disturbances, it may be time to replace your mattress.',
  },
  {
    q: 'DO I NEED A NEW MATTRESS?',
    a: 'You may need a new mattress if you wake up with aches and pains, your mattress is visibly sagging, you sleep better elsewhere, or your mattress is over 7 years old. A good mattress is essential for quality sleep and overall health.',
  },
  {
    q: "WHAT'S THE RIGHT AMOUNT OF SLEEP?",
    a: 'Adults generally need 7–9 hours of sleep per night. Teenagers need about 8–10 hours, and young children need even more. Quality of sleep is just as important as quantity — a comfortable mattress plays a key role in achieving restful sleep.',
  },
  {
    q: 'WHY IS SLEEP IMPORTANT?',
    a: 'Sleep is essential for physical health, mental well-being, and overall quality of life. It helps repair muscles, consolidate memory, regulate hormones, and strengthen the immune system. Chronic sleep deprivation can lead to serious health issues.',
  },
  {
    q: 'IS NAPPING GOOD OR BAD?',
    a: 'Short naps of 10–20 minutes can improve alertness, mood, and performance. However, long or irregular napping can negatively affect nighttime sleep quality. Napping is generally beneficial as long as it does not interfere with your regular sleep schedule.',
  },
  {
    q: 'DOES THE MATTRESS AFFECT HOW A PERSON SLEEPS?',
    a: 'Absolutely. The right mattress provides proper spinal alignment, pressure relief, and comfort — all of which are crucial for deep, restorative sleep. A poor-quality or worn-out mattress can lead to back pain, restlessness, and poor sleep quality.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS?',
    a: 'The best mattress is one that suits your body type, sleeping position, and comfort preference. Memory foam, latex, pocket spring, and hybrid mattresses each have their own benefits. We offer a wide range to help you find your perfect match.',
  },
  {
    q: 'CAN I VIEW MATTRESS ONLINE OR A REAL STORE?',
    a: 'Yes! You can browse our full collection online at www.mattressfactory.in. We also have a showroom where you can try mattresses in person. Visit us at Sulakshmi Enterprise, No-29/2, Studio Road, J.B. Kaval, Yeshwanthpur, Bangalore.',
  },
  {
    q: 'HOW CAN I KNOW, IF I NEED A NEW MATTRESS?',
    a: 'Signs you need a new mattress include: waking up with stiffness or pain, visible sagging or lumps, allergies worsening, sleeping better in hotels or on other mattresses, or your mattress being over 7–8 years old.',
  },
  {
    q: 'WHAT IS THE BEST TYPE OF MATTRESS FOR A CHILD?',
    a: 'For children, a medium-firm mattress is generally recommended as it supports growing bones and joints. Foam or coir mattresses with breathable fabric are popular choices. Avoid overly soft mattresses for young children.',
  },
  {
    q: 'WHAT TYPE OF MATTRESS IS RECOMMENDED FOR OVERWEIGHT PEOPLE?',
    a: 'For heavier individuals, a firm to extra-firm mattress with high-density foam or pocket spring system is recommended. These provide better support, durability, and prevent excessive sinking. Our rebonded foam and pocket spring mattresses are ideal choices.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR PEOPLE WHO SLEEP ON THEIR STOMACHS?',
    a: 'Stomach sleepers need a firmer mattress to keep the spine aligned and prevent the hips from sinking too deep. A medium-firm to firm foam or spring mattress works best for this sleeping position.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR A SIDE SLEEPER?',
    a: 'Side sleepers need a mattress that cushions the shoulders and hips while keeping the spine aligned. A medium to medium-soft memory foam or latex mattress is ideal for side sleepers.',
  },
  {
    q: 'WHAT MATTRESS IS RECOMMENDED FOR A BAD BACK?',
    a: 'For back pain, a medium-firm mattress that supports the lumbar region without being too hard is recommended. Memory foam and orthopaedic mattresses are excellent choices as they distribute weight evenly and relieve pressure points.',
  },
  {
    q: 'WHAT KIND OF QUALITY CHECKS DO YOU HAVE?',
    a: 'Every mattress at Mattress Factory undergoes rigorous quality checks including material inspection, density verification, stitching and quilting quality, and final product testing before dispatch. We are committed to delivering only the best quality products.',
  },
  {
    q: 'DO YOU HAVE A SHOWROOM?',
    a: 'Yes, we have a showroom at Sulakshmi Enterprise, No-29/2, Studio Road, J.B. Kaval, Near Rajkumar Samadhi, Munneshwara Block, Yeshwanthpur, Bangalore – 560058. You are welcome to visit and try our mattresses.',
  },
  {
    q: 'WHAT ARE THE BENEFITS TO OWNING A MATTRESS FROM www.mattressfactory.in?',
    a: 'Shopping with us gives you access to factory-direct pricing, high-quality materials, customization options, free pan-India delivery, and excellent after-sales support. We cut out middlemen to give you the best value for your money.',
  },
  {
    q: 'WHAT IS VISCOELASTIC FOAM?',
    a: 'Viscoelastic foam, commonly known as memory foam, is a temperature-sensitive material that molds to the shape of your body in response to heat and pressure. It provides excellent pressure relief and motion isolation, making it great for couples and those with joint pain.',
  },
  {
    q: 'WHAT TYPES OF MATTRESSES ARE MANUFACTURED?',
    a: 'We manufacture a wide range of mattresses including Coir, Foam, Rebonded Foam, Memory Foam, Latex Foam, Hybrid, Pocket Spring, Bonnell Spring, Euro Top, and Orthopaedic mattresses to suit every need and budget.',
  },
  {
    q: 'WHAT IS THE DIFFERENCE BETWEEN MEMORY FOAM MATTRESS AND DUAL COMFORT MATTRESS?',
    a: 'A memory foam mattress has a single comfort level that conforms to your body shape. A dual comfort mattress is reversible, with one firm side and one soft side, allowing you to flip it based on your comfort preference or season.',
  },
  {
    q: 'WHY DO OUR MEMORY FOAM MATTRESSES COST SO LOW?',
    a: 'We are a direct-from-factory brand, which means we eliminate distributor and retailer markups. This allows us to offer premium quality memory foam mattresses at significantly lower prices compared to retail stores.',
  },
  {
    q: 'TELL ME MORE ABOUT THE MATTRESSFACTORY.IN MATTRESSES',
    a: 'Mattressfactory.in is a direct-to-consumer mattress brand based in Bangalore. We manufacture and sell a wide range of premium mattresses at factory prices. Our products are made with high-quality materials and undergo strict quality checks before delivery.',
  },
  {
    q: 'WHERE ARE THE MATTRESSES SHIPPED FROM?',
    a: 'All mattresses are manufactured and shipped from our factory in Bangalore, Karnataka, India. We ship Pan India with free delivery.',
  },
  {
    q: 'HOW MUCH DOES SHIPPING COST?',
    a: 'Shipping is completely free on all orders across India. There are no hidden charges or delivery fees.',
  },
  {
    q: 'WHAT IS A SPLIT SIZE MATTRESS',
    a: 'A split size mattress is a mattress that is made in two separate halves to fit a large bed. This is especially useful for couples with different comfort preferences, as each half can be customized independently.',
  },
  {
    q: 'HOW IS LATEX DIFFERENT THAN MEMORY FOAM?',
    a: 'Latex is a natural, springier material that responds quickly and sleeps cooler. Memory foam is slow-response and contours closely to the body, excelling at pressure relief. Latex is more durable and eco-friendly, while memory foam offers superior motion isolation.',
  },
  {
    q: 'WHY ARE THERE MULTIPLE LAYERS OF FOAM IN MEMORY FOAM AND LATEX FOAM BEDS?',
    a: 'Multiple layers serve different purposes — the top comfort layer provides cushioning and pressure relief, middle transition layers offer support and reduce motion transfer, and the base layer provides the overall durability and structural support of the mattress.',
  },
  {
    q: 'WHAT IS THE DIFFERENCE BETWEEN TRADITIONAL INNERSPRING MATTRESSES AND FOAM MATTRESSES?',
    a: 'Innerspring mattresses use metal coils for support, offering a bouncier feel and better airflow. Foam mattresses provide better pressure relief, motion isolation, and contouring. Hybrid mattresses combine both for a balanced experience.',
  },
  {
    q: 'HINTS AND TIPS FOR MATTRESS SHOPPING',
    a: 'Consider your sleeping position, body weight, and any specific health needs. Try before you buy if possible. Check the warranty and return policy. Look for high-density foam or individually wrapped springs for better durability. Read reviews and compare specifications carefully.',
  },
  {
    q: 'DO YOU MAKE CUSTOM SIZES?',
    a: 'Yes, we specialize in custom size mattresses. Whether you need an unusual size for a boat, caravan, antique bed, or specific room dimensions, we can manufacture it. Contact us with your measurements for a quote.',
  },
  {
    q: 'IS THERE AN ADJUSTMENT, OR BREAK-IN PERIOD?',
    a: 'Yes, most new mattresses require a break-in period of 30–60 days. During this time, your body adjusts to the new feel and the mattress softens slightly to its intended comfort level. It is normal to feel slightly different from what you expected initially.',
  },
  {
    q: 'HOW CAN A CONSUMER COMPARE MATTRESSES AT MG OR MORE STORES THAT SELL THE SAME BRAND?',
    a: 'Ask for the specific model name, foam density, spring count, and warranty details. Compare these specifications across stores. Be wary of exclusive "store models" that may differ slightly. Always compare on a like-for-like basis.',
  },
  {
    q: 'HOW DO I PROTECT MY NEW MATTRESS FROM DUST MITES OR MOISTURE?',
    a: 'Use a good quality waterproof mattress protector. Vacuum your mattress regularly. Air it out every few months. Keep your bedroom well-ventilated and maintain appropriate humidity levels. Wash bedding regularly in hot water.',
  },
  {
    q: 'SHOULD I GIVE MY OLD BEDDING TO MY CHILD OR PUT IT IN MY RENTAL PROPERTY?',
    a: 'Old mattresses may harbor dust mites, allergens, and bacteria, and may lack proper support. It is generally not recommended to pass on old mattresses to children or tenants. A new, age-appropriate mattress ensures better sleep health.',
  },
  {
    q: 'HOW MUCH SHOULD I SPEND FOR A BED?',
    a: 'The right amount to spend depends on your budget and needs. However, a good mattress is a long-term investment in your health. At Mattress Factory, we offer premium quality mattresses across a wide price range to suit every budget.',
  },
  {
    q: 'WHAT IS THE PURPOSE OF FLIPPING AND TURNING THE MATTRESS PERIODICALLY?',
    a: 'Rotating your mattress every 3–6 months ensures even wear and extends its lifespan. Some double-sided mattresses can also be flipped. This prevents permanent indentations and keeps the mattress comfortable for longer.',
  },
  {
    q: "WHY DON'T MY LINENS FIT MY NEW MATTRESS?",
    a: 'Newer mattresses, especially memory foam and pillow-top models, tend to be thicker than older ones. You may need deep-pocket fitted sheets (usually labeled for mattresses 12–18 inches deep) to properly fit your new mattress.',
  },
  {
    q: 'WHAT SHOULD I DO IF THERE IS ODOR COMING FROM MY MATTRESS?',
    a: 'A slight off-gassing odor is normal for new foam mattresses and usually dissipates within a few days. Air the mattress out in a well-ventilated room. Sprinkle baking soda on the surface, let it sit for a few hours, then vacuum it off.',
  },
  {
    q: 'AM I REQUIRED TO ROTATE/FLIP MY MATTRESS?',
    a: 'We recommend rotating your mattress 180 degrees every 3–6 months for even wear. Some of our mattresses are single-sided and should not be flipped. Check the product instructions or contact us for specific guidance.',
  },
  {
    q: 'WHAT IS MEMORY FOAM?',
    a: 'Memory foam (viscoelastic foam) is a type of polyurethane foam that is sensitive to temperature and pressure. It softens with body heat and molds to your shape, providing customized support and pressure relief. It was originally developed by NASA.',
  },
  {
    q: 'WHAT ARE THE BENEFITS OF MEMORY FOAM MATTRESS?',
    a: 'Memory foam mattresses offer excellent pressure relief, motion isolation, spinal alignment support, and are hypoallergenic. They are ideal for people with joint pain, back pain, or those who share a bed with a restless partner.',
  },
  {
    q: 'HOW DOES MEMORY FOAM WORK?',
    a: 'Memory foam reacts to your body heat and weight by softening and contouring to your body shape. When you move or get up, it slowly returns to its original shape. This slow-response property provides consistent support throughout the night.',
  },
  {
    q: 'WHAT DO THE DENSITIES OF MEMORY FOAM MEAN?',
    a: 'Foam density is measured in kg/m³. Higher density foam (40–50+ kg/m³) is more durable and provides better support, while lower density foam is softer and less expensive. We use premium high-density foam in our mattresses for lasting comfort.',
  },
  {
    q: 'IS LATEX FOAM HOT TO SLEEP ON?',
    a: 'Natural latex foam has an open-cell structure and pin-hole ventilation that promotes airflow, making it one of the cooler sleeping surfaces among foam mattresses. It is significantly cooler than traditional memory foam.',
  },
  {
    q: 'IS LATEX A NATURAL PRODUCT?',
    a: 'Yes, natural latex is derived from the sap of rubber trees (Hevea brasiliensis). It is biodegradable, eco-friendly, and hypoallergenic. We also offer synthetic and blended latex options at different price points.',
  },
  {
    q: 'IS A LATEX MATTRESS GOOD?',
    a: 'Yes, latex mattresses are excellent. They offer natural support, responsiveness, durability, and are resistant to dust mites and mold. Natural latex mattresses can last 15–20 years with proper care, making them a great long-term investment.',
  },
  {
    q: 'WHAT CAUSES PEOPLE TO BE ALLERGIC TO LATEX?',
    a: 'Latex allergy is caused by proteins found in natural rubber latex. People with latex allergies may experience skin irritation or respiratory issues. If you have a known latex allergy, we recommend our memory foam or coir mattresses instead.',
  },
  {
    q: 'WHAT IS LATEX FOAM?',
    a: 'Latex foam is a resilient, buoyant foam made from the sap of rubber trees or through a synthetic process. It provides a responsive, springy feel, excellent durability, and natural resistance to dust mites and mold.',
  },
  {
    q: 'WHAT IS BONNEL SPRING MATTRESS?',
    a: 'A Bonnell spring mattress uses an interconnected coil system — the traditional innerspring design. The coils are hourglass-shaped and tied together, providing a bouncy, supportive feel. They are durable and generally more affordable than pocket spring mattresses.',
  },
  {
    q: 'WHAT IS BONNEL COIL SYSTEM IN A MATTRESS?',
    a: 'The Bonnell coil system consists of hourglass-shaped steel springs that are interconnected with helical wires. This creates a firm, supportive surface that distributes weight across the entire mattress. It is one of the oldest and most widely used spring systems.',
  },
  {
    q: 'WHAT IS A POCKETED COIL SPRING MATTRESS?',
    a: 'A pocket spring mattress contains individually wrapped coils, each enclosed in its own fabric pocket. These coils move independently, providing targeted support and excellent motion isolation — making it ideal for couples.',
  },
  {
    q: 'WHAT IS A POCKET SPRING MATTRESS?',
    a: 'A pocket spring mattress is a type of innerspring mattress where each coil is individually encased in fabric. This allows each spring to respond independently to pressure, providing personalized support and reducing motion transfer between sleeping partners.',
  },
  {
    q: 'WHAT IS AN INNERSPRING MATTRESS?',
    a: 'An innerspring mattress has a core of steel coils or springs that provide support. They are known for their bouncy feel, good airflow, and durability. Modern innerspring mattresses often include comfort layers of foam or fiber on top.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR BACK AND NECK PAIN?',
    a: 'For back and neck pain, a medium-firm mattress that supports the natural curve of the spine is ideal. Memory foam and orthopaedic mattresses work particularly well as they conform to the body and relieve pressure points that cause pain.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR BACK PAIN?',
    a: 'The best mattress for back pain provides firm support while contouring to the spine\'s natural curves. Our orthopaedic, rebonded foam, and pocket spring mattresses are specially designed to alleviate back pain and promote proper posture during sleep.',
  },
  {
    q: 'ARE FIRM MATTRESSES GOOD FOR SIDE SLEEPERS?',
    a: 'No, firm mattresses are generally not ideal for side sleepers. Side sleepers need cushioning at the shoulders and hips. A medium to medium-soft mattress is recommended for side sleepers to maintain spinal alignment without creating pressure points.',
  },
  {
    q: 'IS IT BAD FOR YOU TO SLEEP ON YOUR STOMACH',
    a: 'Sleeping on your stomach can put strain on your neck and lower back. If you prefer this position, a firm mattress helps keep your spine aligned. A thin or no pillow is also recommended to reduce neck strain.',
  },
  {
    q: 'IS IT BETTER TO SLEEP ON YOUR LEFT OR RIGHT?',
    a: 'Sleeping on the left side is generally recommended by health professionals as it can improve digestion, reduce heartburn, and is beneficial during pregnancy. However, the most important factor is a comfortable mattress that supports your preferred sleep position.',
  },
  {
    q: 'CAN YOU NEGOTIATE THE PRICE OF A MATTRESS?',
    a: 'At Mattress Factory, we offer transparent factory-direct pricing with the best value built in. We regularly run promotions and discounts. You can contact us directly for bulk orders, B2B pricing, or any special requirements.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; FAQ
          </p>
          <h1 className="text-4xl font-bold text-white">FAQ</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-gray-200">
              <button
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
                  openIndex === i ? 'bg-[#1a2a6c] text-white' : 'bg-[#1a2a6c]/90 text-white hover:bg-[#1a2a6c]'
                }`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-sm pr-4">+ {faq.q}</span>
                {openIndex === i
                  ? <ChevronUp className="w-4 h-4 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 flex-shrink-0" />
                }
              </button>
              {openIndex === i && (
                <div className="bg-white px-5 py-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-4">Our sleep experts are here to help you find the perfect mattress.</p>
          <Link
            to="/contact"
            className="inline-block bg-[#1a2a6c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f1d4f] transition-colors text-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
