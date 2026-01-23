import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

/**
 * Act 2: Crypto Passion (5-15s = 300 frames)
 * Fast montage: Ethereum → Code → "Self-taught" → "Built conviction" → "Went all in"
 */
export const HypeCryptoPassionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ethereum logo spins in (0-90 frames)
  const ethProgress = spring({
    frame: frame - 0,
    fps,
    config: springConfigs.bouncy,
  });

  const ethRotation = interpolate(frame, [0, 90], [0, 720], {
    extrapolateRight: 'clamp',
  });

  const ethScale = interpolate(frame, [0, 30], [0, 1.2], {
    extrapolateRight: 'clamp',
  });

  // Code typing effect (60-180 frames)
  const codeOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Text overlays - rapid succession
  const selfTaughtProgress = spring({
    frame: frame - 90,
    fps,
    config: springConfigs.snappy,
  });

  const convictionProgress = spring({
    frame: frame - 150,
    fps,
    config: springConfigs.snappy,
  });

  const allInProgress = spring({
    frame: frame - 210,
    fps,
    config: springConfigs.bouncy,
  });

  // Particle effects
  const particleOpacity = interpolate(frame, [0, 300], [0, 0.6], {
    extrapolateRight: 'clamp',
  });

  // Neon glow intensity
  const glowIntensity = Math.abs(Math.sin(frame / 10)) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Animated background particles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: particleOpacity,
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i * 37) % 100;
          const y = (i * 53) % 100;
          const delay = i * 2;
          const particleProgress = interpolate(frame, [delay, delay + 60], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: i % 2 === 0 ? colors.amber : colors.professionalBlue,
                opacity: particleProgress * 0.6,
                transform: `scale(${particleProgress})`,
              }}
            />
          );
        })}
      </div>

      {/* Ethereum logo - spinning entrance (0-90 frames) */}
      {frame < 120 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: frame < 90 ? ethProgress : interpolate(frame, [90, 120], [1, 0]),
          }}
        >
          <div
            style={{
              transform: `rotate(${ethRotation}deg) scale(${ethScale * ethProgress})`,
            }}
          >
            {/* Placeholder for Ethereum logo */}
            <div
              style={{
                width: 200,
                height: 200,
                background: colors.ethereumPurple,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                fontWeight: 800,
                color: colors.white,
                boxShadow: `0 0 ${60 * glowIntensity}px ${colors.ethereumPurple}`,
              }}
            >
              ETH
            </div>
            {/* TODO: <Img src={staticFile('motion/logos/Ethereum Logo.png')} /> */}
          </div>
        </AbsoluteFill>
      )}

      {/* Code snippets (60-180 frames) */}
      {frame >= 60 && frame < 210 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
            opacity: frame < 180 ? codeOpacity : interpolate(frame, [180, 210], [1, 0]),
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 32,
              color: colors.cryptoGreen,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: '20px 40px',
              borderRadius: 12,
              border: `2px solid ${colors.cryptoGreen}`,
              boxShadow: `0 0 ${30 * glowIntensity}px ${colors.cryptoGreen}`,
            }}
          >
            {'pragma solidity ^0.8.0;'}
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 32,
              color: colors.ethereumPurple,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: '20px 40px',
              borderRadius: 12,
              border: `2px solid ${colors.ethereumPurple}`,
              boxShadow: `0 0 ${30 * glowIntensity}px ${colors.ethereumPurple}`,
            }}
          >
            {'function transfer(address, uint256)'}
          </div>
        </AbsoluteFill>
      )}

      {/* Text overlays - rapid succession */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        {/* "Self-taught" */}
        {frame >= 90 && frame < 180 && (
          <div
            style={{
              opacity: selfTaughtProgress,
              transform: `translateX(${interpolate(selfTaughtProgress, [0, 1], [-100, 0])}px) scale(${interpolate(selfTaughtProgress, [0, 1], [0.5, 1])})`,
            }}
          >
            <h2
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: colors.amber,
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: 4,
                textShadow: `0 0 40px ${colors.amber}`,
              }}
            >
              SELF-TAUGHT
            </h2>
          </div>
        )}

        {/* "Built conviction" */}
        {frame >= 150 && frame < 240 && (
          <div
            style={{
              opacity: convictionProgress,
              transform: `translateX(${interpolate(convictionProgress, [0, 1], [100, 0])}px) scale(${interpolate(convictionProgress, [0, 1], [0.5, 1])})`,
            }}
          >
            <h2
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: colors.professionalBlue,
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: 4,
                textShadow: `0 0 40px ${colors.professionalBlue}`,
              }}
            >
              BUILT CONVICTION
            </h2>
          </div>
        )}

        {/* "Went all in" */}
        {frame >= 210 && (
          <div
            style={{
              opacity: allInProgress,
              transform: `scale(${interpolate(allInProgress, [0, 1], [0.3, 1])})`,
            }}
          >
            <h1
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: colors.white,
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: 6,
                textShadow: `0 0 60px ${colors.amber}, 0 4px 30px rgba(0, 0, 0, 0.8)`,
              }}
            >
              WENT ALL IN
            </h1>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
