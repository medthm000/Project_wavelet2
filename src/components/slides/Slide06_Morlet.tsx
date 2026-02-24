import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import * as d3 from 'd3';
import { GOLD_DXY_MONTHLY, normalize, extractValues } from '../../utils/realData';
import { morletCoherence } from '../../utils/waveletMath';
import FormulaBox from '../shared/FormulaBox';

export default function Slide06_Morlet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<SVGSVGElement>(null);
  const [period, setPeriod] = useState<'2005-2014' | '2015-2024'>('2005-2014');
  
  // Process Gold/DXY data
  const filteredData = GOLD_DXY_MONTHLY.filter(d => 
    period === '2005-2014' ? d.date <= '2014-12' : d.date >= '2015-01'
  );
  
  const chartData = filteredData.map((d, i) => ({
    index: i,
    date: d.date,
    gold: d.gold / 10, // Scale for visibility
    dxy: d.dxy
  }));
  
  // Compute coherence
  const goldNorm = normalize(extractValues(filteredData, 'gold'));
  const dxyNorm = normalize(extractValues(filteredData, 'dxy'));
  const scales = [2, 4, 8, 16, 32, 64];
  const coherence = morletCoherence(goldNorm, dxyNorm, scales);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.left-panel > *',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.6, ease: 'power2.out' }
      );
      
      gsap.fromTo('.right-panel > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.3, delay: 0.9, ease: 'power2.out' }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  // Draw heatmap
  useEffect(() => {
    if (!heatmapRef.current || coherence.length === 0) return;
    
    const svg = d3.select(heatmapRef.current);
    svg.selectAll('*').remove();
    
    const width = 600;
    const height = 300;
    const cellWidth = width / coherence[0].length;
    const cellHeight = height / coherence.length;
    
    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
      .domain([1, 0]); // Reverse: red = high coherence
    
    const g = svg.append('g');
    
    // Draw cells
    coherence.forEach((row, scaleIdx) => {
      row.forEach((value, timeIdx) => {
        g.append('rect')
          .attr('x', timeIdx * cellWidth)
          .attr('y', scaleIdx * cellHeight)
          .attr('width', cellWidth)
          .attr('height', cellHeight)
          .attr('fill', colorScale(value))
          .attr('opacity', 0)
          .transition()
          .delay(timeIdx * 2)
          .duration(50)
          .attr('opacity', 0.9);
      });
    });
    
    // Y-axis labels
    const scaleLabels = ['2m', '4m', '8m', '16m', '32m', '64m'];
    scaleLabels.forEach((label, i) => {
      svg.append('text')
        .attr('x', -5)
        .attr('y', i * cellHeight + cellHeight / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .text(label);
    });
  }, [coherence, period]);
  
  return (
    <div ref={containerRef} className="relative z-10 flex items-center justify-center min-h-screen px-8 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-5 gap-8">
        {/* Left panel */}
        <div className="left-panel md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="inline-block bg-electric-blue/20 text-electric-blue px-3 py-1 rounded text-sm font-semibold mb-2 w-fit">
            Type 03 — Morlet Wavelet
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Time-Frequency Coherence</h2>
          
          <FormulaBox>
            {'ψ(t) = π^(−1/4) · e^(−t²/2) · e^(iω₀t)\n\n'}
            <span className="text-sm text-gray-400">
              ω₀ = 6 (admissibility condition)
            </span>
          </FormulaBox>
          
          <div className="text-sm space-y-2 bg-gray-800/40 p-3 rounded">
            <p className="text-gray-300">
              <span className="text-electric-blue">e^(−t²/2)</span> = Gaussian envelope (time localization)
            </p>
            <p className="text-gray-300">
              <span className="text-electric-blue">e^(iω₀t)</span> = Sine oscillation (frequency detection)
            </p>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Optimal time-frequency resolution</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Continuous wavelet transform — smooth scalogram output</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-electric-blue">•</span>
              <p className="text-gray-300">Standard tool for coherence analysis in economics</p>
            </div>
          </div>
        </div>
        
        {/* Right panel */}
        <div className="right-panel md:col-span-3 space-y-4">
          {/* Toggle buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod('2005-2014')}
              className={`px-4 py-2 rounded font-semibold transition-all text-sm ${
                period === '2005-2014'
                  ? 'bg-electric-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              2005-2014
            </button>
            <button
              onClick={() => setPeriod('2015-2024')}
              className={`px-4 py-2 rounded font-semibold transition-all text-sm ${
                period === '2015-2024'
                  ? 'bg-electric-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              2015-2024
            </button>
          </div>
          
          {/* Price overlay */}
          <div className="bg-gray-900/60 border border-electric-blue/30 rounded-lg p-4 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="index" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <Line type="monotone" dataKey="gold" stroke="#FFD700" strokeWidth={2} dot={false} name="Gold /10" />
                <Line type="monotone" dataKey="dxy" stroke="#00D4FF" strokeWidth={2} dot={false} name="DXY" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Heatmap */}
          <div className="bg-gray-900/60 border border-electric-blue/30 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-3 text-sm">Wavelet Coherence Heatmap</h3>
            <svg ref={heatmapRef} width="600" height="300" className="w-full" />
            
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
              {period === '2005-2014' ? (
                <>
                  <div className="bg-red-900/30 border border-red-500/50 p-2 rounded">
                    <span className="text-red-400 font-semibold">2008-2009 GFC:</span>
                    <span className="text-gray-300"> Strong inverse coherence — Gold safe-haven vs USD flight</span>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-500/50 p-2 rounded">
                    <span className="text-blue-400 font-semibold">Normal Period:</span>
                    <span className="text-gray-300"> Classic inverse relationship maintained</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-yellow-900/30 border border-yellow-500/50 p-2 rounded">
                    <span className="text-yellow-400 font-semibold">2020 COVID:</span>
                    <span className="text-gray-300"> Temporary coherence spike</span>
                  </div>
                  <div className="bg-purple-900/30 border border-purple-500/50 p-2 rounded">
                    <span className="text-purple-400 font-semibold">⚠ 2022-2024 Structural Break:</span>
                    <span className="text-gray-300"> Gold+DXY both rise (central bank buying decoupled classic relationship)</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              Source: LBMA Gold / ICE DXY Index / World Gold Council
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
