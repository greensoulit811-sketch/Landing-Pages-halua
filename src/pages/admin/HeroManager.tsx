import { useState, useRef, useEffect } from 'react';
import { usePageContent, useUpsertPageContent } from '@/hooks/usePageContents';
import { Upload, ImageIcon, Loader2, Save } from 'lucide-react';
import { uploadProductImage, deleteProductImage } from '@/lib/image-upload';
import { toast } from 'sonner';

const HeroManager = () => {
  const { data: pageData, isLoading } = usePageContent('hero-section');
  const upsertPage = useUpsertPageContent();
  
  const [form, setForm] = useState({
    topBadge: '/assets/pure-natural.png',
    title: 'পুরুষ এর হারানো যৌ-ব-ন ফিরিয়ে আনবে এই হালুয়া। দেশের লক্ষ লক্ষ মানুষ উপকৃত হচ্ছে',
    subtitle: 'বী,র্য পাতলা, মাত্র ২-৩ মিনিটে বী,র্য বের হয়ে যায়? “অনেক ঔষধ খেয়েও উপকার হয়নি? তাদের জন্যই এই হালুয়া',
    buttonText: 'অর্ডার করুন',
    backgroundColor: '#0A3B22'
  });
  
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pageData?.content) {
      try {
        const parsed = JSON.parse(pageData.content);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse hero content", e);
      }
    }
  }, [pageData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file, 'banners');
      setForm(f => ({ ...f, topBadge: url }));
      toast.success('Badge image uploaded');
    } catch { 
      toast.error('Upload failed'); 
    } finally { 
      setUploading(false); 
    }
  };

  const removeImage = async () => {
    if (form.topBadge && form.topBadge.includes('supabase.co')) {
      try { await deleteProductImage(form.topBadge); } catch { /* ignore */ }
    }
    setForm(f => ({ ...f, topBadge: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertPage.mutateAsync({
        page_slug: 'hero-section',
        page_title: 'Hero Section Configuration',
        content: JSON.stringify(form),
        is_active: true
      });
      toast.success('Hero section updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save hero section');
    }
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Hero Section</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Manage the main landing page hero content and styling</p>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Top Badge Image */}
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-3">Top Logo / Badge Image</label>
            <div className="flex items-start gap-6">
              {form.topBadge ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#e9dc01] bg-white flex items-center justify-center shadow-md">
                  <img src={form.topBadge} alt="Badge" className="w-full h-full object-contain" />
                  <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-secondary/50">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              
              <div className="flex-1 pt-4">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border rounded-md font-body text-sm font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50 text-foreground">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <div className="mt-3">
                  <input 
                    value={form.topBadge} 
                    onChange={e => setForm({ ...form, topBadge: e.target.value })} 
                    placeholder="Or paste image URL" 
                    className="w-full px-4 py-2 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Main Title</label>
            <textarea 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })} 
              rows={2}
              required 
              className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-base text-foreground focus:outline-none focus:border-primary resize-none" 
            />
            <p className="font-body text-xs text-muted-foreground mt-1">This text appears inside the white bordered box.</p>
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Subtitle (Yellow Text)</label>
            <textarea 
              value={form.subtitle} 
              onChange={e => setForm({ ...form, subtitle: e.target.value })} 
              rows={2}
              className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-base text-foreground focus:outline-none focus:border-primary resize-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button Text */}
            <div>
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Button Text</label>
              <input 
                value={form.buttonText} 
                onChange={e => setForm({ ...form, buttonText: e.target.value })} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>
            
            {/* Background Color */}
            <div>
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Background Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color"
                  value={form.backgroundColor} 
                  onChange={e => setForm({ ...form, backgroundColor: e.target.value })} 
                  className="w-12 h-12 rounded cursor-pointer border-0 p-0" 
                />
                <input 
                  type="text"
                  value={form.backgroundColor} 
                  onChange={e => setForm({ ...form, backgroundColor: e.target.value })} 
                  className="flex-1 px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary uppercase uppercase" 
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-border">
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

export default HeroManager;
