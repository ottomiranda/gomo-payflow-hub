import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook que automaticamente faz scroll para o topo da página quando a rota muda
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll para o topo da página quando a rota muda
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
};

/**
 * Função utilitária para fazer scroll para o topo manualmente
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};