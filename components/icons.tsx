type IconProps = { className?: string };

export function PinIcon({ className }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M5 21c8 0 14-6 14-14V5h-2C9 5 3 11 3 19v2z" />
      <path d="M5 21c0-6 3-10 8-13" />
    </svg>
  );
}

export function ToolsIcon({ className }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M3 8l9-5 9 5v8l-9 5-9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  );
}

export function CrystalIcon({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M6 9h12l-6 12z" />
      <path d="M9 3h6l3 6H6z" />
      <path d="M6 9l3-6M18 9l-3-6M9 9l3 12M15 9l-3 12" />
    </svg>
  );
}

export function ThermometerIcon({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" />
      <circle cx="10" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DropletWarningIcon({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 3s6 7 6 11.5a6 6 0 1 1-12 0C6 10 12 3 12 3z" />
      <path d="M12 10.5v4M12 16.8v.2" />
    </svg>
  );
}

export function BottleSilhouette({ className }: IconProps) {
  return (
    <svg width="14" height="42" viewBox="0 0 100 300" fill="currentColor" className={className}>
      <path
        d="M42,0 L58,0 Q61,0 61,4 L61,14 Q61,18 64,20 L64,86
           C64,100 72,108 78,122 C85,138 95,148 95,166 L95,282
           Q95,300 78,300 L22,300 Q5,300 5,282 L5,166
           C5,148 15,138 22,122 C28,108 36,100 36,86
           L36,20 Q39,18 39,14 L39,4 Q39,0 42,0 Z"
      />
    </svg>
  );
}
