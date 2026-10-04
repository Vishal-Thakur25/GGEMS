'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea');
      const viewImage = target.closest('[data-cursor="view"]');

      if (viewImage) {
        setCursorVariant('view');
      } else if (interactive) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: '#6CD34A',
      opacity: 0.9,
      transition: { type: 'spring' as const, damping: 25, stiffness: 400, mass: 0.1 },
    },
    hover: {
      x: mousePosition.x - 22,
      y: mousePosition.y - 22,
      width: 44,
      height: 44,
      backgroundColor: 'rgba(108, 211, 74, 0.15)',
      borderColor: '#6CD34A',
      borderWidth: 1.5,
      borderStyle: 'solid',
      opacity: 1,
      transition: { type: 'spring' as const, damping: 20, stiffness: 350, mass: 0.1 },
    },
    view: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: 64,
      height: 64,
      backgroundColor: '#6CD34A',
      color: '#000000',
      opacity: 1,
      transition: { type: 'spring' as const, damping: 22, stiffness: 350, mass: 0.1 },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-bold text-[10px] tracking-wider uppercase"
      variants={variants}
      animate={cursorVariant}
    >
      {cursorVariant === 'view' && <span className="text-black font-extrabold">VIEW</span>}
    </motion.div>
  );
}
