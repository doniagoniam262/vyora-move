import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { SiteLayout } from '@/components/layout';
import HomePage from '@/pages/home';
import { ExerciseDetailPage, ExercisesPage } from '@/pages/exercises';
import { PlanDetailPage, PlansPage } from '@/pages/plans';
import { SessionPage } from '@/pages/session';
import ProgressPage from '@/pages/progress';
import MorePage from '@/pages/more';
import VideosPage from '@/pages/videos';
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <SiteLayout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/exercises" component={ExercisesPage} />
          <Route path="/exercises/:exerciseId" component={ExerciseDetailPage} />
          <Route path="/session/:workoutId" component={SessionPage} />
          <Route path="/plans" component={PlansPage} />
          <Route path="/plans/:planId" component={PlanDetailPage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/videos" component={VideosPage} />
          <Route path="/more" component={MorePage} />
          <Route path="/workouts"><Redirect to="/exercises" /></Route>
          <Route path="/history"><Redirect to="/progress" /></Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </SiteLayout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
