import { usePageContent } from '@/hooks/usePageContents';
import { Phone } from 'lucide-react';

const parseHighlightedText = (text: string) => {
  if (!text) return null;
  // Splits by **text** and wraps them in a yellow span
  const parts = text.split(/\\*\\*(.*?)\\*\\*/g);
  return (
    <>
      {parts.map((part, index) => {
        // Even indices are normal text, odd indices are highlighted
        if (index % 2 === 1) {
          return <span key={index} className="text-[#fbbc04] font-bold">{part}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

const UsageInstructionsSection = () => {
  const { data: pageData } = usePageContent('usage-instructions-section');

  const defaultContent = {
    usageHeading: "হালুয়া ও মেসেজ অয়েল ব্যবহারের নিয়ম",
    instruction1: "**প্রতিদিন রাতে**, খাবার ৩০ মিনিট পরে, **আধা-চামচ হালুয়া চেটে খাবেন** অথবা পানিতে মিক্স করে খাবেন। অথবা দুধ থাকলে **দুধের সাথে মিক্স করে খাবেন**।",
    instruction2: "আর ম্যাসেজ অয়েল টি **প্রতিদিন রাতে** , **আপনার বিশেষ অঙ্গে** , ওপর থেকে নিচ **এভাবে ২/৩ মিনিট মালিশ করবেন**।",
    footerText: "ফ্রি হোম ডেলিভারি সুবিধা। ফ্রি হেলথ টিপস। প্রোডাক্ট হাতে পেয়ে কোয়ালিটি যাচাই করে পেমেন্ট করার সুবিধা। আমরা সুন্নাত তরিকায় ব্যবসা করি তাই প্রতারিত হওয়ার ভয় নেই।",
    contactHeading: "যেকোনো প্রয়োজনে কল করুন",
    callNowPhone: "01700000000"
  };

  let content = defaultContent;
  try {
    if (pageData?.content) {
      const parsed = JSON.parse(pageData.content);
      content = { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error("Failed to parse usage instructions content", e);
  }

  return (
    <section className="w-full flex flex-col items-center pb-1" id="usage-instructions">
      {/* Top Green Box */}
      <div className="bg-[#0A3B22] w-full py-12 px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="border border-white py-3 px-8 rounded-sm mb-8 inline-block">
            <h2 className="text-white font-bold text-2xl md:text-3xl">{content.usageHeading}</h2>
          </div>

          <div className="text-white font-bold text-xl md:text-xl leading-loose max-w-3xl space-y-6">
            <p>
              {parseHighlightedText(content.instruction1)}
            </p>
            <p>
              {parseHighlightedText(content.instruction2)}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom White Area */}
      <div className="w-full bg-white py-10 px-1 flex flex-col items-center text-center shadow-sm">
        <div className="w-full container mx-auto flex flex-col items-center">
          
          <p className="text-gray-900 font-bold text-xl md:text-lg leading-relaxed max-w-6xl mb-8">
            {content.footerText}
          </p>

          <div className="bg-[#0A3B22] text-white py-3 px-8 rounded-sm mb-6 w-full max-w-6xl shadow-md">
            <h3 className="font-bold text-xl md:text-2xl">{content.contactHeading}</h3>
          </div>

          <a 
            href={`tel:${content.callNowPhone}`}
            className="bg-[#000080] hover:bg-[#000060] text-white font-bold text-xl md:text-2xl px-12 py-3 rounded-sm shadow-md transition-all flex items-center justify-center"
          >
            Call Now
          </a>

        </div>
      </div>
    </section>
  );
};

export default UsageInstructionsSection;
