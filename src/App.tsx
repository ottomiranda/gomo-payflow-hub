import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HomePage } from "./components/HomePage";
import { BillingSummary } from "./components/billing/BillingSummary";
import { InvoiceDetails } from "./components/billing/InvoiceDetails";
import { PaymentMethod } from "./components/billing/PaymentMethod";
import { PaymentConfirm } from "./components/billing/PaymentConfirm";
import { PaymentSuccess } from "./components/billing/PaymentSuccess";
import { NavigationProvider } from "@/contexts/NavigationContext";

const queryClient = new QueryClient();

// Placeholder pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-gomo-dark flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white/60">Coming Soon</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NavigationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/usage" element={<PlaceholderPage title="Usage" />} />
            <Route path="/support" element={<PlaceholderPage title="Support" />} />
            <Route path="/my-plan" element={<PlaceholderPage title="My Plan" />} />
            <Route path="/billing" element={<BillingSummary />} />
            <Route path="/billing/invoice" element={<InvoiceDetails />} />
            <Route path="/billing/payment-method" element={<PaymentMethod />} />
            <Route path="/billing/confirm" element={<PaymentConfirm />} />
            <Route path="/billing/success" element={<PaymentSuccess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NavigationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
