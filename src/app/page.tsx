import Sidebar from '@/components/layout/Sidebar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Publications from '@/components/sections/Publications';
import Media from '@/components/sections/Media';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto snap-y snap-mandatory">
        <Hero />
        <About />
        <Projects />
        <Publications />
        <Media />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
