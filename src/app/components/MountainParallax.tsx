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

// Custom React Hook for Mountain Parallax
export const useMountainParallax = (config: ParallaxConfig) => {
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

    // Setup container styles
    container.style.position = 'relative';
    container.style.height = config.containerHeight || '60vh';
    container.style.overflow = 'hidden';
    container.style.width = '100%';
    container.style.marginBottom = '2rem';
    container.style.isolation = 'isolate'; // Creates new stacking context
    container.style.zIndex = '1'; // Ensure it doesn't interfere with elements below

    // Create layers
    const layerConfigs = [
      { 
        imageUrl: config.backgroundImageUrl, 
        speed: 0.2, 
        zIndex: 1,
        className: 'parallax-background'
      },
      { 
        imageUrl: config.middleImageUrl, 
        speed: 0.5, 
        zIndex: 2,
        className: 'parallax-middle'
      },
      { 
        imageUrl: config.foregroundImageUrl, 
        speed: 0.8, 
        zIndex: 3,
        className: 'parallax-foreground'
      }
    ];

    const layers: ParallaxLayer[] = [];

    layerConfigs.forEach((layerConfig) => {
      const layer = document.createElement('div');
      layer.className = layerConfig.className;
      
      // Layer styles
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
      layer.style.contain = 'layout style paint'; // Contain the layer effects

      layers.push({
        element: layer,
        speed: layerConfig.speed
      });

      container.appendChild(layer);
    });

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
      layersRef.current = [];
    };
  }, [config, updateParallax, handleScroll, handleResize]);

  return containerRef;
};

// React Component Version
interface MountainParallaxProps {
  backgroundImageUrl: string;
  middleImageUrl: string;
  foregroundImageUrl: string;
  containerHeight?: string;
  className?: string;
  children?: React.ReactNode;
}

export const MountainParallax: React.FC<MountainParallaxProps> = ({
  backgroundImageUrl,
  middleImageUrl,
  foregroundImageUrl,
  containerHeight = '60vh',
  className = '',
  children
}) => {
  const containerRef = useMountainParallax({
    backgroundImageUrl,
    middleImageUrl,
    foregroundImageUrl,
    containerHeight
  });

  return (
    <div 
      ref={containerRef} 
      className={`mountain-parallax ${className}`}
    >
      {children && (
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'white',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};