import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@voyado-kth/ui';
import {
  Heart,
  ShoppingBag,
  Users,
  Mail,
  Gift,
  BarChart3,
  HelpCircle,
  Settings,
} from 'lucide-react';
import styles from './ShellLayout.module.css';

const ICON_SIZE = 22;
const ICON_STROKE = 1.5;

const navItems = [
  { id: 'loyalty', label: 'Loyalty', icon: <Heart size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '/loyalty' },
  { id: 'products', label: 'Products', icon: <ShoppingBag size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '/products' },
  { id: 'segments', label: 'Segments', icon: <Users size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '/segments' },
  { id: 'campaigns', label: 'Campaigns', icon: <Mail size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '/campaigns' },
  { id: 'rewards', label: 'Rewards', icon: <Gift size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '/rewards' },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '/analytics' },
];

const bottomItems = [
  { id: 'help', label: 'Help', icon: <HelpCircle size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '#' },
  { id: 'admin', label: 'Admin', icon: <Settings size={ICON_SIZE} strokeWidth={ICON_STROKE} />, path: '#' },
];

export function ShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeItem = navItems.find(item => location.pathname.startsWith(item.path))?.id
    || bottomItems.find(item => location.pathname.startsWith(item.path))?.id
    || '';

  return (
    <div className={styles.shell}>
      <Sidebar
        items={navItems}
        bottomItems={bottomItems}
        activeItem={activeItem}
        onItemClick={(item) => navigate(item.path)}
        logo={
          <button
            className={styles.logo}
            onClick={() => navigate('/')}
            type="button"
            aria-label="Home"
          >
            <svg width="28" height="26" viewBox="0 0 186.9 171.2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M112.5,101.7c-11.1-6.4-20.5-15.7-27-26.8-6.7-11.4-10.2-24.4-10.2-37.7C75.3,16.7,58.7,0,38.1,0,20.4,.1,5.6,12.5,1.8,29h0c-6.3,23.7,4.8,59.6,19.6,83.8,1.6,2.8,3.4,5.5,5.2,8.2,13.2,20,30.6,39.7,53.9,47.7,1.9,.7,3.8,1.3,5.7,1.7h.1c2.5,.5,5,.8,7.5,.8,12.8,0,25.3-6.7,32.2-18.6,10.4-17.9,4.3-40.6-13.5-50.9Z" fill="currentColor" />
              <circle cx="149.7" cy="37.3" r="37.2" fill="currentColor" />
            </svg>
          </button>
        }
      />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
