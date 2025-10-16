import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface LinkWithScrollProps extends LinkProps {
  children: React.ReactNode;
  scrollToTop?: boolean;
}

/**
 * Componente Link personalizado que automaticamente faz scroll para o topo
 * quando navega para uma nova página
 */
export const LinkWithScroll: React.FC<LinkWithScrollProps> = ({ 
  children, 
  scrollToTop = true, 
  onClick,
  ...props 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollToTop) {
      // Scroll para o topo da página
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    
    // Chama o onClick original se existir
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};