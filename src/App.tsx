import { type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import DashboardPage from '@/pages/dashboard';
import AssistantPage from '@/pages/assistant';
import MarketsPage from '@/pages/markets';
import PortfolioPage from '@/pages/portfolio';
import SettingsPage from '@/pages/settings';
import { FinPilotShell } from '@/components/finpilot-shell';
import { Toaster } from 'sonner';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <FinPilotShell>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/assistant" component={AssistantPage} />
          <Route path="/markets" component={MarketsPage} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </FinPilotShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster position="bottom-right" richColors />
    </TooltipProvider>
  );
}

export default App;