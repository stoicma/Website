import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

interface CareerStopProps {
  title: string;
  subtitle?: string;
  startFrame: number;
  endFrame: number;
  logos?: string[];
  accentColor: string;
}

const CareerStop: React.FC<CareerStopProps> = ({
  title,
  subtitle,
  startFrame,
  endFrame,
  logos = [],
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in/out
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 20, endFrame - 20, endFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Slide up animation
  const slideY = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.smooth,
  });

  // Logo stagger
  const logoDelay = 20;

  if (frame < startFrame || frame > endFrame) return null;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          transform: `translateY(${interpolate(slideY, [0, 1], [60, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: accentColor,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            transform: `translateY(${interpolate(slideY, [0, 1], [40, 0])}px)`,
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: colors.lightGray,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            {subtitle}
          </p>
        </div>
      )}

      {/* Logos */}
      {logos.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 60,
            alignItems: 'center',
          }}
        >
          {logos.map((logo, index) => {
            const logoProgress = spring({
              frame: frame - startFrame - logoDelay * (index + 1),
              fps,
              config: springConfigs.bouncy,
            });

            return (
              <div
                key={logo}
                style={{
                  transform: `scale(${logoProgress})`,
                  opacity: logoProgress,
                }}
              >
                {/* Placeholder for logo */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: colors.deepBlue,
                    border: `2px solid ${accentColor}`,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: colors.lightGray,
                    fontWeight: 600,
                    textAlign: 'center',
                    padding: 10,
                  }}
                >
                  {logo}
                </div>
                {/* TODO: Replace with actual logos */}
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const JourneyScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline segments (in frames at 30fps)
  // Act 3 is 45-75 seconds = frames 1350-2250 (900 frames total)
  // Each stop gets ~210 frames (7 seconds)

  const stops: CareerStopProps[] = [
    {
      title: 'Bocconi University',
      subtitle: 'Research Lead - Blockchain & Cryptocurrencies Association',
      startFrame: 0,
      endFrame: 210,
      logos: [],
      accentColor: colors.amber,
    },
    {
      title: 'Wayra',
      subtitle: 'Investment Analyst',
      startFrame: 210,
      endFrame: 390,
      logos: [],
      accentColor: colors.professionalBlue,
    },
    {
      title: 'Fractal ID & idOS',
      subtitle: 'Decentralized Identity',
      startFrame: 390,
      endFrame: 600,
      logos: ['NEAR', 'Gnosis', 'Aleph Zero'],
      accentColor: colors.cryptoGreen,
    },
    {
      title: 'Oasis Protocol',
      subtitle: 'Head of AI',
      startFrame: 600,
      endFrame: 900,
      logos: [],
      accentColor: colors.amber,
    },
  ];

  // Special effect for Oasis - neural network overlay
  const oasisStart = 600;
  const neuralOpacity = interpolate(frame, [oasisStart + 60, oasisStart + 120], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animated particles for "merging worlds"
  const particleCount = 20;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%,
            ${colors.deepBlue} 0%,
            ${colors.darkNavy} 70%)`,
        }}
      />

      {/* Timeline line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(180deg, transparent 0%, ${colors.mediumGray} 10%, ${colors.mediumGray} 90%, transparent 100%)`,
          transform: 'translateX(-50%)',
        }}
      />

      {/* Career stops */}
      {stops.map((stop) => (
        <CareerStop key={stop.title} {...stop} />
      ))}

      {/* Special Oasis effect - Neural network overlay */}
      {frame >= oasisStart && (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {/* Neural network visualization */}
          <svg
            style={{
              width: '100%',
              height: '100%',
              opacity: neuralOpacity,
            }}
          >
            {/* Create a grid of connected nodes */}
            {Array.from({ length: particleCount }).map((_, i) => {
              const x1 = (i % 5) * 20 + 10;
              const y1 = Math.floor(i / 5) * 25 + 10;
              const x2 = ((i + 1) % 5) * 20 + 10;
              const y2 = Math.floor((i + 1) / 5) * 25 + 10;

              return (
                <g key={i}>
                  <line
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={colors.professionalBlue}
                    strokeWidth="1"
                    opacity="0.2"
                  />
                  <circle
                    cx={`${x1}%`}
                    cy={`${y1}%`}
                    r="3"
                    fill={colors.amber}
                    opacity="0.6"
                  />
                </g>
              );
            })}
          </svg>

          {/* Text overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 32,
                color: colors.lightGray,
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
              }}
            >
              Where crypto meets AI
            </p>
          </div>
        </AbsoluteFill>
      )}

      {/* Crypto + AI worlds merging effect (for Oasis) */}
      {frame >= oasisStart + 120 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 80,
              alignItems: 'center',
              opacity: interpolate(frame, [oasisStart + 120, oasisStart + 180], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Crypto circle */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.ethereumPurple} 0%, ${colors.cryptoGreen} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 700,
                color: colors.white,
                boxShadow: `0 0 40px ${colors.ethereumPurple}`,
              }}
            >
              Crypto
            </div>

            {/* Plus sign */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 300,
                color: colors.amber,
              }}
            >
              +
            </div>

            {/* AI circle */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.professionalBlue} 0%, ${colors.amber} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 700,
                color: colors.white,
                boxShadow: `0 0 40px ${colors.professionalBlue}`,
              }}
            >
              AI
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
