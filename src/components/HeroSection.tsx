import { usePageContent } from '@/hooks/usePageContents';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { data: heroContent } = usePageContent('hero-section');

  const defaultHero = {
    topBadge: '/assets/pure-natural.png', // We will assume there's a placeholder or they upload one
    title: 'পুরুষ এর হারানো যৌ-ব-ন ফিরিয়ে আনবে এই হালুয়া। দেশের লক্ষ লক্ষ মানুষ উপকৃত হচ্ছে',
    subtitle: 'বী,র্য পাতলা, মাত্র ২-৩ মিনিটে বী,র্য বের হয়ে যায়? “অনেক ঔষধ খেয়েও উপকার হয়নি? তাদের জন্যই এই হালুয়া',
    buttonText: 'অর্ডার করুন',
    backgroundColor: '#0A3B22'
  };

  let content = defaultHero;
  try {
    if (heroContent?.content) {
      content = JSON.parse(heroContent.content);
    }
  } catch (e) {
    console.error("Failed to parse hero content", e);
  }

  return (
    <section 
      className="relative w-full min-h-[400px] flex flex-col items-center justify-center pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden"
      style={{ backgroundColor: content.backgroundColor || '#0A3B22' }}
    >
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        {/* Top Badge Image */}
        {(content.topBadge || defaultHero.topBadge) && (
          <div className="mb-6 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white border-4 border-[#e9dc01] shadow-lg flex items-center justify-center">
            <img 
              src={content.topBadge || defaultHero.topBadge} 
              alt="Badge" 
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
          </div>
        )}

        {/* Main Title Box */}
        <div className="w-full max-w-6xl border border-white rounded-md p-4 md:p-6 mb-6">
          <h1 className="text-white font-bold text-lg md:text-2xl lg:text-3xl leading-snug tracking-wide">
            {content.title}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-[#e9dc01] font-bold text-sm md:text-lg lg:text-xl max-w-4xl mb-8 leading-relaxed px-4">
          {content.subtitle}
        </p>

        {/* Order Button */}
        <a 
          href="#order-form" 
          className="animate-pulse-scale bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold text-lg md:text-xl px-8 py-3 rounded-md flex items-center justify-center gap-3 transition-colors shadow-lg border border-red-800"
        >
          <ShoppingCart className="w-6 h-6" />
          {content.buttonText}
        </a>
      </div>

      {/* Bottom Wave Pattern */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[100px]"
        >
          <path 
            d="M0,60 C150,100 350,0 600,60 C850,120 1050,40 1200,60 L1200,120 L0,120 Z" 
            className="fill-white/80"
          ></path>
          <path 
            d="M0,80 C200,120 400,20 600,80 C800,140 1000,60 1200,80 L1200,120 L0,120 Z" 
            className="fill-[#e0e3e2]"
          ></path>
          <path 
            d="M0,100 C250,140 450,40 600,100 C750,160 950,80 1200,100 L1200,120 L0,120 Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
