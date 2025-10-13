import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Smartphone, Lock, AlertCircle } from "lucide-react";

export function PaymentConfirm() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);

  const handleConfirm = () => {
    setShowProcessingDialog(true);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowProcessingDialog(false);
      navigate("/billing/success");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gomo-purple text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            asChild
          >
            <Link to="/billing/payment-method">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Confirm Payment</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Security Badge */}
        <Card className="shadow-card bg-success/10 border-success">
          <CardContent className="p-4 flex items-center gap-3">
            <Lock className="h-5 w-5 text-success flex-shrink-0" />
            <p className="text-sm text-success-foreground">
              <span className="font-semibold">Secure Payment</span> - Your transaction is protected with end-to-end encryption
            </p>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-4">
            <div className="text-center pb-4 border-b">
              <p className="text-sm text-muted-foreground mb-2">Payment Amount</p>
              <p className="text-5xl font-bold text-primary">CHF 25.90</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="font-semibold">TWINT</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Invoice</span>
                <span className="font-semibold">October 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-xs">TXN-2025-1234</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="shadow-card bg-muted">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Before you confirm:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Double-check the payment amount</li>
                <li>Ensure you have sufficient funds</li>
                <li>You'll receive a confirmation email</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            asChild
          >
            <Link to="/billing/payment-method">Change Payment Method</Link>
          </Button>
        </div>
      </main>

      {/* Processing Dialog */}
      <Dialog open={showProcessingDialog} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-center">Processing Payment</DialogTitle>
            <DialogDescription className="text-center pt-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Please wait, do not close this window...</p>
                <p className="text-xs text-muted-foreground">Securely processing your payment</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
