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
import Index from "./pages/Index.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import CheckoutLeadsManager from "./pages/admin/CheckoutLeadsManager.tsx";
import MarketingTrackingPage from "./pages/admin/MarketingTrackingPage.tsx";
import SettingsPage from "./pages/admin/SettingsPage.tsx";
import HeroManager from "./pages/admin/HeroManager.tsx";
import ProductOfferManager from "./pages/admin/ProductOfferManager.tsx";
import BenefitsManager from "./pages/admin/BenefitsManager.tsx";
import OrderFormManager from "./pages/admin/OrderFormManager.tsx";
import UsageInstructionsManager from "./pages/admin/UsageInstructionsManager.tsx";



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
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }>
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
