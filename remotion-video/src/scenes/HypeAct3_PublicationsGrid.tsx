import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

/**
 * Act 3: Publications Grid (15-23s = 240 frames)
 * ALL screenshots displayed together in a dynamic grid
 */
export const HypePublicationsGridScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const publications = [
    {
      title: 'Why Crypto Needs Portable AI Memory',
      source: 'Forbes',
      color: colors.professionalBlue,
      delay: 0,
      image: 'forbes-ai-memory.png',
    },
    {
      title: 'Can We Ever Trust AI Agents?',
      source: 'CoinDesk',
      color: colors.cryptoGreen,
      delay: 20,
      image: 'coindesk-trust-ai.png',
    },
    {
      title: 'The AI Doctor Will See All of You Now',
      source: 'Decrypt',
      color: colors.amber,
      delay: 40,
      image: 'decrypt-ai-doctor.png',
    },
    {
      title: 'AI Usage in Crypto',
      source: 'Forbes',
      color: colors.professionalBlue,
      delay: 60,
      image: 'forbes-ai-usage.png',
    },
  ];

  // Main title entrance
  const titleProgress = spring({
    frame: frame - 0,
    fps,
    config: springConfigs.bouncy,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [-50, 0])}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: colors.amber,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 4,
            textShadow: `0 0 40px ${colors.amber}`,
          }}
        >
          THOUGHT LEADERSHIP
        </h1>
      </div>

      {/* Grid of publications */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40,
          padding: 220,
          paddingTop: 200,
          paddingBottom: 100,
        }}
      >
        {publications.map((pub, index) => {
          const progress = spring({
            frame: frame - pub.delay,
            fps,
            config: springConfigs.bouncy,
          });

          // Each card zooms in with slight rotation
          const rotation = interpolate(progress, [0, 1], [10, 0]);
          const scale = interpolate(progress, [0, 1], [0.5, 1]);

          return (
            <div
              key={index}
              style={{
                opacity: progress,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }}
            >
              {/* Screenshot card */}
              <div
                style={{
                  width: '100%',
                  height: 400,
                  borderRadius: 16,
                  border: `3px solid ${pub.color}`,
                  boxShadow: `0 0 ${40 * progress}px ${pub.color}, 0 20px 40px rgba(0, 0, 0, 0.5)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Actual screenshot */}
                <Img
                  src={staticFile(pub.image)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Shine effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: -100,
                    width: 100,
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: `translateX(${interpolate(frame, [pub.delay, pub.delay + 60], [0, 800])}px)`,
                  }}
                />

                {/* Source badge overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    fontSize: 20,
                    fontWeight: 800,
                    color: colors.white,
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    backgroundColor: pub.color,
                    padding: '10px 20px',
                    borderRadius: 8,
                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  {pub.source}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [120, 180], [0, 1]),
        }}
      >
        <p
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: colors.lightGray,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Published insights • Global reach
        </p>
      </div>
    </AbsoluteFill>
  );
};
