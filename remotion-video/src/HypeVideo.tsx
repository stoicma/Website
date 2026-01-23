import { Audio, Series, staticFile } from 'remotion';
import { HypeHookScene } from './scenes/HypeAct1_Hook';
import { HypeCryptoPassionScene } from './scenes/HypeAct2_CryptoPassion';
import { HypePublicationsGridScene } from './scenes/HypeAct3_PublicationsGrid';
import { HypeSpeakingStagesScene } from './scenes/HypeAct4_SpeakingStages';
import { HypeClosingScene } from './scenes/HypeAct5_Closing';

/**
 * 35-Second MTV-Style Hype Video
 *
 * Structure (at 30fps):
 * - Act 1: The Hook (0-5s) = 150 frames
 * - Act 2: Crypto Passion (5-15s) = 300 frames
 * - Act 3: Publications Grid (15-23s) = 240 frames
 * - Act 4: Speaking Stages (23-30s) = 210 frames
 * - Act 5: Closing (30-35s) = 150 frames
 *
 * Total: 1050 frames (35 seconds at 30fps)
 */

export const HypeVideo: React.FC = () => {
  return (
    <>
      {/* Background music - MTV-style hype track */}
      {/* TODO: Add your music file to remotion-video/public/ */}
      {/* <Audio src={staticFile('hype-music.mp3')} volume={0.6} /> */}

      <Series>
        {/* Act 1: The Hook - 5 seconds */}
        <Series.Sequence durationInFrames={150} name="Act 1: The Hook">
          <HypeHookScene />
        </Series.Sequence>

        {/* Act 2: Crypto Passion - 10 seconds */}
        <Series.Sequence durationInFrames={300} name="Act 2: Crypto Passion">
          <HypeCryptoPassionScene />
        </Series.Sequence>

        {/* Act 3: Publications Grid - 8 seconds */}
        <Series.Sequence durationInFrames={240} name="Act 3: Publications Grid">
          <HypePublicationsGridScene />
        </Series.Sequence>

        {/* Act 4: Speaking Stages - 7 seconds */}
        <Series.Sequence durationInFrames={210} name="Act 4: Speaking Stages">
          <HypeSpeakingStagesScene />
        </Series.Sequence>

        {/* Act 5: Closing - 5 seconds */}
        <Series.Sequence durationInFrames={150} name="Act 5: Closing">
          <HypeClosingScene />
        </Series.Sequence>
      </Series>
    </>
  );
};
