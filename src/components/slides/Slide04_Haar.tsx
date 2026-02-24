import { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ReferenceLine } from 'recharts';
import gsap from 'gsap';
import { CPI_MONTHLY_YOY, CPI_SHOCKS, interpolateSeries } from '../../utils/realData';
import { haarTransform } from '../../utils/waveletMath';
import FormulaBox from '../shared/FormulaBox';

export default function Slide04_Haar() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Process CPI data (2005-2024)
  const cpiData = CPI_MONTHLY_YOY.filter(d => d.date >= '2005-01');
  const interpolated = interpolateSeries(cpiData, 240, 'rate'); // 20 years * 12 months
  
  const signalData = interpolated.map((d, i) => ({
    index: i,
    month: i,
    date: d.date,
    rate: d.rate
  }));
  
  // Compute Haar coefficients
  const rates = interpolated.map(d => d.rate);
  const haarCoeffs = haarTransform(rates);
  
  const coeffData = haarCoeffs.map((coeff, i) => ({
    index: i,
    coefficient: coeff,
    magnitude: Math.abs(coeff)
  }));
  
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
  
  const getBarColor = (coeff: number) => {
    const magnitude = Math.abs(coeff);
    if (magnitude > 3) return coeff > 0 ? '#ef4444' : '#3b82f6';
    return '#6b7280';
  };
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-5 gap-8">
        {/* Left panel */}
        <div className="left-panel md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="inline-block bg-neon-green/20 text-neon-green px-3 py-1 rounded text-sm font-semibold mb-2 w-fit">
            Type 01 — Haar Wavelet
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">The Simplest Wavelet</h2>
          
          <FormulaBox title="Haar Wavelet Function">
            {'ψ(t) = +1   if 0 ≤ t < 0.5\n'}
            {'       −1   if 0.5 ≤ t < 1\n'}
            {'        0   otherwise'}
          </FormulaBox>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Operates as a step function — detects abrupt discontinuities</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Fastest computation — O(n) algorithm</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Best use: detecting regime changes and sudden shocks</p>
            </div>
          </div>
        </div>
        
        {/* Right panel */}
        <div className="right-panel md:col-span-3 space-y-4">
          {/* CPI Signal */}
          <div className="bg-gray-900/60 border border-neon-green/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">
              US CPI Inflation Rate YoY % (2005–2024)
            </h3>
            <LineChart width={600} height={200} data={signalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="index" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
              <ReferenceLine y={2} stroke="#00FF9F" strokeDasharray="3 3" label={{ value: 'Fed Target', fill: '#00FF9F' }} />
              <Line type="monotone" dataKey="rate" stroke="#00FF9F" strokeWidth={2} dot={false} />
            </LineChart>
          </div>
          
          {/* Haar Coefficients */}
          <div className="bg-gray-900/60 border border-neon-green/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">
              Haar Wavelet Coefficients (Shock Detection)
            </h3>
            <div className="h-48 overflow-y-auto">
              <BarChart width={600} height={180} data={coeffData.slice(0, 200)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="index" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <ReferenceLine y={0} stroke="#6b7280" />
                <Bar 
                  dataKey="coefficient" 
                  fill="#00FF9F"
                  shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    const color = getBarColor(payload.coefficient);
                    return <rect x={x} y={y} width={width} height={height} fill={color} />;
                  }}
                />
              </BarChart>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {CPI_SHOCKS.map((shock, idx) => (
                <div key={idx} className="bg-gray-800/60 p-2 rounded border-l-2 border-red-400">
                  <div className="font-semibold text-red-400">{shock.date}</div>
                  <div className="text-gray-300">{shock.rate}%</div>
                  <div className="text-gray-500">{shock.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Source: US Bureau of Labor Statistics (BLS)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
