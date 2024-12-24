import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
import Introduction from "./components/Introduction";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Introduction />
    </div>
  );
}

export default App;
