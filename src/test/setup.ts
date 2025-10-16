import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock do gtag para testes
Object.defineProperty(window, 'gtag', {
  value: vi.fn(),
  writable: true,
});

// Mock do matchMedia para testes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});