import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Name animation - fade in + slide up
  const nameOpacity = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 100,
    },
  });

  const nameY = interpolate(
    spring({
      frame: frame - 10,
      fps,
      config: {
        damping: 100,
      },
    }),
    [0, 1],
    [50, 0]
  );

  // Role animation - delayed
  const roleOpacity = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 100,
    },
  });

  const roleY = interpolate(
    spring({
      frame: frame - 30,
      fps,
      config: {
        damping: 100,
      },
    }),
    [0, 1],
    [30, 0]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '120px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            letterSpacing: '-0.03em',
          }}
        >
          MARKO STOKIĆ
        </h1>
        <p
          style={{
            fontSize: '48px',
            color: '#fff',
            margin: 0,
            opacity: roleOpacity,
            transform: `translateY(${roleY}px)`,
            fontWeight: 500,
          }}
        >
          Blockchain & AI Consultant
        </p>
        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '20px',
            opacity: roleOpacity,
            transform: `translateY(${roleY}px)`,
          }}
        >
          <span
            style={{
              fontSize: '24px',
              color: '#3b82f6',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            TEEs
          </span>
          <span
            style={{
              fontSize: '24px',
              color: '#3b82f6',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            AI Agents
          </span>
          <span
            style={{
              fontSize: '24px',
              color: '#3b82f6',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Privacy
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
