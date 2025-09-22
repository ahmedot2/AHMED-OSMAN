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
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-20">
        <main className="flex-1 snap-y snap-mandatory h-screen overflow-y-auto">
          <Hero />
          <About />
          <Projects />
          <Publications />
          <Media />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
