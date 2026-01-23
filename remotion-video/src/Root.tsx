import { Composition } from 'remotion';
import { MarkoHighlight } from './MarkoHighlight';
import { BrandVideo } from './BrandVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 90-second cinematic brand video */}
      <Composition
        id="BrandVideo"
        component={BrandVideo}
        durationInFrames={3150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Original 15-second highlight video */}
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
