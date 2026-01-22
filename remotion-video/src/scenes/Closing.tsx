import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '60px',
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          fontSize: '96px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        Let's Build Together
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <a
          href="https://markosuniverse.xyz"
          style={{
            fontSize: '56px',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          markosuniverse.xyz
        </a>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            fontSize: '32px',
            color: '#94a3b8',
          }}
        >
          <span>@markowifk</span>
          <span>•</span>
          <span>marko.stokic@proton.me</span>
        </div>
      </div>

      <p
        style={{
          fontSize: '24px',
          color: '#64748b',
          marginTop: '40px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        Head of AI @ Oasis Protocol
      </p>
    </AbsoluteFill>
  );
};
