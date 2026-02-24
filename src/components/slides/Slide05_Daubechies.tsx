import { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import { BRENT_MONTHLY, interpolateSeries, extractValues } from '../../utils/realData';
import { db4Decompose, reconstructLevel } from '../../utils/waveletMath';
import FormulaBox from '../shared/FormulaBox';

export default function Slide05_Daubechies() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Process Brent data (2000-2024)
  const interpolated = interpolateSeries(BRENT_MONTHLY, 300, 'price');
  const prices = extractValues(interpolated, 'price');
  
  // Perform db4 decomposition
  const decomp = db4Decompose(prices, 3);
  
  // Reconstruct each level for visualization
  const a3Data = decomp.approximation.map((val, i) => ({
    index: i * 8,
    value: val
  }));
  
  const d3Data = reconstructLevel(decomp.approximation, decomp.details[2], 300).map((val, i) => ({
    index: i,
    value: val
  }));
  
  const d2Data = reconstructLevel(decomp.approximation, decomp.details[1], 300).map((val, i) => ({
    index: i,
    value: val
  }));
  
  const d1Data = reconstructLevel(decomp.approximation, decomp.details[0], 300).map((val, i) => ({
    index: i,
    value: val
  }));
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.left-panel > *',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.6, ease: 'power2.out' }
      );
      
      gsap.fromTo('.decomp-level',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.5, delay: 1.2, ease: 'power2.out' }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-5 gap-8">
        {/* Left panel */}
        <div className="left-panel md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="inline-block bg-gold/20 text-gold px-3 py-1 rounded text-sm font-semibold mb-2 w-fit">
            Type 02 — Daubechies db4
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Multi-Level Decomposition</h2>
          
          <FormulaBox title="Filter Coefficients">
            {'h₀ = (1+√3) / (4√2) ≈  0.4830\n'}
            {'h₁ = (3+√3) / (4√2) ≈  0.8365\n'}
            {'h₂ = (3−√3) / (4√2) ≈  0.2241\n'}
            {'h₃ = (1−√3) / (4√2) ≈ −0.1294'}
          </FormulaBox>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">4 vanishing moments — captures polynomial trends up to degree 3</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Asymmetric: handles real-world discontinuous economic signals</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Enables clean separation of short/medium/long-term components</p>
            </div>
          </div>
        </div>
        
        {/* Right panel - Stacked decomposition charts */}
        <div className="right-panel md:col-span-3 space-y-3">
          {/* A3 - Approximation */}
          <div className="decomp-level bg-gray-900/60 border border-electric-blue/40 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-electric-blue mb-2">
              A3 — Long-Term Trend (~65%)
            </h3>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={a3Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="index" hide />
                <YAxis hide domain={['dataMin', 'dataMax']} />
                <Line type="monotone" dataKey="value" stroke="#00D4FF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* D3 */}
          <div className="decomp-level bg-gray-900/60 border border-neon-green/40 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-neon-green mb-2">
              D3 — Medium Fluctuations (2-4 year cycles, ~20%)
            </h3>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={d3Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="index" hide />
                <YAxis hide domain={['dataMin', 'dataMax']} />
                <Line type="monotone" dataKey="value" stroke="#00FF9F" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* D2 */}
          <div className="decomp-level bg-gray-900/60 border border-gold/40 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gold mb-2">
              D2 — Short-Term Volatility (monthly-yearly, ~10%)
            </h3>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={d2Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="index" hide />
                <YAxis hide domain={['dataMin', 'dataMax']} />
                <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-xs text-red-400 flex items-center gap-2">
              <span className="inline-block w-16 h-1 bg-red-400"></span>
              2008 GFC crisis appears HERE (D2-D3 level)
            </div>
          </div>
          
          {/* D1 */}
          <div className="decomp-level bg-gray-900/60 border border-red-400/40 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-red-400 mb-2">
              D1 — High-Frequency Noise (weeks-months, ~5%)
            </h3>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={d1Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="index" hide />
                <YAxis hide domain={['dataMin', 'dataMax']} />
                <Line type="monotone" dataKey="value" stroke="#FF6B6B" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-xs text-red-400">
              2020 COVID shock spikes at D1 (sudden short-duration collapse)
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Source: EIA/IMF FRED (POILBREUSDM) — decomposition via db4
          </div>
        </div>
      </div>
    </div>
  );
}
