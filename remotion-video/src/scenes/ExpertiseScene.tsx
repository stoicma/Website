import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const ExpertiseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const expertise = [
    { icon: '🔒', text: 'TEEs & Confidential Computing' },
    { icon: '🤖', text: 'AI Agents & Autonomous Systems' },
    { icon: '⛓️', text: 'Blockchain & Web3' },
    { icon: '🔐', text: 'Privacy-Preserving Compute' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px',
      }}
    >
      <h2
        style={{
          fontSize: '72px',
          color: '#fff',
          fontWeight: 700,
          marginBottom: '80px',
          opacity: spring({
            frame: frame - 10,
            fps,
            config: { damping: 100 },
          }),
        }}
      >
        Expertise
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          maxWidth: '1400px',
        }}
      >
        {expertise.map((item, index) => {
          const itemOpacity = spring({
            frame: frame - (20 + index * 8),
            fps,
            config: { damping: 100 },
          });

          const itemY = interpolate(
            spring({
              frame: frame - (20 + index * 8),
              fps,
              config: { damping: 100 },
            }),
            [0, 1],
            [30, 0]
          );

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                border: '2px solid rgba(37, 99, 235, 0.3)',
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
              }}
            >
              <div
                style={{
                  fontSize: '72px',
                  minWidth: '100px',
                  textAlign: 'center',
                }}
              >
                {item.icon}
              </div>
              <p
                style={{
                  fontSize: '36px',
                  color: '#fff',
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
