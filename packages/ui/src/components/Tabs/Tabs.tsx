import styles from './Tabs.module.css';

export interface TabItem {
  /** Unique tab identifier */
  id: string;
  /** Display label */
  label: string;
}

export interface TabsProps {
  /** Array of tab definitions */
  tabs: TabItem[];
  /** Currently active tab id */
  activeTab: string;
  /** Called when a tab is clicked */
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            className={[styles.tab, isActive ? styles.active : undefined]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
