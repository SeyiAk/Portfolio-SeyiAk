'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth, restrained ease-out
            className={cn('w-full py-16 md:py-24', className)}
        >
            {children}
        </motion.section>
    );
}
