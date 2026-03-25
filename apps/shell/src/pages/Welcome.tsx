import { useNavigate } from 'react-router-dom';
import { Card, PageHeader } from '@voyado-kth/ui';
import {
  Heart,
  ShoppingBag,
  Users,
  Mail,
  Gift,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import styles from './Welcome.module.css';

const modules = [
  { id: 'loyalty', name: 'Loyalty Dashboard', team: 'Team 1', icon: Heart, path: '/loyalty', color: '#2d6e6d' },
  { id: 'products', name: 'Product Catalog', team: 'Team 2', icon: ShoppingBag, path: '/products', color: '#4790ff' },
  { id: 'segments', name: 'Customer Segments', team: 'Team 3', icon: Users, path: '/segments', color: '#43a584' },
  { id: 'campaigns', name: 'Campaign Builder', team: 'Team 4', icon: Mail, path: '/campaigns', color: '#791A3F' },
  { id: 'rewards', name: 'Rewards Store', team: 'Team 5', icon: Gift, path: '/rewards', color: '#e8725a' },
  { id: 'analytics', name: 'Analytics Overview', team: 'Team 6', icon: BarChart3, path: '/analytics', color: '#7b61ff' },
];

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <PageHeader
        title="Voyado Engage"
        subtitle="Workshop Edition — KTH Medieteknik"
      />
      <div className={styles.grid}>
        {modules.map(mod => {
          const Icon = mod.icon;
          return (
            <Card
              key={mod.id}
              className={styles.moduleCard}
              hoverable
            >
              <button
                className={styles.cardButton}
                onClick={() => navigate(mod.path)}
                type="button"
              >
                <div className={styles.moduleIcon} style={{ backgroundColor: mod.color }}>
                  <Icon size={22} strokeWidth={1.5} color="#fff" />
                </div>
                <div className={styles.moduleInfo}>
                  <span className={styles.teamLabel}>{mod.team}</span>
                  <h3 className={styles.moduleName}>{mod.name}</h3>
                </div>
                <ArrowRight size={16} strokeWidth={1.5} className={styles.arrow} />
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
