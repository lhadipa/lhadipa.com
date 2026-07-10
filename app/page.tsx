import Sun from '@/components/Sun';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Terminal from '@/components/Terminal';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <>
      <Sun />
      <Navbar />
      <main>
        <Hero />
        <div className="canvas">
          <div className="wrap">
            <Features />
            <Terminal />
          </div>
        </div>
        <div className="wrap">
          <Stats />
          <About />
          <Work />
          <Contact />
        </div>
        <Footer />
      </main>
      <Reveal />
    </>
  );
}
