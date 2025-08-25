import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
import Introduction from "./components/Introduction";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <TechStack />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;
