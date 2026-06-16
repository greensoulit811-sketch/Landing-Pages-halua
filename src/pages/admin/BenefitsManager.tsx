import { useState, useEffect } from 'react';
import { usePageContent, useUpsertPageContent } from '@/hooks/usePageContents';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const BenefitsManager = () => {
  const { data: pageData, isLoading } = usePageContent('benefits-section');
  const upsertPage = useUpsertPageContent();
  
  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    if (pageData?.content) {
      try {
        const parsed = JSON.parse(pageData.content);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse benefits content", e);
      }
    }
  }, [pageData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertPage.mutateAsync({
        page_slug: 'benefits-section',
        page_title: 'Benefits Configuration',
        content: JSON.stringify(form),
        is_active: true
      });
      toast.success('Benefits section updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save benefits section');
    }
  };

  const updateBenefit = (index: number, value: string) => {
    const newList = [...form.benefitsList];
    newList[index] = value;
    setForm({ ...form, benefitsList: newList });
  };

  const removeBenefit = (index: number) => {
    const newList = [...form.benefitsList];
    newList.splice(index, 1);
    setForm({ ...form, benefitsList: newList });
  };

  const addBenefit = () => {
    setForm({ ...form, benefitsList: [...form.benefitsList, "নতুন সুবিধা"] });
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Benefits Section</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Manage the benefits list displayed below the Product Offer.</p>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Banner Text */}
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Yellow Banner Text</label>
            <textarea 
              value={form.bannerText} 
              onChange={e => setForm({ ...form, bannerText: e.target.value })} 
              rows={2}
              required 
              className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-base text-foreground focus:outline-none focus:border-primary resize-none" 
            />
          </div>

          {/* Heading Text */}
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Green Heading Text</label>
            <input 
              value={form.headingText} 
              onChange={e => setForm({ ...form, headingText: e.target.value })} 
              required 
              className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
            />
          </div>

          {/* Benefits List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-body text-xs font-bold uppercase tracking-wider text-foreground">Benefits List</label>
              <button 
                type="button" 
                onClick={addBenefit}
                className="flex items-center gap-1 text-xs bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-md transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {form.benefitsList.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="bg-[#12882c] rounded-sm p-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <input 
                    value={item} 
                    onChange={e => updateBenefit(index, e.target.value)} 
                    required 
                    className="flex-1 px-4 py-2 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeBenefit(index)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {form.benefitsList.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">No items added. Click 'Add Item'.</p>
              )}
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

export default BenefitsManager;
