import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  ClerkProvider,
  SignIn,
  SignUp,
  useAuth,
  useClerk,
  useUser,
} from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { arSA, enUS } from '@clerk/localizations';
import { shadcn } from '@clerk/themes';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LocaleProvider, useLocale } from '@/lib/locale';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Logo } from '@/components/vyora';
import { useVYORAProfile, VYORAProfileContext } from '@/lib/profile-context';
import {
  readVYORAProfile,
  saveVYORAProfile,
  type UserGender,
  type VYORAProfile,
} from '@/lib/profile';
import NotFound from '@/pages/not-found';
import { SiteLayout } from '@/components/layout';
import HomePage from '@/pages/home';
import { ExerciseDetailPage, ExercisesPage } from '@/pages/exercises';
import { PlanDetailPage, PlansPage } from '@/pages/plans';
import { SessionPage } from '@/pages/session';
import ProgressPage from '@/pages/progress';
import MorePage from '@/pages/more';
import MovementGuidePage from '@/pages/movement-guide';
import OnboardingPage from '@/pages/onboarding';
import { Link, Redirect, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in the workspace secrets.');
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsPlacement: 'top' as const,
    socialButtonsVariant: 'blockButton' as const,
  },
  variables: {
    colorPrimary: '#f184b6',
    colorForeground: '#f4f2f4',
    colorMutedForeground: '#a5a0a6',
    colorDanger: '#ff7777',
    colorBackground: '#141216',
    colorInput: '#1a181d',
    colorInputForeground: '#f4f2f4',
    colorNeutral: '#39343b',
    fontFamily: 'Cairo, sans-serif',
    borderRadius: '1rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#141216] border border-[#302b32] rounded-2xl w-[440px] max-w-full overflow-hidden',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-white',
    headerSubtitle: 'text-gray-300',
    socialButtonsBlockButtonText: 'text-white',
    formFieldLabel: 'text-gray-200',
    footerActionLink: 'text-pink-300',
    footerActionText: 'text-gray-300',
    dividerText: 'text-gray-400',
    identityPreviewEditButton: 'text-pink-300',
    formFieldSuccessText: 'text-green-300',
    alertText: 'text-white',
    logoBox: 'opacity-100',
    logoImage: 'max-h-10',
    socialButtonsBlockButton: 'bg-[#1b191e] text-white border border-[#39343b] hover:bg-[#242127]',
    formButtonPrimary: 'bg-pink-400 text-[#1b1117] hover:bg-pink-300',
    formFieldInput: 'bg-[#1a181d] border-[#39343b] text-white',
    footerAction: 'text-gray-300',
    dividerLine: 'bg-[#39343b]',
    alert: 'bg-[#291b22] text-white',
    otpCodeFieldInput: 'bg-[#1a181d] border-[#39343b] text-white',
    formFieldRow: 'text-gray-200',
    main: 'text-white',
  },
};

function WorkoutRoutes({
  onSaveProfile,
  onDraftGenderChange,
}: {
  onSaveProfile: (profile: VYORAProfile) => boolean;
  onDraftGenderChange: (gender: UserGender | null) => void;
}) {
  return (
    <SiteLayout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/profile">
            <ProfileEditPage
              onSaveProfile={onSaveProfile}
              onDraftGenderChange={onDraftGenderChange}
            />
          </Route>
          <Route path="/exercises" component={ExercisesPage} />
          <Route path="/exercises/:exerciseId" component={ExerciseDetailPage} />
          <Route path="/session/:workoutId" component={SessionPage} />
          <Route path="/plans" component={PlansPage} />
          <Route path="/plans/:planId" component={PlanDetailPage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/videos" component={MovementGuidePage} />
          <Route path="/more" component={MorePage} />
          <Route path="/workouts">
            <Redirect to="/exercises" />
          </Route>
          <Route path="/history">
            <Redirect to="/progress" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </SiteLayout>
  );
}

function UserAppGate() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [profileState, setProfileState] = useState<{
    userId: string;
    profile: VYORAProfile | null;
  } | null>(null);
  const [draftGender, setDraftGender] = useState<UserGender | null>(null);

  useEffect(() => {
    if (!authLoaded || !isSignedIn || !userLoaded || !user?.id) {
      setProfileState(null);
      setDraftGender(null);
      return;
    }
    setProfileState({ userId: user.id, profile: readVYORAProfile(user.id) });
  }, [authLoaded, isSignedIn, userLoaded, user?.id]);

  const profileReady = Boolean(user?.id && profileState?.userId === user.id);
  const profile =
    profileReady && profileState && profileState.userId === user?.id
      ? profileState.profile
      : null;
  const persistProfile = (nextProfile: VYORAProfile): boolean => {
    if (!user?.id || !saveVYORAProfile(user.id, nextProfile)) {
      toast.error(
        document.documentElement.lang === 'en'
          ? 'Your profile could not be saved on this device. Check your browser storage settings and try again.'
          : 'تعذّر حفظ ملفك على هذا الجهاز. راجعي إعدادات التخزين في المتصفح ثم حاولي مجددًا.',
      );
      return false;
    }
    setProfileState({ userId: user.id, profile: nextProfile });
    setDraftGender(null);
    return true;
  };

  useLayoutEffect(() => {
    const gender = draftGender ?? profile?.gender;
    if (gender) {
      document.documentElement.dataset.gender = gender;
    } else {
      delete document.documentElement.dataset.gender;
    }
  }, [profile?.gender, draftGender]);

  if (!authLoaded || (isSignedIn && (!userLoaded || !profileReady))) {
    return <LoadingScreen />;
  }

  if (!isSignedIn || !user?.id) return <Redirect to="/sign-in" />;

  if (!profile) {
    return (
      <OnboardingPage
        initialProfile={null}
        onGenderChange={setDraftGender}
        onComplete={(nextProfile) => {
          persistProfile(nextProfile);
        }}
      />
    );
  }

  return (
    <VYORAProfileContext.Provider value={profile}>
      <WorkoutRoutes
        onSaveProfile={persistProfile}
        onDraftGenderChange={setDraftGender}
      />
    </VYORAProfileContext.Provider>
  );
}

function ProfileEditPage({
  onSaveProfile,
  onDraftGenderChange,
}: {
  onSaveProfile: (profile: VYORAProfile) => boolean;
  onDraftGenderChange: (gender: UserGender | null) => void;
}) {
  const profile = useVYORAProfile();
  const { locale } = useLocale();
  const [, navigate] = useLocation();

  useEffect(() => () => onDraftGenderChange(null), [onDraftGenderChange]);

  if (!profile) return <Redirect to="/" />;

  return (
    <OnboardingPage
      initialProfile={profile}
      onGenderChange={onDraftGenderChange}
      onComplete={(nextProfile) => {
        if (onSaveProfile(nextProfile)) {
          toast.success(
            locale === 'ar' ? 'تم تحديث ملفك الشخصي.' : 'Your profile has been updated.',
          );
          navigate('/');
        }
      }}
    />
  );
}

function LoadingScreen() {
  return (
    <main className="grid min-h-[100dvh] place-items-center bg-background text-foreground">
      <div role="status" className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
        <span>VYORA</span>
      </div>
    </main>
  );
}

function SignInPage() {
  const { isArabic, locale, setLocale } = useLocale();
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-background px-4 py-16" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="absolute inset-x-4 top-4 mx-auto flex max-w-5xl items-center justify-between">
        <Logo full />
        <button
          type="button"
          onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
          className="focus-ring press rounded-full border border-border px-3 py-2 text-xs font-bold"
          data-testid="button-language-sign-in"
        >
          {locale === 'ar' ? 'English' : 'العربية'}
        </button>
      </div>
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </main>
  );
}

function SignUpPage() {
  const { isArabic, locale, setLocale } = useLocale();
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-background px-4 py-16" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="absolute inset-x-4 top-4 mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/sign-in" className="focus-ring rounded-lg">
          <Logo full />
        </Link>
        <button
          type="button"
          onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
          className="focus-ring press rounded-full border border-border px-3 py-2 text-xs font-bold"
          data-testid="button-language-sign-up"
        >
          {locale === 'ar' ? 'English' : 'العربية'}
        </button>
      </div>
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </main>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClientForUser = useQueryClient();
  const previousUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const nextUserId = user?.id ?? null;
      if (previousUserId.current !== undefined && previousUserId.current !== nextUserId) {
        queryClientForUser.clear();
      }
      previousUserId.current = nextUserId;
    });
    return unsubscribe;
  }, [addListener, queryClientForUser]);

  return null;
}

function ClerkRouter() {
  const [, setLocation] = useLocation();
  const { locale } = useLocale();

  const stripBase = (path: string) =>
    basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={locale === 'ar' ? arSA : enUS}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route component={UserAppGate} />
        </Switch>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <TooltipProvider>
      <LocaleProvider>
        <WouterRouter base={basePath}>
          <ClerkRouter />
        </WouterRouter>
        <Toaster />
      </LocaleProvider>
    </TooltipProvider>
  );
}

export default App;
