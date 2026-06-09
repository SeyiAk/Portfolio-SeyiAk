'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { motion } from 'framer-motion';
import Prism from '../ui/Prism';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.3,
        },
    },
};

export function Hero() {
    return (
        <SectionWrapper className="min-h-[85vh] flex flex-col justify-center relative">

            {/* Prism as a full-bleed background layer */}
            <div className="absolute inset-0 z-0">
                <Prism
                    animationType="rotate"
                    timeScale={0.5}
                    height={3.5}
                    baseWidth={5.5}
                    scale={3.4}
                    hueShift={0}
                    colorFrequency={1}
                    noise={0}
                    glow={0.4}
                />
            </div>

            <motion.div
                className="flex flex-col items-center text-center mx-auto px-6 md:px-12 lg:px-24 space-y-6 md:space-y-8 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Name intro badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl"
                    variants={fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <span className="text-sm md:text-base font-light text-white/80 tracking-widest capitalize">
                        Hi, I'm <span className="font-medium text-white">Seyi</span>
                    </span>
                </motion.div>

                {/* Heading — each line animates in */}
                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1]"
                    variants={fadeUp}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    A premium product-focused
                    <br className="hidden md:block" />
                    <span className="text-white/40"> frontend engineer.</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed"
                    variants={fadeUp}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    Crafting exceptional interfaces with a relentless emphasis on user experience, system architecture, and modern fluid aesthetics.
                </motion.p>
            </motion.div>

        </SectionWrapper>
    );
}
