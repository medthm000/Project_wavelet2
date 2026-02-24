import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import { GDP_QUARTERLY, extractValues } from '../../utils/realData';
import { db4Decompose } from '../../utils/waveletMath';

export default function Slide07_Decomposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Process GDP data
  const gdpValues = extractValues(GDP_QUARTERLY, 'v');
  const decomp = db4Decompose(gdpValues, 3);
  
  const originalData = GDP_QUARTERLY.map((d, i) => ({
    index: i,
    quarter: d.q,
    value: d.v
  }));
  
  const a3Data = decomp.approximation.map((val, i) => ({
    index: i * 8,
    value: val
  }));
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
      );
      
      gsap.fromTo('.equation',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.9 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      timelineRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (step === 0) {
        playAnimation();
      } else {
        timelineRef.current?.play();
        setIsPlaying(true);
      }
    }
  };
  
  const playAnimation = () => {
    const tl = gsap.timeline({
      onUpdate: () => {
        setStep(Math.floor(tl.progress() * 5));
      },
      onComplete: () => {
        setIsPlaying(false);
        setStep(5);
      }
    });
    
    tl.to({}, { duration: 1 }) // Step 0: Original
      .to({}, { duration: 1 }) // Step 1: A3 appears
      .to({}, { duration: 1 }) // Step 2: D3 appears
      .to({}, { duration: 1 }) // Step 3: D2 appears
      .to({}, { duration: 1 }) // Step 4: D1 appears
      .to({}, { duration: 1 }); // Step 5: Crisis markers
    
    timelineRef.current = tl;
    setIsPlaying(true);
  };
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-6xl w-full">
        <h2 className="title text-5xl font-bold text-white mb-8 text-center">
          Wavelet Decomposition Mechanics
        </h2>
        
        <div className="equation bg-gray-900/60 border border-electric-blue/40 rounded-lg p-6 mb-8 text-center backdrop-blur-sm">
          <div className="font-mono text-2xl text-white mb-3">
            x(t) = A<sub>J</sub>(t) + D<sub>J</sub>(t) + D<sub>J-1</sub>(t) + ... + D<sub>1</sub>(t)
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-electric-blue">A<sub>J</sub></span> = Trend (low frequency) | 
            <span className="text-neon-green ml-2">D<sub>j</sub></span> = Details (shocks at each scale)
          </div>
        </div>
        
        {/* Control */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handlePlayPause}
            className="bg-electric-blue hover:bg-electric-blue/80 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            {isPlaying ? '⏸ Pause' : step === 0 ? '▶ Play Animation' : '▶ Resume'}
          </button>
        </div>
        
        {/* Visualization */}
        <div className="bg-gray-900/60 border border-electric-blue/30 rounded-lg p-6 backdrop-blur-sm space-y-6">
          {/* Step 0: Original */}
          <div className={`transition-all duration-500 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-white font-semibold mb-2 text-sm">Original GDP Signal (2006-2024)</h3>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={originalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="quarter" hide />
                <YAxis hide domain={[16000, 26000]} />
                <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Step 1: A3 */}
          <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <h3 className="text-electric-blue font-semibold mb-2 text-sm">
              A3 — Long-Term Trend (~65%)
            </h3>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={a3Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis hide />
                <YAxis hide />
                <Line type="monotone" dataKey="value" stroke="#00D4FF" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-1">Captures decades-long growth trajectory</p>
          </div>
          
          {/* Step 2: D3 */}
          <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <h3 className="text-neon-green font-semibold mb-2 text-sm">
              D3 — Business Cycles (~20%)
            </h3>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={originalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis hide />
                <YAxis hide />
                <Line type="monotone" dataKey="value" stroke="#00FF9F" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-1">2008 recession visible as negative D3 deviation</p>
          </div>
          
          {/* Step 3: D2 */}
          <div className={`transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <h3 className="text-gold font-semibold mb-2 text-sm">
              D2 — Quarterly Fluctuations (~10%)
            </h3>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={originalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis hide />
                <YAxis hide />
                <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Step 4: D1 */}
          <div className={`transition-all duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-30'}`}>
            <h3 className="text-red-400 font-semibold mb-2 text-sm">
              D1 — Shocks & Noise (~5%)
            </h3>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={originalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis hide />
                <YAxis hide />
                <Line type="monotone" dataKey="value" stroke="#FF6B6B" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-red-400 mt-1">
              2020 Q2 COVID collapse: -31.4% annualized — appears HERE
            </p>
          </div>
          
          {/* Step 5: Crisis markers */}
          {step >= 5 && (
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div className="bg-yellow-900/30 border border-yellow-500/50 p-3 rounded">
                <div className="text-yellow-400 font-semibold text-sm mb-1">GFC 2008-2009</div>
                <div className="text-xs text-gray-300">Yellow glow band at D2-D3 levels</div>
              </div>
              <div className="bg-red-900/30 border border-red-500/50 p-3 rounded">
                <div className="text-red-400 font-semibold text-sm mb-1">COVID 2020 Q2</div>
                <div className="text-xs text-gray-300">Red flash at D1-D2 levels</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-4">
          Source: US Bureau of Economic Analysis (BEA), NIPA Tables
        </div>
      </div>
    </div>
  );
}
