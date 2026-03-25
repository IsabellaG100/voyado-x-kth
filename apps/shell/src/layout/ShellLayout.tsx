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
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.5 4C18.5 4 20 8.5 20 13C20 17.5 17 22 12 24C7 22 4 17.5 4 13C4 8.5 5.5 4 5.5 4"
                stroke="#21211f"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
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
