import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AutoPayCard } from '../AutoPayCard';

// Mock do hook useAutoPay
const mockUseAutoPay = {
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

vi.mock('@/hooks/useAutoPay', () => ({
  useAutoPay: () => mockUseAutoPay,
}));

describe('AutoPayCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAutoPay.status = 'disabled';
    mockUseAutoPay.isLoading = false;
    mockUseAutoPay.error = null;
    mockUseAutoPay.nextPaymentDate = null;
    mockUseAutoPay.paymentMethod = null;
  });

  describe('Estado Disabled', () => {
    it('deve renderizar o estado inicial corretamente', () => {
      render(<AutoPayCard />);
      
      expect(screen.getByText('Auto-Pay')).toBeInTheDocument();
      expect(screen.getByText('Automatic Payments')).toBeInTheDocument();
      expect(screen.getByText('Turn on Auto Pay to never miss a payment again.')).toBeInTheDocument();
      expect(screen.getByText('Off')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Enable Auto-Pay' })).toBeInTheDocument();
    });

    it('deve chamar enableAutoPay ao clicar no botão', async () => {
      render(<AutoPayCard />);
      
      const enableButton = screen.getByRole('button', { name: 'Enable Auto-Pay' });
      fireEvent.click(enableButton);
      
      expect(mockUseAutoPay.enableAutoPay).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Enabled', () => {
    beforeEach(() => {
      mockUseAutoPay.status = 'enabled';
      mockUseAutoPay.nextPaymentDate = '31 Nov 2025';
      mockUseAutoPay.paymentMethod = 'TWINT';
    });

    it('deve renderizar o estado ativo corretamente', () => {
      render(<AutoPayCard />);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Next payment on 31 Nov 2025')).toBeInTheDocument();
      expect(screen.getByText('via TWINT')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Pause Auto-Pay' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Disable' })).toBeInTheDocument();
    });

    it('deve chamar pauseAutoPay ao clicar no botão pause', async () => {
      render(<AutoPayCard />);
      
      const pauseButton = screen.getByRole('button', { name: 'Pause Auto-Pay' });
      fireEvent.click(pauseButton);
      
      expect(mockUseAutoPay.pauseAutoPay).toHaveBeenCalledTimes(1);
    });

    it('deve chamar disableAutoPay ao clicar no botão disable', async () => {
      render(<AutoPayCard />);
      
      const disableButton = screen.getByRole('button', { name: 'Disable' });
      fireEvent.click(disableButton);
      
      expect(mockUseAutoPay.disableAutoPay).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Paused', () => {
    beforeEach(() => {
      mockUseAutoPay.status = 'paused';
    });

    it('deve renderizar o estado pausado corretamente', () => {
      render(<AutoPayCard />);
      
      expect(screen.getByText('Paused')).toBeInTheDocument();
      expect(screen.getByText('Auto Pay paused. Tap to resume anytime.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Resume Auto-Pay' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Disable' })).toBeInTheDocument();
    });

    it('deve chamar resumeAutoPay ao clicar no botão resume', async () => {
      render(<AutoPayCard />);
      
      const resumeButton = screen.getByRole('button', { name: 'Resume Auto-Pay' });
      fireEvent.click(resumeButton);
      
      expect(mockUseAutoPay.resumeAutoPay).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Error', () => {
    beforeEach(() => {
      mockUseAutoPay.status = 'error';
      mockUseAutoPay.error = "We couldn't process your last Auto Pay. Update your payment method.";
    });

    it('deve renderizar o estado de erro corretamente', () => {
      render(<AutoPayCard />);
      
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText("We couldn't process your last Auto Pay. Update your payment method.")).toBeInTheDocument();
      expect(screen.getByText('Payment Failed')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Fix Payment Method' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Disable Auto-Pay' })).toBeInTheDocument();
    });

    it('deve chamar clearError ao clicar no X', async () => {
      render(<AutoPayCard />);
      
      const clearButton = screen.getByRole('button', { name: '' }); // Botão X
      fireEvent.click(clearButton);
      
      expect(mockUseAutoPay.clearError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado Loading', () => {
    beforeEach(() => {
      mockUseAutoPay.isLoading = true;
    });

    it('deve mostrar estado de loading nos botões', () => {
      render(<AutoPayCard />);
      
      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Processing...' })).toBeDisabled();
    });
  });

  describe('Mensagem de Sucesso', () => {
    beforeEach(() => {
      mockUseAutoPay.status = 'enabled';
      mockUseAutoPay.nextPaymentDate = '31 Nov 2025';
      mockUseAutoPay.paymentMethod = 'TWINT';
    });

    it('deve mostrar mensagem de sucesso temporariamente após ativação', async () => {
      const { rerender } = render(<AutoPayCard />);
      
      // Simula mudança de estado para enabled
      mockUseAutoPay.status = 'enabled';
      rerender(<AutoPayCard />);
      
      await waitFor(() => {
        expect(screen.getByText('Auto Pay activated! Next bill will be paid automatically.')).toBeInTheDocument();
      });
    });
  });
});