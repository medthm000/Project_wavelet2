# Multi-Scale Economic Time Series Analysis

An interactive React web application presenting scientific research on economic time series analysis using Fourier and Wavelet transforms.

## Features

- **9 Interactive Slides**: Comprehensive presentation covering Fourier analysis, wavelet theory, and hybrid forecasting models
- **Real Historical Data**: Hardcoded datasets including Brent crude oil, US CPI, Gold/DXY, Bitcoin, and GDP
- **3D Animated Background**: Persistent Three.js wave grid that responds to mouse movement
- **Advanced Visualizations**: Interactive charts using Recharts and D3.js
- **Smooth Animations**: GSAP-powered slide transitions and element animations
- **Dark Theme**: Professional design with electric blue, neon green, and gold accents

## Tech Stack

- **React 18** - UI framework with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Three.js** (@react-three/fiber + @react-three/drei) - 3D graphics
- **GSAP** - Professional-grade animations
- **Recharts** - Data visualization library
- **D3.js** - Advanced chart customization
- **Tailwind CSS** - Utility-first styling

## Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── ThreeBackground.tsx   # Persistent 3D animated background
│   │   ├── Navigation.tsx        # Slide navigation and counter
│   │   ├── Footer.tsx            # Copyright footer
│   │   └── FormulaBox.tsx        # Styled formula display
│   └── slides/
│       ├── Slide01_Intro.tsx          # Introduction
│       ├── Slide02_Fourier.tsx        # Fourier Analysis + FFT
│       ├── Slide03_WaveletConcept.tsx # Wavelet Theory
│       └── Slide04_Haar.tsx           # Haar Wavelet Transform
├── utils/
│   ├── realData.ts        # All historical economic datasets
│   ├── waveletMath.ts     # Wavelet transform implementations
│   └── gsapPresets.ts     # Reusable animation presets
├── App.tsx                # Main application with slide routing
├── main.tsx              # React entry point
└── index.css             # Global styles
```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Install Node.js** if not already installed:
   - Download from https://nodejs.org/
   - Verify installation: `node --version`

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   - Navigate to http://localhost:3000
   - The app will open automatically

### Build for Production

```bash
npm run build
npm run preview
```

## Navigation

- **Keyboard**: Use Left/Right arrow keys to navigate between slides
- **Mouse**: Click on dots on the right side to jump to specific slides
- **Slide Counter**: Top-right corner shows current slide number

## Data Sources

All datasets are from authoritative sources:

- **Brent Crude Oil**: EIA / IMF FRED (POILBREUSDM)
- **US CPI Inflation**: Bureau of Labor Statistics (BLS)
- **Gold Price**: LBMA / World Gold Council
- **DXY Index**: ICE / Federal Reserve
- **Bitcoin**: CoinMarketCap / CoinLore
- **US GDP**: Bureau of Economic Analysis (BEA)

## Mathematical Implementations

The application includes real implementations of:

- **Fast Fourier Transform (FFT)**: Frequency spectrum analysis
- **Haar Wavelet Transform**: Shock detection algorithm
- **Daubechies db4**: Multi-level wavelet decomposition
- **Morlet Wavelet**: Continuous wavelet coherence analysis
- **ARMA Models**: Traditional and wavelet-enhanced forecasting

## Development Status

✅ **Completed**:
- Project structure and configuration
- Data utilities with all historical datasets
- Wavelet mathematics implementations
- GSAP animation presets
- Shared components (Background, Navigation, Footer, FormulaBox)
- Slides 01-04 (Intro, Fourier, Wavelet Concept, Haar)

⏳ **In Progress**:
- Slides 05-09 (Daubechies, Morlet, Decomposition, ARMA, Conclusion)
- Advanced D3.js heatmap visualizations
- Additional chart animations

## License

© Mohamed Reda Touhami

All data rights reserved to respective sources (EIA, BLS, BEA, LBMA, CoinMarketCap).

---

**Note**: This is a scientific presentation application. Ensure Node.js is installed before running the development server.
