import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ar' | 'en';
type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (text: string) => string;
  isArabic: boolean;
};
const LocaleContext = createContext<LocaleContextValue | null>(null);
const KEY = 'vyora-locale-v1';

const translations: Record<string, string> = {
  'تخطَّ إلى المحتوى': 'Skip to content',
  الرئيسية: 'Home',
  التمارين: 'Exercises',
  الخطط: 'Plans',
  'دليل الحركة': 'Movement guide',
  التقدم: 'Progress',
  المزيد: 'More',
  'موعد تدريبك في ڤايورا': 'Your VYORA workout reminder',
  'موعد تمرينك': 'Workout reminder',
  'تمرينك اليوم:': 'Today’s workout:',
  'تدريبك في بيتك.. لنسخة أقوى من نفسك.': 'Training at home, for a stronger you.',
  'مرحبًا،': 'Hello,',
  'مرحبًا بك': 'Welcome to VYORA',
  'خطوة جديدة نحو جسم أكثر نشاطًا.': 'One more step toward a more active you.',
  'تحدي اليوم': 'Today’s challenge',
  'بدون معدات': 'No equipment',
  'ابدأ الآن': 'Start now',
  'جدولك الأسبوعي': 'Your weekly schedule',
  'تمرين يناسب بيتك اليوم': 'A workout that fits your home today',
  'اختيار وقتك ومساحتك ومستوى التمرين': 'Choose your time, space, and workout level',
  'الوقت المتاح': 'Time available',
  'مستوى التمرين': 'Workout level',
  'مساحة صغيرة': 'Small space',
  'تمرين هادئ': 'Quiet workout',
  'بدون قفز': 'No jumping',
  'اختيار ڤايورا لك اليوم': 'VYORA’s pick for today',
  'ابدأ الجلسة': 'Start workout',
  'لا توجد خطة مناسبة لهذه الاختيارات': 'No plan matches these choices',
  'يمكنك اختيار 10 دقائق أو إلغاء وضع المساحة الصغيرة.':
    'You can choose 10 minutes or turn off small-space mode.',
  'إعادة ضبط الاختيارات': 'Reset choices',
  حتى: 'Up to',
  دقيقة: 'min',
  'أيام تدريب': 'training days',
  مبتدئ: 'Beginner',
  متوسط: 'Intermediate',
  'حدّد أيامك ومستواك لاقتراح خطة مناسبة.':
    'Choose your days and level to get a plan recommendation.',
  تعديل: 'Edit',
  'إعداد الجدول': 'Set up schedule',
  'أيام جدول التدريب': 'Workout schedule days',
  'يوم تدريب': 'Training day',
  راحة: 'Rest',
  'تمرين اليوم': 'Today’s workout',
  حوالي: 'About',
  'موعدك القادم غدًا.': 'Your next workout is tomorrow.',
  'اليوم راحة حسب جدولك. خذ وقتك واستأنف في يوم التدريب القادم.':
    'Today is a rest day. Take your time and pick it up on your next training day.',
  'جلسات مكتملة هذا الأسبوع': 'Completed sessions this week',
  'لا توجد جلسات مكتملة هذا الأسبوع حتى الآن. أكمل جلسة قصيرة لبدء سجل نشاطك.':
    'No sessions have been completed this week. Complete a short workout to start your activity history.',
  'تمارينك اليومية': 'Daily exercises',
  'عرض الكل': 'View all',
  ث: 'sec',
  'خطط مقترحة': 'Suggested plans',
  'كل الخطط': 'All plans',
  المكتبة: 'Exercise library',
  'ابحث عن تمرين': 'Search exercises',
  'ابحث عن تمرين...': 'Search exercises…',
  التصنيف: 'Category',
  الكل: 'All',
  'كل المستويات': 'All levels',
  المستوى: 'Level',
  تمرين: 'exercise',
  'أقسام التمارين': 'Exercise categories',
  'كل التمارين': 'All exercises',
  'لا توجد نتائج مطابقة': 'No matching results',
  'غيّر عبارة البحث أو أزل بعض عوامل التصفية لعرض تمارين أخرى.':
    'Change the search term or remove filters to see more exercises.',
  'إعادة ضبط الفلاتر': 'Reset filters',
  'لم نجد هذا التمرين': 'Exercise not found',
  'هذا الرابط قديم. تصفّح المكتبة لاختيار تمرين آخر.':
    'This link may be outdated. Browse the library to choose another exercise.',
  'إلى المكتبة': 'Go to library',
  رجوع: 'Back',
  'خطوات الأداء الصحيح': 'How to do it',
  المجموعات: 'Sets',
  مجموعات: 'sets',
  المدة: 'Duration',
  ثانية: 'seconds',
  التكرارات: 'Reps',
  'ملاحظة أمان': 'Safety note',
  'نسخة أسهل': 'Easier option',
  'ابدأ التمرين': 'Start exercise',
  'خطط التدريب': 'Workout plans',
  'حتى 15 دقيقة': 'Up to 15 min',
  أطول: 'Longer',
  'لا توجد خطط مطابقة لهذا الاختيار.': 'No plans match this selection.',
  'استخدم خيار «الكل» لعرض جميع الخطط.': 'Choose “All” to view every plan.',
  'الخطط عامة للتمرين المنزلي ولا تغني عن استشارة مختص إذا كانت لديك حالة صحية.':
    'Plans are general home workouts and do not replace professional advice if you have a health condition.',
  'الخطة غير موجودة': 'Plan not found',
  'يرجى اختيار خطة من القائمة.': 'Select a plan from the list.',
  الدقائق: 'Minutes',
  'الوقت الدقيق': 'Estimated time',
  'تمارين الخطة': 'Exercises in this plan',
  جولات: 'rounds',
  'قبل أن تبدأ': 'Before you begin',
  'مساحة صغيرة وأرضية ثابتة': 'A small space and stable floor',
  'ماء قريب وحذاء مريح': 'Keep water nearby and wear comfortable shoes',
  'توقف فورًا عند أي ألم حاد': 'Stop immediately if you feel sharp pain',
  'ابدأ الخطة': 'Start plan',
  'لم نجد هذه الجلسة': 'Session not found',
  'هذا الرابط غير صالح. يرجى اختيار خطة أو تمرين للبدء.':
    'This link is invalid. Select a plan or exercise to get started.',
  'اختر خطة': 'Choose a plan',
  'أحسنت، جلسة مكتملة': 'Well done — session complete',
  'انتهت الجلسة': 'Session ended',
  'حُفظت جلستك على جهازك.': 'Your session was saved on this device.',
  'لم تُسجَّل جلسة لأنها لم تبدأ.': 'No session was recorded because it never started.',
  'مدة التمرين': 'Workout duration',
  'تمارين مكتملة': 'Exercises completed',
  'عرض تقدمك': 'View your progress',
  خروج: 'Exit',
  استراحة: 'Rest',
  'التالي:': 'Next:',
  'تكرارات تقريبًا': 'reps approx.',
  'تمرين بالوقت': 'Timed exercise',
  الجولة: 'Round',
  من: 'of',
  'خذ نفسًا عميقًا واستعد.': 'Take a deep breath and get ready.',
  'إيقاف مؤقت': 'Pause',
  استئناف: 'Resume',
  ابدأ: 'Start',
  'إعادة الجولة': 'Restart round',
  إنهاء: 'Finish',
  التالي: 'Next',
  'الخروج من الجلسة؟': 'Leave this session?',
  'الجلسة متوقفة مؤقتًا. إذا خرجت الآن لن تُحفظ، أو يمكنك إنهاءها وحفظ ما أنجزته.':
    'Your session is paused. Leaving now will discard it, or you can finish and save your progress.',
  'خروج بدون حفظ': 'Leave without saving',
  'التقدم الأسبوعي': 'Weekly progress',
  'جلسات هذا الأسبوع': 'Sessions this week',
  هدفك: 'Your goal is',
  'جلسات. يمكنك تعديله من المزيد.': 'sessions. You can change it under More.',
  'إجمالي الجلسات': 'Total sessions',
  'إجمالي الوقت': 'Total time',
  'آخر التمارين المكتملة': 'Recent completed workouts',
  'سجلك يبدأ بجلسة': 'Your history starts with one session',
  'لا توجد جلسات محفوظة حتى الآن. أكمل جلسة قصيرة لعرض إحصاءات تقدمك هنا.':
    'No workouts saved yet. Complete a short session to see your progress here.',
  الإعدادات: 'Settings',
  'يرجى تحديد أيام التدريب ومستوى اللياقة والمدة القصوى للجلسة.':
    'Select your training days, fitness level, and maximum session length.',
  'غير محدد': 'Not set',
  'أيام التمرين': 'Workout days',
  'مستواك الحالي': 'Your current level',
  'الوقت الأقصى للجلسة': 'Maximum session length',
  'يتناوب جدولك بين:': 'Your schedule alternates between:',
  'خطة يومك:': 'Your plan for the day:',
  نحو: 'about',
  'تذكير في يوم التدريب': 'Reminder on training days',
  'تعمل التذكيرات فقط أثناء فتح التطبيق.': 'Reminders work only while the app is open.',
  'تذكير التدريب': 'Workout reminder',
  'وقت التذكير': 'Reminder time',
  'التنبيه طالما ڤايورا مفتوح في المتصفح': 'Reminder works while VYORA is open in your browser.',
  'الجدول لا يغيّر بيانات تقدمك، ويمكنك تعديل اختياراتك في أي وقت.':
    'Your schedule does not change your progress data, and you can edit your choices at any time.',
  'الراحة بين الجولات': 'Rest between rounds',
  'هدف الجلسات الأسبوعي': 'Weekly session goal',
  'تُحفظ الإعدادات تلقائيًا على جهازك.': 'Settings are saved automatically on your device.',
  'عن ڤايورا': 'About VYORA',
  'ڤايورا تطبيق للتدريب المنزلي يركز على التقدم التدريجي دون معدات. يضم تمارين بوزن الجسم وخططًا قصيرة ومؤقتًا مدمجًا للجلسات. لا يتطلب إنشاء حساب ولا يعرض إعلانات.':
    'VYORA is a home-workout app focused on steady progress without equipment. It offers bodyweight exercises, short plans, and a built-in workout timer. No account is required, and the app contains no ads.',
  الخصوصية: 'Privacy',
  البيانات: 'Data',
  'مسح كل البيانات': 'Delete all data',
  'الاستمرارية تدعم التقدم': 'Consistency supports progress',
  'كل تدريب خطوة نحو هدفك.': 'Each workout is a step toward your goal.',
  'مسح كل البيانات؟': 'Delete all data?',
  'نعم، امسح': 'Yes, delete',
  إلغاء: 'Cancel',
  'Page not found': 'Page not found',
  'The page you are looking for does not exist.': 'The page you are looking for does not exist.',
  'إزالة من المفضلة': 'Remove from favorites',
  'حفظ في المفضلة': 'Save to favorites',
  محفوظ: 'Saved',
  'الجسم بالكامل': 'Full body',
  'حركات مركبة لكل الجسم': 'Compound movements for the whole body',
  'الجزء العلوي': 'Upper body',
  'صدر، كتفان وذراعان': 'Chest, shoulders, and arms',
  'الجزء السفلي': 'Lower body',
  'أرجل ومؤخرة': 'Legs and glutes',
  البطن: 'Core',
  'ثبات وتحكم في الجذع': 'Core stability and control',
  الإحماء: 'Warm-up',
  'جهّز جسمك قبل البدء': 'Get your body ready to move',
  التمدد: 'Stretching',
  'ختام هادئ للعضلات': 'A gentle finish for your muscles',
  'حركات متنوعة وسهلة في البيت مع المدربة الرياضية فرح بكار.':
    'Easy varied movements at home with fitness trainer Farah Bakkar.',
};

export function translate(text: string, locale: Locale): string {
  if (locale === 'ar') return text;
  return translations[text] ?? text;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      return localStorage.getItem(KEY) === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage may be unavailable */
    }
  };
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = locale === 'ar' ? 'VYORA | ڤايورا — تدريبك في بيتك' : 'VYORA | Home workouts';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        locale === 'ar'
          ? 'ڤايورا VYORA: مدرّب منزلي بالعربية. تمارين بوزن الجسم بدون معدات، خطط قصيرة، ومتابعة تقدمك محليًا على جهازك. MOVE BEYOND LIMITS.'
          : 'VYORA: your home workout companion. Bodyweight exercises, short plans, and private progress tracking on your device. MOVE BEYOND LIMITS.';
  }, [locale]);
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (text: string) => translate(text, locale),
      isArabic: locale === 'ar',
    }),
    [locale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used within LocaleProvider');
  return value;
}
