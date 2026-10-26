import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ar' | 'en';
type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (text: string) => string; isArabic: boolean };
const LocaleContext = createContext<LocaleContextValue | null>(null);
const KEY = 'vyora-locale-v1';

const translations: Record<string, string> = {
  'تخطَّ إلى المحتوى': 'Skip to content', 'الرئيسية': 'Home', 'التمارين': 'Exercises', 'الخطط': 'Plans', 'الفيديو': 'Videos', 'التقدم': 'Progress', 'المزيد': 'More',
  'موعد تدريبك في ڤايورا': 'Your VYORA workout reminder', 'موعد تمرينك': 'Workout reminder', 'تمرينك اليوم:': 'Today’s workout:',
  'تدريبك في بيتك.. لنسخة أقوى من نفسك.': 'Training at home, for a stronger you.',
  'مرحبًا،': 'Hello,', 'مرحبًا بك': 'Welcome to VYORA', 'خطوة جديدة نحو جسم أكثر نشاطًا.': 'One more step toward a more active you.',
  'تحدي اليوم': 'Today’s challenge', 'بدون معدات': 'No equipment', 'ابدأ الآن': 'Start now', 'جدولك الأسبوعي': 'Your weekly schedule',
  'تمرين يناسب بيتك اليوم': 'A workout that fits your home today', 'اختيار وقتك ومساحتك ومستوى التمرين': 'Choose your time, space, and workout level',
  'الوقت المتاح': 'Time available', 'مستوى التمرين': 'Workout level', 'مساحة صغيرة': 'Small space',
  'تمرين هادي': 'Quiet workout', 'بدون قفز': 'No jumping', 'اختيار ڤايورا لك اليوم': 'VYORA’s pick for today',
  'ابدأ الجلسة': 'Start workout', 'لا توجد خطة مناسبة لهذه الاختيارات': 'No plan matches these choices',
  'يمكنك اختيار 10 دقائق أو إلغاء وضع المساحة الصغيرة.': 'You can choose 10 minutes or turn off small-space mode.',
  'إعادة ضبط الاختيارات': 'Reset choices', 'حتى': 'Up to', 'دقيقة': 'min',
  'أيام تدريب': 'training days', 'مبتدئ': 'Beginner', 'متوسط': 'Intermediate', 'حدّد أيامك ومستواك لاقتراح خطة مناسبة.': 'Choose your days and level to get a plan recommendation.',
  'تعديل': 'Edit', 'إعداد الجدول': 'Set up schedule', 'أيام جدول التدريب': 'Workout schedule days', 'يوم تدريب': 'Training day', 'راحة': 'Rest',
  'تمرين اليوم': 'Today’s workout', 'حوالي': 'About', 'موعدك القادم غدًا.': 'Your next workout is tomorrow.', 'اليوم راحة حسب جدولك. خذ وقتك واستأنف في يوم التدريب القادم.': 'Today is a rest day. Take your time and pick it up on your next training day.',
  'جلسات مكتملة هذا الأسبوع': 'Completed sessions this week', 'لا جلسات هذا الأسبوع بعد. أول جلسة قصيرة تبدأ المشوار.': 'No sessions this week yet. A short first session is a great start.',
  'تمارينك اليومية': 'Daily exercises', 'عرض الكل': 'View all', 'ث': 'sec', 'تمارين بالفيديو': 'Video workouts',
  'مدربات ومدربون وخيارات تناسب كل مستوى': 'Trainers and options for every level', 'خطط مقترحة': 'Suggested plans', 'كل الخطط': 'All plans',
  'المكتبة': 'Exercise library', 'ابحث عن تمرين': 'Search exercises', 'ابحث عن تمرين...': 'Search exercises…', 'التصنيف': 'Category',
  'الكل': 'All', 'كل المستويات': 'All levels', 'المستوى': 'Level', 'تمرين': 'exercise', 'أقسام التمارين': 'Exercise categories',
  'كل التمارين': 'All exercises', 'لا نتائج مطابقة': 'No matching results', 'جرّب كلمة أخرى أو خفّف الفلاتر لتظهر لك تمارين أكثر.': 'Try another search or remove a filter to see more exercises.',
  'إعادة ضبط الفلاتر': 'Reset filters', 'لم نجد هذا التمرين': 'Exercise not found', 'الرابط قد يكون قديمًا. تصفّح المكتبة واختر تمرينًا آخر.': 'This link may be outdated. Browse the library and choose another exercise.',
  'إلى المكتبة': 'Go to library', 'رجوع': 'Back', 'خطوات الأداء الصحيح': 'How to do it', 'المجموعات': 'Sets', 'مجموعات': 'sets',
  'المدة': 'Duration', 'ثانية': 'seconds', 'التكرارات': 'Reps', 'ملاحظة أمان': 'Safety note', 'نسخة أسهل': 'Easier option',
  'شاهدِي تطبيق التمارين بالفيديو': 'See the exercises in video', 'فيديوهات مع مدربات ومدربين تناسب الجميع': 'Videos with trainers, for everyone', 'ابدأ التمرين': 'Start exercise',
  'خطط التدريب': 'Workout plans', 'حتى 15 دقيقة': 'Up to 15 min', 'أطول': 'Longer', 'لا خطط بهذا الفلتر': 'No plans in this filter',
  'اعرض كل الخطط للاختيار.': 'Show all plans to choose from.', 'الخطط عامة للتمرين المنزلي ولا تغني عن استشارة مختص إذا كانت لديك حالة صحية.': 'Plans are general home workouts and do not replace professional advice if you have a health condition.',
  'الخطة غير موجودة': 'Plan not found', 'اختر خطة من القائمة.': 'Choose a plan from the list.', 'الدقائق': 'Minutes',
  'الوقت الدقيق': 'Estimated time', 'تمارين الخطة': 'Exercises in this plan', 'جولات': 'rounds', 'قبل أن تبدأ': 'Before you begin',
  'مساحة صغيرة وأرضية ثابتة': 'A small space and stable floor', 'ماء قريب وحذاء مريح': 'Keep water nearby and wear comfortable shoes', 'توقف فورًا عند أي ألم حاد': 'Stop immediately if you feel sharp pain', 'ابدأ الخطة': 'Start plan',
  'لم نجد هذه الجلسة': 'Session not found', 'الرابط غير صالح. اختر خطة أو تمرينًا للبدء.': 'This link is invalid. Choose a plan or exercise to get started.', 'اختر خطة': 'Choose a plan',
  'أحسنت، جلسة مكتملة': 'Well done — session complete', 'انتهت الجلسة': 'Session ended', 'حُفظت جلستك على جهازك.': 'Your session was saved on this device.', 'لم تُسجَّل جلسة لأنها لم تبدأ.': 'No session was recorded because it never started.',
  'مدة التمرين': 'Workout duration', 'تمارين مكتملة': 'Exercises completed', 'عرض تقدمك': 'View your progress', 'خروج': 'Exit',
  'استراحة': 'Rest', 'التالي:': 'Next:', 'تكرارات تقريبًا': 'reps approx.', 'تمرين بالوقت': 'Timed exercise', 'الجولة': 'Round', 'من': 'of',
  'خذ نفسًا عميقًا واستعد.': 'Take a deep breath and get ready.', 'إيقاف مؤقت': 'Pause', 'استئناف': 'Resume', 'ابدأ': 'Start',
  'إعادة الجولة': 'Restart round', 'إنهاء': 'Finish', 'التالي': 'Next', 'الخروج من الجلسة؟': 'Leave this session?',
  'الجلسة متوقفة مؤقتًا. إذا خرجت الآن لن تُحفظ، أو يمكنك إنهاءها وحفظ ما أنجزته.': 'Your session is paused. Leaving now will discard it, or you can finish and save your progress.',
  'خروج بدون حفظ': 'Leave without saving', 'التقدم الأسبوعي': 'Weekly progress', 'جلسات هذا الأسبوع': 'Sessions this week',
  'هدفك': 'Your goal is', 'جلسات. يمكنك تعديله من المزيد.': 'sessions. You can change it under More.', 'إجمالي الجلسات': 'Total sessions',
  'إجمالي الوقت': 'Total time', 'آخر التمارين المكتملة': 'Recent completed workouts', 'سجلك يبدأ بجلسة': 'Your history starts with one session',
  'لا جلسات محفوظة بعد. أكمل جلسة قصيرة وستظهر هنا بإحصاءات حقيقية.': 'No saved sessions yet. Complete a short session to see your stats here.',
  'تدريب بالفيديو': 'Video training', 'مدة الفيديو': 'Duration', 'سجل المشاهدة': 'Watch history', 'شغّل فيديو عشان يبدأ سجل المشاهدة هنا.': 'Play a video to start your watch history here.',
  'فيديوهات بشرح عربي مع مدربات ومدربين، بدون الحاجة إلى ترجمة تلقائية. الخطط والتمارين في ڤايورا متاحة للنساء والرجال؛ اختر المستوى والحركة المناسبة لك. الفلتر يحدد المدرب فقط، وليس من يمكنه أداء التمرين.': 'These videos feature Arabic instruction by women and men trainers; the clips themselves are in Arabic. VYORA plans and exercises are for women and men. Choose the level and movement that suit you. The filter selects a trainer, not who can do the exercise.',
  'اختيار المدرب': 'Choose a trainer', 'مع مدربة': 'Women trainers', 'مع مدرب': 'Men trainers', 'للجميع': 'All', 'تشغيل الفيديو': 'Play video',
  'فتح على YouTube': 'Open on YouTube', 'لا توجد فيديوهات هنا': 'No videos here', 'اختر عرض كل الفيديوهات لمشاهدة المزيد.': 'Choose all videos to see more.',
  'الفيديوهات مستضافة على YouTube وتحتاج اتصالًا بالإنترنت. اختر «تشغيل الفيديو» لإظهاره هنا، أو افتحه على YouTube. توقف عن التمرين عند الشعور بألم.': 'Videos are hosted on YouTube and require an internet connection. Choose “Play video” to watch here, or open it on YouTube. Stop exercising if you feel pain.',
  'فيديوهات عربية مع مدربات ومدربين': 'Arabic videos with women and men trainers', 'الإعدادات': 'Settings',
  'اختاري الأيام ومستوى التمرين والوقت الأقصى للجلسة.': 'Choose your days, workout level, and maximum session length.', 'غير محدد': 'Not set',
  'أيام التمرين': 'Workout days', 'مستواك الحالي': 'Your current level', 'الوقت الأقصى للجلسة': 'Maximum session length',
  'يتناوب جدولك بين:': 'Your schedule alternates between:', 'خطة يومك:': 'Your plan for the day:', 'نحو': 'about',
  'تذكير في يوم التدريب': 'Reminder on training days', 'يعمل وقت فتح التطبيق فقط.': 'Only runs while the app is open.', 'تذكير التدريب': 'Workout reminder',
  'وقت التذكير': 'Reminder time', 'التنبيه طالما ڤايورا مفتوح في المتصفح': 'Reminder works while VYORA is open in your browser.',
  'الجدول لا يغيّر بيانات تقدمك، ويمكنك تعديل اختياراتك في أي وقت.': 'Your schedule does not change your progress data, and you can edit your choices at any time.',
  'الراحة بين الجولات': 'Rest between rounds', 'هدف الجلسات الأسبوعي': 'Weekly session goal', 'تُحفظ الإعدادات تلقائيًا على جهازك.': 'Settings are saved automatically on your device.',
  'عن ڤايورا': 'About VYORA', 'ڤايورا مدرّب منزلي لمن يريد تقدمًا واقعيًا بدون معدات: تمارين بوزن الجسم، خطط قصيرة، ومؤقت يرافقك. لا حسابات ولا إعلانات.': 'VYORA is a home training companion for realistic progress without equipment: bodyweight exercises, short plans, and a timer that stays with you. No accounts, no ads.',
  'الخصوصية': 'Privacy', 'الجلسات والإعدادات وسجل مشاهدة الفيديوهات تُحفظ في متصفحك فقط ولا تُرسل إلى خادم ڤايورا. بعض صور معاينة الفيديو مستضافة على YouTube؛ وعند تشغيل فيديو يتصل التطبيق بالموقع لعرضه، وقد يستقبل الموقع بيانات الاتصال وفق سياسة الخصوصية لديه. ڤايورا محتوى عام للياقة ولا يقدّم نصيحة طبية؛ استشر مختصًا عند الحاجة.': 'Sessions, settings, and video watch history are stored only in your browser and are not sent to VYORA servers. Some video previews are hosted on YouTube; playing a video connects to YouTube, which may receive connection data under its privacy policy. VYORA provides general fitness content, not medical advice; consult a professional when needed.',
  'البيانات': 'Data', 'احذف الجلسات والإعدادات وسجل مشاهدة الفيديوهات المحفوظة على هذا الجهاز.': 'Delete sessions, settings, and video watch history saved on this device.',
  'مسح كل البيانات': 'Delete all data', 'الاستمرارية هي سر النجاح': 'Consistency is the key to progress', 'كل يوم أقرب لهدفك.': 'Every day brings you closer to your goal.',
  'مسح كل البيانات؟': 'Delete all data?', 'سيتم حذف سجل الجلسات وسجل مشاهدة الفيديوهات والإعدادات والجدول الأسبوعي نهائيًا من هذا الجهاز ولا يمكن التراجع.': 'Session history, video watch history, settings, and weekly schedule will be permanently deleted from this device. This cannot be undone.',
  'نعم، امسح': 'Yes, delete', 'تراجع': 'Cancel', 'Page not found': 'Page not found', 'The page you are looking for does not exist.': 'The page you are looking for does not exist.',
  'الجسم بالكامل': 'Full body', 'حركات مركبة لكل الجسم': 'Compound movements for the whole body', 'الجزء العلوي': 'Upper body',
  'صدر، كتفان وذراعان': 'Chest, shoulders, and arms', 'الجزء السفلي': 'Lower body', 'أرجل ومؤخرة': 'Legs and glutes',
  'البطن': 'Core', 'ثبات وتحكم في الجذع': 'Core stability and control', 'الإحماء': 'Warm-up', 'جهّز جسمك قبل البدء': 'Get your body ready to move',
  'التمدد': 'Stretching', 'ختام هادئ للعضلات': 'A gentle finish for your muscles',
  'حركات متنوعة وسهلة في البيت مع المدربة الرياضية فرح بكار.': 'Easy varied movements at home with fitness trainer Farah Bakkar.',
};

export function translate(text: string, locale: Locale): string {
  if (locale === 'ar') return text;
  return translations[text] ?? text;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'ar'; } catch { return 'ar'; }
  });
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try { localStorage.setItem(KEY, next); } catch { /* storage may be unavailable */ }
  };
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = locale === 'ar' ? 'VYORA | ڤايورا — تدريبك في بيتك' : 'VYORA | Home workouts';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = locale === 'ar'
      ? 'ڤايورا VYORA: مدرّب منزلي بالعربية. تمارين بوزن الجسم بدون معدات، خطط قصيرة، ومتابعة تقدمك محليًا على جهازك. MOVE BEYOND LIMITS.'
      : 'VYORA: your home workout companion. Bodyweight exercises, short plans, and private progress tracking on your device. MOVE BEYOND LIMITS.';
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t: (text: string) => translate(text, locale), isArabic: locale === 'ar' }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used within LocaleProvider');
  return value;
}
