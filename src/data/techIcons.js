const createGlyphIcon = (label, accent) => {
  const GlyphIcon = ({ className = '' }) => (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.5" y="2.5" width="43" height="43" rx="12" fill="#0b1220" />
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="12"
        fill={accent}
        fillOpacity="0.24"
        stroke={accent}
        strokeWidth="1.7"
      />
      <text
        x="24"
        y="29"
        fill="#ecfeff"
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)"
        fontSize="13"
        letterSpacing="0.4"
        fontWeight="700"
      >
        {label}
      </text>
    </svg>
  );

  GlyphIcon.displayName = `Icon${label.replace(/[^a-z0-9]/gi, '')}`;
  return GlyphIcon;
};

export const IconPython = createGlyphIcon('PY', '#60a5fa');
export const IconJava = createGlyphIcon('JV', '#fb923c');
export const IconJavaScript = createGlyphIcon('JS', '#facc15');
export const IconTypeScript = createGlyphIcon('TS', '#3b82f6');
export const IconC = createGlyphIcon('C', '#94a3b8');
export const IconCpp = createGlyphIcon('C+', '#60a5fa');
export const IconCSharp = createGlyphIcon('C#', '#a855f7');
export const IconHtml = createGlyphIcon('HT', '#fb7185');
export const IconCss = createGlyphIcon('CS', '#38bdf8');
export const IconSql = createGlyphIcon('SQL', '#a78bfa');
export const IconMysql = IconSql;
export const IconReact = createGlyphIcon('RE', '#22d3ee');
export const IconAngular = createGlyphIcon('NG', '#f87171');
export const IconNext = createGlyphIcon('NX', '#e5e7eb');
export const IconTailwind = createGlyphIcon('TW', '#22d3ee');
export const IconFlask = createGlyphIcon('FK', '#d1d5db');
export const IconDjango = createGlyphIcon('DJ', '#4ade80');
export const IconNode = createGlyphIcon('ND', '#86efac');
export const IconExpress = createGlyphIcon('EX', '#d1d5db');
export const IconGit = createGlyphIcon('GT', '#fb7185');
export const IconFirebase = createGlyphIcon('FB', '#fbbf24');
export const IconSupabase = createGlyphIcon('SB', '#4ade80');
export const IconAws = createGlyphIcon('AWS', '#fb923c');
export const IconDocker = createGlyphIcon('DK', '#38bdf8');
export const IconAndroid = createGlyphIcon('AN', '#4ade80');
export const IconPandas = createGlyphIcon('PD', '#c084fc');
export const IconNumpy = createGlyphIcon('NP', '#60a5fa');
export const IconSklearn = createGlyphIcon('SK', '#fda4af');
