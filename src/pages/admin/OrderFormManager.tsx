import { useState, useEffect } from 'react';
import { usePageContent, useUpsertPageContent } from '@/hooks/usePageContents';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

const OrderFormManager = () => {
  const { data: pageData, isLoading } = usePageContent('order-form-section');
  const upsertPage = useUpsertPageContent();
  
  const [form, setForm] = useState({
    topHeading: "মাত্র ৭ দিনের জন্য বিশেষ অফার!",
    subHeadingLine1: "আপনি পাচ্ছেন ",
    subHeadingHighlight: "৩০ মি.লি. ম্যাসেজ অয়েল সম্পূর্ণ ফ্রি!",
    subHeadingLine2: " স্টক সীমিত — অফার শেষ হওয়ার আগেই অর্ডার করে নিন।",
    formHeading: "হালুয়া নেয়ার জন্য, নিচের ফর্মটি সম্পূর্ণ পূরণ করুন",
    productTitle: "হালুয়া মোহাব্বত",
    productPrice: 1200,
    productThumbnail: "/placeholder.svg"
  });

  useEffect(() => {
    if (pageData?.content) {
      try {
        const parsed = JSON.parse(pageData.content);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse order form content", e);
      }
    }
  }, [pageData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertPage.mutateAsync({
        page_slug: 'order-form-section',
        page_title: 'Order Form Configuration',
        content: JSON.stringify(form),
        is_active: true
      });
      toast.success('Order form section updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save order form section');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'productPrice' ? Number(value) : value }));
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Order Form Settings</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Manage the checkout/order form displayed on the landing page.</p>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Heading */}
            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Top Highlight Heading</label>
              <input 
                name="topHeading"
                value={form.topHeading} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>

            {/* Sub Heading Parts */}
            <div>
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Sub-Heading (Start)</label>
              <input 
                name="subHeadingLine1"
                value={form.subHeadingLine1} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>
            <div>
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Sub-Heading (Red Highlight)</label>
              <input 
                name="subHeadingHighlight"
                value={form.subHeadingHighlight} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Sub-Heading (End)</label>
              <input 
                name="subHeadingLine2"
                value={form.subHeadingLine2} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>

            {/* Form Heading */}
            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Form Title</label>
              <input 
                name="formHeading"
                value={form.formHeading} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>

            {/* Product Details */}
            <div>
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Product Title</label>
              <input 
                name="productTitle"
                value={form.productTitle} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>
            <div>
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Product Price (৳)</label>
              <input 
                type="number"
                name="productPrice"
                value={form.productPrice} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Product Thumbnail URL (or path)</label>
              <input 
                name="productThumbnail"
                value={form.productThumbnail} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-border mt-8">
            <button 
              type="submit" 
              disabled={upsertPage.isPending}
              className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {upsertPage.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {upsertPage.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default OrderFormManager;
