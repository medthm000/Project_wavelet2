import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeBackground from './components/shared/ThreeBackground';
import Navigation from './components/shared/Navigation';
import Footer from './components/shared/Footer';
import Slide01_Intro from './components/slides/Slide01_Intro';
import Slide02_Fourier from './components/slides/Slide02_Fourier';
import Slide03_WaveletConcept from './components/slides/Slide03_WaveletConcept';
import Slide04_Haar from './components/slides/Slide04_Haar';
import Slide05_Daubechies from './components/slides/Slide05_Daubechies';
import Slide06_Morlet from './components/slides/Slide06_Morlet';
import Slide07_Decomposition from './components/slides/Slide07_Decomposition';
import Slide08_WaveletARMA from './components/slides/Slide08_WaveletARMA';
import Slide09_Conclusion from './components/slides/Slide09_Conclusion';

const SLIDES = [
  { id: 0, component: Slide01_Intro },
  { id: 1, component: Slide02_Fourier },
  { id: 2, component: Slide03_WaveletConcept },
  { id: 3, component: Slide04_Haar },
  { id: 4, component: Slide05_Daubechies },
  { id: 5, component: Slide06_Morlet },
  { id: 6, component: Slide07_Decomposition },
  { id: 7, component: Slide08_WaveletARMA },
  { id: 8, component: Slide09_Conclusion },
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
