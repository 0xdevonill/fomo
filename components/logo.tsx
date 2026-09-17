export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="18"
      viewBox="0 0 54 30"
      aria-hidden="true"
    >
      {/* Pixel helix: two offset columns with a pine apex */}
      <rect x="6" y="0" width="5.1" height="5.1" rx="1" fill="var(--mark-apex, #3F9E74)" />
      <rect x="12" y="6" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="18" y="12" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="24" y="18" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="30" y="24" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="42" y="0" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="36" y="6" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="30" y="12" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="24" y="6" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="18" y="18" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="12" y="24" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="36" y="18" width="5.1" height="5.1" rx="1" fill="var(--mark-body, #C8CFD1)" />
      <rect x="42" y="24" width="5.1" height="5.1" rx="1" fill="var(--mark-apex, #3F9E74)" />
    </svg>
  );
}
