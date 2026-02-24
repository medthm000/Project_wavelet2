import gsap from 'gsap';

// ══════════════════════════════════════════════════════════════════════
// GSAP ANIMATION PRESETS
// ══════════════════════════════════════════════════════════════════════

export const slideTransition = {
  exit: {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: 'power2.in'
  },
  enter: {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }
};

export function animateSlideExit(element: HTMLElement, onComplete?: () => void) {
  gsap.to(element, {
    ...slideTransition.exit,
    onComplete
  });
}

export function animateSlideEnter(element: HTMLElement) {
  gsap.fromTo(element, 
    { opacity: 0, y: 30 },
    slideTransition.enter
  );
}

export function animateStagger(elements: HTMLElement[], delay: number = 0.15) {
  gsap.fromTo(elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: delay,
      ease: 'power2.out'
    }
  );
}

export function animateLineChart(pathElement: SVGPathElement) {
  const length = pathElement.getTotalLength();
  
  gsap.fromTo(pathElement,
    {
      strokeDasharray: length,
      strokeDashoffset: length
    },
    {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out'
    }
  );
}

export function animateBars(elements: HTMLElement[]) {
  gsap.fromTo(elements,
    {
      scaleY: 0,
      transformOrigin: 'bottom'
    },
    {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: 'back.out(1.2)'
    }
  );
}

export function animateCounter(
  element: HTMLElement,
  from: number,
  to: number,
  duration: number = 0.5
) {
  const obj = { value: from };
  
  gsap.to(obj, {
    value: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString().padStart(2, '0');
    }
  });
}

export function pulseGlow(element: HTMLElement) {
  gsap.to(element, {
    opacity: 0.6,
    filter: 'drop-shadow(0 0 15px currentColor)',
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
}

export function typewriterEffect(element: HTMLElement, text: string, duration: number = 2) {
  const chars = text.split('');
  element.textContent = '';
  
  chars.forEach((char, index) => {
    gsap.to({}, {
      duration: duration / chars.length,
      delay: (duration / chars.length) * index,
      onComplete: () => {
        element.textContent += char;
      }
    });
  });
}
