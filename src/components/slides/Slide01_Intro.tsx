import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Slide01Props {
  onNext: () => void;
}

export default function Slide01_Intro({ onNext }: Slide01Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Title letter-by-letter animation
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          titleRef.current?.appendChild(span);
          
          tl.to(span, {
            opacity: 1,
            duration: 0.05,
            ease: 'none'
          }, i * 0.05);
        });
      }
      
      // Subtitle fade in
      tl.fromTo(subtitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '+=0.2'
      );
      
      // Cards stagger in
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.card');
        tl.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
            ease: 'power2.out'
          },
          '+=0.3'
        );
      }
      
      // Arrow pulse
      tl.fromTo(arrowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '+=0.5'
      );
      
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          opacity: 0.6,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8">
      <div className="max-w-5xl w-full text-center">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Multi-Scale Analysis of Economic Time Series
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-2xl text-electric-blue mb-16"
        >
          From Fourier to Wavelet-ARMA Integration
        </p>
        
        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="card bg-gray-900/40 border border-electric-blue/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">What are Time Series?</h3>
            <p className="text-gray-400 text-sm">
              GDP, oil prices, inflation, Bitcoin — ordered in time
            </p>
          </div>
          
          <div className="card bg-gray-900/40 border border-neon-green/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">The Core Problem</h3>
            <p className="text-gray-400 text-sm">
              Real data is non-stationary, contains sudden shocks and regime changes
            </p>
          </div>
          
          <div className="card bg-gray-900/40 border border-gold/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">❓</div>
            <h3 className="text-xl font-semibold text-white mb-2">The Guiding Question</h3>
            <p className="text-gray-400 text-sm">
              Are classical tools like Fourier sufficient for complex economic data?
            </p>
          </div>
        </div>
        
        {/* Arrow */}
        <div 
          ref={arrowRef}
          onClick={onNext}
          className="inline-flex items-center gap-2 text-electric-blue cursor-pointer hover:text-white transition-colors"
        >
          <span className="text-lg font-medium">Let's find out</span>
          <span className="text-2xl">→</span>
        </div>
      </div>
    </div>
  );
}
