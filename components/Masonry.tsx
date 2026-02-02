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
  initialCount?: number;
  loadMoreCount?: number;
  loadMoreLabel?: string;
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
  onImageClick,
  initialCount = 5,
  loadMoreCount = 5,
  loadMoreLabel = 'Voir plus'
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [hasMountedClient, setHasMountedClient] = useState(false);
  const prevVisibleCountRef = useRef(initialCount);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Track client mount for hydration-safe rendering
  useEffect(() => {
    setHasMountedClient(true);
  }, []);
  
  // Check if we're on mobile/tablet (below 1000px)
  const isMobileQuery = useMedia(
    ['(min-width:1000px)'],
    [0], // 0 = not mobile (desktop)
    1    // 1 = mobile/tablet (default)
  ) === 1;
  
  // Only use mobile detection after hydration to avoid mismatch
  const isMobile = hasMountedClient ? isMobileQuery : false;
  
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

  // On desktop, show all items. On mobile/tablet, use pagination
  const effectiveVisibleCount = isMobile ? visibleCount : items.length;
  const visibleItems = useMemo(() => items.slice(0, effectiveVisibleCount), [items, effectiveVisibleCount]);
  const hasMore = isMobile && visibleCount < items.length;

  const handleLoadMore = () => {
    prevVisibleCountRef.current = visibleCount;
    setVisibleCount(prev => Math.min(prev + loadMoreCount, items.length));
  };

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return visibleItems.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, visibleItems, width]);

  // Calculate the total height of the masonry grid
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map(item => item.y + item.h)) + 16; // +16 for bottom padding
  }, [grid]);

  const hasMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!imagesReady) return;

    const prevCount = prevVisibleCountRef.current;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      const isNewlyLoaded = index >= prevCount;

      if (!hasMounted.current) {
        // Initial page load animation
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
      } else if (isNewlyLoaded) {
        // "Load more" animation - simple fadeIn with blur
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            filter: 'blur(8px)',
            ...animProps
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            ...animProps,
            duration: 0.5,
            ease: 'power2.out',
            delay: (index - prevCount) * 0.08
          }
        );
      } else {
        // Existing items - just reposition
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    prevVisibleCountRef.current = effectiveVisibleCount;
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

  // Handle touch swipe for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // If horizontal swipe is more significant than vertical, mark as swiping
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const swipeThreshold = 50; // Minimum distance for a swipe
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        goToPrev(); // Swipe right = previous
      } else {
        goToNext(); // Swipe left = next
      }
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

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
      <div 
        ref={containerRef} 
        className="relative w-full"
        style={{ height: containerHeight > 0 ? containerHeight : 'auto' }}
      >
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

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            onClick={handleLoadMore}
            className="group flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary font-medium rounded-full transition-all duration-300"
          >
            <span>{loadMoreLabel}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:translate-y-0.5 transition-transform"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <span className="text-sm text-primary/60">
              ({visibleCount}/{items.length})
            </span>
          </button>
        </div>
      )}      {/* Image Modal with Navigation */}
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

          {/* Image container with swipe support */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh] touch-pan-y"
            onClick={e => { if (!isSwiping.current) e.stopPropagation(); }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={imageRef}
              src={items[selectedIndex].img}
              alt="Image agrandie"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none pointer-events-none"
              draggable={false}
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
