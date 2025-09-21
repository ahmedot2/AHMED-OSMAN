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
      <main>
        <Hero />
        {/* The rest of the sections can be re-enabled as needed */}
        {/* <About />
        <Projects />
        <Publications />
        <Media />
        <Contact />
        <Footer /> */}
      </main>
    </div>
  );
}
