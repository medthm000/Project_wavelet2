// ══════════════════════════════════════════════════════════════════════
// WAVELET MATHEMATICS IMPLEMENTATIONS
// ══════════════════════════════════════════════════════════════════════

// ── HAAR WAVELET TRANSFORM ──────────────────────────────────────────
export function haarTransform(signal: number[]): number[] {
  const n = signal.length;
  const coefficients: number[] = new Array(n);
  
  // Simple Haar coefficients: differences between adjacent pairs
  for (let i = 0; i < n - 1; i++) {
    coefficients[i] = signal[i + 1] - signal[i];
  }
  coefficients[n - 1] = 0;
  
  return coefficients;
}

// ── DAUBECHIES DB4 WAVELET DECOMPOSITION ────────────────────────────
// db4 filter coefficients
const DB4_COEFFS = {
  h0: 0.4830,
  h1: 0.8365,
  h2: 0.2241,
  h3: -0.1294
};

export interface WaveletDecomposition {
  approximation: number[];
  details: number[][];
  levels: number;
}

export function db4Decompose(signal: number[], levels: number): WaveletDecomposition {
  let current = [...signal];
  const details: number[][] = [];
  
  for (let level = 0; level < levels; level++) {
    const n = current.length;
    const halfN = Math.floor(n / 2);
    const approx: number[] = new Array(halfN);
    const detail: number[] = new Array(halfN);
    
    // Convolution with db4 filters
    for (let i = 0; i < halfN; i++) {
      const idx = i * 2;
      const i0 = idx % n;
      const i1 = (idx + 1) % n;
      const i2 = (idx + 2) % n;
      const i3 = (idx + 3) % n;
      
      // Low-pass filter (approximation)
      approx[i] = DB4_COEFFS.h0 * current[i0] + 
                  DB4_COEFFS.h1 * current[i1] + 
                  DB4_COEFFS.h2 * current[i2] + 
                  DB4_COEFFS.h3 * current[i3];
      
      // High-pass filter (detail)
      detail[i] = DB4_COEFFS.h3 * current[i0] - 
                  DB4_COEFFS.h2 * current[i1] + 
                  DB4_COEFFS.h1 * current[i2] - 
                  DB4_COEFFS.h0 * current[i3];
    }
    
    details.push(detail);
    current = approx;
  }
  
  return {
    approximation: current,
    details: details,
    levels: levels
  };
}

// Reconstruct signal components for visualization
export function reconstructLevel(
  approximation: number[], 
  detail: number[], 
  originalLength: number
): number[] {
  // Simple upsampling and combination
  const result: number[] = new Array(originalLength);
  const ratio = originalLength / detail.length;
  
  for (let i = 0; i < originalLength; i++) {
    const detailIdx = Math.floor(i / ratio);
    const approxIdx = Math.floor(i / ratio);
    result[i] = (detail[detailIdx] || 0) + (approximation[approxIdx] || 0) / ratio;
  }
  
  return result;
}

// ── MORLET WAVELET COHERENCE ────────────────────────────────────────
// Morlet wavelet function
function morletWavelet(t: number, omega0: number = 6): number {
  const envelope = Math.exp(-t * t / 2);
  const oscillation = Math.cos(omega0 * t);
  return Math.pow(Math.PI, -0.25) * envelope * oscillation;
}

// Continuous wavelet transform for single scale
function cwtScale(signal: number[], scale: number): number[] {
  const n = signal.length;
  const result: number[] = new Array(n);
  
  for (let b = 0; b < n; b++) {
    let sum = 0;
    for (let t = 0; t < n; t++) {
      const tau = (t - b) / scale;
      sum += signal[t] * morletWavelet(tau);
    }
    result[b] = sum / Math.sqrt(scale);
  }
  
  return result;
}

// Wavelet coherence between two signals
export function morletCoherence(
  signal1: number[], 
  signal2: number[], 
  scales: number[]
): number[][] {
  const n = signal1.length;
  const coherence: number[][] = [];
  
  for (const scale of scales) {
    const cwt1 = cwtScale(signal1, scale);
    const cwt2 = cwtScale(signal2, scale);
    const cohRow: number[] = new Array(n);
    
    for (let i = 0; i < n; i++) {
      // Simplified coherence measure (0-1)
      const cross = Math.abs(cwt1[i] * cwt2[i]);
      const auto1 = Math.abs(cwt1[i] * cwt1[i]);
      const auto2 = Math.abs(cwt2[i] * cwt2[i]);
      
      if (auto1 > 0 && auto2 > 0) {
        cohRow[i] = cross / Math.sqrt(auto1 * auto2);
      } else {
        cohRow[i] = 0;
      }
    }
    
    coherence.push(cohRow);
  }
  
  return coherence;
}

// ── FAST FOURIER TRANSFORM (FFT) ────────────────────────────────────
// Simple DFT for frequency spectrum analysis
export function computeFFT(signal: number[]): { frequencies: number[], amplitudes: number[] } {
  const n = signal.length;
  const amplitudes: number[] = new Array(Math.floor(n / 2));
  
  for (let k = 0; k < Math.floor(n / 2); k++) {
    let real = 0;
    let imag = 0;
    
    for (let t = 0; t < n; t++) {
      const angle = -2 * Math.PI * k * t / n;
      real += signal[t] * Math.cos(angle);
      imag += signal[t] * Math.sin(angle);
    }
    
    amplitudes[k] = Math.sqrt(real * real + imag * imag) / n;
  }
  
  const frequencies = amplitudes.map((_, k) => k / n);
  
  return { frequencies, amplitudes };
}

// ── ARMA SIMULATION ─────────────────────────────────────────────────
// Simple ARMA forecast (mean reversion model)
export function armaForecast(
  historicalData: number[], 
  forecastLength: number
): number[] {
  const mean = historicalData.reduce((a, b) => a + b, 0) / historicalData.length;
  const variance = historicalData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / historicalData.length;
  const stdDev = Math.sqrt(variance);
  
  // Simple AR(1) model with mean reversion
  const phi = 0.7; // AR coefficient
  const forecast: number[] = [];
  let lastValue = historicalData[historicalData.length - 1];
  
  for (let i = 0; i < forecastLength; i++) {
    // Mean reversion with some noise
    const noise = (Math.random() - 0.5) * stdDev * 0.3;
    lastValue = mean + phi * (lastValue - mean) + noise;
    forecast.push(lastValue);
  }
  
  return forecast;
}

// Wavelet+ARMA hybrid forecast
export function waveletArmaForecast(
  historicalData: number[], 
  forecastLength: number
): number[] {
  // Decompose into levels
  const decomp = db4Decompose(historicalData, 3);
  const forecasts: number[][] = [];
  
  // Forecast each component separately
  // Approximation (trend)
  const approxForecast = armaForecast(decomp.approximation, Math.ceil(forecastLength / 8));
  
  // Details (each level)
  decomp.details.forEach((detail, idx) => {
    const levelForecast = armaForecast(detail, Math.ceil(forecastLength / Math.pow(2, idx + 1)));
    forecasts.push(levelForecast);
  });
  
  // Reconstruct combined forecast
  const combinedForecast: number[] = [];
  for (let i = 0; i < forecastLength; i++) {
    let sum = 0;
    const approxIdx = Math.floor(i / 8);
    sum += approxForecast[Math.min(approxIdx, approxForecast.length - 1)] || 0;
    
    forecasts.forEach((levelForecast, levelIdx) => {
      const levelIdx2 = Math.floor(i / Math.pow(2, levelIdx + 1));
      sum += (levelForecast[Math.min(levelIdx2, levelForecast.length - 1)] || 0) * 0.3;
    });
    
    combinedForecast.push(sum);
  }
  
  return combinedForecast;
}

// Calculate RMSE
export function calculateRMSE(actual: number[], predicted: number[]): number {
  const n = Math.min(actual.length, predicted.length);
  let sumSquaredError = 0;
  
  for (let i = 0; i < n; i++) {
    sumSquaredError += Math.pow(actual[i] - predicted[i], 2);
  }
  
  return Math.sqrt(sumSquaredError / n);
}
