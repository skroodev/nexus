"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeContentProps {
  children: ReactNode;
  container?: string | Element;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  onComplete,
  className = '',
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use IntersectionObserver for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            const delayMs = typeof delay === 'number' && delay < 10 ? delay * 1000 : delay;
            setTimeout(() => {
              setIsVisible(true);
              if (onComplete) onComplete();
            }, delayMs);
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, onComplete]);

  // Convert duration to seconds for CSS
  const durationSec = typeof duration === 'number' && duration > 10 ? duration / 1000 : duration;

  const transitionStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : initialOpacity,
    filter: blur && !isVisible ? 'blur(10px)' : 'blur(0px)',
    transition: `opacity ${durationSec}s ease-out, filter ${durationSec}s ease-out`,
    willChange: isVisible ? 'auto' : 'opacity, filter',
    ...style,
  };

  return (
    <div ref={ref} className={className} style={transitionStyle}>
      {children}
    </div>
  );
};

export default FadeContent;