import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookPixelProvider from "@/components/FacebookPixelProvider";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import VisitorTracker from "@/components/VisitorTracker";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from 'react';
import Index from "./pages/Index.tsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.tsx";

// Lazy load admin components to optimize main bundle size
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.tsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.tsx"));
const CheckoutLeadsManager = lazy(() => import("./pages/admin/CheckoutLeadsManager.tsx"));
const MarketingTrackingPage = lazy(() => import("./pages/admin/MarketingTrackingPage.tsx"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage.tsx"));
const HeroManager = lazy(() => import("./pages/admin/HeroManager.tsx"));
const ProductOfferManager = lazy(() => import("./pages/admin/ProductOfferManager.tsx"));
const BenefitsManager = lazy(() => import("./pages/admin/BenefitsManager.tsx"));
const OrderFormManager = lazy(() => import("./pages/admin/OrderFormManager.tsx"));
const UsageInstructionsManager = lazy(() => import("./pages/admin/UsageInstructionsManager.tsx"));



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
          <Sonner />
          <BrowserRouter>
            <LanguageProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />


              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/*" element={
                <ProtectedAdminRoute>
                  <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                    <Routes>
                      <Route element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="checkout-leads" element={<CheckoutLeadsManager />} />
                        <Route path="marketing" element={<MarketingTrackingPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="hero" element={<HeroManager />} />
                        <Route path="product-offer" element={<ProductOfferManager />} />
                        <Route path="benefits" element={<BenefitsManager />} />
                        <Route path="order-form" element={<OrderFormManager />} />
                        <Route path="usage-instructions" element={<UsageInstructionsManager />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </ProtectedAdminRoute>
              } />
            </Routes>
            <VisitorTracker />
            <WhatsAppButton />
            <FacebookPixelProvider />
            </LanguageProvider>
          </BrowserRouter>
        </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
