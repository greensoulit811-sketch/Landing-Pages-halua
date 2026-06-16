import HeroSection from '@/components/HeroSection';
import ProductOfferSection from '@/components/ProductOfferSection';
import BenefitsSection from '@/components/BenefitsSection';
import OrderFormSection from '@/components/OrderFormSection';
import UsageInstructionsSection from '@/components/UsageInstructionsSection';
import SimpleFooter from '@/components/SimpleFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <HeroSection />
      <ProductOfferSection />
      <BenefitsSection />
      <OrderFormSection />
      <UsageInstructionsSection />
      <SimpleFooter />
    </div>
  );
};

export default Index;
