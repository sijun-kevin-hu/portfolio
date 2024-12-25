import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
import Introduction from "./components/Introduction";
import TechStack from "./components/TechStack";

function App() {
  return (
    <div className="App">
      <div className="fixed top-0 w-full z-50"><Navbar /></div>
      <div className="w-full h-screen mt-32 lg:mt-40"><Hero /></div>
      <div className="w-full h-screen"><Introduction /></div>
      <div className="w-full h-screen"><TechStack /></div>
    </div>
  );
}

export default App;
