import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';
import { asset } from '@/lib/data';

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 14h14l10 26 10-26h14L38 52H26z" fill="#A4F477" />
      <path d="M2 30l22-4v6L2 36z" fill="#A4F477" opacity=".55" />
    </svg>
  );
}

export function Logo({ full = false }: { full?: boolean }) {
  return (
    <span className="flex items-center gap-3" data-testid="brand-logo">
      <LogoMark />
      <span className="leading-none">
        <span className="flex items-baseline gap-2">
          <span className="latin text-xl font-bold tracking-[.32em]" dir="ltr">VY<span className="text-primary">O</span>RA</span>
          <span className="text-sm font-bold text-primary">ڤايورا</span>
        </span>
        <span className="latin mt-1 block text-[9px] font-medium tracking-[.2em] text-muted-foreground" dir="ltr">MOVE BEYOND LIMITS.</span>
        {full && <span className="mt-2 block text-xs text-muted-foreground">تدريبك في بيتك.. لنسخة أقوى من نفسك.</span>}
      </span>
    </span>
  );
}

export function SmartImg({ src, alt, className = '', testId, label }: { src: string; alt: string; className?: string; testId?: string; label?: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { setState('loading'); if (ref.current?.complete && ref.current.naturalWidth > 0) setState('ok'); }, [src]);
  return (
    <div className={`${className.split(/\s+/).includes('absolute') ? 'absolute' : 'relative'} overflow-hidden bg-muted ${className}`} data-testid={testId}>
      {state === 'loading' && <div className="shimmer absolute inset-0" aria-hidden="true" />}
      {state === 'error' ? (
        <div role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#1b1f1a] to-[#0d0f0d] text-muted-foreground" data-testid="img-fallback">
          <span className="flex flex-col items-center gap-1 text-xs"><ImageOff size={22} />{label ?? alt}</span>
        </div>
      ) : (
        <img ref={ref} src={asset(src)} alt={alt} loading="lazy" onLoad={() => setState('ok')} onError={() => setState('error')} className={`h-full w-full object-cover transition-opacity duration-500 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </div>
  );
}

export function Chip({ active, onClick, children, testId }: { active?: boolean; onClick: () => void; children: ReactNode; testId: string }) {
  return (
    <button onClick={onClick} aria-pressed={active} data-testid={testId} className={`focus-ring press shrink-0 rounded-full border px-4 py-2 text-xs font-bold ${active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>{children}</button>
  );
}

export function Tag({ children, tone = 'lime' }: { children: ReactNode; tone?: 'lime' | 'dim' }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tone === 'lime' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>{children}</span>;
}

export function Modal({ open, title, body, confirmLabel, onConfirm, onCancel }: { open: boolean; title: string; body: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onCancel]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-end bg-black/70 p-4 backdrop-blur-sm sm:place-items-center" data-testid="modal-confirm" onClick={onCancel}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="modal-title" className="page-enter w-full max-w-sm rounded-3xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button ref={cancelRef} onClick={onCancel} data-testid="button-modal-cancel" className="focus-ring press rounded-xl border border-border py-3 text-sm font-bold">تراجع</button>
          <button onClick={onConfirm} data-testid="button-modal-confirm" className="focus-ring press rounded-xl bg-destructive py-3 text-sm font-bold text-destructive-foreground">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, body, children, testId }: { icon: ReactNode; title: string; body: string; children?: ReactNode; testId: string }) {
  return (
    <div className="card-dark border-dashed px-6 py-12 text-center" data-testid={testId}>
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">{icon}</span>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{body}</p>
      {children && <div className="mt-5 flex justify-center">{children}</div>}
    </div>
  );
}
