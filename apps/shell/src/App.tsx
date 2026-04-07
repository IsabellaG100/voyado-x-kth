import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from '@voyado-kth/ui';
import { ShellLayout } from './layout/ShellLayout';

const LoyaltyDashboard = lazy(() =>
  import('@voyado-kth/team-1-loyalty-dashboard').then(m => ({ default: m.Index }))
);
const ProductCatalog = lazy(() =>
  import('@voyado-kth/team-2-product-catalog').then(m => ({ default: m.Index }))
);
const CustomerSegments = lazy(() =>
  import('@voyado-kth/team-3-customer-segments').then(m => ({ default: m.Index }))
);
const CampaignBuilder = lazy(() =>
  import('@voyado-kth/team-4-campaign-builder').then(m => ({ default: m.Index }))
);
const RewardsStore = lazy(() =>
  import('@voyado-kth/team-5-rewards-store').then(m => ({ default: m.Index }))
);
const AnalyticsOverview = lazy(() =>
  import('@voyado-kth/team-6-analytics-overview').then(m => ({ default: m.Index }))
);

import { Welcome } from './pages/Welcome';

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <Loader size="large" />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<ShellLayout />}>
        <Route index element={<Welcome />} />
        <Route path="loyalty" element={
          <Suspense fallback={<PageLoader />}>
            <LoyaltyDashboard />
          </Suspense>
        } />
        <Route path="products" element={
          <Suspense fallback={<PageLoader />}>
            <ProductCatalog />
          </Suspense>
        } />
        <Route path="segments" element={
          <Suspense fallback={<PageLoader />}>
            <CustomerSegments />
          </Suspense>
        } />
        <Route path="campaigns" element={
          <Suspense fallback={<PageLoader />}>
            <CampaignBuilder />
          </Suspense>
        } />
        <Route path="rewards" element={
          <Suspense fallback={<PageLoader />}>
            <RewardsStore />
          </Suspense>
        } />
        <Route path="analytics" element={
          <Suspense fallback={<PageLoader />}>
            <AnalyticsOverview />
          </Suspense>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
