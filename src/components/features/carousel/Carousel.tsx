import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
}

export function Carousel<T>({
  items,
  renderItem,
  keyExtractor,
  className = '',
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = items.length;

  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === totalItems - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, totalItems]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const getVisibleItems = () => {
    const visible: Array<{
      item: T;
      position: number;
      index: number;
    }> = [];
    
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalItems) % totalItems;
      visible.push({
        item: items[index],
        position: i,
        index: index
      });
    }
    
    return visible;
  };

  if (totalItems === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white/60">No hay elementos para mostrar</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-6xl mx-auto px-4 ${className}`}>
      {/* Navigation buttons */}
      {showNavigation && totalItems > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Elemento anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Siguiente elemento"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Carousel container */}
      <div className="relative overflow-hidden py-16">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex items-center justify-center">
          {getVisibleItems().map(({ item, position, index }) => (
            <div
              key={keyExtractor(item, index)}
              className={`transition-all duration-700 ease-out flex-shrink-0 ${
                position === 0 
                  ? 'scale-100 opacity-100 z-10' 
                  : 'scale-80 opacity-50'
              }`}
              style={{
                transform: `
                  translateX(${position * 280}px) 
                  translateZ(${position === 0 ? '0px' : '-100px'}) 
                  rotateY(${position * -15}deg)
                `,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className={`${position !== 0 ? 'pointer-events-none' : ''}`}>
                {renderItem(item, index, position === 0)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {showIndicators && totalItems > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-cyan-400' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Ir al elemento ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}