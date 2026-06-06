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
      case 'scarcity':
        return <SectionScarcity key="scarcity" tweaks={tweaks} direction={direction} />;
      case 'colorways':
        return <SectionColorways key="colorways" tweaks={tweaks} direction={direction} />;
      case 'setup':
        return <SectionSetup key="setup" tweaks={tweaks} direction={direction} />;
      case 'build':
        return <SectionBuild key="build" tweaks={tweaks} direction={direction} />;
      case 'specs':
        return <SectionSpecs key="specs" tweaks={tweaks} direction={direction} />;
      case 'system':
        return <SectionSystem key="system" tweaks={tweaks} direction={direction} />;
      case 'faq':
        return <SectionFAQ key="faq" tweaks={tweaks} direction={direction} />;
      case 'capture':
        return <SectionCapture key="capture" tweaks={tweaks} direction={direction} />;
      default:
        return null;
    }
  };

  // Canonical production order. Honor a saved reordering from the dev Tweaks
  // panel ONLY when it is a full permutation of the canonical set; otherwise
  // (stale/partial/old localStorage) fall back to canonical so the section
  // sequence — and its light/dark alternation — is always correct.
  const CANONICAL_ORDER = [
    'hero', 'manifesto', 'scarcity', 'colorways', 'setup', 'build', 'specs', 'faq', 'capture'
  ];
  const savedValid = (Array.isArray(tweaks.sectionOrder) ? tweaks.sectionOrder : [])
    .filter((k) => CANONICAL_ORDER.includes(k));
  const order = savedValid.length === CANONICAL_ORDER.length ? savedValid : CANONICAL_ORDER;

  return (
    <>
      {order.map(renderSection)}
      <Footer />
      {direction === 'safe' && <FloatingFilmLauncher />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
