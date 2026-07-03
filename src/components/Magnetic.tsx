import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/* ============================================================
   MAGNETIC — wraps any element and pulls it gently toward the
   cursor when it comes near, springing back on exit.
   Desktop (fine pointer) only; honors reduced-motion.
   ============================================================ */

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  /** Extra activation distance (px) beyond the element's own box. */
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Magnetic({
  children,
  strength = 0.3,
  radius = 60,
  className,
  style,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let settled = true;

    const tick = () => {
      curX += (targetX - curX) * 0.16;
      curY += (targetY - curY) * 0.16;
      el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - curX) > 0.08 || Math.abs(targetY - curY) > 0.08) {
        raf = requestAnimationFrame(tick);
      } else {
        curX = targetX;
        curY = targetY;
        if (targetX === 0 && targetY === 0) el.style.transform = '';
        settled = true;
        raf = 0;
      }
    };

    const wake = () => {
      if (settled) {
        settled = false;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;

      if (dist < reach) {
        // ease the pull off toward the edge of the field
        const falloff = 1 - dist / reach;
        targetX = dx * strength * (0.4 + 0.6 * falloff);
        targetY = dy * strength * (0.4 + 0.6 * falloff);
        wake();
      } else if (targetX !== 0 || targetY !== 0) {
        targetX = 0;
        targetY = 0;
        wake();
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform', ...style }}
    >
      {children}
    </div>
  );
}
