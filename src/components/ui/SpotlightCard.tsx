'use client'
import React, { useRef, useCallback } from 'react';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Use refs + direct DOM manipulation instead of React state to avoid re-renders
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlightRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
  }, [spotlightColor]);

  const handleMouseEnter = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0.6';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
