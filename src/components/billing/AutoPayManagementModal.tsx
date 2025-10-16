import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, Calendar, AlertTriangle, CheckCircle, Pause, X } from "lucide-react";

interface AutoPayManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPause: () => void;
  onDisable: () => void;
  nextPaymentDate: string;
  paymentMethod: string;
}

export function AutoPayManagementModal({ 
  isOpen, 
  onClose, 
  onPause, 
  onDisable, 
  nextPaymentDate, 
  paymentMethod 
}: AutoPayManagementModalProps) {
  const [step, setStep] = useState<'manage' | 'confirm-disable' | 'success'>('manage');
  const [action, setAction] = useState<'pause' | 'disable' | null>(null);

  const handlePause = () => {
    setAction('pause');
    onPause();
    setStep('success');
    
    setTimeout(() => {
      onClose();
      resetModal();
    }, 2000);
  };

  const handleDisableConfirm = () => {
    setAction('disable');
    setStep('confirm-disable');
  };

  const handleDisableFinal = () => {
    onDisable();
    setStep('success');
    
    setTimeout(() => {
      onClose();
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setStep('manage');
    setAction(null);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  const getPaymentMethodIcon = () => {
    if (paymentMethod.toLowerCase().includes('twint')) {
      return <Smartphone className="h-5 w-5 text-primary" />;
    }
    return <CreditCard className="h-5 w-5 text-primary" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gomo-dark border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {step === 'manage' && 'Manage Auto Pay'}
            {step === 'confirm-disable' && 'Turn Off Auto Pay?'}
            {step === 'success' && (action === 'pause' ? 'Auto Pay Paused' : 'Auto Pay Disabled')}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Manage Options */}
        {step === 'manage' && (
          <div className="space-y-6">
            {/* Current Auto Pay Info */}
            <div className="space-y-4">
              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">Next Automatic Payment</p>
                      <p className="text-white/80 text-sm">{nextPaymentDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      {getPaymentMethodIcon()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">Payment Method</p>
                      <p className="text-white/80 text-sm">{paymentMethod}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Options */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">What would you like to do?</h3>
              
              <Button
                variant="outline"
                className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10 h-auto p-4"
                onClick={handlePause}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-warning/10 rounded-full p-2">
                    <Pause className="h-5 w-5 text-warning" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Pause for 1 cycle</p>
                    <p className="text-xs text-white/80">Skip next payment, resume automatically after</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10 h-auto p-4"
                onClick={handleDisableConfirm}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-destructive/10 rounded-full p-2">
                    <X className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Turn off Auto Pay</p>
                    <p className="text-xs text-white/80">Disable automatic payments completely</p>
                  </div>
                </div>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full border border-white text-white hover:bg-white/10 hover:text-white font-bold py-3 px-6 rounded-full transition-colors"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Step 2: Confirm Disable */}
        {step === 'confirm-disable' && (
          <div className="space-y-6">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-semibold text-warning text-sm mb-1">Important Notice</p>
                <p className="text-white/80 text-sm">
                  Turning off Auto Pay means you'll need to pay manually each month.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white/80 text-sm">
                Are you sure you want to turn off Auto Pay? You can always enable it again later.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
                onClick={() => setStep('manage')}
              >
                Go Back
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDisableFinal}
              >
                Turn Off Auto Pay
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className={`rounded-full p-6 mx-auto w-fit ${
              action === 'pause' ? 'bg-warning/10' : 'bg-success/10'
            }`}>
              {action === 'pause' ? (
                <Pause className="h-12 w-12 text-warning" />
              ) : (
                <CheckCircle className="h-12 w-12 text-success" />
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-lg font-semibold ${
                action === 'pause' ? 'text-warning' : 'text-success'
              }`}>
                {action === 'pause' ? 'Auto Pay Paused!' : 'Auto Pay Disabled!'}
              </h3>
              <p className="text-white/80 text-sm">
                {action === 'pause' 
                  ? 'Your next payment will be skipped. Auto Pay will resume automatically after that.'
                  : 'Auto Pay has been turned off. You\'ll need to pay manually each month.'
                }
              </p>
            </div>

            <div className={`border rounded-lg p-4 ${
              action === 'pause' 
                ? 'bg-warning/10 border-warning/20' 
                : 'bg-success/10 border-success/20'
            }`}>
              <p className={`text-sm font-medium ${
                action === 'pause' ? 'text-warning' : 'text-success'
              }`}>
                {action === 'pause' 
                  ? 'Auto Pay paused for 1 cycle. It will resume automatically after your next due date.'
                  : 'Auto Pay has been successfully disabled. You can enable it again anytime.'
                }
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}