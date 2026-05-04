/* global React */
const { useMemo } = React;

function App() {
  const tweaks = useTweaks();
  const direction = tweaks.direction === 'bold' ? 'bold' : 'safe';

  const renderSection = (key) => {
    switch (key) {
      case 'hero':
        return direction === 'bold'
          ? <HeroBold key="hero" tweaks={tweaks} />
          : <HeroSafe key="hero" tweaks={tweaks} />;
      case 'manifesto':
        return <SectionManifesto key="manifesto" tweaks={tweaks} direction={direction} />;
      case 'system':
        return <SectionSystem key="system" tweaks={tweaks} direction={direction} />;
      case 'capture':
        return <SectionCapture key="capture" tweaks={tweaks} direction={direction} />;
      case 'community':
        return <SectionCommunity key="community" tweaks={tweaks} direction={direction} />;
      default:
        return null;
    }
  };

  const order = Array.isArray(tweaks.sectionOrder) && tweaks.sectionOrder.length
    ? tweaks.sectionOrder
    : ['hero', 'manifesto', 'system', 'capture', 'community'];

  return (
    <>
      {order.map(renderSection)}
      <Footer />
      {direction === 'safe' && <FloatingFilmLauncher />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
