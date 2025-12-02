import * as React from 'react';
import { cn } from './utils';

type FloatingCardProps = {
  variant?: 'text' | 'image';
  label?: string;
  title?: string;
  imgSrc?: string;
  imgAlt?: string;
  accentColor?: string;
  className?: string;
  children?: React.ReactNode;
  floating?: boolean;
  floatDelayMs?: number;
};

function FloatingCard({
  variant = 'text',
  label,
  title,
  imgSrc,
  imgAlt,
  accentColor = '#22c55e',
  className,
  children,
  floating = true,
  floatDelayMs = 0,
}: FloatingCardProps) {
  const kf = `@keyframes floatingCardBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`;
  return (
    <div
      className={cn(
        'bg-white text-black rounded-[24px] shadow-2xl ring-1 ring-black/5',
        'transition-all duration-300 ease-out will-change-transform',
        'hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]',
        className,
      )}
    >
      <div className="relative">
        <span
          className="absolute -top-2 -left-2 h-4 w-4 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div style={floating ? { animation: 'floatingCardBob 6s ease-in-out infinite', animationDelay: `${floatDelayMs}ms` } : undefined}>
        {variant === 'image' && imgSrc ? (
          <div className="p-8">
            <div className="overflow-hidden rounded-[20px] bg-[#f5f5f5]">
              <img src={imgSrc} alt={imgAlt || ''} className="w-full h-[220px] object-cover rounded-[20px]" />
            </div>
          </div>
        ) : (
          <div className="p-8 min-h-[280px]">
            {label && <div className="text-sm text-black/70 mb-2">{label}</div>}
            {title && <div className="text-2xl sm:text-3xl font-semibold leading-snug text-black">{title}</div>}
            {children && <div className="mt-3 text-black/85">{children}</div>}
          </div>
        )}
              </div>
              <style>{kf}</style>
            </div>
          );
}

type FloatingCardGridProps = {
  children: React.ReactNode;
  className?: string;
  cols?: string;
};

function FloatingCardGrid({ children, className, cols }: FloatingCardGridProps) {
  return (
    <div
      className={cn(
        'bg-transparent py-8 grid gap-6 sm:gap-8',
        cols || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

export { FloatingCard, FloatingCardGrid };
