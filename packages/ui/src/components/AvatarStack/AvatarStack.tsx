import { useState } from 'react';
import styles from './AvatarStack.module.css';

export interface AvatarMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  avatarUrl?: string;
}

export interface AvatarStackProps {
  members: AvatarMember[];
  maxVisible?: number;
}

export function AvatarStack({ members, maxVisible = 5 }: AvatarStackProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const visible = members.slice(0, maxVisible);
  const remaining = members.length - maxVisible;

  return (
    <div className={styles.stack} role="group" aria-label="Team members">
      {visible.map((member, index) => (
        <div
          key={member.id}
          className={styles.avatarWrapper}
          style={{ '--index': index } as React.CSSProperties}
          onMouseEnter={() => setHoveredId(member.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className={styles.avatar}
            style={{ backgroundColor: member.avatarUrl ? 'transparent' : member.color }}
            aria-label={`${member.name}, ${member.role}`}
          >
            {member.avatarUrl ? (
              <img
                src={member.avatarUrl}
                alt={member.name}
                className={styles.avatarImg}
              />
            ) : (
              <span className={styles.initials}>{member.initials}</span>
            )}
          </div>
          {hoveredId === member.id && (
            <div className={styles.tooltip}>
              <span className={styles.tooltipName}>{member.name}</span>
              <span className={styles.tooltipRole}>{member.role}</span>
            </div>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div className={styles.avatarWrapper} style={{ '--index': visible.length } as React.CSSProperties}>
          <div className={[styles.avatar, styles.overflow].join(' ')}>
            <span className={styles.initials}>+{remaining}</span>
          </div>
        </div>
      )}
    </div>
  );
}
