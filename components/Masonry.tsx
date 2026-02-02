'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Safe useLayoutEffect for SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const getInitialValue = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };
  
  const [value, setValue] = useState<number>(getInitialValue);

  useEffect(() => {
    const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
    const handler = () => setValue(get());
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onImageClick?: (img: string) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onImageClick
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(items[index].img);
    } else {
      setSelectedIndex(index);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => setSelectedIndex(null)
      });
    } else {
      setSelectedIndex(null);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedIndex((selectedIndex + 1) % items.length);
          gsap.fromTo(imageRef.current, 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }
          );
        }
      });
    }
  };

  const goToPrev = () => {
    if (selectedIndex !== null && imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
          gsap.fromTo(imageRef.current, 
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }
          );
        }
      });
    }
  };

  // Animate modal opening
  const isModalOpen = selectedIndex !== null;
  useEffect(() => {
    if (isModalOpen && modalRef.current && imageRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [isModalOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
      }
    };

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, items.length]);

  return (
    <>
      <div ref={containerRef} className="relative w-full h-full">
        {grid.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content cursor-pointer"
            style={{ willChange: 'transform, width, height, opacity' }}
            onClick={() => handleImageClick(grid.indexOf(item))}
            onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
          >
            <div
              className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal with Navigation */}
      {selectedIndex !== null && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 z-50 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Image précédente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 z-50 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Image suivante"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <img
              ref={imageRef}
              src={items[selectedIndex].img}
              alt="Image agrandie"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {selectedIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Masonry;
