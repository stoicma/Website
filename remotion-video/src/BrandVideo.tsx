import { Series } from 'remotion';
import { WildernessScene } from './scenes/Act1_Wilderness';
import { DoubtersScene } from './scenes/Act2_Doubters';
import { JourneyScene } from './scenes/Act3_Journey';
import { ThoughtLeaderScene } from './scenes/Act4_ThoughtLeader';
import { ClosingScene } from './scenes/Act5_Closing';

/**
 * Main 90-second Brand Video Composition
 *
 * Structure (at 30fps):
 * - Act 1: The Wilderness (0-25s) = 750 frames
 * - Act 2: The Doubters (25-45s) = 600 frames
 * - Act 3: The Journey (45-75s) = 900 frames
 * - Act 4: Thought Leader (75-95s) = 600 frames
 * - Act 5: Closing (95-105s) = 300 frames
 *
 * Total: 3150 frames (105 seconds at 30fps)
 */

export const BrandVideo: React.FC = () => {
  return (
    <Series>
      {/* Act 1: The Wilderness - 25 seconds */}
      <Series.Sequence durationInFrames={750} name="Act 1: The Wilderness">
        <WildernessScene />
      </Series.Sequence>

      {/* Act 2: The Doubters - 20 seconds */}
      <Series.Sequence durationInFrames={600} name="Act 2: The Doubters">
        <DoubtersScene />
      </Series.Sequence>

      {/* Act 3: The Journey - 30 seconds */}
      <Series.Sequence durationInFrames={900} name="Act 3: The Journey">
        <JourneyScene />
      </Series.Sequence>

      {/* Act 4: Thought Leader - 20 seconds */}
      <Series.Sequence durationInFrames={600} name="Act 4: Thought Leader">
        <ThoughtLeaderScene />
      </Series.Sequence>

      {/* Act 5: Closing - 10 seconds */}
      <Series.Sequence durationInFrames={300} name="Act 5: Closing">
        <ClosingScene />
      </Series.Sequence>
    </Series>
  );
};
