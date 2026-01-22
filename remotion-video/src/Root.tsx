import { Composition } from 'remotion';
import { MarkoHighlight } from './MarkoHighlight';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarkoHighlight"
        component={MarkoHighlight}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
