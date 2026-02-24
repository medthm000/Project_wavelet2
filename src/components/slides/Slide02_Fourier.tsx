import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ReferenceLine } from 'recharts';
import gsap from 'gsap';
import { BRENT_MONTHLY, interpolateSeries } from '../../utils/realData';
import { computeFFT } from '../../utils/waveletMath';
import FormulaBox from '../shared/FormulaBox';

export default function Slide02_Fourier() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'signal' | 'fft'>('signal');
  
  // Interpolate Brent data to 200 points (Jan 2000 - Dec 2016)
  const brentData2016 = BRENT_MONTHLY.filter(d => d.date <= '2016-12');
  const interpolated = interpolateSeries(brentData2016, 200, 'price');
  
  // Prepare chart data
  const signalData = interpolated.map((d, i) => ({
    index: i,
    year: 2000 + (i / 200) * 17,
    price: d.price
  }));
  
  // Compute FFT
  const prices = interpolated.map(d => d.price);
  const { frequencies, amplitudes } = computeFFT(prices);
  const fftData = frequencies.map((freq, i) => ({
    frequency: freq * 12, // Convert to cycles/year
    amplitude: amplitudes[i]
  })).slice(1, 40); // Skip DC component, show first 40 frequencies
  
  // Find crisis peak index (around June 2008)
  const crisisIndex = Math.floor((2008.5 - 2000) / 17 * 200);
  const crashIndex = Math.floor((2008.92 - 2000) / 17 * 200);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.left-panel > *',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.6,
          ease: 'power2.out'
        }
      );
      
      gsap.fromTo('.right-panel',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'power2.out'
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-5 gap-8">
        {/* Left panel - Theory (40%) */}
        <div className="left-panel md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="inline-block bg-electric-blue/20 text-electric-blue px-3 py-1 rounded text-sm font-semibold mb-2 w-fit">
            02 — Classical Tool
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">Fourier Analysis</h2>
          
          <div className="bg-gradient-to-r from-electric-blue/20 to-transparent border-l-4 border-electric-blue p-4 rounded">
            <p className="text-white font-semibold">
              Any signal = Σ sin + cos waves
            </p>
          </div>
          
          <FormulaBox title="Discrete Fourier Transform">
            {'X(ω) = Σ(t=0 to N-1) xₜ · e^(-i2πωt/N)\n\n'}
            <span className="text-xs text-gray-400">
              X(ω) = frequency spectrum | xₜ = time series value
            </span>
          </FormulaBox>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-neon-green text-lg">✓</span>
              <p className="text-gray-300">Identifies ALL frequencies present in the signal</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-500 text-lg">⚠</span>
              <p className="text-gray-300">Tells you WHAT frequencies exist — NOT WHEN they appeared</p>
            </div>
          </div>
          
          <div className="bg-gray-800/60 border-l-4 border-gray-600 p-3 rounded text-sm text-gray-400 italic">
            "Fourier sees the whole forest, but cannot pinpoint which tree fell during the 2008 storm."
          </div>
        </div>
        
        {/* Right panel - Simulation (60%) */}
        <div className="right-panel md:col-span-3">
          <div className="bg-gray-900/60 border border-electric-blue/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {viewMode === 'signal' ? 'Brent Crude Oil Price Signal (2000–2016)' : 'FFT Frequency Spectrum'}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('signal')}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    viewMode === 'signal'
                      ? 'bg-electric-blue text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Signal View
                </button>
                <button
                  onClick={() => setViewMode('fft')}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    viewMode === 'fft'
                      ? 'bg-electric-blue text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  FFT View
                </button>
              </div>
            </div>
            
            <div className="h-80">
              {viewMode === 'signal' ? (
                <LineChart width={600} height={320} data={signalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#94a3b8"
                    tickFormatter={(val) => val.toFixed(0)}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    label={{ value: 'USD/barrel', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelFormatter={(val) => `Year: ${val}`}
                  />
                  <ReferenceLine 
                    x={signalData[crisisIndex]?.year} 
                    stroke="#ef4444" 
                    strokeDasharray="3 3"
                    label={{ value: 'Crisis Peak: $132/bbl', position: 'top', fill: '#ef4444' }}
                  />
                  <ReferenceLine 
                    x={signalData[crashIndex]?.year} 
                    stroke="#ef4444" 
                    strokeDasharray="3 3"
                    label={{ value: 'Crash: $40/bbl', position: 'bottom', fill: '#ef4444' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#00D4FF" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              ) : (
                <div className="relative">
                  <BarChart width={600} height={280} data={fftData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                      dataKey="frequency" 
                      stroke="#94a3b8"
                      label={{ value: 'Frequency (cycles/year)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                    <Bar dataKey="amplitude" fill="#00D4FF" />
                  </BarChart>
                  
                  <div className="absolute top-1/2 right-4 bg-red-500/20 border border-red-500 rounded p-3 max-w-xs">
                    <div className="text-red-400 text-sm font-medium mb-1">⚠ Time Information Lost</div>
                    <p className="text-xs text-gray-300">
                      The 2008 crisis is INVISIBLE here — FFT shows frequencies exist, not WHEN they struck
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Source: EIA / IMF FRED (POILBREUSDM)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
