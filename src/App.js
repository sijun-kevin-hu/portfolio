import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-base text-text-primary overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Leadership />
        <Contact />
      </main>
    </div>
  );
}

export default App;
