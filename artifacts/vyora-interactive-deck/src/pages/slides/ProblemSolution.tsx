import { SlideTitle } from '@/components/SlideTitle';

const cards = [
  { kind: 'PROBLEM', text: 'محتوى متفرّق يصعّب اختيار التمرين.' },
  { kind: 'PROBLEM', text: 'غياب التنظيم والمتابعة المستمرة.' },
  { kind: 'PROBLEM', text: 'التباس طريقة الأداء والأخطاء الشائعة.' },
  { kind: 'SOLUTION', text: 'مكتبة مصنّفة وفيديو لكل تمرين متاح.' },
  {
    kind: 'SOLUTION',
    text: 'خطة أسبوعية ومؤقت وسجل للجلسات.',
    extra: 'إرشادات عربية وصور للصح والخطأ.',
  },
];

export default function ProblemSolution() {
  return (
    <section className="w-screen h-screen overflow-hidden relative deck slide-problem">
      <header className="top">
        <SlideTitle className="heading">المشكلة والحل</SlideTitle>
        <p className="kicker english">Problem &amp; Solution</p>
      </header>
      <div className="problem-card-row" dir="rtl">
        {cards.map((card, index) => (
          <article className={`problem-card problem-card-${index + 1} ${card.kind === 'SOLUTION' ? 'is-solution' : 'is-problem'}`} key={`${card.kind}-${index}`} tabIndex={0}>
            <span className="problem-card-kind english">{card.kind}</span>
            <div className="problem-card-copy">
              <p>{card.text}</p>
              {card.extra && <p>{card.extra}</p>}
            </div>
          </article>
        ))}
      </div>
      <footer className="foot english"><span>VYORA MOVE</span><span>03 / 12</span></footer>
    </section>
  );
}
