import { useMemo } from 'react';
import { Apple, ArrowUpRight, CheckCircle2, Leaf, Sparkles, Utensils } from 'lucide-react';
import { useLocale } from '@/lib/locale';
import { useVYORAProfile } from '@/lib/profile-context';

type Meal = { name: string; detail: string };
type DayMenu = { day: string; meals: [Meal, Meal, Meal]; note: string };

const menus: Record<string, { intro: string; meals: Array<[string, string, string]>; notes: string[] }> = {
  'lose-weight': {
    intro: 'Build satisfying plates with plenty of plants, a protein source, and foods you genuinely enjoy.',
    meals: [
      ['Oats, berries & yogurt', 'Lentil and roasted vegetable bowl', 'Baked fish, potatoes & greens'],
      ['Eggs with whole-grain toast', 'Chickpea salad with herbs', 'Chicken, brown rice & vegetables'],
      ['Yogurt, fruit & seeds', 'Bean soup with a side salad', 'Tofu stir-fry with vegetables'],
      ['Banana oats with nut butter', 'Tuna and white bean toast', 'Vegetable omelette & salad'],
      ['Cottage cheese, fruit & oats', 'Turkey or hummus wrap', 'Lentil pasta with tomato sauce'],
      ['Whole-grain toast with eggs', 'Quinoa, greens & chickpeas', 'Simple homemade tacos with beans'],
      ['Fruit yogurt bowl', 'Leftover grain bowl with vegetables', 'Roasted vegetables, beans & yogurt dip'],
    ],
    notes: [
      'Add vegetables or fruit for color and variety.',
      'Choose water regularly through the day.',
      'Eat at a comfortable pace and notice fullness cues.',
      'Keep an easy snack available instead of skipping meals.',
      'There is no need to remove an entire food group.',
      'Pair steady eating habits with movement you enjoy.',
      'Plan practical meals around your schedule and budget.',
    ],
  },
  'build-muscle': {
    intro: 'Support training with regular meals that include protein, nourishing carbohydrates, and enough variety.',
    meals: [
      ['Greek yogurt, oats & fruit', 'Chicken, rice & roasted vegetables', 'Bean chili with baked potato'],
      ['Egg and avocado toast', 'Salmon, couscous & greens', 'Tofu noodles with vegetables'],
      ['Milk or soy smoothie with oats', 'Lentil bowl with whole grains', 'Turkey or bean pasta'],
      ['Oat pancakes with yogurt', 'Tuna, potatoes & salad', 'Chickpea curry with rice'],
      ['Cottage cheese and fruit', 'Egg salad whole-grain sandwich', 'Tempeh, quinoa & vegetables'],
      ['Overnight oats with seeds', 'Chicken or tofu grain bowl', 'Bean burrito with vegetables'],
      ['Yogurt, granola & banana', 'Hummus plate with pita and eggs', 'Fish or lentils with potatoes'],
    ],
    notes: [
      'Include a protein-rich food at meals when it suits you.',
      'Carbohydrate foods can help fuel active days.',
      'Recovery and sleep are part of building strength.',
      'Choose familiar foods that fit your budget.',
      'Supplements are not required for a balanced food plan.',
      'Drink to thirst and keep water nearby during movement.',
      'A repeatable routine is more useful than sudden changes.',
    ],
  },
  fitness: {
    intro: 'Keep everyday energy in mind: balanced meals, flexible choices, and enough fluids across the day.',
    meals: [
      ['Yogurt, oats & seasonal fruit', 'Grain bowl with eggs and greens', 'Bean stew with whole-grain bread'],
      ['Peanut butter toast & pear', 'Chicken or tofu salad wrap', 'Salmon, rice & broccoli'],
      ['Eggs, tomatoes & toast', 'Lentil soup with pita', 'Vegetable stir-fry with noodles'],
      ['Smoothie with yogurt and oats', 'Chickpea quinoa bowl', 'Baked potato with beans and salad'],
      ['Cereal, milk & berries', 'Tuna or white bean sandwich', 'Tofu curry with rice'],
      ['Banana and yogurt', 'Roasted vegetable couscous', 'Homemade flatbread with vegetables'],
      ['Toast, eggs & fruit', 'Leftover soup and grain bread', 'Chicken or lentil tray bake'],
    ],
    notes: [
      'A mix of food groups can make meals more satisfying.',
      'Keep a water bottle nearby during the day.',
      'Choose a pre-workout meal that suits your timing and comfort.',
      'Simple, accessible foods are enough for a good start.',
      'Try to eat at regular times.',
      'Balance activity with recovery through the week.',
      'Prepare a few ingredients ahead for busy days.',
    ],
  },
  'gain-weight': {
    intro: 'Choose regular, nourishing meals and snacks; add satisfying foods that fit your appetite and routine.',
    meals: [
      ['Oats with milk, banana & nut butter', 'Salmon, rice & avocado', 'Bean and cheese baked potato'],
      ['Eggs, toast & yogurt', 'Chicken pesto pasta with vegetables', 'Lentil curry with coconut milk'],
      ['Fruit smoothie with yogurt & oats', 'Hummus, pita, eggs & salad', 'Tofu noodles with sesame'],
      ['Granola, whole milk yogurt & fruit', 'Turkey or chickpea sandwich', 'Beef or bean chili with rice'],
      ['Toast with nut butter & banana', 'Quinoa bowl with feta and beans', 'Creamy tomato lentil pasta'],
      ['Overnight oats with seeds', 'Tuna melt or bean toast', 'Chicken or tofu with potatoes'],
      ['Pancakes with yogurt & fruit', 'Avocado, egg & grain bowl', 'Chickpea stew with flatbread'],
    ],
    notes: [
      'A nourishing snack between meals may feel easier than a larger meal.',
      'Include energy-rich foods such as nuts, seeds, dairy, or alternatives.',
      'Pair protein with carbohydrates in a meal.',
      'Choose additions that fit allergies and food preferences.',
      'A nourishing drink can be an option when appetite is low.',
      'Strength training works best with enough recovery.',
      'Seek professional advice if weight loss is unintentional.',
    ],
  },
};
const weekdays = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};

const arabicMealMap: Record<string, string> = {
  'Oats, berries & yogurt': 'شوفان مع التوت والزبادي',
  'Lentil and roasted vegetable bowl': 'عدس وخضار مشوية في طبق',
  'Baked fish, potatoes & greens': 'سمك مخبوز وبطاطس وخضار ورقية',
  'Eggs with whole-grain toast': 'بيض مع خبز حبوب كاملة',
  'Chickpea salad with herbs': 'سلطة حمص بالأعشاب',
  'Chicken, brown rice & vegetables': 'دجاج وأرز بني وخضار',
  'Yogurt, fruit & seeds': 'زبادي وفاكهة وبذور',
  'Bean soup with a side salad': 'حساء فاصوليا مع سلطة جانبية',
  'Tofu stir-fry with vegetables': 'توفو مقلي سريعًا مع الخضار',
  'Banana oats with nut butter': 'شوفان بالموز وزبدة المكسرات',
  'Tuna and white bean toast': 'خبز محمص بالتونة والفاصوليا البيضاء',
  'Vegetable omelette & salad': 'عجة خضار مع سلطة',
  'Cottage cheese, fruit & oats': 'جبن قريش وفاكهة وشوفان',
  'Turkey or hummus wrap': 'لفافة ديك رومي أو حمص',
  'Lentil pasta with tomato sauce': 'معكرونة العدس بصلصة الطماطم',
  'Whole-grain toast with eggs': 'خبز حبوب كاملة مع البيض',
  'Quinoa, greens & chickpeas': 'كينوا وخضار ورقية وحمص',
  'Simple homemade tacos with beans': 'تاكو منزلي بسيط مع الفاصوليا',
  'Fruit yogurt bowl': 'وعاء زبادي وفاكهة',
  'Leftover grain bowl with vegetables': 'طبق حبوب وخضار من بقايا الطعام',
  'Roasted vegetables, beans & yogurt dip': 'خضار مشوية وفاصوليا وصلصة زبادي',
  'Greek yogurt, oats & fruit': 'زبادي يوناني وشوفان وفاكهة',
  'Chicken, rice & roasted vegetables': 'دجاج وأرز وخضار مشوية',
  'Bean chili with baked potato': 'فاصوليا متبلة مع بطاطس مخبوزة',
  'Egg and avocado toast': 'خبز محمص بالبيض والأفوكادو',
  'Salmon, couscous & greens': 'سلمون وكسكس وخضار ورقية',
  'Tofu noodles with vegetables': 'نودلز بالتوفو والخضار',
  'Milk or soy smoothie with oats': 'سموذي بالحليب أو حليب الصويا والشوفان',
  'Lentil bowl with whole grains': 'عدس مع حبوب كاملة',
  'Turkey or bean pasta': 'معكرونة بالديك الرومي أو الفاصوليا',
  'Oat pancakes with yogurt': 'فطائر الشوفان مع الزبادي',
  'Tuna, potatoes & salad': 'تونة وبطاطس وسلطة',
  'Chickpea curry with rice': 'كاري الحمص مع الأرز',
  'Cottage cheese and fruit': 'جبن قريش وفاكهة',
  'Egg salad whole-grain sandwich': 'شطيرة سلطة البيض بخبز الحبوب الكاملة',
  'Tempeh, quinoa & vegetables': 'تمبيه وكينوا وخضار',
  'Overnight oats with seeds': 'شوفان منقوع طوال الليل مع البذور',
  'Chicken or tofu grain bowl': 'طبق حبوب بالدجاج أو التوفو',
  'Bean burrito with vegetables': 'بوريتو الفاصوليا والخضار',
  'Yogurt, granola & banana': 'زبادي وجرانولا وموز',
  'Hummus plate with pita and eggs': 'طبق حمص مع خبز بيتا وبيض',
  'Fish or lentils with potatoes': 'سمك أو عدس مع البطاطس',
  'Yogurt, oats & seasonal fruit': 'زبادي وشوفان وفاكهة الموسم',
  'Grain bowl with eggs and greens': 'طبق حبوب بالبيض والخضار الورقية',
  'Bean stew with whole-grain bread': 'يخنة فاصوليا مع خبز حبوب كاملة',
  'Peanut butter toast & pear': 'خبز محمص بزبدة الفول السوداني وكمثرى',
  'Chicken or tofu salad wrap': 'لفافة سلطة بالدجاج أو التوفو',
  'Salmon, rice & broccoli': 'سلمون وأرز وبروكلي',
  'Eggs, tomatoes & toast': 'بيض وطماطم وخبز محمص',
  'Lentil soup with pita': 'حساء عدس مع خبز بيتا',
  'Vegetable stir-fry with noodles': 'خضار مقلية سريعًا مع النودلز',
  'Smoothie with yogurt and oats': 'سموذي بالزبادي والشوفان',
  'Chickpea quinoa bowl': 'طبق كينوا بالحمص',
  'Baked potato with beans and salad': 'بطاطس مخبوزة بالفاصوليا والسلطة',
  'Cereal, milk & berries': 'حبوب إفطار وحليب وتوت',
  'Tuna or white bean sandwich': 'شطيرة تونة أو فاصوليا بيضاء',
  'Tofu curry with rice': 'كاري التوفو مع الأرز',
  'Chicken or lentil tray bake': 'دجاج أو عدس مخبوز مع الخضار',
  'Oats with milk, banana & nut butter': 'شوفان بالحليب والموز وزبدة المكسرات',
  'Salmon, rice & avocado': 'سلمون وأرز وأفوكادو',
  'Bean and cheese baked potato': 'بطاطس مخبوزة بالفاصوليا والجبن',
  'Eggs, toast & yogurt': 'بيض وخبز محمص وزبادي',
  'Chicken pesto pasta with vegetables': 'معكرونة دجاج بصلصة البيستو والخضار',
  'Lentil curry with coconut milk': 'كاري العدس بحليب جوز الهند',
  'Fruit smoothie with yogurt & oats': 'سموذي فاكهة بالزبادي والشوفان',
  'Hummus, pita, eggs & salad': 'حمص وخبز بيتا وبيض وسلطة',
  'Tofu noodles with sesame': 'نودلز بالتوفو والسمسم',
  'Granola, whole milk yogurt & fruit': 'جرانولا وزبادي كامل الدسم وفاكهة',
  'Turkey or chickpea sandwich': 'شطيرة ديك رومي أو حمص',
  'Beef or bean chili with rice': 'لحم أو فاصوليا متبلة مع الأرز',
  'Toast with nut butter & banana': 'خبز محمص بزبدة المكسرات والموز',
  'Tuna melt or bean toast': 'خبز بالتونة والجبن أو الفاصوليا',
  'Chicken or tofu with potatoes': 'دجاج أو توفو مع البطاطس',
  'Pancakes with yogurt & fruit': 'فطائر مع الزبادي والفاكهة',
  'Avocado, egg & grain bowl': 'طبق حبوب بالأفوكادو والبيض',
  'Chickpea stew with flatbread': 'يخنة حمص مع خبز مسطح',
};

const arIntros: Record<string, string> = {
  'lose-weight': 'وجبات مشبعة ومتنوعة تضم الخضار ومصدرًا للبروتين وأطعمة مفضلة.',
  'build-muscle': 'وجبات منتظمة تجمع البروتين والكربوهيدرات المغذية والتنوع.',
  fitness: 'خيارات مرنة ووجبات متوازنة وماء كافٍ لدعم النشاط اليومي.',
  'gain-weight': 'وجبات منتظمة ومغذية مع وجبات خفيفة تناسب الشهية والروتين.',
};
const arNotes: Record<string, string[]> = {
  'lose-weight': ['إضافة الخضار أو الفاكهة تمنح الوجبات تنوعًا.', 'الماء خيار مناسب للشرب بانتظام خلال اليوم.', 'تناول الطعام بهدوء يساعد على ملاحظة الشبع.', 'وجود وجبة خفيفة سهلة أفضل من تخطي الوجبات.', 'لا حاجة إلى حذف مجموعة غذائية كاملة.', 'اختيار حركة ممتعة يدعم العادات المتوازنة.', 'تخطيط الوجبات يراعي الوقت والميزانية.'],
  'build-muscle': ['وجود مصدر بروتين في الوجبات يدعم تنوع الطعام.', 'الكربوهيدرات تساعد على توفير الطاقة في الأيام النشطة.', 'التعافي والنوم جزء من بناء القوة.', 'اختيار أطعمة مألوفة يجعل الالتزام أسهل.', 'المكملات ليست شرطًا لخطة غذائية متوازنة.', 'وجود الماء قريبًا أثناء الحركة خيار عملي.', 'الروتين القابل للاستمرار أفضل من التغيير المفاجئ.'],
  fitness: ['تنوع المجموعات الغذائية يجعل الوجبات أكثر توازنًا.', 'زجاجة الماء القريبة تذكير عملي خلال اليوم.', 'اختيار وجبة قبل التمرين يعتمد على الوقت والراحة.', 'الأطعمة البسيطة والمتاحة بداية جيدة.', 'انتظام مواعيد الطعام قد يساعد على تنظيم اليوم.', 'التوازن يشمل النشاط والراحة خلال الأسبوع.', 'تجهيز بعض المكونات يسهّل الأيام المزدحمة.'],
  'gain-weight': ['وجبة خفيفة مغذية قد تكون أسهل من تكبير الوجبة.', 'المكسرات والبذور والألبان وبدائلها خيارات غنية بالطاقة.', 'الجمع بين البروتين والنشويات ينوّع الوجبة.', 'اختيار الأطعمة يراعي الحساسية والتفضيلات.', 'المشروب المغذي خيار إضافي عند قلة الشهية.', 'تمارين القوة تحتاج إلى وقت كافٍ للتعافي.', 'يُفضّل طلب رأي مختص عند فقدان الوزن دون قصد.'],
};

export default function NutritionPage() {
  const { isArabic } = useLocale();
  const profile = useVYORAProfile();
  const goal = profile?.goal ?? 'fitness';
  const content = menus[goal];
  const menu = useMemo<DayMenu[]>(() => content.meals.map((meals, index) => ({
    day: weekdays[isArabic ? 'ar' : 'en'][index],
    meals: meals.map((name) => ({ name: isArabic ? (arabicMealMap[name] ?? name) : name, detail: '' })) as [Meal, Meal, Meal],
    note: isArabic ? (arNotes[goal]?.[index] ?? '') : (content.notes[index] ?? ''),
  })), [content.meals, content.notes, goal, isArabic]);
  const intro = isArabic ? arIntros[goal] : content.intro;
  const tips = isArabic ? arNotes[goal] : content.notes;
  const labels = isArabic ? ['إفطار', 'غداء', 'عشاء'] : ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <section className="page-enter mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-10">
        <div className="absolute -end-8 -top-14 h-56 w-56 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <p className="relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-primary"><Utensils size={15} /> VYORA / NOURISH</p>
        <h1 className="relative mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{isArabic ? 'أفكار طعام لأسبوع متوازن' : 'A week of feel-good food ideas'}</h1>
        <p className="relative mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{intro}</p>
        <div className="relative mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">{isArabic ? 'مناسب لهدفك' : 'Matched to your goal'}</span>
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">{isArabic ? 'إرشادات عامة وغير طبية' : 'General, non-medical guidance'}</span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-4" aria-label={isArabic ? 'أفكار الوجبات اليومية' : 'Daily meal ideas'}>
          {menu.map((entry, index) => (
            <article key={entry.day} className="card-dark overflow-hidden p-5 sm:p-6" data-testid={`card-meal-day-${index}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary"><span className="num text-sm font-bold">{String(index + 1).padStart(2, '0')}</span></span>
                  <h2 className="text-lg font-bold">{entry.day}</h2>
                </div>
                <span className="text-xs text-muted-foreground">{isArabic ? 'أفكار مرنة' : 'Flexible ideas'}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {entry.meals.map((meal, mealIndex) => (
                  <div key={labels[mealIndex]} className="rounded-2xl bg-muted/55 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[.13em] text-primary">{labels[mealIndex]}</p>
                    <p className="mt-2 text-sm font-semibold leading-6">{meal.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-xl bg-primary/5 px-4 py-3 text-xs leading-6 text-muted-foreground" data-testid={`text-meal-tip-${index}`}>
                <span className="font-bold text-primary">{isArabic ? 'نصيحة اليوم: ' : 'Daily tip: '}</span>
                {entry.note}
              </p>
            </article>
          ))}
        </section>

        <aside className="space-y-5">
          <section className="card-dark p-5 sm:p-6">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><Leaf size={20} /></span>
            <h2 className="mt-4 text-xl font-bold">{isArabic ? 'بوصلة بسيطة' : 'A few steady anchors'}</h2>
            <div className="mt-4 space-y-4">
              {tips.map((tip, index) => (
                <p key={tip} className="flex gap-3 text-sm leading-6 text-muted-foreground" data-testid={`text-nutrition-tip-${index}`}>
                  <CheckCircle2 size={17} className="mt-1 shrink-0 text-primary" /> {tip}
                </p>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <Sparkles size={18} className="text-primary" />
            <h2 className="mt-3 font-bold">{isArabic ? 'مساحة للاختيار' : 'Make it your own'}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{isArabic ? 'هذه اقتراحات وليست قواعد. بدّلي المكونات بما تحبينه وما يتوفر لديك.' : 'These are ideas, not rules. Swap ingredients for what you enjoy and have on hand.'}</p>
            <p className="mt-3 border-t border-primary/15 pt-3 text-xs leading-5 text-muted-foreground">{isArabic ? 'للاحتياجات الغذائية الفردية، يُفضّل الرجوع إلى مختص مؤهل.' : 'For individual dietary needs, speak with a qualified professional.'}</p>
          </section>
          <div className="flex items-center gap-2 px-2 text-xs leading-5 text-muted-foreground">
            <Apple size={15} className="shrink-0 text-primary" />
            {isArabic ? 'التوازن يتكوّن من العادات الصغيرة المتكررة.' : 'Balance is built from small, repeatable choices.'}
            <ArrowUpRight size={14} className="shrink-0" />
          </div>
        </aside>
      </div>
    </section>
  );
}
