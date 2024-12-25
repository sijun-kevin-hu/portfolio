import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
import Introduction from "./components/Introduction";
import TechStack from "./components/TechStack";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="w-full h-screen"><Hero /></div>
      <div className="w-full h-screen"><Introduction /></div>
      <div className="w-full h-screen"><TechStack /></div>
    </div>
  );
}

export default App;
