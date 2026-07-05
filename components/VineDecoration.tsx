export default function VineDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M40,230 C120,210 160,190 190,160 C220,130 210,100 240,80 C270,60 300,70 330,50" />
      <path d="M330,50 C345,40 345,25 335,15 C325,25 328,38 340,45" />
      <g transform="translate(150,150) rotate(-25) scale(1.1)">
        <path d="M0,0 C-6,-14 -28,-18 -34,-40 C-16,-32 -8,-34 0,-52 C8,-34 16,-32 34,-40 C28,-18 6,-14 0,0 Z" />
        <path d="M0,-6 L0,-46 M-4,-20 L-22,-32 M4,-20 L22,-32" strokeWidth="1.5" />
      </g>
      <g transform="translate(220,105) rotate(10) scale(0.9)">
        <path d="M0,0 C-6,-14 -28,-18 -34,-40 C-16,-32 -8,-34 0,-52 C8,-34 16,-32 34,-40 C28,-18 6,-14 0,0 Z" />
        <path d="M0,-6 L0,-46 M-4,-20 L-22,-32 M4,-20 L22,-32" strokeWidth="1.5" />
      </g>
      <g transform="translate(290,65) rotate(-40) scale(0.8)">
        <path d="M0,0 C-6,-14 -28,-18 -34,-40 C-16,-32 -8,-34 0,-52 C8,-34 16,-32 34,-40 C28,-18 6,-14 0,0 Z" />
        <path d="M0,-6 L0,-46 M-4,-20 L-22,-32 M4,-20 L22,-32" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
