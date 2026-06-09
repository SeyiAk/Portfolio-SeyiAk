'use client'
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import FlowingMenu from '../ui/FlowingMenu';
import { SectionHeading } from '../ui/SectionHeading';

const demoItems = [
    { link: '#', text: 'React.js', image: '/svgs/react.svg' },
    { link: '#', text: 'Next.js', image: '/svgs/nextjs-white.svg' },
    { link: '#', text: 'TypeScript', image: '/svgs/typescript.svg' },
    { link: '#', text: 'JavaScript', image: '/svgs/javascript.svg' },
    { link: '#', text: 'Tailwind CSS', image: '/svgs/tailwind.svg' },
    // { link: '#', text: 'Node.js', image: '/svgs/nodejs.svg' },
    { link: '#', text: 'Framer Motion', image: '/svgs/framer.svg' },
    { link: '#', text: 'GSAP', image: '/svgs/gsap.svg' },
    { link: '#', text: 'Figma', image: '/svgs/figma.svg' },
    { link: '#', text: 'Git', image: '/svgs/git.svg' },
];



export function Tools() {
    // const ref = useRef(null)
    // const { scrollYProgress } = useScroll({
    //     target: ref,
    //     offset: ["start end", "center center"]
    // })

    // const clipPath = useTransform(
    //     scrollYProgress,
    //     [0, 1],
    //     ["inset(0% 20% 0% 20%)", "inset(0% 0% 0% 0%)"]  // was 50% 50%
    // )

    return (
        <SectionWrapper id="tools">


            <div className="flex flex-col gap-12">
                <div className="space-y-4">
                    <SectionHeading
                        id="tools"
                        className="text-3xl font-medium tracking-tight text-white/90"
                    >
                        Tools
                    </SectionHeading>
                    <p className="text-white/50 max-w-2xl text-lg font-light leading-relaxed">
                        I am comfortable and posses experience with the following technologies.
                    </p>
                </div>


            </div>
            <div className='mt-2' style={{ height: '600px', position: 'relative' }}>
                <FlowingMenu items={demoItems} speed={15} />
            </div>
        </SectionWrapper>
    );
}
