import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

export const WildernessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns zoom effect - slow zoom in on penguin
  const zoom = interpolate(frame, [0, 750], [1, 1.2], {
    extrapolateRight: 'clamp',
  });

  // Fade in the image
  const imageOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Text animations with stagger
  const year2017Opacity = spring({
    frame: frame - 60,
    fps,
    config: springConfigs.textReveal,
  });

  const subtitleOpacity = spring({
    frame: frame - 90,
    fps,
    config: springConfigs.textReveal,
  });

  const gapYearOpacity = spring({
    frame: frame - 150,
    fps,
    config: springConfigs.textReveal,
  });

  const destinationOpacity = spring({
    frame: frame - 210,
    fps,
    config: springConfigs.textReveal,
  });

  const basementOpacity = spring({
    frame: frame - 330,
    fps,
    config: springConfigs.textReveal,
  });

  const codeOpacity = spring({
    frame: frame - 420,
    fps,
    config: springConfigs.textReveal,
  });

  const ethereumOpacity = spring({
    frame: frame - 480,
    fps,
    config: springConfigs.bouncy,
  });

  // Floating animation for code snippets
  const floatY = Math.sin(frame / 30) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Background Image - Penguin with Ken Burns Effect */}
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
            transform: `scale(${zoom})`,
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
              fontSize: 48,
              color: colors.mediumGray,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            [Penguin Image]
            <br />
            <span style={{ fontSize: 24 }}>motion/Nihilist Penguin Picture.webp</span>
          </div>
          {/* TODO: Replace with actual image when available */}
          {/* <Img src={staticFile('motion/Nihilist Penguin Picture.webp')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        </div>

        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: colors.darkOverlay,
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
          padding: 80,
        }}
      >
        {/* Year: 2017 */}
        <div
          style={{
            opacity: year2017Opacity,
            transform: `translateY(${interpolate(year2017Opacity, [0, 1], [40, 0])}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 700,
              color: colors.amber,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: -2,
            }}
          >
            2017
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${interpolate(subtitleOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontSize: 32,
              color: colors.lightGray,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            "Sometimes the path forward means walking alone."
          </p>
        </div>

        {/* Gap year cancelled */}
        <div
          style={{
            opacity: gapYearOpacity,
            transform: `translateY(${interpolate(gapYearOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 80,
          }}
        >
          <p
            style={{
              fontSize: 42,
              color: colors.white,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              textDecoration: 'line-through',
              textDecorationColor: colors.amber,
              textDecorationThickness: 4,
            }}
          >
            Gap year plans: CANCELLED
          </p>
        </div>

        {/* New destination */}
        <div
          style={{
            opacity: destinationOpacity,
            transform: `translateY(${interpolate(destinationOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 30,
          }}
        >
          <p
            style={{
              fontSize: 48,
              color: colors.amber,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
            }}
          >
            New destination: The blockchain wilderness
          </p>
        </div>

        {/* Parents' basement location */}
        <div
          style={{
            opacity: basementOpacity,
            transform: `translateY(${interpolate(basementOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 100,
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: colors.lightGray,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
            }}
          >
            Parents' basement. Munich.
          </p>
        </div>

        {/* Code snippets (floating) */}
        <div
          style={{
            opacity: codeOpacity,
            transform: `translateY(${floatY}px)`,
            marginTop: 40,
            display: 'flex',
            gap: 30,
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              color: colors.cryptoGreen,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '15px 25px',
              borderRadius: 8,
              border: `1px solid ${colors.cryptoGreen}`,
            }}
          >
            {'function transfer(address, uint256)'}
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              color: colors.ethereumPurple,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '15px 25px',
              borderRadius: 8,
              border: `1px solid ${colors.ethereumPurple}`,
            }}
          >
            {'contract ERC20 { ... }'}
          </div>
        </div>

        {/* Ethereum logo */}
        <div
          style={{
            opacity: ethereumOpacity,
            transform: `scale(${ethereumOpacity}) translateY(${interpolate(ethereumOpacity, [0, 1], [30, 0])}px)`,
            marginTop: 40,
          }}
        >
          {/* Placeholder for Ethereum logo */}
          <div
            style={{
              width: 80,
              height: 80,
              background: colors.ethereumPurple,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ETH
          </div>
          {/* TODO: Replace with actual logo */}
          {/* <Img src={staticFile('motion/logos/Ethereum Logo.png')} style={{ width: 80, height: 80 }} /> */}
        </div>

        {/* Subtitle at bottom */}
        <div
          style={{
            opacity: codeOpacity,
            position: 'absolute',
            bottom: 80,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: colors.mediumGray,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Reading every whitepaper. Learning to code. Building conviction.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
