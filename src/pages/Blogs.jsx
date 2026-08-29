import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageBanner from '../components/PageBanner';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Blogs() {
  const blogs = [
    {
      id: 1,
      title: "The Heritage of Assam: A Journey to Our Roots",
      excerpt: "Discover the lush, misty estates where every Vento tea leaf begins its journey. We travel deep into the heart of Assam to bring you a story of tradition, hard work, and the unmatched aroma of the world's finest tea gardens.",
      date: "August 12, 2026",
      image: "/brand/process.jpg",
      category: "Heritage",
      featured: true
    },
    {
      id: 2,
      title: "5 Wellness Benefits of Authentic Chai Spices",
      excerpt: "From immunity-boosting ginger to antioxidant-rich cardamom, learn why our 100% natural spices do more than just taste good.",
      date: "August 5, 2026",
      image: "/brand/hero-chai.jpg",
      category: "Wellness"
    },
    {
      id: 3,
      title: "Mastering the Art of the Perfect Brew",
      excerpt: "Temperature, time, and technique. The ultimate step-by-step guide to brewing Vento Gold like a professional tea sommelier.",
      date: "July 28, 2026",
      image: "/brand/cup.jpg",
      category: "Guide"
    },
    {
      id: 4,
      title: "Sustainable Packaging: Our Promise to the Planet",
      excerpt: "Why we choose vacuum sealing and eco-friendly materials to protect both the pristine flavor of our leaves and the environment.",
      date: "July 15, 2026",
      image: "/brand/trust-products.jpg",
      category: "Sustainability"
    }
  ];

  const featuredBlog = blogs.find(b => b.featured);
  const regularBlogs = blogs.filter(b => !b.featured);

  return (
    <div className="pb-24 bg-vento-cream min-h-screen">
      <SEO title="The Vento Journal" description="Stories, guides, and insights from the world of premium Indian tea." keywords="tea blog, brewing guide, health benefits of tea" />
      
      <PageBanner
        eyebrow="Stories & Guides"
        title="The Vento Journal"
        subtitle="Stories, guides, and insights from the world of premium Indian tea."
        imagePath="/brand/media_1787991645085.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Featured Blog */}
        {featuredBlog && (
          <ScrollReveal>
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 mb-16 group cursor-pointer transition-transform hover:-translate-y-1 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img 
                    src={featuredBlog.image} 
                    alt={featuredBlog.title} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-vento-gold text-vento-forest text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {featuredBlog.category}
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4 font-medium">
                    <Calendar size={16} className="mr-2 text-vento-gold" />
                    {featuredBlog.date}
                  </div>
                  <h2 className="text-3xl font-serif text-vento-forest mb-4 group-hover:text-vento-gold-dark transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {featuredBlog.excerpt}
                  </p>
                  <button className="flex items-center text-vento-forest font-bold hover:text-vento-gold transition-colors w-max pb-1 border-b-2 border-vento-gold">
                    Read Full Article <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Regular Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regularBlogs.map((blog) => (
            <ScrollReveal key={blog.id} delay={blog.id * 0.1}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 group cursor-pointer h-full flex flex-col hover:-translate-y-1 transition-transform duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-vento-cream/90 backdrop-blur-sm text-vento-forest text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-3 font-medium">
                    <Calendar size={14} className="mr-2 text-vento-gold" />
                    {blog.date}
                  </div>
                  <h3 className="text-xl font-serif text-vento-forest mb-3 group-hover:text-vento-gold-dark transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>
                  <button className="flex items-center text-vento-forest font-bold text-sm hover:text-vento-gold transition-colors w-max mt-auto">
                    Read Article <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
