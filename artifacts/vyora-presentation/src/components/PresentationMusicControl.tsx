import { useEffect, useRef, useState, type CSSProperties } from 'react';

type MusicEngine = {
  context: AudioContext;
  master: GainNode;
  padOscillators: OscillatorNode[];
  step: number;
  timer: number | null;
};

const CHORDS = [
  [65.41, 98, 164.81, 246.94, 293.66],
  [55, 82.41, 130.81, 196, 246.94],
  [87.31, 130.81, 174.61, 220, 261.63],
  [98, 146.83, 196, 220, 293.66],
];

const MELODY = [79, 76, 72, 74, null, 71, 67, null];
const TRANSPOSITIONS = [0, -2, -5, -7];

function midiToFrequency(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function createMusicEngine(): MusicEngine {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.0001;

  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -26;
  compressor.knee.value = 16;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.03;
  compressor.release.value = 0.6;
  master.connect(compressor);
  compressor.connect(context.destination);

  const delay = context.createDelay(1);
  delay.delayTime.value = 0.38;
  const feedback = context.createGain();
  feedback.gain.value = 0.2;
  const echoLevel = context.createGain();
  echoLevel.gain.value = 0.12;
  master.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(echoLevel);
  echoLevel.connect(compressor);

  const padFilter = context.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 1350;
  padFilter.Q.value = 0.5;
  const padLevel = context.createGain();
  padLevel.gain.value = 0.3;
  padFilter.connect(padLevel);
  padLevel.connect(master);

  const padOscillators = CHORDS[0].map((frequency, index) => {
    const oscillator = context.createOscillator();
    const voiceLevel = context.createGain();
    oscillator.type = index === 0 ? 'triangle' : 'sine';
    oscillator.frequency.value = frequency;
    voiceLevel.gain.value = index === 0 ? 0.18 : 0.13;
    oscillator.connect(voiceLevel);
    voiceLevel.connect(padFilter);
    oscillator.start();
    return oscillator;
  });

  return { context, master, padOscillators, step: 0, timer: null };
}

function playSoftNote(engine: MusicEngine, note: number) {
  const { context } = engine;
  const startAt = context.currentTime + 0.04;
  const oscillator = context.createOscillator();
  const toneFilter = context.createBiquadFilter();
  const envelope = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = midiToFrequency(note);
  toneFilter.type = 'lowpass';
  toneFilter.frequency.value = 1900;
  envelope.gain.setValueAtTime(0.0001, startAt);
  envelope.gain.exponentialRampToValueAtTime(0.13, startAt + 0.12);
  envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + 2.1);

  oscillator.connect(toneFilter);
  toneFilter.connect(envelope);
  envelope.connect(engine.master);
  oscillator.start(startAt);
  oscillator.stop(startAt + 2.2);
}

function playNextStep(engine: MusicEngine) {
  const stepInBar = engine.step % MELODY.length;
  const chordIndex = Math.floor(engine.step / MELODY.length) % CHORDS.length;

  if (stepInBar === 0) {
    const chord = CHORDS[chordIndex];
    const now = engine.context.currentTime;
    engine.padOscillators.forEach((oscillator, index) => {
      oscillator.frequency.setTargetAtTime(chord[index], now, 1.4);
    });
  }

  const melodyNote = MELODY[stepInBar];
  if (melodyNote !== null) {
    playSoftNote(engine, melodyNote + TRANSPOSITIONS[chordIndex]);
  }

  engine.step += 1;
  engine.timer = window.setTimeout(() => playNextStep(engine), 1700);
}

export default function PresentationMusicControl({
  style,
}: {
  style: CSSProperties;
}) {
  const engineRef = useRef<MusicEngine | null>(null);
  const suspendTimerRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(
    () => () => {
      if (suspendTimerRef.current !== null) {
        window.clearTimeout(suspendTimerRef.current);
      }
      const engine = engineRef.current;
      if (engine) {
        if (engine.timer !== null) window.clearTimeout(engine.timer);
        void engine.context.close();
      }
    },
    [],
  );

  const toggleMusic = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setUnavailable(false);

    try {
      const engine = (engineRef.current ??= createMusicEngine());
      if (suspendTimerRef.current !== null) {
        window.clearTimeout(suspendTimerRef.current);
        suspendTimerRef.current = null;
      }

      if (playing) {
        if (engine.timer !== null) {
          window.clearTimeout(engine.timer);
          engine.timer = null;
        }
        engine.master.gain.cancelScheduledValues(engine.context.currentTime);
        engine.master.gain.setTargetAtTime(
          0.0001,
          engine.context.currentTime,
          0.2,
        );
        setPlaying(false);
        suspendTimerRef.current = window.setTimeout(() => {
          void engine.context.suspend();
          suspendTimerRef.current = null;
        }, 900);
        return;
      }

      await engine.context.resume();
      engine.master.gain.cancelScheduledValues(engine.context.currentTime);
      engine.master.gain.setTargetAtTime(
        0.28,
        engine.context.currentTime,
        0.9,
      );
      setPlaying(true);
      if (engine.timer === null) playNextStep(engine);
    } catch {
      setUnavailable(true);
      setPlaying(false);
    } finally {
      busyRef.current = false;
    }
  };

  return (
    <button
      type="button"
      className={`vyora-music-control${playing ? ' is-playing' : ''}`}
      style={style}
      onClick={() => void toggleMusic()}
      aria-label={
        unavailable
          ? 'الموسيقى غير متاحة في هذا المتصفح'
          : playing
            ? 'إيقاف موسيقى العرض'
            : 'تشغيل موسيقى العرض'
      }
      aria-pressed={playing}
      title={
        unavailable
          ? 'الموسيقى غير متاحة في هذا المتصفح'
          : playing
            ? 'إيقاف موسيقى العرض'
            : 'تشغيل موسيقى العرض'
      }
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      <span>
        {unavailable
          ? 'الصوت غير متاح'
          : playing
            ? 'الموسيقى تعمل'
            : 'تشغيل الموسيقى'}
      </span>
      {playing && (
        <span className="vyora-music-equalizer" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </button>
  );
}
