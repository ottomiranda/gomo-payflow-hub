import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AutoPayCard } from '../AutoPayCard';
import { useAutoPay } from '../../hooks/useAutoPay';

// Mock do hook useAutoPay
vi.mock('../../hooks/useAutoPay');

const mockUseAutoPay = vi.mocked(useAutoPay);

describe('AutoPayCard', () => {
  const defaultMockReturn = {
    status: 'disabled' as const,
    isLoading: false,
    error: null,
    nextPaymentDate: null,
    paymentMethod: null,
    enableAutoPay: vi.fn(),
    disableAutoPay: vi.fn(),
    pauseAutoPay: vi.fn(),
    resumeAutoPay: vi.fn(),
    clearError: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAutoPay.mockReturnValue(defaultMockReturn);
  });

  describe('Estado Disabled', () => {
    it('deve renderizar o estado disabled corretamente', () => {
      render(<AutoPayCard />);
      
      expect(screen.getByText('Auto-Pay')).toBeInTheDocument();
      expect(screen.getByText('Currently inactive')).toBeInTheDocument();
      expect(screen.getByText('Turn on Auto Pay to never miss a payment again.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enable auto-pay/i })).toBeInTheDocument();
    });

    it('deve chamar enableAutoPay ao clicar no botão Enable', async () => {
      const mockEnableAutoPay = vi.fn();
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        enableAutoPay: mockEnableAutoPay,
      });

      render(<AutoPayCard />);
      
      const enableButton = screen.getByRole('button', { name: /enable auto-pay/i });
      fireEvent.click(enableButton);
      
      expect(mockEnableAutoPay).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Enabled', () => {
    it('deve renderizar o estado enabled corretamente', () => {
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'enabled',
        nextPaymentDate: '31 Nov 2025',
        paymentMethod: 'TWINT',
      });

      render(<AutoPayCard />);
      
      expect(screen.getByText('Auto-Pay')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Next payment: 31 Nov 2025 via TWINT')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /disable/i })).toBeInTheDocument();
    });

    it('deve chamar pauseAutoPay ao clicar no botão Pause', async () => {
      const mockPauseAutoPay = vi.fn();
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'enabled',
        nextPaymentDate: '31 Nov 2025',
        paymentMethod: 'TWINT',
        pauseAutoPay: mockPauseAutoPay,
      });

      render(<AutoPayCard />);
      
      const pauseButton = screen.getByRole('button', { name: /pause/i });
      fireEvent.click(pauseButton);
      
      expect(mockPauseAutoPay).toHaveBeenCalledTimes(1);
    });

    it('deve chamar disableAutoPay ao clicar no botão Disable', async () => {
      const mockDisableAutoPay = vi.fn();
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'enabled',
        nextPaymentDate: '31 Nov 2025',
        paymentMethod: 'TWINT',
        disableAutoPay: mockDisableAutoPay,
      });

      render(<AutoPayCard />);
      
      const disableButton = screen.getByRole('button', { name: /disable/i });
      fireEvent.click(disableButton);
      
      expect(mockDisableAutoPay).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Paused', () => {
    it('deve renderizar o estado paused corretamente', () => {
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'paused',
      });

      render(<AutoPayCard />);
      
      expect(screen.getByText('Auto-Pay')).toBeInTheDocument();
      expect(screen.getByText('Paused')).toBeInTheDocument();
      expect(screen.getByText('Auto Pay paused. Tap to resume anytime.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /disable/i })).toBeInTheDocument();
    });

    it('deve chamar resumeAutoPay ao clicar no botão Resume', async () => {
      const mockResumeAutoPay = vi.fn();
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'paused',
        resumeAutoPay: mockResumeAutoPay,
      });

      render(<AutoPayCard />);
      
      const resumeButton = screen.getByRole('button', { name: /resume/i });
      fireEvent.click(resumeButton);
      
      expect(mockResumeAutoPay).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Error', () => {
    it('deve renderizar o estado error corretamente', () => {
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'error',
        error: 'Payment method failed',
      });

      render(<AutoPayCard />);
      
      expect(screen.getByText('Auto-Pay')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('We couldn\'t process your last Auto Pay. Update your payment method.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /update payment method/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    it('deve chamar clearError ao clicar no botão Dismiss', async () => {
      const mockClearError = vi.fn();
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'error',
        error: 'Payment method failed',
        clearError: mockClearError,
      });

      render(<AutoPayCard />);
      
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      fireEvent.click(dismissButton);
      
      expect(mockClearError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Loading', () => {
    it('deve renderizar o estado loading corretamente', () => {
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        isLoading: true,
      });

      render(<AutoPayCard />);
      
      expect(screen.getByText('Auto-Pay')).toBeInTheDocument();
      expect(screen.getByText('Processing...')).toBeInTheDocument();
      
      // Botões devem estar desabilitados durante loading
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Mensagens de Sucesso', () => {
    it('deve exibir mensagem de sucesso após ativar Auto-Pay', async () => {
      const mockEnableAutoPay = vi.fn().mockImplementation(() => {
        // Simula mudança de estado após sucesso
        mockUseAutoPay.mockReturnValue({
          ...defaultMockReturn,
          status: 'enabled',
          nextPaymentDate: '31 Nov 2025',
          paymentMethod: 'TWINT',
        });
      });

      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        enableAutoPay: mockEnableAutoPay,
      });

      const { rerender } = render(<AutoPayCard />);
      
      const enableButton = screen.getByRole('button', { name: /enable auto-pay/i });
      fireEvent.click(enableButton);
      
      // Re-renderiza com o novo estado
      rerender(<AutoPayCard />);
      
      await waitFor(() => {
        expect(screen.getByText('Auto Pay activated! Next bill will be paid automatically.')).toBeInTheDocument();
      });
    });

    it('deve ocultar mensagem de sucesso após 3 segundos', async () => {
      vi.useFakeTimers();
      
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'enabled',
        nextPaymentDate: '31 Nov 2025',
        paymentMethod: 'TWINT',
      });

      render(<AutoPayCard />);
      
      // Simula que acabou de ser ativado
      expect(screen.getByText('Auto Pay activated! Next bill will be paid automatically.')).toBeInTheDocument();
      
      // Avança 3 segundos
      vi.advanceTimersByTime(3000);
      
      await waitFor(() => {
        expect(screen.queryByText('Auto Pay activated! Next bill will be paid automatically.')).not.toBeInTheDocument();
      });
      
      vi.useRealTimers();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter estrutura semântica correta', () => {
      render(<AutoPayCard />);
      
      // Verifica se há um heading para o título
      expect(screen.getByRole('heading', { name: 'Auto-Pay' })).toBeInTheDocument();
      
      // Verifica se os botões têm labels apropriados
      const enableButton = screen.getByRole('button', { name: /enable auto-pay/i });
      expect(enableButton).toBeInTheDocument();
    });

    it('deve ter indicadores visuais apropriados para cada estado', () => {
      // Estado disabled
      render(<AutoPayCard />);
      expect(screen.getByText('Currently inactive')).toHaveClass('text-gray-500');
      
      // Estado enabled
      mockUseAutoPay.mockReturnValue({
        ...defaultMockReturn,
        status: 'enabled',
        nextPaymentDate: '31 Nov 2025',
        paymentMethod: 'TWINT',
      });
      
      const { rerender } = render(<AutoPayCard />);
      rerender(<AutoPayCard />);
      expect(screen.getByText('Active')).toHaveClass('text-green-600');
    });
  });
});