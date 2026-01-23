import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

/**
 * Act 5: Closing (30-35s = 150 frames)
 * Final branded card with contact info
 */
export const HypeClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Name entrance
  const nameProgress = spring({
    frame: frame - 0,
    fps,
    config: springConfigs.bouncy,
  });

  // Title & role
  const titleProgress = spring({
    frame: frame - 30,
    fps,
    config: springConfigs.textReveal,
  });

  // Contact info
  const contactProgress = spring({
    frame: frame - 60,
    fps,
    config: springConfigs.textReveal,
  });

  // Tagline
  const taglineProgress = spring({
    frame: frame - 90,
    fps,
    config: springConfigs.bouncy,
  });

  // Pulsing glow effect
  const glowIntensity = Math.abs(Math.sin(frame / 20)) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, ${colors.deepBlue} 0%, ${colors.darkNavy} 70%)`,
      }}
    >
      {/* Background particles */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (i * 43) % 100;
          const y = (i * 67) % 100;
          const delay = i * 3;
          const particleProgress = interpolate(frame, [delay, delay + 90], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: i % 3 === 0 ? colors.amber : colors.professionalBlue,
                opacity: particleProgress * 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Name */}
        <div
          style={{
            opacity: nameProgress,
            transform: `translateY(${interpolate(nameProgress, [0, 1], [60, 0])}px) scale(${interpolate(nameProgress, [0, 1], [0.5, 1])})`,
          }}
        >
          <h1
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: colors.white,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: -3,
              textTransform: 'uppercase',
              textShadow: `0 0 ${80 * glowIntensity}px ${colors.amber}, 0 8px 40px rgba(0, 0, 0, 0.8)`,
            }}
          >
            MARKO STOKIĆ
          </h1>
        </div>

        {/* Title & Role */}
        <div
          style={{
            opacity: titleProgress,
            transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
            marginTop: 40,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: colors.amber,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              textShadow: `0 0 ${30 * glowIntensity}px ${colors.amber}`,
            }}
          >
            Head of AI @ Oasis Protocol
          </p>
          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: colors.lightGray,
              margin: 0,
              marginTop: 15,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Forbes Contributor
          </p>
        </div>

        {/* Contact info */}
        <div
          style={{
            opacity: contactProgress,
            transform: `translateY(${interpolate(contactProgress, [0, 1], [30, 0])}px)`,
            marginTop: 60,
            display: 'flex',
            gap: 50,
            fontSize: 28,
            color: colors.lightGray,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span>@markowifk</span>
          <span style={{ color: colors.mediumGray }}>|</span>
          <span>markosuniverse.xyz</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineProgress,
            transform: `scale(${interpolate(taglineProgress, [0, 1], [0.5, 1])})`,
            marginTop: 50,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: colors.amber,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: 8,
              textTransform: 'uppercase',
              textShadow: `0 0 ${60 * glowIntensity}px ${colors.amber}`,
            }}
          >
            Privacy × AI × Crypto
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 300,
              height: 4,
              background: `linear-gradient(90deg, transparent 0%, ${colors.amber} 50%, transparent 100%)`,
              marginTop: 30,
              marginLeft: 'auto',
              marginRight: 'auto',
              boxShadow: `0 0 ${20 * glowIntensity}px ${colors.amber}`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
