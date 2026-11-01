import { useCallback, useEffect, useRef, useState, type ComponentType, type PointerEvent, type TouchEvent, type WheelEvent } from 'react';
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
  const wheelTimer = useRef<number | undefined>(undefined);
  const wheelDelta = useRef(0);
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
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 40 : 880);
  }, []);

  const goToSlide = useCallback((target: number) => {
    if (lock.current || target < 0 || target >= slides.length || target === activeIndexRef.current) return;
    const from = activeIndexRef.current;
    lock.current = true;
    activeIndexRef.current = target;
    setActiveIndex(target);
    setTransition({ from, to: target, direction: target > from ? 'forward' : 'backward' });
    transitionTimer.current = window.setTimeout(() => {
      setTransition(null);
      lock.current = false;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 40 : 880);
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
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    };
  }, [navigate]);

  const goPrevious = () => navigate('backward');
  const goNext = () => navigate('forward');
  const currentIndex = transition?.to ?? activeIndex;
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    navigate(deltaX < 0 ? 'forward' : 'backward');
  };
  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < Math.abs(event.deltaX) || event.deltaY === 0) return;
    event.preventDefault();
    if (lock.current) return;
    if (wheelDelta.current && Math.sign(wheelDelta.current) !== Math.sign(event.deltaY)) wheelDelta.current = 0;
    wheelDelta.current += event.deltaY;
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => { wheelDelta.current = 0; }, 140);
    if (Math.abs(wheelDelta.current) >= 42) {
      const direction = wheelDelta.current > 0 ? 'forward' : 'backward';
      wheelDelta.current = 0;
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
      navigate(direction);
    }
  };
  const resetParallax = (stage: HTMLDivElement) => {
    stage.style.setProperty('--parallax-photo-x', '0px');
    stage.style.setProperty('--parallax-photo-y', '0px');
    stage.style.setProperty('--parallax-blob-x', '0px');
    stage.style.setProperty('--parallax-blob-y', '0px');
    stage.style.setProperty('--parallax-backdrop-x', '0px');
    stage.style.setProperty('--parallax-backdrop-y', '0px');
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType === 'touch' ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const stage = event.currentTarget;
    stage.style.setProperty('--parallax-photo-x', `${x * -8}px`);
    stage.style.setProperty('--parallax-photo-y', `${y * -6}px`);
    stage.style.setProperty('--parallax-blob-x', `${x * 13}px`);
    stage.style.setProperty('--parallax-blob-y', `${y * 10}px`);
    stage.style.setProperty('--parallax-backdrop-x', `${x * -3}px`);
    stage.style.setProperty('--parallax-backdrop-y', `${y * -2}px`);
  };
  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => resetParallax(event.currentTarget);

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
          onWheel={onWheel}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
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
        <div className="progress-rail" role="group" aria-label={`Slide ${currentIndex + 1} of 12`}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`progress-segment ${index <= currentIndex ? 'is-passed' : ''} ${index === currentIndex ? 'is-current' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'step' : undefined}
              disabled={Boolean(transition)}
            />
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
