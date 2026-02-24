import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeBackground from './components/shared/ThreeBackground';
import Navigation from './components/shared/Navigation';
import Footer from './components/shared/Footer';
import Slide01_Intro from './components/slides/Slide01_Intro';
import Slide02_Fourier from './components/slides/Slide02_Fourier';
import Slide03_WaveletConcept from './components/slides/Slide03_WaveletConcept';
import Slide04_Haar from './components/slides/Slide04_Haar';

// Placeholder slides for completion
const PlaceholderSlide = ({ slideNum, title }: { slideNum: number; title: string }) => (
  <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
    <div className="text-center">
      <h2 className="text-5xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400">Slide {slideNum} — Content in development</p>
    </div>
  </div>
);

const SLIDES = [
  { id: 0, component: Slide01_Intro },
  { id: 1, component: Slide02_Fourier },
  { id: 2, component: Slide03_WaveletConcept },
  { id: 3, component: Slide04_Haar },
  { id: 4, component: () => <PlaceholderSlide slideNum={5} title="Daubechies db4" /> },
  { id: 5, component: () => <PlaceholderSlide slideNum={6} title="Morlet + Coherence" /> },
  { id: 6, component: () => <PlaceholderSlide slideNum={7} title="Decomposition Mechanics" /> },
  { id: 7, component: () => <PlaceholderSlide slideNum={8} title="Wavelet + ARMA" /> },
  { id: 8, component: () => <PlaceholderSlide slideNum={9} title="Conclusion" /> },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const navigateToSlide = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= SLIDES.length || isTransitioning) return;
    if (newIndex === currentSlide) return;
    
    setIsTransitioning(true);
    
    // Exit animation
    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentSlide(newIndex);
          
          // Enter animation
          gsap.fromTo(slideContainerRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: () => {
                setIsTransitioning(false);
              }
            }
          );
        }
      });
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigateToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        navigateToSlide(currentSlide - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isTransitioning]);
  
  const CurrentSlideComponent = SLIDES[currentSlide].component;
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark">
      {/* Persistent Three.js background */}
      <ThreeBackground slideIndex={currentSlide} />
      
      {/* Navigation */}
      <Navigation 
        currentSlide={currentSlide} 
        totalSlides={SLIDES.length}
        onNavigate={navigateToSlide}
      />
      
      {/* Slide content */}
      <div ref={slideContainerRef} className="relative z-10">
        <CurrentSlideComponent onNext={() => navigateToSlide(currentSlide + 1)} />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
