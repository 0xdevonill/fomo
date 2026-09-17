export function RhLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="chain-logo rh-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="#00C805" />
      <path
        d="M16 6.2c2.2 5.2 4.8 10.4 9.2 17.6-3.1-1.8-6.1-2.7-9.2-2.7s-6.1.9-9.2 2.7C11.2 16.6 13.8 11.4 16 6.2Z"
        fill="#08140b"
      />
    </svg>
  );
}

export function SolLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="chain-logo sol-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="#0b0b12" />
      <defs>
        <linearGradient id="sol-logo-grad" x1="6" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sol-logo-grad)"
        d="M9.2 20.6h12.4l-2.4 2.6H6.8zM9.2 14.7h12.4l-2.4 2.6H6.8zM22.8 8.8H10.4L12.8 6.2h12.4z"
      />
    </svg>
  );
}
