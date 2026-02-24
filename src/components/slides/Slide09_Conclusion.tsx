import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Slide09_Conclusion() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
      );
      
      gsap.fromTo('.card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.25,
          delay: 0.9,
          ease: 'back.out(1.1)'
        }
      );
      
      gsap.fromTo('.comparison-table',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 2.2 }
      );
      
      gsap.fromTo('.thank-you',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 2.8 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-6xl w-full">
        <h2 className="title text-5xl font-bold text-white mb-12 text-center">
          Key Takeaways
        </h2>
        
        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-electric-blue/10 to-transparent border border-electric-blue/40 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">🌊</div>
            <h3 className="text-2xl font-bold text-electric-blue mb-3">Fourier</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Powerful for stationary, periodic signals. Reveals WHAT frequencies exist — but loses all time information.
            </p>
          </div>
          
          <div className="card bg-gradient-to-br from-neon-green/10 to-transparent border border-neon-green/40 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">📡</div>
            <h3 className="text-2xl font-bold text-neon-green mb-3">Wavelet</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Superior for non-stationary economic data. Identifies frequencies AND when they occur — essential for crisis detection.
            </p>
          </div>
          
          <div className="card bg-gradient-to-br from-gold/10 to-transparent border border-gold/40 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">🔗</div>
            <h3 className="text-2xl font-bold text-gold mb-3">Wavelet + ARMA</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Hybrid model leverages multi-scale decomposition. Each layer modeled separately → significantly lower forecast error.
            </p>
          </div>
          
          <div className="card bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-400/40 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-2xl font-bold text-purple-400 mb-3">Multi-Scale Analysis</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Not optional — a necessity. Economic shocks operate at different temporal scales simultaneously.
            </p>
          </div>
        </div>
        
        {/* Comparison table */}
        <div className="comparison-table bg-gray-900/60 border border-electric-blue/30 rounded-lg p-6 backdrop-blur-sm mb-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Criterion</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">FFT</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Wavelet</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">What it shows</td>
                <td className="py-3 px-4">Frequencies only</td>
                <td className="py-3 px-4 text-neon-green">Frequencies + Timing</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Best suited for</td>
                <td className="py-3 px-4">Stationary signals</td>
                <td className="py-3 px-4 text-neon-green">Non-stationary signals</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Time localization</td>
                <td className="py-3 px-4 text-red-400">✗ Absent</td>
                <td className="py-3 px-4 text-neon-green">✓ Present</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Shock detection</td>
                <td className="py-3 px-4 text-red-400">✗ Weak / blurred</td>
                <td className="py-3 px-4 text-neon-green">✓ Sharp & localized</td>
              </tr>
              <tr>
                <td className="py-3 px-4">ARMA integration</td>
                <td className="py-3 px-4 text-red-400">✗ Not useful</td>
                <td className="py-3 px-4 text-neon-green">✓ Natural fit</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Thank you */}
        <div className="thank-you text-center space-y-4">
          <div className="text-4xl font-bold bg-gradient-to-r from-electric-blue via-neon-green to-gold bg-clip-text text-transparent">
            Thank you
          </div>
          <div className="text-sm text-gray-400">
            Further reading: Wavelet Coherence | MODWT | WD-GARCH | Continuous WT
          </div>
          <div className="text-xs text-gray-500 pt-4 border-t border-gray-800 max-w-3xl mx-auto">
            Data: EIA·IMF·BLS·BEA·LBMA·CoinMarketCap — All rights reserved to respective sources
          </div>
        </div>
      </div>
    </div>
  );
}
