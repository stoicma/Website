import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

interface SpeechBubbleProps {
  text: string;
  delay: number;
  x: number;
  y: number;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bubble appears
  const appearProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.bouncy,
  });

  // Bubble shatters
  const shatterStart = delay + 240; // Shatter 8 seconds after appearing
  const shatterProgress = interpolate(frame, [shatterStart, shatterStart + 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Shatter effect - rotate, scale down, fade out
  const rotation = shatterProgress * (Math.random() * 360 - 180);
  const scaleDown = 1 - shatterProgress * 0.7;
  const opacity = 1 - shatterProgress;

  // Random displacement when shattering
  const displaceX = shatterProgress * (Math.random() * 200 - 100);
  const displaceY = shatterProgress * (Math.random() * 200 - 100);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${appearProgress * scaleDown}) rotate(${rotation}deg) translate(${displaceX}px, ${displaceY}px)`,
        opacity: appearProgress * opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: `2px solid ${colors.mediumGray}`,
          borderRadius: 20,
          padding: '20px 35px',
          fontSize: 32,
          fontWeight: 600,
          color: colors.white,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {text}
      </div>
      {/* Speech bubble pointer */}
      <div
        style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: `15px solid ${colors.mediumGray}`,
        }}
      />
    </div>
  );
};

export const DoubtersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter-text reveal (after bubbles shatter)
  const counterTextOpacity = spring({
    frame: frame - 280,
    fps,
    config: springConfigs.textReveal,
  });

  // Network visualization
  const networkOpacity = spring({
    frame: frame - 360,
    fps,
    config: springConfigs.gentle,
  });

  // Warm colors emerging
  const warmGlow = interpolate(frame, [360, 500], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const doubterQuotes = [
    { text: "It's a bubble", delay: 30, x: 20, y: 25 },
    { text: "You're wasting your time", delay: 60, x: 75, y: 30 },
    { text: "It's a scam", delay: 90, x: 35, y: 60 },
    { text: "Get a real job", delay: 120, x: 70, y: 70 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Background gradient with warming effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%,
            rgba(245, 158, 11, ${warmGlow * 0.15}) 0%,
            ${colors.darkNavy} 70%)`,
        }}
      />

      {/* Speech Bubbles */}
      {doubterQuotes.map((quote, index) => (
        <SpeechBubble
          key={index}
          text={quote.text}
          delay={quote.delay}
          x={quote.x}
          y={quote.y}
        />
      ))}

      {/* Counter-reveal text */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: counterTextOpacity,
        }}
      >
        <h2
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: colors.amber,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            transform: `translateY(${interpolate(counterTextOpacity, [0, 1], [40, 0])}px)`,
          }}
        >
          But I saw something different.
        </h2>
      </AbsoluteFill>

      {/* Network visualization and text */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: networkOpacity,
          paddingTop: 200,
        }}
      >
        {/* Network nodes visualization */}
        <div
          style={{
            position: 'relative',
            width: 400,
            height: 300,
          }}
        >
          {/* Central node */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.amber} 0%, ${colors.warmOrange} 100%)`,
              boxShadow: `0 0 40px ${colors.amber}`,
            }}
          />

          {/* Surrounding nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, index) => {
            const delay = index * 10;
            const nodeProgress = spring({
              frame: frame - 360 - delay,
              fps,
              config: springConfigs.bouncy,
            });

            const x = 50 + Math.cos((angle * Math.PI) / 180) * 35;
            const y = 50 + Math.sin((angle * Math.PI) / 180) * 35;

            return (
              <div
                key={angle}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) scale(${nodeProgress})`,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: colors.professionalBlue,
                  boxShadow: `0 0 20px ${colors.professionalBlue}`,
                  opacity: nodeProgress,
                }}
              />
            );
          })}

          {/* Connecting lines */}
          {[0, 60, 120, 180, 240, 300].map((angle, index) => {
            const x1 = 50;
            const y1 = 50;
            const x2 = 50 + Math.cos((angle * Math.PI) / 180) * 35;
            const y2 = 50 + Math.sin((angle * Math.PI) / 180) * 35;

            return (
              <svg
                key={`line-${angle}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                <line
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={colors.professionalBlue}
                  strokeWidth="2"
                  opacity={networkOpacity * 0.3}
                />
              </svg>
            );
          })}
        </div>

        {/* Bottom text */}
        <div style={{ marginTop: 80 }}>
          <p
            style={{
              fontSize: 36,
              color: colors.lightGray,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Small blockchain meetups.
          </p>
          <p
            style={{
              fontSize: 48,
              color: colors.amber,
              margin: 0,
              marginTop: 10,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Big ideas.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
