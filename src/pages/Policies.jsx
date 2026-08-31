import { useEffect } from 'react';
import SEO from '../components/SEO';
import PageBanner from '../components/PageBanner';

export default function Policies({ type }) {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const policyData = {
    'return': {
      title: 'Return Policy',
      description: 'Learn about our 7-day hassle-free return policy for premium teas.',
      content: (
        <>
          <h3 className="text-xl font-bold text-vento-forest mb-4">7-Day Return Window</h3>
          <p className="mb-6">At Vento Tea, we pride ourselves on delivering the finest and freshest teas directly from the estates. If you are not completely satisfied with your purchase, we offer a 7-day return policy from the date of delivery.</p>
          
          <h3 className="text-xl font-bold text-vento-forest mb-4">Conditions for Return</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>The tea packaging must be unopened, sealed, and in its original condition.</li>
            <li>Due to health and safety regulations, we cannot accept returns on opened tea packets.</li>
            <li>Accessories or gift boxes must be returned with all original tags and protective materials.</li>
          </ul>

          <h3 className="text-xl font-bold text-vento-forest mb-4">How to Initiate a Return</h3>
          <p className="mb-6">Contact our support team at <strong>support@ventotea.com</strong> with your Order ID and reason for return. We will arrange a reverse pickup within 2-4 business days.</p>
        </>
      )
    },
    'refund': {
      title: 'Refund Policy',
      description: 'Understanding our refund processing times and methods.',
      content: (
        <>
          <h3 className="text-xl font-bold text-vento-forest mb-4">Refund Processing</h3>
          <p className="mb-6">Once your return is received and inspected at our warehouse, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed immediately.</p>
          
          <h3 className="text-xl font-bold text-vento-forest mb-4">Timeline</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li><strong>Credit/Debit Cards:</strong> 5-7 business days depending on your bank.</li>
            <li><strong>UPI / Wallets:</strong> 24-48 hours.</li>
            <li><strong>Cash on Delivery:</strong> You will be asked to provide bank details or UPI ID for a direct transfer (processed within 3 business days).</li>
          </ul>

          <h3 className="text-xl font-bold text-vento-forest mb-4">Damaged Items</h3>
          <p className="mb-6">If your order arrived damaged, please write to us immediately with photos of the damaged box. We will issue a 100% full refund or a free replacement without requiring a return.</p>
        </>
      )
    },
    'terms': {
      title: 'Terms of Use',
      description: 'Terms and conditions for using the Vento Tea website and purchasing our products.',
      content: (
        <>
          <h3 className="text-xl font-bold text-vento-forest mb-4">1. Acceptance of Terms</h3>
          <p className="mb-6">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Vento Tea (Redplum Private Ltd.) reserves the right to modify these terms at any time.</p>
          
          <h3 className="text-xl font-bold text-vento-forest mb-4">2. Product Descriptions</h3>
          <p className="mb-6">We strive to ensure that all details, descriptions, and prices of products appearing on the website are accurate. However, errors may occur. If we discover an error in the price of any goods you ordered, we will inform you and give you the option of reconfirming your order at the correct price or cancelling it.</p>

          <h3 className="text-xl font-bold text-vento-forest mb-4">3. Intellectual Property</h3>
          <p className="mb-6">All content included on this site, such as text, graphics, logos, images, and software, is the property of Vento Tea or its content suppliers and protected by international copyright laws.</p>
        </>
      )
    },
    'privacy': {
      title: 'Privacy Policy',
      description: 'How we protect and use your personal information at Vento Tea.',
      content: (
        <>
          <h3 className="text-xl font-bold text-vento-forest mb-4">Information We Collect</h3>
          <p className="mb-6">When you purchase something from our store, we collect the personal information you give us such as your name, address, and email address. When you browse our store, we also automatically receive your computer’s IP address to help us learn about your browser and operating system.</p>
          
          <h3 className="text-xl font-bold text-vento-forest mb-4">Consent</h3>
          <p className="mb-6">How do you get my consent? When you provide us with personal information to complete a transaction, verify your credit card, place an order, or arrange for a delivery, we imply that you consent to our collecting it and using it for that specific reason only.</p>

          <h3 className="text-xl font-bold text-vento-forest mb-4">Data Security</h3>
          <p className="mb-6">To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed. Your payment details are encrypted using secure socket layer technology (SSL).</p>
        </>
      )
    }
  };

  const currentPolicy = policyData[type] || policyData['terms'];

  return (
    <div className="pb-24 bg-vento-cream min-h-screen">
      <SEO 
        title={currentPolicy.title} 
        description={currentPolicy.description} 
        keywords={`${currentPolicy.title.toLowerCase()}, vento tea policies, terms and conditions`} 
      />

      <PageBanner
        eyebrow="Legal"
        title={currentPolicy.title}
        imagePath="/brand/media_1787993346176.png"
      />

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-white p-8 md:p-16 rounded-xl shadow-sm border border-vento-cream-dark text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-400 mb-8 pb-4 border-b border-gray-100">Last updated: August 2026</p>
          {currentPolicy.content}
          
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">If you have any further questions regarding this policy, please reach out to us at <a href="mailto:support@ventotea.com" className="text-vento-gold hover:underline">support@ventotea.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
