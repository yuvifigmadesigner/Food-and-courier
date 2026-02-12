// This will be replaced by the Hero component usage
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import InsightSection from './components/InsightSection';
import ConclusionSection from './components/ConclusionSection';
import FloatingControls from './components/FloatingControls';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <FeatureSection />
      <InsightSection />
      <ConclusionSection />
      <FloatingControls />
    </div>
  );
}

export default App;
