'use client'

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectModal, ProjectDetails } from '../ui/ProjectModal';

const caseStudies: ProjectDetails[] = [
    {
        title: 'VisitorFlow',
        role: 'Frontend Architecture & Implementation',
        description: 'A modern, comprehensive visitor management system built for scalability and security.',
        link: 'https://dev.sentriflow.tech/',
        year: '2026',
        tags: ['React', 'TypeScript', 'Tailwind', 'Tanstack Query', 'Axios', 'Shadcn'],
        hasMoreInfo: true,
        videoUrl: '/VisitorFlow Looped Video.mp4',
        breakdown: 'VisitorFlow is an enterprise-grade visitor management solution engineered to streamline facility access. Built with a robust React and TypeScript frontend, it utilizes Tanstack Query for highly optimized data synchronization and state management. The UI leverages Shadcn and Tailwind CSS to deliver a premium, accessible, and responsive experience, ensuring seamless operations for front-desk staff and administrators.',
        credentials: {
            email: 'testbro123@yopmail.com',
            password: 'lX!1Ecj9n7E3'
        }
    },
    {
        title: 'Nexus Portfolio',
        role: 'Architecture, Implementation and Deployment',
        description: 'A futuristic and space-inspired animated landing page built with React, GSAP and Framer Motion.',
        link: 'https://nexusportfolio.vercel.app/',
        year: '2026',
        tags: ['React', 'TypeScript', 'GSAP', 'Framer Motion', 'Tailwind'],
        comingSoon: false,
    },
    {
        title: 'Afro-Central (Coming-Soon)',
        role: 'Architecture, Implementation and Deployment',
        description: 'A modern story-telling landing page for a pan-african cultural movement.',
        link: '#',
        year: '2026',
        tags: ['Next.Js', 'TypeScript', 'GSAP', 'Framer Motion', 'Tailwind'],
        comingSoon: true,
    },
];

export function SelectedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (project: ProjectDetails) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 85%', 'start 25%'],
    });

    // GPU-composited: opacity + translateY only (no clip-path, no willChange overrides)
    const headerOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

    return (
        <SectionWrapper id="work">
            <div ref={sectionRef} className="flex flex-col gap-12">
                <motion.div
                    className="space-y-4"
                    style={{ opacity: headerOpacity, y: headerY }}
                >
                    <SectionHeading
                        id="work"
                        className="text-3xl font-medium tracking-tight text-white/90"
                    >
                        Selected Work
                    </SectionHeading>
                    <p className="text-white/50 max-w-2xl text-lg font-light leading-relaxed">
                        Case studies representing my focus on scalable architecture and meticulous user experience.
                    </p>
                </motion.div>

                {/* 
                    Each card is independently animated using whileInView + once: true.
                    - Runs the animation only once (on first scroll into view), so scrolling
                      back up won't re-trigger it and cause jank.
                    - Uses opacity + translateY — both GPU-composited, zero repaints.
                    - No clip-path, no willChange overrides.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {caseStudies.map((study, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 48 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                duration: 0.55,
                                delay: idx * 0.12,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="h-full"
                        >
                            <SpotlightCard
                                className="custom-spotlight-card glass-panel group flex flex-col h-full"
                                spotlightColor="rgba(255, 255, 255, 0.06)"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-white/40 text-sm font-medium mb-2">{study.year}</p>
                                        <h3 className="text-2xl font-medium text-white/90 group-hover:text-white transition-colors">
                                            {study.title}
                                        </h3>
                                        <p className="text-white/60 text-sm mt-1">{study.role}</p>
                                    </div>

                                    {study.comingSoon ? (
                                        <p className="text-white/40 text-sm font-medium mb-2">Coming Soon</p>
                                    ) : study.hasMoreInfo ? (
                                        <button
                                            onClick={() => handleOpenModal(study)}
                                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all ring-1 ring-white/10 cursor-pointer"
                                            aria-label={`View details for ${study.title}`}
                                        >
                                            <ExternalLink size={18} />
                                        </button>
                                    ) : (
                                        <a
                                            href={study.link}
                                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all ring-1 ring-white/10 cursor-pointer"
                                            aria-label={`View ${study.title}`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>

                                <p className="text-white/60 leading-relaxed font-light flex-grow mb-8">
                                    {study.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {study.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs tracking-wide ring-1 ring-white/5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>

                {/* <div className="flex justify-end relative z-10">
                    <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group text-sm font-medium tracking-wide">
                        View Archive
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div> */}
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </SectionWrapper>
    );
}