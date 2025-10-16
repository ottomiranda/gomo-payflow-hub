import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, CreditCard, Lock, AlertCircle, Shield } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

export function PaymentConfirm() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setShowProcessingDialog(true);
    
    // Simular processamento de pagamento
    setTimeout(() => {
      setShowProcessingDialog(false);
      setIsProcessing(false);
      // Scroll para o topo antes de navegar
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      navigate("/billing/success");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gomo-dark">
      <NavigationDrawer />
      
      {/* Header */}
        <header className="gradient-purple text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/billing/payment-method">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Confirm Payment</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Secure Payment Badge */}
        <div className="flex items-center justify-center gap-3 p-4 bg-success/10 rounded-xl border border-success/20">
          <Shield className="h-6 w-6 text-success" />
          <span className="text-base font-semibold text-success">Secure Payment Processing</span>
        </div>

        {/* Payment Summary */}
        <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex justify-between items-center pb-5 border-b-2">
              <span className="text-base text-white/80 font-medium">Amount</span>
              <span className="text-6xl">
                <span className="font-sans text-white">CHF </span>
                <span className="font-rounded font-extrabold text-accent">25.90</span>
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-base text-white/80">Payment Method</span>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-1.5">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-lg">TWINT</span>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-base text-white/80">Invoice Number</span>
              <span className="font-semibold">INV-2025-10-001</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-base text-white/80">Due Date</span>
              <span className="font-semibold">31 Oct 2025</span>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-white/5 border-white/20 shadow-card text-white">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Before you confirm
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Ensure your payment details are correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Payment will be processed immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>You will receive a confirmation email</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4 pt-2">
          <Button 
            className="w-full" 
            variant="accent"
            size="lg"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            <Lock className="h-5 w-5 mr-2" />
            Confirm Payment
          </Button>
          <Link to="/billing/payment-method" className="block">
            <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10" size="lg">
              Change Payment Method
            </Button>
          </Link>
        </div>
      </main>

      <BottomNavbar />

      {/* Processing Dialog */}
      <Dialog open={showProcessingDialog}>
        <DialogContent className="[&>button]:hidden max-w-sm bg-gomo-dark border-white/20 text-white">
          <div className="flex flex-col items-center justify-center py-10 space-y-6">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary"></div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-white">Processing Payment</h3>
              <p className="text-base text-white/80">
                Please wait while we securely process your payment...
              </p>
              <p className="text-sm text-primary font-semibold mt-4 bg-primary/10 px-4 py-2 rounded-lg inline-block">
                Do not close this window
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}