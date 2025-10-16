import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HomePage } from "./components/HomePage";
import Usage from "./pages/Usage";
import Support from "./pages/Support";
import Chat from "./pages/Chat";
import MyPlan from "./pages/MyPlan";
import { BillingSummary } from "./components/billing/BillingSummary";
import { InvoiceDetails } from "./components/billing/InvoiceDetails";
import { PaymentMethod } from "./components/billing/PaymentMethod";
import { PaymentConfirm } from "./components/billing/PaymentConfirm";
import { PaymentSuccess } from "./components/billing/PaymentSuccess";
import { NavigationProvider } from "./contexts/NavigationContext";
import { Toaster as Toast } from "@/components/ui/toaster";
import { useScrollToTop } from "./hooks/useScrollToTop";

const queryClient = new QueryClient();

// Componente interno para usar o hook dentro do BrowserRouter
const AppRoutes = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/usage" element={<Usage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/my-plan" element={<MyPlan />} />
      <Route path="/billing" element={<BillingSummary />} />
      <Route path="/billing/invoice" element={<InvoiceDetails />} />
      <Route path="/billing/payment-method" element={<PaymentMethod />} />
      <Route path="/billing/confirm" element={<PaymentConfirm />} />
      <Route path="/billing/success" element={<PaymentSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NavigationProvider>
        <Toast />
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </NavigationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
