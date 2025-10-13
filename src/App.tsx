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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/billing" element={<BillingSummary />} />
          <Route path="/billing/invoice" element={<InvoiceDetails />} />
          <Route path="/billing/payment-method" element={<PaymentMethod />} />
          <Route path="/billing/confirm" element={<PaymentConfirm />} />
          <Route path="/billing/success" element={<PaymentSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
