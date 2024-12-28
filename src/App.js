import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
import Introduction from "./components/Introduction";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 w-full z-50"><Navbar /></div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full pt-20 lg:pt-18"><Hero /></div>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full"><Introduction /></div>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full"><TechStack /></div>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full"><Projects /></div>
      </div>
      <p className="text-center">@ 2024 - All Rights Reserved</p>
      <p className="text-center">Designed and Developed by Sijun Kevin Hu</p>
      <p className="text-center">Icons by <a href="https://icons8.com" className="underline">Icons8</a></p>
    </div>
  );
}

export default App;
