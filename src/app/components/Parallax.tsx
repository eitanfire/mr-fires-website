import { useEffect, useRef, useCallback } from 'react';

interface ParallaxConfig {
  backgroundImageUrl: string;
  middleImageUrl: string;
  foregroundImageUrl: string;
  containerHeight?: string;
}

interface ParallaxLayer {
  element: HTMLElement;
  speed: number;
}

// Custom React Hook for Parallax
export const useParallax = (config: ParallaxConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<ParallaxLayer[]>([]);
  const isScrollingRef = useRef(false);

  const updateParallax = useCallback(() => {
    if (!containerRef.current || layersRef.current.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.max(0, Math.min(1, 
      (windowHeight - containerTop) / (windowHeight + containerHeight)
    ));

    layersRef.current.forEach((layer) => {
      const translateY = scrollProgress * 100 * (1 - layer.speed);
      layer.element.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!isScrollingRef.current) {
      requestAnimationFrame(() => {
        updateParallax();
        isScrollingRef.current = false;
      });
      isScrollingRef.current = true;
    }
  }, [updateParallax]);

  const handleResize = useCallback(() => {
    requestAnimationFrame(() => {
      updateParallax();
    });
  }, [updateParallax]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup container styles with improved visual effects
    container.style.position = 'relative';
    container.style.height = config.containerHeight || '60vh';
    container.style.overflow = 'hidden';
    container.style.width = '100%';
    container.style.marginBottom = '2rem';
    container.style.isolation = 'isolate';
    container.style.zIndex = '1';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';

    // Create layers with enhanced visual effects
    const layerConfigs = [
      { 
        imageUrl: config.backgroundImageUrl, 
        speed: 0.2, 
        zIndex: 1,
        className: 'parallax-background',
        filter: 'brightness(0.8) contrast(1.1)'
      },
      { 
        imageUrl: config.middleImageUrl, 
        speed: 0.5, 
        zIndex: 2,
        className: 'parallax-middle',
        filter: 'brightness(0.9) contrast(1.05)'
      },
      { 
        imageUrl: config.foregroundImageUrl, 
        speed: 0.8, 
        zIndex: 3,
        className: 'parallax-foreground',
        filter: 'brightness(1) contrast(1)'
      }
    ];

    const layers: ParallaxLayer[] = [];

    layerConfigs.forEach((layerConfig) => {
      const layer = document.createElement('div');
      layer.className = layerConfig.className;
      
      // Enhanced layer styles
      layer.style.position = 'absolute';
      layer.style.top = '0';
      layer.style.left = '0';
      layer.style.width = '100%';
      layer.style.height = '120%';
      layer.style.backgroundImage = `url(${layerConfig.imageUrl})`;
      layer.style.backgroundSize = 'cover';
      layer.style.backgroundPosition = 'center';
      layer.style.backgroundRepeat = 'no-repeat';
      layer.style.zIndex = layerConfig.zIndex.toString();
      layer.style.willChange = 'transform';
      layer.style.contain = 'layout style paint';
      layer.style.filter = layerConfig.filter;
      
      // Add subtle animations for depth
      layer.style.transition = 'filter 0.3s ease';

      layers.push({
        element: layer,
        speed: layerConfig.speed
      });

      container.appendChild(layer);
    });

    // Add gradient overlay for better text contrast
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'parallax-gradient-overlay';
    gradientOverlay.style.position = 'absolute';
    gradientOverlay.style.top = '0';
    gradientOverlay.style.left = '0';
    gradientOverlay.style.width = '100%';
    gradientOverlay.style.height = '100%';
    gradientOverlay.style.background = `
      linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.2) 30%,
        rgba(0, 0, 0, 0.1) 60%,
        rgba(0, 0, 0, 0.3) 100%
      ),
      radial-gradient(
        ellipse at center,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 50%,
        rgba(0, 0, 0, 0.3) 100%
      )
    `;
    gradientOverlay.style.zIndex = '4';
    gradientOverlay.style.pointerEvents = 'none';
    container.appendChild(gradientOverlay);

    layersRef.current = layers;

    // Initial positioning
    updateParallax();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      layers.forEach(layer => {
        if (layer.element.parentNode) {
          layer.element.parentNode.removeChild(layer.element);
        }
      });
      if (gradientOverlay.parentNode) {
        gradientOverlay.parentNode.removeChild(gradientOverlay);
      }
      layersRef.current = [];
    };
  }, [config, updateParallax, handleScroll, handleResize]);

  return containerRef;
};

// React Component Version with Enhanced Text Contrast
interface ParallaxProps {
  backgroundImageUrl: string;
  middleImageUrl: string;
  foregroundImageUrl: string;
  containerHeight?: string;
  className?: string;
  children?: React.ReactNode;
  textPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  textBackgroundStyle?: 'none' | 'overlay' | 'glass' | 'solid' | 'gradient';
}

export const Parallax: React.FC<ParallaxProps> = ({
  backgroundImageUrl,
  middleImageUrl,
  foregroundImageUrl,
  containerHeight = '60vh',
  className = '',
  children,
  textPosition = 'center',
  textBackgroundStyle = 'glass'
}) => {
  const containerRef = useParallax({
    backgroundImageUrl,
    middleImageUrl,
    foregroundImageUrl,
    containerHeight
  });

  const getPositionStyles = (position: string) => {
    const baseStyles = {
      position: 'absolute' as const,
      zIndex: 15,
      padding: '1.5rem 2rem',
      boxSizing: 'border-box' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      wordWrap: 'break-word' as const,
      overflowWrap: 'break-word' as const,
    };

    switch (position) {
      case 'top':
        return { 
          ...baseStyles, 
          top: '8%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          alignItems: 'center',
          textAlign: 'center' as const,
          maxWidth: '95%',
          minWidth: '200px'
        };
      case 'bottom':
        return { 
          ...baseStyles, 
          bottom: '8%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          alignItems: 'center',
          textAlign: 'center' as const,
          maxWidth: '95%',
          minWidth: '200px'
        };
      case 'left':
        return { 
          ...baseStyles, 
          left: '5%', 
          top: '50%', 
          transform: 'translateY(-50%)',
          alignItems: 'flex-start',
          textAlign: 'left' as const,
          maxWidth: '60%',
          minWidth: '200px'
        };
      case 'right':
        return { 
          ...baseStyles, 
          right: '5%', 
          top: '50%', 
          transform: 'translateY(-50%)',
          alignItems: 'flex-end',
          textAlign: 'right' as const,
          maxWidth: '60%',
          minWidth: '200px'
        };
      case 'top-left':
        return { 
          ...baseStyles, 
          top: '8%', 
          left: '5%',
          alignItems: 'flex-start',
          textAlign: 'left' as const,
          maxWidth: '60%',
          minWidth: '200px'
        };
      case 'top-right':
        return { 
          ...baseStyles, 
          top: '8%', 
          right: '5%',
          alignItems: 'flex-end',
          textAlign: 'right' as const,
          maxWidth: '60%',
          minWidth: '200px'
        };
      case 'bottom-left':
        return { 
          ...baseStyles, 
          bottom: '8%', 
          left: '5%',
          alignItems: 'flex-start',
          textAlign: 'left' as const,
          maxWidth: '60%',
          minWidth: '200px'
        };
      case 'bottom-right':
        return { 
          ...baseStyles, 
          bottom: '8%', 
          right: '5%',
          alignItems: 'flex-end',
          textAlign: 'right' as const,
          maxWidth: '60%',
          minWidth: '200px'
        };
      default: // center
        return { 
          ...baseStyles, 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          alignItems: 'center',
          textAlign: 'center' as const,
          maxWidth: '95%',
          minWidth: '200px'
        };
    }
  };

  const getBackgroundStyles = (style: string) => {
    switch (style) {
      case 'overlay':
        return {
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          width: 'fit-content',
          maxWidth: '100%',
        };
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          width: 'fit-content',
          maxWidth: '100%',
        };
      case 'solid':
        return {
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '8px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          width: 'fit-content',
          maxWidth: '100%',
        };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: 'fit-content',
          maxWidth: '100%',
        };
      case 'none':
      default:
        return {
          width: 'fit-content',
          maxWidth: '100%',
        };
    }
  };

  const textStyles = {
    ...getPositionStyles(textPosition),
    ...getBackgroundStyles(textBackgroundStyle),
    color: 'white',
    textShadow: `
      2px 2px 4px rgba(0, 0, 0, 0.8),
      1px 1px 2px rgba(0, 0, 0, 0.9),
      0 0 8px rgba(0, 0, 0, 0.5)
    `,
    fontSize: '1.1rem',
    lineHeight: '1.6',
    fontWeight: '500',
    letterSpacing: '0.5px',
    animation: 'fadeInUp 1s ease-out',
  };

  // Add CSS animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate(-50%, -40%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
      
      .parallax:hover .parallax-background {
        filter: brightness(0.85) contrast(1.15) !important;
      }
      
      .parallax:hover .parallax-middle {
        filter: brightness(0.95) contrast(1.1) !important;
      }
      
      .parallax:hover .parallax-foreground {
        filter: brightness(1.05) contrast(1.05) !important;
      }
      
      @media (max-width: 768px) {
        .parallax .parallax-text {
          padding: 1rem 1.5rem !important;
          font-size: 0.95rem !important;
          max-width: 95% !important;
          min-width: 150px !important;
        }
      }
      
      @media (max-height: 500px) and (min-width: 600px) {
        .parallax .parallax-text {
          padding: 0.75rem 1.25rem !important;
          font-size: 0.9rem !important;
          max-width: 90% !important;
          min-width: 200px !important;
          line-height: 1.4 !important;
        }
      }
      
      @media (min-width: 650px) and (max-width: 1020px) and (min-height: 500px) {
        .parallax .parallax-text {
          padding: 1.25rem 1.5rem !important;
          font-size: 1rem !important;
          max-width: 85% !important;
          min-width: 180px !important;
          line-height: 1.5 !important;
        }
      }
      
      @media (min-width: 1021px) {
        .parallax .parallax-text {
          padding: 1.5rem 2rem !important;
          min-width: 200px !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`parallax ${className}`}
    >
      {children && (
        <div 
          className="parallax-text"
          style={textStyles}
        >
          {children}
        </div>
      )}
    </div>
  );
};