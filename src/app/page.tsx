import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Hero />
      </main>
    </div>
  );
}
