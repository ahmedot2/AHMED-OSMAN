import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Publications from '@/components/sections/Publications';
import Media from '@/components/sections/Media';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll overflow-x-hidden">
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
