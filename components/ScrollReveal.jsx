"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  containerClassName = '',
  textClassName = '',
}) => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  const words = typeof children === 'string' 
    ? children.split(' ').filter(word => word.length > 0) 
    : [];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textContainer = textRef.current;
    if (!wrapper || !textContainer) return;

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      const wordElements = gsap.utils.toArray('.scroll-reveal-word', textContainer);
      const totalWords = wordElements.length;
      
      if (totalWords === 0) return;

      // Set initial state
      gsap.set(wordElements, { 
        opacity: 0.15,
        filter: 'blur(5px)'
      });

      // Create ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Reveal words based on scroll progress
          wordElements.forEach((word, index) => {
            const wordStart = index / totalWords;
            const wordEnd = (index + 1) / totalWords;
            
            if (progress >= wordEnd) {
              gsap.set(word, { opacity: 1, filter: 'blur(0px)' });
            } else if (progress >= wordStart) {
              const localProgress = (progress - wordStart) / (wordEnd - wordStart);
              gsap.set(word, { 
                opacity: 0.15 + (0.85 * localProgress),
                filter: `blur(${5 - (5 * localProgress)}px)`
              });
            } else {
              gsap.set(word, { opacity: 0.15, filter: 'blur(5px)' });
            }
          });
        }
      });

      // Force refresh after setup
      ScrollTrigger.refresh();

      // Store for cleanup
      wrapper._scrollTrigger = st;
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (wrapper._scrollTrigger) {
        wrapper._scrollTrigger.kill();
      }
    };
  }, [words.length]);

  return (
    <div ref={wrapperRef} className={`scroll-reveal-wrapper ${containerClassName}`}>
      <div className="scroll-reveal-sticky">
        <div ref={textRef} className={`scroll-reveal-text ${textClassName}`}>
          {words.map((word, index) => (
            <span key={index} className="scroll-reveal-word">
              {word}{index < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal;
