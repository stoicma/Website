import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Audio } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { Opening } from './scenes/Opening';
import { QuoteScene } from './scenes/QuoteScene';
import { ExpertiseScene } from './scenes/ExpertiseScene';
import { Closing } from './scenes/Closing';
import speakingPhoto1 from './assets/hero-speaking.jpg';
import speakingPhoto2 from './assets/hero-stage.jpg';
import backgroundMusic from './assets/background-music.mp3';

const { fontFamily } = loadFont();

export const MarkoHighlight: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Quotes from articles and expertise
  const quotes = [
    {
      text: "Trust mechanisms for autonomous AI agents require attestation, verification, and blockchain's role in accountable AI",
      attribution: "CoinDesk",
      photo: speakingPhoto1,
    },
    {
      text: "Crypto traders trust AI agents built with transparency, security, and proven returns",
      attribution: "Forbes",
      photo: speakingPhoto2,
    },
  ];

  // Audio volume with fade in/out
  const audioVolume = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily }}>
      {/* Background Music */}
      <Audio src={backgroundMusic} volume={audioVolume} />
      {/* Opening: Name Reveal (0-3 sec) */}
      <Sequence from={0} durationInFrames={90}>
        <Opening />
      </Sequence>

      {/* Quote Scene 1 (3-6 sec) */}
      <Sequence from={90} durationInFrames={90}>
        <QuoteScene
          quote={quotes[0].text}
          attribution={quotes[0].attribution}
          photo={quotes[0].photo}
        />
      </Sequence>

      {/* Quote Scene 2 (6-9 sec) */}
      <Sequence from={180} durationInFrames={90}>
        <QuoteScene
          quote={quotes[1].text}
          attribution={quotes[1].attribution}
          photo={quotes[1].photo}
        />
      </Sequence>

      {/* Expertise Showcase (9-12 sec) */}
      <Sequence from={270} durationInFrames={90}>
        <ExpertiseScene />
      </Sequence>

      {/* Closing: Contact Info (12-15 sec) */}
      <Sequence from={360} durationInFrames={90}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
