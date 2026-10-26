# VYORA | ڤايورا

تطبيق ويب عربي RTL للتدريب المنزلي، يوفّر مكتبة تمارين وخططًا متدرجة ومؤقتًا فعليًا ومتابعة تقدم محفوظة على الجهاز.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/home-workout/src/lib/data.ts` — مكتبة التمارين والخطط ومحتواها.
- `artifacts/home-workout/src/lib/store.ts` — التخزين المحلي، الإعدادات، وترحيل السجل القديم.
- `artifacts/home-workout/src/pages/` — الصفحات ومسار الجلسة والمؤقت.
- `artifacts/home-workout/src/lib/videos.ts` — فهرس الفيديوهات ومصادرها والفئة الظاهرة.
- `artifacts/home-workout/src/index.css` — هوية VYORA البصرية والمتغيرات العامة.
- `artifacts/home-workout/public/images/` — الصور الرياضية المحلية المستخدمة في التطبيق.

## Architecture decisions

- النسخة الأولى تعمل بالكامل دون خادم أو حساب مستخدم؛ الجلسات والإعدادات تُحفظ في `localStorage`.
- مدة كل خطة مشتقة من الجولات ومدد التمارين وفترات الراحة بدل عرض رقم تجريبي ثابت.
- يحتفظ التطبيق بتوافق مع روابط `/workouts` و`/history` القديمة، ويرحّل سجلات النسخة السابقة عند قراءتها.

## Product

- صفحة رئيسية بتحدي يومي، مؤشر أسبوعي، وتمارين وخطط مقترحة.
- مكتبة تمارين قابلة للبحث والتصفية مع صفحات تفاصيل.
- خطط للمبتدئين و10 دقائق و20 دقيقة.
- مؤقت جلسة فعلي مع الإيقاف والاستكمال وإعادة الجولة والانتقال التالي.
- تقدم وإحصائيات محسوبة من الجلسات المحفوظة فعليًا.
- إعدادات وخصوصية ومسح للبيانات بعد التأكيد.
- مكتبة فيديوهات عربية وإنجليزية مع تصفية حسب مدربة أو مدرب أو عرض الجميع.

## User preferences

- الاسم والهوية: `VYORA | ڤايورا`، والشعار `MOVE BEYOND LIMITS.`
- العبارة العربية: `تدريبك في بيتك.. لنسخة أقوى من نفسك.`
- واجهة عربية RTL داكنة قريبة من المرجع المرفق، مع أخضر ليموني `#A4F477`.
- لا تضف ذكاءً اصطناعيًا أو تسجيل دخول أو دفعًا أو خدمات مدفوعة في النسخة الأولى.
- الفيديوهات الخارجية لا تُحمّل إلا بعد اختيار التشغيل؛ بيانات الجلسات والإعدادات محلية بينما يوتيوب يعرض الفيديو.

## Gotchas

- لا تكتب سجل جلسة مباشرة من أكثر من مسار؛ `saveSession` يمنع التكرار بالمعرّف.
- الصور محلية، ويجب تمرير مساراتها عبر مكوّن الصورة حتى تظل متوافقة مع مسار المعاينة.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
