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
    <div className="bg-black text-white min-h-screen">
      <Sidebar />
      <main className="snap-y snap-mandatory h-screen overflow-y-auto md:pl-20 pt-16 md:pt-0">
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
