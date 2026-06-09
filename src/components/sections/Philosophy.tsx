import { SectionWrapper } from '@/components/ui/SectionWrapper';
import CardSwap, { Card } from '../ui/CardSwap';
import { SectionHeading } from '../ui/SectionHeading';

const philosophies = [
    {
        title: 'Interfaces as living systems',
        description: 'A frontend is more than static screens. It must respond fluidly, elegantly handle latency, and provide continuous micro-feedback to the user.'
    },
    {
        title: 'Restraint in animation',
        description: 'Motion should clarify intent, not distract. Every transition must earn its place by guiding attention or confirming an interaction.'
    },
    {
        title: 'Uncompromising accessibility',
        description: 'Semantics, keyboard navigation, and contrast are foundational requirements, not final-hour checklists. Great design is universally usable.'
    },
    {
        title: 'Resilient architecture',
        description: 'Predictable state management and type safety unlock velocity. I build systems that developers enjoy extending and maintaining long-term.'
    }
];

export function Philosophy() {
    return (
        <SectionWrapper id="philosophy">
            <div className="max-w-4xl flex flex-wrap justify-between ">
                <div>
                    <SectionHeading
                        id="philosophy"
                        className="text-3xl font-medium tracking-tight text-white/90"
                    >
                        How I Build Products
                    </SectionHeading>
                    <p className="mt-4 text-white/50 max-w-lg text-lg font-light leading-relaxed">
                        Code serves the product. Architecture serves the team. I optimize for both.
                    </p>
                </div>

                {/* <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
                    {philosophies.map((item, idx) => (
                        <div key={idx} className="space-y-3 relative group">
                            <div className="absolute -inset-x-4 -inset-y-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-white/5 to-transparent pointer-events-none -z-10" />
                            <h3 className="text-lg font-medium text-white/80">{item.title}</h3>
                            <p className="text-white/50 font-light leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div> */}

                <div className="h-[350px] sm:h-[450px] md:h-[300px] relative flex items-center justify-center">
                    <CardSwap
                        width={380}
                        height={280}
                        cardDistance={45}
                        verticalDistance={50}
                        delay={5000}
                        pauseOnHover={false}
                        skewAmount={4}
                    >
                        {philosophies.map((item, idx) => (
                            <Card key={idx}>
                                <h3 className="text-lg font-medium text-white/80">{item.title}</h3>
                                <p className="text-sm text-white/50 font-light leading-relaxed">
                                    {item.description}
                                </p>
                            </Card>
                        ))}
                    </CardSwap>
                </div>

            </div>
        </SectionWrapper>
    );
}
