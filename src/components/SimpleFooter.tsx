import { Phone } from 'lucide-react';

const SimpleFooter = () => {
  return (
    <>
      <footer className="bg-[#e2e2e2] py-5 text-center text-[13px] text-gray-700 border-t border-gray-300">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Bisuddho Prakritik All Rights Reserved. Designed By <span className="text-blue-600 cursor-pointer hover:underline">Green Soul IT.</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default SimpleFooter;
