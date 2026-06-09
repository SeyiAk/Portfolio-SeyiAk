import { Hero } from '@/components/sections/Hero';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Philosophy } from '@/components/sections/Philosophy';
import { Footer } from '@/components/sections/Footer';
import { Tools } from '@/components/sections/Tools';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Hero />

      <div className='px-6 md:px-12 lg:px-24 max-w-7xl mx-auto'>
        <SelectedWork />
        <Tools />
        <Philosophy />
        <Footer />

      </div>

    </main>
  );
}
