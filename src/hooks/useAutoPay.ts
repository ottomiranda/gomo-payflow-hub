import { useState, useCallback } from 'react';

export type AutoPayStatus = 'disabled' | 'enabled' | 'paused' | 'error' | 'payment_failed';

export interface AutoPayState {
  status: AutoPayStatus;
  isLoading: boolean;
  error: string | null;
  lastPaymentDate: string | null;
  nextPaymentDate: string | null;
  paymentMethod: string | null;
  isPausedForOneCycle: boolean;
}

export interface AutoPayActions {
  enableAutoPay: () => Promise<void>;
  disableAutoPay: () => Promise<void>;
  pauseAutoPay: () => Promise<void>;
  resumeAutoPay: () => Promise<void>;
  clearError: () => void;
}

// Mock API functions
const mockApiDelay = (ms: number = 1500) => new Promise(resolve => setTimeout(resolve, ms));

const mockEnableAutoPay = async (): Promise<{ success: boolean; error?: string }> => {
  await mockApiDelay();
  // Simula 90% de sucesso
  const success = Math.random() > 0.1;
  return success 
    ? { success: true }
    : { success: false, error: "We couldn't process your last Auto Pay. Update your payment method." };
};

const mockDisableAutoPay = async (): Promise<{ success: boolean }> => {
  await mockApiDelay(800);
  return { success: true };
};

const mockPauseAutoPay = async (): Promise<{ success: boolean }> => {
  await mockApiDelay(800);
  return { success: true };
};

const mockResumeAutoPay = async (): Promise<{ success: boolean }> => {
  await mockApiDelay(1000);
  return { success: true };
};

export function useAutoPay(): AutoPayState & AutoPayActions {
  const [state, setState] = useState<AutoPayState>({
    status: 'disabled',
    isLoading: false,
    error: null,
    lastPaymentDate: null,
    nextPaymentDate: null,
    paymentMethod: null,
    isPausedForOneCycle: false,
  });

  const enableAutoPay = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await mockEnableAutoPay();
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          status: 'enabled',
          isLoading: false,
          nextPaymentDate: '31 Nov 2025', // Próxima fatura
          paymentMethod: 'TWINT',
        }));
        
        // Telemetria
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'auto_pay_enabled', {
            event_category: 'billing',
            event_label: 'auto_pay_activation',
          });
        }
      } else {
        setState(prev => ({
          ...prev,
          status: 'error',
          isLoading: false,
          error: result.error || 'Unknown error occurred',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        status: 'error',
        isLoading: false,
        error: 'Network error. Please try again.',
      }));
    }
  }, []);

  const disableAutoPay = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await mockDisableAutoPay();
      setState(prev => ({
        ...prev,
        status: 'disabled',
        isLoading: false,
        nextPaymentDate: null,
        paymentMethod: null,
      }));
      
      // Telemetria
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'auto_pay_disabled', {
          event_category: 'billing',
          event_label: 'auto_pay_deactivation',
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to disable Auto-Pay. Please try again.',
      }));
    }
  }, []);

  const pauseAutoPay = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await mockPauseAutoPay();
      setState(prev => ({
        ...prev,
        status: 'paused',
        isLoading: false,
        isPausedForOneCycle: true,
      }));
      
      // Telemetria
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'auto_pay_paused', {
          event_category: 'billing',
          event_label: 'auto_pay_pause',
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to pause Auto-Pay. Please try again.',
      }));
    }
  }, []);

  const resumeAutoPay = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await mockResumeAutoPay();
      setState(prev => ({
        ...prev,
        status: 'enabled',
        isLoading: false,
        isPausedForOneCycle: false,
      }));
      
      // Telemetria
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'auto_pay_resumed', {
          event_category: 'billing',
          event_label: 'auto_pay_resume',
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to resume Auto-Pay. Please try again.',
      }));
    }
  }, []);

  // Função para simular falha de pagamento automático
  const simulatePaymentFailure = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'payment_failed',
      error: 'Last Auto Pay failed. Update your payment method.',
    }));

    // Telemetria
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'auto_pay_failed', {
        event_category: 'billing',
        event_label: 'payment_failure',
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    enableAutoPay,
    disableAutoPay,
    pauseAutoPay,
    resumeAutoPay,
    clearError,
    simulatePaymentFailure,
  };
}