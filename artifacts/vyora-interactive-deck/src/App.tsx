import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ComponentType, type PointerEvent, type TouchEvent, type WheelEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, LayoutGroup, animate, motion, stagger } from 'framer-motion';
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

function SlideView({
  index,
  onNavigateToSlide,
}: {
  index: number;
  onNavigateToSlide: (target: number) => void;
}) {
  const Slide = slides[index] as ComponentType<{
    active?: boolean;
    onNavigateToSlide?: (target: number) => void;
  }>;
  return (
    <Slide
      active={index === 4 || index === 5 || index === 7}
      onNavigateToSlide={onNavigateToSlide}
    />
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lock = useRef(false);
  const activeIndexRef = useRef(0);
  const transitionTimer = useRef<number | undefined>(undefined);
  const wheelTimer = useRef<number | undefined>(undefined);
  const wheelDelta = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((target: number) => {
    if (lock.current || target < 0 || target >= slides.length || target === activeIndexRef.current) return;
    const from = activeIndexRef.current;
    lock.current = true;
    activeIndexRef.current = target;
    setDirection(target > from ? 'forward' : 'backward');
    setActiveIndex(target);
    setIsTransitioning(true);
    transitionTimer.current = window.setTimeout(() => {
      setIsTransitioning(false);
      lock.current = false;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 40 : 850);
  }, []);

  const navigate = useCallback((move: Direction) => {
    goToSlide(activeIndexRef.current + (move === 'forward' ? 1 : -1));
  }, [goToSlide]);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene || scene.querySelector('.how-it-works-live')) return;

    const visibleContent = Array.from(
      scene.querySelectorAll<HTMLElement | SVGElement>(
        'h2, h3, p, li, img, svg, .logo-plate, .foot',
      ),
    ).filter((element) => element.getClientRects().length > 0);
    if (!visibleContent.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = animate(
      visibleContent,
      { opacity: [0, 1], y: [30, 0] },
      {
        duration: reducedMotion ? 0.01 : 0.62,
        delay: reducedMotion ? 0 : stagger(0.15),
        ease: [0.4, 0, 0.2, 1],
      },
    );
    return () => reveal.stop();
  }, [activeIndex]);

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
  const currentIndex = activeIndex;
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
      <div className="cinematic-backdrop" aria-hidden="true">
        <img className="cinematic-backdrop-photo" src={import.meta.env.BASE_URL + 'media/vyora-gym-background.jpg'} alt="" />
        <div className="cinematic-backdrop-glow cinematic-backdrop-glow-pink" />
        <div className="cinematic-backdrop-glow cinematic-backdrop-glow-blue" />
        <div className="cinematic-backdrop-grid" />
        <svg className="cinematic-neural-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <g className="neural-web" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M-50 220 150 140 290 260 430 170 590 290 720 190 910 280 1060 150 1240 250 1500 120" />
            <path d="M-40 600 130 490 300 620 460 470 620 610 790 480 960 640 1130 470 1310 610 1500 460" />
            <path d="m150 140 20 350m120-230 160 210m140-180 30 320m100-420 170 290m170-420 70 550m180-360 70 220" />
            <path d="m290 260 10 360m140-450 30 300m260-280 50 300m270-210 40 350m250-390 0 400" />
          </g>
          <g className="neural-nodes">
            <circle cx="150" cy="140" r="4" /><circle cx="290" cy="260" r="5" />
            <circle cx="430" cy="170" r="3" /><circle cx="590" cy="290" r="5" />
            <circle cx="720" cy="190" r="4" /><circle cx="910" cy="280" r="5" />
            <circle cx="1060" cy="150" r="4" /><circle cx="1240" cy="250" r="5" />
            <circle cx="130" cy="490" r="4" /><circle cx="300" cy="620" r="5" />
            <circle cx="460" cy="470" r="4" /><circle cx="620" cy="610" r="5" />
            <circle cx="790" cy="480" r="4" /><circle cx="960" cy="640" r="5" />
            <circle cx="1130" cy="470" r="4" /><circle cx="1310" cy="610" r="5" />
          </g>
        </svg>
      </div>
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
          <LayoutGroup id="vyora-move-deck">
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              <motion.div
                key={activeIndex}
                ref={sceneRef}
                className="presentation-scene framer-scene"
                custom={direction}
                variants={{
                  enter: (move: Direction) => ({
                    x: move === 'forward' ? '100%' : '-100%',
                    opacity: 0.55,
                  }),
                  center: { x: '0%', opacity: 1 },
                  exit: (move: Direction) => ({
                    x: move === 'forward' ? '-100%' : '100%',
                    opacity: 0.45,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.01 : 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                aria-live="polite"
              >
                <SlideView index={activeIndex} onNavigateToSlide={goToSlide} />
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>

      <footer className="viewer-controls">
        <button className="nav-button previous-button" type="button" onClick={goPrevious} disabled={activeIndex === 0 || isTransitioning} aria-label="Previous slide" data-testid="button-previous">
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
              disabled={isTransitioning}
            />
          ))}
        </div>
        <button className="nav-button next-button" type="button" onClick={goNext} disabled={activeIndex === slides.length - 1 || isTransitioning} aria-label="Next slide" data-testid="button-next">
          <span>Next</span>
          <ArrowRight size={17} strokeWidth={1.8} />
        </button>
      </footer>
    </main>
  );
}

export default App;
