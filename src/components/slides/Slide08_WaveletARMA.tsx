import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import { BITCOIN_MONTHLY, extractValues } from '../../utils/realData';
import { armaForecast, waveletArmaForecast, calculateRMSE } from '../../utils/waveletMath';
import FormulaBox from '../shared/FormulaBox';

export default function Slide08_WaveletARMA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMode, setShowMode] = useState<'arma' | 'wavelet' | 'both'>('both');
  
  // Split Bitcoin data: training (Jan 2017 - Dec 2022), test (Jan 2023 - Dec 2024)
  const trainingData = BITCOIN_MONTHLY.filter(d => d.date <= '2022-12');
  const testData = BITCOIN_MONTHLY.filter(d => d.date >= '2023-01');
  
  const trainingPrices = extractValues(trainingData, 'price');
  const actualPrices = extractValues(testData, 'price');
  
  // Generate forecasts
  const armaForecastData = armaForecast(trainingPrices, 24);
  const waveletForecastData = waveletArmaForecast(trainingPrices, 24);
  
  // Calculate RMSE
  const armaRMSE = calculateRMSE(actualPrices, armaForecastData);
  const waveletRMSE = calculateRMSE(actualPrices, waveletForecastData);
  const improvement = ((armaRMSE - waveletRMSE) / armaRMSE * 100).toFixed(1);
  
  // Prepare chart data
  const allData = [
    ...trainingData.map((d, i) => ({
      index: i,
      date: d.date,
      actual: d.price,
      arma: null,
      wavelet: null
    })),
    ...testData.map((d, i) => ({
      index: trainingData.length + i,
      date: d.date,
      actual: d.price,
      arma: armaForecastData[i],
      wavelet: waveletForecastData[i]
    }))
  ];
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.left-panel > *',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.6, ease: 'power2.out' }
      );
      
      gsap.fromTo('.right-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.9, ease: 'power2.out' }
      );
      
      gsap.fromTo('.score-card',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, delay: 1.8, ease: 'back.out(1.2)' }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-5 gap-8">
        {/* Left panel */}
        <div className="left-panel md:col-span-2 flex flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            Wavelet + ARMA Integration
          </h2>
          
          <FormulaBox title="ARMA(p,q) Model">
            {'Y_t = c + Σ(i=1 to p) φᵢ·Y_{t-i}\n'}
            {'        + Σ(j=1 to q) θⱼ·ε_{t-j} + ε_t\n\n'}
            <span className="text-sm text-gray-400">
              φ = AR coefficients | θ = MA coefficients
            </span>
          </FormulaBox>
          
          <div className="bg-gray-900/60 border border-electric-blue/30 rounded-lg p-4 backdrop-blur-sm space-y-3">
            <div className="text-sm font-semibold text-electric-blue mb-2">Hybrid Flow:</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">1.</span>
                <span className="text-gray-300">Wavelet Decompose → [A3, D3, D2, D1]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">2.</span>
                <span className="text-gray-300">Fit ARMA to each level separately</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">3.</span>
                <span className="text-gray-300">Forecast each component</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">4.</span>
                <span className="text-gray-300">Reconstruct final prediction</span>
              </div>
            </div>
          </div>
          
          <div className="bg-neon-green/10 border-l-4 border-neon-green p-3 rounded">
            <p className="text-sm text-gray-300">
              <span className="text-neon-green font-semibold">Advantage:</span> Each component is stationary at its own scale → ARMA assumptions satisfied
            </p>
          </div>
        </div>
        
        {/* Right panel */}
        <div className="right-panel md:col-span-3 space-y-4">
          {/* Toggle buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowMode('arma')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                showMode === 'arma'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              ARMA Only
            </button>
            <button
              onClick={() => setShowMode('wavelet')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                showMode === 'wavelet'
                  ? 'bg-electric-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Wavelet+ARMA Only
            </button>
            <button
              onClick={() => setShowMode('both')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                showMode === 'both'
                  ? 'bg-neon-green text-dark'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Compare Both
            </button>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-900/60 border border-electric-blue/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-4">
              Bitcoin Price Forecast (Training: 2017-2022, Test: 2023-2024)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={allData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8"
                  interval={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                
                {/* Forecast horizon line */}
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#ffffff" 
                  strokeWidth={2} 
                  dot={false}
                  name="Ground Truth"
                />
                
                {(showMode === 'arma' || showMode === 'both') && (
                  <Line 
                    type="monotone" 
                    dataKey="arma" 
                    stroke="#6b7280" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={false}
                    name="ARMA Forecast"
                  />
                )}
                
                {(showMode === 'wavelet' || showMode === 'both') && (
                  <Line 
                    type="monotone" 
                    dataKey="wavelet" 
                    stroke="#00D4FF" 
                    strokeWidth={3} 
                    dot={false}
                    name="Wavelet+ARMA"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4 flex items-center justify-center">
              <div className="inline-block border-l-4 border-gold h-full w-1 mr-2"></div>
              <span className="text-sm text-gold font-semibold">Jan 2023: Forecast Horizon</span>
            </div>
          </div>
          
          {/* Score cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="score-card bg-gray-900/60 border border-red-400/40 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">ARMA RMSE</div>
              <div className="text-2xl font-bold text-red-400">${(armaRMSE/1000).toFixed(1)}k</div>
              <div className="text-xs text-red-300">✗</div>
            </div>
            
            <div className="score-card bg-gray-900/60 border border-neon-green/40 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">Wavelet+ARMA RMSE</div>
              <div className="text-2xl font-bold text-neon-green">${(waveletRMSE/1000).toFixed(1)}k</div>
              <div className="text-xs text-neon-green">✓ Better</div>
            </div>
            
            <div className="score-card bg-gradient-to-br from-electric-blue/20 to-neon-green/20 border border-electric-blue/40 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">Improvement</div>
              <div className="text-2xl font-bold text-white">{improvement}%</div>
              <div className="text-xs text-electric-blue">Reduction</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Source: CoinMarketCap / CoinLore historical data
          </div>
        </div>
      </div>
    </div>
  );
}
