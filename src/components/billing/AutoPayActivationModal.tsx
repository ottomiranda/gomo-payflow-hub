import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Plus, Shield, Lock, CheckCircle, Loader2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: typeof CreditCard;
  recommended?: boolean;
}

interface AutoPayActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentMethod: string) => void;
}

export function AutoPayActivationModal({ isOpen, onClose, onSuccess }: AutoPayActivationModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [step, setStep] = useState<'select' | 'authenticate' | 'success'>('select');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: "twint", name: "TWINT", icon: Smartphone, recommended: true },
    { id: "visa", name: "Visa ****1234", icon: CreditCard, recommended: false },
    { id: "new", name: "Add new payment method", icon: Plus, recommended: false }
  ];

  const handleContinue = () => {
    if (!selectedMethod) return;
    
    if (selectedMethod === 'new') {
      // Redirecionar para adicionar novo método
      window.location.href = '/billing/payment-method';
      return;
    }
    
    setStep('authenticate');
  };

  const handleAuthenticate = async () => {
    setIsProcessing(true);
    
    // Simular autenticação 3D Secure/biometria
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
    
    // Aguardar um pouco antes de chamar onSuccess
    setTimeout(() => {
      const methodName = paymentMethods.find(m => m.id === selectedMethod)?.name || selectedMethod;
      onSuccess(methodName);
      onClose();
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setSelectedMethod("");
    setStep('select');
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (step === 'authenticate' && isProcessing) return; // Não permitir fechar durante autenticação
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gomo-dark border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {step === 'select' && 'Enable Auto Pay'}
            {step === 'authenticate' && 'Secure Authentication'}
            {step === 'success' && 'Auto Pay Enabled!'}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Select Payment Method */}
        {step === 'select' && (
          <div className="space-y-6">
            <p className="text-white/80">
              Choose a payment method for your automatic payments:
            </p>

            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all bg-white/5 hover:bg-white/10 border-white/20 text-white ${
                    selectedMethod === method.id ? "border-accent" : ""
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={method.id} id={method.id} className="h-4 w-4" />
                      <div className="bg-primary/10 rounded-full p-2">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{method.name}</p>
                        {method.recommended && (
                          <span className="inline-block text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold mt-1">
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>

            {/* Security Note */}
            <Card className="bg-white/5 border-white/20">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1 text-white">Secure Auto Pay</p>
                  <p className="text-xs text-white/80">
                    Your payment method will be securely stored and used for automatic monthly payments.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleContinue}
                disabled={!selectedMethod}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Authentication */}
        {step === 'authenticate' && (
          <div className="space-y-6 text-center">
            <div className="bg-primary/10 rounded-full p-6 mx-auto w-fit">
              <Lock className="h-12 w-12 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Secure Authentication Required</h3>
              <p className="text-white/80 text-sm">
                Please complete the authentication to enable Auto Pay with your selected payment method.
              </p>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">TWINT</p>
                  <p className="text-xs text-white/80">3D Secure Authentication</p>
                </div>
              </div>
            </div>

            <Button
              variant="accent"
              className="w-full"
              onClick={handleAuthenticate}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Authenticate Now
                </>
              )}
            </Button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="bg-success/10 rounded-full p-6 mx-auto w-fit">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-success">Auto Pay Successfully Enabled!</h3>
              <p className="text-white/80 text-sm">
                Your next bill will be paid automatically on <strong>31 Nov</strong>.
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="text-success text-sm font-medium">
                Auto Pay has been successfully enabled. Your next bill will be paid automatically on 31 Nov.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}