import { useState } from 'react';
import { usePageContent } from '@/hooks/usePageContents';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Lock, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderFormSection = () => {
  const { data: pageData } = usePageContent('order-form-section');
  const { data: productOfferData } = usePageContent('product-offer-section');
  const navigate = useNavigate();

  const defaultContent = {
    topHeading: "মাত্র ৭ দিনের জন্য বিশেষ অফার!",
    subHeadingLine1: "আপনি পাচ্ছেন ",
    subHeadingHighlight: "৩০ মি.লি. ম্যাসেজ অয়েল সম্পূর্ণ ফ্রি!",
    subHeadingLine2: " স্টক সীমিত — অফার শেষ হওয়ার আগেই অর্ডার করে নিন।",
    formHeading: "হালুয়া নেয়ার জন্য, নিচের ফর্মটি সম্পূর্ণ পূরণ করুন",
    productTitle: "হালুয়া মোহাব্বত",
    productPrice: 1200,
    productThumbnail: "/placeholder.svg"
  };

  let content = defaultContent;
  try {
    if (pageData?.content) {
      const parsed = JSON.parse(pageData.content);
      content = { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error("Failed to parse order form content", e);
  }

  let productOfferImage = null;
  try {
    if (productOfferData?.content) {
      productOfferImage = JSON.parse(productOfferData.content).productImage;
    }
  } catch (e) {
    console.error("Failed to parse product offer content", e);
  }

  const productTitle = content.productTitle;
  const productPrice = content.productPrice;
  const productThumbnail = (productOfferImage && productOfferImage !== '/placeholder.svg') 
                            ? productOfferImage 
                            : content.productThumbnail;

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const totalAmount = quantity * productPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('অনুগ্রহ করে ফর্মের সমস্ত তথ্য পূরণ করুন।');
      return;
    }
    
    setSubmitting(true);
    try {
      const { error } = await supabase.from('checkout_leads').insert({
        customer_name: formData.name,
        customer_phone: formData.phone,
        shipping_address: formData.address,
        cart_total: totalAmount,
        cart_items: [
          { 
            productName: productTitle, 
            quantity: quantity, 
            price: productPrice, 
            image: productThumbnail 
          }
        ],
        status: 'pending_checkout',
        session_id: 'direct_order_' + Date.now()
      });

      if (error) throw error;
      
      toast.success('আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!');
      setFormData({ name: '', phone: '', address: '' });
      setQuantity(1);
      // Optional: navigate to a thank you page
      // navigate('/thank-you');
    } catch (err) {
      console.error(err);
      toast.error('অর্ডারটি সম্পূর্ণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white w-full flex flex-col items-center pb-16 px-4" id="order-form">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Top Headings */}
        <div className="w-full max-w-6xl text-center mb-6">
          <div className="bg-[#0A3B22] rounded-md py-3 px-4 shadow-sm mb-4">
            <h2 className="text-[#fbbc04] font-bold text-xl md:text-2xl">{content.topHeading}</h2>
          </div>
          <p className="text-gray-900 font-bold text-lg md:text-xl leading-relaxed">
            {content.subHeadingLine1} 
            <span className="text-[#ff0000]">{content.subHeadingHighlight}</span>
            {content.subHeadingLine2}
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full border-[3px] border-[#0A3B22] rounded-md overflow-hidden bg-white shadow-sm">
          <div className="bg-[#0A3B22] text-white text-center py-3 px-4">
            <h3 className="font-bold text-lg md:text-xl">{content.formHeading}</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Left Column: Products & Billing */}
              <div className="space-y-8">
                
                {/* Your Products */}
                <div>
                  <h4 className="font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Your Products</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked readOnly className="w-4 h-4 text-primary rounded border-gray-300" />
                      <div className="w-12 h-12 bg-white border border-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src={productThumbnail} alt="Product" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{productTitle} × {quantity}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-gray-300 bg-white rounded-sm overflow-hidden h-8">
                            <button type="button" onClick={decreaseQuantity} className="w-8 h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 h-full flex items-center justify-center font-semibold text-sm border-x border-gray-300">{quantity}</span>
                            <button type="button" onClick={increaseQuantity} className="w-8 h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-bold text-sm">৳ {productPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Details */}
                <div>
                  <h4 className="font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Billing details</h4>
                  <div className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="আপনার পুরো নাম লিখুন" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0A3B22] focus:ring-1 focus:ring-[#0A3B22] text-sm"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="মোবাইল নাম্বার লিখুন" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0A3B22] focus:ring-1 focus:ring-[#0A3B22] text-sm"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="আপনার এলাকার গ্রাম, থানা, জেলা লিখুন" 
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0A3B22] focus:ring-1 focus:ring-[#0A3B22] text-sm"
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      ডেলিভারী চার্জ <span className="text-[#ff0000]">একদম ফ্রি</span>।
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="border border-gray-200 rounded-sm p-4 bg-gray-50 flex flex-col h-full">
                <h4 className="font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Your order</h4>
                
                <div className="flex justify-between items-center text-sm font-bold text-gray-500 mb-4 px-2">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                <div className="flex justify-between items-center mb-6 bg-white p-3 border border-gray-100 shadow-sm rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded overflow-hidden flex-shrink-0 bg-white">
                      <img src={productThumbnail} alt="Product" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-sm text-gray-800">{productTitle} <span className="font-normal text-gray-500 text-xs ml-1">× {quantity}</span></span>
                  </div>
                  <span className="font-bold text-sm text-gray-800">৳ {totalAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-gray-200 px-2">
                  <span className="font-bold text-gray-600 text-sm">Subtotal</span>
                  <span className="font-bold text-gray-800 text-sm">৳ {totalAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-b border-gray-200 mb-6 px-2">
                  <span className="font-bold text-gray-900 text-base">Total</span>
                  <span className="font-bold text-[#ff0000] text-lg">৳ {totalAmount.toLocaleString()}</span>
                </div>

                <div className="mb-6 space-y-2">
                  <div className="font-bold text-gray-800 text-sm">ক্যাশ অন ডেলিভারী !</div>
                  <div className="bg-gray-200 p-3 rounded-sm">
                    <p className="text-xs font-semibold text-gray-600">পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করুন।</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="animate-pulse-scale w-full mt-auto bg-[#ff6b35] hover:bg-[#e85a25] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-md flex items-center justify-center gap-2 transition-colors shadow-md border border-[#d64e1c]"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                  {submitting ? 'অপেক্ষা করুন...' : `অর্ডার করুন ৳ ${totalAmount.toLocaleString()}`}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderFormSection;
