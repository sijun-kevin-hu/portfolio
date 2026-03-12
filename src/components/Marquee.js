const TICKER_ITEMS = [
  'Open to Opportunities',
  'Atlanta, GA',
  "GT CS '26",
  'AI/ML Engineer',
  'Full-Stack Builder',
  'React',
  'Python',
  'Cloud-Native',
  'Pixel-Perfect UI',
  'Shipping Products',
];

const MarqueeTrack = () => (
  <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
    {TICKER_ITEMS.map((item, i) => (
      <span
        key={i}
        className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-500 whitespace-nowrap"
      >
        {item}
        <span className="text-cyan-500/45 text-sm leading-none" aria-hidden="true">✦</span>
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="w-full border-t border-b border-white/[0.06] bg-[#04060c]/80 backdrop-blur-sm overflow-hidden py-[11px] relative z-10">
    <div
      className="absolute inset-y-0 left-0 w-20 sm:w-28 pointer-events-none z-10"
      style={{ background: 'linear-gradient(to right, #05060c, transparent)' }}
    />
    <div
      className="absolute inset-y-0 right-0 w-20 sm:w-28 pointer-events-none z-10"
      style={{ background: 'linear-gradient(to left, #05060c, transparent)' }}
    />
    <div className="flex marquee-scroll" aria-hidden="true">
      <MarqueeTrack />
      <MarqueeTrack />
      <MarqueeTrack />
    </div>
  </div>
);

export default Marquee;
