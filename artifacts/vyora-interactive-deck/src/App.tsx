import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Cover from '@/pages/slides/Cover';
import Introduction from '@/pages/slides/Introduction';
import ProblemSolution from '@/pages/slides/ProblemSolution';
import Objectives from '@/pages/slides/Objectives';
import Features from '@/pages/slides/Features';
import Audience from '@/pages/slides/Audience';
import Experience from '@/pages/slides/Experience';
import HowItWorks from '@/pages/slides/HowItWorks';
import Technology from '@/pages/slides/Technology';
import Screens from '@/pages/slides/Screens';
import Challenges from '@/pages/slides/Challenges';
import ThankYou from '@/pages/slides/ThankYou';

const slides = [
  Cover,
  Introduction,
  ProblemSolution,
  Objectives,
  Features,
  Audience,
  Experience,
  HowItWorks,
  Technology,
  Screens,
  Challenges,
  ThankYou,
];

type Direction = 'forward' | 'backward';
type Transition = { from: number; to: number; direction: Direction };

function SlideView({ index }: { index: number }) {
  const Slide = slides[index] as ComponentType<{ active?: boolean }>;
  return <Slide active={index === 4 || index === 5 || index === 7} />;
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState<Transition | null>(null);
  const lock = useRef(false);
  const activeIndexRef = useRef(0);
  const transitionTimer = useRef<number | undefined>(undefined);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const navigate = useCallback((direction: Direction) => {
    if (lock.current) return;
    const from = activeIndexRef.current;
    const target = from + (direction === 'forward' ? 1 : -1);
    if (target < 0 || target >= slides.length) return;
    lock.current = true;
    activeIndexRef.current = target;
    setActiveIndex(target);
    setTransition({ from, to: target, direction });
    transitionTimer.current = window.setTimeout(() => {
      setTransition(null);
      lock.current = false;
    }, 600);
  }, []);

  useEffect(() => {
    console.info(`[VYORA MOVE] Current slide: ${activeIndex + 1}/${slides.length}`);
  }, [activeIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigate('forward');
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate('backward');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    };
  }, [navigate]);

  const goPrevious = () => navigate('backward');
  const goNext = () => navigate('forward');
  const currentIndex = transition?.to ?? activeIndex;
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    navigate(deltaX < 0 ? 'forward' : 'backward');
  };

  return (
    <main className="presentation-shell" data-testid="presentation-shell">
      <header className="viewer-header">
        <div className="viewer-brand" aria-label="VYORA MOVE">
          <span className="viewer-mark">V</span>
          <span className="viewer-brand-copy"><strong>VYORA</strong><small>MOVE</small></span>
        </div>
        <div className="viewer-context"><span className="live-dot" /> PROJECT PRESENTATION</div>
        <div className="keyboard-hint"><kbd>←</kbd><kbd>→</kbd><span>navigate</span></div>
      </header>

      <section className="presentation-stage-wrap" aria-label="VYORA MOVE presentation">
        <div
          className="presentation-stage"
          data-testid="presentation-stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          {transition ? (
            <>
              <div className={`presentation-scene scene-exit-${transition.direction}`} aria-hidden="true">
                <SlideView index={transition.from} />
              </div>
              <div className={`presentation-scene scene-enter-${transition.direction}`} aria-live="polite">
                <SlideView index={transition.to} />
              </div>
            </>
          ) : (
            <div className="presentation-scene scene-current" aria-live="polite">
              <SlideView index={activeIndex} />
            </div>
          )}
        </div>
      </section>

      <footer className="viewer-controls">
        <button className="nav-button previous-button" type="button" onClick={goPrevious} disabled={activeIndex === 0 || Boolean(transition)} aria-label="Previous slide" data-testid="button-previous">
          <ArrowLeft size={17} strokeWidth={1.8} />
          <span>Previous</span>
        </button>
        <div className="slide-status" aria-live="polite" data-testid="text-slide-count">
          <span className="status-label">SLIDE</span>
          <strong>{String(currentIndex + 1).padStart(2, '0')}</strong>
          <span className="status-divider">/</span>
          <span className="status-total">12</span>
        </div>
        <div className="progress-rail" aria-label={`Slide ${currentIndex + 1} of 12`}>
          {slides.map((_, index) => (
            <span key={index} className={`progress-segment ${index <= currentIndex ? 'is-passed' : ''} ${index === currentIndex ? 'is-current' : ''}`} />
          ))}
        </div>
        <button className="nav-button next-button" type="button" onClick={goNext} disabled={activeIndex === slides.length - 1 || Boolean(transition)} aria-label="Next slide" data-testid="button-next">
          <span>Next</span>
          <ArrowRight size={17} strokeWidth={1.8} />
        </button>
      </footer>
    </main>
  );
}

export default App;
