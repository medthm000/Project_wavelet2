import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FormulaBox from '../shared/FormulaBox';

export default function Slide03_WaveletConcept() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fourierWaveRef = useRef<HTMLDivElement>(null);
  const morletWaveRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });
      
      tl.fromTo('.title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      
      tl.fromTo('.definition',
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        '+=0.3'
      );
      
      tl.fromTo('.formula-section',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '+=0.2'
      );
      
      tl.fromTo('.comparison',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.3 },
        '+=0.4'
      );
      
      tl.fromTo('.capability-icon',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 },
        '+=0.3'
      );
      
      tl.fromTo('.bottom-statement',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );
      
      // Animated waves
      if (fourierWaveRef.current) {
        gsap.to(fourierWaveRef.current, {
          backgroundPosition: '200% 0',
          duration: 3,
          repeat: -1,
          ease: 'linear'
        });
      }
      
      if (morletWaveRef.current) {
        gsap.to(morletWaveRef.current, {
          opacity: 0.7,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-5xl w-full">
        <h2 className="title text-5xl font-bold text-white mb-8 text-center">
          What is a Wavelet?
        </h2>
        
        <p className="definition text-2xl text-electric-blue mb-12 text-center font-mono">
          A small wave — localized in BOTH time AND frequency
        </p>
        
        <div className="formula-section mb-12">
          <FormulaBox className="text-center">
            {'ψⱼₖ(t) = (1/√sⱼ) · ψ((t − k·τ) / sⱼ)\n\n'}
            <span className="text-sm text-gray-400">
              sⱼ = scale (frequency control) | k = time shift
            </span>
          </FormulaBox>
        </div>
        
        {/* Visual Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Fourier Wave */}
          <div className="comparison bg-gray-900/60 border border-gray-600/50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-gray-400 mb-4">Fourier Wave</h3>
            <div 
              ref={fourierWaveRef}
              className="h-32 rounded mb-4"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #6b7280 10px, #6b7280 12px)',
                backgroundSize: '100px 100%',
                opacity: 0.5
              }}
            />
            <div className="space-y-2 text-sm">
              <div className="text-gray-300 font-medium">Global: spans entire time range</div>
              <div className="text-red-400">Problem: Cannot locate WHEN events occur</div>
            </div>
          </div>
          
          {/* Morlet Wavelet */}
          <div className="comparison bg-gray-900/60 border border-electric-blue/50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-electric-blue mb-4">Morlet Wavelet</h3>
            <div className="h-32 flex items-center justify-center mb-4">
              <div 
                ref={morletWaveRef}
                className="w-32 h-24 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center, #00D4FF 0%, #00D4FF 30%, transparent 70%)',
                  filter: 'blur(8px)',
                  boxShadow: '0 0 30px #00D4FF'
                }}
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-gray-300 font-medium">Local: concentrated at specific moment</div>
              <div className="text-neon-green">Solution: Pinpoints BOTH frequency AND time</div>
            </div>
          </div>
        </div>
        
        {/* Capabilities */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="capability-icon bg-gray-900/40 border border-electric-blue/30 rounded-lg p-5 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-electric-blue font-semibold mb-2">Scale j</div>
            <p className="text-sm text-gray-400">
              Zoom in/out on frequency — like changing telescope magnification
            </p>
          </div>
          
          <div className="capability-icon bg-gray-900/40 border border-neon-green/30 rounded-lg p-5 text-center">
            <div className="text-4xl mb-3">⏱</div>
            <div className="text-neon-green font-semibold mb-2">Shift k</div>
            <p className="text-sm text-gray-400">
              Slide across time — like a magnifying glass moving along the series
            </p>
          </div>
          
          <div className="capability-icon bg-gray-900/40 border border-gold/30 rounded-lg p-5 text-center">
            <div className="text-4xl mb-3">📊</div>
            <div className="text-gold font-semibold mb-2">Multi-resolution</div>
            <p className="text-sm text-gray-400">
              Simultaneously see macro trends AND micro shocks
            </p>
          </div>
        </div>
        
        <div className="bottom-statement text-center text-xl text-white font-semibold bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent py-4 rounded">
          Wavelet = Time + Frequency. Fourier = Frequency only.
        </div>
      </div>
    </div>
  );
}
