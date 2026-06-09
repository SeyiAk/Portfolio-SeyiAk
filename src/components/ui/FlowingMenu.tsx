'use client'
import React, { useRef, useEffect, useState } from 'react';

interface MenuItemData {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  /** Duration in seconds for one full marquee cycle */
  speed?: number;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  isFirst: boolean;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
}) => {
  return (
    <div className="w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.03) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 4px 24px -4px rgba(0,0,0,0.25)',
      }}
    >
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  image,
  speed,
  isFirst
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const [repetitions, setRepetitions] = useState(4);

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const marquee = marqueeRef.current;
    const inner = marqueeInnerRef.current;

    // Set initial positions
    marquee.style.transition = 'none';
    inner.style.transition = 'none';
    marquee.style.transform = `translateY(${edge === 'top' ? '-101%' : '101%'})`;
    inner.style.transform = `translateY(${edge === 'top' ? '101%' : '-101%'})`;

    // Force reflow then animate
    void marquee.offsetHeight;
    marquee.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    inner.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    marquee.style.transform = 'translateY(0%)';
    inner.style.transform = 'translateY(0%)';
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const marquee = marqueeRef.current;
    const inner = marqueeInnerRef.current;

    marquee.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    inner.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    marquee.style.transform = `translateY(${edge === 'top' ? '-101%' : '101%'})`;
    inner.style.transform = `translateY(${edge === 'top' ? '101%' : '-101%'})`;
  };

  return (
    <div
      className="flex-1 relative overflow-hidden text-center"
      ref={itemRef}
      style={{
        borderTop: isFirst ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-light tracking-widest text-[3.5vh] transition-colors duration-300"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        ref={marqueeRef}
        style={{
          transform: 'translateY(101%)',
          /* Solid semi-transparent bg instead of expensive backdrop-filter */
          background: 'linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(20,20,30,0.92) 50%, rgba(25,25,35,0.95) 100%)',
        }}
      >
        {/* CSS animation for marquee — compositor-driven, no GSAP overhead */}
        <div
          className="h-full w-fit flex marquee-track"
          ref={marqueeInnerRef}
          style={{
            /* --marquee-duration is set via CSS custom property for the speed */
            animation: `marquee-scroll ${speed}s linear infinite`,
          }}
        >
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center flex-shrink-0" key={idx}>
              <span
                className="whitespace-nowrap uppercase font-medium tracking-wider text-[3.5vh] leading-[1] px-[1vw]"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                {text}
              </span>
              <div
                className="w-[50px] h-[50px] my-[2em] mx-[2vw] rounded-xl bg-contain bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scoped keyframes for this marquee — injected once per component */}
      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / ${repetitions} * 1)); }
        }
      `}</style>
    </div>
  );
};

export default FlowingMenu;
