import type { ReactNode } from 'react';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  /** Unique identifier */
  id: string;
  /** Display label below the icon */
  label: string;
  /** Icon element (24×24 recommended) */
  icon: ReactNode;
  /** Navigation path */
  path: string;
}

export interface SidebarProps {
  /** Main navigation items */
  items: SidebarItem[];
  /** Bottom utility items (Help, Admin, Profile) — separated by a divider */
  bottomItems?: SidebarItem[];
  /** Currently active item id */
  activeItem?: string;
  /** Called when a nav item is clicked */
  onItemClick: (item: SidebarItem) => void;
  /** Logo element displayed below the top bar */
  logo?: ReactNode;
  /** Environment label shown in the top colored bar */
  environmentLabel?: string;
}

export function Sidebar({
  items,
  bottomItems = [],
  activeItem,
  onItemClick,
  logo,
  environmentLabel = 'DEV',
}: SidebarProps) {
  return (
    <nav className={styles.sidebar} aria-label="Main navigation">
      {/* Top colored bar with environment label + gear icon */}
      <div className={styles.topBar}>
        <span className={styles.topBarLabel}>{environmentLabel}</span>
        <svg
          className={styles.topBarIcon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.2.966.46 1.397.772l1.4-.556a1 1 0 0 1 1.2.434l.68 1.178a1 1 0 0 1-.22 1.238l-1.105.918a6 6 0 0 1 0 1.558l1.105.918a1 1 0 0 1 .22 1.238l-.68 1.178a1 1 0 0 1-1.2.434l-1.4-.556a5.97 5.97 0 0 1-1.397.772l-.294 1.473a1 1 0 0 1-.981.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a5.97 5.97 0 0 1-1.397-.772l-1.4.556a1 1 0 0 1-1.2-.434l-.68-1.178a1 1 0 0 1 .22-1.238l1.105-.918a6 6 0 0 1 0-1.558l-1.105-.918a1 1 0 0 1-.22-1.238l.68-1.178a1 1 0 0 1 1.2-.434l1.4.556c.431-.312.9-.572 1.397-.772l.294-1.473ZM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Logo area */}
      {logo && <div className={styles.logoArea}>{logo}</div>}

      {/* Main navigation items */}
      <ul className={styles.navList} role="list">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={[
                  styles.navItem,
                  isActive ? styles.navItemActive : undefined,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onItemClick(item)}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Spacer to push bottom items down */}
      <div className={styles.spacer} />

      {/* Bottom utility items */}
      {bottomItems.length > 0 && (
        <>
          <div className={styles.divider} />
          <ul className={styles.navList} role="list">
            {bottomItems.map((item) => {
              const isActive = item.id === activeItem;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={[
                      styles.navItem,
                      isActive ? styles.navItemActive : undefined,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => onItemClick(item)}
                    aria-current={isActive ? 'page' : undefined}
                    title={item.label}
                  >
                    <span className={styles.navIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
}
