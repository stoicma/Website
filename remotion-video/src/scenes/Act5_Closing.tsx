import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Return to penguin (0-120 frames)
  const penguinOpacity = spring({
    frame: frame - 0,
    fps,
    config: springConfigs.gentle,
  });

  const penguinZoom = interpolate(penguinOpacity, [0, 1], [1.2, 1]);

  // Warm glow effect emerging
  const warmth = interpolate(frame, [0, 120], [0, 0.3], {
    extrapolateRight: 'clamp',
  });

  // Closing quote
  const quoteOpacity = spring({
    frame: frame - 90,
    fps,
    config: springConfigs.textReveal,
  });

  // Transition to final card
  const cardOpacity = spring({
    frame: frame - 180,
    fps,
    config: springConfigs.smooth,
  });

  // Staggered reveal of card elements
  const nameOpacity = spring({
    frame: frame - 210,
    fps,
    config: springConfigs.textReveal,
  });

  const titleOpacity = spring({
    frame: frame - 240,
    fps,
    config: springConfigs.textReveal,
  });

  const contactOpacity = spring({
    frame: frame - 270,
    fps,
    config: springConfigs.textReveal,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Penguin return (0-180 frames) */}
      {frame < 210 && (
        <>
          {/* Background Image - Penguin */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              opacity: penguinOpacity,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `scale(${penguinZoom})`,
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
                  fontSize: 48,
                  color: colors.mediumGray,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                [Penguin Image - with warmth]
              </div>
              {/* TODO: Replace with actual image */}
            </div>

            {/* Warm overlay (community warmth) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 50% 50%,
                  rgba(245, 158, 11, ${warmth}) 0%,
                  transparent 60%)`,
              }}
            />

            {/* Dark overlay for text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: colors.darkOverlay,
              }}
            />
          </div>

          {/* Closing quote */}
          <AbsoluteFill
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: quoteOpacity,
            }}
          >
            <h2
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: colors.amber,
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                textAlign: 'center',
                maxWidth: 1000,
                lineHeight: 1.3,
                transform: `translateY(${interpolate(quoteOpacity, [0, 1], [40, 0])}px)`,
              }}
            >
              The contrarians eventually become the builders.
            </h2>
          </AbsoluteFill>
        </>
      )}

      {/* Final branded card (180+ frames) */}
      <AbsoluteFill
        style={{
          opacity: cardOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${interpolate(nameOpacity, [0, 1], [40, 0])}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: colors.white,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: -2,
              textTransform: 'uppercase',
            }}
          >
            MARKO STOKIĆ
          </h1>
        </div>

        {/* Title & Role */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${interpolate(titleOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 30,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: colors.amber,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Head of AI @ Oasis Protocol
          </p>
          <p
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: colors.lightGray,
              margin: 0,
              marginTop: 10,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Forbes Contributor
          </p>
        </div>

        {/* Contact info & Tagline */}
        <div
          style={{
            opacity: contactOpacity,
            transform: `translateY(${interpolate(contactOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Social/Contact */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              fontSize: 24,
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
              fontSize: 32,
              fontWeight: 600,
              color: colors.amber,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: 4,
              marginTop: 20,
            }}
          >
            Privacy × AI × Web3
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 200,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, ${colors.amber} 50%, transparent 100%)`,
              marginTop: 20,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
