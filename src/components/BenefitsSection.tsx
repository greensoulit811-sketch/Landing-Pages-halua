import { usePageContent } from '@/hooks/usePageContents';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BenefitsSection = () => {
  const { data: pageData } = usePageContent('benefits-section');
  const { data: heroData } = usePageContent('hero-section');
  
  const defaultContent = {
    bannerText: "নিয়মিত ৭ দিন সেবনেই প্রাথমিক ফলাফল বুঝতে শুরু করবেন। এবং এক মাস সেবনে স্থায়ীভাবে সমাধান পাবেন",
    headingText: "হালুয়া ও মালিশ এর উপকারিতা",
    benefitsList: [
      "যৌ-ন শক্তি বৃদ্ধি করে",
      "দ্রুত বীর্যপাত রোধ করে",
      "শক্ত মোটা ও লম্বা করে",
      "শুক্রাণুর পরিমাণ বৃদ্ধি করে",
      "মিলন চাহিদা বহু গুনে বৃদ্ধি করে",
      "বীর্য গাঢ় এবং শক্তিশালী করে",
      "২-৩ ইঞ্চি লম্বা করবে।",
      "আগা মোটা গোড়া চিকন সমস্যার সমাধান করবে।",
      "টানা ৩-৪ বার করতে পারবেন।"
    ]
  };

  let content = defaultContent;
  try {
    if (pageData?.content) {
      const parsed = JSON.parse(pageData.content);
      content = { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error("Failed to parse benefits content", e);
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

  return (
    <section className="bg-white w-full flex flex-col items-center pb-12">
      
      {/* Top Yellow Banner */}
      <div className="w-full bg-[#fbbc04] py-4 px-4 text-center border-b border-gray-300">
        <h3 className="text-black font-bold text-2xl md:text-2xl lg:text-3xl max-w-6xl mx-auto leading-relaxed">
          {content.bannerText}
        </h3>
      </div>

      <div className="w-full max-w-6xl mx-auto px-1 mt-10">
        {/* Green Heading Bar */}
        <div className="bg-[#0A3B22] text-white text-center py-3 px-4 rounded-sm shadow-md mb-6">
          <h2 className="font-bold text-2xl md:text-3xl">{content.headingText}</h2>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {content.benefitsList.map((benefit: string, index: number) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-4 border border-gray-100 rounded-md shadow-sm bg-white hover:border-[#12882c]/30 hover:shadow-md transition-all"
            >
              <div className="bg-[#12882c] rounded-sm p-0.5 mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-gray-900 font-bold text-2xl md:text-xl">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Order Button */}
        <div className="flex justify-center">
          <a 
            href="#order-form" 
            className="animate-pulse-scale bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold text-xl md:text-2xl px-12 py-4 rounded-md flex items-center justify-center gap-3 transition-colors shadow-lg border border-red-800 w-full max-w-sm"
          >
            <ShoppingCart className="w-6 h-6" />
            {heroButtonText}
          </a>
        </div>
      </div>

    </section>
  );
};

export default BenefitsSection;
