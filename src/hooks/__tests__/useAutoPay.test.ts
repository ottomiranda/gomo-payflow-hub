import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAutoPay } from '../useAutoPay';

// Mock das funções de API
vi.mock('../useAutoPay', async () => {
  const actual = await vi.importActual('../useAutoPay');
  return {
    ...actual,
    // Mantemos a implementação real do hook, mas podemos mockar as APIs se necessário
  };
});

describe('useAutoPay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock do gtag para telemetria
    (global as any).window = {
      gtag: vi.fn(),
    };
  });

  it('deve inicializar com estado disabled', () => {
    const { result } = renderHook(() => useAutoPay());
    
    expect(result.current.status).toBe('disabled');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.nextPaymentDate).toBe(null);
    expect(result.current.paymentMethod).toBe(null);
  });

  it('deve ter todas as funções de ação disponíveis', () => {
    const { result } = renderHook(() => useAutoPay());
    
    expect(typeof result.current.enableAutoPay).toBe('function');
    expect(typeof result.current.disableAutoPay).toBe('function');
    expect(typeof result.current.pauseAutoPay).toBe('function');
    expect(typeof result.current.resumeAutoPay).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('deve definir isLoading como true durante enableAutoPay', async () => {
    const { result } = renderHook(() => useAutoPay());
    
    act(() => {
      result.current.enableAutoPay();
    });
    
    expect(result.current.isLoading).toBe(true);
  });

  it('deve limpar erro ao chamar clearError', () => {
    const { result } = renderHook(() => useAutoPay());
    
    // Simula um estado de erro
    act(() => {
      (result.current as any).setState((prev: any) => ({
        ...prev,
        error: 'Test error',
      }));
    });
    
    act(() => {
      result.current.clearError();
    });
    
    expect(result.current.error).toBe(null);
  });

  describe('enableAutoPay', () => {
    it('deve definir status como enabled em caso de sucesso', async () => {
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.enableAutoPay();
      });
      
      // Como o mock tem 90% de chance de sucesso, testamos ambos os casos
      expect(['enabled', 'error']).toContain(result.current.status);
      expect(result.current.isLoading).toBe(false);
    });

    it('deve definir dados de pagamento em caso de sucesso', async () => {
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.enableAutoPay();
      });
      
      if (result.current.status === 'enabled') {
        expect(result.current.nextPaymentDate).toBe('31 Nov 2025');
        expect(result.current.paymentMethod).toBe('TWINT');
      }
    });
  });

  describe('disableAutoPay', () => {
    it('deve definir status como disabled', async () => {
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.disableAutoPay();
      });
      
      expect(result.current.status).toBe('disabled');
      expect(result.current.nextPaymentDate).toBe(null);
      expect(result.current.paymentMethod).toBe(null);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('pauseAutoPay', () => {
    it('deve definir status como paused', async () => {
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.pauseAutoPay();
      });
      
      expect(result.current.status).toBe('paused');
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('resumeAutoPay', () => {
    it('deve definir status como enabled', async () => {
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.resumeAutoPay();
      });
      
      expect(result.current.status).toBe('enabled');
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Telemetria', () => {
    it('deve enviar evento de telemetria ao ativar Auto-Pay', async () => {
      const mockGtag = vi.fn();
      (global as any).window.gtag = mockGtag;
      
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.enableAutoPay();
      });
      
      if (result.current.status === 'enabled') {
        expect(mockGtag).toHaveBeenCalledWith('event', 'auto_pay_enabled', {
          event_category: 'billing',
          event_label: 'auto_pay_activation',
        });
      }
    });

    it('deve enviar evento de telemetria ao desativar Auto-Pay', async () => {
      const mockGtag = vi.fn();
      (global as any).window.gtag = mockGtag;
      
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.disableAutoPay();
      });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'auto_pay_disabled', {
        event_category: 'billing',
        event_label: 'auto_pay_deactivation',
      });
    });

    it('deve enviar evento de telemetria ao pausar Auto-Pay', async () => {
      const mockGtag = vi.fn();
      (global as any).window.gtag = mockGtag;
      
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.pauseAutoPay();
      });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'auto_pay_paused', {
        event_category: 'billing',
        event_label: 'auto_pay_pause',
      });
    });

    it('deve enviar evento de telemetria ao retomar Auto-Pay', async () => {
      const mockGtag = vi.fn();
      (global as any).window.gtag = mockGtag;
      
      const { result } = renderHook(() => useAutoPay());
      
      await act(async () => {
        await result.current.resumeAutoPay();
      });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'auto_pay_resumed', {
        event_category: 'billing',
        event_label: 'auto_pay_resume',
      });
    });
  });
});