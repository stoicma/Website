import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

/**
 * Act 1: The Hook (0-5s = 150 frames)
 * Fast-paced opening with penguin, glitch, and "One crazy bet"
 */
export const HypeHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast aggressive zoom on penguin
  const zoom = interpolate(frame, [0, 150], [1, 1.8], {
    extrapolateRight: 'clamp',
  });

  // Quick fade in
  const imageOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Glitch effect appears briefly
  const glitchOpacity = interpolate(frame, [30, 35, 40, 45], [0, 0.8, 0, 0.6], {
    extrapolateRight: 'clamp',
  });

  // Glitch displacement
  const glitchX = interpolate(frame, [30, 35, 40, 45], [0, -20, 0, 15]);

  // "2017" flashes in aggressively
  const year2017 = spring({
    frame: frame - 20,
    fps,
    config: springConfigs.snappy,
  });

  // "One crazy bet" punches in
  const crazyBetOpacity = spring({
    frame: frame - 70,
    fps,
    config: springConfigs.bouncy,
  });

  // Vignette darkens at end for transition
  const vignette = interpolate(frame, [120, 150], [0.3, 0.8], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Background Image - Penguin with aggressive zoom */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `scale(${zoom}) translateX(${glitchX}px)`,
            opacity: imageOpacity,
          }}
        >
          {/* Placeholder for penguin image */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg, ${colors.slateGray} 0%, ${colors.darkNavy} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              color: colors.mediumGray,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            [Penguin Walking Alone]
          </div>
          {/* TODO: <Img src={staticFile('motion/Nihilist Penguin Picture.webp')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        </div>

        {/* Glitch overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              rgba(0, 255, 255, ${glitchOpacity * 0.1}) 0px,
              transparent 2px,
              transparent 4px,
              rgba(255, 0, 255, ${glitchOpacity * 0.1}) 4px,
              transparent 6px
            )`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Dark vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle, transparent 0%, rgba(10, 25, 47, ${vignette}) 100%)`,
          }}
        />
      </div>

      {/* Text Overlays */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 2017 - Fast flash */}
        <div
          style={{
            opacity: year2017,
            transform: `scale(${interpolate(year2017, [0, 1], [0.5, 1])})`,
          }}
        >
          <h1
            style={{
              fontSize: 140,
              fontWeight: 800,
              color: colors.amber,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: -4,
              textShadow: `0 0 40px ${colors.amber}, 0 0 80px rgba(245, 158, 11, 0.5)`,
            }}
          >
            2017
          </h1>
        </div>

        {/* "One crazy bet" */}
        <div
          style={{
            opacity: crazyBetOpacity,
            transform: `translateY(${interpolate(crazyBetOpacity, [0, 1], [50, 0])}px) scale(${interpolate(crazyBetOpacity, [0, 1], [0.8, 1])})`,
            marginTop: 40,
          }}
        >
          <h2
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 2,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            One Crazy Bet
          </h2>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
