'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectCredentials {
    email?: string;
    password?: string;
}

export interface ProjectDetails {
    title: string;
    role: string;
    description: string;
    link: string;
    year: string;
    tags: string[];
    comingSoon?: boolean;
    hasMoreInfo?: boolean;
    breakdown?: string;
    credentials?: ProjectCredentials;
    videoUrl?: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectDetails | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleCopy = (text: string, field: 'email' | 'password') => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto shadow-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 0 0 0.5px rgba(255, 255, 255, 0.06) inset, 0 1px 2px 0 rgba(255, 255, 255, 0.06) inset, 0 8px 32px -4px rgba(0, 0, 0, 0.35), 0 20px 60px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-md transition-all ring-1 ring-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Media Section */}
                            <div className="w-full aspect-video relative bg-black/50 overflow-hidden rounded-t-3xl border-b border-white/5">
                                {project.videoUrl ? (
                                    <video
                                        src={project.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        No preview available
                                    </div>
                                )}
                                
                                {/* Inner Gradient for seamless blend */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 sm:p-10 space-y-8 relative">
                                
                                {/* Header */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <h2 className="text-3xl font-medium tracking-tight text-white/90">
                                            {project.title}
                                        </h2>
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium tracking-wide ring-1 ring-white/10">
                                            {project.year}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-base">{project.role}</p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs tracking-wide ring-1 ring-white/5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Breakdown */}
                                {project.breakdown && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium text-white/80">Project Overview</h3>
                                        <p className="text-white/60 font-light leading-relaxed text-[15px]">
                                            {project.breakdown}
                                        </p>
                                    </div>
                                )}

                                {/* Credentials Panel */}
                                {project.credentials && (project.credentials.email || project.credentials.password) && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium text-white/80">Demo Credentials</h3>
                                        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50 pointer-events-none" />
                                            
                                            {project.credentials.email && (
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-white/40 text-sm w-16">Email</span>
                                                        <span className="text-white/80 font-mono text-sm tracking-tight">{project.credentials.email}</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleCopy(project.credentials!.email!, 'email')}
                                                        className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all ring-1 ring-white/10 text-xs font-medium self-start sm:self-auto"
                                                    >
                                                        {copiedField === 'email' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                                        {copiedField === 'email' ? 'Copied' : 'Copy'}
                                                    </button>
                                                </div>
                                            )}

                                            {project.credentials.email && project.credentials.password && (
                                                <div className="h-px w-full bg-white/5 relative z-10" />
                                            )}

                                            {project.credentials.password && (
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-white/40 text-sm w-16">Password</span>
                                                        <span className="text-white/80 font-mono text-sm tracking-tight">{project.credentials.password}</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleCopy(project.credentials!.password!, 'password')}
                                                        className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all ring-1 ring-white/10 text-xs font-medium self-start sm:self-auto"
                                                    >
                                                        {copiedField === 'password' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                                        {copiedField === 'password' ? 'Copied' : 'Copy'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="pt-4 border-t border-white/10 flex justify-end">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-medium transition-colors tracking-wide text-sm"
                                    >
                                        Visit Platform <ExternalLink size={16} />
                                    </a>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
