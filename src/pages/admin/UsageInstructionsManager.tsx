import { useState, useEffect } from 'react';
import { usePageContent, useUpsertPageContent } from '@/hooks/usePageContents';
import { Loader2, Save, Info } from 'lucide-react';
import { toast } from 'sonner';

const UsageInstructionsManager = () => {
  const { data: pageData, isLoading } = usePageContent('usage-instructions-section');
  const upsertPage = useUpsertPageContent();
  
  const [form, setForm] = useState({
    usageHeading: "হালুয়া ও মেসেজ অয়েল ব্যবহারের নিয়ম",
    instruction1: "**প্রতিদিন রাতে**, খাবার ৩০ মিনিট পরে, **আধা-চামচ হালুয়া চেটে খাবেন** অথবা পানিতে মিক্স করে খাবেন। অথবা দুধ থাকলে **দুধের সাথে মিক্স করে খাবেন**।",
    instruction2: "আর ম্যাসেজ অয়েল টি **প্রতিদিন রাতে** , **আপনার বিশেষ অঙ্গে** , ওপর থেকে নিচ **এভাবে ২/৩ মিনিট মালিশ করবেন**।",
    footerText: "ফ্রি হোম ডেলিভারি সুবিধা। ফ্রি হেলথ টিপস। প্রোডাক্ট হাতে পেয়ে কোয়ালিটি যাচাই করে পেমেন্ট করার সুবিধা। আমরা সুন্নাত তরিকায় ব্যবসা করি তাই প্রতারিত হওয়ার ভয় নেই।",
    contactHeading: "যেকোনো প্রয়োজনে কল করুন",
    callNowPhone: "01700000000"
  });

  useEffect(() => {
    if (pageData?.content) {
      try {
        const parsed = JSON.parse(pageData.content);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse usage instructions content", e);
      }
    }
  }, [pageData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertPage.mutateAsync({
        page_slug: 'usage-instructions-section',
        page_title: 'Usage Instructions Configuration',
        content: JSON.stringify(form),
        is_active: true
      });
      toast.success('Usage instructions section updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save usage instructions section');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Usage Instructions Settings</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Manage the instructions and contact section of the landing page.</p>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-8">
        
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 flex items-start gap-3 mb-8">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold mb-1">Highlighting Text (Yellow)</p>
            <p>To make words yellow in the instruction paragraphs, wrap them in double asterisks. Example: <strong>**প্রতিদিন রাতে**</strong> will become yellow.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Heading (White Box)</label>
              <input 
                name="usageHeading"
                value={form.usageHeading} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Instruction Line 1</label>
              <textarea 
                name="instruction1"
                value={form.instruction1} 
                onChange={handleChange} 
                required 
                rows={3}
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Instruction Line 2</label>
              <textarea 
                name="instruction2"
                value={form.instruction2} 
                onChange={handleChange} 
                required 
                rows={3}
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" 
              />
            </div>

            <div className="md:col-span-2 pt-6 border-t border-border">
              <h3 className="font-bold text-lg mb-4">Footer Contact Section</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Footer Notice Text</label>
              <textarea 
                name="footerText"
                value={form.footerText} 
                onChange={handleChange} 
                required 
                rows={2}
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" 
              />
            </div>

            <div className="md:col-span-1">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Contact Heading</label>
              <input 
                name="contactHeading"
                value={form.contactHeading} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>

            <div className="md:col-span-1">
              <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground mb-2">Call Now Phone Number</label>
              <input 
                name="callNowPhone"
                value={form.callNowPhone} 
                onChange={handleChange} 
                required 
                placeholder="e.g. 01700000000"
                className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" 
              />
            </div>

          </div>

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

export default UsageInstructionsManager;
