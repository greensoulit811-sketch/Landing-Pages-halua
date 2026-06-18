import { usePageContent } from '@/hooks/usePageContents';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductOfferSection = () => {
  const { data: pageData } = usePageContent('product-offer-section');
  const { data: heroData } = usePageContent('hero-section');
  
  const defaultContent = {
    productImage: "/placeholder.svg"
  };

  let content = defaultContent;
  try {
    if (pageData?.content) {
      const parsed = JSON.parse(pageData.content);
      content = { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error("Failed to parse product offer content", e);
  }

  let heroButtonText = 'অর্ডার করুন';
  try {
    if (heroData?.content) {
      const heroParsed = JSON.parse(heroData.content);
      if (heroParsed.buttonText) heroButtonText = heroParsed.buttonText;
    }
  } catch (e) {
    // Ignore error, fallback to default
  }

  if (!content.productImage || content.productImage === "/placeholder.svg") {
    return null; // Don't render empty section if no image is uploaded
  }

  return (
    <section className="bg-white py-10 w-full flex justify-center px-4">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center overflow-hidden">
        
        {/* Product Image (contains all the text and design) */}
        <div className="w-full border-2 border-[#0A3B22] p-4 rounded-md bg-white shadow-sm mb-8">
          <img 
            src={content.productImage} 
            alt="Product Offer" 
            className="w-full h-auto object-contain"
            loading="lazy" 
            decoding="async"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
        </div>

        {/* Order Button */}
        <a 
          href="#order-form" 
          className="animate-pulse-scale bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold text-xl md:text-2xl px-12 py-4 rounded-md flex items-center justify-center gap-3 transition-colors shadow-lg border border-red-800 w-full max-w-sm"
        >
          <ShoppingCart className="w-6 h-6" />
          {heroButtonText}
        </a>

      </div>
    </section>
  );
};

export default ProductOfferSection;
