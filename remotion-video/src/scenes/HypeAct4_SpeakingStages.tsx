import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

/**
 * Act 4: Speaking Stages (23-30s = 210 frames)
 * Fast montage of speaking photos
 */
export const HypeSpeakingStagesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const speakingEvents = [
    { name: 'Nebular Summit', delay: 0, duration: 60 },
    { name: 'OpenAGI Summit', delay: 50, duration: 60 },
    { name: 'TUM Conference', delay: 100, duration: 60 },
    { name: 'DeAI Panel Wayra', delay: 150, duration: 60 },
  ];

  // Title entrance
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
          transform: `translateY(${interpolate(titleProgress, [0, 1], [-50, 0])}px) scale(${interpolate(titleProgress, [0, 1], [0.5, 1])})`,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: colors.white,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 6,
            textShadow: `0 0 60px ${colors.amber}, 0 4px 30px rgba(0, 0, 0, 0.8)`,
          }}
        >
          GLOBAL STAGES
        </h1>
      </div>

      {/* Photos montage - overlapping with cross-dissolve */}
      {speakingEvents.map((event, index) => {
        const progress = spring({
          frame: frame - event.delay,
          fps,
          config: springConfigs.smooth,
        });

        const fadeOut = interpolate(
          frame,
          [event.delay + event.duration - 30, event.delay + event.duration],
          [1, 0],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );

        const zoom = interpolate(frame, [event.delay, event.delay + event.duration], [1, 1.2], {
          extrapolateRight: 'clamp',
        });

        const opacity = Math.min(progress, fadeOut);

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity,
            }}
          >
            {/* Photo container with zoom */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: `translate(-50%, 0) scale(${zoom})`,
                width: '70%',
                height: '60%',
              }}
            >
              {/* Photo placeholder with border accent */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.slateGray} 100%)`,
                  borderRadius: 20,
                  border: `6px solid ${colors.amber}`,
                  boxShadow: `0 0 80px ${colors.amber}, 0 30px 60px rgba(0, 0, 0, 0.6)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Gradient overlay for text readability */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  }}
                />

                {/* Event label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 60,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 800,
                      color: colors.amber,
                      fontFamily: 'Inter, sans-serif',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {event.name}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: colors.mediumGray,
                      marginTop: 10,
                    }}
                  >
                    [Speaking Photo]
                  </div>
                </div>

                {/* Placeholder text */}
                <div
                  style={{
                    fontSize: 24,
                    color: colors.mediumGray,
                    textAlign: 'center',
                  }}
                >
                  motion/speaking/MS_{event.name.replace(/\s+/g, '_')}.jpg
                </div>
              </div>
              {/* TODO: Replace with actual photos using Img component */}
            </div>
          </div>
        );
      })}

      {/* Bottom tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [120, 180], [0, 1]),
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
          }}
        >
          Important conversations. <span style={{ color: colors.amber }}>Worldwide impact.</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
