import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
    return (
        <SectionWrapper id="contact" className="pb-8 pt-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t border-white/5 pt-12">
                <div className="space-y-4 max-w-md">
                    <h2 className="text-2xl font-medium tracking-tight text-white/90">Let's connect</h2>
                    <p className="text-white/50 font-light leading-relaxed">
                        I'm always open to new opportunities as a Frontend Engineer. If you're building something ambitious, I'd love to talk.
                    </p>
                    <a
                        href="mailto:akinseyi123.com"
                        className="inline-block mt-4 text-white/80 hover:text-white transition-colors border-b border-white/20 hover:border-white/50 pb-1"
                    >
                        akinseyi123.com
                    </a>
                </div>

                <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                    <div className="flex gap-4">
                        <a href="https://github.com/SeyiAk" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all ring-1 ring-white/10" aria-label="Github" target='_blank' rel='noopener noreferrer'>
                            <Github size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/oluwaseyi-akinyinka-9b6563331" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all ring-1 ring-white/10" aria-label="LinkedIn" target='_blank' rel='noopener noreferrer'>
                            <Linkedin size={18} />
                        </a>
                        {/* <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all ring-1 ring-white/10" aria-label="Twitter">
                            <Twitter size={18} />
                        </a> */}
                    </div>
                    <p className="text-white/40 text-sm font-light">
                        © {new Date().getFullYear()} Designed & Engineered by SeyiAk.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
