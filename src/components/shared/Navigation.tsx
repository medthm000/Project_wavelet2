import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slideIndex: number) => void;
}

export default function Navigation({ currentSlide, totalSlides, onNavigate }: NavigationProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (counterRef.current) {
      const obj = { value: currentSlide };
      gsap.to(obj, {
        value: currentSlide + 1,
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.value).toString().padStart(2, '0');
          }
        }
      });
    }
  }, [currentSlide]);
  
  return (
    <>
      {/* Slide counter - top right */}
      <div className="fixed top-6 right-6 z-20 text-gray-400 font-mono text-sm">
        <span ref={counterRef}>{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(totalSlides).padStart(2, '0')}</span>
      </div>
      
      {/* Navigation dots - right side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`transition-all duration-300 rounded-full border-2 ${
              index === currentSlide
                ? 'w-4 h-4 bg-electric-blue border-electric-blue shadow-lg shadow-electric-blue/50'
                : 'w-3 h-3 bg-transparent border-gray-600 hover:border-electric-blue'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
