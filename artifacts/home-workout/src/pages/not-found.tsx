import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useLocale } from '@/lib/locale';

export default function NotFound() {
  const { locale } = useLocale();
  return (
    <div className="min-h-[70dvh] w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">
              {locale === 'ar' ? 'الصفحة غير موجودة' : '404 — Page not found'}
            </h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {locale === 'ar'
              ? 'تعذر العثور على الصفحة التي تبحث عنها.'
              : 'The page you are looking for does not exist.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
