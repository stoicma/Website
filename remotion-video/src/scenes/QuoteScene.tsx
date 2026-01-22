import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface QuoteSceneProps {
  quote: string;
  attribution: string;
  photo: string;
}

export const QuoteScene: React.FC<QuoteSceneProps> = ({ quote, attribution, photo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Photo fade in
  const photoOpacity = spring({
    frame: frame - 5,
    fps,
    config: {
      damping: 100,
    },
  });

  // Quote animation - slide from left
  const quoteOpacity = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 100,
    },
  });

  const quoteX = interpolate(
    spring({
      frame: frame - 15,
      fps,
      config: {
        damping: 100,
      },
    }),
    [0, 1],
    [-50, 0]
  );

  return (
    <AbsoluteFill>
      {/* Photo background with overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: photoOpacity,
        }}
      >
        <Img
          src={photo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.90) 100%)',
          }}
        />
      </div>

      {/* Quote content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 150px',
          height: '100%',
        }}
      >
        <div
          style={{
            opacity: quoteOpacity,
            transform: `translateX(${quoteX}px)`,
          }}
        >
          <div
            style={{
              fontSize: '64px',
              color: '#fff',
              fontWeight: 600,
              lineHeight: 1.4,
              marginBottom: '40px',
              textAlign: 'center',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            "{quote}"
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
              }}
            />
            <p
              style={{
                fontSize: '32px',
                color: '#3b82f6',
                margin: 0,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {attribution}
            </p>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
