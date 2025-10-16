import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Pause, X, Loader2, Calendar, CreditCard } from "lucide-react";
import { useAutoPay } from "@/hooks/useAutoPay";
import { AutoPayActivationModal } from "./AutoPayActivationModal";
import { AutoPayManagementModal } from "./AutoPayManagementModal";

export function AutoPayCard() {
  const { 
    status, 
    nextPaymentDate, 
    paymentMethod, 
    isLoading, 
    error,
    isPausedForOneCycle,
    enableAutoPay,
    disableAutoPay,
    pauseAutoPay,
    resumeAutoPay,
    clearError,
    simulatePaymentFailure
  } = useAutoPay();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [showManagementModal, setShowManagementModal] = useState(false);

  // Mostrar mensagem de sucesso quando Auto-Pay for ativado
  useEffect(() => {
    if (status === 'enabled' && !showSuccessMessage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [status, showSuccessMessage]);

  const handleActivationSuccess = (selectedPaymentMethod: string) => {
    enableAutoPay();
    setShowSuccessMessage(true);
  };

  const handleManagementAction = (action: 'pause' | 'disable') => {
    if (action === 'pause') {
      pauseAutoPay();
    } else {
      disableAutoPay();
    }
    setShowManagementModal(false);
  };

  const getConfig = () => {
    switch (status) {
      case 'disabled':
        return {
          title: 'Auto-Pay',
          description: 'Turn on Auto Pay to never miss a payment again.',
          badge: { text: 'Currently inactive', className: 'bg-white/10 text-white/80 border border-white/20' },
          icon: null,
          primaryAction: {
            text: 'Enable Auto-Pay',
            onClick: () => setShowActivationModal(true),
            variant: 'accent' as const,
          },
          secondaryAction: null,
        };
      
      case 'enabled':
        return {
          title: 'Auto-Pay',
          description: `Next payment: ${nextPaymentDate || 'Not scheduled'} • ${paymentMethod || 'No method selected'}`,
          badge: { text: 'Active', className: 'bg-success/20 text-success border border-success/30' },
          icon: <CheckCircle className="h-5 w-5 text-success" />,
          primaryAction: {
            text: 'Auto Pay Enabled',
            onClick: () => setShowManagementModal(true),
            variant: 'accent' as const,
          },
          secondaryAction: null,
        };
      
      case 'paused':
        return {
          title: 'Auto-Pay',
          description: isPausedForOneCycle 
            ? `Paused for 1 cycle • Resumes after ${nextPaymentDate || 'next due date'}`
            : `Paused • ${paymentMethod || 'No method selected'}`,
          badge: { text: 'Paused', className: 'bg-warning/20 text-warning border border-warning/30' },
          icon: <Pause className="h-5 w-5 text-warning" />,
          primaryAction: {
            text: 'Resume Auto-Pay',
            onClick: resumeAutoPay,
            variant: 'accent' as const,
          },
          secondaryAction: {
            text: 'Disable',
            onClick: disableAutoPay,
            variant: 'ghost' as const,
          },
        };
      
      case 'payment_failed':
        return {
          title: 'Auto-Pay',
          description: "Last Auto Pay failed. Update your payment method.",
          badge: { text: 'Payment Failed', className: 'bg-destructive/20 text-destructive border border-destructive/30' },
          icon: <AlertCircle className="h-5 w-5 text-destructive" />,
          primaryAction: {
            text: 'Fix Payment Method',
            onClick: () => setShowActivationModal(true),
            variant: 'destructive' as const,
          },
          secondaryAction: {
            text: 'Disable Auto-Pay',
            onClick: disableAutoPay,
            variant: 'ghost' as const,
          },
        };
      
      case 'error':
      default:
        return {
          title: 'Auto-Pay',
          description: error || "We couldn't process your last Auto Pay. Update your payment method.",
          badge: { text: 'Error', className: 'bg-destructive/20 text-destructive border border-destructive/30' },
          icon: <AlertCircle className="h-5 w-5 text-destructive" />,
          primaryAction: {
            text: 'Fix Payment Method',
            onClick: () => setShowActivationModal(true),
            variant: 'accent' as const,
          },
          secondaryAction: {
            text: 'Disable Auto-Pay',
            onClick: disableAutoPay,
            variant: 'ghost' as const,
          },
        };
    }
  };

  const config = getConfig();

  return (
    <>
      <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
        {/* Alert para falha de pagamento */}
        {status === 'payment_failed' && (
          <div className="bg-destructive/10 border-b border-destructive/20 p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-destructive font-medium text-sm">
                Last Auto Pay failed. Update your payment method.
              </p>
            </div>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
              {config.icon}
              {config.title}
            </CardTitle>
            <Badge className={config.badge.className}>
              {config.badge.text}
            </Badge>
          </div>
          <p className="text-white/80 text-sm mt-2">{config.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Message */}
          {error && status !== 'payment_failed' && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-destructive hover:bg-destructive/10 p-1 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Success Message */}
          {showSuccessMessage && status === 'enabled' && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <p className="text-sm text-success font-medium">
                Auto Pay has been successfully enabled. Your next bill will be paid automatically on 31 Nov.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className={`flex gap-3 pt-2 ${
            status === 'payment_failed' || status === 'error' 
              ? 'flex-col' 
              : 'flex-col sm:flex-row'
          }`}>
            <Button
              variant={config.primaryAction.variant}
              className={`min-w-0 h-auto py-3 px-6 font-bold ${
                status === 'payment_failed' || status === 'error' 
                  ? 'w-full' 
                  : 'flex-1'
              }`}
              size="lg"
              onClick={config.primaryAction.onClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                config.primaryAction.text
              )}
            </Button>
            
            {config.secondaryAction && (
              <Button
                variant={config.secondaryAction.variant}
                size="lg"
                onClick={config.secondaryAction.onClick}
                disabled={isLoading}
                className={`bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white min-w-0 h-auto py-3 px-6 font-bold ${
                  status === 'payment_failed' || status === 'error' 
                    ? 'w-full' 
                    : 'sm:flex-shrink-0'
                }`}
              >
                {config.secondaryAction.text}
              </Button>
            )}
          </div>

          {/* Debug: Botão para simular falha de pagamento (remover em produção) */}
          {process.env.NODE_ENV === 'development' && (
            <Button
              variant="outline"
              size="sm"
              onClick={simulatePaymentFailure}
              className="w-full bg-white/5 border-white/20 text-white/60 hover:bg-white/10 text-xs"
            >
              [DEBUG] Simulate Payment Failure
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AutoPayActivationModal
        isOpen={showActivationModal}
        onClose={() => setShowActivationModal(false)}
        onSuccess={handleActivationSuccess}
      />

      <AutoPayManagementModal
        isOpen={showManagementModal}
        onClose={() => setShowManagementModal(false)}
        onPause={() => handleManagementAction('pause')}
        onDisable={() => handleManagementAction('disable')}
        nextPaymentDate={nextPaymentDate || '31 Nov'}
        paymentMethod={paymentMethod || 'TWINT'}
      />
    </>
  );
}
