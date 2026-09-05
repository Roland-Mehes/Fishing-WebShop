'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type HeaderScrollContextType = {
  isCompact: boolean;
};

const HeaderScrollContext = createContext<HeaderScrollContextType | null>(null);

type HeaderScrollProps = {
  children: ReactNode;
};

export function useHeaderScroll() {
  const context = useContext(HeaderScrollContext);

  if (!context) {
    throw new Error('useHeaderScroll must be used inside HeaderScroll');
  }

  return context;
}

export default function HeaderScroll({ children }: HeaderScrollProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let wheelDistance = 0;

    let touchStartY = 0;
    let touchLastY = 0;
    let touchDirectionLocked = false;

    const DESKTOP_SCROLL_THRESHOLD = 40;
    const MOBILE_SCROLL_THRESHOLD = 2;

    /*
     * Desktop / trackpad
     */
    const handleWheel = (event: WheelEvent) => {
      const { scrollY } = window;

      // Always show the full header at the top.
      if (scrollY <= 20) {
        wheelDistance = 0;
        setIsCompact(false);
        return;
      }

      wheelDistance += event.deltaY;

      if (Math.abs(wheelDistance) < DESKTOP_SCROLL_THRESHOLD) {
        return;
      }

      if (wheelDistance > 0) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }

      wheelDistance = 0;
    };

    /*
     * Mobile
     */
    const handleTouchStart = (event: TouchEvent) => {
      const startY = event.touches[0]?.clientY ?? 0;

      touchStartY = startY;
      touchLastY = startY;
      touchDirectionLocked = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchLastY;

      touchLastY = currentY;

      const distance = touchStartY - currentY;

      const { scrollY } = window;

      // Always show the full header at the top.
      if (scrollY <= 20) {
        touchDirectionLocked = false;
        setIsCompact(false);
        return;
      }

      /*
       * Once we have detected the direction,
       * don't change it during the same gesture.
       */
      if (touchDirectionLocked) {
        return;
      }

      /*
       * Only 2px is enough to detect the gesture.
       */
      if (Math.abs(distance) < MOBILE_SCROLL_THRESHOLD) {
        return;
      }

      touchDirectionLocked = true;

      /*
       * Finger UP -> scroll DOWN -> compact
       * Finger DOWN -> scroll UP -> full
       */
      if (distance > 0) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }
    };

    const handleTouchEnd = () => {
      const { scrollY } = window;

      if (scrollY <= 20) {
        setIsCompact(false);
      }

      touchStartY = 0;
      touchLastY = 0;
      touchDirectionLocked = false;
    };

    window.addEventListener('wheel', handleWheel, {
      passive: true,
    });

    window.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });

    window.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });

    window.addEventListener('touchend', handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <HeaderScrollContext.Provider value={{ isCompact }}>
      <div data-compact={isCompact} className="group">
        {children}
      </div>
    </HeaderScrollContext.Provider>
  );
}
