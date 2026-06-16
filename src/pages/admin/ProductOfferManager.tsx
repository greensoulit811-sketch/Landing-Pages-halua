import { useState, useRef, useEffect } from 'react';
import { usePageContent, useUpsertPageContent } from '@/hooks/usePageContents';
import { Upload, ImageIcon, Loader2, Save } from 'lucide-react';
import { uploadProductImage, deleteProductImage } from '@/lib/image-upload';
import { toast } from 'sonner';

const ProductOfferManager = () => {
  const { data: pageData, isLoading } = usePageContent('product-offer-section');
  const upsertPage = useUpsertPageContent();
  
  const [form, setForm] = useState({
    productImage: ""
  });
  
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pageData?.content) {
      try {
        const parsed = JSON.parse(pageData.content);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse product offer content", e);
      }
    }
  }, [pageData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file, 'banners');
      setForm(f => ({ ...f, productImage: url }));
      toast.success('Product image uploaded');
    } catch { 
      toast.error('Upload failed'); 
    } finally { 
      setUploading(false); 
    }
  };

  const removeImage = async () => {
    if (form.productImage && form.productImage.includes('supabase.co')) {
      try { await deleteProductImage(form.productImage); } catch { /* ignore */ }
    }
    setForm(f => ({ ...f, productImage: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertPage.mutateAsync({
        page_slug: 'product-offer-section',
        page_title: 'Product Offer Configuration',
        content: JSON.stringify(form),
        is_active: true
      });
      toast.success('Product Offer section updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product offer section');
    }
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Product Offer Section</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Upload the combined product and text image to display below the Hero.</p>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Image */}
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-3">Product Image Section</label>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {form.productImage ? (
                <div className="relative w-full sm:w-64 aspect-video rounded-md overflow-hidden border border-border bg-white flex items-center justify-center shadow-sm">
                  <img src={form.productImage} alt="Product" className="w-full h-full object-contain" />
                  <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              ) : (
                <div className="w-full sm:w-64 aspect-video rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center bg-secondary/50 text-muted-foreground gap-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs">No image</span>
                </div>
              )}
              
              <div className="flex-1 w-full pt-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border rounded-md font-body text-sm font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50 text-foreground w-full sm:w-auto justify-center">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <div className="mt-4">
                  <p className="font-body text-xs text-muted-foreground mb-2">Or paste image URL:</p>
                  <input 
                    value={form.productImage} 
                    onChange={e => setForm({ ...form, productImage: e.target.value })} 
                    placeholder="https://example.com/image.png" 
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
                  />
                </div>
              </div>
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

export default ProductOfferManager;
