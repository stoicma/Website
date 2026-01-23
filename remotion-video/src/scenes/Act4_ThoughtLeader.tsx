import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';
import { springConfigs } from '../utils/spring-configs';

interface ArticleCardProps {
  headline: string;
  publication: string;
  delay: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ headline, publication, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.textReveal,
  });

  // Newspaper print animation (typewriter effect on headline)
  const headlineLength = headline.length;
  const visibleChars = Math.floor(interpolate(progress, [0, 1], [0, headlineLength]));

  return (
    <div
      style={{
        transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
        opacity: progress,
        marginBottom: 30,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: `3px solid ${colors.darkNavy}`,
          borderRadius: 8,
          padding: '30px 40px',
          maxWidth: 800,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Publication name */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.professionalBlue,
            margin: 0,
            marginBottom: 10,
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          {publication}
        </p>

        {/* Headline with typewriter effect */}
        <h3
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.darkNavy,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.3,
          }}
        >
          {headline.substring(0, visibleChars)}
          {visibleChars < headlineLength && (
            <span
              style={{
                borderRight: '3px solid ' + colors.darkNavy,
                animation: 'blink 1s step-end infinite',
              }}
            >
              &nbsp;
            </span>
          )}
        </h3>
      </div>
    </div>
  );
};

export const ThoughtLeaderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Forbes profile zoom in
  const forbesOpacity = spring({
    frame: frame - 0,
    fps,
    config: springConfigs.smooth,
  });

  const forbesZoom = interpolate(forbesOpacity, [0, 1], [0.8, 1]);

  // Articles appear
  const articles = [
    {
      headline: 'Why Crypto Needs Portable AI Memory',
      publication: 'Forbes',
      delay: 90,
    },
    {
      headline: 'Can We Ever Trust AI Agents?',
      publication: 'CoinDesk',
      delay: 150,
    },
    {
      headline: 'The AI Doctor Will See All of You Now',
      publication: 'Decrypt',
      delay: 210,
    },
  ];

  // Speaking photos montage (starts after articles)
  const speakingStart = 330;
  const speakingOpacity = spring({
    frame: frame - speakingStart,
    fps,
    config: springConfigs.gentle,
  });

  const speakingPhotos = [
    'Nebular Summit',
    'OpenAGI Summit',
    'TUM',
    'DeAI Panel Wayra',
  ];

  // Cycle through photos
  const photoIndex = Math.floor(((frame - speakingStart) / 60) % speakingPhotos.length);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkNavy }}>
      {/* Forbes profile section (0-90 frames) */}
      {frame < 120 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: frame < 90 ? forbesOpacity : interpolate(frame, [90, 120], [1, 0]),
          }}
        >
          <div
            style={{
              transform: `scale(${forbesZoom})`,
            }}
          >
            {/* Placeholder for Forbes profile screenshot */}
            <div
              style={{
                width: 800,
                height: 500,
                background: colors.white,
                borderRadius: 12,
                border: `4px solid ${colors.amber}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 40,
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.darkNavy,
                  marginBottom: 20,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Forbes Contributor
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: colors.professionalBlue,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                MARKO STOKIĆ
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: colors.mediumGray,
                  marginTop: 20,
                  textAlign: 'center',
                }}
              >
                [Forbes Profile Screenshot]
                <br />
                motion/Screenshot Forbes Profile.png
              </div>
            </div>
            {/* TODO: Replace with actual screenshot */}
          </div>
        </AbsoluteFill>
      )}

      {/* Articles section (90-330 frames) */}
      {frame >= 60 && frame < speakingStart + 30 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 80,
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.headline} {...article} />
          ))}
        </AbsoluteFill>
      )}

      {/* Speaking montage (330-600 frames) */}
      {frame >= speakingStart && (
        <AbsoluteFill
          style={{
            opacity: speakingOpacity,
          }}
        >
          {/* Photo container */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Placeholder for speaking photo */}
            <div
              style={{
                width: '70%',
                height: '70%',
                background: `linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.slateGray} 100%)`,
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: colors.lightGray,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                border: `4px solid ${colors.amber}`,
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ marginBottom: 20 }}>[Speaking Photo]</div>
              <div style={{ fontSize: 48, color: colors.amber, marginBottom: 10 }}>
                {speakingPhotos[photoIndex]}
              </div>
              <div style={{ fontSize: 18, color: colors.mediumGray }}>
                motion/speaking/MS_{speakingPhotos[photoIndex].replace(' ', '_')}.jpg
              </div>
            </div>
            {/* TODO: Replace with actual photos */}
          </div>

          {/* Overlay text */}
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: colors.white,
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
              }}
            >
              Global stages. Important conversations.
            </p>
          </div>
        </AbsoluteFill>
      )}

      {/* CSS for blinking cursor */}
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </AbsoluteFill>
  );
};
