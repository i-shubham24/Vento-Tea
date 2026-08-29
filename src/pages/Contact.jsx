import SEO from '../components/SEO';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function Contact() {
  return (
    <div className="pb-20 bg-vento-cream min-h-[80vh]">
      <SEO title="Contact Us" description="Get in touch with the Vento Tea team for support and wholesale inquiries." keywords="contact vento tea, customer support" />
      <PageBanner
        eyebrow="We're here to help"
        title="Get in Touch"
        subtitle="Whether you have a question about our blends, your order, or just want to say hello, we're here for you."
        imagePath="/brand/media_1787991645100.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
          
          {/* Contact Details & Map */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-vento-forest font-semibold">Contact Information</h2>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-vento-gold shadow-sm shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-vento-forest text-lg">Our Estate Hub</h4>
                  <p className="text-gray-600 mt-1">123 Tea Garden Road,<br />Jorhat, Assam 785001,<br />India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-vento-gold shadow-sm shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-vento-forest text-lg">Phone</h4>
                  <p className="text-gray-600 mt-1">+91 98765 43210<br />Mon-Fri, 9am - 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-vento-gold shadow-sm shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-vento-forest text-lg">Email</h4>
                  <p className="text-gray-600 mt-1">support@ventotea.com</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-md bg-gray-200 relative">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=94.185%2C26.745%2C94.225%2C26.765&amp;layer=mapnik&amp;marker=26.755%2C94.205"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                title="Vento Tea Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-vento-cream-dark h-fit">
            <h2 className="text-2xl font-serif text-vento-forest font-semibold mb-6">Send us a Message</h2>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <div>
                <label className="block text-sm font-medium text-vento-forest mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-vento-gold focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vento-forest mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-vento-gold focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vento-forest mb-2">Subject</label>
                <select className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-vento-gold focus:bg-white transition-colors">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Wholesale</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-vento-forest mb-2">Message</label>
                <textarea 
                  required
                  rows="5"
                  placeholder="How can we help you?"
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-vento-gold focus:bg-white transition-colors resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-vento-forest hover:bg-vento-forest-light text-vento-cream font-bold py-4 rounded-full transition-colors shadow-md mt-2">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
