import { useEffect } from 'react';

/**
 * Locks body scroll while `locked` is true (mobile menu, cart drawer),
 * compensating for the scrollbar width so the layout doesn't jump.
 */
export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
