// =========================================================
// Speak5 — Reusable UI Components
// =========================================================

import React from 'react';

// ---------------------------------------------------------
// Icon Component
// ---------------------------------------------------------
export type IconName =
  | 'mic'
  | 'check'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-right'
  | 'play'
  | 'pause'
  | 'sparkles'
  | 'flame'
  | 'clock'
  | 'bar-chart'
  | 'user'
  | 'settings'
  | 'info'
  | 'video'
  | 'refresh'
  | 'trash'
  | 'search'
  | 'lock'
  | 'bulb';

export const Icon: React.FC<{ name: IconName; size?: number; className?: string; color?: string }> = ({
  name,
  size = 20,
  className = '',
  color = 'currentColor',
}) => {
  const s = size;
  const strokeProps = {
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (name) {
    case 'mic':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      );
    case 'check':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case 'close':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case 'play':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} fill={color} stroke="none">
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      );
    case 'pause':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} fill={color} stroke="none">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    case 'flame':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5Z" />
        </svg>
      );
    case 'clock':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'bar-chart':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      );
    case 'user':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'settings':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'info':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case 'video':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case 'refresh':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      );
    case 'trash':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case 'search':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'lock':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'bulb':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
        </svg>
      );
    default:
      return null;
  }
};

// ---------------------------------------------------------
// Button Component
// ---------------------------------------------------------
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'lg' | 'sm';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass =
    variant === 'primary'
      ? 'btn-pri'
      : variant === 'secondary'
      ? 'btn-sec'
      : variant === 'ghost'
      ? 'btn-ghost'
      : 'btn-danger';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const fullClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${fullClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// ---------------------------------------------------------
// Card Component
// ---------------------------------------------------------
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
  active?: boolean;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  clickable = false,
  active = false,
  elevated = false,
  className = '',
  ...props
}) => {
  const classes = [
    'card',
    clickable ? 'clickable' : '',
    active ? 'active' : '',
    elevated ? 'elevated' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// ---------------------------------------------------------
// Chip Component
// ---------------------------------------------------------
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
}

export const Chip: React.FC<ChipProps> = ({ selected = false, label, className = '', ...props }) => {
  return (
    <button
      type="button"
      className={`chip ${selected ? 'selected' : ''} ${className}`.trim()}
      aria-pressed={selected}
      {...props}
    >
      {label}
    </button>
  );
};

// ---------------------------------------------------------
// OptionRow Component
// ---------------------------------------------------------
export interface OptionRowProps {
  title: string;
  desc?: string;
  icon?: IconName;
  selected?: boolean;
  onClick?: () => void;
  meta?: React.ReactNode;
}

export const OptionRow: React.FC<OptionRowProps> = ({
  title,
  desc,
  selected = false,
  onClick,
  meta,
}) => {
  return (
    <div
      className={`opt ${selected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="opt-check">
        {selected && <Icon name="check" size={14} color="#fff" />}
      </div>
      <div className="opt-body">
        <div className="opt-title">{title}</div>
        {desc && <div className="opt-desc">{desc}</div>}
      </div>
      {meta && <div className="opt-meta">{meta}</div>}
    </div>
  );
};

// ---------------------------------------------------------
// MetricTiles Component
// ---------------------------------------------------------
export interface MetricTileData {
  label: string;
  value: string | number;
  sub?: string;
  tone?: 'good' | 'warn' | 'default';
}

export const MetricTiles: React.FC<{ items: MetricTileData[] }> = ({ items }) => {
  return (
    <div className="metric-tiles">
      {items.map((it, idx) => (
        <div key={idx} className={`metric-tile ${it.tone ? `tone-${it.tone}` : ''}`}>
          <div className="metric-val">{it.value}</div>
          <div className="metric-label">{it.label}</div>
          {it.sub && <div className="metric-sub">{it.sub}</div>}
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------
// VoiceLine / Waveform Visualizer Placeholder
// ---------------------------------------------------------
export const VoiceLine: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = '',
}) => {
  return (
    <div className={`voiceline-container ${active ? 'active' : ''} ${className}`}>
      <div className="voiceline-bar bar-1" />
      <div className="voiceline-bar bar-2" />
      <div className="voiceline-bar bar-3" />
      <div className="voiceline-bar bar-4" />
      <div className="voiceline-bar bar-5" />
      <div className="voiceline-bar bar-6" />
      <div className="voiceline-bar bar-7" />
    </div>
  );
};

// ---------------------------------------------------------
// TabBar Component (Home | Central Practice mic | Progress)
// ---------------------------------------------------------
export interface TabBarProps {
  activeTab: 'home' | 'progress';
  onSelectTab: (tab: 'home' | 'progress') => void;
  onRecordClick: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onSelectTab, onRecordClick }) => {
  return (
    <nav className="tab-bar" aria-label="Main Navigation">
      <button
        type="button"
        className="tab-btn"
        aria-current={activeTab === 'home' ? 'page' : undefined}
        onClick={() => onSelectTab('home')}
      >
        <Icon name="sparkles" size={20} />
        <span>Today</span>
      </button>

      <button
        type="button"
        className="tab-btn mic"
        aria-label="Start Practice Challenge"
        onClick={onRecordClick}
      >
        <Icon name="mic" size={28} color="#fff" />
      </button>

      <button
        type="button"
        className="tab-btn"
        aria-current={activeTab === 'progress' ? 'page' : undefined}
        onClick={() => onSelectTab('progress')}
      >
        <Icon name="bar-chart" size={20} />
        <span>Progress</span>
      </button>
    </nav>
  );
};
