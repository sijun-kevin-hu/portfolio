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
      <div className="w-full h-full pt-14 lg:pt-32"><Hero /></div>
      <div className="w-full h-full"><Introduction /></div>
      <div className="w-full h-full"><TechStack /></div>
      <div className="w-full h-full"><Projects /></div>
      <p className="text-center">@ 2024 - All Rights Reserved</p>
    </div>
  );
}

export default App;
