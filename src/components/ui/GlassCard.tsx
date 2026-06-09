'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
    className?: string;
    glow?: boolean;
    elevated?: boolean;
}

export function GlassCard({ children, className, glow = false, elevated = false, ...props }: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                elevated ? 'glass-panel-elevated' : 'glass-panel',
                'rounded-2xl p-6 md:p-8 relative overflow-hidden',
                className
            )}
            {...props}
        >
            {/* Top-edge light reflection — diagonal shine simulating overhead light */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 60%, transparent 90%)',
                }}
            />

            {/* Inner corner light — subtle top-left specular refraction */}
            <div
                className="absolute top-0 left-0 w-1/2 h-1/3 pointer-events-none rounded-tl-2xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                }}
            />

            {/* Ambient glow behind the card for depth */}
            {glow && (
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/[0.07] via-purple-500/[0.04] to-transparent blur-2xl pointer-events-none" />
            )}

            {/* Subtle inner ring for glass edge definition */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] pointer-events-none" />

            {children}
        </motion.div>
    );
}

