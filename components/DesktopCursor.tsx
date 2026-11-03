'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, ArrowUpRight, Sparkles } from 'lucide-react';

export default function DesktopCursor() {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [hoverLabel, setHoverLabel] = useState<string>('');
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (hasCoarsePointer) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor-label]'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHoveringInteractive(true);
        const customLabel = interactiveEl.getAttribute('data-cursor-label');
        if (customLabel) {
          setHoverLabel(customLabel);
        } else if (interactiveEl.tagName === 'A') {
          setHoverLabel('Open Link');
        } else {
          setHoverLabel('Interact');
        }
      } else {
        setIsHoveringInteractive(false);
        setHoverLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60] overflow-hidden hidden md:block"
    >
      {/* Floating Glass Bubble Desktop Follower */}
      <div
        className="fixed top-0 left-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${coords.x + 16}px, ${coords.y + 16}px, 0)`,
        }}
      >
        <div
          className={`flex items-center gap-1.5 rounded-2xl border border-white/90 backdrop-blur-md transition-all duration-150 ${
            isHoveringInteractive
              ? 'px-3 py-1.5 bg-[#2563EB]/90 text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] scale-105'
              : 'p-2 bg-white/75 text-[#0F172A] shadow-[0_8px_20px_rgba(15,23,42,0.12)] scale-100'
          }`}
        >
          <Monitor className="w-3.5 h-3.5 shrink-0" />
          {isHoveringInteractive && hoverLabel && (
            <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">
              {hoverLabel}
            </span>
          )}
          {isHoveringInteractive && <ArrowUpRight className="w-3 h-3 shrink-0" />}
        </div>
      </div>
    </div>
  );
}
